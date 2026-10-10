// =====================================================================
//  PAGINA AZIENDA — copy definitivo (Prompt 17). Modificare qui i testi,
//  non nei componenti. Nessun testo va aggiunto senza approvazione.
//  Ordine delle sezioni: app/(site)/azienda/page.jsx.
//  icon: nome di un'icona del set (components/agria/icons/Icon.jsx).
// =====================================================================

import { agriaImage } from '@/lib/agria-images';

const CONTACT = { label: 'Parliamo del progetto', href: '/contatti' };

export const meta = {
  title: 'Azienda — Agria System, technology company per hospitality, cantine e frantoi',
  description:
    'Sistemi digitali sviluppati internamente per hospitality (agriturismi, hotel e strutture ricettive), cantine e frantoi. Da Perugia, in tutta Italia.',
  path: '/azienda',
};

// 1. Hero
export const hero = {
  eyebrow: 'Azienda',
  title: 'Costruiamo i sistemi digitali di chi produce e ospita.',
  lead: 'Agria System lavora in tre settori: hospitality (agriturismi, hotel e strutture ricettive), cantine e frantoi. Progettiamo e sviluppiamo internamente siti, sistemi di vendita e automazioni, e ci fermiamo dove finisce la nostra competenza.',
  primary: CONTACT,
  secondary: { label: 'Guardate i servizi', href: '/servizi' },
};

// 2. Posizionamento
export const positioning = {
  eyebrow: 'Perché tre settori',
  title: 'Conoscere un mestiere cambia il risultato più della tecnologia.',
  text: "Un agriturismo, una cantina e un frantoio hanno problemi diversi tra loro e diversissimi da quelli di un'azienda qualsiasi. Stagionalità, canali di vendita, tipi di cliente, adempimenti. Abbiamo scelto tre settori e li seguiamo tutti i giorni: quando arriviamo, sappiamo già dove guardare.",
};

// 3. Principi: fisarmonica orizzontale (components/agria/azienda/PrinciplesAccordion.jsx)
export const principles = {
  label: 'Principi',
  items: [
    {
      icon: 'code',
      title: 'Sviluppiamo internamente',
      text: 'Nessun subappalto. Progettazione e sviluppo restano nelle stesse tre persone, e chi ha costruito il sistema è chi interviene quando qualcosa non funziona. È il motivo per cui possiamo garantire tempi e qualità.',
    },
    {
      icon: 'minus',
      title: 'Diciamo di no',
      text: 'Se un progetto non cambia il modo in cui lavorate o vendete, lo diciamo prima di firmare. Preferiamo perdere un lavoro che consegnare qualcosa che resta inutilizzato.',
    },
    {
      icon: 'sparkles',
      title: "L'AI che usiamo e quella che integriamo",
      text: "Con l'AI progettiamo e sviluppiamo: è ciò che permette a tre persone di consegnare quello che di solito richiede una struttura più grande. Nei vostri processi entra solo come componente dei sistemi che costruiamo, dove ha senso e dove i dati la reggono. In nessuno dei due casi decide l'AI: nel nostro lavoro decidiamo noi, nei vostri processi decidete voi. La responsabilità tecnica è nostra.",
    },
    {
      icon: 'key',
      title: 'Quello che costruiamo è vostro',
      text: 'Codice, contenuti, domini e dati restano di vostra proprietà, accessibili anche se un giorno deciderete di lavorare con altri. Nessun vincolo tecnico che vi tenga fermi.',
    },
  ],
};

