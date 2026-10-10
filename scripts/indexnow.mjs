#!/usr/bin/env node
// =====================================================================
//  IndexNow (Bing, Copilot e gli altri motori aderenti; Google non lo usa):
//  segnala solo gli indirizzi davvero cambiati, mai l'intero sito.
//
//  1. Prima della pubblicazione, con la nuova versione avviata in locale
//     (npm run build && npm start, con NEXT_PUBLIC_SITE_URL di produzione):
//       node scripts/indexnow.mjs plan --before https://agriasystem.com --after http://localhost:3000
//     Confronta le pagine della sitemap pubblicata con quelle della nuova
//     versione (titolo, descrizione, canonical, robots, testo e collegamenti
//     del contenuto principale, dati strutturati della pagina) e scrive in
//     .indexnow/plan.json gli indirizzi nuovi, modificati e rimossi, con la
//     firma del contenuto atteso. Header, footer e dati dell'organizzazione
//     comuni a tutte le pagine non contano: se cambiano i dati
//     dell'organizzazione, si segnala la home.
//
//  2. Dopo la pubblicazione su agriasystem.com:
//       node scripts/indexnow.mjs submit --dry-run  (mostra cosa invierebbe)
//       node scripts/indexnow.mjs submit            (invio reale)
//     Invia solo se il sito pubblicato è nello stato del piano: pagine nuove
//     e modificate con lo stesso contenuto registrato da plan, pagine rimosse
//     con 301, 308, 404, 410 o noindex; il file della chiave deve rispondere.
//     Dopo un invio riuscito il piano viene archiviato e non si reinvia.
//
//  In alternativa, indirizzi espliciti (nuovi, modificati o rimossi):
//       node scripts/indexnow.mjs submit --url https://agriasystem.com/blog/x [--url ...]
//
//  Chiave: INDEXNOW_KEY in .env.local (o nell'ambiente), la stessa impostata
//  su Vercel prima del deploy, servita da app/indexnow-key.txt. Non viene
//  stampata. L'invio reale è ammesso solo verso https://agriasystem.com.
//
//  Esiti dell'invio: 200 e 202 riusciti; 400, 403 e 422 interrompono senza
//  ripetere; 429, 5xx, errori di rete e timeout (20 s per le pagine, 30 s per
//  l'invio) si ripetono fino a 4 volte con attese crescenti (Retry-After, o 5,
//  15, 45 s). Oltre 10.000 indirizzi l'elenco va in più invii; se uno si
//  interrompe, il piano conserva solo gli indirizzi non ancora inviati.
// =====================================================================

import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANONICAL_ORIGIN } from '../lib/migration.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_FILE = join(ROOT, '.env.local');
const PLAN_DIR = join(ROOT, '.indexnow');
const PLAN_FILE = join(PLAN_DIR, 'plan.json');
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_PATH = '/indexnow-key.txt';
// limite del protocollo per singola richiesta: gli elenchi più lunghi vanno in più invii
const BATCH_SIZE = 10000;
const PAGE_TIMEOUT_MS = 20000;
const SEND_TIMEOUT_MS = 30000;
// 429 e errori temporanei (5xx, rete, timeout): fino a 4 tentativi, attese
// crescenti (Retry-After se presente, altrimenti 5, 15, 45 s)
const SEND_ATTEMPTS = 4;
const BACKOFF_S = [5, 15, 45];
const SITE_IDS = ['/#organization', '/#website'];
const GONE = [301, 308, 404, 410];
// oltre questa soglia un piano che segna tutte le pagine è quasi sempre un
// errore di configurazione (origine diversa, build sbagliata)
const ALL_PAGES_GUARD = 5;

class StopError extends Error {}
const fail = (message) => {
  throw new StopError(message);
};

function env(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(ENV_FILE)) return null;
  for (const line of readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const m = line.match(new RegExp(`^\\s*${name}\\s*=\\s*(.*)\\s*$`));
    if (m) return m[1].replace(/^['"]|['"]$/g, '');
  }
  return null;
}

function args() {
  const [command, ...rest] = process.argv.slice(2);
  const opts = { command, urls: [] };
  for (let i = 0; i < rest.length; i += 1) {
    const a = rest[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--force') opts.force = true;
    else if (a === '--allow-all') opts.allowAll = true;
    else if (['--url', '--before', '--after', '--host'].includes(a)) {
      const value = rest[i + 1];
      if (!value || value.startsWith('--')) fail(`Manca il valore di ${a}.`);
      if (a === '--url') opts.urls.push(value);
      else opts[a.slice(2)] = value;
      i += 1;
    } else fail(`Opzione sconosciuta: ${a}`);
  }
  return opts;
}

const trimSlash = (u) => u.replace(/\/+$/, '');
const origin = (u) => {
  try {
    return new URL(u).origin;
  } catch {
    fail(`Indirizzo non valido: ${u}`);
  }
};

async function get(url) {
  let res;
  try {
    res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'agria-indexnow-script' },
      signal: AbortSignal.timeout(PAGE_TIMEOUT_MS),
    });
  } catch (error) {
    const reason = error.name === 'TimeoutError' ? `nessuna risposta in ${PAGE_TIMEOUT_MS / 1000} s` : error.cause?.code || error.message;
    fail(`${url}: richiesta non riuscita (${reason}).`);
  }
  return { status: res.status, robots: res.headers.get('x-robots-tag') || '', text: await res.text() };
}

