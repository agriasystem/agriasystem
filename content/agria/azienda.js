// =====================================================================
//  PAGINA AZIENDA — copy approvato (Prompt 14, riscritto: proposta A per hero e posizionamento). Modificare qui i testi,
//  non nei componenti. Nessun testo va aggiunto senza approvazione.
//  Ordine delle sezioni: app/(site)/azienda/page.jsx.
//  icon: nome di un'icona del set (components/agria/icons/Icon.jsx).
// =====================================================================

import { agriaImage } from '@/lib/agria-images';

const CONTACT = { label: 'Parliamo del progetto', href: '/contatti' };

export const meta = {
  title: 'Azienda — Agria System, technology company per agroalimentare e hospitality',
  description:
    'Chi siamo: progettiamo e sviluppiamo internamente sistemi digitali per agriturismi, hotel, cantine e frantoi. Sede a Perugia, progetti in tutta Italia.',
  path: '/azienda',
};

// 1. Hero
export const hero = {
  eyebrow: 'Azienda',
  title: "L'infrastruttura digitale di chi produce e accoglie.",
  lead: 'Agria System progetta, sviluppa e gestisce i sistemi digitali di agriturismi, hotel, cantine e frantoi. Siti, vendita diretta, automazioni e dati, costruiti internamente e di proprietà del cliente.',
  primary: CONTACT,
  secondary: { label: 'Vedi i servizi', href: '/servizi' },
};

// 2. Posizionamento
export const positioning = {
  eyebrow: 'Chi siamo',
  title: 'Tre settori. Nessuna eccezione.',
  text: 'Lavoriamo solo con hospitality, cantine e frantoi. Conosciamo i loro strumenti, i loro canali di vendita e i loro processi. Per questo rifiutiamo i progetti fuori da questi settori.',
};

// 3. Principi: fisarmonica orizzontale (components/agria/azienda/PrinciplesAccordion.jsx)
export const principles = {
  label: 'Principi',
  items: [
    {
      icon: 'code',
      title: 'Sviluppo interno',
      text: 'Progettazione, sviluppo e manutenzione restano nello stesso team. Nessun subappalto: chi scrive il codice risponde del suo funzionamento.',
    },
    {
      icon: 'minus',
      title: 'Progetti selezionati',
      text: "Valutiamo ogni richiesta prima di accettarla. Se un progetto non cambia il modo in cui l'azienda lavora o vende, non lo prendiamo.",
    },
    {
      icon: 'sparkles',
      title: "L'AI come metodo",
      text: 'La usiamo per analizzare, strutturare e verificare più in fretta. Le decisioni e la responsabilità tecnica restano nostre.',
    },
    {
      icon: 'key',
      title: 'Proprietà del cliente',
      text: 'Codice, contenuti, domini e dati appartengono al cliente. Nessun vincolo tecnico, nessuna licenza che lo leghi a noi.',
    },
  ],
};

// 4. Team: tre ritratti con scheda che si apre (components/agria/azienda/TeamCards.jsx)
// photo: percorso della foto (ritratti quadrati in bianco e nero in
// public/images/team) oppure null → iniziali su fondo tipografico.
// linkedin: URL del profilo oppure null (nessun link inventato).
export const team = {
  label: 'Chi risponde dei progetti',
  linkLabel: 'LinkedIn',
  people: [
    {
      name: 'Matteo Garuzzo',
      role: 'CEO & CTO',
      detail: 'Architettura dei sistemi e direzione tecnica. Risponde delle scelte tecnologiche di ogni progetto.',
      photo: '/images/team/matteo-garuzzo.jpg',
      // profilo già pubblicato nel sito legacy (content/site.js)
      linkedin: 'https://www.linkedin.com/in/matteogaruzzo',
    },
    {
      name: 'Matteo De Pilla',
      role: 'Co-Founder, Head of Engineering & AI',
      detail: 'Sviluppo web, e-commerce e automazioni dei processi. Risponde di quello che va in produzione.',
      photo: '/images/team/matteo-de-pilla.jpg',
      linkedin: null,
    },
    {
      name: 'Alessandro Poponi',
      role: 'Co-Founder, Head of Sales & Business Development',
      detail: 'Primo contatto, analisi delle esigenze e rapporto con il cliente. Risponde di tempi e accordi.',
      photo: '/images/team/alessandro-poponi.jpg',
      linkedin: null,
    },
  ],
};

// 5. Ricerca e sviluppo
export const research = {
  eyebrow: 'Ricerca e sviluppo',
  title: 'Una parte del lavoro è prodotto proprietario.',
  text: 'Sviluppiamo software nostri a partire dai problemi ricorrenti di queste aziende. Li presentiamo quando sono in produzione, non prima.',
};

// 6. Territorio: foto della pipeline Unsplash (scripts/images.config.json → azienda/territorio)
export const territory = {
  eyebrow: 'Dove lavoriamo',
  title: 'Sede a Perugia. Progetti in tutta Italia.',
  text: "I progetti si seguono ovunque, in presenza o da remoto. Ogni sistema può nascere in italiano e in inglese, per le aziende che vendono all'estero.",
  address: 'Via Ponte Vecchio, 06135 Perugia',
  image: agriaImage('azienda/territorio'),
};

// 7. Come si lavora con noi: linea temporale verticale (components/agria/azienda/ProcessTimeline.jsx)
export const howWeWork = {
  title: 'Come si inizia.',
  steps: [
    {
      icon: 'inbox',
      title: 'Primo contatto',
      text: 'Ci descrivete come lavorate oggi. Valutiamo se il caso rientra nei nostri settori e nelle nostre competenze.',
    },
    {
      icon: 'search',
      title: 'Analisi',
      text: 'Studiamo strumenti, passaggi manuali e punti in cui si perdono tempo, dati e clienti.',
    },
    {
      icon: 'file-text',
      title: 'Proposta',
      text: 'Ricevete ambito, tempi e investimento definiti su quel progetto. Nessun listino, nessun pacchetto.',
    },
    {
      icon: 'layers',
      title: 'Progetto',
      text: 'Sviluppo interno con consegne intermedie da approvare. Dopo il rilascio, misura e miglioramento.',
    },
  ],
};

// 8. Dati aziendali. Email e telefono arrivano da content/site.js (gli stessi
// dello schema Organization della homepage), passati dalla pagina.
export const company = {
  label: 'Dati aziendali',
  name: 'Matteo Garuzzo, libero professionista',
  claim: 'Agria System è il marchio con cui operiamo.',
  vat: 'IT04006460549',
  address: { street: 'Via Ponte Vecchio', postalCode: '06135', city: 'Perugia', province: 'PG', country: 'IT' },
  addressLine: 'Via Ponte Vecchio, 06135 Perugia',
  labels: { name: 'Titolare', address: 'Indirizzo', vat: 'P.IVA', email: 'Email', phone: 'Telefono' },
};

// 9. CTA finale
export const closing = {
  title: 'Valutiamo il vostro progetto.',
  text: 'Una prima analisi stabilisce se ha senso lavorare insieme. Se non lo ha, ve lo diciamo.',
  cta: CONTACT,
};
