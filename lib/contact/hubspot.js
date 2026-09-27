import { ASSOCIATION, HUBSPOT, OBJECT, SERVICE_TO_DEAL } from './config';
import { HttpError, log, request } from './http';

// ---------------------------------------------------------------------------
//  Errori
// ---------------------------------------------------------------------------

// 403 per ambito mancante della Private App: registra endpoint e ambiti
// richiesti (errors[].context.requiredGranularScopes, o requiredScopes nelle
// risposte più vecchie). Il chiamante lo segnala: non si ampliano ambiti.
export class MissingScopeError extends Error {
  constructor(endpoint, scopes) {
    super(`Ambito mancante per ${endpoint}: ${scopes.join(', ') || 'non indicato'}`);
    this.endpoint = endpoint;
    this.scopes = scopes;
  }
}

function scopesFrom(body) {
  const found = new Set();
  for (const error of body?.errors || []) {
    for (const key of ['requiredGranularScopes', 'requiredScopes']) {
      for (const scope of error?.context?.[key] || []) found.add(scope);
    }
  }
  return [...found];
}

function token() {
  const value = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!value) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN non configurato');
  return value;
}

// Chiamata alle API CRM con il token della Private App (usata anche da
// manager-task.js).
export async function crm(method, path, { body, endpoint, ok, retry } = {}) {
  try {
    return await request(`${HUBSPOT.apiHost}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      endpoint: `${method} ${endpoint}`,
      ok,
      retry,
    });
  } catch (error) {
    if (error instanceof HttpError && error.status === 403) {
      throw new MissingScopeError(`${method} ${endpoint}`, scopesFrom(error.body));
    }
    throw error;
  }
}

// Messaggi d'errore della Forms API per il registro: citano campi e regole,
// non i valori; per sicurezza email e sequenze di cifre vengono oscurate.
function errorMessages(body) {
  return (body?.errors || []).map((error) =>
    String(error?.message || '')
      .replace(/[^\s@'"]+@[^\s@'"]+/g, '[email]')
      .replace(/\+?\d[\d\s./-]{5,}\d/g, '[numero]')
      .slice(0, 240)
  );
}

// Proprietà rifiutate dalle API CRM (PROPERTY_DOESNT_EXIST, INVALID_OPTION):
// il messaggio contiene un elenco JSON con "name":"proprietà", e alcune
// risposte le riportano in errors[].context.propertyName.
function rejectedProperties(body, candidates) {
  const found = new Set();
  for (const match of String(body?.message || '').matchAll(/\\?"name\\?"\s*:\s*\\?"([a-z0-9_]+)/gi)) found.add(match[1]);
  for (const error of body?.errors || []) for (const name of error?.context?.propertyName || []) found.add(name);
  return candidates.filter((name) => found.has(name));
}

// ---------------------------------------------------------------------------
//  Forms API: la submission registra la richiesta sul modulo HubSpot
//  (e crea o aggiorna il contatto per email, secondo le regole del portale)
// ---------------------------------------------------------------------------

// Valore del modulo per ogni proprietà HubSpot che il sito conosce: serve per
// inviare i campi e per aggiungere un campo che il modulo HubSpot richiede.
function knownValues(lead) {
  return {
    firstname: lead.nome,
    lastname: lead.cognome,
    email: lead.email,
    phone: lead.phone,
    company: lead.azienda,
    name: lead.azienda,
    settore_agria: lead.settore,
    servizio_di_interesse_sito: lead.servizio,
    tempistica_progetto: lead.tempistica,
    message: lead.messaggio,
    tipo_richiesta_sito: lead.preferenza,
  };
}

// Campi inviati alla Forms API, con l'oggetto definito nel modulo HubSpot
// (verificato sugli errori del portale): company e settore_agria sono
// obbligatori; settore_agria è una proprietà dell'azienda (0-2).
export function formFields(lead) {
  const value = knownValues(lead);
  return [
    { objectTypeId: OBJECT.contact, name: 'firstname', value: value.firstname },
    { objectTypeId: OBJECT.contact, name: 'lastname', value: value.lastname },
    { objectTypeId: OBJECT.contact, name: 'email', value: value.email },
    { objectTypeId: OBJECT.contact, name: 'phone', value: value.phone },
    { objectTypeId: OBJECT.contact, name: 'company', value: value.company },
    { objectTypeId: OBJECT.company, name: 'name', value: value.name },
    { objectTypeId: OBJECT.company, name: 'settore_agria', value: value.settore_agria },
    { objectTypeId: OBJECT.contact, name: 'servizio_di_interesse_sito', value: value.servizio_di_interesse_sito },
    { objectTypeId: OBJECT.contact, name: 'tempistica_progetto', value: value.tempistica_progetto },
    { objectTypeId: OBJECT.contact, name: 'message', value: value.message },
    { objectTypeId: OBJECT.contact, name: 'tipo_richiesta_sito', value: value.tipo_richiesta_sito },
  ].filter((field) => field.value);
}

// Errori della Forms API come { type, objectTypeId, name }: i messaggi citano
// il campo come 'fields.nome', 'nome' o '0-2/nome'.
function formErrors(body) {
  return (body?.errors || []).map((error) => {
    const match = String(error?.message || '').match(/'(?:fields\.)?(?:(0-\d+)\/)?([A-Za-z0-9_.-]+)'/);
    return { type: error?.errorType, objectTypeId: match?.[1] || null, name: match?.[2] || null };
  });
}

// Correzione della submission dopo un 400: toglie i campi che il modulo non
// ha, aggiunge i campi obbligatori che il sito conosce (sull'oggetto indicato
// da HubSpot). null se gli errori non sono correggibili.
function fixFields(fields, errors, lead) {
  const value = knownValues(lead);
  let next = [...fields];
  let changed = false;
  for (const error of errors) {
    if (!error.name) return null;
    if (error.type === 'FIELD_NOT_IN_FORM_DEFINITION') {
      if (error.name === 'email') return null;
      const before = next.length;
      next = next.filter((f) => !(f.name === error.name && (!error.objectTypeId || f.objectTypeId === error.objectTypeId)));
      changed = changed || next.length !== before;
    } else if (error.type === 'REQUIRED_FIELD') {
      const objectTypeId = error.objectTypeId || OBJECT.contact;
      if (!value[error.name]) return null;
      if (!next.some((f) => f.name === error.name && f.objectTypeId === objectTypeId)) {
        next.push({ objectTypeId, name: error.name, value: value[error.name] });
        changed = true;
      }
    } else {
      return null;
    }
  }
  return changed ? next : null;
}

export async function submitForm(lead, { submissionId, consentText }) {
  let fields = formFields(lead);
  const payload = () => ({
    submittedAt: String(Date.now()),
    fields,
    context: {
      pageUri: lead.pageUri,
      pageName: lead.pageName,
      ...(lead.ip && lead.ip !== 'sconosciuto' ? { ipAddress: lead.ip } : {}),
      ...(lead.hutk ? { hutk: lead.hutk } : {}),
    },
    // solo consenso al trattamento, nessuna comunicazione commerciale
    legalConsentOptions: {
      consent: { consentToProcess: true, text: consentText, communications: [] },
    },
  });
  const describeFields = () => fields.map((f) => `${f.objectTypeId}/${f.name}`);

  let lastError;
  for (const host of HUBSPOT.formsHosts) {
    const url = `${host}/submissions/v3/integration/submit/${HUBSPOT.portalId}/${HUBSPOT.formId}`;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await request(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload()),
          endpoint: `POST forms/submit (${new URL(host).hostname})`,
        });
        log('info', 'form_submitted', { submissionId, host: new URL(host).hostname, fields: describeFields() });
        return { ok: true };
      } catch (error) {
        lastError = error;
        if (!(error instanceof HttpError)) throw error;
        const errors = formErrors(error.body);
        const fixed = error.status === 400 && attempt < 3 ? fixFields(fields, errors, lead) : null;
        if (fixed) {
          log('warn', 'form_fields_adjusted', {
            submissionId,
            errors: errors.map((e) => `${e.type}:${e.objectTypeId ? `${e.objectTypeId}/` : ''}${e.name}`),
          });
          fields = fixed;
          continue;
        }
        log('warn', 'form_submit_failed', {
          submissionId,
          host: new URL(host).hostname,
          status: error.status,
          errorTypes: errors.map((e) => e.type),
          // solo i nomi dei campi citati negli errori, mai i valori inviati
          fields: errors.map((e) => (e.objectTypeId ? `${e.objectTypeId}/${e.name}` : e.name)).filter(Boolean),
          messages: errorMessages(error.body),
        });
        break;
      }
    }
    // host successivo solo se questo non conosce il portale o il modulo
    if (!(lastError instanceof HttpError) || lastError.status !== 404) break;
  }
  throw lastError;
}

// ---------------------------------------------------------------------------
//  CRM: contatto, azienda, trattativa e associazioni
// ---------------------------------------------------------------------------

// Creazione o aggiornamento con una sola ripetizione se HubSpot rifiuta una
// proprietà (inesistente o valore non ammesso): il record si salva senza di
// essa e l'evento viene registrato. required: proprietà mai da togliere.
async function withRejectedRetry(send, properties, { submissionId, event, required = [] }) {
  try {
    return await send(properties);
  } catch (error) {
    const optional = Object.keys(properties).filter((key) => !required.includes(key));
    const rejected = error instanceof HttpError && error.status === 400 ? rejectedProperties(error.body, optional) : [];
    if (!rejected.length) throw error;
    log('warn', event, { submissionId, rejected });
    return send(Object.fromEntries(Object.entries(properties).filter(([key]) => !rejected.includes(key))));
  }
}

// Proprietà del contatto: dati di base più le proprietà del modulo
// (servizio, tempistica, tipo di richiesta, messaggio), scritte via CRM per
// non dipendere dalla sola submission.
function contactProperties(lead) {
  const custom = Object.fromEntries(
    Object.entries(HUBSPOT.contactProperties)
      .map(([property, field]) => [property, lead[field]])
      .filter(([, value]) => value)
  );
  return {
    email: lead.email,
    firstname: lead.nome,
    lastname: lead.cognome,
    phone: lead.phone,
    company: lead.azienda,
    ...custom,
  };
}

// Contatto per email: se esiste si aggiorna, altrimenti si crea con
// proprietario Alessandro. Un contatto esistente riceve il proprietario solo
// se non ne ha già uno. Il 409 copre il caso in cui la submission lo abbia
// appena creato.
export async function upsertContact(lead, submissionId) {
  const properties = contactProperties(lead);
  const found = await crm(
    'GET',
    `/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email&properties=hubspot_owner_id`,
    { endpoint: '/crm/v3/objects/contacts/{email}', ok: [404] }
  );

  const update = async (id, currentOwner) => {
    const props = currentOwner ? properties : { ...properties, hubspot_owner_id: HUBSPOT.owner };
    await withRejectedRetry(
      (body) => crm('PATCH', `/crm/v3/objects/contacts/${id}`, { body: { properties: body }, endpoint: '/crm/v3/objects/contacts/{id}' }),
      props,
      { submissionId, event: 'contact_property_rejected', required: ['email'] }
    );
    log('info', 'contact_updated', { submissionId, contactId: id, ownerSet: !currentOwner });
    return id;
  };

  if (found.status === 200 && found.body?.id) return update(found.body.id, found.body.properties?.hubspot_owner_id);

  const created = await withRejectedRetry(
    (body) =>
      crm('POST', '/crm/v3/objects/contacts', {
        body: { properties: body },
        endpoint: '/crm/v3/objects/contacts',
        ok: [409],
        retry: false,
      }),
    { ...properties, hubspot_owner_id: HUBSPOT.owner },
    { submissionId, event: 'contact_property_rejected', required: ['email'] }
  );
  if (created.status === 409) {
    const existing = String(created.body?.message || '').match(/Existing ID:\s*(\d+)/);
    if (!existing) throw new Error('Contatto duplicato senza identificativo');
    // creato nel frattempo (dalla submission): si aggiorna con i dati del modulo
    const owner = await crm('GET', `/crm/v3/objects/contacts/${existing[1]}?properties=hubspot_owner_id`, {
      endpoint: '/crm/v3/objects/contacts/{id}',
    });
    return update(existing[1], owner.body?.properties?.hubspot_owner_id);
  }
  log('info', 'contact_created', { submissionId, contactId: created.body.id });
  return created.body.id;
}

// Nome azienda normalizzato per il confronto: minuscole, senza accenti né
// punteggiatura, spazi singoli ("Cantina  Agrodolce S.r.l." → "cantina agrodolce srl").
export function normalizeCompanyName(name) {
  return String(name)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[.'’`,]/g, '')
    .replace(/[^a-z0-9&]+/g, ' ')
    .trim();
}

