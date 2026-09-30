// =====================================================================
//  Punto di accesso per gli import esistenti (`@/lib/data`): dati del sito
//  (content/site.js) e articoli del blog (content/blog). I contenuti delle
//  pagine Agria vivono in content/agria/.
// =====================================================================

export { site } from '@/content/site';
export { posts, getPost } from '@/content/blog';
