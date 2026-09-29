// Scarica una featured image unica per ogni articolo del blog da Unsplash
// e aggiorna featuredImage/imageAlt in lib/data.js.
//
// Uso:
//   node --env-file=.env.local scripts/fetch-blog-images.js
//
// Richiede UNSPLASH_ACCESS_KEY in .env.local (mai committare la chiave nello
// script: .env*.local e' gia' in .gitignore).

const fs = require('fs');
const path = require('path');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'blog');
const DATA_FILE = path.join(__dirname, '..', 'lib', 'data.js');
const WIDTH = 1200;
const HEIGHT = 600;

// slug = slug REALE in lib/data.js (verificato, non quello abbreviato del brief).
// software-per-cantine usa la pipeline Agria (scripts/fetch-images.mjs).
const articles = [
  {
    slug: 'agente-ai-reparto-commerciale',
    query: 'sales automation dashboard',
    alt: 'Dashboard di automazione AI per il reparto commerciale',
  },
  {
    slug: 'shopify-velocita-conversioni',
    query: 'fast ecommerce checkout speed',
    alt: 'Checkout veloce di un e-commerce, velocita e conversioni online',
  },
  {
    slug: 'seo-geo-farsi-trovare-ai',
    query: 'local business map location',
    alt: 'Mappa e ricerca locale, farsi trovare online nel proprio territorio',
  },
  {
    slug: 'ecommerce-vino-vendite-dirette',
    query: 'wine online direct sales',
    alt: 'Vendita diretta di vino online, e-commerce per cantine',
  },
  {
    slug: 'agenti-ai-processo-commerciale',
    query: 'AI automation workflow business',
    alt: 'Flusso di automazione AI applicato ai processi aziendali',
  },
  {
    slug: 'specialista-digitale-vs-web-agency-agroalimentare',
    query: 'freelancer vs agency team',
    alt: 'Un piccolo team indipendente al lavoro, specialista digitale contro web agency',
  },
  {
    slug: 'ecommerce-vino-margini-vendita-diretta',
    query: 'wine bottles shipping boxes packaging',
    alt: 'Bottiglie di vino imballate per la spedizione da un e-commerce di vendita diretta',
  },
  {
    slug: 'wine-club-revenue-ricorrente-fedelta',
    query: 'wine subscription box tasting',
    alt: 'Selezione di vini pronta per la spedizione mensile di un wine club',
  },
  {
    slug: 'enoturismo-prenotazioni-online-vendite-dirette',
    query: 'wine tasting vineyard experience guests',
    alt: 'Degustazione guidata in cantina durante una visita enoturistica prenotata online',
  },
  {
    slug: 'software-frantoi-gestione-ordini-crm',
    query: 'warehouse inventory management orders',
    alt: 'Gestione digitale di ordini B2B per un frantoio con dashboard di controllo',
  },
  {
    slug: 'agriturismo-booking-online-prenotazioni',
    query: 'farm stay guest room countryside',
    alt: 'Camera di un agriturismo pronta ad accogliere ospiti prenotati online',
  },
  {
    slug: 'chatbot-cantina-ai-customer-service',
    query: 'AI chat conversation smartphone',
    alt: 'Interfaccia di un chatbot AI che risponde a un cliente di una cantina',
  },
  {
    slug: 'seo-locale-agroalimentare-google-maps',
    query: 'map pin location search city',
    alt: 'Ricerca locale su Google Maps di attività agroalimentari nel territorio',
  },
  {
    slug: 'storytelling-vino-marketing-vendite',
    query: 'old vineyard heritage vines family',
    alt: 'Vigneto storico che racconta la tradizione di una cantina familiare',
  },
  {
    slug: 'bandi-incentivi-digitalizzazione-agroalimentare',
    query: 'office paperwork documents desk',
    alt: 'Documentazione e scrivania per la ricerca di bandi e incentivi alla digitalizzazione',
  },
  {
    slug: 'scegliere-partner-digitale-checklist',
    query: 'business meeting handshake partnership',
    alt: 'Incontro di lavoro per valutare un partner digitale per un progetto agroalimentare',
  },
  {
    slug: 'siti-web-per-cantine',
    query: 'vineyard rows sunset winery',
    alt: 'Sito web moderno per una cantina, con e-commerce e storytelling del vigneto',
  },
  {
    slug: 'ecommerce-per-cantine',
    query: 'wine cellar bottles rack dark',
    alt: 'Bottiglie di vino pronte per la spedizione da un e-commerce di cantina',
  },
  {
    slug: 'siti-web-per-agriturismi',
    query: 'tuscany countryside farmhouse terrace',
    alt: 'Terrazza di un agriturismo tra le colline, tavolo apparecchiato all’aperto',
  },
  {
    slug: 'software-per-agriturismi',
    query: 'small hotel reception team desk',
    alt: 'Dashboard di gestione prenotazioni per un agriturismo',
  },
  {
    slug: 'ecommerce-per-frantoi',
    query: 'extra virgin olive oil pouring',
    alt: 'Bottiglie di olio extravergine pronte per la vendita online',
  },
];

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
}

