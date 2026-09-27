import { Resend } from 'resend';
import { site } from '@/lib/data';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const TEAM_EMAIL = process.env.TEAM_NOTIFICATION_EMAIL || site.email;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://agriasystem.com';

function listItems(items) {
  return items.map((i) => `<li>${i.name} — <span style="color:#666">${i.benefit}</span></li>`).join('');
}

function proposalUrl(leadId) {
  return `${SITE_URL}/proposta/${leadId}`;
}

// Inviata solo dopo che Calendly conferma davvero uno slot (vedi
// components/Quiz/QuizFlow.jsx, handleScheduled). Calendly manda comunque
// la propria conferma con data/ora/invito calendario: questa email è un
// complemento, contiene la proposta e il link per riaprirla quando vuole.
export async function sendClientConfirmation({ contact, recommendation, leadId }) {
  if (!resend) throw new Error('RESEND_API_KEY non configurata');

  const items = [...recommendation.core, ...recommendation.recommended];
  const link = proposalUrl(leadId);
  const html = `
    <p>Ciao ${contact.nome},</p>
    <p>La tua call con ${site.founder} è confermata — a breve ricevi (o hai già ricevuto) l'invito
    con data, ora e link della videochiamata direttamente da Calendly.</p>
    <p>Nel frattempo, ecco la tua proposta preliminare, basata su quello che ci hai raccontato:</p>
    <ul>${listItems(items)}</ul>
    <p><a href="${link}">Rivedi la tua proposta online →</a></p>
    <p>Non è un preventivo: ne parliamo insieme in call per confermarla e capire i prossimi passi.</p>
    <p>A presto,<br />${site.founder}</p>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: contact.email,
    subject: `Call confermata + la tua proposta — ${site.name}`,
    html,
  });
  if (error) throw new Error(`Resend error: ${error.message || JSON.stringify(error)}`);
  return data;
}

// Inviata allo stesso momento della conferma cliente: a call fissata, Matteo
// ha già sotto mano la proposta generata per quel cliente specifico.
export async function notifyTeam({ contact, responses, recommendation, leadId }) {
  if (!resend) throw new Error('RESEND_API_KEY non configurata');

  const urgencyFlag = responses.urgency === 'subito' ? '🔴' : '🟡';
  const items = [...recommendation.core, ...recommendation.recommended, ...recommendation.optional];
  const link = proposalUrl(leadId);

  const html = `
    <p>${urgencyFlag} <strong>Call confermata su Calendly</strong> — ${contact.nome}${
      contact.azienda ? ` (${contact.azienda})` : ''
    }</p>
    <ul>
      <li>Email: ${contact.email}</li>
      <li>Telefono: ${contact.telefono || '—'}</li>
      <li>Urgenza dichiarata: ${responses.urgency || '—'}</li>
      <li>Obiettivo: ${responses.objective || '—'}</li>
      <li>Attività: ${(responses.businesses || []).join(', ') || '—'}</li>
      <li>Ha già: ${(responses.existingTools || []).join(', ') || '—'}</li>
      ${responses.websiteUrl ? `<li>Sito indicato: <a href="${responses.websiteUrl}">${responses.websiteUrl}</a></li>` : ''}
    </ul>
    ${
      responses.siteAnalysis?.success
        ? `<p>Analisi automatica del sito: piattaforma ${responses.siteAnalysis.platform || 'non riconosciuta'},
           e-commerce ${responses.siteAnalysis.hasEcommerce ? 'presente' : 'assente'},
           prenotazioni ${responses.siteAnalysis.hasBooking ? 'presenti' : 'assenti'}.</p>`
        : responses.websiteUrl
        ? '<p>Analisi automatica del sito non riuscita (sito non raggiungibile o non analizzabile).</p>'
        : ''
    }
    <p>Servizi suggeriti dal motore regole:</p>
    <ul>${listItems(items)}</ul>
    ${responses.notes ? `<p>Note libere del cliente: ${responses.notes}</p>` : ''}
    <p><a href="${link}">Apri la proposta completa (utile prima della call) →</a></p>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: TEAM_EMAIL,
    subject: `${urgencyFlag} Call confermata: ${contact.nome}`,
    html,
  });
  if (error) throw new Error(`Resend error: ${error.message || JSON.stringify(error)}`);
  return data;
}

export function isEmailConfigured() {
  return Boolean(resend);
}
