#!/usr/bin/env node
// =====================================================================
//  Verifica della produzione, in sola lettura: i testi delle fasi A e B del
//  Prompt 22, le pagine soluzione del Prompt 23 e l'eroe, la banda e la barra
//  contatti del Prompt 24 sono online, Poppins non si scarica su nessuna pagina,
//  le pagine rimosse rispondono ancora 410 e dal vecchio dominio ogni indirizzo
//  arriva a destinazione in non più di due salti.
//
//  Uso: node scripts/verifica-produzione.mjs [base]
//       base predefinita: https://agriasystem.com (per una prova in locale:
//       node scripts/verifica-produzione.mjs http://localhost:3000; il
//       controllo del vecchio dominio gira solo sulla base di produzione)
//
//  Stampa OK / NO per ogni controllo ed esce con codice 1 se uno non passa.
//  Gli indirizzi rimossi e reindirizzati si ricavano dalla migration map
//  (docs/agria/migration-map-v1.md) e dalle regole di lib/migration.js, più un
//  indirizzo di prova sotto ogni prefisso rimosso: nessun elenco scritto a mano.
//  Quando i testi controllati cambiano, si aggiorna questo file.
// =====================================================================

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANONICAL_ORIGIN, GONE, GONE_PREFIXES, OLD_HOSTS, REDIRECTS, resolvePath } from '../lib/migration.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.argv[2] || 'https://agriasystem.com').replace(/\/+$/, '');
const TIMEOUT_MS = 20000;
const SERVICES = ['/servizi/digital-presence', '/servizi/digital-commerce', '/servizi/digital-automation'];
const SOLUTIONS = [
  ['/soluzioni/assistente-ai', 'Serve un chatbot per rispondere ai clienti?'],
  ['/soluzioni/gestione-richieste', 'Email, WhatsApp, telefono, portali: chi raccoglie le richieste?'],
  ['/soluzioni/collegare-gestionale-e-sito', 'Si può collegare quello che usate già? Sì, se il sistema lo permette.'],
];

