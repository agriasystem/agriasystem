import { HUBSPOT } from './config';
import { HttpError, log } from './http';
import { MissingScopeError, crm } from './hubspot';

// =====================================================================
//  Task di controllo per Matteo sui lead dal sito.
//  Un task HubSpot per ogni nuova richiesta, assegnato a Matteo e associato
//  a contatto, azienda e trattativa. Non cambia nulla della logica CRM:
//  trattativa, contatto e azienda restano ad Alessandro.
//
//  Owner di Matteo: variabile HUBSPOT_MANAGER_OWNER_ID (ID owner HubSpot, da
//  scripts/hubspot-owners.mjs). Se manca, il task non viene creato e l'evento
//  viene registrato: la richiesta del sito va comunque a buon fine.
// =====================================================================

// Tipi di associazione predefiniti HubSpot (task → oggetto)
const TASK_TO = { contact: 204, company: 192, deal: 216 };
const TIME_ZONE = 'Europe/Rome';
const DUE_HOUR = 18; // scadenza: oggi alle 18 (ora italiana), o a fine giornata se già passate

export const managerTaskSubject = (azienda) => `Nuovo lead sito — ${azienda}`;

function managerOwnerId() {
  const value = String(process.env.HUBSPOT_MANAGER_OWNER_ID || '').trim();
  return /^\d+$/.test(value) ? value : null;
}

// Differenza in minuti tra l'ora di Roma e UTC in un dato istante
function romeOffsetMinutes(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return Math.round((asUtc - date.getTime()) / 60000);
}

// Scadenza di oggi (ora italiana): le 18, oppure le 23:59 se le 18 sono passate
export function dueToday(now = new Date()) {
  const offset = romeOffsetMinutes(now);
  const local = new Date(now.getTime() + offset * 60000); // "ora di Roma" letta come UTC
  const at = (h, m) =>
    Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), h, m) - offset * 60000;
  const six = at(DUE_HOUR, 0);
  return new Date(six > now.getTime() ? six : at(23, 59)).toISOString();
}

const escape = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const REQUEST_TYPE = { 'Fissare una videocall': 'videocall', 'Ricevere maggiori informazioni': 'informazioni' };

function taskBody(lead, dealname) {
  const rows = [
    ['Nome e cognome', `${lead.nome} ${lead.cognome}`],
    ['Azienda', lead.azienda],
    ['Email', lead.email],
    ['Telefono', lead.phone],
    ['Servizio richiesto', lead.servizio],
    ['Tempistica', lead.tempistica],
    ['Tipo richiesta', REQUEST_TYPE[lead.preferenza] || lead.preferenza],
    ['Trattativa', dealname],
  ];
  return rows.map(([k, v]) => `<strong>${escape(k)}:</strong> ${escape(v)}`).join('<br>');
}

// Task già presente sulla trattativa con lo stesso titolo e lo stesso owner
// (secondo invio arrivato a un'altra istanza, o risposta persa dopo la creazione)
async function existingTask(dealId, subject, ownerId) {
  const links = await crm('GET', `/crm/v4/objects/deal/${dealId}/associations/task?limit=100`, {
    endpoint: '/crm/v4/objects/deal/{id}/associations/task',
  });
  const ids = (links.body?.results || []).map((r) => String(r.toObjectId));
  if (!ids.length) return null;
  const tasks = await crm('POST', '/crm/v3/objects/tasks/batch/read', {
    body: { properties: ['hs_task_subject', 'hubspot_owner_id'], inputs: ids.map((id) => ({ id })) },
    endpoint: '/crm/v3/objects/tasks/batch/read',
  });
  const match = (tasks.body?.results || []).find(
    (t) => t.properties?.hs_task_subject === subject && t.properties?.hubspot_owner_id === ownerId
  );
  return match ? match.id : null;
}

// Crea il task per Matteo dopo che la trattativa è stata creata e associata.
// Non lancia mai: un errore viene registrato e la richiesta prosegue.
export async function createManagerTask(lead, { contactId, companyId, dealId, submissionId }) {
  const ownerId = managerOwnerId();
  if (!ownerId) {
    log('warn', 'manager_task_skipped', { submissionId, reason: 'owner_not_configured' });
    return null;
  }
  if (!dealId || !contactId) {
    log('warn', 'manager_task_skipped', { submissionId, reason: 'missing_records' });
    return null;
  }
  const subject = managerTaskSubject(lead.azienda);
  const dealname = HUBSPOT.deal.name(lead.azienda);

  try {
    const existing = await existingTask(dealId, subject, ownerId);
    if (existing) {
      log('info', 'manager_task_exists', { submissionId, taskId: existing, dealId });
      return existing;
    }

    const association = (id, typeId) => ({
      to: { id },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: typeId }],
    });
    const body = {
      properties: {
        hs_task_subject: subject,
        hs_task_body: taskBody(lead, dealname),
        hs_timestamp: dueToday(),
        hubspot_owner_id: ownerId,
        hs_task_status: 'NOT_STARTED',
        hs_task_type: 'TODO',
      },
      associations: [
        association(contactId, TASK_TO.contact),
        ...(companyId ? [association(companyId, TASK_TO.company)] : []),
        association(dealId, TASK_TO.deal),
      ],
    };

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const created = await crm('POST', '/crm/v3/objects/tasks', { body, endpoint: '/crm/v3/objects/tasks', retry: false });
        log('info', 'manager_task_created', { submissionId, taskId: created.body.id, dealId, associations: body.associations.length });
        return created.body.id;
      } catch (error) {
        const temporary = !(error instanceof HttpError) || error.status === 429 || error.status >= 500;
        if (attempt === 2 || !temporary || error instanceof MissingScopeError) throw error;
        // timeout o errore temporaneo: il task potrebbe esistere già
        const recheck = await existingTask(dealId, subject, ownerId).catch(() => null);
        if (recheck) {
          log('info', 'manager_task_created', { submissionId, taskId: recheck, dealId, by: 'recheck' });
          return recheck;
        }
      }
    }
  } catch (error) {
    if (error instanceof MissingScopeError) {
      log('error', 'manager_task_failed', { submissionId, endpoint: error.endpoint, scopes: error.scopes });
    } else {
      log('error', 'manager_task_failed', { submissionId, status: error?.status, endpoint: error?.endpoint, reason: error?.status ? undefined : error?.name });
    }
  }
  return null;
}
