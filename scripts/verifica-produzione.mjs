#!/usr/bin/env node
// =====================================================================
//  Verifica della produzione, in sola lettura: i testi delle fasi A e B del
//  Prompt 22 sono online e le pagine rimosse rispondono ancora 410.
//
//  Uso: node scripts/verifica-produzione.mjs [base]
//       base predefinita: https://agriasystem.com (per una prova in locale:
//       node scripts/verifica-produzione.mjs http://localhost:3000)
//
//  Stampa OK / NO per ogni controllo ed esce con codice 1 se uno non passa.
//  Gli indirizzi 410 si ricavano dalla migration map (docs/agria/migration-map-v1.md)
//  e dalle regole di lib/migration.js, più un indirizzo di prova sotto ogni
//  prefisso rimosso: nessun elenco scritto a mano.
//  Quando i testi controllati cambiano, si aggiorna questo file.
// =====================================================================

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GONE, GONE_PREFIXES, REDIRECTS, resolvePath } from '../lib/migration.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.argv[2] || 'https://agriasystem.com').replace(/\/+$/, '');
const TIMEOUT_MS = 20000;
const SERVICES = ['/servizi/digital-presence', '/servizi/digital-commerce', '/servizi/digital-automation'];

const decode = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function get(path) {
  try {
    const res = await fetch(BASE + path, {
      redirect: 'manual',
      headers: { 'User-Agent': 'agria-verifica-produzione' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return { status: res.status, html: decode(await res.text()) };
  } catch (error) {
    return { status: 0, html: '', error: error.cause?.code || error.message };
  }
}

const results = [];
const check = (label, ok, detail = '') => {
  results.push(ok);
  console.log(`${ok ? 'OK' : 'NO'}  ${label}${!ok && detail ? `\n    ${detail}` : ''}`);
};
const page = async (path) => {
  const res = await get(path);
  if (res.status !== 200) check(`${path} risponde 200`, false, res.error || `risponde ${res.status}`);
  return res.html;
};
const h = (level, text, id) =>
  new RegExp(`<h${level}[^>]*${id ? `id="${id}"[^>]*` : ''}>${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h${level}>`);

console.log(`Verifica di ${BASE}\n`);

// Fase A
const hospitality = await page('/settori/hospitality');
check('Hospitality, h1: "Siti e prenotazioni dirette per agriturismi e hotel."', h(1, 'Siti e prenotazioni dirette per agriturismi e hotel.').test(hospitality));

const azienda = await page('/azienda');
check(
  'Azienda, title: "Azienda — Agria System, technology company per hospitality, cantine e frantoi"',
  azienda.includes('<title>Azienda — Agria System, technology company per hospitality, cantine e frantoi</title>')
);
check(
  'Azienda, lead: "Agria System lavora in tre settori: hospitality (agriturismi, hotel e strutture ricettive), cantine e frantoi."',
  azienda.includes('Agria System lavora in tre settori: hospitality (agriturismi, hotel e strutture ricettive), cantine e frantoi.')
);

const home = await page('/');
check('Home: "Oggi i vostri dati stanno in sei posti."', home.includes('Oggi i vostri dati stanno in sei posti.'));
// etichetta della sezione articoli (non il link del footer, che dice Insights da prima)
check('Home: etichetta "Insights" sulla sezione articoli, nessun "News"', />Insights<\/p>\s*<h2[^>]*id="home-news-title"/.test(home) && !/>News</.test(home));
check('Home: "Portali di prenotazione" nel modulo, nessun "Booking.com"', home.includes('Portali di prenotazione') && !home.includes('Booking.com'));
check('Home: riga sul limite sotto il modulo', home.includes("L'integrazione è possibile quando i sistemi la permettono"));

// Fase B
check(
  'Home: sezione #quando-interveniamo con h2 "Quando serviamo, e quando no."',
  home.includes('id="quando-interveniamo"') && h(2, 'Quando serviamo, e quando no.', 'quando-interveniamo-titolo').test(home)
);
check(
  'Home: i tre blocchi in h3 (Quando ha senso chiamarci, Quando non ha senso, Come lo capiamo)',
  ['Quando ha senso chiamarci', 'Quando non ha senso', 'Come lo capiamo'].every((t) => h(3, t).test(home))
);
check('Home: "Può concludersi con un no, e in quel caso ve lo diciamo con il motivo."', home.includes('Può concludersi con un no, e in quel caso ve lo diciamo con il motivo.'));
check('Home: h2 "Strumenti nostri, in sviluppo.", nessun "Meglio dirlo subito"', h(2, 'Strumenti nostri, in sviluppo.').test(home) && !home.includes('Meglio dirlo subito'));
for (const path of SERVICES) {
  const html = await page(path);
  check(
    `${path}: rimando breve con il link a /#quando-interveniamo`,
    html.includes('Non prendiamo progetti che non cambiano il modo di lavorare o di vendere') && html.includes('href="/#quando-interveniamo"')
  );
}

// Pagine rimosse: indirizzi della mappa e delle regole che risultano "gone"
const candidates = new Set([...GONE, ...Object.keys(REDIRECTS)]);
for (const line of readFileSync(join(ROOT, 'docs/agria/migration-map-v1.md'), 'utf8').split('\n')) {
  if (!line.startsWith('| ') || line.startsWith('|---')) continue;
  for (const cell of line.slice(1, -1).split('|')) {
    const first = cell.trim().split(' ')[0];
    // esclusi i segnaposto della mappa (/proposta/[id], /blog/tag/*): i prefissi hanno già una prova
    if (first.startsWith('/') && !first.startsWith('/en') && !/[[*]/.test(first)) candidates.add(first);
  }
}
for (const prefix of GONE_PREFIXES) {
  candidates.add(prefix.replace(/\/$/, ''));
  candidates.add(`${prefix}prova-sotto-percorso`);
}
const gone = [...candidates].filter((path) => resolvePath(path)?.type === 'gone').sort();
const wrong = [];
for (const path of gone) {
  const res = await get(path);
  if (res.status !== 410) wrong.push(`${path} risponde ${res.status || res.error}`);
}
check(
  `Indirizzi rimossi (mappa, regole e una prova per prefisso): ${gone.length - wrong.length} su ${gone.length} rispondono 410`,
  wrong.length === 0,
  wrong.join('\n    ')
);

const failed = results.filter((ok) => !ok).length;
console.log(`\n${results.length - failed} controlli superati, ${failed} non superati.`);
if (failed) process.exitCode = 1;
