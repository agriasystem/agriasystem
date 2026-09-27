#!/usr/bin/env node
// =====================================================================
//  Verifica di un invio reale del modulo contatti (Prompt 15)
//
//  Legge da HubSpot, in sola lettura, i record creati da uno o più invii
//  di prova e controlla: contatto, proprietà del contatto, azienda,
//  associazioni, trattative (numero, fase, proprietario, fonte, servizio).
//  Controlla anche il task di controllo per Matteo (uno per trattativa,
//  owner HUBSPOT_MANAGER_OWNER_ID). Non scrive nulla, non stampa il token.
//
//  Uso (dopo aver inviato il modulo dal browser):
//    node scripts/verify-contact-test.mjs --info=email1@dominio.it --call=email2@dominio.it
//  --info: email usata con "Ricevere maggiori informazioni"
//  --call: email usata con "Fissare una videocall"
//  Facoltativi: --info-azienda="Nome" e --call-azienda="Nome" per controllare
//  che l'azienda associata sia esattamente quella inserita nel modulo.
//
//  Richiede HUBSPOT_PRIVATE_APP_TOKEN in .env.local (o nell'ambiente).
// =====================================================================

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://api.hubapi.com';
const OWNER = '37994989';
const STAGES = { info: '6062102776', call: '6062103741' };
const STAGE_NAMES = { '6062102776': 'Nuovo Lead', '6062103741': 'Appuntamento da Fissare' };
const CONTACT_PROPS = ['servizio_di_interesse_sito', 'tempistica_progetto', 'tipo_richiesta_sito', 'message'];
const EXPECTED_REQUEST = { info: 'Ricevere maggiori informazioni', call: 'Fissare una videocall' };

function env(name) {
  if (process.env[name]) return process.env[name];
  const file = join(ROOT, '.env.local');
  if (!existsSync(file)) return null;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(new RegExp(`^\\s*${name}\\s*=\\s*(.*)\\s*$`));
    if (m) return m[1].replace(/^['"]|['"]$/g, '');
  }
  return null;
}

const TOKEN = env('HUBSPOT_PRIVATE_APP_TOKEN');
const MANAGER = env('HUBSPOT_MANAGER_OWNER_ID');
if (!TOKEN) {
  console.error('HUBSPOT_PRIVATE_APP_TOKEN mancante in .env.local');
  process.exit(1);
}

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => {
      const [k, ...rest] = a.replace(/^--/, '').split('=');
      return [k, rest.join('=')];
    })
    .filter(([k, v]) => k && v)
);
const cases = ['info', 'call']
  .filter((k) => args[k])
  .map((k) => ({ kind: k, email: args[k].trim().toLowerCase(), azienda: args[`${k}-azienda`]?.trim() }));
if (!cases.length) {
  console.error('Indica almeno --info=email oppure --call=email');
  process.exit(1);
}

