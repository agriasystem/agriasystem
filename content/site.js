// Dati del sito Agria System: nome, recapiti e sede, usati da layout,
// schema Organization, pagina contatti, dati aziendali e pagine legali.
export const site = {
  name: 'Agria System',
  // titolare: libero professionista con partita IVA; Agria System è il marchio
  // con cui opera (pagine legali e dati aziendali)
  founder: 'Matteo Garuzzo',
  legalForm: 'libero professionista',
  vat: 'IT04006460549',
  // recapiti: email aziendale, email diretta di Matteo Garuzzo (in /contatti),
  // telefono generale anche per WhatsApp
  email: 'info@agriasystem.com',
  directEmail: 'matteo.garuzzo@agriasystem.com',
  phone: '+39 366 344 5417',
  location: 'Perugia, Italia',
  address: {
    street: 'Via Ponte Vecchio',
    city: 'Perugia',
    province: 'PG',
    postalCode: '06135',
    country: 'IT',
  },
  // nessun profilo personale: i profili Agria si aggiungono qui quando esistono
  social: {},
  tagline: 'sistemi digitali per hospitality, cantine e frantoi',
  positioning:
    'Siti, e-commerce e automazioni per agriturismi, hotel, cantine e frantoi. Progettiamo sistemi digitali integrati con gli strumenti che già usate.',
};
