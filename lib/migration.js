// =====================================================================
//  Migrazione matteogaruzzo.com → agriasystem.com (docs/agria/migration-map-v1.md)
//  Unica fonte delle regole, applicate da middleware.js e controllate da
//  scripts/verify-migration.mjs:
//  - REDIRECTS: MERGE e 301, percorso vecchio → destinazione finale (301);
//  - GONE / GONE_PREFIXES: DELETE, risposta 410;
//  - OLD_HOSTS: il vecchio dominio rimanda al nuovo con lo stesso percorso,
//    oppure direttamente alla destinazione finale o al 410: mai catene.
//  Solo dati e funzioni pure: gira nel middleware (edge).
// =====================================================================

export const CANONICAL_ORIGIN = 'https://agriasystem.com';
export const OLD_HOSTS = ['matteogaruzzo.com', 'www.matteogaruzzo.com'];

const PRESENCE = '/servizi/digital-presence';
const COMMERCE = '/servizi/digital-commerce';
const AUTOMATION = '/servizi/digital-automation';

export const REDIRECTS = {
  // pagine principali
  '/chi-sono': '/azienda',
  '/metodo': '/azienda',
  '/metodo/analisi-e-obiettivi': '/azienda',
  '/metodo/strategia-di-settore': '/azienda',
  '/metodo/design': '/azienda',
  '/metodo/sviluppo': '/azienda',
  '/prenota-call': '/contatti',
  '/quiz': '/contatti',
  // servizi
  '/servizi/ecommerce-shopify': COMMERCE,
  '/servizi/wine-club': COMMERCE,
  '/servizi/siti-web-contatti': PRESENCE,
  '/servizi/restyling-ottimizzazione': PRESENCE,
  '/servizi/consulenza-strategica': PRESENCE,
  '/servizi/seo-geo-strategy': PRESENCE,
  '/servizi/brand-identity': PRESENCE,
  '/servizi/automazioni-ai': AUTOMATION,
  '/servizi/software-ai-su-misura': AUTOMATION,
  // settori
  '/settori/wine-viticulture': '/settori/cantine',
  '/settori/oleifici-food-tech': '/settori/frantoi',
  '/settori/wine-hospitality-agriturismi': '/settori/hospitality',
  // software
  '/software/hospitality': '/blog/software-per-agriturismi',
  '/software/vitivinicolo': '/blog/software-per-cantine',
  '/software/frantoi': '/settori/frantoi',
  // portfolio
  '/portfolio': '/settori',
  '/portfolio/tenuta-monteverdi': '/settori/cantine',
  // articoli: MERGE
  '/blog/ecommerce-vino-vendite-dirette': '/blog/ecommerce-vino-margini-vendita-diretta',
  '/blog/ecommerce-per-cantine': '/blog/ecommerce-vino-margini-vendita-diretta',
  '/blog/enoturismo-prenotazioni-online-vendite-dirette': '/blog/degustazioni-cantina-trasformare-visite-vendite',
  '/blog/pos-cassa-cantina-vendita-degustazione': '/blog/degustazioni-cantina-trasformare-visite-vendite',
  '/blog/cross-selling-upselling-cantina-scontrino-medio': '/blog/degustazioni-cantina-trasformare-visite-vendite',
  '/blog/ridurre-no-show-prenotazioni-cantina-promemoria': '/blog/degustazioni-cantina-trasformare-visite-vendite',
  '/blog/multi-canale-cantina-getyourguide-viator-ota': '/blog/degustazioni-cantina-trasformare-visite-vendite',
  '/blog/formazione-team-accoglienza-cantina-vendite': '/blog/degustazioni-cantina-trasformare-visite-vendite',
  '/blog/comunicare-sostenibilita-cantina-marketing-vendite': '/blog/storytelling-vino-marketing-vendite',
  '/blog/seo-geo-farsi-trovare-ai': '/blog/seo-locale-agroalimentare-google-maps',
  // articoli: 301
  '/blog/ecommerce-for-frantoi': '/blog/ecommerce-per-frantoi',
  '/blog/shopify-velocita-conversioni': COMMERCE,
  '/blog/wine-club-revenue-ricorrente-fedelta': COMMERCE,
  '/blog/email-marketing-sequenze-automatiche-cantina-visitatori': AUTOMATION,
  '/blog/agenti-ai-processo-commerciale': AUTOMATION,
  '/blog/agente-ai-reparto-commerciale': AUTOMATION,
  '/blog/software-frantoi-gestione-ordini-crm': '/settori/frantoi',
};

// DELETE: indirizzi esatti
export const GONE = [
  '/risorse',
  '/referral',
  '/geo',
  '/software',
  '/blog/tag',
  '/blog/specialista-digitale-vs-web-agency-agroalimentare',
  '/blog/scegliere-partner-digitale-checklist',
  '/blog/bandi-incentivi-digitalizzazione-agroalimentare',
];

// DELETE: tutto ciò che sta sotto questi percorsi, salvo gli indirizzi in
// REDIRECTS (controllati prima). Include /software/pricing & co., il resto
// del portfolio, le 16 regioni, i 71 tag, le proposte e le API del quiz e
// della newsletter, uscite dal sito.
export const GONE_PREFIXES = [
  '/proposta/',
  '/referral/',
  '/geo/',
  '/blog/tag/',
  '/software/',
  '/portfolio/',
  '/metodo/',
  '/servizi/wine-club/',
  '/api/quiz/',
  '/api/newsletter/',
];

const normalize = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname) || '/';

// Esito per un percorso: { type: 'redirect', to } | { type: 'gone' } | null
export function resolvePath(pathname) {
  const path = normalize(pathname);
  if (REDIRECTS[path]) return { type: 'redirect', to: REDIRECTS[path] };
  if (GONE.includes(path) || GONE_PREFIXES.some((prefix) => path.startsWith(prefix))) return { type: 'gone' };
  return null;
}

export const isOldHost = (host) => OLD_HOSTS.includes(String(host || '').toLowerCase().split(':')[0]);