// Azienda con lo stesso nome normalizzato. La ricerca HubSpot trova il nome
// esatto (EQ, senza distinzione di maiuscole) e i nomi che contengono la
// parola più lunga; il confronto finale è sul nome normalizzato. Il dominio
// dell'email NON è un criterio: il nome inserito nel modulo è la fonte.
async function searchCompany(lead) {
  const target = normalizeCompanyName(lead.azienda);
  const token = target.split(' ').sort((x, y) => y.length - x.length)[0];
  const filterGroups = [{ filters: [{ propertyName: 'name', operator: 'EQ', value: lead.azienda }] }];
  if (token && token.length >= 3) {
    filterGroups.push({ filters: [{ propertyName: 'name', operator: 'CONTAINS_TOKEN', value: token }] });
  }
  const search = await crm('POST', '/crm/v3/objects/companies/search', {
    body: {
      filterGroups,
      properties: ['name', 'hubspot_owner_id'],
      sorts: [{ propertyName: 'createdate', direction: 'ASCENDING' }],
      limit: 100,
    },
    endpoint: '/crm/v3/objects/companies/search',
  });
  // la più vecchia con lo stesso nome normalizzato (se ce ne fossero più d'una)
  return (search.body?.results || []).find((c) => normalizeCompanyName(c.properties?.name || '') === target) || null;
}

