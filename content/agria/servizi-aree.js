// =====================================================================
//  PAGINE AREA AGRIA — copy approvato (Prompt 13, concept v6). Modificare
//  qui i testi, non nei componenti. Nessun testo va aggiunto senza
//  approvazione. Template: components/agria/service/ServiceAreaPage.jsx
//  icon: nome di un'icona del set (components/agria/icons/Icon.jsx).
// =====================================================================

import { agriaImage } from '@/lib/agria-images';

const CONTACT = '/contatti';
const WRITE = { label: 'Scriveteci in due righe', href: CONTACT };
const METHOD = { label: 'Guardate il metodo', href: '#metodo' };
// Due usi dell'AI, sempre distinti (stessa distinzione della pagina Azienda):
// quella con cui lavoriamo, su ogni progetto, e quella che implementiamo nei
// processi del cliente, solo in Digital Automation.
// Presence e Commerce: la sezione tiene insieme l'AI del metodo, la misurazione e
// la proprietà; il testo dice che l'AI è un metodo, non un servizio venduto
const ON_EVERY_PROJECT_TITLE = "Su ogni progetto: l'AI con cui lavoriamo, la misurazione dal primo giorno, nessun vincolo tecnico.";
const AI_IN_PROCESS_TITLE = "L'AI che implementiamo nei vostri processi: una componente dei sistemi che costruiamo, dove i dati la reggono.";
const DELIVERABLES_TITLE = 'Alla consegna resta questo.';
const CLOSING_TEXT =
  'Una prima analisi serve a capire se ha senso lavorare insieme. Rispondiamo con una valutazione concreta, non con un preventivo generico.';

// "Camere · disponibilità sincronizzata" → { title: 'Camere', text: 'disponibilità sincronizzata' }
// build.items[].icon: icona della voce (usata anche nei blocchi dell'indice /servizi)
// build.items[].image: fotografia dell'anteprima (sezione 3), perché la pagina
// abbia una foto reale ogni tre o quattro sezioni; foto già nel repository e
// accreditate, in attesa delle foto dedicate (vedi report 13).
const tiles = (...pairs) => pairs.map(([title, text]) => ({ title, text }));

// foto del settore Hospitality dalla pipeline (settori/hospitality)
const HOSPITALITY_PHOTO = agriaImage('settori/hospitality');

export const SECTOR_LABELS = { hospitality: 'Hospitality', cantine: 'Cantine', frantoi: 'Frantoi' };