async function hs(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) {
    const scopes = (data.errors || []).flatMap((e) => e.context?.requiredGranularScopes || e.context?.requiredScopes || []);
    throw new Error(`403 su ${method} ${path.split('?')[0]}: ambito mancante ${scopes.join(', ') || '(non indicato)'}`);
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status} su ${method} ${path.split('?')[0]}`);
  return data;
}

const ok = (cond) => (cond ? 'OK ' : 'NO ');
let failures = 0;
function check(cond, label, detail = '') {
  if (!cond) failures += 1;
  console.log(`  [${ok(cond)}] ${label}${detail ? `: ${detail}` : ''}`);
}

for (const { kind, email, azienda } of cases) {
  console.log(`\n=== TEST ${kind === 'info' ? 'A · Ricevere maggiori informazioni' : 'B · Fissare una videocall'} (${email}) ===`);
  const contact = await hs(
    'GET',
    `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=${[
      'firstname', 'lastname', 'phone', 'company', 'hubspot_owner_id', 'settore_agria', ...CONTACT_PROPS,
    ].join(',')}`
  );
  check(!!contact, 'Contatto trovato', contact ? `ID ${contact.id}` : 'nessun contatto con questa email');
  if (!contact) continue;
  const p = contact.properties || {};
  check(p.hubspot_owner_id === OWNER, 'Proprietario contatto Alessandro Poponi', p.hubspot_owner_id || 'vuoto');
  // se il contatto ha inviato più richieste, le sue proprietà sono quelle dell'ultima
  const latest = !azienda || p.company === azienda;
  if (!latest) console.log(`       il contatto è stato aggiornato da una richiesta successiva (${p.company}): proprietà non confrontate`);
  for (const prop of latest ? CONTACT_PROPS : []) {
    const value = p[prop];
    const expected = prop === 'tipo_richiesta_sito' ? EXPECTED_REQUEST[kind] : null;
    check(expected ? value === expected : !!value, `Contatto ${prop}`, value ? String(value).slice(0, 60) : 'vuoto');
  }

  const companies = await hs('GET', `/crm/v4/objects/contact/${contact.id}/associations/company?limit=20`);
  const companyIds = [...new Set((companies?.results || []).map((r) => String(r.toObjectId)))];
  check(companyIds.length > 0, 'Associazione contatto ↔ azienda', companyIds.join(', ') || 'nessuna');
  if (companyIds.length) {
    const read = await hs('POST', '/crm/v3/objects/companies/batch/read', {
      properties: ['name', 'domain', 'hubspot_owner_id', 'settore_agria'],
      inputs: companyIds.map((id) => ({ id })),
    });
    for (const c of read?.results || []) {
      console.log(`       azienda ${c.id}: ${c.properties?.name} · settore ${c.properties?.settore_agria || '—'}`);
      check(c.properties?.hubspot_owner_id === OWNER, `Proprietario azienda ${c.id}`, c.properties?.hubspot_owner_id || 'vuoto (azienda già esistente con proprietario?)');
    }
  }

  const dealLinks = await hs('GET', `/crm/v4/objects/contact/${contact.id}/associations/deal?limit=100`);
  const dealIds = (dealLinks?.results || []).map((r) => String(r.toObjectId));
  const deals = dealIds.length
    ? (
        await hs('POST', '/crm/v3/objects/deals/batch/read', {
          properties: ['dealname', 'dealstage', 'pipeline', 'hubspot_owner_id', 'fonte_lead_agria', 'servizio_di_interesse', 'createdate', 'hs_is_closed'],
          inputs: dealIds.map((id) => ({ id })),
        })
      )?.results || []
    : [];
  const fromSiteAll = deals.filter((d) => d.properties?.dealname?.endsWith('— Opportunità da qualificare'));
  // con --*-azienda si controlla solo la trattativa di quella richiesta
  const fromSite = azienda ? fromSiteAll.filter((d) => d.properties.dealname === `${azienda} — Opportunità da qualificare`) : fromSiteAll;
  if (azienda) console.log(`       trattative dal sito sul contatto: ${fromSiteAll.length}, di questa azienda: ${fromSite.length}`);
  const names = fromSite.map((d) => d.properties.dealname);
  const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
  check(fromSite.length >= 1, 'Trattativa dal sito associata al contatto', `${fromSite.length} trovata/e`);
  if (azienda) check(fromSite.length === 1, 'Una sola trattativa per questa richiesta', `${fromSite.length}`);
  check(duplicates.length === 0, 'Nessuna trattativa duplicata', duplicates.length ? `duplicati: ${[...new Set(duplicates)].join(', ')}` : 'una per azienda');
  for (const d of fromSite) {
    const dp = d.properties || {};
    console.log(`       trattativa ${d.id}: ${dp.dealname} · creata ${dp.createdate}`);
    check(dp.pipeline === 'default', '  pipeline default', dp.pipeline);
    check(dp.dealstage === STAGES[kind], `  fase ${STAGE_NAMES[STAGES[kind]]}`, `${dp.dealstage} (${STAGE_NAMES[dp.dealstage] || 'altra fase'})`);
    check(dp.hubspot_owner_id === OWNER, '  proprietario Alessandro Poponi', dp.hubspot_owner_id || 'vuoto');
    check(dp.fonte_lead_agria === 'Sito web', '  fonte_lead_agria = Sito web', dp.fonte_lead_agria || 'vuoto');
    check(!!dp.servizio_di_interesse, '  servizio_di_interesse', dp.servizio_di_interesse || 'vuoto');
    const dealCompanies = await hs('GET', `/crm/v4/objects/deal/${d.id}/associations/company?limit=10`);
    const linked = (dealCompanies?.results || []).map((r) => String(r.toObjectId));
    check(linked.some((id) => companyIds.includes(id)), '  associazione trattativa ↔ azienda', linked.join(', ') || 'nessuna');
    if (azienda && linked.length) {
      const named = await hs('POST', '/crm/v3/objects/companies/batch/read', { properties: ['name'], inputs: linked.map((id) => ({ id })) });
      const names = (named?.results || []).map((c) => c.properties?.name);
      check(names.includes(azienda), '  azienda della trattativa = azienda inserita', names.join(', '));
    }
    const taskLinks = await hs('GET', `/crm/v4/objects/deal/${d.id}/associations/task?limit=100`);
    const taskIds = (taskLinks?.results || []).map((r) => ({ id: String(r.toObjectId) }));
    const tasks = taskIds.length
      ? (await hs('POST', '/crm/v3/objects/tasks/batch/read', { properties: ['hs_task_subject', 'hubspot_owner_id'], inputs: taskIds }))?.results || []
      : [];
    const company = dp.dealname.replace(/ — Opportunità da qualificare$/, '');
    const managerTasks = tasks.filter((t) => t.properties?.hs_task_subject === `Nuovo lead sito — ${company}`);
    check(managerTasks.length === 1, '  un solo task "Nuovo lead sito" sulla trattativa', `${managerTasks.length}`);
    for (const t of managerTasks) {
      check(!MANAGER || t.properties?.hubspot_owner_id === MANAGER, '  task assegnato a Matteo (HUBSPOT_MANAGER_OWNER_ID)', t.properties?.hubspot_owner_id || 'vuoto');
    }
  }
}

console.log(`\n${failures === 0 ? 'Tutti i controlli superati.' : `${failures} controlli non superati.`}`);
console.log('Resend: nel terminale di "npm run dev" cercare le righe con "team_notified" (recipients = numero di destinatari) e controllare le caselle.');
process.exitCode = failures ? 1 : 0;
