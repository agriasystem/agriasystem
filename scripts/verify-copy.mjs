#!/usr/bin/env node
// =====================================================================
//  Controllo dei testi (npm run verify:copy): cerca nei file di content/ le
//  formule promozionali vietate e stampa file, riga e contesto.
//  - Le sette formule vietate sono errori: lo script esce con codice 1.
//  - "agenzia" / "agency" sono avvisi: nei contenuti editoriali possono
//    comparire legittimamente (per esempio quando una guida spiega come si
//    valuta un fornitore). Vanno controllati: non devono riferirsi a noi.
//  - Le occorrenze legittime si dichiarano in scripts/verify-copy.exceptions.json
//    con percorso, termine, un frammento del testo e il motivo; non contano
//    come errori né come avvisi, ma vengono elencate.
//  Non è legato alla build.
// =====================================================================

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['content'];
const EXTENSIONS = /\.(js|jsx|mjs|json|md)$/;
const EXCEPTIONS_FILE = join(ROOT, 'scripts', 'verify-copy.exceptions.json');

// termine: nome mostrato nel report; pattern: forme da cercare (senza
// distinzione tra maiuscole e minuscole)
const ERRORS = [
  { term: 'passione', pattern: /\bpassion[ei]\b/gi },
  { term: 'eccellenza', pattern: /\beccellenz[ae]\b/gi },
  { term: 'su misura', pattern: /\bsu\s+misura\b/gi },
  { term: 'a 360 gradi', pattern: /\ba\s+360\s*(?:gradi|[°º])/gi },
  { term: 'soluzioni innovative', pattern: /\bsoluzion[ei](?:\s+\p{L}+)?\s+innovativ[ae]\b/giu },
  { term: 'partner ideale', pattern: /\bpartner(?:\s+\p{L}+)?\s+ideal[ei]\b/giu },
  { term: 'giovani e dinamici', pattern: /\bgiovan[ei]\s*(?:e|,|&)\s*dinamic(?:[oaie]|he)\b/gi },
];
const WARNINGS = [
  { term: 'agenzia', pattern: /\bagenzi[ae]\b/gi },
  { term: 'agency', pattern: /\bagenc(y|ies)\b/gi },
];

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : EXTENSIONS.test(name) ? [path] : [];
  });
}

function loadExceptions() {
  let list;
  try {
    list = JSON.parse(readFileSync(EXCEPTIONS_FILE, 'utf8'));
  } catch (error) {
    console.error(`File delle eccezioni non leggibile: ${relative(ROOT, EXCEPTIONS_FILE)} (${error.message})`);
    process.exit(1);
  }
  for (const [i, e] of list.entries()) {
    if (!e.path || !e.term || !e.context || !e.reason) {
      console.error(`Eccezione ${i + 1} incompleta: servono path, term, context e reason.`);
      process.exit(1);
    }
  }
  for (const [i, e] of list.entries()) {
    const rule = [...ERRORS, ...WARNINGS].find((r) => r.term === e.term);
    if (!rule || !new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')).test(e.context)) {
      console.error(`Eccezione ${i + 1}: il contesto non contiene «${e.term}».`);
      process.exit(1);
    }
  }
  return list.map((e) => ({ ...e, path: e.path.replace(/\\/g, '/'), used: 0 }));
}

const exceptions = loadExceptions();
const found = { error: [], warning: [], excepted: [] };

for (const file of SCAN_DIRS.flatMap((d) => files(join(ROOT, d)))) {
  // percorsi con / anche su Windows, come nel file delle eccezioni
  const path = relative(ROOT, file).split(sep).join('/');
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const [level, rules] of [['error', ERRORS], ['warning', WARNINGS]]) {
      for (const { term, pattern } of rules) {
        for (const m of line.matchAll(pattern)) {
          const start = Math.max(0, m.index - 70);
          const context = line.slice(start, m.index + m[0].length + 70).trim();
          const hit = { path, line: i + 1, term, context };
          // un'eccezione copre solo l'occorrenza che cade dentro il suo frammento
          const exception = exceptions.find((e) => {
            if (e.path !== path || e.term !== term) return false;
            const at = line.indexOf(e.context);
            return at !== -1 && m.index >= at && m.index + m[0].length <= at + e.context.length;
          });
          if (exception) {
            exception.used += 1;
            found.excepted.push({ ...hit, reason: exception.reason });
          } else found[level].push(hit);
        }
      }
    }
  });
}

const show = (hit) => `  ${hit.path}:${hit.line}  «${hit.term}»\n    …${hit.context}…`;
for (const [title, list] of [
  ['Errori (formule vietate)', found.error],
  ['Avvisi (da controllare: non devono riferirsi a noi)', found.warning],
]) {
  if (list.length) console.log(`${title}: ${list.length}\n${list.map(show).join('\n')}\n`);
}
if (found.excepted.length) {
  console.log(`Eccezioni dichiarate: ${found.excepted.length}`);
  for (const hit of found.excepted) console.log(`  ${hit.path}:${hit.line}  «${hit.term}» — ${hit.reason}`);
  console.log('');
}
const unused = exceptions.filter((e) => !e.used);
if (unused.length) {
  console.log(`Eccezioni senza corrispondenza (da togliere dal file): ${unused.length}`);
  for (const e of unused) console.log(`  ${e.path}  «${e.term}»  "${e.context}"`);
  console.log('');
}
console.log(`Errori: ${found.error.length} · avvisi: ${found.warning.length} · eccezioni: ${found.excepted.length}`);
if (found.error.length) process.exitCode = 1;