// Azienda per nome inserito nel modulo: se ne esiste una con lo stesso nome
// normalizzato si riusa (e riceve il proprietario solo se non ne ha uno),
// altrimenti si crea con name, settore_agria e proprietario Alessandro.
export async function findOrCreateCompany(lead, submissionId) {
  const match = await searchCompany(lead);
  if (match) {
    if (!match.properties?.hubspot_owner_id) {
      await crm('PATCH', `/crm/v3/objects/companies/${match.id}`, {
        body: { properties: { hubspot_owner_id: HUBSPOT.owner } },
        endpoint: '/crm/v3/objects/companies/{id}',
      });
    }
    log('info', 'company_reused', { submissionId, companyId: match.id, by: 'name', ownerSet: !match.properties?.hubspot_owner_id });
    return match.id;
  }

  const properties = { name: lead.azienda, settore_agria: lead.settore, hubspot_owner_id: HUBSPOT.owner };
  const create = (body) =>
    crm('POST', '/crm/v3/objects/companies', { body: { properties: body }, endpoint: '/crm/v3/objects/companies', retry: false });
  try {
    const created = await withRejectedRetry(create, properties, {
      submissionId,
      event: 'company_property_rejected',
      required: ['name'],
    });
    log('info', 'company_created', { submissionId, companyId: created.body.id });
    return created.body.id;
  } catch (error) {
    // timeout o errore temporaneo: l'azienda potrebbe essere stata creata comunque
    const again = await searchCompany(lead).catch(() => null);
    if (again) {
      log('info', 'company_reused', { submissionId, companyId: again.id, by: 'recheck' });
      return again.id;
    }
    throw error;
  }
}

