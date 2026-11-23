// =====================================================================
//  HOMEPAGE AGRIA — copy approvato (Prompt 28). Modificare qui i testi,
//  non nei componenti. Nessun testo va aggiunto senza approvazione.
//  Ordine delle sezioni: app/(site)/page.jsx.
//  Titoli bicolore: { text, accent }. accent è la seconda frase, resa in
//  verde (green-dark su chiaro, green-bright su ink), stesso peso.
//  Etichette: tra parentesi, come nel prompt (l'Eyebrow le rende maiuscole).
// =====================================================================

import { agriaImage } from '@/lib/agria-images';

// 1. Apertura (fascia ink). Il titolo si riscrive: "Il vostro [parola],
// collegato a tutto il resto." La prima parola è quella fissa (movimento
// ridotto, senza JavaScript, HTML del server).
export const hero = {
  eyebrow: '( SITI, E-COMMERCE E AUTOMAZIONI · AGRITURISMI, HOTEL, CANTINE E FRANTOI )',
  title: {
    before: 'Il vostro',
    words: ['sito', 'e-commerce', 'gestionale', 'prenotazioni', 'calendario'],
    after: ', collegato a tutto il resto.',
  },
  lead: 'Costruiamo siti ed e-commerce nuovi, o miglioriamo quelli che avete, e li colleghiamo ai programmi che usate già: gestionale, pagamenti, email, calendario. Un dato inserito una volta arriva ovunque serve.',
  primary: { label: 'Richiedete la prima analisi →', href: '/contatti' },
  secondary: { label: 'Guardate come funziona', href: '#come-funziona' },
  note: 'Tre minuti per raccontarci come lavorate · vi risponde una persona',
};

// 2. In trenta secondi: quattro colonne di testo
export const glance = {
  eyebrow: '( IN TRENTA SECONDI )',
  columns: [
    { title: 'Cosa facciamo', text: 'Siti, e-commerce e automazioni, collegati tra loro e ai programmi che usate già.' },
    {
      title: 'Per chi',
      text: 'Agriturismi, hotel e strutture ricettive, aziende vitivinicole, frantoi. Tre settori che conosciamo da vicino.',
    },
    { title: 'Come', text: "Prima un'analisi di come lavorate, poi un progetto scritto, poi costruiamo noi, a Perugia." },
    { title: 'Da dove si parte', text: 'Da un pezzo solo, di solito il sito o le prenotazioni. Il resto si aggiunge quando serve.' },
  ],
};

