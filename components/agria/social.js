// Profili social di Agria System: unico punto di configurazione, usato dal
// footer (icone) e dai dati strutturati Organization (sameAs).
// Si pubblica solo un profilo che esiste davvero: Facebook resta spento
// finché il profilo non esiste. key: icona in SocialIcon.jsx.
export const SOCIAL = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/agriasystem' },
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/agriasystem' },
  // { key: 'facebook', label: 'Facebook', href: 'https://facebook.com/agriasystem' },
];

// URL dei profili per la proprietà sameAs di Organization
export const SAME_AS = SOCIAL.map((profile) => profile.href);
