import { site } from '@/content/site';
import { assistant } from '@/content/agria/assistente';

export const CTA = {
  label: 'Parliamo del progetto',
  href: '/contatti',
};

export const NAV_PANELS = [
  {
    key: 'servizi',
    label: 'Servizi',
    href: '/servizi',
    // card di evidenza a destra del pannello (testi già approvati nella homepage)
    feature: {
      title: 'Prima capire, poi costruire.',
      link: { label: 'Tutti i servizi', href: '/servizi' },
    },
    items: [
      {
        title: 'Digital Presence',
        href: '/servizi/digital-presence',
        description: 'Siti e visibilità per hospitality, cantine e frantoi.',
      },
      {
        title: 'Digital Commerce',
        href: '/servizi/digital-commerce',
        description: 'Vendita diretta, prenotazioni e pagamenti online.',
      },
      {
        title: 'Digital Automation',
        href: '/servizi/digital-automation',
        description: 'Automazioni e integrazioni tra gli strumenti che usate.',
      },
    ],
    // secondo gruppo, sotto le aree e sempre visibile (Prompt 23): le soluzioni
    // chiamate con quello che fanno; pagine in content/agria/soluzioni.js
    group: {
      title: 'Soluzioni',
      items: [
        {
          title: 'Assistente AI per le richieste',
          href: '/soluzioni/assistente-ai',
          description: 'Bozze pronte per le domande dei clienti, riviste da chi risponde.',
        },
        {
          title: 'Gestione delle richieste',
          href: '/soluzioni/gestione-richieste',
          description: 'Email, WhatsApp, telefono e portali in un solo ingresso.',
        },
        {
          title: 'Collegare gestionale e sito',
          href: '/soluzioni/collegare-gestionale-e-sito',
          description: 'Gli strumenti che avete, collegati tra loro.',
        },
      ],
    },
  },
  {
    key: 'settori',
    label: 'Settori',
    href: '/settori',
    feature: {
      title: 'Conosciamo tre mestieri, non tutti.',
      link: { label: 'Tutti i settori', href: '/settori' },
    },
    items: [
      {
        title: 'Hospitality',
        href: '/settori/hospitality',
        description: 'Agriturismi, hotel e strutture ricettive.',
      },
      {
        title: 'Cantine',
        href: '/settori/cantine',
        description: 'Cantine e aziende vitivinicole.',
      },
      {
        title: 'Frantoi',
        href: '/settori/frantoi',
        description: 'Frantoi e aziende olivicole.',
      },
    ],
  },
];

export const NAV_DIRECT = [{ label: 'Azienda', href: '/azienda' }];

// Contatto rapido: nell'header da lg, a sinistra della CTA (Prompt 23, fase B), e
// nella barra fissa sotto md (Prompt 24). Stesso numero di content/site.js, stesso
// messaggio precompilato dell'assistente. short: etichetta visibile nella barra.
export const QUICK_CONTACT = {
  phone: { label: `Chiamateci al ${site.phone}`, short: 'Chiamateci', href: `tel:${site.phone.replace(/\s+/g, '')}` },
  whatsapp: {
    label: 'Scriveteci su WhatsApp',
    short: 'WhatsApp',
    href: `${assistant.handoff.whatsapp.href}?text=${encodeURIComponent(assistant.handoff.whatsappMessage)}`,
  },
};

// tutte le voci di un pannello, compreso il secondo gruppo (stato attivo)
export const panelLinks = (panel) => [...panel.items, ...(panel.group?.items ?? [])];
