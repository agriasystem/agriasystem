// =====================================================================
//  SEO/GEO helper — usato da ogni pagina per generare in modo coerente
//  title, description, keywords, canonical, Open Graph, Twitter Card e
//  structured data (JSON-LD). Non duplicare questo boilerplate nelle
//  singole pagine: passare solo title/description/path/keywords qui.
// =====================================================================

import { site } from '@/lib/data';
import { locales, defaultLocale, localizedHref } from '@/lib/i18n';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://agriasystem.com';
// immagine social predefinita di Agria System (scripts/og-image.mjs)
export const OG_IMAGE = '/images/brand/agria-og.png';

const OG_LOCALE_BY_LANG = { it: 'it_IT', en: 'en_US' };

// Costruisce alternates.languages (hreflang) per un path nella lingua di
// default, es. localeAlternates('/servizi') =>
//   { it: 'https://.../servizi', en: 'https://.../en/servizi', 'x-default': 'https://.../servizi' }
// Additiva: non collegata a pageMetadata, non usata da nessuna pagina
// esistente. Uso previsto (dal Prompt 06 in poi):
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

// Locale Open Graph corretto per la lingua indicata. Additiva: pageMetadata
// continua a impostare 'it_IT' direttamente, invariato.
export function ogLocale(locale = defaultLocale) {
  return OG_LOCALE_BY_LANG[locale] || OG_LOCALE_BY_LANG[defaultLocale];
}

// title NON include già "· MG Solutions": ci pensa il template definito
// in app/layout.jsx per il tag <title>. openGraph/twitter non ereditano
// quel template, quindi qui il suffisso lo aggiungiamo esplicitamente.
export function pageMetadata({ title, description, path, keywords, type = 'website', publishedTime, image }) {
  const socialTitle = `${title} · ${site.name}`;
  const ogImage = image || OG_IMAGE;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'it_IT',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}

// Pagine AGRIA: title esatto (title.absolute, senza il template del layout),
// canonical, Open Graph e Twitter con il nome AGRIA e l'immagine social Agria
// (l'openGraph della pagina sostituisce per intero quello del layout).
export const AGRIA_BRAND = 'Agria System';

export function agriaPageMetadata({ title, description, path }) {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: AGRIA_BRAND,
      locale: 'it_IT',
      type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: AGRIA_BRAND }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

export function webPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: 'it-IT',
  };
}

// Per pagine servizi (singole o wine-club): identifica l'offerta come Service,
// distinto dalla WebPage che la descrive. providerName: di default il nome
// legacy (site.name); le pagine AGRIA passano AGRIA_BRAND.
export function serviceSchema({
  name,
  description,
  path,
  areaServed = 'IT',
  serviceType,
  audienceType,
  providerName = site.name,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    areaServed,
    provider: {
      '@type': 'Organization',
      name: providerName,
      url: SITE_URL,
    },
    ...(serviceType ? { serviceType } : {}),
    ...(audienceType ? { audience: { '@type': 'BusinessAudience', audienceType } } : {}),
  };
}

// items: [{ name, path }] dalla home fino alla pagina corrente (in ordine).
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// faqs: [{ q, a }] — stesso shape già usato da FAQAccordion.
export function faqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// steps: [{ title, body }] — utile per processi/percorsi in N passaggi
// (aiuta i motori generativi a citare la procedura passo-passo).
export function howToSchema({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}
