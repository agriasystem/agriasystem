import { NextResponse } from 'next/server';
import { BOOKING_PREFERENCE, HONEYPOT, fullPhone, validateAll } from '@/lib/contact/fields';
import { form as copy } from '@/content/agria/contatti';
import { clientIp, forget, once, rateLimited } from '@/lib/contact/guards';
import { log } from '@/lib/contact/http';
import { verifyRecaptcha } from '@/lib/contact/recaptcha';
import {
  MissingScopeError,
  associateContactCompany,
  createDeal,
  findOrCreateCompany,
  submitForm,
  upsertContact,
} from '@/lib/contact/hubspot';
import { alertTeam, notifyNewLead } from '@/lib/contact/notify';
import { createManagerTask } from '@/lib/contact/manager-task';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY = 20_000; // byte
const SUBMISSION_ID = /^[a-z0-9-]{8,64}$/i;
const MESSAGES = {
  generic: 'Non siamo riusciti a inviare la richiesta. Riprova tra qualche istante, oppure scrivici via email o WhatsApp.',
  recaptcha: 'Non siamo riusciti a verificare la richiesta. Riprova tra qualche istante.',
  rate: 'Hai inviato troppe richieste in poco tempo. Riprova tra qualche minuto, oppure scrivici via email o WhatsApp.',
};
const CONSENT_TEXT = `${copy.labels.privacyBefore}${copy.labels.privacyLink}${copy.labels.privacyAfter}`;

// Al frontend solo esito e destinazione, mai dettagli tecnici.
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
// 'calendario': il browser apre il calendario di Alessandro; 'grazie': messaggio nel riquadro
const destination = (lead) => (lead.preferenza === BOOKING_PREFERENCE ? 'calendario' : 'grazie');

// Percorso: validazione → antispam (trappola, limite per IP, reCAPTCHA v3) →
// Forms API → contatto → azienda → associazione → trattativa con associazioni.
export async function POST(request) {
  const started = Date.now();
  const raw = await request.text().catch(() => '');
  if (!raw || raw.length > MAX_BODY) return reply({ ok: false, message: MESSAGES.generic }, 400);

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return reply({ ok: false, message: MESSAGES.generic }, 400);
  }
  if (!input || typeof input !== 'object') return reply({ ok: false, message: MESSAGES.generic }, 400);

  const submissionId = SUBMISSION_ID.test(String(input.submissionId || '')) ? input.submissionId : null;
  const ip = clientIp(request.headers);

  // 1. campo trappola compilato: risposta di successo, nessuna chiamata esterna
  if (typeof input[HONEYPOT] === 'string' && input[HONEYPOT].trim() !== '') {
    log('warn', 'honeypot', { submissionId });
    return reply({ ok: true, next: 'grazie' });
  }

  // 2. limite di richieste per IP
  if (rateLimited(ip)) {
    log('warn', 'rate_limited', { submissionId });
    return reply({ ok: false, message: MESSAGES.rate }, 429);
  }

  // 3. validazione di tutti i campi e dei valori ammessi (stesse regole del browser)
  const str = (value) => (typeof value === 'string' ? value : '');
  const values = {
    settore: str(input.settore),
    azienda: str(input.azienda).replace(/\s+/g, ' ').trim(),
    servizio: str(input.servizio),
    tempistica: str(input.tempistica),
    messaggio: str(input.messaggio).trim(),
    nome: str(input.nome).trim(),
    cognome: str(input.cognome).trim(),
    email: str(input.email).trim().toLowerCase(),
    prefisso: str(input.prefisso),
    telefono: str(input.telefono).trim(),
    preferenza: str(input.preferenza),
    privacy: input.privacy === true,
  };
  const errors = validateAll(values);
  if (!submissionId) errors.submissionId = 'Richiesta non valida.';
  if (Object.keys(errors).length) {
    log('warn', 'invalid', { submissionId, fields: Object.keys(errors) });
    const { submissionId: _ignored, ...fieldErrors } = errors;
    return reply({ ok: false, errors: fieldErrors, message: MESSAGES.generic }, 400);
  }

  const pageUri = str(input.pageUri).slice(0, 500);
  const lead = {
    ...values,
    phone: fullPhone(values),
    ip,
    pageUri: /^https?:\/\//.test(pageUri) ? pageUri : undefined,
    pageName: str(input.pageName).slice(0, 200) || undefined,
    hutk: request.cookies.get('hubspotutk')?.value,
  };

  // 4. doppio invio: stessa richiesta, stessa risposta, nessuna nuova chiamata
  const { duplicate, promise } = once(submissionId, () => handleLead(lead, str(input.recaptchaToken), submissionId));
  if (duplicate) log('info', 'duplicate', { submissionId });
  try {
    const result = await promise;
    log('info', 'done', { submissionId, outcome: result.ok ? 'ok' : result.reason, ms: Date.now() - started });
    if (!result.ok) forget(submissionId);
    if (!result.ok) return reply({ ok: false, message: result.reason === 'recaptcha' ? MESSAGES.recaptcha : MESSAGES.generic }, 400);
    return reply({ ok: true, next: destination(lead) });
  } catch (error) {
    log('error', 'failed', { submissionId, reason: error?.message?.slice(0, 200), ms: Date.now() - started });
    return reply({ ok: false, message: MESSAGES.generic }, 502);
  }
}

