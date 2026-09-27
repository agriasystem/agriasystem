// =====================================================================
//  PAGINE SETTORE AGRIA — composte da testi già approvati:
//  - homepage (content/agria/home.js): testo del settore, anteprima
//    (titolo, riga, riquadri), chiusura;
//  - pagine area (content/agria/servizi-aree.js): verticali del settore per
//    Digital Presence, Commerce e Automation;
//  - navigazione (components/agria/nav-data.js): descrizioni delle aree.
//  Testi nuovi, da approvare: meta (title e description) e h1 dell'indice /settori. Template: components/agria/sector/.
// =====================================================================

import { closing, preview, sectors } from './home';
import { SECTOR_LABELS, serviceAreas } from './servizi-aree';
import { NAV_PANELS } from '@/components/agria/nav-data';

const CTA = { label: 'Parliamo del progetto', href: '/contatti' };
const AREA_ORDER = ['presence', 'commerce', 'automation'];
const areaDescriptions = Object.fromEntries(
  NAV_PANELS.find((panel) => panel.key === 'servizi').items.map((item) => [item.href, item.description])
);

// articoli del blog collegati (tra quelli mantenuti dalla migration map)
const ARTICLES = {
  hospitality: ['siti-web-per-agriturismi', 'agriturismo-booking-online-prenotazioni', 'software-per-agriturismi'],
  cantine: [
    'siti-web-per-cantine',
    'ecommerce-vino-margini-vendita-diretta',
    'degustazioni-cantina-trasformare-visite-vendite',
    'software-per-cantine',
  ],
  frantoi: ['ecommerce-per-frantoi', 'seo-locale-agroalimentare-google-maps'],
};

// meta: testi nuovi (da approvare)
const META = {
  hospitality: {
    title: 'Hospitality — siti, prenotazioni dirette e automazioni per agriturismi | Agria System',
    description:
      'Siti, prenotazione diretta e automazioni per agriturismi, relais e strutture ricettive rurali: disponibilità reali, canale diretto e ospiti che tornano.',
  },
  cantine: {
    title: 'Cantine — siti, e-commerce e automazioni per aziende vitivinicole | Agria System',
    description:
      'Siti, vendita diretta, degustazioni prenotabili ed export per cantine e aziende vitivinicole: dalla visita al cliente, con i flussi collegati.',
  },
  frantoi: {
    title: 'Frantoi — siti, e-commerce e gestione ordini per aziende olivicole | Agria System',
    description:
      'Siti, e-commerce e ordini in un unico ingresso per frantoi e aziende olivicole: listini per privati, ristorazione e B2B, ritmo della campagna.',
  },
};

function buildSector(key) {
  const card = sectors.items.find((item) => item.key === key);
  const view = preview.sectors.find((item) => item.key === key);
  return {
    key,
    name: SECTOR_LABELS[key],
    meta: { ...META[key], path: card.href },
    hero: { eyebrow: sectors.eyebrow, title: view.title, lead: view.line },
    intro: { eyebrow: view.kicker, title: card.title, text: card.text, image: card.image, tiles: view.tiles },
    areasTitle: serviceAreas.presence.verticals.title,
    areas: AREA_ORDER.map((areaKey) => {
      const area = serviceAreas[areaKey];
      return {
        key: areaKey,
        name: area.name,
        href: area.meta.path,
        description: areaDescriptions[area.meta.path],
        items: area.verticals.sectors[key],
      };
    }),
    articles: ARTICLES[key],
    closing: { title: closing.title, text: closing.text },
    cta: CTA,
  };
}

export const sectorPages = Object.fromEntries(sectors.items.map((item) => [item.key, buildSector(item.key)]));

// Indice /settori
export const sectorsIndex = {
  meta: {
    title: 'Settori — hospitality, cantine e frantoi | Agria System',
    description:
      'Agria System lavora con tre settori: strutture ricettive rurali, cantine e aziende vitivinicole, frantoi e aziende olivicole.',
    path: '/settori',
  },
  // h1 (da approvare) e titolo della griglia (approvato, come in homepage)
  hero: { eyebrow: sectors.eyebrow, title: 'Hospitality, cantine, frantoi.' },
  cardsTitle: sectors.title,
  closing: { title: closing.title, text: closing.text },
  cta: CTA,
};

export const SECTOR_LINK_LABEL = sectors.linkLabel;
export const AREA_LINK_LABEL = 'Approfondisci';
