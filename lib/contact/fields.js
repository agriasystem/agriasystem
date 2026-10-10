// =====================================================================
//  Modulo contatti: campi, valori ammessi, limiti e validazione.
//  Unica fonte per il browser (components/agria/contatti/ContactForm.jsx)
//  e per il server (app/api/contact, Prompt 15 fase B): i value sono
//  quelli inviati a HubSpot e non vanno cambiati senza aggiornare le
//  proprietà corrispondenti nel CRM. label, icon e description sono solo
//  per l'interfaccia. hidden: valore ancora accettato dal server (record già
//  in HubSpot) ma non più mostrato nel modulo.
// =====================================================================

export const SECTORS = [
  { value: 'Hospitality', label: 'Hospitality', description: 'Agriturismi, hotel, relais', icon: 'key' },
  { value: 'Cantina / Vitivinicolo', label: 'Cantina', description: 'Cantine e aziende vitivinicole', icon: 'ticket' },
  { value: 'Frantoio / Olivicolo', label: 'Frantoio', description: 'Frantoi e aziende olivicole', icon: 'sprout' },
  { value: 'Altro', label: 'Altro', icon: 'grid' },
];

export const SERVICES = [
  { value: 'Realizzazione sito web', icon: 'layout' },
  { value: 'Realizzazione E-commerce', icon: 'cart' },
  { value: 'Implementazioni AI / varie', label: 'Automazione e integrazione dei sistemi', icon: 'sparkles' },
  // stessa etichetta della voce sopra: nascosta, il valore resta accettato
  { value: 'Realizzazione Software / Products', label: 'Automazione e integrazione dei sistemi', icon: 'code', hidden: true },
  { value: 'Non ancora definito', icon: 'chat' },
];

export const TIMINGS = ['Il prima possibile', '1-3 mesi', '3-6 mesi', 'Oltre 6 mesi', 'Da definire'];

export const PREFERENCES = [
  {
    value: 'Fissare una videocall',
    description: 'Dopo l’invio scegliete giorno e ora nel calendario.',
    icon: 'calendar',
  },
  {
    value: 'Ricevere maggiori informazioni',
    description: 'Vi ricontattiamo noi, per email o per telefono.',
    icon: 'mail',
  },
];

export const BOOKING_PREFERENCE = 'Fissare una videocall';

// Prefissi internazionali: Italia per prima (predefinito), poi i paesi più
// vicini ai mercati dei clienti. value è il prefisso inviato.
export const PHONE_PREFIXES = [
  { value: '+39', label: 'Italia +39' },
  { value: '+378', label: 'San Marino +378' },
  { value: '+41', label: 'Svizzera +41' },
  { value: '+33', label: 'Francia +33' },
  { value: '+49', label: 'Germania +49' },
  { value: '+43', label: 'Austria +43' },
  { value: '+34', label: 'Spagna +34' },
  { value: '+351', label: 'Portogallo +351' },
  { value: '+44', label: 'Regno Unito +44' },
  { value: '+353', label: 'Irlanda +353' },
  { value: '+32', label: 'Belgio +32' },
  { value: '+31', label: 'Paesi Bassi +31' },
  { value: '+352', label: 'Lussemburgo +352' },
  { value: '+45', label: 'Danimarca +45' },
  { value: '+46', label: 'Svezia +46' },
  { value: '+47', label: 'Norvegia +47' },
  { value: '+358', label: 'Finlandia +358' },
  { value: '+48', label: 'Polonia +48' },
  { value: '+420', label: 'Repubblica Ceca +420' },
  { value: '+386', label: 'Slovenia +386' },
  { value: '+385', label: 'Croazia +385' },
  { value: '+30', label: 'Grecia +30' },
  { value: '+356', label: 'Malta +356' },
  { value: '+1', label: 'Stati Uniti e Canada +1' },
  { value: '+61', label: 'Australia +61' },
];
export const DEFAULT_PREFIX = '+39';

export const LIMITS = {
  azienda: 120,
  messaggio: 2000,
  nome: 60,
  cognome: 60,
  email: 254,
};

