// =====================================================================
//  HOMEPAGE AGRIA — copy approvato (Prompt 11). Modificare qui i testi,
//  non nei componenti. Nessun testo va aggiunto senza approvazione.
//  Ordine delle sezioni: app/(site)/page.jsx.
// =====================================================================

import { agriaImage } from '@/lib/agria-images';

// 1. Hero
export const hero = {
  eyebrow: 'Technology company · Hospitality · Cantine · Frantoi',
  title: 'Uno strato digitale sopra il vostro lavoro.',
  // titolo animato: la prima variante è quella nell'HTML
  titlePrefix: 'Uno strato digitale sopra ',
  titlePhrases: ['il vostro lavoro', 'la vostra cantina', 'il vostro agriturismo', 'il vostro frantoio'],
  titleSuffix: '.',
  lead: 'Siti, e-commerce e automazioni per agriturismi, hotel, cantine e frantoi. I dati smettono di stare in dieci posti diversi e iniziano a lavorare per voi.',
  primary: { label: 'Parliamo del progetto', href: '/contatti' },
  secondary: { label: 'Come lavoriamo', href: '#come-lavoriamo' },
  chips: ['Prenotazioni', 'Ordini', 'Clienti', 'Costi'],
};

// 2. Fatti
export const facts = [
  // kind: 'figure' per valori brevi o numerici, 'word' per parole (resi più piccoli)
  { value: '3', label: 'settori: hospitality, cantine, frantoi', kind: 'figure' },
  { value: 'IT · EN', label: "progetti pensati anche per l'estero", kind: 'figure' },
  { value: 'Interno', label: 'sviluppo nostro, nessun subappalto', kind: 'word' },
  { value: 'Perugia', label: 'lavoriamo in tutta Italia', kind: 'word' },
];

// 3. Il problema (modulo interattivo 1)
export const problem = {
  eyebrow: 'Il punto di partenza',
  title: 'Oggi i vostri dati stanno in dieci posti.',
  text: "Premete l'interruttore: a sinistra come lavorate oggi, a destra dove porta il lavoro di integrazione.",
  states: { before: 'Come lavorate oggi', after: 'Con Agria' },
  sources: ['Booking.com', 'Email', 'Telefono', 'WhatsApp', 'Excel', 'Gestionale'],
  system: { title: 'Un solo sistema', text: 'Dati collegati, decisioni chiare' },
  captions: {
    before: 'Sei fonti, nessuna che parla con le altre: ogni dato viene riscritto a mano.',
    after: 'Le stesse fonti, collegate con un lavoro di integrazione: i dati entrano una volta e arrivano dove servono.',
  },
  // il limite, detto sotto il modulo
  limit:
    "L'integrazione è possibile quando i sistemi la permettono: dipende dalle interfacce che espongono, dai permessi di accesso e dalla qualità dei dati. È la prima cosa che verifichiamo.",
};

// 4. Servizi
export const services = {
  eyebrow: 'Servizi',
  title: 'Tre aree, un solo sistema.',
  intro: 'Non vendiamo pacchetti. Partiamo da come lavorate oggi e costruiamo quello che serve, integrato con gli strumenti che già usate.',
  linkLabel: 'Approfondisci',
  items: [
    {
      key: 'presence',
      title: 'Digital Presence',
      href: '/servizi/digital-presence',
      text: 'Il sito come strumento commerciale: struttura, contenuti, velocità e visibilità su Google e sui sistemi AI.',
    },
    {
      key: 'commerce',
      title: 'Digital Commerce',
      href: '/servizi/digital-commerce',
      text: 'Vendita diretta: e-commerce, prenotazioni, pagamenti, listini B2B e integrazione con i canali che già usate.',
    },
    {
      key: 'automation',
      title: 'Digital Automation',
      href: '/servizi/digital-automation',
      text: "Automazioni e integrazioni tra gli strumenti che usate, con l'AI dove i dati la reggono: l'obiettivo è che ogni dato si inserisca una volta sola.",
    },
  ],
};

