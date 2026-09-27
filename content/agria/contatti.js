// =====================================================================
//  PAGINA CONTATTI — copy (Prompt 15). Modificare qui i testi, non nei
//  componenti. Campi e valori del modulo: lib/contact/fields.js.
//  Ordine delle sezioni: app/(site)/contatti/page.jsx.
// =====================================================================

export const meta = {
  title: 'Contatti — Agria System, parliamo del progetto',
  description:
    'Raccontateci come lavorate oggi: una prima analisi per capire se il progetto ha senso. Risponde una persona, senza impegno. Sede a Perugia.',
  path: '/contatti',
};

export const WHATSAPP = {
  number: '+39 366 344 5417',
  href: 'https://wa.me/393663445417',
};

// 1. Hero
export const hero = {
  eyebrow: 'Contatti',
  title: 'Parliamo del progetto.',
  lead: 'Raccontateci come lavorate oggi. Una prima analisi serve a capire se ha senso lavorare insieme: rispondiamo con una valutazione concreta, non con un preventivo generico.',
};

// 2. Modulo e colonna di rassicurazione
export const form = {
  title: 'Richiesta di prima analisi',
  steps: ["L'azienda", 'Il progetto', 'I contatti'],
  labels: {
    settore: 'Settore',
    azienda: 'Azienda',
    aziendaPlaceholder: 'Inserisci il nome della tua azienda',
    servizio: 'Di cosa hai bisogno?',
    tempistica: 'Quando vorresti partire?',
    messaggio: 'Raccontaci brevemente il tuo progetto',
    messaggioHint: 'Facoltativo',
    messaggioPlaceholder: 'Es. nuovo sito, vendita online, automazione di un processo, software personalizzato…',
    nome: 'Nome',
    cognome: 'Cognome',
    email: 'E-mail',
    telefono: 'Numero di telefono',
    prefisso: 'Prefisso internazionale',
    preferenza: 'Come preferisci proseguire?',
    privacyBefore: "Ho letto l'",
    privacyLink: 'Informativa Privacy',
    privacyAfter: ' e acconsento al trattamento dei miei dati per essere ricontattato in merito alla richiesta inviata.',
    required: 'obbligatorio',
  },
  privacyHref: '/privacy-policy',
  actions: {
    next: 'Avanti',
    back: 'Indietro',
    submit: 'Invia la richiesta',
    sending: 'Invio in corso…',
    edit: 'Modifica',
  },
  progress: (current, total) => `Passo ${current} di ${total}`,
  // avviso richiesto da Google quando il badge reCAPTCHA è nascosto
  recaptcha: {
    before: 'Questo sito è protetto da reCAPTCHA: si applicano le ',
    privacy: 'Norme sulla privacy',
    privacyHref: 'https://policies.google.com/privacy',
    middle: ' e i ',
    terms: 'Termini di servizio',
    termsHref: 'https://policies.google.com/terms',
    after: ' di Google.',
  },
  requiredNote: 'Tutti i campi sono obbligatori, salvo dove indicato.',
  errorSummary: 'Controlla i campi evidenziati.',
  sendError:
    'Non siamo riusciti a inviare la richiesta. Riprova tra qualche istante, oppure scrivici via email o WhatsApp.',
  noScript:
    'Per inviare il modulo serve JavaScript attivo nel browser. Potete comunque scriverci via email o WhatsApp: trovate i recapiti qui sotto.',
  // messaggio precompilato se si arriva dal configuratore della homepage (?moduli=)
  modulesNote: (labels) => `Moduli scelti in homepage: ${labels.join(', ')}.`,
  // dopo l'invio con "Fissare una videocall" si apre il calendario di Alessandro
  meetingsUrl: 'https://meetings-eu1.hubspot.com/alessandro-poponi',
  success: {
    title: 'Richiesta ricevuta',
    text: 'Grazie per averci contattato. Abbiamo ricevuto la tua richiesta e Alessandro del team Agria ti ricontatterà a breve.',
  },
};

export const reassurance = [
  {
    icon: 'user-check',
    title: 'Risponde una persona',
    text: 'La richiesta arriva ad Alessandro, che risponde personalmente.',
  },
  {
    icon: 'check',
    title: 'Nessun impegno',
    text: 'La prima analisi serve a capire se il progetto ha senso, per entrambi.',
  },
  {
    icon: 'shield',
    title: 'Dati trattati con cura',
    text: 'Usiamo i vostri dati solo per rispondere alla richiesta.',
  },
];

// 3. Altri modi per parlarci. Email e telefono da content/site.js.
export const channels = {
  title: 'Altri modi per parlarci',
  labels: {
    email: 'Email',
    phone: 'Telefono',
    whatsapp: 'WhatsApp',
    directEmail: 'Matteo Garuzzo',
    address: 'Sede',
    hours: 'Orari',
  },
  whatsappMessage: 'Buongiorno, vorrei parlare di un progetto con Agria System.',
  address: 'Via Ponte Vecchio, 06135 Perugia',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Via+Ponte+Vecchio+06135+Perugia',
  // orari indicativi: da confermare
  hours: 'Lunedì-venerdì, 9:00-18:00',
};

// 4. Cosa succede dopo: quattro tappe che avanzano da sole
export const nextSteps = {
  eyebrow: 'Dopo l’invio',
  title: 'Cosa succede dopo',
  pause: 'Pausa',
  play: 'Riprendi',
  steps: [
    { icon: 'inbox', title: 'Ricezione', text: 'La richiesta entra nel nostro sistema e viene assegnata.' },
    { icon: 'phone', title: 'Prima risposta', text: 'Alessandro vi scrive o vi chiama per capire meglio.' },
    { icon: 'search', title: 'Analisi', text: 'Guardiamo il vostro caso e prepariamo una valutazione.' },
    { icon: 'file-text', title: 'Proposta', text: 'Ricevete ambito, tempi e investimento definiti sul progetto.' },
  ],
};

// 5. Domande frequenti
export const faq = {
  title: 'Domande frequenti',
  items: [
    {
      q: 'In quanto tempo rispondete?',
      a: 'Alessandro risponde personalmente, di norma entro un giorno lavorativo dalla richiesta.',
    },
    {
      q: 'Cosa serve per la prima call?',
      a: 'Nessun documento. Basta sapere come lavorate oggi: strumenti in uso, canali di vendita o di prenotazione, passaggi fatti a mano. Se avete un sito, tenetelo aperto.',
    },
    {
      q: 'La prima analisi è impegnativa?',
      a: 'No. Serve a capire se il progetto ha senso, per entrambi. Non comporta costi né obblighi.',
    },
    {
      q: 'Come trattate i dati che inviate?',
      a: 'Li usiamo solo per rispondere alla richiesta e li registriamo nel nostro sistema di gestione dei contatti. Nessuna iscrizione a newsletter o comunicazioni commerciali.',
      link: { before: 'I dettagli sono nell’', label: 'Informativa Privacy', href: '/privacy-policy', after: '.' },
    },
  ],
};

// 6. Chiusura sobria per chi non è pronto a scrivere
export const closing = {
  title: 'Non siete ancora pronti a scrivere?',
  text: 'Guardate prima cosa costruiamo, area per area.',
  links: [
    { label: 'Digital Presence', href: '/servizi/digital-presence' },
    { label: 'Digital Commerce', href: '/servizi/digital-commerce' },
    { label: 'Digital Automation', href: '/servizi/digital-automation' },
  ],
  all: { label: 'Tutti i servizi', href: '/servizi' },
};
