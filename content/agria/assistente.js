// =====================================================================
//  ASSISTENTE — risposte curate (Prompt 15, fase C). Nessun modello AI:
//  l'assistente sceglie la risposta confrontando la domanda con le
//  parole chiave qui sotto. Per aggiungere o cambiare una risposta basta
//  modificare questo file.
//
//  Ogni risposta: id, question (testo del suggerimento, facoltativo),
//  keywords (parole o frammenti, minuscole e senza accenti: basta che uno
//  compaia nella domanda; più ne compaiono, più la risposta vince),
//  text (paragrafi), links (facoltativi, { label, href }),
//  handoff: true per proporre WhatsApp e il modulo sotto la risposta.
// =====================================================================

export const assistant = {
  name: 'Assistente Agria',
  disclosure: 'Assistente automatico, non un operatore. Risposte preparate dal team.',
  openLabel: "Apri l'assistente",
  closeLabel: "Chiudi l'assistente",
  pillText: 'Domande?',
  inputLabel: 'Scrivi una domanda',
  inputPlaceholder: 'Scrivi una domanda…',
  send: 'Invia',
  suggestionsLabel: 'Domande frequenti',
  greeting: [
    'Sono l’assistente automatico di Agria System: rispondo con testi preparati dal team su servizi, settori, tempi e modo di lavorare.',
    'Per un progetto concreto vi metto in contatto con una persona.',
  ],
  suggestions: ['cosa-fate', 'settori', 'tempi', 'persona'],
  handoff: {
    text: 'Potete scrivere direttamente su WhatsApp:',
    whatsapp: { label: 'Scrivi su WhatsApp', href: 'https://wa.me/393663445417' },
    whatsappMessage: 'Buongiorno, arrivo dal sito di Agria System e vorrei parlare di un progetto.',
    form: { label: 'Apri il form', href: '/contatti' },
  },
  fallback: [
    'Su questo non ho una risposta preparata, e preferisco non improvvisare.',
    'Meglio parlarne con una persona.',
  ],
  personalData: [
    'Per sicurezza non registro dati personali in questa chat e il messaggio non è stato conservato.',
    'Per essere ricontattati usate il modulo: i dati arrivano direttamente al team.',
  ],
  personalDataPlaceholder: 'Messaggio non mostrato: conteneva dati personali.',
};

