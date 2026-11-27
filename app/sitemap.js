import { KEPT_POSTS } from '@/content/blog/kept';
import { legalPages } from '@/content/agria/legale';
import { getPost } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

// Sitemap: solo indirizzi indicizzabili del sito Agria (migration map, regola 5).
// Esclusi redirect, 410 e pagine noindex (/crediti-immagini).
// Ogni pagina ha la data dell'ultimo cambiamento reale del suo contenuto (testo,
// titolo, descrizione, dati strutturati), ricavata dalla storia di git e dai
// piani IndexNow (scripts/indexnow-piani). Va aggiornata A MANO quando cambia il
// testo della pagina, non a ogni deploy: una data spostata senza un cambiamento
// sarebbe falsa. Articoli e pagine legali prendono la data dal loro contenuto.
const PAGES = [
  ['/', 1.0, '2026-11-27'],
  ['/servizi', 0.9, '2026-11-27'],
  ['/servizi/digital-presence', 0.9, '2026-11-27'],
  ['/servizi/digital-commerce', 0.9, '2026-11-25'],
  ['/servizi/digital-automation', 0.9, '2026-11-27'],
  ['/soluzioni/assistente-ai', 0.8, '2026-11-25'],
  ['/soluzioni/gestione-richieste', 0.8, '2026-11-03'],
  ['/soluzioni/collegare-gestionale-e-sito', 0.8, '2026-11-25'],
  ['/settori', 0.8, '2026-11-25'],
  ['/settori/hospitality', 0.8, '2026-11-25'],
  ['/settori/cantine', 0.8, '2026-11-25'],
  ['/settori/frantoi', 0.8, '2026-11-25'],
  ['/azienda', 0.7, '2026-11-25'],
  ['/contatti', 0.7, '2026-11-21'],
  ['/blog', 0.6, '2026-11-25'],
];


export default function sitemap() {
  const pages = PAGES.map(([path, priority, updated]) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: new Date(updated),
    priority,
  }));
  const posts = KEPT_POSTS.map((slug) => getPost(slug))
    .filter(Boolean)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      priority: 0.6,
    }));
  // privacy, cookie, termini, note legali: ognuna con la data del suo ultimo cambiamento
  const legal = Object.values(legalPages).map((page) => ({
    url: `${SITE_URL}${page.meta.path}`,
    lastModified: new Date(page.updated),
    priority: 0.2,
  }));
  return [...pages, ...posts, ...legal];
}