async function handleLead(lead, recaptchaToken, submissionId) {
  // reCAPTCHA prima di qualsiasi chiamata a HubSpot
  const captcha = await verifyRecaptcha(recaptchaToken, lead.ip, submissionId);
  if (!captcha.ok) return { ok: false, reason: 'recaptcha' };

  // Forms API: se fallisce si prova comunque il CRM; se falliscono entrambi
  // la richiesta non è registrata e il visitatore riceve un errore
  let formOk = false;
  try {
    await submitForm(lead, { submissionId, consentText: CONSENT_TEXT });
    formOk = true;
  } catch (error) {
    log('error', 'form_failed', { submissionId, status: error.status, reason: error.name });
  }

  // passaggi non riusciti: se ce ne sono, al team arriva la segnalazione
  // (con tutti i dati della richiesta) al posto della notifica normale
  const problems = [];
  let repeated = false;

  let contactId = null;
  try {
    contactId = await upsertContact(lead, submissionId);
  } catch (error) {
    report(error, submissionId, 'contatto');
    if (!formOk) throw new Error('Né submission né contatto registrati');
    problems.push('contatto, azienda e trattativa');
  }

  // da qui la richiesta è registrata: ogni errore viene segnalato, non mostrato
  let companyId = null;
  if (contactId) {
    try {
      companyId = await findOrCreateCompany(lead, submissionId);
      await associateContactCompany(contactId, companyId, submissionId);
    } catch (error) {
      report(error, submissionId, 'azienda');
      problems.push('azienda o associazione contatto-azienda');
    }
    try {
      const deal = await createDeal(lead, { contactId, companyId, submissionId });
      repeated = deal.reused;
      // task di controllo per Matteo: solo per una richiesta nuova (trattativa
      // non riusata), dopo la trattativa; un errore non ferma la richiesta
      if (!deal.reused) await createManagerTask(lead, { contactId, companyId, dealId: deal.id, submissionId });
    } catch (error) {
      report(error, submissionId, 'trattativa');
      problems.push('trattativa');
    }
  }

  if (problems.length) await alertTeam({ submissionId, stage: problems.join('; '), lead });
  // invio ripetuto dello stesso modulo: trattativa riusata, nessuna seconda email
  else if (repeated) log('info', 'team_notification_skipped', { submissionId, reason: 'repeated_submission' });
  else await notifyNewLead({ submissionId, lead });
  return { ok: true };
}

function report(error, submissionId, stage) {
  if (error instanceof MissingScopeError) {
    log('error', 'missing_scope', { submissionId, stage, endpoint: error.endpoint, scopes: error.scopes });
  } else {
    log('error', 'crm_failed', {
      submissionId,
      stage,
      status: error?.status,
      endpoint: error?.endpoint,
      category: error?.body?.category,
    });
  }
}