// 3. Quante ne riconoscete? (modulo interattivo, Fase B). Le scelte arrivano a
// /contatti come parametro ripetuto: ?problemi=prenotazioni&problemi=richieste
// (valori = id qui sotto); la pagina contatti ne mostra i titoli nel messaggio.
export const problems = {
  eyebrow: '( DA DOVE SI PARTE )',
  title: { text: 'Quante di queste', accent: 'succedono anche da voi?' },
  intro:
    'Finché succedono, sembrano la normalità. Messe in fila costano tempo, soldi e qualche cliente. Segnate quelle che succedono da voi: le guardiamo insieme nella prima analisi.',
  // istruzione sopra le schede (Prompt 30): "toccate" con il dito, "segnate" con il mouse
  instruction: { touch: '( TOCCATE QUELLE CHE SUCCEDONO DA VOI )', pointer: '( SEGNATE QUELLE CHE SUCCEDONO DA VOI )' },
  param: 'problemi',
  action: '/contatti',
  items: [
    {
      id: 'prenotazioni',
      label: '01 · PRENOTAZIONI',
      title: 'La stessa prenotazione, scritta tre volte.',
      text: 'Arriva dal portale, va ricopiata nel gestionale, poi nel foglio delle pulizie. Un errore, e la camera è venduta due volte.',
    },
    {
      id: 'richieste',
      label: '02 · RICHIESTE',
      title: '«Avete posto per sabato?», alle 23:40.',
      text: "La risposta parte la mattina dopo. L'ospite, intanto, ha prenotato altrove.",
    },
    {
      id: 'vendita',
      label: '03 · VENDITA',
      title: 'Il sito è bello, ma vende poco.',
      text: 'Visite tante, prenotazioni dirette poche: si passa dai portali, e dalle loro commissioni.',
    },
    {
      id: 'ordini',
      label: '04 · ORDINI',
      title: 'Ordini di olio e vino su WhatsApp, email e telefono.',
      text: 'Ogni ordine va riscritto a mano, e il listino del ristorante lo sapete a memoria solo voi.',
    },
    {
      id: 'estero',
      label: '05 · ESTERO',
      title: "Chi arriva dall'estero vi scrive in inglese.",
      text: 'Il sito risponde solo in italiano, e la prenotazione finisce in una telefonata.',
    },
    {
      id: 'pagamenti',
      label: '06 · PAGAMENTI',
      title: 'La caparra arriva con il bonifico, quando arriva.',
      text: "Controllare l'estratto conto, cercare il nome, segnare la conferma: tutto a mano.",
    },
    {
      id: 'stagione',
      label: '07 · STAGIONE',
      title: 'A luglio la reception non sta dietro alle richieste.',
      text: "D'inverno regge tutto. In alta stagione le richieste si accumulano, e qualcuna si perde.",
    },
    {
      id: 'fogli',
      label: '08 · FOGLI',
      title: 'Il foglio di calcolo che conosce una persona sola.',
      text: 'Se manca lei, nessuno sa dove sono le prenotazioni di settembre.',
    },
  ],
  // barra in fondo: contatore "n su 8" ({n} e {total} li sostituisce il contatore)
  count: '{n} su {total}',
  hint: 'Segnate quelle che succedono da voi.',
  cta: 'Richiedete la prima analisi →',
  // il pulsante quando c'è almeno una scheda segnata
  ctaChosen: 'Portiamo queste in analisi →',
};

// 4. Tre piani. links: le pagine del piano (etichette = nomi delle pagine nel menu)
export const floors = {
  eyebrow: '( COME COSTRUIAMO )',
  title: { text: 'Si parte dal sito.', accent: 'Poi si sale.' },
  intro:
    'Ogni piano regge da solo e prepara quello sopra. Se oggi vi serve solo il sito, si parte da lì: il resto può aspettare, e quando arriva trova tutto pronto.',
  items: [
    {
      key: 'terra',
      label: '1 · PIANO TERRA',
      title: 'Sito e vendita',
      text: 'Sito nuovo o rifatto: veloce, in più lingue, trovato su Google e dagli assistenti AI. Prenotazioni, shop, buoni regalo e pagamento online.',
      links: [
        { label: 'Digital Presence', href: '/servizi/digital-presence' },
        { label: 'Digital Commerce', href: '/servizi/digital-commerce' },
      ],
    },
    {
      key: 'primo',
      label: '2 · PRIMO PIANO',
      title: 'Collegamenti',
      text: 'Sito, gestionale, pagamenti, email e calendario si scambiano i dati da soli. Ogni dato entra una volta.',
      links: [{ label: 'Collegare gestionale e sito', href: '/soluzioni/collegare-gestionale-e-sito' }],
    },
    {
      key: 'secondo',
      label: '3 · SECONDO PIANO',
      title: 'Assistenti',
      text: "Rispondono alle domande di sempre, preparano prenotazioni e ordini, mandano promemoria. L'ultima parola è di una persona.",
      links: [{ label: 'Digital Automation', href: '/servizi/digital-automation' }],
    },
  ],
};