export const answers = [
  {
    id: 'chi-siete',
    question: 'Chi siete?',
    keywords: ['chi siete', 'chi e agria', 'agria system', 'azienda', 'agenzia', 'chi c e dietro', 'team', 'chi lavora', 'siete in quanti', 'storia'],
    text: [
      'Agria System è una technology company con sede a Perugia.',
      'Progettiamo, sviluppiamo e gestiamo i sistemi digitali di agriturismi, hotel, cantine e frantoi. Lo sviluppo è interno: nessun subappalto.',
    ],
    links: [{ label: 'Scopri l’azienda', href: '/azienda' }],
  },
  {
    id: 'cosa-fate',
    question: 'Cosa fate esattamente?',
    keywords: ['cosa fate', 'di cosa vi occupate', 'servizi', 'servizio', 'offrite', 'sito', 'siti', 'ecommerce', 'e-commerce', 'shop', 'negozio online', 'vendita online', 'prenotazion', 'automazion', 'software', 'gestionale', 'integrazion', 'app', 'vendere online', 'vendita diretta', 'vendere'],
    text: [
      'Lavoriamo su tre aree, che si possono combinare in un unico sistema.',
      'Digital Presence: siti che generano richieste dirette, visibili su Google e nei motori AI. Digital Commerce: vendita diretta, prenotazioni e pagamenti. Digital Automation: automazioni e integrazioni tra gli strumenti che usate già.',
    ],
    links: [
      { label: 'Digital Presence', href: '/servizi/digital-presence' },
      { label: 'Digital Commerce', href: '/servizi/digital-commerce' },
      { label: 'Digital Automation', href: '/servizi/digital-automation' },
    ],
  },
  {
    id: 'settori',
    question: 'Lavorate col mio settore?',
    keywords: ['settore', 'settori', 'lavorate con', 'agriturism', 'hotel', 'relais', 'masseri', 'b&b', 'hospitality', 'struttura ricettiva', 'cantin', 'vino', 'vitivinicol', 'frantoi', 'olio', 'olivicol', 'ristorant', 'caseifici', 'agroalimentare', 'birrifici', 'miele'],
    text: [
      'Lavoriamo con tre settori: hospitality (agriturismi, hotel, relais), cantine e frantoi. Sono quelli che conosciamo a fondo.',
      'Se la vostra azienda è in un altro settore, la prima analisi serve anche a dirvi con franchezza se siamo la scelta giusta.',
    ],
    links: [{ label: 'I settori', href: '/settori' }],
  },
  {
    id: 'come-si-inizia',
    question: 'Come si inizia?',
    keywords: ['come si inizia', 'come iniziare', 'come funziona', 'primo passo', 'iniziare', 'partire', 'processo', 'metodo', 'come lavorate', 'analisi', 'proposta', 'preventivo'],
    text: [
      'Si parte da una prima analisi. Ci raccontate come lavorate oggi, il nostro team vi ricontatta, guardiamo il vostro caso e ricevete una proposta con ambito, tempi e investimento definiti.',
      'La prima analisi non comporta costi né impegni.',
    ],
    links: [{ label: 'Richiedi la prima analisi', href: '/contatti' }],
  },
  {
    id: 'tempi',
    question: 'Quanto tempo serve?',
    keywords: ['quanto tempo', 'tempi', 'tempistic', 'durata', 'quanto ci vuole', 'settimane', 'mesi', 'quando', 'scadenza', 'consegna', 'pronto'],
    text: [
      'Dipende dall’ambito, per questo non diamo tempi standard.',
      'I tempi si definiscono nella proposta, dopo la prima analisi. Il progetto procede con consegne intermedie da approvare, così vedete il lavoro mentre prende forma.',
    ],
    links: [{ label: 'Richiedi la prima analisi', href: '/contatti' }],
  },
  {
    id: 'costi',
    question: 'Quanto costa?',
    keywords: ['quanto costa', 'costo', 'costi', 'prezzo', 'prezzi', 'listino', 'budget', 'investimento', 'tariff', 'economico', 'pagamento'],
    text: [
      'Non abbiamo un listino né pacchetti preconfezionati.',
      'L’investimento si definisce nella proposta, sul vostro progetto, dopo la prima analisi. La prima analisi non costa nulla.',
    ],
    links: [{ label: 'Richiedi la prima analisi', href: '/contatti' }],
  },
  {
    id: 'cosa-non-fate',
    question: 'Cosa non fate?',
    keywords: ['cosa non fate', 'non fate', 'non lavorate', 'rifiutate', 'dite di no', ' social ', 'social media', 'instagram', 'facebook', 'grafica', 'volantin', 'stampa', 'logo'],
    text: [
      'Non facciamo lavori spot che non cambiano nulla, né gestionali che nessuno poi mantiene. Non subappaltiamo e non vendiamo pacchetti.',
      'Non gestiamo i social né la grafica per la stampa: curiamo identità ed esperienza dentro i progetti digitali, dove incidono sul risultato.',
    ],
  },
  {
    id: 'ai',
    question: 'Usate l’intelligenza artificiale?',
    keywords: ['intelligenza artificiale', ' ai ', 'chatgpt', 'gpt', 'automatic', 'agenti', 'chatbot'],
    text: [
      'Sì, come metodo di lavoro: per analizzare, strutturare e verificare più in fretta. Nei progetti la applichiamo dove produce un risultato misurabile, per esempio classificare richieste o estrarre dati dai documenti.',
      'Le decisioni restano umane, e la responsabilità tecnica è nostra.',
    ],
    links: [{ label: 'Digital Automation', href: '/servizi/digital-automation' }],
  },
  {
    id: 'dove',
    question: 'Dove siete?',
    keywords: ['dove siete', 'dove', 'sede', 'indirizzo', 'perugia', 'umbria', 'venire', 'ufficio', 'zona', 'lavorate fuori', 'estero', 'inglese', 'italia'],
    text: [
      'La sede è in Via Ponte Vecchio, 06135 Perugia.',
      'Seguiamo progetti in tutta Italia, in presenza o da remoto, e costruiamo versioni in inglese per le aziende che vendono all’estero.',
    ],
  },
  {
    id: 'dati',
    question: 'Come trattate i dati?',
    keywords: ['dati', 'privacy', 'gdpr', 'trattamento', 'riservatezz', 'cookie', 'registrate', 'salvate', 'proprieta', 'di chi e il codice', 'codice'],
    text: [
      'Questa chat non registra le conversazioni e non raccoglie dati personali. I dati inviati con il modulo contatti li usiamo solo per rispondere alla richiesta.',
      'Nei progetti, codice, contenuti, domini e dati restano di proprietà del cliente.',
    ],
    links: [{ label: 'Informativa Privacy', href: '/privacy-policy' }],
  },
  {
    id: 'persona',
    question: 'Voglio parlare con qualcuno',
    keywords: ['parlare con', 'qualcuno', 'una persona', 'operatore', 'umano', 'contatt', 'chiama', 'sentirci', 'telefon', 'whatsapp', 'call', 'videocall', 'appuntamento', 'scrivervi', 'email', 'mail'],
    text: ['Certo. Il nostro team commerciale segue il primo contatto e risponde personalmente.'],
    handoff: true,
  },
  {
    id: 'saluto',
    keywords: ['ciao', 'buongiorno', 'buonasera', 'salve', 'hey'],
    text: ['Buongiorno. Chiedetemi pure di servizi, settori, tempi o modo di lavorare, oppure scegliete una domanda qui sotto.'],
  },
  {
    id: 'grazie',
    keywords: ['grazie', 'perfetto', 'ok grazie', 'gentilissim'],
    text: ['Di nulla. Quando volete parlarne con una persona, il modulo e WhatsApp sono qui sotto.'],
    handoff: true,
  },
];
