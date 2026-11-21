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
  // Prompt 29, Fase A: struttura nuova in otto sezioni (components/agria/service/ServicePage.jsx).
  // Titoli bicolore: { text, accent } come nella homepage.
  presence: {
    key: 'presence',
    name: 'Digital Presence',
    meta: {
      title: 'Digital Presence — siti per agriturismi, hotel, cantine e frantoi | Agria System',
      description:
        'Siti nuovi o rifatti per agriturismi, hotel, cantine e frantoi: veloci, in italiano e inglese, con la prenotazione in primo piano e collegati ai programmi che usate già.',
      path: '/servizi/digital-presence',
    },
    // etichette delle sezioni (la chiusura resta senza, come in home)
    labels: {
      problems: '( COSA VI COSTA )',
      screens: "( COM'È FATTO )",
      build: '( COSA COSTRUIAMO )',
      sectors: '( PER IL VOSTRO MESTIERE )',
      method: '( DALLA RICHIESTA ALLA CONSEGNA )',
      faq: '( DOMANDE FREQUENTI )',
    },
    cta: { label: 'Richiedete la prima analisi →', href: CONTACT },
    // 1. Apertura
    hero: {
      eyebrow: '( 01 · DIGITAL PRESENCE )',
      title: { text: 'Il sito che porta clienti,', accent: 'non quello che fa bella figura.' },
      lead: 'Un sito nuovo, o quello che avete rifatto come si deve: veloce, in italiano e in inglese, facile da trovare su Google e da chi chiede consiglio agli assistenti AI. E con la prenotazione o la richiesta in primo piano, non nascosta in fondo.',
      secondary: { label: 'Guardate come lavoriamo', href: '#come-lavoriamo' },
      pills: ['Sito nuovo o rifatto', 'Italiano e inglese', 'Google e assistenti AI', 'Prenotazione diretta', 'Velocità'],
    },
    // 2. Tre problemi
    diagnosis: {
      title: { text: 'Tre cose che costano', accent: 'più di un sito nuovo.' },
      items: [
        {
          title: 'Vi trovano i portali, non voi',
          text: 'Chi cerca una struttura nel vostro territorio finisce su Booking o su un portale di settore. La prenotazione arriva lo stesso, ma con la commissione sopra.',
        },
        {
          title: 'Chi arriva non prenota',
          text: 'Il sito racconta bene chi siete, poi chi vorrebbe prenotare non trova disponibilità, prezzi o un pulsante: scrive una email, o lascia perdere.',
        },
        {
          title: 'Ogni richiesta diventa una telefonata',
          text: 'Rispondete uno per uno alle stesse domande, e di quelle conversazioni non resta niente: né un contatto, né un numero.',
        },
      ],
      cta: { label: "Richiedete un'analisi del vostro sito →", href: CONTACT },
    },
    // 3. La schermata (components/agria/service/screens/BookingScreen.jsx).
    // mock: i testi del sito inventato, solo scenografia (nome verificato: nessuna
    // azienda reale con questo nome, Prompt 29).
    screens: [
      {
        key: 'prenotazione',
        kind: 'booking',
        title: "Com'è fatto un sito che prenota.",
        captions: [
          'Il cliente sceglie camera e date da solo, anche alle undici di sera.',
          "Italiano e inglese: chi arriva dall'estero prenota nella sua lingua.",
          'Vi trova su Google, e anche quando chiede consiglio a ChatGPT.',
        ],
        mock: {
          url: 'orvenna.example',
          brand: 'Orvenna',
          kind: 'Agriturismo',
          nav: ['Camere', 'Esperienze', 'Ristorante'],
          book: 'Prenota',
          eyebrow: 'Agriturismo in collina',
          headline: ['Camere tra gli ulivi,', 'a mezz’ora dal lago.'],
          sub: 'Sei camere, piscina e cene con quello che cresce nell’orto.',
          rooms: [
            { name: 'Camera Ulivo', note: '2 persone · vista valle', state: '2 notti libere' },
            { name: 'Suite Fienile', note: '4 persone · terrazza', state: 'libera dal 12' },
          ],
          bar: [
            { label: 'Camera', value: 'Camera Ulivo · 2 persone' },
            { label: 'Arrivo', value: 'Venerdì 12' },
            { label: 'Partenza', value: 'Domenica 14' },
          ],
          phone: {
            time: '23:04',
            title: 'Book your stay',
            fields: [
              { label: 'Room', value: 'Olive room · 2 guests' },
              { label: 'Check-in', value: 'Fri 12' },
              { label: 'Check-out', value: 'Sun 14', active: true },
            ],
            total: { label: '2 nights', value: '€ 240' },
            button: 'Book now',
          },
          search: {
            query: 'agriturismo con piscina vicino al lago',
            title: 'Casale Orvenna · Agriturismo',
            text: 'Camere tra gli ulivi · prenotazione online',
          },
        },
      },
    ],
    // 4. Cosa costruiamo (icon: per i blocchi dell'indice /servizi)
    build: {
      title: { text: 'Quattro cose,', accent: 'in ogni progetto.' },
      items: [
        {
          icon: 'layout',
          title: 'Il sito',
          text: 'Struttura, testi e immagini costruiti su come lavorate: camere, prodotti, esperienze, con la prenotazione o la richiesta sempre a portata di mano.',
        },
        {
          icon: 'globe',
          title: 'Italiano e inglese',
          text: "Due versioni vere, non una traduzione automatica: prezzi, condizioni e riferimenti giusti per chi compra dall'estero.",
        },
        {
          icon: 'search',
          title: 'Trovabile',
          text: 'Pagine costruite sulle domande che la gente scrive davvero, e dati organizzati perché Google e gli assistenti AI vi citino con le informazioni corrette.',
        },
        {
          icon: 'zap',
          title: 'Veloce',
          text: 'Un sito che si apre in un secondo anche dal telefono, in mezzo a una vigna con una tacca di segnale.',
        },
      ],
    },
    // 5. Per il vostro mestiere
    sectors: {
      title: { text: 'Progettato per', accent: 'quello che fate voi.' },
      items: [
        {
          key: 'hospitality',
          title: 'Agriturismi, hotel e strutture ricettive',
          points: [
            'Disponibilità vera, aggiornata: chi guarda vede cosa c\'è libero, non "scriveteci".',
            'Prenotazione diretta in primo piano, mentre i portali restano attivi.',
            'Esperienze, cene e degustazioni prenotabili a parte.',
            'Mappe e schede costruite per chi cerca una struttura in quella zona.',
          ],
        },
        {
          key: 'cantine',
          title: 'Nel settore vitivinicolo',
          points: [
            'Etichette, annate e formati raccontati in modo utile a chi compra.',
            'Degustazioni e visite prenotabili dal sito, con il contatto che resta vostro.',
            'Versione inglese pensata per importatori e appassionati stranieri.',
            'Struttura già pronta per la vendita online, quando deciderete di attivarla.',
          ],
        },
        {
          key: 'frantoi',
          title: 'Frantoi e aziende olivicole',
          points: [
            'Il sito segue la campagna: molitura, olio nuovo, ordini di fine anno.',
            'Privati e ristoratori trovano prezzi e formati diversi senza confondersi.',
            'Analisi e certificazioni presentate in modo verificabile.',
            'Trovabili da chi cerca olio nuovo, bag-in-box o forniture per la ristorazione.',
          ],
        },
      ],
    },
    // 6. Come lavoriamo: i quattro passi della homepage (method in content/agria/home.js)
    // 7. Domande frequenti
    faq: [
      {
        q: 'Rifare il sito ci fa perdere posizioni su Google?',
        a: 'Non se il trasloco è preparato prima. Prendiamo ogni indirizzo del sito vecchio, decidiamo cosa tenere e cosa far puntare altrove, e controlliamo le visite nelle settimane dopo la pubblicazione.',
      },
      {
        q: 'Il sito resta nostro?',
        a: 'Sì. Codice, contenuti, dominio e accessi sono vostri, anche se un giorno cambiate fornitore.',
      },
      {
        q: 'Possiamo aggiornarlo da soli?',
        a: 'Le parti che cambiano spesso sì: prezzi, periodi, foto, articoli. Vi lasciamo una guida e vi facciamo vedere come si fa.',
      },
      {
        q: 'Quanto tempo ci vuole?',
        a: 'Dipende da quante pagine e quante lingue. Dopo la prima analisi avete i tempi per fase, con consegne intermedie da approvare.',
      },
      {
        q: 'Il nostro sito è recente: lo rifate comunque?',
        a: 'Solo se serve. Se il problema è la struttura o il fatto che non porta richieste, interveniamo lì. Se rifarlo non ha senso, ve lo diciamo.',
      },
      {
        q: "Usate l'AI per scrivere i testi?",
        a: 'La usiamo per preparare le bozze e per i controlli. Ogni testo che va online è riletto da noi e approvato da voi.',
      },
    ],
    // 8. Chiusura (il secondo pulsante usa il link di QUICK_CONTACT.whatsapp)
    closing: {
      title: { text: 'Raccontateci', accent: 'come vi trovano oggi.' },
      text: 'Vi prepariamo una prima analisi del vostro sito e ve la mostriamo: cosa funziona, cosa vi fa perdere richieste, da dove conviene partire.',
      secondary: { label: 'Scriveteci su WhatsApp' },
    },
    articles: [
      { slug: 'siti-web-per-agriturismi' },
      { slug: 'siti-web-per-cantine' },
      { slug: 'seo-locale-agroalimentare-google-maps' },
      { slug: 'storytelling-vino-marketing-vendite' },
    ],
    // Verticali della pagina area di prima del Prompt 29: non li usa più la pagina
    // Digital Presence (ora sectors), solo le pagine /settori (content/agria/settori.js),
    // che non sono nel Prompt 29. Testi invariati.
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
    // foto del blocco Digital Presence nell'indice /servizi (la pagina area non ha più fotografie)
    indexImage: agriaImage('servizi/presence'),
  },
  // Prompt 29, Fase B: struttura nuova in otto sezioni (components/agria/service/ServicePage.jsx).
  commerce: {
    key: 'commerce',
    name: 'Digital Commerce',
    meta: {
      title: 'Digital Commerce — shop e prenotazioni dirette per agriturismi, hotel, cantine e frantoi | Agria System',
      description:
        'Shop, prenotazioni, buoni regalo e listini per i professionisti, per agriturismi, hotel, cantine e frantoi: pagamento online, ordini già registrati e il cliente che resta vostro.',
      path: '/servizi/digital-commerce',
    },
    labels: {
      problems: '( COSA VI COSTA )',
      screens: "( COM'È FATTO )",
      build: '( COSA COSTRUIAMO )',
      sectors: '( PER IL VOSTRO MESTIERE )',
      method: '( DALLA RICHIESTA ALLA CONSEGNA )',
      faq: '( DOMANDE FREQUENTI )',
    },
    cta: { label: 'Richiedete la prima analisi →', href: CONTACT },
    // 1. Apertura
    hero: {
      eyebrow: '( 02 · DIGITAL COMMERCE )',
      title: { text: 'Vendete voi,', accent: 'senza passare da nessuno.' },
      lead: "Shop, prenotazioni, buoni regalo e listini per i professionisti, con il pagamento online. L'ordine arriva già registrato, il cliente resta vostro, e la commissione non la paga nessuno.",
      secondary: { label: 'Guardate come lavoriamo', href: '#come-lavoriamo' },
      pills: ['Shop', 'Prenotazioni', 'Buoni regalo', 'Listini per professionisti', 'Pagamento online', 'Spedizioni'],
    },
    // 2. Tre problemi
    diagnosis: {
      title: { text: 'Il margine se ne va', accent: 'prima di arrivare a voi.' },
      items: [
        {
          title: 'Una commissione su ogni vendita',
          text: 'I portali portano ordini, ma trattengono una quota e si tengono il cliente. Quando quel cliente torna, torna da loro.',
        },
        {
          title: 'Ordini raccolti a mano',
          text: 'Telefono, WhatsApp ed email: ogni ordine va riscritto da qualche parte, e prima o poi uno sbaglia formato, quantità o prezzo.',
        },
        {
          title: 'Chi ha già comprato non torna',
          text: 'È il cliente che costa meno riconquistare, ma senza un elenco e uno storico non sapete nemmeno chi è.',
        },
      ],
      cta: { label: 'Valutiamo il vostro canale diretto →', href: CONTACT },
    },
    // 3. Le schermate (brochure, pagine 4 e 5), una sotto l'altra. mock: il sito
    // di una cantina inventata, solo scenografia (nome senza riscontri, Prompt 29).
    screensTitle: { text: "Com'è fatto", accent: 'un negozio che vende da solo.' },
    screens: [
      {
        key: 'shop',
        kind: 'shop',
        label: 'Lo shop',
        captions: [
          'I vostri prodotti in vendita giorno e notte, con spedizione o ritiro in struttura.',
          'Lo shop lo creiamo da zero, oppure miglioriamo quello che avete già.',
          'Ordini, pagamenti e magazzino si aggiornano da soli.',
        ],
        mock: {
          url: 'calvena.example/shop',
          brand: 'Calvena',
          kind: 'Tenuta',
          nav: ['Vini', 'Shop', 'Buoni regalo'],
          active: 'Shop',
          cart: 'Carrello · 2',
          categoriesLabel: 'Categorie',
          categories: ['Tutti i vini', 'Rossi', 'Bianchi', 'Rosati', 'Olio', 'Idee regalo'],
          products: [
            { name: 'Rosso di collina 2022', price: '€ 14', kind: 'rosso' },
            { name: 'Bianco del poggio 2024', price: '€ 12', kind: 'bianco' },
            { name: 'Rosato 2024', price: '€ 11', kind: 'rosato' },
            { name: 'Riserva 2020', price: '€ 28', kind: 'rosso' },
            { name: 'Olio nuovo · 0,5 l', price: '€ 16', kind: 'olio' },
            { name: 'Cassetta da sei', price: '€ 72', kind: 'cassetta' },
          ],
          phone: {
            time: '22:18',
            title: 'Come lo ricevete?',
            options: ['Spedizione a casa', 'Ritiro in cantina'],
            active: 'Ritiro in cantina',
            items: [
              ['Rosso di collina', '€ 14'],
              ['Olio nuovo', '€ 16'],
            ],
            total: ['Totale', '€ 30'],
            button: 'Paga e conferma',
          },
          notice: {
            title: 'Magazzino aggiornato',
            lines: ['Rosso di collina 2022 · una bottiglia in meno', 'Ordine registrato · da preparare'],
          },
        },
      },
      {
        key: 'buoni',
        kind: 'gift',
        label: 'I buoni regalo e i pacchetti',
        captions: [
          'Buoni regalo pagati online, pronti da stampare o da inviare.',
          'Pacchetti ed esperienze vendute direttamente da voi.',
          "L'ordine arriva già registrato, pronto da preparare.",
        ],
        mock: {
          url: 'calvena.example/buoni-regalo',
          brand: 'Calvena',
          kind: 'Tenuta',
          nav: ['Vini', 'Visite', 'Buoni regalo'],
          active: 'Buoni regalo',
          cart: 'Carrello · 3',
          card: { label: 'Buono regalo', for: 'Per', name: 'Martina', item: 'Degustazione per due', price: '€ 60' },
          message: '«Buon compleanno! Un pomeriggio tra le vigne.» · da Luca',
          send: ['Invia per email', 'Da stampare'],
          packagesLabel: 'Visite e degustazioni',
          package: {
            title: 'Visita e pranzo in cantina',
            text: 'Giro delle vigne, quattro vini in degustazione e pranzo · 3 ore',
            price: '€ 85',
            add: 'Aggiungi',
          },
          cartBox: {
            title: 'Il vostro carrello',
            items: [
              ['Buono regalo · Martina', '€ 60'],
              ['Visita e pranzo in cantina', '€ 85'],
              ['Rosso di collina 2022', '€ 14'],
            ],
            total: ['Totale', '€ 159'],
            button: 'Paga ora',
          },
          productsLabel: 'I vini della tenuta',
          products: [
            { name: 'Rosso di collina 2022', price: '€ 14', kind: 'rosso' },
            { name: 'Bianco del poggio 2024', price: '€ 12', kind: 'bianco' },
            { name: 'Olio nuovo · 0,5 l', price: '€ 16', kind: 'olio' },
          ],
          notice: {
            title: 'Nuovo ordine · n. 0148',
            meta: 'Pagato · 00:12',
            text: 'Buono per Martina, visita e pranzo, una bottiglia',
            badge: 'Da preparare',
          },
        },
      },
    ],
    // 4. Cosa costruiamo (icon: per i blocchi dell'indice /servizi)
    build: {
      title: { text: 'Quattro modi di vendere,', accent: "uno accanto all'altro." },
      items: [
        {
          icon: 'cart',
          title: 'Lo shop',
          text: 'Catalogo, formati e confezioni come li vendete davvero, con pagamento sicuro e spedizioni già impostate.',
        },
        {
          icon: 'calendar',
          title: 'Prenotazioni ed esperienze',
          text: 'Camere, degustazioni, visite e cene prenotabili con acconto: chi conferma paga, non promette.',
        },
        {
          icon: 'ticket',
          title: 'Buoni regalo e pacchetti',
          text: 'Si comprano a qualunque ora, arrivano per email o si stampano, e valgono quello che decidete voi.',
        },
        {
          icon: 'tag',
          title: 'Listini per i professionisti',
          text: 'Ristoranti, enoteche e rivenditori entrano e vedono i loro prezzi, con ordini ricorrenti in pochi clic.',
        },
      ],
    },
    // 5. Per il vostro mestiere
    sectors: {
      title: { text: 'Ogni settore', accent: 'vende in modo diverso.' },
      items: [
        {
          key: 'hospitality',
          title: 'Agriturismi, hotel e strutture ricettive',
          points: [
            'Prenotazione con acconto: chi conferma paga.',
            'Esperienze vendute a parte, anche dopo aver prenotato il soggiorno.',
            'Buoni regalo per un soggiorno o una cena, comprati da chi li regala.',
            'Condizioni di cancellazione scritte una volta e applicate sempre.',
          ],
        },
        {
          key: 'cantine',
          title: 'Nel settore vitivinicolo',
          points: [
            'Vendita diretta delle bottiglie, con spedizioni e adempimenti in regola.',
            'Degustazioni prenotabili, con il contatto che resta a voi.',
            'Club del vino e consegne ricorrenti per chi compra già da voi.',
            "Listini, lingue e condizioni per vendere fuori dall'Italia.",
          ],
        },
        {
          key: 'frantoi',
          title: 'Frantoi e aziende olivicole',
          points: [
            'Listini separati per privati, ristorazione e rivenditori.',
            'Tutti i formati: bottiglie, latte, bag-in-box.',
            'Olio nuovo prenotabile prima che esca.',
            'I clienti abituali riordinano in pochi clic.',
          ],
        },
      ],
    },
    // 6. Come lavoriamo: i quattro passi della homepage (method in content/agria/home.js)
    // 7. Domande frequenti
    faq: [
      {
        q: 'Dobbiamo lasciare i portali?',
        a: 'No, e non ve lo consigliamo. I portali continuano a portare clienti nuovi; il canale diretto serve a non pagare la commissione su chi vi avrebbe scelto comunque.',
      },
      {
        q: 'Dove finiscono gli ordini?',
        a: 'Nel vostro gestionale, se si può collegare, altrimenti in un pannello che vi consegniamo. In ogni caso in un posto solo, già scritti.',
      },
      {
        q: 'I soldi passano da voi?',
        a: 'Mai. I pagamenti vanno direttamente sul vostro conto, tramite il servizio che scegliete: noi colleghiamo e basta.',
      },
      {
        q: 'Chi carica i prodotti?',
        a: 'All\'inizio li carichiamo noi insieme a voi. Dopo li gestite da soli: aggiungere un prodotto o cambiare un prezzo si fa in un minuto.',
      },
      {
        q: 'E le spedizioni?',
        a: 'Impostiamo zone, costi e corriere come lavorate già. Se spedite vino o olio ci sono regole precise: le teniamo in conto.',
      },
      {
        q: 'Quanto costa?',
        a: 'Dipende da quanti prodotti e quali collegamenti servono. Dopo la prima analisi avete un progetto scritto con i costi voce per voce, e si firma solo dopo.',
      },
    ],
    // 8. Chiusura (il secondo pulsante usa il link di QUICK_CONTACT.whatsapp)
    closing: {
      title: { text: 'Raccontateci', accent: 'come vendete oggi.' },
      text: 'Vi prepariamo una prima analisi e ve la mostriamo: dove se ne va il margine, cosa potete vendere direttamente, da dove conviene partire.',
      secondary: { label: 'Scriveteci su WhatsApp' },
    },
    articles: [
      { slug: 'ecommerce-per-frantoi' },
      { slug: 'agriturismo-booking-online-prenotazioni' },
      { slug: 'ecommerce-vino-margini-vendita-diretta' },
      { slug: 'gestione-fiscale-ecommerce-vino-iva-fatturazione' },
      { slug: 'vendita-internazionale-vino-dtc-export-estero' },
    ],
    // foto del blocco Digital Commerce nell'indice /servizi (la pagina area non ha più fotografie)
    indexImage: agriaImage('servizi/commerce'),
    // Verticali della pagina area di prima del Prompt 29: li usano solo le pagine
    // /settori (content/agria/settori.js), che non sono nel Prompt 29. Testi invariati.
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
