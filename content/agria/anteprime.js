// =====================================================================
//  ANTEPRIME DEI SERVIZI (Prompt 25): testi delle finte finestre animate
//  (components/agria/preview). Nessun numero, nessun nome reale: aziende,
//  persone e domini sono di fantasia e devono sembrarlo (domini .example,
//  riservati e mai assegnati). Nessun testo va aggiunto senza approvazione.
// =====================================================================

export const previews = {
  note: 'Anteprime illustrative: nomi e contenuti sono di fantasia.',

  // Digital Presence: una pagina del sito e la richiesta che ne nasce
  presence: {
    label:
      'Anteprima illustrativa di Digital Presence: il sito di un agriturismo di fantasia e la richiesta di soggiorno che ne nasce.',
    bar: 'podere-esempio.example',
    brand: 'Podere Esempio',
    nav: ['Camere', 'Esperienze', 'Contatti'],
    title: 'Soggiorni in collina',
    text: 'Camere tra gli ulivi e cucina di casa.',
    cta: 'Chiedete disponibilità',
    sheet: {
      title: 'Richiesta di soggiorno',
      rows: [
        ['Nome', 'Laura Esempio'],
        ['Periodo', 'Un fine settimana a maggio'],
      ],
      cta: 'Inviate',
    },
    toast: { title: 'Nuova richiesta dal sito', text: 'Un fine settimana a maggio' },
  },

  // Digital Commerce: un negozio con prodotti dei nostri settori, un ordine che entra
  commerce: {
    label: "Anteprima illustrativa di Digital Commerce: il negozio online di un'azienda di fantasia e un ordine che entra.",
    bar: 'bottega-esempio.example',
    brand: 'Bottega Esempio',
    products: [
      { key: 'vino', name: 'Rosso di collina' },
      { key: 'olio', name: 'Olio nuovo' },
      { key: 'soggiorno', name: 'Soggiorno in cantina' },
    ],
    add: 'Aggiungi',
    added: 'Aggiunto',
    panel: {
      title: 'Il vostro ordine',
      rows: [
        ['Prodotto', 'Rosso di collina'],
        ['Spedizione', 'A domicilio'],
      ],
      cta: 'Confermate',
    },
    toast: { title: 'Nuovo ordine', text: 'Rosso di collina, da preparare' },
  },

  // Digital Automation: la richiesta arriva, viene classificata, finisce nel posto
  // giusto e l'ultimo fotogramma è una persona che la prende in carico
  automation: {
    label:
      'Anteprima illustrativa di Digital Automation: una richiesta arriva, viene classificata, finisce nella colonna giusta e la prende in carico una persona.',
    bar: 'Richieste',
    incoming: 'In arrivo',
    columns: ['Accoglienza', 'Ordini', 'Amministrazione'],
    message: { from: 'Paolo Esempio', text: 'Avete una camera libera per il fine settimana?' },
    tag: 'Prenotazioni',
    owner: { initials: 'GE', text: 'Presa in carico da Giulia Esempio' },
    draft: 'Bozza da rivedere',
  },
};