// 4. Team: tre ritratti con scheda che si apre (components/agria/azienda/TeamCards.jsx)
// photo: percorso della foto (ritratti quadrati in bianco e nero in
// public/images/team) oppure null → iniziali su fondo tipografico.
// linkedin: URL del profilo oppure null (nessun link inventato).
export const team = {
  label: 'Le persone',
  title: 'Tre persone, tre mestieri.',
  intro: 'Siamo pochi per scelta. Ogni progetto è seguito da chi lo costruisce, senza passaggi intermedi.',
  linkLabel: 'LinkedIn',
  people: [
    {
      name: 'Matteo Garuzzo',
      role: 'CEO & CTO',
      detail: "Guida la strategia dell'azienda e l'architettura tecnica di progetti e prodotti. È la persona con cui parlate quando il progetto entra nel merito.",
      photo: '/images/team/matteo-garuzzo.jpg',
      // profilo già pubblicato nel sito legacy (content/site.js)
      linkedin: 'https://www.linkedin.com/in/matteogaruzzo',
    },
    {
      name: 'Matteo De Pilla',
      role: 'Co-Founder, Head of Engineering & AI',
      detail: "Sviluppo software, componenti di intelligenza artificiale, integrazioni e automazioni. Trasforma l'architettura in sistemi che funzionano davvero.",
      photo: '/images/team/matteo-de-pilla.jpg',
      linkedin: null,
    },
    {
      name: 'Alessandro Poponi',
      role: 'Co-Founder, Head of Sales & Business Development',
      detail: 'Sviluppo commerciale e rapporto con i clienti nel tempo. È chi risponde quando ci scrivete.',
      photo: '/images/team/alessandro-poponi.jpg',
      linkedin: null,
    },
  ],
};

// 5. Come si lavora con noi: linea temporale verticale (components/agria/azienda/ProcessTimeline.jsx),
// seguita dalla CTA a metà pagina
export const howWeWork = {
  eyebrow: 'Il percorso',
  title: 'Dalla prima chiamata al sistema che funziona.',
  steps: [
    {
      icon: 'inbox',
      title: 'Primo contatto',
      text: 'Ci scrivete o vi scriviamo. In venti minuti capiamo se il vostro caso rientra in quello che sappiamo fare. Se non rientra, ve lo diciamo subito.',
    },
    {
      icon: 'search',
      title: 'Analisi',
      text: 'Guardiamo come lavorate davvero: strumenti, passaggi manuali, dove si perdono tempo e clienti. Da qui nasce tutto il resto.',
    },
    {
      icon: 'file-text',
      title: 'Proposta',
      text: 'Ricevete ambito, tempi e investimento definiti su quel progetto. Nessun listino, nessun pacchetto preconfezionato.',
    },
    {
      icon: 'layers',
      title: 'Sviluppo',
      text: 'Costruiamo internamente, con consegne intermedie da approvare. Alla fine misuriamo quello che è cambiato e correggiamo.',
    },
  ],
  cta: CONTACT,
};

// 6. Ricerca e sviluppo
export const research = {
  eyebrow: 'Ricerca e sviluppo',
  title: 'Costruiamo anche prodotti nostri.',
  text: 'Una parte del nostro lavoro è ricerca applicata: software proprietari che nascono dai problemi che incontriamo in queste aziende. Ne parliamo quando saranno pronti, non prima. Nel frattempo quella ricerca finisce nei progetti dei clienti, sotto forma di automazioni e analisi dei dati.',
};

// 7. Territorio: foto della pipeline Unsplash (scripts/images.config.json → azienda/territorio)
export const territory = {
  eyebrow: 'Dove lavoriamo',
  title: 'Da Perugia, in tutta Italia e sui mercati esteri.',
  text: "La sede è in Umbria, in mezzo alle aziende con cui lavoriamo. I progetti no: seguiamo clienti in tutta Italia e costruiamo versioni in inglese per chi vende all'estero.",
  address: 'Via Ponte Vecchio 67, 06135 Perugia',
  image: agriaImage('azienda/territorio'),
};

// 8. Dati aziendali. Email e telefono arrivano da content/site.js (gli stessi
// dello schema Organization della homepage), passati dalla pagina.
export const company = {
  label: 'Dati aziendali',
  claim: 'Agria System è il marchio con cui opera Matteo Garuzzo, libero professionista.',
  vat: 'IT04006460549',
  address: { street: 'Via Ponte Vecchio 67', postalCode: '06135', city: 'Perugia', province: 'PG', country: 'IT' },
  addressLine: 'Via Ponte Vecchio 67, 06135 Perugia',
  labels: { address: 'Indirizzo', vat: 'P.IVA', email: 'Email', phone: 'Telefono' },
};

// 9. CTA finale
export const closing = {
  title: 'Raccontateci come lavorate oggi.',
  text: 'Una prima analisi serve a capire se ha senso lavorare insieme. Rispondiamo con una valutazione concreta, non con un preventivo generico.',
  cta: CONTACT,
};