// 5. Come funziona (schema prima/dopo, Fase C). nodes: i sei riquadri; side e
// row: posto nello stato "Con Agria" (tre a sinistra, tre a destra; su mobile
// in colonna, nello stesso ordine). step: la riga mono che compare quando il
// dato arriva; order: posizione nella sequenza (1-4, poi gli ultimi due insieme).
export const howItWorks = {
  id: 'come-funziona',
  eyebrow: '( COME FUNZIONA )',
  title: { text: 'Oggi ogni programma lavora per conto suo.', accent: 'Con Agria si parlano.' },
  text: "Premete l'interruttore e guardate cosa cambia quando i programmi si parlano.",
  states: { before: 'Oggi', after: 'Con Agria' },
  replay: '↻ rivedi',
  nodes: [
    { key: 'sito', label: 'Sito', step: "1 · l'ospite prenota", side: 'left', row: 0, order: 1 },
    { key: 'portali', label: 'Portali di prenotazione', step: 'le prenotazioni arrivano da sole', side: 'left', row: 1, order: 5 },
    { key: 'fogli', label: 'Fogli di calcolo', step: 'si aggiornano da soli', side: 'left', row: 2, order: 5 },
    { key: 'pagamenti', label: 'Pagamenti online', step: "2 · l'ospite paga", side: 'right', row: 0, order: 2 },
    { key: 'gestionale', label: 'Gestionale', step: '3 · la prenotazione entra', side: 'right', row: 1, order: 3 },
    { key: 'email', label: 'Email e messaggi', step: '4 · conferma e promemoria', side: 'right', row: 2, order: 4 },
  ],
  center: { title: 'Un unico sistema', text: 'Ogni dato entra una volta' },
  captions: {
    before: 'Ogni dato si ricopia a mano, da un programma all\'altro.',
    after: 'Gli stessi programmi, collegati: ogni dato entra una volta e arriva da solo dove serve.',
  },
  note: 'Ogni collegamento dipende da cosa permettono i programmi che usate: è la prima cosa che controlliamo.',
};

// 6. L'assistente al lavoro (fascia ink, Fase C). Due finestre: la chat, i cui
// messaggi compaiono uno alla volta, e la richiesta, i cui campi si riempiono
// man mano (after: indice del messaggio che fornisce il dato).
export const assistantDemo = {
  eyebrow: '( GLI ASSISTENTI )',
  title: { text: 'Risponde subito.', accent: 'Decide la reception.' },
  intro:
    'Un assistente per un compito preciso. Risponde alle domande di sempre, raccoglie le informazioni giuste e passa tutto a una persona, già in ordine. Costruito sulle vostre camere, i vostri prezzi, il vostro modo di parlare agli ospiti.',
  chat: {
    bar: 'SITO DI ESEMPIO · AGRITURISMO DI FANTASIA',
    messages: [
      { from: 'ospite', text: 'Buonasera, avete una camera per due dal 12 al 14 giugno?' },
      {
        from: 'assistente',
        text: 'Sì: per quelle date abbiamo libera la camera con vista sugli ulivi. Preferite la colazione in camera o in sala?',
      },
      { from: 'ospite', text: 'In sala. Si può arrivare dopo le 21?' },
      { from: 'assistente', text: 'Certo, basta avvisarci. Vi confermo tutto a breve con una email: a quale indirizzo?' },
      { from: 'ospite', text: 'laura.esempio@example.com' },
    ],
  },
  request: {
    bar: 'RICHIESTA PRONTA · DA CONFERMARE',
    fields: [
      { label: 'Ospiti', value: '2', after: 0 },
      { label: 'Periodo', value: '12–14 giugno', after: 0 },
      { label: 'Camera', value: 'Vista ulivi', after: 1 },
      { label: 'Colazione', value: 'In sala', after: 2 },
      { label: 'Arrivo', value: 'Dopo le 21', after: 2 },
      { label: 'Prende in carico', value: 'Giulia Esempio', note: 'bozza da rivedere', after: 4 },
    ],
  },
  note: 'Esempio illustrativo: nomi e contenuti di fantasia.',
  limits: {
    title: 'Cosa non fanno, di proposito',
    text: 'Confermare prenotazioni, fare prezzi, rispondere a nome vostro senza che qualcuno abbia letto. Preparano tutto; la risposta la date voi. Un assistente che si improvvisa albergatore prima o poi sbaglia, e quello sbaglio diventa un problema vostro.',
  },
  commitments: {
    title: 'Tre impegni',
    items: [
      {
        icon: 'layers',
        title: 'Sui vostri sistemi.',
        text: "L'assistente lavora dentro il sito e il gestionale che avete: i dati restano lì, e restano vostri.",
      },
      {
        icon: 'user-check',
        title: 'Decidete voi.',
        text: 'Ogni prenotazione, ordine o risposta importante passa da una persona prima di partire.',
      },
      {
        icon: 'key',
        title: 'Liberi.',
        text: 'Sito, dati e accessi restano vostri, documentati e consegnati. Potete cambiare fornitore quando volete, con tutto in mano.',
      },
    ],
  },
};

