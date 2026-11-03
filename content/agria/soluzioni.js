// =====================================================================
//  PAGINE SOLUZIONE AGRIA — copy approvato (Prompt 23). Modificare qui i
//  testi, non nei componenti. Nessun testo va aggiunto senza approvazione.
//  Le soluzioni promuovono a pagina contenuti già scritti: le schede di
//  Digital Automation (content/agria/servizi-aree.js), la homepage e gli
//  articoli del blog citati accanto a ogni blocco. Template:
//  components/agria/solution/SolutionPage.jsx
//  - area: area di appartenenza (chiave di serviceAreas), dichiarata
//    nell'etichetta, nel breadcrumb e in "Da dove si parte";
//  - also: altre aree a cui la pagina rimanda;
//  - nome e descrizione in navigazione: components/agria/nav-data.js.
//  icon: nome di un'icona del set (components/agria/icons/Icon.jsx).
// =====================================================================

import { NAV_PANELS } from '@/components/agria/nav-data';
import { sectors } from './home';
import { SECTOR_LABELS, serviceAreas } from './servizi-aree';

const automation = serviceAreas.automation;
// risposte già approvate nelle FAQ di Digital Automation, riprese per domanda
const automationAnswer = (q) => automation.faq.find((item) => item.q === q).a;

const DOES_NOT = { title: 'Cosa non fa.', anchor: 'cosa-non-fa' };
const SECONDARY = { label: 'Leggete cosa non fa', href: `#${DOES_NOT.anchor}` };
const START_TITLE = 'Da dove si parte';
const EYEBROW = `Soluzione · ${automation.name}`;

const navItems = NAV_PANELS.find((panel) => panel.key === 'servizi').group.items;
const navItem = (path) => navItems.find((item) => item.href === path);