// risposta stabile: un errore temporaneo (5xx, 429) viene ripetuto una volta
async function getStable(url) {
  const first = await get(url);
  if (first.status < 500 && first.status !== 429) return first;
  return get(url);
}

async function sitemap(base) {
  const { status, text } = await getStable(`${base}/sitemap.xml`);
  if (status !== 200) fail(`${base}/sitemap.xml risponde ${status}`);
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()));
  return { paths: locs.map((u) => u.pathname || '/'), origins: new Set(locs.map((u) => u.origin)) };
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const isNoindex = ({ status, robots, text }) =>
  status === 200 && (/noindex/i.test(robots) || /<meta name="robots" content="[^"]*noindex/i.test(text));

// Firma del contenuto di una pagina: solo ciò che conta per i motori.
// page: contenuto della pagina; site: dati comuni (organizzazione, sito).
function signature(html) {
  const meta = (name) => html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1] || '';
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] || '';
  const main = (html.split(/<main\b[^>]*>/)[1] || '').split('</main>')[0];
  const body = main.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<style\b[\s\S]*?<\/style>/g, '');
  const text = decode(body.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const links = [...body.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).join(' ');
  const alts = [...body.matchAll(/alt="([^"]*)"/g)].map((m) => m[1]).join(' ');
  const nodes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    try {
      const data = JSON.parse(m[1]);
      return data['@graph'] || [data];
    } catch {
      return [];
    }
  });
  const isSite = (n) => SITE_IDS.some((id) => (n['@id'] || '').endsWith(id));
  const hash = (s) => createHash('sha256').update(s).digest('hex');
  return {
    page: hash([decode(title), decode(meta('description')), canonical, meta('robots'), text, links, alts, JSON.stringify(nodes.filter((n) => !isSite(n)))].join('\n')),
    site: hash(JSON.stringify(nodes.filter(isSite))),
  };
}

