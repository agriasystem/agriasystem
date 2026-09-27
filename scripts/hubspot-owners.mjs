#!/usr/bin/env node
// =====================================================================
//  Owner HubSpot del portale (sola lettura)
//
//  Elenca gli owner (ID owner, nome, email) per trovare quello di Matteo
//  Garuzzo da usare in HUBSPOT_MANAGER_OWNER_ID. L'ID owner non è un
//  segreto; il token non viene mai stampato.
//
//  Uso:
//    node scripts/hubspot-owners.mjs          elenca gli owner
//    node scripts/hubspot-owners.mjs --set    in più scrive in .env.local
//                                             HUBSPOT_MANAGER_OWNER_ID con
//                                             l'owner "Matteo Garuzzo"
//
//  Richiede HUBSPOT_PRIVATE_APP_TOKEN in .env.local (o nell'ambiente) e
//  l'ambito crm.objects.owners.read della Private App.
// =====================================================================

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_FILE = join(ROOT, '.env.local');
const VAR = 'HUBSPOT_MANAGER_OWNER_ID';
const MANAGER = ['matteo', 'garuzzo'];

function env(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(ENV_FILE)) return null;
  for (const line of readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
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

const owners = [];
let after;
do {
  const res = await fetch(`https://api.hubapi.com/crm/v3/owners?limit=100&archived=false${after ? `&after=${after}` : ''}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) {
    const scopes = (data.errors || []).flatMap((e) => e.context?.requiredGranularScopes || e.context?.requiredScopes || []);
    console.error(`403 su GET /crm/v3/owners: ambito mancante ${scopes.join(', ') || 'crm.objects.owners.read'}`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`HTTP ${res.status} su GET /crm/v3/owners`);
    process.exit(1);
  }
  owners.push(...(data.results || []));
  after = data.paging?.next?.after;
} while (after);

console.log('ID owner     Nome                          Email');
for (const o of owners) {
  const name = `${o.firstName || ''} ${o.lastName || ''}`.trim() || '—';
  console.log(`${String(o.id).padEnd(12)} ${name.padEnd(29)} ${o.email || '—'}`);
}

const text = (o) => `${o.firstName || ''} ${o.lastName || ''} ${o.email || ''}`.toLowerCase();
const matches = owners.filter((o) => MANAGER.every((w) => text(o).includes(w)));
if (matches.length !== 1) {
  console.log(`\nOwner "Matteo Garuzzo": ${matches.length ? `${matches.length} corrispondenze, scegliere a mano` : 'non trovato'}.`);
  process.exit(process.argv.includes('--set') ? 1 : 0);
}
const id = String(matches[0].id);
console.log(`\nOwner di Matteo Garuzzo: ${id}`);

if (process.argv.includes('--set')) {
  const current = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8') : '';
  const line = `${VAR}=${id}`;
  const pattern = new RegExp(`^\\s*${VAR}\\s*=.*$`, 'm');
  const next = pattern.test(current) ? current.replace(pattern, line) : `${current}${current && !current.endsWith('\n') ? '\n' : ''}${line}\n`;
  writeFileSync(ENV_FILE, next);
  console.log(`${VAR} scritto in .env.local. Aggiungere lo stesso valore anche su Vercel.`);
}