const solutions = [
  {
    key: 'assistente-ai',
    area: 'automation',
    also: [],
    meta: {
      title: 'Chatbot e assistente AI per hotel e cantine | Agria System',
      description:
        "Un chatbot risponde da solo. L'assistente AI che costruiamo prepara bozze per le domande ricorrenti, e chi risponde le rivede. Hospitality, cantine e frantoi.",
      path: '/soluzioni/assistente-ai',
    },
    cta: automation.ai.cta,
    hero: {
      eyebrow: EYEBROW,
      title: 'Serve un chatbot per rispondere ai clienti?',
      lead: "Di solito serve rispondere prima, che è un'altra cosa. Un chatbot risponde da solo, e se sbaglia l'errore arriva al cliente. L'assistente AI che costruiamo prepara le bozze per le domande ricorrenti: chi risponde le rivede, le corregge se serve e le invia.",
      secondary: SECONDARY,
    },
    problem: {
      title: 'Le stesse domande, scritte da capo ogni volta.',
      text: 'I clienti scrivono quando hanno tempo: la sera, nel weekend, durante una fiera in cui nessuno è alla scrivania. Le domande si accumulano, e chi se ne occupa riparte ogni volta da una casella piena di richieste simili, a cui rispondere una per una. Qualcosa resta senza risposta, e non lo scoprite subito.',
    },
    does: {
      title: "Cosa fa l'assistente AI, concretamente.",
      intro: 'Entra nei vostri processi solo dove produce un risultato misurabile (capire, classificare, estrarre) e dove i dati la reggono.',
      items: [
        {
          icon: 'sort',
          title: 'Classificazione e smistamento',
          text: 'Richieste e documenti riconosciuti e indirizzati alla persona giusta. Quelle che escono dal perimetro vengono segnalate, non trattate.',
        },
        {
          icon: 'chat',
          title: 'Risposte assistite',
          text: 'Bozze pronte per le domande ricorrenti, riviste da chi risponde. Partono dalle informazioni reali: catalogo, spedizioni, calendario.',
        },
        {
          icon: 'file-text',
          title: 'Estrazione dati',
          text: 'Numeri e informazioni prese da documenti e messaggi, senza trascrizione. Chi risponde trova richiesta, dati utili e bozza nello stesso posto.',
        },
        {
          icon: 'user-check',
          title: 'Controllo umano',
          text: 'Nessuna automazione decide al posto vostro. Le regole sono vostre, e restano modificabili. Nessuna risposta parte se non la invia una persona.',
        },
      ],
    },
    doesNot: {
      ...DOES_NOT,
      items: [
        {
          title: 'Non decide al posto vostro.',
          text: 'Quali richieste ricevono una bozza, quali vengono solo segnalate e quali passano subito a una persona lo stabilite voi, prima di cominciare. Le regole restano vostre e restano modificabili.',
        },
        {
          title: 'Non risponde da solo al cliente.',
          text: "Ogni bozza passa da chi risponde prima di partire. Le richieste che chiedono giudizio, come un reclamo, una trattativa o un consiglio su un'annata, non ricevono nemmeno una bozza: vengono segnalate, e la risposta la scrive una persona.",
        },
        {
          title: 'Non conosce quello che non gli avete dato.',
          text: "Le bozze valgono quanto le informazioni di partenza: orari, catalogo, condizioni, politiche di spedizione. Se un'informazione manca o è cambiata, la bozza è sbagliata finché qualcuno non la aggiorna.",
        },
        {
          title: 'Non sostituisce chi risponde.',
          text: 'Toglie il lavoro di scrivere da zero le risposte ripetitive. La conoscenza del prodotto, il tono e il rapporto con il cliente restano a chi ci lavora ogni giorno.',
        },
        {
          title: 'Non risponde al telefono.',
          text: 'Lavora sulle richieste scritte. Il telefono resta per le conversazioni che chiedono un contatto diretto.',
        },
        {
          title: 'Non nasconde dove vanno i dati.',
          text: 'Quali informazioni escono dai vostri sistemi, verso quale fornitore e per quanto tempo restano, lo stabiliamo insieme prima di cominciare e lo mettiamo per iscritto.',
        },
      ],
    },
    connects: {
      title: 'Si appoggia a quello che avete già.',
      text: "Il cliente scrive come ha sempre fatto: dal sito, per email o sui canali di messaggistica. Le bozze si costruiscono sui dati che avete già, collegati dove i sistemi lo permettono: il catalogo dell'e-commerce, il tracciamento delle spedizioni, il calendario delle prenotazioni. Lavoriamo sopra gli strumenti che usate: li colleghiamo, non li sostituiamo. Senza quel collegamento la bozza si basa su informazioni ferme, e prezzi o disponibilità rischiano di non essere più corretti.",
      link: '/soluzioni/collegare-gestionale-e-sito',
    },
    sectors: {
      hospitality:
        "Come arrivare, orari di check-in, cosa portare: le domande ripetitive dei giorni prima dell'arrivo trovano la bozza già pronta, con le informazioni della struttura. Chi segue gli ospiti la rivede e la invia.",
      cantine:
        "Tempi e costi di spedizione, disponibilità di un vino, come funziona una degustazione: bozze collegate al catalogo e al calendario delle visite. Un consiglio su un'annata lo dà chi la conosce.",
      frantoi:
        "Quando esce l'olio nuovo, quali formati ci sono, come si ordina: le domande che tornano a ogni campagna hanno una bozza pronta. Le richieste di ristorazione e rivenditori vanno a chi segue i listini professionali.",
    },
    start: {
      text: "Da un caso solo: quello che pesa di più oggi, spesso i primi contatti o le domande dopo l'acquisto. Si prova su un canale, si leggono le correzioni di chi risponde, si sistemano le informazioni di partenza, poi si allarga. L'assistente AI è una componente di Digital Automation: lì trovate il metodo e cosa resta alla consegna.",
    },
    faq: [
      {
        q: 'Il cliente parla con un chatbot?',
        a: "No. Il cliente scrive come ha sempre fatto, dal sito, per email o sui canali di messaggistica, e riceve la risposta di una persona. L'AI lavora prima, preparando la bozza.",
      },
      {
        q: "E se l'AI sbaglia una risposta?",
        a: 'Può succedere, come con qualunque sistema che legge il linguaggio naturale. Per questo nessuna risposta parte se non la invia una persona, e ogni correzione serve ad aggiornare le informazioni da cui nascono le bozze.',
      },
      {
        q: "Ha senso anche per un'azienda piccola?",
        a: 'Dipende da quante domande ripetitive ricevete, non dalla dimensione. Se sono poche, probabilmente non è il momento, e ve lo diciamo. Se sono molte e i clienti aspettano, vale la pena valutarlo.',
      },
      { q: 'Dobbiamo cambiare sito, posta o gestionale?', a: automationAnswer('Dobbiamo cambiare gestionale?') },
      {
        q: 'Quanto tempo serve per impostarlo?',
        a: "Dipende da quante informazioni vanno organizzate e da quanti sistemi vanno collegati. Non serve partire con tutto: si comincia da un caso d'uso e si allarga dopo aver verificato che funziona.",
      },
      // l'assistente del sito (content/agria/assistente.js): risposte preparate, nessun modello AI
      {
        q: "L'assistente di questo sito è un chatbot?",
        a: 'Non usa un modello AI: risponde solo con testi preparati dal team, dice di essere automatico e, quando la domanda esce da quello che conosce, vi passa a una persona.',
      },
    ],
    closing: { title: 'Raccontateci quali domande vi arrivano ogni settimana.' },
    articles: ['chatbot-cantina-ai-customer-service'],
  },

  {
    key: 'gestione-richieste',
    area: 'automation',
    also: [],
    meta: {
      title: 'Gestione richieste: email, WhatsApp, telefono | Agria System',
      description:
        'Richieste da email, WhatsApp, telefono e portali in un solo ingresso tracciato: ogni richiesta registrata e assegnata. Per hospitality, cantine e frantoi.',
      path: '/soluzioni/gestione-richieste',
    },
    cta: automation.diagnosis.cta,
    hero: {
      eyebrow: EYEBROW,
      title: 'Email, WhatsApp, telefono, portali: chi raccoglie le richieste?',
      lead: 'Oggi le richieste arrivano su canali diversi e qualcuno le raccoglie a mano, le ricopia, le gira a chi deve rispondere. Le portiamo in un solo ingresso tracciato: ogni richiesta registrata, con una persona che la segue.',
      secondary: SECONDARY,
    },
    problem: {
      title: 'Richieste che si perdono.',
      text: 'Messaggi, moduli e telefonate arrivano su canali diversi. Qualcosa resta senza risposta, e non lo scoprite subito. Quello che arriva va ricopiato a mano, con errori su formati, quantità e condizioni, e senza uno storico di chi ha chiesto cosa.',
    },
    does: {
      title: 'Cosa fa, concretamente.',
      items: [
        {
          icon: 'inbox',
          title: 'Ingresso',
          text: 'Un solo punto. Moduli, email, telefono e portali confluiscono nello stesso ingresso, dove i sistemi lo permettono.',
        },
        {
          icon: 'users',
          title: 'Assegnazione',
          text: "Ogni richiesta ha qualcuno che risponde. Dove i dati la reggono, l'AI riconosce il tipo di richiesta e la indirizza alla persona giusta.",
        },
        {
          icon: 'list',
          title: 'Tracciamento',
          text: 'Ogni richiesta registrata: si vede cosa è arrivato, chi la segue e cosa aspetta ancora una risposta.',
        },
        {
          icon: 'user-plus',
          title: 'Anagrafica',
          text: 'Chi scrive entra in anagrafica, in una sola versione, e può essere richiamato anche dopo.',
        },
      ],
    },
    doesNot: {
      ...DOES_NOT,
      items: [
        {
          title: 'Non risponde al posto vostro.',
          text: "Raccoglie, assegna e tiene traccia: la risposta la scrive chi la deve dare. Per avere bozze pronte sulle domande ricorrenti serve un passo in più, l'assistente AI.",
          link: '/soluzioni/assistente-ai',
        },
        {
          title: 'Non recupera quello che è successo prima.',
          text: "Le richieste arrivate prima che il flusso fosse attivo, o su canali che non sono collegati, non compaiono da sole. Lo storico comincia dal giorno in cui l'ingresso è attivo.",
        },
        {
          title: 'Non elimina il telefono.',
          text: 'Le telefonate restano telefonate: per entrare nel flusso qualcuno deve registrarle. Il sistema non le ascolta e non le trascrive.',
        },
        {
          title: 'Non collega un canale che non lo permette.',
          text: 'Un canale entra nel flusso solo se si lascia collegare. Quando non è possibile, le richieste vanno inoltrate o registrate a mano, e ve lo diciamo prima.',
        },
      ],
    },
    // l'ingresso vive in uno strumento che esiste già: costruiamo i
    // collegamenti, non il contenitore (nessun gestionale o CRM su commessa)
    connects: {
      title: 'Sopra gli strumenti che avete già.',
      text: "L'ingresso unico vive in uno strumento che esiste già: la vostra casella condivisa, il gestionale o il PMS, oppure un CRM che avete o che configuriamo per voi. Configurare un prodotto esistente non è costruire un gestionale: noi costruiamo i collegamenti che fanno arrivare lì dentro email, moduli del sito, portali e messaggi, non il contenitore.",
      link: '/soluzioni/collegare-gestionale-e-sito',
    },
    sectors: {
      hospitality:
        'Portali, email e telefono confluiscono in un unico flusso senza doppi inserimenti. Oggi le stesse prenotazioni vengono inserite due volte a mano.',
      cantine:
        'Chi chiede una visita o prenota una degustazione entra in anagrafica e può essere richiamato. Oggi le degustazioni sono piene e i contatti non restano.',
      frantoi:
        'Telefono, WhatsApp ed email raccolti in un unico ingresso, anche durante la campagna, quando le prenotazioni di molitura si sommano agli ordini.',
    },
    start: {
      text: "Da un processo solo. Lo seguiamo dall'inizio alla fine e contiamo i passaggi manuali e i punti in cui una richiesta si perde. Poi colleghiamo un canale alla volta e controlliamo il comportamento sui casi reali, compresi quelli anomali, prima di estendere. È un lavoro di Digital Automation: lì trovate il metodo completo.",
    },
    faq: [
      { q: 'Dobbiamo cambiare gestionale o PMS?', a: automationAnswer('Dobbiamo cambiare gestionale?') },
      {
        q: 'Dove finiscono le richieste? Ci costruite un programma apposta?',
        a: 'No. Finiscono in uno strumento che esiste già: la vostra casella condivisa, il gestionale o il PMS, oppure un CRM che avete o che configuriamo per voi. Noi costruiamo i collegamenti che ci fanno arrivare tutto, non il contenitore.',
      },
      { q: 'Si può collegare WhatsApp?', a: 'Dipende da come lo usate, ed è tra le prime cose che verifichiamo.' },
      {
        q: 'E le telefonate?',
        a: 'Restano telefonate. Per entrare nel flusso qualcuno deve registrarle: il sistema non le ascolta e non le trascrive.',
      },
      {
        q: 'Come ci accorgiamo se una richiesta resta senza risposta?',
        a: 'Ogni richiesta registrata ha una persona assegnata, e quelle ferme vi vengono segnalate, non nascoste.',
      },
      // l'assegnazione può usare l'AI: "restano dove sono" non basta (vedi pagina assistente-ai)
      {
        q: 'I dati restano nostri?',
        a: "Sì. Le automazioni li fanno circolare, non li portano via. Se una parte del flusso usa l'AI, quali informazioni escono dai vostri sistemi e verso quale fornitore lo stabiliamo insieme prima di cominciare, e lo mettiamo per iscritto.",
      },
    ],
    closing: { title: 'Raccontateci da dove arrivano le vostre richieste.' },
    articles: [],
  },

  {
    key: 'collegare-gestionale-e-sito',
    area: 'automation',
    also: ['commerce'],
    meta: {
      title: 'Collegare gestionale, PMS e sito: si può? | Agria System',
      description:
        'Gestionale, PMS, e-commerce e sito collegati perché un dato si inserisca una volta sola. Prima verifichiamo se si può: non tutti i sistemi lo permettono.',
      path: '/soluzioni/collegare-gestionale-e-sito',
    },
    cta: automation.diagnosis.cta,
    hero: {
      eyebrow: EYEBROW,
      title: 'Si può collegare quello che usate già? Sì, se il sistema lo permette.',
      lead: 'Avete scelto da poco un gestionale, un PMS o un motore di prenotazione, e non volete cambiarlo: non serve. Lo colleghiamo al sito e agli altri strumenti, perché un dato si inserisca una volta sola. Prima verifichiamo che si possa fare.',
      secondary: SECONDARY,
    },
    problem: {
      title: 'Dati riscritti a mano.',
      text: 'Le stesse informazioni vengono copiate tra portali, email, fogli di lavoro e gestionale. Ogni passaggio è tempo e possibilità di errore. Spesso il gestionale fa bene il suo lavoro: è il collegamento con il sito che manca.',
    },
    does: {
      title: 'Cosa fa, concretamente.',
      items: [
        {
          icon: 'users',
          title: 'Anagrafica',
          text: 'Una sola versione. Lo stesso cliente non esiste in più posti con dati diversi.',
        },
        {
          icon: 'package',
          title: 'Ordini',
          text: "Stato aggiornato. L'ordine fatto sul sito arriva al gestionale senza essere ricopiato.",
        },
        {
          icon: 'calendar',
          title: 'Disponibilità',
          text: 'Allineata tra gli strumenti. Camere, posti in degustazione e prodotti non si vendono due volte.',
        },
        {
          icon: 'shield',
          title: 'Errori gestiti',
          text: 'Ogni collegamento ha una gestione degli errori e un percorso di ricaduta manuale. Le eccezioni vi vengono segnalate, non nascoste.',
        },
      ],
    },
    doesNot: {
      ...DOES_NOT,
      intro: 'È la parte da leggere prima di tutto il resto.',
      items: [
        {
          title: 'Non funziona con ogni sistema.',
          text: "Un collegamento è possibile quando il sistema espone un'interfaccia o consente esportazioni, quando i permessi di accesso ci sono e quando i dati sono in ordine. Non tutti i gestionali lo permettono.",
        },
        {
          title: 'Non promette prima di aver verificato.',
          text: 'La prima cosa che facciamo è controllare cosa espone ciascuno dei vostri strumenti. A volte la risposta è no, e in quel caso ve lo diciamo con il motivo.',
        },
        {
          title: 'Non forza un sistema chiuso.',
          text: 'Se uno strumento non permette di scaricare i dati né di dialogare con altri sistemi, un collegamento costruito comunque sarebbe un ripiego fragile. Non lo proponiamo: cosa fare dopo lo decidete voi.',
        },
        {
          title: 'Non mette in ordine i dati da solo.',
          text: "Anagrafiche doppie o listini incompleti restano tali anche collegati: si sistemano prima, altrimenti il collegamento porta l'errore ovunque.",
        },
        {
          title: 'Non sostituisce gestionali, CRM, ERP o PMS.',
          text: 'Non li sviluppiamo: lavoriamo sopra quelli che avete, con collegamenti tra gli strumenti esistenti.',
        },
      ],
    },
    connects: {
      title: 'Ognuno continua a fare il suo lavoro.',
      text: 'Il gestionale continua a fare il gestionale, il PMS continua a gestire le camere, il sito continua a raccogliere richieste e ordini. Il collegamento fa passare i dati tra loro, e i dati restano dove sono: le automazioni li fanno circolare, non li portano via. Quando il collegamento serve alla vendita, con e-commerce, prenotazioni e listini, fa parte di un progetto Digital Commerce.',
      link: serviceAreas.commerce.meta.path,
    },
    sectors: {
      hospitality:
        'Il booking engine del sito, il channel manager, la casella email e la fatturazione collegati, perché una prenotazione si inserisca una volta sola. La stessa camera non viene venduta due volte.',
      cantine:
        'Chi visita entra in anagrafica e gli acquisti fatti in cantina si legano alla sua scheda. Dove gli strumenti lo permettono, colleghiamo disponibilità e anagrafiche tra negozio ed e-commerce, per evitare doppie realtà.',
      frantoi:
        'Privati, ristorazione e rivenditori con prezzi e minimi diversi: ogni cliente vede e paga il prezzo corretto, senza controlli manuali.',
    },
    start: {
      text: 'Da un elenco: gli strumenti che usate già, dove i dati si fermano, cosa passa ancora a mano. Verifichiamo cosa espone ciascuno, poi colleghiamo un flusso solo e controlliamo il comportamento sui casi reali, compresi quelli anomali, prima di estendere. Il collegamento tra strumenti è il lavoro di Digital Automation; quando riguarda la vendita, di Digital Commerce.',
    },
    faq: [
      { q: 'Dobbiamo cambiare gestionale?', a: automationAnswer('Dobbiamo cambiare gestionale?') },
      {
        q: 'Funziona con il nostro PMS o con il nostro software?',
        a: automationAnswer('Funziona con il nostro PMS o con il nostro software?'),
      },
      {
        q: 'E se il nostro gestionale non si può collegare?',
        a: 'Ve lo diciamo, con il motivo. Un collegamento costruito su un sistema che non lo permette è fragile, e non lo proponiamo. Cosa fare dopo lo decidete voi.',
      },
      { q: 'E se il collegamento si interrompe?', a: automationAnswer("E se l'automazione sbaglia?") },
      { q: 'I dati restano nostri?', a: automationAnswer('I dati restano nostri?') },
    ],
    closing: { title: 'Diteci quali strumenti usate.' },
    articles: ['software-per-agriturismi', 'software-per-cantine'],
  },
];