const decode = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// path relativo alla base, oppure indirizzo completo (fogli di stile su altri domini)
async function get(path) {
  try {
    const res = await fetch(new URL(path, `${BASE}/`), {
      redirect: 'manual',
      headers: { 'User-Agent': 'agria-verifica-produzione' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return { status: res.status, location: res.headers.get('location'), html: decode(await res.text()) };
  } catch (error) {
    return { status: 0, html: '', error: error.cause?.code || error.message };
  }
}

// segue i redirect uno alla volta: quanti salti, indirizzo e stato finali
async function follow(url) {
  for (let hops = 0; hops <= 5; hops++) {
    try {
      const res = await fetch(url, {
        redirect: 'manual',
        headers: { 'User-Agent': 'agria-verifica-produzione' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      await res.body?.cancel();
      const location = res.headers.get('location');
      if (res.status < 300 || res.status >= 400 || !location) return { hops, url, status: res.status };
      url = new URL(location, url).href;
    } catch (error) {
      return { hops, url, status: 0, error: error.cause?.code || error.message };
    }
  }
  return { hops: 6, url, status: 0, error: 'troppi redirect' };
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

// Prompt 23: pagine soluzione, contatto rapido nell'header, indicazioni della hero
for (const [path, title] of SOLUTIONS) {
  const html = await page(path);
  check(`${path}, h1: "${title}"`, h(1, title).test(html) && html.includes('id="cosa-non-fa"'));
}
const soluzioni = await get('/soluzioni');
check(
  '/soluzioni rimanda a /servizi (308)',
  soluzioni.status === 308 && soluzioni.location && new URL(soluzioni.location, `${BASE}/`).pathname === '/servizi',
  soluzioni.error || `risponde ${soluzioni.status} verso ${soluzioni.location}`
);
const automation = (await page('/servizi/digital-automation')).match(/<main[\s\S]*<\/main>/)?.[0] || '';
check('/servizi/digital-automation: link alle tre pagine soluzione', SOLUTIONS.every(([path]) => automation.includes(`href="${path}"`)));
check(
  'Home: indicazioni della hero (Vi risponde una persona, Prima analisi prima di qualunque proposta, Il codice e i dati restano vostri)',
  ['Vi risponde una persona', 'Prima analisi prima di qualunque proposta', 'Il codice e i dati restano vostri'].every((t) => home.includes(t))
);
const anchors = home.match(/<a\s[^>]*>/g) || [];
check(
  'Header: telefono e WhatsApp con data-analytics e location "header"',
  [
    ['href="tel:', 'phone'],
    ['href="https://wa.me/', 'whatsapp'],
  ].every(([href, event]) =>
    anchors.some((a) => a.includes(href) && a.includes(`data-analytics="${event}"`) && a.includes('data-analytics-location="header"'))
  )
);

// Prompt 24: eroe e banda della home, scritta del logo, barra contatti sotto md
check(
  'Home, h1 fisso: "Prenotazioni e ordini, senza ricopiarli a mano.", nessun "strato digitale"',
  h(1, 'Prenotazioni e ordini, senza ricopiarli a mano.').test(home) && !home.includes('strato digitale')
);
check('Home: eyebrow con cosa facciamo e per chi', home.includes('Siti, e-commerce e automazioni per agriturismi, hotel, cantine e frantoi'));
check(
  'Home: la frase che spiega, al posto del lead',
  home.includes('Non vi facciamo cambiare gestionale: colleghiamo il sito, le prenotazioni, gli ordini e le email a quello che usate già, così ogni informazione si scrive una volta sola.')
);
// nella banda alcuni valori hanno lo spazio unificatore
const homePlain = home.replace(/ /g, ' ');
check(
  'Home: banda con i quattro impegni (Fatto da noi, Decidete voi, Anche un no, Liberi), nessun attributo di prima',
  ['Fatto da noi', 'Decidete voi', 'Anche un no', 'Liberi'].every((t) => homePlain.includes(`>${t}<`)) && !home.includes('settori: hospitality, cantine, frantoi')
);
const wordmark = home.match(/aria-label="Agria System, home"[\s\S]*?<span aria-hidden="true" class="leading-none([^"]*)"/)?.[1];
check('Header: scritta "Agria System" visibile anche su mobile', wordmark !== undefined && !wordmark.includes('hidden'));
const headerLinks = anchors.filter((a) => a.includes('data-analytics-location="header"'));
check('Header: telefono e WhatsApp una volta sola (su mobile li porta la barra)', headerLinks.length === 2);
// la barra sta nel layout: si controlla anche su una pagina diversa dalla home
const hrefOf = (a) => a.match(/href="([^"]*)"/)?.[1];
for (const [name, html] of [['Home', home], ['/azienda', azienda]]) {
  const bar = [...html.matchAll(/<a\s[^>]*data-analytics-location="barra_mobile"[^>]*>([\s\S]*?)<\/a>/g)];
  check(
    `${name}: barra contatti con WhatsApp e Chiamateci, stessi recapiti dell'header, spazio riservato sul body`,
    bar.map((m) => m[1].replace(/<[^>]+>/g, '')).join() === 'WhatsApp,Chiamateci' &&
      bar.every((m) => headerLinks.some((a) => hrefOf(a) === hrefOf(m[0]))) &&
      /<body[^>]*class="[^"]*pb-\[var\(--contact-bar\)\]/.test(html)
  );
}

// Poppins non si scarica su nessuna pagina della sitemap (Prompt 23). Un font web
// si scarica solo se un foglio di stile lo dichiara (@font-face, @import) o se
// un <link> lo carica: il controllo fallisce appena Poppins diventa scaricabile,
// anche quando l'ordine dei fogli di stile lo lascerebbe inutilizzato.
// --font-poppins non conta: è il nome storico della variabile del font di sistema.
const paths = [...(await get('/sitemap.xml')).html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);
check('Sitemap: le tre pagine soluzione', SOLUTIONS.every(([path]) => paths.includes(path)));
const sheets = new Map(); // foglio di stile (o stile in linea) -> { css, pages }
const poppinsLinks = [];
for (const path of paths) {
  const html = await page(path);
  for (const tag of html.match(/<link\b[^>]*>/g) || []) {
    const href = tag.match(/\bhref="([^"]*)"/)?.[1] || '';
    if (/poppins/i.test(href)) poppinsLinks.push(`${path}: ${href}`);
    if (!/\brel="stylesheet"/.test(tag)) continue;
    if (!sheets.has(href)) {
      const res = await get(href);
      sheets.set(href, { css: res.status === 200 ? res.html : null, pages: [] });
    }
    sheets.get(href).pages.push(path);
  }
  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    sheets.set(`${path} (stile in linea)`, { css, pages: [path] });
  }
}
const where = (name, { pages }) => `${name} (${pages.length === 1 ? pages[0] : `${pages.length} pagine`})`;
const unreadable = [...sheets].filter(([, s]) => s.css === null).map(([name, s]) => `${where(name, s)} non risponde 200`);
const downloadable = [...sheets]
  .filter(([, s]) => s.css && [...(s.css.match(/@font-face\s*{[^}]*}/g) || []), ...(s.css.match(/@import[^;]*;/g) || [])].some((r) => /poppins/i.test(r)))
  .map(([name, s]) => `${where(name, s)}: @font-face o @import Poppins`);
check(
  `Poppins non si scarica: nessun @font-face, @import o <link> Poppins su ${paths.length} pagine (${sheets.size} fogli di stile)`,
  paths.length > 0 && !unreadable.length && !downloadable.length && !poppinsLinks.length,
  [...unreadable, ...downloadable, ...poppinsLinks].join('\n    ') || 'sitemap vuota o non leggibile'
);
const named = [...sheets]
  .filter(([, s]) => s.css && /poppins/i.test(s.css.replace(/--font-poppins\b/g, '')))
  .map(([name, s]) => where(name, s));
check('Nessun foglio di stile nomina Poppins (--font-poppins è system-ui, sans-serif)', !named.length, named.join('\n    '));

// Indirizzi vecchi: quelli della mappa e delle regole che hanno una regola
// (redirect o "gone")
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
const rules = [...candidates]
  .sort()
  .map((path) => [path, resolvePath(path)])
  .filter(([, rule]) => rule);
const gone = rules.filter(([, rule]) => rule.type === 'gone').map(([path]) => path);

// Pagine rimosse
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

// Vecchio dominio, solo sulla produzione vera. Vercel reindirizza ogni host di
// OLD_HOSTS su agriasystem.com, stesso percorso, prima dell'app: i redirect della
// mappa fanno quindi due salti (308 del dominio, 301 dell'app), i 410 uno. Le
// build locali non passano da quel redirect, che va controllato qui: ogni
// indirizzo vecchio arriva in non più di due salti alla destinazione della mappa
// (200) o al 410 previsto.
if (BASE === CANONICAL_ORIGIN) {
  const MAX_HOPS = 2;
  const wrongOld = [];
  for (const host of OLD_HOSTS) {
    for (const [path, rule] of rules) {
      const url = new URL(rule.type === 'redirect' ? rule.to : path, CANONICAL_ORIGIN).href;
      const status = rule.type === 'redirect' ? 200 : 410;
      const end = await follow(`https://${host}${path}`);
      if (end.hops > MAX_HOPS || end.url !== url || end.status !== status) {
        wrongOld.push(
          `${host}${path}: ${end.hops} salti, ${end.status || end.error} su ${end.url} (attesi al più ${MAX_HOPS} salti, ${status} su ${url})`
        );
      }
    }
  }
  check(
    `Vecchio dominio (${OLD_HOSTS.join(', ')}): ${rules.length - gone.length} redirect e ${gone.length} indirizzi rimossi arrivano a destinazione (200 o 410) in al più ${MAX_HOPS} salti`,
    wrongOld.length === 0,
    wrongOld.join('\n    ')
  );
} else {
  console.log(`--  Vecchio dominio: saltato, si controlla solo su ${CANONICAL_ORIGIN}`);
}

const failed = results.filter((ok) => !ok).length;
console.log(`\n${results.length - failed} controlli superati, ${failed} non superati.`);
if (failed) process.exitCode = 1;