export const serviceAreas = {
  presence: {
    key: 'presence',
    name: 'Digital Presence',
    meta: {
      title: 'Digital Presence — siti web per agriturismi, cantine e frantoi | Agria System',
      description:
        'Progettiamo siti costruiti per generare richieste dirette: architettura, prestazioni, SEO tecnica e visibilità nei motori AI per hospitality, cantine e frantoi.',
      path: '/servizi/digital-presence',
    },
    cta: { label: 'Avviate il progetto', href: CONTACT },
    hero: {
      eyebrow: '01 — Digital Presence',
      title: 'La presenza digitale come infrastruttura commerciale.',
      lead: 'Progettiamo siti costruiti per generare richieste dirette, non rappresentanza, per hospitality (agriturismi, hotel e strutture ricettive), cantine e frantoi. Struttura, prestazioni e visibilità, dentro Google e dentro i motori conversazionali.',
      secondary: METHOD,
      pills: ['Architettura', 'Interfaccia', 'Sviluppo', 'Core Web Vitals', 'SEO tecnica', 'Visibilità AI', 'IT · EN'],
    },
    diagnosis: {
      title: 'Tre problemi che costano più di un sito.',
      items: [
        {
          icon: 'search',
          title: 'Invisibili nella ricerca',
          text: 'Le richieste del vostro territorio finiscono ai portali. Il sito non è strutturato per essere trovato, né da Google né dagli assistenti conversazionali.',
        },
        {
          icon: 'funnel',
          title: 'Traffico che non converte',
          text: 'Chi arriva non trova disponibilità, condizioni o un percorso chiaro. La visita si chiude senza lasciare un contatto.',
        },
        {
          icon: 'phone',
          title: 'Domanda gestita a mano',
          text: 'Ogni richiesta diventa una telefonata o un messaggio. Nessuno storico, nessuna misura, nessuna scalabilità.',
        },
      ],
      cta: { label: "Richiedete un'analisi della presenza attuale", href: CONTACT },
    },
    build: {
      title: 'Quattro impianti, uno standard unico.',
      items: [
        {
          icon: 'calendar',
          title: 'Struttura ricettiva',
          image: HOSPITALITY_PHOTO,
          text: 'Disponibilità reali, esperienze e prenotazione diretta al centro del percorso.',
          tiles: tiles(
            ['Camere', 'disponibilità sincronizzata'],
            ['Esperienze', 'cena, degustazioni, visite'],
            ['Ospiti', 'storico e ritorni'],
          ),
        },
        {
          icon: 'tag',
          title: 'Cantina',
          image: { src: '/images/software/sector-vitivinicolo-hero.jpg', alt: 'Botti di legno allineate in una cantina con volta in mattoni' },
          text: "Etichette, territorio e visite collegati alla vendita diretta e all'export.",
          tiles: tiles(['Etichette', 'annate e formati'], ['Visite', 'calendario e capienza'], ['Export', 'schede in inglese']),
        },
        {
          icon: 'sprout',
          title: 'Frantoio',
          image: { src: '/images/software/sector-frantoi-hero.jpg', alt: "Olio appena estratto che scende da un beccuccio d'acciaio" },
          text: 'Prodotto, campagna e listini distinti tra privati e professionali.',
          tiles: tiles(
            ['Formati', 'bottiglie, latte, bag-in-box'],
            ['Listini', 'privati e professionali'],
            ['Campagna', 'molitura e olio nuovo'],
          ),
        },
        {
          icon: 'globe',
          title: 'Presenza internazionale',
          image: { src: '/images/servizi/seo-geo-strategy-hero.jpg', alt: 'Strada bianca tra cipressi e vigneti al tramonto' },
          text: "Italiano e inglese in un'unica architettura, con contenuti adattati al mercato.",
          tiles: tiles(['IT', 'mercato interno'], ['EN', 'export e viaggiatori'], ['hreflang', 'versioni collegate']),
        },
      ],
    },
    ai: {
      title: ON_EVERY_PROJECT_TITLE,
      text: "Analisi, struttura, contenuti e controlli tecnici passano da strumenti che acceleriamo con l'AI: è un metodo, non un servizio che vendiamo. Le decisioni, e la responsabilità, restano nostre.",
      items: [
        {
          icon: 'sparkles',
          title: 'AI nel processo',
          text: "Analisi dei contenuti esistenti, struttura delle pagine, bozze e controlli: preparati più in fretta con l'AI, poi rivisti e decisi da noi.",
        },
        {
          icon: 'chat',
          title: 'Controlli tecnici più rapidi',
          text: "Dati strutturati, collegamenti e versioni IT/EN verificati con strumenti che acceleriamo con l'AI, prima di ogni pubblicazione.",
        },
        {
          icon: 'target',
          title: 'Misurazione dal primo clic',
          text: 'Il piano di tracciamento si progetta prima della pubblicazione: sapete da dove arrivano le richieste e dove si interrompono.',
        },
        {
          icon: 'key',
          title: 'Proprietà e continuità',
          text: 'Codice, contenuti e domini restano vostri. Nessun vincolo tecnico che vi leghi a noi.',
        },
      ],
      cta: { label: 'Parliamo del vostro progetto', href: CONTACT },
    },
    // Prompt 14: sezione dopo l'AI (solo Digital Presence)
    seo: {
      title: 'SEO e GEO',
      items: [
        {
          icon: 'gauge',
          title: 'SEO tecnica',
          text: 'Struttura, indicizzazione, dati strutturati e velocità: le fondamenta senza cui nessun contenuto rende.',
        },
        {
          icon: 'map-pin',
          title: 'SEO locale',
          text: 'Schede, mappe e contenuti di territorio, dove si decide la scelta di una struttura o di un produttore.',
        },
        {
          icon: 'sparkles',
          title: 'GEO, visibilità nei motori AI',
          text: 'Contenuti e dati organizzati perché gli assistenti conversazionali vi citino con informazioni corrette.',
        },
        {
          icon: 'chat',
          title: 'Contenuti che rispondono',
          text: 'Pagine costruite sulle domande reali di chi cerca, non sulle parole che usiamo tra noi.',
        },
      ],
    },
    method: {
      title: 'Un metodo che unisce dati, design e sviluppo.',
      steps: [
        {
          title: 'Strategia',
          text: 'Analisi della domanda reale del vostro settore, dei concorrenti diretti e di come vi trovano oggi.',
        },
        {
          title: 'Architettura',
          text: 'Modello dei contenuti, prototipo navigabile e design system approvati prima di scrivere codice.',
        },
        {
          title: 'Sviluppo',
          text: 'Costruzione interna, con prestazioni e accessibilità verificate durante il lavoro, non alla consegna.',
        },
        {
          title: 'Go-live',
          text: 'Pubblicazione con tracciamento attivo, controllo dei dati reali e interventi correttivi nelle settimane successive.',
        },
      ],
    },
    deliverables: {
      title: DELIVERABLES_TITLE,
      intro: 'Non solo un sito pubblicato: la documentazione che lo rende governabile nel tempo, anche senza di noi.',
      items: [
        { text: 'Architettura informativa e modello dei contenuti', category: 'Ricerca' },
        { text: 'Prototipo navigabile, approvato prima dello sviluppo', category: 'Design' },
        { text: 'Design system: componenti, stati e documentazione', category: 'Design' },
        { text: 'Piano di misurazione: eventi, obiettivi, conversioni', category: 'Analytics' },
        { text: 'Checklist SEO tecnica e piano di migrazione degli indirizzi', category: 'SEO' },
        { text: 'Report di collaudo: Core Web Vitals, accessibilità, dispositivi', category: 'Delivery' },
      ],
    },
    verticals: {
      title: 'Progettato per il vostro mestiere.',
      sectors: {
        hospitality: [
          {
            icon: 'calendar',
            title: 'Disponibilità in tempo reale',
            text: "Camere ed esperienze aggiornate, senza rimandare all'email per sapere se c'è posto.",
          },
          {
            icon: 'arrow-in',
            title: 'Prenotazione diretta in evidenza',
            text: 'Il sito mette in primo piano la prenotazione diretta, con condizioni chiare, mentre i portali restano attivi.',
          },
          {
            icon: 'map-pin',
            title: 'Ricerca locale',
            text: 'Mappe, schede e contenuti costruiti per chi cerca una struttura in quel territorio.',
          },
          {
            icon: 'chart',
            title: 'Stagionalità misurata',
            text: 'Sapete quali periodi rendono e quali vanno riempiti, con dati e non a sensazione.',
          },
        ],
        cantine: [
          {
            icon: 'user-plus',
            title: 'Dalla visita al cliente',
            text: 'Chi prenota una degustazione lascia un contatto e può acquistare anche dopo.',
          },
          { icon: 'tag', title: 'Schede che vendono', text: 'Annate, formati e territorio raccontati in modo utile a chi compra.' },
          { icon: 'globe', title: 'Export leggibile', text: 'Versione inglese pensata per importatori e appassionati stranieri.' },
          {
            icon: 'cart',
            title: 'Pronto alla vendita diretta',
            text: 'Struttura già predisposta per e-commerce e club, quando deciderete di attivarli.',
          },
        ],
        frantoi: [
          {
            icon: 'sprout',
            title: 'Ritmo della campagna',
            text: 'Il sito segue molitura, olio nuovo e ordini di fine anno, senza rifacimenti stagionali.',
          },
          {
            icon: 'users',
            title: 'Due pubblici, due percorsi',
            text: 'Privati e professionali trovano prezzi, formati e condizioni diversi senza confusione.',
          },
          {
            icon: 'badge-check',
            title: 'Qualità dimostrabile',
            text: 'Analisi, certificazioni e metodo di lavorazione presentati in modo verificabile.',
          },
          {
            icon: 'search',
            title: 'Ricerche di prodotto',
            text: 'Trovabili da chi cerca olio nuovo, bag-in-box o forniture per ristorazione.',
          },
        ],
      },
    },
    markets: {
      eyebrow: 'Da Perugia, ovunque serva',
      title: 'Made in Italy, leggibile anche fuori.',
      text: "Lavoriamo con aziende che vendono in Italia e all'estero. La versione inglese non è una traduzione automatica: è una versione pensata per chi compra da fuori, con riferimenti, formati e condizioni corretti.",
      cta: { label: 'Parlateci del vostro mercato', href: CONTACT },
      image: agriaImage('servizi/presence'),
    },
    // Prompt 14: sezione prima delle FAQ (solo Digital Presence)
    identity: {
      eyebrow: 'Identità e digital experience',
      title: "L'identità non è il logo. È come vi si riconosce.",
      text: "Curiamo coerenza visiva, tono di voce e qualità dell'esperienza dentro il progetto: tipografia, fotografia, ritmo delle pagine, comportamento delle interazioni. Non vendiamo restyling di marchio a parte: lo trattiamo dove incide sul risultato.",
    },
    faq: [
      {
        q: 'Rifare il sito comporta perdita di posizionamento?',
        a: 'Il rischio si riduce se la migrazione è progettata prima. Mappiamo ogni indirizzo esistente, definiamo cosa mantenere e cosa reindirizzare, e monitoriamo indicizzazione e traffico nelle settimane successive alla pubblicazione.',
      },
      {
        q: 'Il codice e i contenuti restano nostri?',
        a: 'Sì. Repository, contenuti e domini sono di vostra proprietà, con accesso completo anche in caso di cambio fornitore.',
      },
      {
        q: 'Possiamo aggiornare il sito autonomamente?',
        a: 'Le sezioni che cambiano spesso sono modificabili da voi. Consegniamo una guida operativa e una sessione di formazione sulle attività ricorrenti.',
      },
      {
        q: 'Quali sono i tempi di un progetto?',
        a: 'Dipendono da numero di pagine, lingue e integrazioni. Dopo la prima analisi forniamo tempi per fase, con consegne intermedie da approvare.',
      },
      {
        q: "Come usate l'AI sui contenuti?",
        a: 'Per analizzare, strutturare e produrre bozze. Ogni testo pubblicato è rivisto da noi e approvato da voi: nessuna pagina va online senza controllo umano.',
      },
      {
        q: 'Lavorate anche su siti recenti?',
        a: 'Sì, quando il problema è la struttura o la conversione. Se rifarlo non è giustificato, ve lo diciamo e interveniamo solo dove serve.',
      },
    ],
    closing: { title: 'Raccontateci come vi trovano oggi.', text: CLOSING_TEXT, secondary: WRITE },
    articles: [
      { slug: 'siti-web-per-agriturismi' },
      { slug: 'siti-web-per-cantine' },
      { slug: 'seo-locale-agroalimentare-google-maps' },
      { slug: 'storytelling-vino-marketing-vendite' },
    ],
  },

  commerce: {
    key: 'commerce',
    name: 'Digital Commerce',
    meta: {
      title: 'Digital Commerce — e-commerce e vendita diretta per cantine, frantoi e hospitality | Agria System',
      description:
        'E-commerce, prenotazioni, listini B2B e pagamenti integrati con i vostri strumenti: il canale diretto si affianca a quelli che già avete.',
      path: '/servizi/digital-commerce',
    },
    cta: { label: 'Costruiamo il vostro shop', href: CONTACT },
    hero: {
      eyebrow: '02 — Digital Commerce',
      title: 'La vendita diretta come canale stabile accanto agli altri, non come esperimento.',
      lead: 'E-commerce, prenotazioni e listini per cantine, frantoi e strutture ricettive. Incassate senza intermediari, con i flussi collegati agli strumenti che già usate.',
      secondary: METHOD,
      pills: ['E-commerce', 'Prenotazioni', 'Pagamenti', 'Listini B2B', 'Spedizioni', 'Integrazioni', 'IT · EN'],
    },
    diagnosis: {
      title: 'Il margine se ne va prima di arrivare a voi.',
      items: [
        {
          icon: 'coins',
          title: 'Commissioni su ogni vendita',
          text: 'Portali e marketplace portano ordini, ma trattengono una quota e tengono per sé il cliente. Il canale diretto resta marginale.',
        },
        {
          icon: 'pen',
          title: 'Ordini raccolti a mano',
          text: 'Telefono, WhatsApp ed email diventano un lavoro di trascrizione, con errori su formati, quantità e condizioni.',
        },
        {
          icon: 'repeat',
          title: 'Clienti che non tornano',
          text: 'Chi ha già comprato è il contatto più redditizio che avete, ma senza anagrafica e storico non potete richiamarlo.',
        },
      ],
      cta: { label: 'Valutiamo il vostro canale diretto', href: CONTACT },
    },
    build: {
      title: 'Quattro impianti di vendita.',
      items: [
        {
          icon: 'cart',
          title: 'E-commerce di prodotto',
          image: { src: '/images/software/sector-frantoi-hero.jpg', alt: "Olio appena estratto che scende da un beccuccio d'acciaio" },
          text: 'Catalogo, formati e disponibilità costruiti su come vendete davvero.',
          tiles: tiles(['Catalogo', 'formati e confezioni'], ['Pagamenti', 'metodi e sicurezza'], ['Spedizioni', 'corrieri e regole']),
        },
        {
          icon: 'calendar',
          title: 'Prenotazioni ed esperienze',
          image: HOSPITALITY_PHOTO,
          text: 'Camere, degustazioni e visite prenotabili e pagabili dal vostro sito.',
          tiles: tiles(
            ['Calendario', 'capienza e turni'],
            ['Acconti', 'pagamento immediato'],
            ['Promemoria', 'prima di ogni arrivo'],
          ),
        },
        {
          icon: 'list',
          title: 'Listini professionali',
          image: { src: '/images/software/sector-vitivinicolo-hero.jpg', alt: 'Botti di legno allineate in una cantina con volta in mattoni' },
          text: 'Privati, ristorazione e rivenditori nello stesso sistema, con condizioni separate.',
          tiles: tiles(['Prezzi', 'per tipo di cliente'], ['Ordini minimi', 'regole per listino'], ['Accesso riservato', 'area B2B']),
        },
        {
          icon: 'repeat',
          title: 'Riacquisto e fidelizzazione',
          image: { src: '/images/blog/ecommerce-vino-margini-vendita-diretta.jpg', alt: 'Scatole di cartone aperte, pronte per la spedizione' },
          text: 'Chi ha comprato una volta viene richiamato con un motivo, non con uno sconto.',
          tiles: tiles(['Anagrafica', 'storico ordini'], ['Club', 'consegne ricorrenti'], ['Email', 'sequenze post acquisto']),
        },
      ],
    },
    ai: {
      title: ON_EVERY_PROJECT_TITLE,
      text: "Cataloghi, contenuti e controlli passano da strumenti che acceleriamo con l'AI: è un metodo, non un servizio che vendiamo. Le decisioni commerciali restano vostre, la responsabilità tecnica è nostra.",
      items: [
        {
          icon: 'grid',
          title: 'Cataloghi costruiti più in fretta',
          text: 'Schede prodotto, attributi e varianti generati come bozza e rifiniti da noi, anche in inglese.',
        },
        {
          icon: 'search',
          title: 'Ricerca interna costruita sul catalogo',
          text: "Attributi e sinonimi preparati con l'AI insieme alle schede: chi cerca \"olio per ristorante\" o \"rosso da invecchiamento\" trova, invece di uscire dal sito.",
        },
        {
          icon: 'funnel',
          title: "Imbuto d'acquisto misurato",
          text: "Sappiamo dove si interrompe l'acquisto: pagina prodotto, spedizioni o pagamento.",
        },
        {
          icon: 'download',
          title: 'Proprietà e portabilità',
          text: 'Catalogo, clienti e ordini restano dati vostri, esportabili in qualunque momento.',
        },
        {
          icon: 'globe',
          title: 'Schede trovabili',
          text: "Contenuti di prodotto scritti con l'AI e rivisti da noi, perché Google e i motori AI li trovino, anche in inglese.",
        },
      ],
      cta: { label: 'Parliamo del vostro shop', href: CONTACT },
    },
    method: {
      title: 'Dalla vendita di oggi al canale di domani.',
      steps: [
        { title: 'Analisi commerciale', text: 'Come vendete adesso, su quali canali, con quali margini e quali vincoli.' },
        {
          title: 'Catalogo e flussi',
          text: "Struttura del catalogo, regole di prezzo e percorso d'acquisto, prototipati prima dello sviluppo.",
        },
        {
          title: 'Sviluppo e integrazioni',
          text: 'Piattaforma, pagamenti, spedizioni e collegamenti con i sistemi già in uso.',
        },
        {
          title: 'Lancio e ottimizzazione',
          text: 'Pubblicazione, osservazione degli ordini reali e correzioni sui punti di abbandono.',
        },
      ],
    },
    deliverables: {
      title: DELIVERABLES_TITLE,
      intro: 'Un canale di vendita funzionante e le istruzioni per governarlo.',
      items: [
        { text: 'Mappa del catalogo: attributi, varianti, regole di prezzo', category: 'Ricerca' },
        { text: "Percorso d'acquisto prototipato e approvato", category: 'Design' },
        { text: 'Design system del negozio: schede, carrello, checkout', category: 'Design' },
        { text: 'Piano di misurazione degli acquisti e degli abbandoni', category: 'Analytics' },
        { text: 'Configurazione documentata di spedizioni, imposte e adempimenti', category: 'Operazioni' },
        { text: 'Report di collaudo: pagamenti, dispositivi, prestazioni', category: 'Delivery' },
      ],
    },
    verticals: {
      title: 'Ogni settore vende in modo diverso.',
      sectors: {
        hospitality: [
          { icon: 'credit-card', title: 'Prenotazione con acconto', text: 'Il cliente conferma pagando, non promettendo.' },
          { icon: 'ticket', title: 'Esperienze vendute a parte', text: 'Cene, degustazioni e attività si prenotano e si pagano a parte, anche dopo aver prenotato il soggiorno.' },
          { icon: 'file-text', title: 'Condizioni chiare', text: 'Cancellazioni e politiche scritte una volta, applicate sempre.' },
          {
            icon: 'arrow-in',
            title: 'Diretto e portali insieme',
            text: 'Il sito raccoglie le prenotazioni dirette, mentre le OTA restano attive per la visibilità.',
          },
        ],
        cantine: [
          {
            icon: 'truck',
            title: 'Spedizioni e adempimenti',
            text: 'Formati, corrieri e regole del settore gestiti dentro il flusso.',
          },
          {
            icon: 'calendar',
            title: 'Degustazioni prenotabili',
            text: 'La visita si prenota e si paga online, con capienza sotto controllo.',
          },
          { icon: 'repeat', title: 'Club e consegne ricorrenti', text: 'Abbonamenti e spedizioni programmate per chi compra già da voi.' },
          { icon: 'globe', title: 'Estero', text: "Listini, lingue e condizioni per vendere fuori dall'Italia." },
        ],
        frantoi: [
          {
            icon: 'list',
            title: 'Listini separati',
            text: 'Privati, ristorazione e rivenditori con prezzi e minimi diversi.',
          },
          {
            icon: 'package',
            title: 'Formati completi',
            text: 'Bottiglie, latte e bag-in-box con logiche di prezzo corrette.',
          },
          { icon: 'clock', title: 'Campagna e preordini', text: "L'olio nuovo si prenota prima che esca." },
          { icon: 'repeat', title: 'Ordini ricorrenti', text: 'I clienti professionali riordinano in pochi clic.' },
        ],
      },
    },
    markets: {
      eyebrow: 'Oltre il territorio',
      title: "Vendere fuori dall'Italia, senza improvvisare.",
      text: "Formati, lingue, costi di spedizione e condizioni cambiano da mercato a mercato. Progettiamo il negozio perché l'estero sia una possibilità concreta, non una promessa.",
      cta: { label: 'Parlateci dei vostri mercati', href: CONTACT },
      image: agriaImage('servizi/commerce'),
    },
    faq: [
      {
        q: 'Conviene una piattaforma pronta o un progetto costruito su richiesta?',
        a: 'Spesso conviene la piattaforma pronta: con un catalogo semplice e volumi contenuti è la risposta corretta, e lavoriamo anche su Shopify quando è la scelta giusta. Un progetto costruito su richiesta ha senso quando listini per tipo di cliente, preordini o integrazioni richiedono regole che la piattaforma scelta non gestisce. Decidiamo sui vostri casi reali, e vi spieghiamo perché.',
      },
      {
        q: 'Gestite anche spedizioni e adempimenti?',
        a: 'Configuriamo corrieri, costi e regole dentro il negozio. Le pratiche restano vostre o del vostro consulente, ma il sistema le rispetta.',
      },
      {
        q: 'Possiamo collegare il gestionale che usiamo?',
        a: "Se espone un'interfaccia o un export, quasi sempre sì. Lo verifichiamo prima di proporlo.",
      },
      {
        q: 'Abbiamo già un e-commerce: perdiamo posizionamento se lo rifate?',
        a: 'Il rischio si riduce se la migrazione è progettata prima: indirizzi prodotto mappati uno a uno e monitoraggio dopo la pubblicazione.',
      },
      {
        q: 'Chi gestisce gli ordini dopo il lancio?',
        a: 'Voi. Prepariamo procedure e formazione, e restiamo disponibili per evoluzioni e correzioni.',
      },
      {
        q: 'Vendiamo anche in negozio: si può unire?',
        a: 'Dove gli strumenti lo permettono, colleghiamo disponibilità e anagrafiche per evitare doppie realtà.',
      },
    ],
    closing: { title: 'Raccontateci come vendete oggi.', text: CLOSING_TEXT, secondary: WRITE },
    articles: [
      { slug: 'ecommerce-per-frantoi' },
      { slug: 'agriturismo-booking-online-prenotazioni' },
      { slug: 'ecommerce-vino-margini-vendita-diretta' },
      { slug: 'gestione-fiscale-ecommerce-vino-iva-fatturazione' },
      { slug: 'vendita-internazionale-vino-dtc-export-estero' },
    ],
  },

  automation: {
    key: 'automation',
    name: 'Digital Automation',
    meta: {
      title: 'Digital Automation — automazioni e AI per hospitality, cantine e frantoi | Agria System',
      description:
        "Automazioni e integrazioni API tra gli strumenti che già usate, con l'AI dove i dati la reggono, per ridurre il lavoro manuale e tenere coerenti i dati.",
      path: '/servizi/digital-automation',
    },
    cta: { label: 'Automatizziamo un processo', href: CONTACT },
    hero: {
      eyebrow: '03 — Digital Automation',
      title: 'Il lavoro ripetitivo esce dalla vostra giornata.',
      lead: "Automazioni e integrazioni nei processi di strutture ricettive, cantine e frantoi, con l'AI come componente dove ha senso e i dati la reggono. Dove i sistemi lo permettono, i dati entrano una volta e arrivano dove servono.",
      secondary: METHOD,
      pills: ['Integrazioni API', 'Automazioni', 'AI sui processi', 'Sincronizzazione', 'Notifiche', 'Report'],
    },
    diagnosis: {
      title: 'Il costo invisibile che pagate ogni giorno.',
      items: [
        {
          icon: 'copy',
          title: 'Dati riscritti a mano',
          text: 'Le stesse informazioni vengono copiate tra portali, email, fogli di lavoro e gestionale. Ogni passaggio è tempo e possibilità di errore.',
        },
        {
          icon: 'inbox',
          title: 'Richieste che si perdono',
          text: 'Messaggi, moduli e telefonate arrivano su canali diversi. Qualcosa resta senza risposta, e non lo scoprite subito.',
        },
        {
          icon: 'chart',
          title: 'Nessun quadro settimanale',
          text: 'Per sapere come sta andando bisogna costruire il dato a mano, quindi non si fa quasi mai.',
        },
      ],
      cta: { label: 'Mappiamo un vostro processo', href: CONTACT },
    },
    build: {
      title: 'Quattro automazioni che cambiano la settimana.',
      items: [
        {
          icon: 'inbox',
          title: 'Richieste in un unico flusso',
          image: { src: '/images/blog/pos-cassa-cantina-vendita-degustazione.jpg', alt: 'Mani su una cassa con schermo tattile e uno scontrino' },
          text: 'Moduli, email, telefono e portali confluiscono in un solo ingresso tracciato.',
          tiles: tiles(
            ['Ingresso', 'un solo punto'],
            ['Assegnazione', 'chi risponde'],
            ['Tracciamento', 'ogni richiesta registrata'],
          ),
        },
        {
          icon: 'link',
          title: 'Dati sincronizzati',
          image: { src: '/images/blog/pos-cassa-cantina-vendita-degustazione.jpg', alt: 'Mani su una cassa con schermo tattile e uno scontrino' },
          text: 'Anagrafiche, ordini e disponibilità allineati tra gli strumenti che usate.',
          tiles: tiles(['Anagrafica', 'una sola versione'], ['Ordini', 'stato aggiornato'], ['Disponibilità', 'allineata tra gli strumenti']),
        },
        {
          icon: 'file-text',
          title: 'Documenti trattati in automatico',
          image: { src: '/images/blog/bandi-incentivi-digitalizzazione-agroalimentare.jpg', alt: 'Persona che legge documenti stampati a una scrivania' },
          text: 'Fatture, ordini e allegati classificati ed estratti senza inserimento manuale.',
          tiles: tiles(['Classificazione', 'per tipo'], ['Estrazione', 'dati chiave'], ['Archivio', 'ricercabile']),
        },
        {
          icon: 'chart',
          title: 'Report ricorrenti',
          image: { src: '/images/blog/bandi-incentivi-digitalizzazione-agroalimentare.jpg', alt: 'Persona che legge documenti stampati a una scrivania' },
          text: 'Lo stesso quadro ogni settimana, senza costruirlo.',
          tiles: tiles(['Occupazione', 'e andamento'], ['Costi', 'per voce'], ['Anomalie', 'segnalate']),
        },
      ],
    },
    ai: {
      title: AI_IN_PROCESS_TITLE,
      text: "È diversa dall'AI con cui lavoriamo su ogni progetto: questa entra nei vostri processi, solo dove produce un risultato misurabile (capire, classificare, estrarre) e dove i dati la reggono. Mai dove serve una decisione che deve restare umana.",
      items: [
        {
          icon: 'sort',
          title: 'Classificazione e smistamento',
          text: 'Richieste e documenti riconosciuti e indirizzati alla persona giusta.',
        },
        { icon: 'chat', title: 'Risposte assistite', text: 'Bozze pronte per le domande ricorrenti, riviste da chi risponde.' },
        {
          icon: 'file-text',
          title: 'Estrazione dati',
          text: 'Numeri e informazioni prese da documenti e messaggi, senza trascrizione.',
        },
        {
          icon: 'user-check',
          title: 'Controllo umano',
          text: 'Nessuna automazione decide al posto vostro. Le regole sono vostre, e restano modificabili.',
        },
      ],
      cta: { label: 'Parliamo dei vostri processi', href: CONTACT },
    },
    method: {
      title: 'Prima si misura, poi si automatizza.',
      steps: [
        {
          title: 'Mappatura',
          text: "Seguiamo un processo dall'inizio alla fine e contiamo i passaggi manuali e i punti di rottura.",
        },
        { title: 'Progetto', text: 'Definiamo cosa automatizzare, cosa resta umano e cosa va semplicemente eliminato.' },
        {
          title: 'Implementazione',
          text: 'Integrazioni e regole costruite in modo incrementale, con verifica a ogni passo.',
        },
        {
          title: 'Verifica',
          text: 'Controlliamo il comportamento sui casi reali, compresi quelli anomali, prima di estendere.',
        },
      ],
    },
    deliverables: {
      title: DELIVERABLES_TITLE,
      intro: 'Processi più corti e la documentazione per capirli, modificarli e affidarli a qualcun altro.',
      items: [
        { text: "Mappa del processo, prima e dopo l'intervento", category: 'Ricerca' },
        { text: 'Schema delle integrazioni e dei flussi di dati', category: 'Architettura' },
        { text: 'Regole e automazioni documentate, modificabili da voi', category: 'Delivery' },
        { text: 'Gestione degli errori: cosa succede quando qualcosa non funziona', category: 'Affidabilità' },
        { text: 'Formazione al team sulle operazioni ricorrenti', category: 'Delivery' },
        { text: 'Report di collaudo sui casi reali, anche anomali', category: 'Delivery' },
        { text: 'Registro delle automazioni attive, con responsabile e frequenza', category: 'Delivery' },
      ],
    },
    verticals: {
      title: 'Processi diversi, stesso principio.',
      sectors: {
        hospitality: [
          {
            icon: 'inbox',
            title: 'Prenotazioni unificate',
            text: 'Portali, email e telefono confluiscono in un unico flusso senza doppi inserimenti.',
          },
          {
            icon: 'mail',
            title: 'Comunicazioni automatiche',
            text: 'Pre e post soggiorno, con il vostro tono e i vostri tempi.',
          },
          {
            icon: 'users',
            title: 'Turni e carichi',
            text: "Il personale programmato coerente con l'occupazione prevista.",
          },
          {
            icon: 'coins',
            title: 'Costi sotto controllo',
            text: 'Fornitori e acquisti visibili prima della chiusura del mese.',
          },
        ],
        cantine: [
          {
            icon: 'user-plus',
            title: 'Contatti dalle degustazioni',
            text: 'Chi visita entra in anagrafica e può essere richiamato.',
          },
          { icon: 'truck', title: 'Ordini e spedizioni', text: 'Stato aggiornato senza rincorrere il corriere.' },
          { icon: 'file-text', title: 'Documenti', text: 'Fatture e bolle classificate e archiviate in automatico.' },
          {
            icon: 'bell',
            title: 'Comunicazione ai clienti',
            text: 'Nuove annate e disponibilità comunicate a chi è davvero interessato.',
          },
        ],
        frantoi: [
          { icon: 'inbox', title: 'Ordini da più canali', text: 'Telefono, WhatsApp ed email raccolti in un unico ingresso.' },
          { icon: 'calendar', title: 'Campagna', text: 'Prenotazioni di molitura gestite senza agenda cartacea.' },
          {
            icon: 'tag',
            title: 'Listini applicati',
            text: 'Ogni cliente vede e paga il prezzo corretto, senza controlli manuali.',
          },
          {
            icon: 'bell',
            title: 'Riordini',
            text: 'I clienti professionali ricevono un promemoria al momento giusto.',
          },
        ],
      },
    },
    markets: {
      eyebrow: 'Lavoro quotidiano',
      title: 'Automatizzare non significa spersonalizzare.',
      text: 'Il rapporto con il cliente resta vostro. Togliamo il lavoro che non aggiunge valore, così resta tempo per quello che ne aggiunge davvero.',
      cta: { label: 'Raccontateci una giornata tipo', href: CONTACT },
      image: agriaImage('servizi/automation'),
    },
    faq: [
      {
        q: 'Dobbiamo cambiare gestionale?',
        a: 'No. Lavoriamo sopra gli strumenti che avete: li colleghiamo, non li sostituiamo.',
      },
      {
        q: "E se l'automazione sbaglia?",
        a: 'Ogni flusso ha una gestione degli errori e un percorso di ricaduta manuale. Le eccezioni vi vengono segnalate, non nascoste.',
      },
      {
        q: 'Funziona con il nostro PMS o con il nostro software?',
        a: "Se espone un'interfaccia o consente esportazioni, quasi sempre sì. Lo verifichiamo prima di proporre qualcosa.",
      },
      {
        q: 'I dati restano nostri?',
        a: 'Sì, e restano dove sono. Le automazioni li fanno circolare, non li portano via.',
      },
      {
        q: 'Quanto tempo serve per vedere un risultato?',
        a: "Il primo processo automatizzato è in genere il più corto: si parte da lì proprio per misurare l'effetto prima di estendere.",
      },
      {
        q: 'Sviluppate gestionali, CRM, ERP o PMS su commessa?',
        a: 'No. Non costruiamo gestionali, CRM, ERP o PMS: lavoriamo sopra gli strumenti che già usate, con automazioni e collegamenti tra quelli esistenti.',
      },
    ],
    closing: { title: 'Raccontateci una vostra giornata.', text: CLOSING_TEXT, secondary: WRITE },
    articles: [
      { slug: 'software-per-agriturismi' },
      { slug: 'software-per-cantine' },
      { slug: 'chatbot-cantina-ai-customer-service' },
    ],
  },
};
