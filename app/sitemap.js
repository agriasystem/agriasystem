import { KEPT_POSTS } from '@/content/blog/kept';
import { LAST_UPDATED } from '@/content/agria/legale';
import { getPost } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

// Sitemap: solo indirizzi indicizzabili del sito Agria (migration map, regola 5).
// Esclusi redirect, 410 e pagine noindex (/crediti-immagini). lastModified solo
// dove è noto davvero (articoli e pagine legali).
const PAGES = [
  ['/', 1.0],
  ['/servizi', 0.9],
  ['/servizi/digital-presence', 0.9],
  ['/servizi/digital-commerce', 0.9],
  ['/servizi/digital-automation', 0.9],
  ['/settori', 0.8],
  ['/settori/hospitality', 0.8],
  ['/settori/cantine', 0.8],
  ['/settori/frantoi', 0.8],
  ['/azienda', 0.7],
  ['/contatti', 0.7],
  ['/blog', 0.6],
];

const LEGAL = ['/privacy-policy', '/cookie-policy', '/termini-e-condizioni', '/note-legali'];

export default function sitemap() {
  const pages = PAGES.map(([path, priority]) => ({ url: `${SITE_URL}${path === '/' ? '' : path}`, priority }));
  const posts = KEPT_POSTS.map((slug) => getPost(slug))
    .filter(Boolean)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      priority: 0.6,
    }));
  const legal = LEGAL.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(LAST_UPDATED), priority: 0.2 }));
  return [...pages, ...posts, ...legal];
}
