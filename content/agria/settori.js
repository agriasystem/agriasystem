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
    'gestione-fiscale-ecommerce-vino-iva-fatturazione',
    'vendita-internazionale-vino-dtc-export-estero',
  ],
  frantoi: ['ecommerce-per-frantoi', 'seo-locale-agroalimentare-google-maps'],
};

// h1 e sottotitolo propri del settore, al posto di quelli dell'anteprima della
// homepage (che parlano all'ospite, non a chi gestisce la struttura). Prompt 33:
// l'h1 è la frase cercata, la frase d'effetto scende nel sottotitolo; titolo
// largo nell'apertura (wide in SectorPage).
const HEROES = {
  hospitality: {
    title: 'Siti web e prenotazioni dirette per agriturismi, hotel, B&B e strutture ricettive.',
    lead: 'Una prenotazione, inserita una volta sola. Anche per masserie, relais e strutture con spa.',
  },
  cantine: {
    title: 'Siti web ed e-commerce per cantine e aziende vitivinicole.',
    lead: 'Chi compra, chi visita e chi torna: lo stesso cliente.',
  },
  frantoi: {
    title: 'Siti web ed e-commerce per frantoi e produttori di olio.',
    lead: 'Gli ordini arrivano da quattro parti. Ne escono da una.',
  },
};

// meta: titolo e descrizione per Google (Prompt 33, approvati): la frase cercata e le categorie, senza marchio
const META = {
  hospitality: {
    title: 'Siti web e booking engine per agriturismi, hotel, B&B, resort, spa, masserie e relais',
    description:
      'Siti web con prenotazione diretta per agriturismi, hotel, B&B, resort, masserie, relais e strutture con spa: booking engine e portali collegati al gestionale.',
  },
  cantine: {
    title: 'Siti web ed e-commerce per cantine e aziende vitivinicole',
    description:
      'Realizziamo siti web ed e-commerce per cantine: vendita diretta del vino, degustazioni prenotabili online e clienti raccolti in un unico posto.',
  },
  frantoi: {
    title: 'Siti web ed e-commerce per frantoi e produttori di olio',
    description:
      'Realizziamo siti web ed e-commerce per frantoi: vendita di olio online, listini per privati e ristorazione, ordini raccolti in un unico posto.',
  },
};

function buildSector(key) {
  const card = sectors.items.find((item) => item.key === key);
  const view = preview.sectors.find((item) => item.key === key);
  return {
    key,
    name: SECTOR_LABELS[key],
    meta: { ...META[key], path: card.href },
    hero: { eyebrow: sectors.eyebrow, title: view.title, lead: view.line, ...HEROES[key] },
    intro: { eyebrow: view.kicker, title: card.title, text: card.text, image: card.image, tiles: view.tiles },
    // riquadri dell'anteprima per settore: stessa dicitura della homepage
    note: preview.note,
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
    title: 'Siti e software per agriturismi, hotel, cantine e frantoi',
    description:
      'Siti web, e-commerce, prenotazioni dirette e automazioni AI per strutture ricettive, cantine e frantoi: scegliete il vostro settore.',
    path: '/settori',
  },
  // h1 (da approvare) e titolo della griglia (approvato, come in homepage)
  hero: { eyebrow: sectors.eyebrow, title: 'Hospitality, cantine, frantoi.' },
  cardsTitle: sectors.title,
  closing: { title: closing.title, text: closing.text },
  cta: CTA,
};

export const SECTOR_LINK_LABEL = sectors.linkLabel;
export const AREA_LINK_LABEL = 'Scoprite di più';