// 7. Reparto per reparto (Fase C): schede selezionabili, su mobile fisarmonica.
export const departments = {
  eyebrow: '( DOVE INTERVENIAMO )',
  title: { text: 'Dove interveniamo,', accent: 'reparto per reparto.' },
  intro: 'Quattro schede. Per ognuna: cosa si fa da solo, quali programmi tocca, da dove si comincia.',
  labels: { auto: 'Cosa si fa da solo', tools: 'Programmi che tocca', first: 'Il primo passo' },
  items: [
    {
      key: 'reception',
      title: 'Reception',
      auto: 'Risposte su orari, disponibilità e come arrivare. Prenotazione preparata. Conferma e promemoria inviati.',
      tools: ['Sito', 'Gestionale', 'Email', 'WhatsApp'],
      first: 'Un assistente sulle domande più frequenti, con la reception che conferma.',
    },
    {
      key: 'prenotazioni',
      title: 'Prenotazioni e vendita',
      auto: 'Prenotazioni e buoni regalo venduti dal sito, pagati online. Disponibilità sempre aggiornata.',
      tools: ['Sito', 'Pagamenti', 'Gestionale', 'Portali'],
      first: 'Il modulo di prenotazione diretta, collegato alla disponibilità vera.',
    },
    {
      key: 'amministrazione',
      title: 'Amministrazione',
      auto: 'Incassi abbinati alle prenotazioni. Conferme inviate. Report pronto il lunedì mattina.',
      tools: ['Pagamenti', 'Gestionale', 'Fogli di calcolo'],
      first: 'Il report settimanale, che arriva da solo.',
    },
    {
      key: 'ordini',
      title: 'Ordini, per cantine e frantoi',
      auto: 'Ordini di privati, ristoranti e rivenditori in un solo posto, ognuno con il suo listino. Spedizioni e magazzino aggiornati.',
      tools: ['Shop', 'Gestionale', 'Corriere'],
      first: 'Lo shop con i listini separati.',
    },
  ],
  cta: { label: 'Mappiamo insieme il vostro lavoro →', href: '/contatti' },
};

// 8. Quando sì, quando no (id "selezione": vi punta anche il rimando breve
// delle pagine servizio, whenWeHelp.short)
export const selection = {
  id: 'selezione',
  eyebrow: '( SELEZIONE )',
  title: { text: 'Scegliamo i progetti.', accent: 'E ve lo diciamo subito.' },
  yes: {
    title: 'Ha senso chiamarci se…',
    items: [
      "Il sito c'è, ma prenotazioni e ordini diretti sono pochi.",
      "Qualcuno passa ore a ricopiare dati da un programma all'altro.",
      "In alta stagione l'ufficio non sta dietro alle richieste.",
      "Volete vendere all'estero e il sito parla solo italiano.",
    ],
  },
  no: {
    title: 'Vi diciamo di no se…',
    items: [
      "Cercate un sito vetrina e nient'altro: lo fa bene chi costa meno di noi.",
      'Volete cambiare gestionale: noi colleghiamo al resto quello che avete.',
      'Il problema è commerciale, non tecnico: nessun sistema lo risolve.',
      'Cercate il preventivo più basso da confrontare con altri due.',
    ],
  },
  note: 'Quando diciamo di no, diciamo anche perché, e cosa vi conviene fare invece.',
};