// 5. Componi il tuo sistema (modulo interattivo 2)
// Le scelte arrivano a /contatti come parametri ripetuti: ?moduli=sito&moduli=e-commerce
// (valori = id qui sotto). Formato documentato in docs/agria/11-homepage-definitiva.md.
export const composer = {
  eyebrow: 'Sviluppato internamente, senza template',
  title: 'Componete il vostro sistema.',
  text: 'Scegliete cosa vi serve. Come collegarlo agli strumenti che usate lo verifichiamo noi, per prima cosa.',
  param: 'moduli',
  action: '/contatti',
  modules: [
    { id: 'sito', label: 'Sito', area: 'Presence' },
    { id: 'prenotazioni-dirette', label: 'Prenotazioni dirette', area: 'Commerce' },
    { id: 'e-commerce', label: 'E-commerce', area: 'Commerce' },
    { id: 'listini-b2b', label: 'Listini B2B', area: 'Commerce' },
    { id: 'automazioni', label: 'Automazioni', area: 'Automation' },
    { id: 'report-settimanale', label: 'Report settimanale', area: 'Automation' },
  ],
  // contatore: "n moduli scelti" (singolare per 1)
  count: (n) => (n === 1 ? '1 modulo scelto' : `${n} moduli scelti`),
  cta: 'Parliamo del progetto',
  caption: 'Le scelte arrivano con la richiesta: la prima call parte da qui, non da zero.',
};

// 6. Settori
// Foto dalla pipeline Unsplash (settori/* in scripts/images.config.json).
export const sectors = {
  eyebrow: 'Settori',
  title: 'Conosciamo tre mestieri, non tutti.',
  linkLabel: 'Vedi il settore',
  items: [
    {
      key: 'hospitality',
      title: 'Hospitality',
      href: '/settori/hospitality',
      image: agriaImage('settori/hospitality'),
      text: 'Agriturismi, boutique hotel, relais, masserie. Prenotazioni diverse su portali, email e telefono, inserite due volte a mano. Commissioni che crescono mentre il canale diretto resta fermo.',
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

// 7. Anteprima per settore (modulo interattivo 3)
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
        { title: 'Club', text: 'Clienti che tornano' },
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

// 8. Come lavoriamo
export const method = {
  id: 'come-lavoriamo',
  eyebrow: 'Come lavoriamo',
  title: 'Prima capire, poi costruire.',
  steps: [
    {
      number: '01',
      title: 'Analisi',
      text: 'Guardiamo come lavorate davvero: strumenti, passaggi manuali, dove si perdono tempo e clienti.',
    },
    {
      number: '02',
      title: 'Progetto',
      text: 'Definiamo il sistema: cosa serve, cosa si integra con quello che avete, cosa non serve affatto.',
    },
    {
      number: '03',
      title: 'Sviluppo ed evoluzione',
      text: 'Costruiamo internamente, con consegne intermedie. Poi misuriamo e miglioriamo.',
    },
  ],
};

// 9. Chiarezza e ricerca
export const clarity = {
  title: 'Meglio dirlo subito.',
  text: 'Non facciamo lavori spot che non cambiano nulla, né gestionali su commessa che nessuno poi mantiene. Lavoriamo con aziende strutturate, su progetti che restano nel tempo.',
};

export const research = {
  title: 'Costruiamo anche prodotti nostri.',
  text: 'Una parte del nostro lavoro è ricerca applicata: software proprietari che nascono dai problemi che vediamo in queste aziende. Ne parliamo quando saranno pronti, non prima.',
};

// 10. News: articoli reali del blog (titolo, etichetta e immagine dal post).
// alt scritti qui: quelli dei post non descrivono sempre la foto.
export const news = {
  eyebrow: 'News',
  title: 'Quello che impariamo, scritto.',
  allLabel: 'Tutti gli articoli',
  allHref: '/blog',
  articles: [
    { slug: 'agriturismo-booking-online-prenotazioni', alt: 'Casolari rossi lungo una strada bianca in campagna' },
    { slug: 'ecommerce-vino-margini-vendita-diretta', alt: 'Scatole di cartone aperte, pronte per la spedizione' },
    { slug: 'ecommerce-per-frantoi', alt: "Olive su un cucchiaio sotto un filo d'olio" },
  ],
};

// 11. Banda territoriale
export const territory = {
  eyebrow: 'Dove lavoriamo',
  title: 'Da Perugia, in tutta Italia e sui mercati esteri.',
  // foto Unsplash già accreditata in /crediti-immagini (public/images/servizi/CREDITS.json)
  image: {
    src: '/images/servizi/seo-geo-strategy-hero.jpg',
    alt: 'Strada bianca tra cipressi e vigneti al tramonto',
  },
};

// 12. CTA finale
export const closing = {
  title: 'Raccontateci come lavorate oggi.',
  text: 'Una prima analisi serve a capire se ha senso lavorare insieme. Rispondiamo con una valutazione concreta, non con un preventivo generico.',
  cta: { label: 'Parliamo del progetto', href: '/contatti' },
};
