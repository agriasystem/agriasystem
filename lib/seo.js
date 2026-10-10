// =====================================================================
//  Metadata delle pagine: unica utility per title, description, canonical
//  assoluto, robots, Open Graph e Twitter Card. Ogni pagina passa i propri
//  campi a pageMetadata e può sovrascriverne qualunque parte; tutto è reso
//  lato server da Next (export metadata / generateMetadata).
//  Dati strutturati: lib/schema.js.
// =====================================================================

import { locales, defaultLocale, localizedHref } from '@/lib/i18n';

// Dominio del sito: NEXT_PUBLIC_SITE_URL, oppure agriasystem.com. Un valore
// rimasto sul vecchio dominio (in dismissione, reindirizzato da middleware.js)
// viene ignorato: canonical e sitemap non devono mai puntare a un indirizzo che
// reindirizza.
const DEFAULT_SITE_URL = 'https://agriasystem.com';
const envSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '');
export const SITE_URL = envSiteUrl && !/matteogaruzzo\.com/i.test(envSiteUrl) ? envSiteUrl : DEFAULT_SITE_URL;

export const AGRIA_BRAND = 'Agria System';
// immagine social predefinita di Agria System (scripts/og-image.mjs)
export const OG_IMAGE = '/images/brand/agria-og.png';

const OG_LOCALE_BY_LANG = { it: 'it_IT', en: 'en_US' };

// Robots predefinito delle pagine indicizzabili: anteprime ampie per testo e
// immagini (risultati di ricerca e motori AI).
export const ROBOTS_INDEX = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
};
export const ROBOTS_NOINDEX = { index: false, follow: true };

export const absoluteUrl = (path = '/') => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path === '/' ? '' : path}`);

// Metadata completi di una pagina.
// - title: esatto (nessun template), già con il marchio dove serve;
// - path: percorso canonico, reso assoluto;
// - type: 'website' | 'article' (con publishedTime/modifiedTime);
// - image: { url, width, height, alt } oppure solo url (predefinita OG_IMAGE);
// - robots: ROBOTS_INDEX (predefinito) o ROBOTS_NOINDEX o un oggetto proprio;
// - openGraph/twitter: campi che sovrascrivono quelli generati.
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  robots = ROBOTS_INDEX,
  locale = defaultLocale,
  openGraph = {},
  twitter = {},
}) {
  const url = absoluteUrl(path);
  const img = typeof image === 'string' ? { url: image } : image || { url: OG_IMAGE, width: 1200, height: 630 };
  const ogImage = { width: 1200, height: 630, alt: title, ...img, url: absoluteUrl(img.url) };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      title,
      description,
      url,
      siteName: AGRIA_BRAND,
      locale: OG_LOCALE_BY_LANG[locale] || OG_LOCALE_BY_LANG[defaultLocale],
      type,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && (modifiedTime || publishedTime) ? { modifiedTime: modifiedTime || publishedTime } : {}),
      images: [ogImage],
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
      ...twitter,
    },
  };
}

// Nome storico, usato da quasi tutte le pagine: stessa utility.
export const agriaPageMetadata = pageMetadata;

// alternates.languages (hreflang) per la futura versione /en: non usata finché
// le pagine inglesi non esistono (nessun hreflang verso indirizzi 404).
//   alternates: { canonical: path, languages: localeAlternates(path) }
export function localeAlternates(path) {
  return locales.reduce(
    (acc, locale) => {
      acc[locale] = `${SITE_URL}${localizedHref(path, locale)}`;
      return acc;
    },
    { 'x-default': `${SITE_URL}${path}` }
  );
}