// Rimando breve in fondo alle tre pagine servizio (components/agria/sections/
// WhenWeHelp.jsx): porta alla sezione "Quando sì, quando no" della homepage.
// eyebrow: etichetta accessibile del blocco.
export const whenWeHelp = {
  eyebrow: 'Quando interveniamo',
  short: {
    text: 'Non prendiamo progetti che non cambiano il modo di lavorare o di vendere, e se la piattaforma che usate funziona ve lo diciamo.',
    link: { label: 'Quando ha senso chiamarci, e quando no', href: '/#selezione' },
  },
};

// 9. Come lavoriamo
export const method = {
  id: 'come-lavoriamo',
  eyebrow: '( DALLA RICHIESTA ALLA CONSEGNA )',
  title: { text: 'Quattro passi.', accent: 'Il primo dura tre minuti.' },
  cta: { label: 'Richiedete la prima analisi →', href: '/contatti' },
  steps: [
    {
      number: '1',
      title: 'La richiesta',
      label: 'TRE MINUTI, DAL SITO',
      text: 'Ci raccontate come lavorate oggi, nel modulo o su WhatsApp. Vi risponde una persona.',
    },
    {
      number: '2',
      title: 'La prima analisi',
      label: 'IN VIDEOCALL, O DI PERSONA IN UMBRIA',
      text: 'Guardiamo i programmi che usate, dove i dati si fermano e cosa passa ancora a mano. Ve la mostriamo e vi diciamo subito se è un lavoro per noi.',
    },
    {
      number: '3',
      title: 'Il progetto',
      label: 'SCRITTO',
      text: 'Cosa serve, in che ordine, cosa potete tenere. Con i costi voce per voce, prima di firmare.',
    },
    {
      number: '4',
      title: 'Costruzione ed evoluzione',
      label: 'A PERUGIA',
      text: 'Costruiamo noi, con consegne intermedie, e vi consegniamo tutto documentato. Dopo la consegna restiamo, e miglioriamo.',
    },
  ],
};

// 10. Chi siamo. Foto: IMG_8530 (Prompt 28), 1600 px e 800 px per mobile.
export const team = {
  eyebrow: '( CHI SIAMO )',
  title: { text: 'Tre persone, a Perugia.', accent: 'Chi progetta è chi costruisce.' },
  text: 'Siamo Matteo Garuzzo, Matteo De Pilla e Alessandro Poponi. Lavoriamo con strutture ricettive, aziende vitivinicole e frantoi, e usiamo ogni giorno gli stessi strumenti che proponiamo. Quello che costruiamo per voi lo abbiamo provato prima su di noi.',
  people: [
    { name: 'Matteo Garuzzo', role: 'Progetta e costruisce siti, e-commerce e collegamenti tra i programmi.' },
    { name: 'Matteo De Pilla', role: 'Assistenti AI e automazioni: tutto quello che lavora da solo, e passa a una persona.' },
    { name: 'Alessandro Poponi', role: 'Vi ascolta per primo, e vi segue dalla prima analisi alla consegna.' },
  ],
  principles: [
    { title: 'Costruiamo noi.', text: 'Chi progetta è anche chi sviluppa e chi interviene dopo.' },
    { title: 'Un solo riferimento.', text: 'La stessa persona dalla prima analisi alla manutenzione.' },
    {
      title: 'Tutto scritto.',
      text: 'Ogni collegamento documentato e consegnato: il vostro sistema dipende da voi, e da nessuna memoria.',
    },
  ],
  image: {
    src: '/images/azienda/team.jpg',
    mobileSrc: '/images/azienda/team-800.jpg',
    width: 1600,
    height: 1067,
    mobileWidth: 800,
    mobileHeight: 533,
    alt: 'Matteo Garuzzo, Matteo De Pilla e Alessandro Poponi',
  },
};