async function plan(opts) {
  if (!opts.before || !opts.after) fail('Uso: node scripts/indexnow.mjs plan --before <sito pubblicato> --after <nuova versione>');
  rmSync(PLAN_FILE, { force: true });
  const before = trimSlash(opts.before);
  const after = trimSlash(opts.after);
  const [old, next] = await Promise.all([sitemap(before), sitemap(after)]);

  // le due versioni devono dichiarare la stessa origine canonica: altrimenti
  // ogni canonical e ogni dato strutturato risultano diversi
  const oa = [...old.origins];
  const ob = [...next.origins];
  if (oa.length !== 1 || ob.length !== 1 || oa[0] !== ob[0]) {
    fail(`Origine diversa nelle sitemap: ${oa.join(', ')} (prima) / ${ob.join(', ')} (dopo). Ricompilare la nuova versione con NEXT_PUBLIC_SITE_URL=${oa[0] || CANONICAL_ORIGIN}.`);
  }

  const oldSet = new Set(old.paths);
  const newSet = new Set(next.paths);
  const common = next.paths.filter((p) => oldSet.has(p));
  const added = next.paths.filter((p) => !oldSet.has(p));
  const removed = old.paths.filter((p) => !newSet.has(p));
  const changed = [];
  const expect = {};
  let siteChanged = false;
  let homeSite = null;

  for (const path of common) {
    const [a, b] = await Promise.all([getStable(`${before}${path}`), getStable(`${after}${path}`)]);
    if (a.status >= 500 || b.status >= 500 || a.status === 429 || b.status === 429) {
      fail(`${path}: risponde ${a.status} (prima) / ${b.status} (dopo). Riprovare il piano.`);
    }
    if (a.status !== 200 || b.status !== 200) {
      if (a.status !== b.status) {
        changed.push(path);
        if (b.status === 200) expect[path] = { page: signature(b.text).page };
      }
      continue;
    }
    const sa = signature(a.text);
    const sb = signature(b.text);
    if (path === '/') homeSite = sb.site;
    if (sa.page !== sb.page) {
      changed.push(path);
      expect[path] = { page: sb.page };
    }
    if (sa.site !== sb.site) siteChanged = true;
  }
  if (siteChanged && newSet.has('/')) {
    if (!changed.includes('/')) changed.push('/');
    expect['/'] = { ...(expect['/'] || {}), site: homeSite };
  }
  for (const path of added) {
    const page = await getStable(`${after}${path}`);
    if (page.status === 200) expect[path] = { page: signature(page.text).page };
  }

  if (!opts.allowAll && common.length > ALL_PAGES_GUARD && changed.length >= common.length) {
    fail(`Il piano segna tutte le ${common.length} pagine come modificate: quasi sempre è un errore di configurazione (build diversa, data o fuso orario). Controllare, oppure rieseguire con --allow-all.`);
  }

  const result = { before, after, changed, added, removed, expect };
  mkdirSync(PLAN_DIR, { recursive: true });
  writeFileSync(PLAN_FILE, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Pagine confrontate: ${common.length}`);
  for (const [label, list] of [['Modificate', changed], ['Nuove', added], ['Rimosse', removed]]) {
    console.log(`${label}: ${list.length}${list.length ? `\n  ${list.join('\n  ')}` : ''}`);
  }
  if (siteChanged) console.log("Dati dell'organizzazione cambiati: segnalata la home.");
  console.log(`Piano salvato in .indexnow/plan.json. Dopo la pubblicazione: node scripts/indexnow.mjs submit`);
}

async function submit(opts) {
  const key = (env('INDEXNOW_KEY') || '').trim();
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) fail('INDEXNOW_KEY mancante o non valida (8-128 caratteri: lettere, cifre, trattini).');
  const host = trimSlash(opts.host || CANONICAL_ORIGIN);
  if (origin(host) !== host) fail(`Host non valido: ${host} (solo schema e dominio, es. ${CANONICAL_ORIGIN}).`);
  if (!opts.dryRun && host !== CANONICAL_ORIGIN) {
    fail(`Invio reale ammesso solo verso ${CANONICAL_ORIGIN}; altri host (${host}) solo con --dry-run.`);
  }

  // indirizzi da segnalare, con lo stato atteso sul sito pubblicato
  let items;
  const fromPlan = !opts.urls.length;
  if (!fromPlan) {
    items = opts.urls.map((url) => ({ url, expect: 'any' }));
  } else {
    if (!existsSync(PLAN_FILE)) fail('Nessun piano: eseguire prima `node scripts/indexnow.mjs plan ...` oppure passare --url.');
    const p = JSON.parse(readFileSync(PLAN_FILE, 'utf8'));
    if (trimSlash(p.before || '') !== host && !opts.force) {
      fail(`Il piano confronta ${p.before}, non ${host}: rieseguire plan --before ${host} --after <nuova versione>.`);
    }
    items = [
      ...[...p.changed, ...p.added].map((path) => ({ url: `${host}${path}`, expect: 'live', sig: p.expect?.[path] })),
      ...p.removed.map((path) => ({ url: `${host}${path}`, expect: 'gone' })),
    ];
  }
  items = items.filter((item, i) => items.findIndex((x) => x.url === item.url) === i);
  if (!items.length) {
    console.log('Nessun indirizzo da segnalare.');
    return;
  }
  const foreign = items.filter((item) => origin(item.url) !== host);
  if (foreign.length) fail(`Indirizzi fuori da ${host}:\n  ${foreign.map((i) => i.url).join('\n  ')}`);

  // il file della chiave deve essere pubblicato: senza, l'invio viene rifiutato
  const keyFile = await get(`${host}${KEY_PATH}`);
  if (keyFile.status !== 200 || keyFile.text.trim() !== key) {
    fail(`${host}${KEY_PATH}: chiave non pubblicata o diversa da INDEXNOW_KEY (stato ${keyFile.status}). Impostare INDEXNOW_KEY su Vercel e ripubblicare.`);
  }

  // il deploy deve essere online: si segnalano solo pagine nello stato finale
  const problems = [];
  for (const item of items) {
    const res = await getStable(item.url);
    const gone = GONE.includes(res.status) || isNoindex(res);
    if (item.expect === 'gone') {
      if (!gone) problems.push(`${item.url}: risponde ${res.status}, atteso 301/308/404/410 o noindex`);
    } else if (item.expect === 'any') {
      if (res.status !== 200 && !gone) problems.push(`${item.url}: risponde ${res.status}`);
    } else if (res.status !== 200) {
      problems.push(`${item.url}: risponde ${res.status}, atteso 200`);
    } else if (item.sig) {
      const s = signature(res.text);
      if ((item.sig.page && s.page !== item.sig.page) || (item.sig.site && s.site !== item.sig.site)) {
        problems.push(`${item.url}: contenuto diverso da quello del piano (deploy non ancora online?)`);
      }
    }
  }
  if (problems.length && !opts.force) {
    fail(`Il sito pubblicato non è ancora nello stato atteso:\n  ${problems.join('\n  ')}\nRiprovare dopo il deploy (oppure --force).`);
  }

  const urls = items.map((i) => i.url);
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) batches.push(urls.slice(i, i + BATCH_SIZE));
  console.log(`Indirizzi da segnalare (${urls.length}${batches.length > 1 ? `, in ${batches.length} invii` : ''}):\n  ${urls.join('\n  ')}`);
  if (opts.dryRun) {
    console.log('Prova (--dry-run): nessun invio.');
    return;
  }

  const base = { host: new URL(host).hostname, key, keyLocation: `${host}${KEY_PATH}` };
  const sent = [];
  for (const [n, urlList] of batches.entries()) {
    const label = batches.length > 1 ? ` (invio ${n + 1}/${batches.length}, ${urlList.length} indirizzi)` : '';
    const outcome = await send({ ...base, urlList });
    console.log(`IndexNow${label}: ${outcome.message}`);
    if (!outcome.ok) {
      if (fromPlan && sent.length) keepUnsent(sent);
      process.exitCode = 1;
      return;
    }
    sent.push(...urlList);
  }
  if (fromPlan) {
    const archived = join(PLAN_DIR, `inviato-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    renameSync(PLAN_FILE, archived);
    console.log(`Piano archiviato in .indexnow/${archived.split('/').pop()}: non verrà reinviato.`);
  }
}

