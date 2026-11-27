// =====================================================================
//  PAGINE AREA AGRIA — copy approvato (Prompt 29: otto sezioni, uguali per
//  le tre aree). Modificare qui i testi, non nei componenti. Nessun testo va
//  aggiunto senza approvazione. Template: components/agria/service/ServicePage.jsx
//  icon: nome di un'icona del set (components/agria/icons/Icon.jsx).
//  Titoli bicolore: { text, accent } come nella homepage.
// =====================================================================

import { agriaImage } from '@/lib/agria-images';
import { assistantDemo } from './home';

const CONTACT = '/contatti';
// testi di prima del Prompt 29 che le pagine /soluzioni riprendono da Digital
// Automation (automation.solutions)
const WRITE = { label: 'Scriveteci in due righe', href: CONTACT };
const CLOSING_TEXT =
  'Una prima analisi serve a capire se ha senso lavorare insieme. Rispondiamo con una valutazione concreta, non con un preventivo generico.';

export const SECTOR_LABELS = { hospitality: 'Hospitality', cantine: 'Cantine', frantoi: 'Frantoi' };

export const serviceAreas = {
  // Prompt 29, Fase A: struttura nuova in otto sezioni (components/agria/service/ServicePage.jsx).
  // Titoli bicolore: { text, accent } come nella homepage.
  presence: {
    key: 'presence',
    name: 'Digital Presence',
    meta: {
      title: 'Realizzazione siti web per hotel, agriturismi, B&B, cantine, frantoi e aziende agricole',
      description:
        'Realizzazione siti web per hotel, agriturismi, B&B, cantine e frantoi: veloci, in più lingue, ottimizzati per Google e collegati a prenotazioni e vendita.',
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
      title: { text: 'Realizzazione siti web', accent: 'per hotel, agriturismi, cantine e frantoi.' },
      subtitle: 'Il sito che porta clienti, non quello che fa bella figura.',
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
          text: 'Il sito racconta bene chi siete, poi chi vorrebbe prenotare non trova disponibilità, prezzi o un pulsante: scrive un\'email, o lascia perdere.',
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
          headline: ['Camere tra gli ulivi,', 'a mezz\'ora dal lago.'],
          sub: 'Sei camere, piscina e cene con quello che cresce nell\'orto.',
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
            text: 'Privati e clienti professionali trovano prezzi, formati e condizioni diversi senza confusione.',
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
      title: 'E-commerce per cantine, frantoi e aziende agricole: vendere vino e olio online',
      description:
        'E-commerce per cantine, frantoi e aziende agricole: vendita di vino e olio online, prenotazioni dirette senza commissioni dei portali e buoni regalo.',
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
      title: { text: 'E-commerce e prenotazioni dirette', accent: 'per cantine, frantoi e strutture ricettive.' },
      subtitle: 'Vendete voi, senza passare da nessuno.',
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
          'Pacchetti ed esperienze venduti direttamente da voi.',
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
  // Prompt 29, Fase C: struttura nuova in otto sezioni (components/agria/service/ServicePage.jsx).
  automation: {
    key: 'automation',
    name: 'Digital Automation',
    meta: {
      title: 'Intelligenza artificiale per hotel, agriturismi, cantine e frantoi',
      description:
        'Chatbot, assistenti AI e automazioni per hotel, agriturismi, cantine e frantoi: risposte ai clienti, richieste e ordini senza ricopiare. Decidete voi.',
      path: '/servizi/digital-automation',
    },
    labels: {
      problems: '( COSA VI COSTA )',
      screens: '( COME LAVORA )',
      build: '( COSA COSTRUIAMO )',
      sectors: '( PER IL VOSTRO MESTIERE )',
      method: '( DALLA RICHIESTA ALLA CONSEGNA )',
      faq: '( DOMANDE FREQUENTI )',
    },
    cta: { label: 'Richiedete la prima analisi →', href: CONTACT },
    // 1. Apertura
    hero: {
      eyebrow: '( 03 · DIGITAL AUTOMATION )',
      title: { text: 'Intelligenza artificiale e automazioni', accent: 'per hotel, agriturismi e cantine.' },
      subtitle: 'Il lavoro che si rifà ogni giorno lo fa il sistema.',
      lead: 'Colleghiamo i programmi che usate già e mettiamo un assistente dove serve: le richieste trovano risposta subito, i dati si scrivono una volta sola, i promemoria partono da soli. Le decisioni restano a una persona.',
      secondary: { label: 'Guardate come lavoriamo', href: '#come-lavoriamo' },
      pills: ['Collegamenti tra programmi', 'Assistenti', 'Richieste in un unico posto', 'Promemoria', 'Report'],
    },
    // 2. Tre problemi
    diagnosis: {
      title: { text: 'Il costo che pagate', accent: 'ogni giorno senza vederlo.' },
      items: [
        {
          title: 'Lo stesso dato, scritto tre volte',
          text: 'Una prenotazione passa dal portale al gestionale al foglio delle pulizie, a mano. Sono minuti ogni volta, e ogni tanto un errore che si paga caro.',
        },
        {
          title: 'Richieste che si perdono',
          text: 'Arrivano da email, WhatsApp, telefono e dal sito. Chi risponde cambia, e qualcuna resta indietro senza che nessuno se ne accorga.',
        },
        {
          title: "Il lunedì non sapete com'è andata",
          text: 'Per capire quanto avete incassato o quante camere avete venduto, qualcuno deve mettersi a contare. Così, spesso, non lo fa nessuno.',
        },
      ],
      cta: { label: 'Raccontateci una vostra giornata →', href: CONTACT },
    },
    // 3. La schermata (brochure, pagina 6). La chat riprende i messaggi della
    // sezione 6 della home (assistantDemo in content/agria/home.js); l'agriturismo
    // inventato è lo stesso di Digital Presence. Solo scenografia.
    screens: [
      {
        key: 'assistente',
        kind: 'assistant',
        title: { text: 'Come lavora', accent: 'un assistente.' },
        captions: [
          'Le domande di sempre — orari, disponibilità, prezzi — trovano risposta subito, anche fuori orario.',
          'Ogni conferma passa da una persona.',
          'Promemoria e richiesta di recensione partono da soli.',
        ],
        mock: {
          brand: 'Orvenna',
          kind: 'Agriturismo',
          status: 'Risponde subito',
          time: '21:47',
          messages: assistantDemo.chat.messages.slice(0, 4),
          request: {
            title: 'Richiesta pronta · da confermare',
            text: 'Camera vista ulivi · 12–14 giugno, 2 ospiti · arrivo dopo le 21',
            person: 'Giulia',
            role: 'reception',
          },
          day: {
            label: 'La giornata',
            steps: [
              { icon: 'chat', title: 'Richiesta', text: 'sito, chat, email' },
              { icon: 'calendar', title: 'Agenda', text: 'con la conferma di chi risponde' },
              { icon: 'bell', title: 'Promemoria', text: 'il giorno prima' },
              { icon: 'badge-check', title: 'Recensione', text: 'dopo la visita' },
            ],
          },
        },
      },
    ],
    // 4. Cosa costruiamo (icon: per i blocchi dell'indice /servizi)
    build: {
      title: { text: 'Quattro automazioni', accent: 'che cambiano la settimana.' },
      items: [
        {
          icon: 'inbox',
          title: 'Le richieste in un posto solo',
          text: 'Email, WhatsApp, telefono, sito e portali arrivano in un unico ingresso, già ordinate per urgenza, con la bozza di risposta pronta.',
        },
        {
          icon: 'link',
          title: 'I programmi che si parlano',
          text: 'Sito, gestionale, pagamenti e calendario si scambiano i dati da soli: ogni dato entra una volta e arriva dove serve.',
        },
        {
          icon: 'file-text',
          title: 'I documenti letti da soli',
          text: 'Fatture, bolle e ordini vengono letti, archiviati e registrati senza che qualcuno li ricopi. Quello che non torna si ferma e aspetta una persona.',
        },
        {
          icon: 'chart',
          title: 'Il report del lunedì',
          text: 'Ogni settimana, senza chiederlo: quanto avete incassato, cosa avete venduto, quante richieste sono arrivate e quante sono diventate clienti.',
        },
      ],
    },
    // 5. Per il vostro mestiere
    sectors: {
      title: { text: 'Processi diversi,', accent: 'stesso principio.' },
      items: [
        {
          key: 'hospitality',
          title: 'Agriturismi, hotel e strutture ricettive',
          points: [
            "Prenotazioni da portali, sito e telefono in un'unica agenda.",
            "Conferme, istruzioni per l'arrivo e promemoria che partono da soli.",
            'La lista delle camere da preparare, aggiornata senza che nessuno la scriva.',
            'Quanto avete incassato e quanto avete speso, settimana per settimana.',
          ],
        },
        {
          key: 'cantine',
          title: 'Nel settore vitivinicolo',
          points: [
            "I contatti raccolti in degustazione finiscono nell'elenco, non su un foglio.",
            'Stato degli ordini e delle spedizioni senza rincorrere il corriere.',
            'Fatture e bolle archiviate e registrate in automatico.',
            "Comunicazioni ai clienti nei momenti giusti dell'anno, senza ricordarsele.",
          ],
        },
        {
          key: 'frantoi',
          title: 'Frantoi e aziende olivicole',
          points: [
            'Ordini da telefono, WhatsApp ed email raccolti in un unico ingresso.',
            'Prenotazioni di molitura gestite senza agenda cartacea.',
            'Il listino giusto applicato da solo, a seconda di chi ordina.',
            'I clienti abituali riordinano con un messaggio.',
          ],
        },
      ],
    },
    // 6. Come lavoriamo: titolo e testo propri, poi i quattro passi della homepage
    // (method in content/agria/home.js)
    method: {
      title: { text: 'Prima si guarda,', accent: 'poi si automatizza.' },
      text: 'Qui i quattro passi hanno una differenza, e vale la pena dirla: prima di automatizzare qualcosa stiamo a guardare come lo fate adesso. Spesso il modo migliore di risolvere un passaggio è toglierlo, non automatizzarlo.',
    },
    // 7. Domande frequenti
    faq: [
      {
        q: "L'assistente risponde al posto nostro?",
        a: 'Prepara. Raccoglie le informazioni, scrive la bozza e la passa a chi deve rispondere. Nessuna conferma e nessun prezzo partono da soli.',
      },
      {
        q: 'E se dice una cosa sbagliata?',
        a: 'Risponde solo su quello che gli avete dato: le vostre camere, i vostri prezzi, le vostre regole. Su quello che non sa, passa la mano a una persona invece di inventare.',
      },
      {
        q: 'Funziona con il nostro gestionale?',
        a: "Dipende da cosa permette il vostro. È la prima cosa che controlliamo nell'analisi, e ve lo diciamo prima di qualunque proposta.",
      },
      {
        q: 'Dobbiamo cambiare programmi?',
        a: 'No. Lavoriamo sopra quelli che avete: il nostro lavoro è farli parlare, non sostituirli.',
      },
      {
        q: 'I nostri dati dove finiscono?',
        a: "Restano nei vostri sistemi. L'assistente li legge per rispondere, non se li porta via, e vi lasciamo scritto cosa tocca e come.",
      },
      {
        q: 'Se poi vogliamo spegnere tutto?',
        a: 'Si spegne. Il lavoro torna a farsi come prima, e il sito e i dati restano vostri.',
      },
    ],
    // 8. Chiusura (il secondo pulsante usa il link di QUICK_CONTACT.whatsapp)
    closing: {
      title: { text: 'Raccontateci', accent: 'una vostra giornata.' },
      text: "Vi prepariamo una prima analisi e ve la mostriamo: cosa si può collegare, cosa può farsi da solo e cosa conviene lasciare com'è.",
      secondary: { label: 'Scriveteci su WhatsApp' },
    },
    articles: [
      { slug: 'software-per-agriturismi' },
      { slug: 'software-per-cantine' },
      { slug: 'chatbot-cantina-ai-customer-service' },
    ],
    // foto del blocco Digital Automation nell'indice /servizi (la pagina area non ha più fotografie)
    indexImage: agriaImage('servizi/automation'),
    // Testi della pagina area di prima del Prompt 29 che le pagine /soluzioni
    // (content/agria/soluzioni.js) riprendono: restano identici lì.
    solutions: {
      aiCta: { label: 'Parliamo dei vostri processi', href: CONTACT },
      diagnosisCta: { label: 'Mappiamo un vostro processo', href: CONTACT },
      closing: { text: CLOSING_TEXT, secondary: WRITE },
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
      ],
    },
    // Verticali della pagina area di prima del Prompt 29: li usano le pagine
    // /settori (content/agria/settori.js) e /soluzioni. Testi invariati.
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
  },
};
