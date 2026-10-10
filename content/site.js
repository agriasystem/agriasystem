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
    street: 'Via Ponte Vecchio 67',
    city: 'Perugia',
    province: 'PG',
    postalCode: '06135',
    country: 'IT',
  },
  // coordinate della sede (dati strutturati ProfessionalService): ricavate
  // dall'indirizzo, precisione di circa 100 m
  geo: { latitude: 43.089, longitude: 12.447 },
  // orari: testo mostrato in /contatti e forma per i dati strutturati
  hoursLabel: 'Lunedì-venerdì, 9-18',
  openingHours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Via+Ponte+Vecchio+67+06135+Perugia',
  // nessun profilo personale: i profili Agria si aggiungono qui quando esistono
  social: {},
  tagline: 'sistemi digitali per hospitality, cantine e frantoi',
  positioning:
    'Siti, e-commerce e automazioni per agriturismi, hotel, cantine e frantoi. Progettiamo sistemi digitali integrati con gli strumenti che già usate.',
};
