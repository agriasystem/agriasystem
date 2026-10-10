export const CTA = {
  label: 'Parliamo del progetto',
  href: '/contatti',
};

export const NAV_PANELS = [
  {
    key: 'servizi',
    label: 'Servizi',
    href: '/servizi',
    // card di evidenza a destra del pannello (testi già approvati nella homepage)
    feature: {
      title: 'Prima capire, poi costruire.',
      link: { label: 'Tutti i servizi', href: '/servizi' },
    },
    items: [
      {
        title: 'Digital Presence',
        href: '/servizi/digital-presence',
        description: 'Siti e visibilità per hospitality, cantine e frantoi.',
      },
      {
        title: 'Digital Commerce',
        href: '/servizi/digital-commerce',
        description: 'Vendita diretta, prenotazioni e pagamenti online.',
      },
      {
        title: 'Digital Automation',
        href: '/servizi/digital-automation',
        description: 'Automazioni e integrazioni tra gli strumenti che usate.',
      },
    ],
  },
  {
    key: 'settori',
    label: 'Settori',
    href: '/settori',
    feature: {
      title: 'Conosciamo tre mestieri, non tutti.',
      link: { label: 'Tutti i settori', href: '/settori' },
    },
    items: [
      {
        title: 'Hospitality',
        href: '/settori/hospitality',
        description: 'Agriturismi, hotel e strutture ricettive.',
      },
      {
        title: 'Cantine',
        href: '/settori/cantine',
        description: 'Cantine e aziende vitivinicole.',
      },
      {
        title: 'Frantoi',
        href: '/settori/frantoi',
        description: 'Frantoi e aziende olivicole.',
      },
    ],
  },
];

export const NAV_DIRECT = [{ label: 'Azienda', href: '/azienda' }];
