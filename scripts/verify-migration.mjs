#!/usr/bin/env node
// =====================================================================
//  Verifica automatica della migration map (docs/agria/migration-map-v1.md)
//
//  Per ogni indirizzo della mappa controlla, su un server avviato
//  (npm run build && npm start, oppure un'anteprima):
//  - che esista una regola coerente con l'azione della mappa (lib/migration.js);
//  - KEEP: 200 sul nuovo dominio;
//  - MERGE / 301: un solo 301 verso la destinazione indicata, che risponde 200
//    (nessuna catena, nessuna destinazione inesistente);
//  - DELETE: 410;
//  - vecchio dominio (Host: matteogaruzzo.com): 301 diretto alla destinazione
//    finale su https://agriasystem.com, oppure 410.
//  Controlla anche che ogni indirizzo della sitemap risponda 200.
//
//  Uso: node scripts/verify-migration.mjs [http://localhost:3000]
// =====================================================================

import { readFileSync } from 'node:fs';
import { request } from 'node:http';
import { request as requestTls } from 'node:https';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANONICAL_ORIGIN, OLD_HOSTS, REDIRECTS, resolvePath } from '../lib/migration.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = new URL(process.argv[2] || 'http://localhost:3000');
const OLD_HOST = OLD_HOSTS[0];

// esempi per le righe con segnaposto
const SAMPLES = {
  '/proposta/[id]': ['/proposta/abc123'],
  '/geo': ['/geo', '/geo/piemonte', '/geo/umbria'],
  '/blog/tag/*': ['/blog/tag', '/blog/tag/e-commerce', '/blog/tag/vendita-diretta'],
};
// righe della mappa fuori da questa fase (versioni EN)
const SKIP = (path) => path.startsWith('/en');

function get(path, host) {
  return new Promise((resolve, reject) => {
    const send = BASE.protocol === 'https:' ? requestTls : request;
    const req = send(
      { hostname: BASE.hostname, port: BASE.port, path, method: 'GET', headers: host ? { host } : {} },
      (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location || null });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

// Righe della mappa: { source, action, dest }
function readMap() {
  const rows = [];
  let section = '';
  for (const line of readFileSync(join(ROOT, 'docs/agria/migration-map-v1.md'), 'utf8').split('\n')) {
    if (line.startsWith('#')) section = line;
    if (!line.startsWith('| ') || line.startsWith('|---')) continue;
    const cells = line.slice(1, -1).split('|').map((c) => c.trim());
    const first = cells[0].split(' ')[0];
    if (['URL', 'Articolo', 'Pagina'].includes(first)) continue;
    if (section.startsWith('## Nuove pagine')) {
      if (!SKIP(cells[1])) rows.push({ source: cells[1], action: 'NEW', dest: cells[1] });
      continue;
    }
    const idx = cells.findIndex((c) => /^(KEEP|MERGE|301|DELETE)/.test(c));
    const source = first.startsWith('/') ? first : `/blog/${first}`;
    if (idx === -1) {
      // tabella degli articoli KEEP: nessuna colonna azione
      if (section.includes('KEEP + REWRITE')) rows.push({ source, action: 'KEEP', dest: source });
      continue;
    }
    const action = cells[idx].split(' ')[0];
    const destCell = cells[idx + 1] || '';
    const dest = action === 'KEEP' ? source : destCell.startsWith('/') ? destCell.split(' ')[0] : null;
    rows.push({ source, action, dest });
  }
  return rows;
}

const failures = [];
const fail = (msg) => failures.push(msg);
const pathOf = (location) => (location ? new URL(location, BASE).pathname : null);

const rows = readMap();
const destinations = new Set();

for (const { source, action, dest } of rows) {
  const paths = SAMPLES[source] || [source];
  for (const path of paths) {
    const rule = resolvePath(path);
    const now = await get(path);
    const old = await get(path, OLD_HOST);

    if (action === 'KEEP' || action === 'NEW') {
      if (rule) fail(`${path}: KEEP ma con una regola ${rule.type}`);
      if (now.status !== 200) fail(`${path}: KEEP ma risponde ${now.status}`);
      if (old.status !== 301 || old.location !== `${CANONICAL_ORIGIN}${path === '/' ? '/' : path}`)
        fail(`${path} (vecchio dominio): atteso 301 → ${CANONICAL_ORIGIN}${path}, ottenuto ${old.status} → ${old.location}`);
    } else if (action === 'MERGE' || action === '301') {
      if (rule?.type !== 'redirect' || rule.to !== dest) fail(`${path}: attesa regola → ${dest}, trovata ${JSON.stringify(rule)}`);
      if (now.status !== 301 || pathOf(now.location) !== dest) fail(`${path}: atteso 301 → ${dest}, ottenuto ${now.status} → ${now.location}`);
      if (old.status !== 301 || old.location !== `${CANONICAL_ORIGIN}${dest}`)
        fail(`${path} (vecchio dominio): atteso 301 → ${CANONICAL_ORIGIN}${dest}, ottenuto ${old.status} → ${old.location}`);
      destinations.add(dest);
    } else if (action === 'DELETE') {
      if (rule?.type !== 'gone') fail(`${path}: DELETE senza regola 410`);
      if (now.status !== 410) fail(`${path}: DELETE ma risponde ${now.status}`);
      if (old.status !== 410) fail(`${path} (vecchio dominio): DELETE ma risponde ${old.status}`);
    }
  }
}

// ogni destinazione (della mappa e delle regole) risponde 200, senza reindirizzare
for (const dest of new Set([...destinations, ...Object.values(REDIRECTS)])) {
  const res = await get(dest);
  if (res.status !== 200) fail(`destinazione ${dest}: risponde ${res.status}${res.location ? ` → ${res.location}` : ''}`);
}

// ogni regola corrisponde a una riga della mappa
const mapped = new Set(rows.map((r) => r.source));
for (const source of Object.keys(REDIRECTS)) {
  if (!mapped.has(source)) fail(`regola ${source} non presente nella mappa`);
}

// sitemap: solo indirizzi che rispondono 200
const sitemapRes = await new Promise((resolve, reject) => {
  const send = BASE.protocol === 'https:' ? requestTls : request;
  send({ hostname: BASE.hostname, port: BASE.port, path: '/sitemap.xml' }, (res) => {
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => resolve(body));
  })
    .on('error', reject)
    .end();
});
const locs = [...sitemapRes.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
for (const path of locs) {
  const res = await get(path);
  if (res.status !== 200) fail(`sitemap ${path}: risponde ${res.status}`);
  if (resolvePath(path)) fail(`sitemap ${path}: indirizzo reindirizzato o eliminato`);
}

console.log(`Righe della mappa: ${rows.length} · regole di redirect: ${Object.keys(REDIRECTS).length} · indirizzi in sitemap: ${locs.length}`);
if (failures.length) {
  console.log(`\n${failures.length} problemi:`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log('Tutti i controlli superati.');
}