export async function associateContactCompany(contactId, companyId, submissionId) {
  await crm('PUT', `/crm/v4/objects/contact/${contactId}/associations/default/company/${companyId}`, {
    endpoint: '/crm/v4/objects/contact/{id}/associations/default/company/{id}',
  });
  log('info', 'contact_company_associated', { submissionId, contactId, companyId });
}

const DEAL_WINDOW_MS = 15 * 60 * 1000;

// Trattativa aperta con lo stesso nome, associata al contatto e creata negli
// ultimi 15 minuti. Legge le associazioni del contatto (immediate, non
// soggette al ritardo dell'indice di ricerca), poi i dati delle trattative.
async function recentDealForContact(contactId, dealname) {
  const links = await crm('GET', `/crm/v4/objects/contact/${contactId}/associations/deal?limit=100`, {
    endpoint: '/crm/v4/objects/contact/{id}/associations/deal',
  });
  const ids = (links.body?.results || []).map((r) => String(r.toObjectId)).slice(-50);
  if (!ids.length) return null;
  const deals = await crm('POST', '/crm/v3/objects/deals/batch/read', {
    body: { properties: ['dealname', 'createdate', 'hs_is_closed'], inputs: ids.map((id) => ({ id })) },
    endpoint: '/crm/v3/objects/deals/batch/read',
  });
  const since = Date.now() - DEAL_WINDOW_MS;
  const match = (deals.body?.results || []).find(
    (deal) =>
      deal.properties?.dealname === dealname &&
      deal.properties?.hs_is_closed !== 'true' &&
      Date.parse(deal.properties?.createdate || deal.createdAt || 0) >= since
  );
  return match ? match.id : null;
}

