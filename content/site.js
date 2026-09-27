// Dati del sito Agria System: nome, recapiti e sede, usati da layout,
// schema Organization, pagina contatti, dati aziendali e pagine legali.
export const site = {
  name: 'Agria System',
  // titolare dell'attività (pagine legali e dati aziendali)
  founder: 'Matteo Garuzzo',
  vat: 'IT04006460549',
  // TEMPORANEO: da sostituire con info@agriasystem.com appena la casella è attiva
  email: 'agriasystemitalia@gmail.com',
  // telefono generale, anche WhatsApp
  phone: '+39 366 344 5417',
  // area commerciale (Alessandro Poponi), mostrata in /contatti
  salesPhone: '+39 334 766 8669',
  salesEmail: 'alessandro.poponi@agriasystem.com',
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
