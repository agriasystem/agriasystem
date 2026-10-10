// =====================================================================
//  INDICE /servizi AGRIA — copy approvato (Prompt 13). Modificare qui i
//  testi, non nei componenti. Nessun testo va aggiunto senza approvazione.
//  I blocchi delle tre aree riusano il copy delle pagine area
//  (content/agria/servizi-aree.js): etichetta, titolo, sottotitolo e le
//  prime tre voci di "Cosa costruiamo" con la loro icona.
// =====================================================================

import { closing } from './home';
import { serviceAreas } from './servizi-aree';

const CTA = { label: 'Parliamo del progetto', href: '/contatti' };
const AREA_ORDER = ['presence', 'commerce', 'automation'];

export const servicesIndex = {
  meta: {
    title: 'Servizi — Agria System',
    description:
      'Digital Presence, Digital Commerce e Digital Automation per hospitality (agriturismi, hotel e strutture ricettive), cantine e frantoi.',
    path: '/servizi',
  },
  eyebrow: 'Servizi',
  title: 'Tre aree, un solo sistema.',
  lead: 'Non vendiamo pacchetti. Partiamo da come lavorate oggi e costruiamo quello che serve, integrato con gli strumenti che già usate.',
  cta: CTA,
  linkLabel: 'Scoprite di più',

  // tre blocchi alternati, uno per area
  areas: AREA_ORDER.map((key) => {
    const area = serviceAreas[key];
    return {
      key,
      name: area.name,
      eyebrow: area.hero.eyebrow,
      title: area.hero.title,
      text: area.hero.lead,
      items: area.build.items.slice(0, 3).map(({ icon, title, text }) => ({ icon, title, text })),
      href: area.meta.path,
      // stessa fotografia della sezione "Fotografia e mercati" dell'area (temporanea, vedi report 13)
      image: area.markets.image,
    };
  }),

  // selettore "Da dove si parte": aiuto alla scelta, non un preventivo
  goals: {
    title: 'Da dove si parte',
    items: [
      {
        label: 'Voglio più richieste dirette',
        area: 'presence',
        text: 'Si parte dalla presenza: struttura, contenuti e visibilità, perché chi cerca vi trovi e sappia cosa fare.',
      },
      {
        label: 'Voglio vendere online',
        area: 'commerce',
        text: 'Si parte dal canale di vendita: catalogo, pagamenti e spedizioni, con i clienti che restano vostri.',
      },
      {
        label: 'Voglio ridurre il lavoro manuale',
        area: 'automation',
        text: 'Si parte da un processo solo: lo misuriamo, lo accorciamo e lo colleghiamo agli strumenti che già usate.',
      },
    ],
  },

  // i quattro passi comuni
  method: {
    eyebrow: 'Come lavoriamo',
    title: 'Prima capire, poi costruire.',
    steps: [
      {
        title: 'Analisi',
        text: 'Guardiamo come lavorate davvero: strumenti, passaggi manuali, dove si perdono tempo e clienti.',
      },
      {
        title: 'Progetto',
        text: 'Definiamo il sistema: cosa serve, cosa si integra con quello che avete, cosa non serve affatto.',
      },
      { title: 'Sviluppo', text: 'Costruiamo internamente, con consegne intermedie da approvare.' },
      {
        title: 'Misura',
        text: 'Pubblichiamo con il tracciamento attivo e correggiamo sui dati reali, non sulle impressioni.',
      },
    ],
  },

  // CTA finale: stesso copy della CTA finale della homepage
  closing: { title: closing.title, text: closing.text, cta: CTA },
};

// nome ed etichetta dell'area per il selettore "Da dove si parte"
export const areaSummary = Object.fromEntries(
  AREA_ORDER.map((key) => [key, { name: serviceAreas[key].name, eyebrow: serviceAreas[key].hero.eyebrow, href: serviceAreas[key].meta.path }]),
);
