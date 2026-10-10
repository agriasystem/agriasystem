// =====================================================================
//  Dati strutturati (JSON-LD) di Agria System, in un unico grafo con
//  identificativi stabili:
//  - #organization: l'organizzazione e attività con sede (Organization +
//    ProfessionalService, dati reali di content/site.js);
//  - #website: il sito;
//  - <pagina>#webpage, #breadcrumb, #service, #article: i nodi di pagina,
//    collegati a sito e organizzazione tramite @id.
//  Organizzazione e sito sono emessi su ogni pagina dal layout
//  (app/(site)/layout.jsx); le pagine aggiungono solo i propri nodi.
//  Nessun dato che non sia visibile o verificabile sul sito.
// =====================================================================

import { site } from '@/lib/data';
import { SAME_AS } from '@/components/agria/social';
import { AGRIA_BRAND, SITE_URL, absoluteUrl } from '@/lib/seo';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;
const LANGUAGE = 'it-IT';

const ref = (id) => ({ '@id': id });
const pageUrl = (path) => absoluteUrl(path);

// Script JSON-LD: un oggetto o un elenco di nodi (in un @graph).
export function graph(nodes) {
  const list = (Array.isArray(nodes) ? nodes : [nodes]).filter(Boolean);
  return { '@context': 'https://schema.org', '@graph': list };
}

export const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.province,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
});

// Aree servite: Umbria (sede) e Italia.
export const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Umbria' },
  { '@type': 'Country', name: 'Italia' },
];

const DAY_URL = (day) => `https://schema.org/${day}`;

// L'organizzazione è anche l'attività con sede fisica (ProfessionalService):
// un solo nodo, stesso @id, con indirizzo, coordinate, orari dichiarati nella
// pagina contatti e aree servite.
export function organizationNode() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: AGRIA_BRAND,
    url: SITE_URL,
    description: site.positioning,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${SITE_URL}/images/brand/agria-logo-512.png`,
      contentUrl: `${SITE_URL}/images/brand/agria-logo-512.png`,
      width: 512,
      height: 512,
      caption: AGRIA_BRAND,
    },
    image: ref(LOGO_ID),
    email: site.email,
    telephone: site.phone,
    vatID: site.vat,
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: site.mapsHref,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.openingHours.days.map(DAY_URL),
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
    areaServed: AREA_SERVED,
    sameAs: SAME_AS,
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: AGRIA_BRAND,
    description: site.positioning,
    inLanguage: LANGUAGE,
    publisher: ref(ORGANIZATION_ID),
  };
}

// Organizzazione e sito: nel layout, su ogni pagina.
export const siteGraph = () => graph([organizationNode(), websiteNode()]);

// Pagina: type WebPage, ContactPage, AboutPage, CollectionPage...
export function webPageNode({ title, description, path, type = 'WebPage', breadcrumb = true, about = false, extra = {} }) {
  const url = pageUrl(path);
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: LANGUAGE,
    isPartOf: ref(WEBSITE_ID),
    ...(about ? { about: ref(ORGANIZATION_ID) } : {}),
    ...(breadcrumb ? { breadcrumb: ref(`${url}#breadcrumb`) } : {}),
    ...extra,
  };
}

// items: [{ name, path }] dalla home alla pagina corrente; path dell'ultima
// voce = pagina che contiene il breadcrumb.
export function breadcrumbNode(items) {
  const url = pageUrl(items[items.length - 1].path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function serviceNode({ name, description, path, serviceType }) {
  const url = pageUrl(path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    ...(serviceType ? { serviceType } : {}),
    provider: ref(ORGANIZATION_ID),
    areaServed: AREA_SERVED,
    mainEntityOfPage: ref(`${url}#webpage`),
  };
}

// faqs: [{ q, a }], le stesse domande visibili nella pagina.
export function faqNode(faqs, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Articolo del blog: date reali dal file dell'articolo (date, updated).
export function blogPostingNode({ post, image, wordCount }) {
  const url = pageUrl(`/blog/${post.slug}`);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description || post.excerpt,
    ...(image ? { image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } } : {}),
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: ref(ORGANIZATION_ID),
    publisher: ref(ORGANIZATION_ID),
    mainEntityOfPage: ref(`${url}#webpage`),
    isPartOf: ref(WEBSITE_ID),
    inLanguage: LANGUAGE,
    ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
    ...(wordCount ? { wordCount } : {}),
  };
}

// Persona del team: ruolo e foto visibili nella pagina azienda, sameAs solo
// con profili reali.
export function personNode({ id, name, role, photo, linkedin }) {
  return {
    '@type': 'Person',
    '@id': `${pageUrl('/azienda')}#${id}`,
    name,
    jobTitle: role,
    ...(photo ? { image: absoluteUrl(photo) } : {}),
    worksFor: ref(ORGANIZATION_ID),
    ...(linkedin ? { sameAs: [linkedin] } : {}),
  };
}
