#!/usr/bin/env node
// =====================================================================
//  Verifica di un invio reale del modulo contatti (Prompt 15)
//
//  Legge da HubSpot, in sola lettura, i record creati da uno o più invii
//  di prova e controlla: contatto, proprietà del contatto, azienda,
//  associazioni, trattative (numero, fase, proprietario, fonte, servizio).
//  Non scrive nulla, non crea task, non stampa il token.
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
  if (azienda) check(p.company === azienda, 'Contatto company = azienda inserita', p.company || 'vuoto');
  for (const prop of CONTACT_PROPS) {
    const value = p[prop];
    const expected = prop === 'tipo_richiesta_sito' ? EXPECTED_REQUEST[kind] : null;
    check(expected ? value === expected : !!value, `Contatto ${prop}`, value ? String(value).slice(0, 60) : 'vuoto');
  }

  const companies = await hs('GET', `/crm/v4/objects/contact/${contact.id}/associations/company?limit=20`);
  const companyIds = [...new Set((companies?.results || []).map((r) => String(r.toObjectId)))];
  check(companyIds.length > 0, 'Associazione contatto ↔ azienda', companyIds.join(', ') || 'nessuna');
  check(companyIds.length <= 1, 'Una sola azienda associata al contatto', `${companyIds.length}`);
  if (companyIds.length) {
    const read = await hs('POST', '/crm/v3/objects/companies/batch/read', {
      properties: ['name', 'domain', 'hubspot_owner_id', 'settore_agria'],
      inputs: companyIds.map((id) => ({ id })),
    });
    for (const c of read?.results || []) {
      console.log(`       azienda ${c.id}: ${c.properties?.name} · settore ${c.properties?.settore_agria || '—'}`);
      if (azienda) check(c.properties?.name === azienda, '  nome azienda uguale a quello inserito', c.properties?.name);
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
  const fromSite = deals.filter((d) => d.properties?.dealname?.endsWith('— Opportunità da qualificare'));
  const names = fromSite.map((d) => d.properties.dealname);
  const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
  check(fromSite.length >= 1, 'Trattativa dal sito associata al contatto', `${fromSite.length} trovata/e`);
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
  }
}

console.log(`\n${failures === 0 ? 'Tutti i controlli superati.' : `${failures} controlli non superati.`}`);
console.log('Resend: nel terminale di "npm run dev" cercare le righe con "team_notified" (recipients = numero di destinatari) e controllare le caselle.');
console.log('Task: il codice non chiama mai le API dei task.');
process.exitCode = failures ? 1 : 0;