// Esito di un invio. 200 e 202 sono riusciti; 400, 403 e 422 sono errori della
// richiesta, che ripetuta darebbe lo stesso risultato; 429, 5xx, errori di rete
// e timeout sono temporanei e si ripetono con attese crescenti.
const MEANING = {
  200: 'ricevuti',
  202: 'ricevuti, chiave in verifica',
  400: 'richiesta non valida',
  403: 'chiave non valida o file della chiave non trovato',
  422: 'indirizzi non del dominio o chiave non corrispondente',
  429: 'troppe richieste',
};
const wait = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

async function send(payload) {
  for (let attempt = 1; attempt <= SEND_ATTEMPTS; attempt += 1) {
    let status = null;
    let retryAfter = null;
    let reason;
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
      });
      status = res.status;
      retryAfter = Number(res.headers.get('retry-after')) || null;
      reason = `HTTP ${status} (${MEANING[status] || (status >= 500 ? 'errore temporaneo del servizio' : 'risposta inattesa')})`;
    } catch (error) {
      reason = error.name === 'TimeoutError' ? `nessuna risposta in ${SEND_TIMEOUT_MS / 1000} s` : `errore di rete (${error.cause?.code || error.message})`;
    }
    if (status === 200 || status === 202) return { ok: true, message: reason };
    const temporary = status === null || status === 429 || status >= 500;
    if (!temporary) return { ok: false, message: `${reason}: invio interrotto, nessun nuovo tentativo.` };
    if (attempt === SEND_ATTEMPTS) return { ok: false, message: `${reason}: ${SEND_ATTEMPTS} tentativi falliti, riprovare più tardi.` };
    const delay = Math.min(retryAfter || BACKOFF_S[attempt - 1], 120);
    console.log(`IndexNow: ${reason}, nuovo tentativo tra ${delay} s (${attempt + 1}/${SEND_ATTEMPTS}).`);
    await wait(delay);
  }
  return { ok: false, message: 'invio non riuscito' };
}

// Invio interrotto a metà: il piano conserva solo gli indirizzi non ancora inviati.
function keepUnsent(sentUrls) {
  const done = new Set(sentUrls.map((u) => new URL(u).pathname || '/'));
  const p = JSON.parse(readFileSync(PLAN_FILE, 'utf8'));
  for (const list of ['changed', 'added', 'removed']) p[list] = p[list].filter((path) => !done.has(path));
  writeFileSync(PLAN_FILE, `${JSON.stringify(p, null, 2)}\n`);
  console.log(`Piano aggiornato: restano ${p.changed.length + p.added.length + p.removed.length} indirizzi da inviare.`);
}

try {
  const opts = args();
  if (opts.command === 'plan') await plan(opts);
  else if (opts.command === 'submit') await submit(opts);
  else fail('Uso: node scripts/indexnow.mjs plan --before <url> --after <url> | submit [--dry-run] [--url <indirizzo>]');
} catch (error) {
  if (!(error instanceof StopError)) throw error;
  console.error(error.message);
  process.exitCode = 1;
}