// Aggiunge nome (dalla navigazione), area, settori e chiusura comuni.
function build(solution) {
  const area = serviceAreas[solution.area];
  const areas = [area, ...solution.also.map((key) => serviceAreas[key])].map(({ name, meta }) => ({ name, href: meta.path }));
  return {
    ...solution,
    name: navItem(solution.meta.path).title,
    areaName: area.name,
    areaHref: area.meta.path,
    connects: { ...solution.connects, link: solution.connects.link && linkTo(solution.connects.link) },
    doesNot: {
      ...solution.doesNot,
      items: solution.doesNot.items.map((item) => ({ ...item, link: item.link && linkTo(item.link) })),
    },
    sectors: {
      title: automation.verticals.title,
      linkLabel: sectors.linkLabel,
      items: sectors.items.map(({ key, href }) => ({ key, name: SECTOR_LABELS[key], href, text: solution.sectors[key] })),
    },
    start: { title: START_TITLE, text: solution.start.text, areas, contact: automation.closing.secondary },
    closing: { title: solution.closing.title, text: automation.closing.text, secondary: automation.closing.secondary },
  };
}

// Collegamento interno verso una soluzione (nome dalla navigazione) o un'area.
function linkTo(path) {
  const solution = navItem(path);
  if (solution) return { label: solution.title, href: path };
  const area = Object.values(serviceAreas).find((item) => item.meta.path === path);
  return { label: area.name, href: path };
}

export const solutionPages = Object.fromEntries(solutions.map((solution) => [solution.key, build(solution)]));

// Rimandi alle soluzioni dalle pagine area e settore (gruppo "Soluzioni" nei
// collegamenti della CTA finale): chiave della pagina → soluzioni pertinenti.
const LINKS_FROM = {
  automation: ['assistente-ai', 'gestione-richieste', 'collegare-gestionale-e-sito'],
  commerce: ['collegare-gestionale-e-sito', 'gestione-richieste'],
  hospitality: ['gestione-richieste', 'collegare-gestionale-e-sito', 'assistente-ai'],
  cantine: ['assistente-ai', 'gestione-richieste', 'collegare-gestionale-e-sito'],
  frantoi: ['gestione-richieste', 'collegare-gestionale-e-sito'],
};

export const SOLUTIONS_LABEL = 'Soluzioni';

export function solutionLinks(from) {
  return (LINKS_FROM[from] || []).map((key) => ({ label: solutionPages[key].name, href: solutionPages[key].meta.path }));
}