// Campo trappola per i bot: nascosto a persone e tecnologie assistive.
export const HONEYPOT = 'sito_web';

export const EMPTY_VALUES = {
  settore: '',
  azienda: '',
  servizio: '',
  tempistica: '',
  messaggio: '',
  nome: '',
  cognome: '',
  email: '',
  prefisso: DEFAULT_PREFIX,
  telefono: '',
  preferenza: '',
  privacy: false,
  [HONEYPOT]: '',
};

// Passi del modulo: titolo, campi e ordine di validazione.
export const STEPS = [
  { key: 'azienda', title: "L'azienda", fields: ['settore', 'azienda'] },
  { key: 'progetto', title: 'Il progetto', fields: ['servizio', 'tempistica', 'messaggio'] },
  { key: 'contatti', title: 'I contatti', fields: ['nome', 'cognome', 'email', 'telefono', 'preferenza', 'privacy'] },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^[0-9\s./()-]+$/;
const text = (value) => (typeof value === 'string' ? value.trim() : '');
const allowed = (list, value) => list.some((item) => (typeof item === 'string' ? item : item.value) === value);

// Messaggi d'errore per campo (italiano, sotto il campo).
const RULES = {
  settore: (v) => (allowed(SECTORS, v.settore) ? null : 'Scegli il settore della tua azienda.'),
  azienda: (v) => {
    const value = text(v.azienda);
    if (!value) return 'Inserisci il nome della tua azienda.';
    if (value.length > LIMITS.azienda) return `Massimo ${LIMITS.azienda} caratteri.`;
    return null;
  },
  servizio: (v) => (allowed(SERVICES, v.servizio) ? null : 'Scegli di cosa hai bisogno.'),
  tempistica: (v) => (allowed(TIMINGS, v.tempistica) ? null : 'Scegli quando vorresti partire.'),
  messaggio: (v) => (text(v.messaggio).length > LIMITS.messaggio ? `Massimo ${LIMITS.messaggio} caratteri.` : null),
  nome: (v) => {
    const value = text(v.nome);
    if (!value) return 'Inserisci il nome.';
    if (value.length > LIMITS.nome) return `Massimo ${LIMITS.nome} caratteri.`;
    return null;
  },
  cognome: (v) => {
    const value = text(v.cognome);
    if (!value) return 'Inserisci il cognome.';
    if (value.length > LIMITS.cognome) return `Massimo ${LIMITS.cognome} caratteri.`;
    return null;
  },
  email: (v) => {
    const value = text(v.email);
    if (!value) return "Inserisci l'indirizzo email.";
    if (value.length > LIMITS.email || !EMAIL.test(value)) return 'Controlla l’indirizzo email: sembra incompleto.';
    return null;
  },
  telefono: (v) => {
    const value = text(v.telefono);
    if (!allowed(PHONE_PREFIXES, v.prefisso)) return 'Scegli il prefisso internazionale.';
    if (!value) return 'Inserisci il numero di telefono.';
    const digits = value.replace(/\D/g, '');
    if (!PHONE_CHARS.test(value) || digits.length < 6 || digits.length > 14) return 'Controlla il numero: solo cifre, da 6 a 14.';
    return null;
  },
  preferenza: (v) => (allowed(PREFERENCES, v.preferenza) ? null : 'Scegli come preferisci proseguire.'),
  privacy: (v) => (v.privacy === true ? null : 'Serve il consenso per poterti ricontattare.'),
};

// Errori dei campi indicati: { campo: messaggio } (vuoto se tutto è valido).
export function validateFields(values, fields) {
  return fields.reduce((errors, field) => {
    const message = RULES[field]?.(values);
    if (message) errors[field] = message;
    return errors;
  }, {});
}

export const validateStep = (values, index) => validateFields(values, STEPS[index].fields);
export const validateAll = (values) => validateFields(values, Object.keys(RULES));

// Numero completo in formato internazionale: "+39 333 1234567" → "+393331234567".
export const fullPhone = (values) => `${values.prefisso}${text(values.telefono).replace(/\D/g, '')}`;