// 11. Domande frequenti (anche nei dati strutturati FAQPage)
export const faq = {
  eyebrow: '( LE DOMANDE CHE CI FANNO DAVVERO )',
  title: { text: 'Le domande che ci fanno', accent: 'prima di firmare.' },
  items: [
    {
      q: 'Dobbiamo cambiare gestionale?',
      a: 'No. Lavoriamo sopra il gestionale, il PMS o il programma di cassa che avete già, e lo colleghiamo al resto. Se non si può collegare, ve lo diciamo nella prima analisi, prima di qualunque proposta.',
    },
    {
      q: 'Quanto costa?',
      a: 'Dipende da quanti piani servono e da cosa avete già. Dopo la prima analisi ricevete un progetto scritto con i costi voce per voce, e lo rileggiamo insieme in videocall. Si firma solo dopo.',
    },
    {
      q: "L'assistente risponde al posto nostro?",
      a: 'Prepara. Raccoglie le informazioni, scrive una bozza e la passa a una persona, che la rilegge e la manda. Nessuna conferma e nessun prezzo partono da soli.',
    },
    {
      q: 'Possiamo partire da una cosa sola?',
      a: 'Sì, ed è quello che consigliamo: di solito il sito o le prenotazioni dirette. Ogni pezzo nasce pronto a collegarsi al prossimo, quando vorrete.',
    },
    {
      q: 'Quanto tempo ci vuole?',
      a: 'Il sito è il primo piano e il più veloce; i collegamenti vengono dopo, uno alla volta. I tempi, con le consegne intermedie, stanno nel progetto scritto.',
    },
    {
      q: 'E dopo la consegna?',
      a: 'Restiamo. Assistenza, piccoli interventi e miglioramenti, con un piano mensile o a chiamata: lo scegliete voi, nel progetto. Sito, dati e accessi restano comunque vostri.',
    },
  ],
};

// 12. Blog: tre articoli reali (titolo, etichetta e immagine dal post).
// alt scritti qui: quelli dei post non descrivono sempre la foto.
export const blog = {
  eyebrow: '( BLOG )',
  title: 'Guide pratiche, scritte da chi costruisce.',
  allLabel: 'Tutti gli articoli',
  allHref: '/blog',
  articles: [
    { slug: 'agriturismo-booking-online-prenotazioni', alt: 'Casolari rossi lungo una strada bianca in campagna' },
    { slug: 'ecommerce-vino-margini-vendita-diretta', alt: 'Scatole di cartone aperte, pronte per la spedizione' },
    { slug: 'ecommerce-per-frantoi', alt: "Olive su un cucchiaio sotto un filo d'olio" },
  ],
};

// 13. Chiusura (fascia ink). Il secondo pulsante usa il link di QUICK_CONTACT.whatsapp.
export const homeClosing = {
  title: { text: 'Ogni sistema che funziona', accent: "è partito da un'analisi." },
  text: 'Raccontateci come lavorate oggi. Vi mostriamo cosa si può collegare, e da dove conviene partire.',
  primary: { label: 'Richiedete la prima analisi →', href: '/contatti' },
  secondary: { label: 'Scriveteci su WhatsApp' },
};

// ---------------------------------------------------------------------
//  Testi usati fuori dalla homepage (non toccati dal Prompt 28)
// ---------------------------------------------------------------------

// /blog: titolo della pagina (news.title). /blog e articoli: chiusura (closing).
export const news = {
  eyebrow: 'Insights',
  title: 'Quello che impariamo, scritto.',
  allLabel: 'Tutti gli articoli',
  allHref: '/blog',
  articles: blog.articles,
};

export const closing = {
  title: 'Raccontateci come lavorate oggi.',
  text: 'Una prima analisi serve a capire se ha senso lavorare insieme. Rispondiamo con una valutazione concreta, non con un preventivo generico.',
  // stessa chiamata della homepage (Prompt 28, correzioni prima della Fase B)
  cta: { label: 'Richiedete la prima analisi →', href: '/contatti' },
};