// Trattativa con associazioni a contatto e azienda, fase secondo il tipo di
// richiesta, proprietario Alessandro, fonte "Sito web". Nessuna seconda
// trattativa identica: prima di crearla (e prima di riprovare dopo un errore)
// si cerca una trattativa aperta con lo stesso nome sul contatto.
// Restituisce { id, reused }: reused = invio ripetuto dello stesso modulo.
export async function createDeal(lead, { contactId, companyId, submissionId }) {
  const { deal } = HUBSPOT;
  const dealname = deal.name(lead.azienda);

  const existing = await recentDealForContact(contactId, dealname);
  if (existing) {
    log('info', 'deal_reused', { submissionId, dealId: existing });
    return { id: existing, reused: true };
  }

  const properties = {
    dealname,
    pipeline: deal.pipeline,
    dealstage: deal.stages[lead.preferenza] || deal.defaultStage,
    hubspot_owner_id: HUBSPOT.owner,
    [deal.sourceProperty]: deal.sourceValue,
    [deal.serviceProperty]: SERVICE_TO_DEAL[lead.servizio],
  };
  const associations = [
    { to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: ASSOCIATION.dealToContact }] },
    ...(companyId
      ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: ASSOCIATION.dealToPrimaryCompany }] }]
      : []),
  ];
  const create = (body) =>
    crm('POST', '/crm/v3/objects/deals', {
      body: { properties: body, associations },
      endpoint: '/crm/v3/objects/deals',
      retry: false,
    });

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const created = await withRejectedRetry(create, properties, {
        submissionId,
        event: 'deal_property_rejected',
        required: ['dealname', 'pipeline', 'dealstage', 'hubspot_owner_id'],
      });
      log('info', 'deal_created', { submissionId, dealId: created.body.id, stage: properties.dealstage });
      return { id: created.body.id, reused: false };
    } catch (error) {
      const temporary = !(error instanceof HttpError) || error.status === 429 || error.status >= 500;
      if (attempt === 2 || !temporary || error instanceof MissingScopeError) throw error;
      // errore temporaneo o timeout: la trattativa potrebbe esistere già
      const recheck = await recentDealForContact(contactId, dealname).catch(() => null);
      if (recheck) {
        // creata dal tentativo precedente (risposta persa): è la stessa richiesta
        log('info', 'deal_reused', { submissionId, dealId: recheck, by: 'recheck' });
        return { id: recheck, reused: false };
      }
      log('warn', 'deal_retry', { submissionId, reason: error.status || error.name });
    }
  }
  throw new Error('Trattativa non creata');
}