async function searchPhoto(query, excludeIds) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape&content_filter=high`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Unsplash search fallita (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  const candidate = (data.results || []).find((p) => !excludeIds.has(p.id));
  if (!candidate) throw new Error(`Nessun risultato utilizzabile per "${query}"`);
  return candidate;
}

async function trackDownload(photo) {
  // Richiesto dalle API Guidelines di Unsplash quando si usa una foto ottenuta via API.
  try {
    await fetch(`${photo.links.download_location}&client_id=${ACCESS_KEY}`);
  } catch {
    // Non bloccante: se il trigger fallisce, il download dell'immagine procede comunque.
  }
}

async function downloadImage(photo, destPath) {
  const url = `${photo.urls.raw}&w=${WIDTH}&h=${HEIGHT}&fit=crop&q=80&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download immagine fallito (${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  return buffer.length;
}

function updateDataFile(results) {
  let src = fs.readFileSync(DATA_FILE, 'utf8');
  let updatedCount = 0;

  for (const r of results) {
    if (!r.ok) continue;
    // Isola il blocco dell'oggetto post via slug, poi sostituisce solo dentro quel blocco
    // (lazy match fino al prossimo "  {" a inizio blocco successivo o fine array).
    const blockRe = new RegExp(
      `(slug: '${r.slug}',[\\s\\S]*?)(featuredImage: '[^']*',\\s*\\n\\s*imageAlt: '[^']*',)`,
    );
    const match = src.match(blockRe);
    if (!match) {
      fail(`Non trovo il blocco featuredImage/imageAlt per "${r.slug}" in lib/data.js — aggiornalo a mano.`);
      continue;
    }
    const replacement = `featuredImage: '/images/blog/${r.slug}.jpg',\n    imageAlt: '${r.alt.replace(/'/g, "’")}',`;
    src = src.replace(blockRe, `$1${replacement}`);
    updatedCount += 1;
  }

  fs.writeFileSync(DATA_FILE, src);
  return updatedCount;
}

async function main() {
  if (!ACCESS_KEY) {
    fail('UNSPLASH_ACCESS_KEY non trovata. Esegui con: node --env-file=.env.local scripts/fetch-blog-images.js');
    process.exit(1);
  }

  const usedIds = new Set();
  const results = [];
  const credits = [];

  for (const article of articles) {
    const destPath = path.join(OUT_DIR, `${article.slug}.jpg`);
    if (fs.existsSync(destPath) && !process.argv.includes('--force')) {
      console.log(`↷ ${article.slug}.jpg gia' presente, salto (usa --force per rigenerare)`);
      continue;
    }
    try {
      const photo = await searchPhoto(article.query, usedIds);
      usedIds.add(photo.id);

      await trackDownload(photo);
      const bytes = await downloadImage(photo, destPath);

      console.log(`✓ ${article.slug}.jpg (${(bytes / 1024).toFixed(0)} KB) — foto di ${photo.user.name} (@${photo.user.username})`);
      results.push({ slug: article.slug, alt: article.alt, ok: true });
      credits.push({
        slug: article.slug,
        photographer: photo.user.name,
        username: photo.user.username,
        profileUrl: `${photo.user.links.html}?utm_source=mg_solutions&utm_medium=referral`,
        photoUrl: `${photo.links.html}?utm_source=mg_solutions&utm_medium=referral`,
      });
    } catch (err) {
      fail(`${article.slug}: ${err.message}`);
      results.push({ slug: article.slug, ok: false });
    }
  }

  const updated = updateDataFile(results);
  console.log(`\n${updated}/${articles.length} voci aggiornate in lib/data.js.`);

  const uniquePhotos = new Set(credits.map((c) => c.photoUrl)).size;
  console.log(`Immagini uniche scaricate: ${uniquePhotos}/${results.filter((r) => r.ok).length}.`);

  const creditsPath = path.join(OUT_DIR, 'CREDITS.json');
  let existingCredits = [];
  if (fs.existsSync(creditsPath)) {
    try {
      existingCredits = JSON.parse(fs.readFileSync(creditsPath, 'utf8'));
    } catch {
      existingCredits = [];
    }
  }
  const bySlug = new Map(existingCredits.map((c) => [c.slug, c]));
  for (const c of credits) bySlug.set(c.slug, c);
  fs.writeFileSync(creditsPath, JSON.stringify([...bySlug.values()], null, 2));
  console.log(`Crediti fotografi salvati in ${path.relative(process.cwd(), creditsPath)} — Unsplash richiede attribuzione visibile quando si usa la API.`);
}

main();