// /settori: griglia dei settori (SectorCards) e anteprima per settore
// (SectorPreview), fuori dalla homepage dal Prompt 28. Testi invariati.
// Foto dalla pipeline Unsplash (settori/* in scripts/images.config.json).
export const sectors = {
  eyebrow: 'Settori',
  title: 'Conosciamo tre mestieri, non tutti.',
  linkLabel: 'Guardate il settore',
  items: [
    {
      key: 'hospitality',
      title: 'Hospitality',
      href: '/settori/hospitality',
      image: agriaImage('settori/hospitality'),
      text: 'Agriturismi, hotel e strutture ricettive. Prenotazioni diverse su portali, email e telefono, inserite due volte a mano. Commissioni che crescono mentre il canale diretto resta fermo.',
    },
    {
      key: 'cantine',
      title: 'Cantine',
      href: '/settori/cantine',
      image: agriaImage('settori/cantine'),
      text: "Cantine e aziende vitivinicole. Degustazioni piene e nessun contatto raccolto. Vendita diretta marginale rispetto alla distribuzione, spedizioni e adempimenti fuori dall'e-commerce.",
    },
    {
      key: 'frantoi',
      title: 'Frantoi',
      href: '/settori/frantoi',
      image: agriaImage('settori/frantoi'),
      text: 'Frantoi e aziende olivicole. Ordini tra telefono, WhatsApp ed email, tutti da riscrivere. Listini diversi per privati, ristorazione e B2B, gestiti a memoria.',
    },
  ],
};

export const preview = {
  eyebrow: 'Cosa costruiamo',
  title: 'Guardate il risultato, per settore.',
  text: 'Tre mestieri, tre sistemi diversi.',
  tabsLabel: 'Anteprima per settore',
  note: 'Anteprime illustrative: i progetti reali arrivano qui appena pubblicabili.',
  sectors: [
    {
      key: 'hospitality',
      label: 'Hospitality',
      kicker: 'Agriturismo',
      title: 'Prenotate direttamente, senza intermediari.',
      line: 'Disponibilità reali, tariffe aggiornate, conferma immediata.',
      tiles: [
        { title: 'Camere', text: 'Disponibilità sincronizzata' },
        { title: 'Esperienze', text: 'Cena, degustazioni, visite' },
        { title: 'Ospiti', text: 'Storico e ritorni' },
      ],
    },
    {
      key: 'cantine',
      label: 'Cantine',
      kicker: 'Cantina',
      title: 'Il vino della cantina, a casa del cliente.',
      line: 'Vendita diretta, degustazioni prenotabili, spedizioni gestite.',
      tiles: [
        { title: 'Shop', text: 'Bottiglie e formati' },
        { title: 'Visite', text: 'Calendario e capienza' },
        { title: 'Club', text: 'Abbonamenti e spedizioni' },
      ],
    },
    {
      key: 'frantoi',
      label: 'Frantoi',
      kicker: 'Frantoio',
      title: 'Ordini in un unico ingresso.',
      line: 'Privati, ristorazione e B2B con listini separati.',
      tiles: [
        { title: 'Formati', text: 'Bottiglie, latte, bag-in-box' },
        { title: 'Listini', text: 'Privati e professionali' },
        { title: 'Campagna', text: 'Prenotazioni molitura' },
      ],
    },
  ],
};

// /contatti?moduli=…: il vecchio configuratore della homepage. Resta perché link
// esterni possono usarlo: la pagina contatti ne mostra le etichette nel messaggio.
export const composer = {
  param: 'moduli',
  modules: [
    { id: 'sito', label: 'Sito' },
    { id: 'prenotazioni-dirette', label: 'Prenotazioni dirette' },
    { id: 'e-commerce', label: 'E-commerce' },
    { id: 'listini-b2b', label: 'Listini B2B' },
    { id: 'automazioni', label: 'Automazioni' },
    { id: 'report-settimanale', label: 'Report settimanale' },
  ],
};
