// =====================================================================
//  Integrazione HubSpot del modulo contatti (Prompt 15, fase B).
//  Identificativi del portale: non sono segreti, restano nel codice.
//  Segreti (token, chiave reCAPTCHA) solo in variabili d'ambiente.
//  Solo lato server: nessun componente client importa questo file.
// =====================================================================

export const HUBSPOT = {
  portalId: '149362651',
  formId: '131a0830-cc23-4255-9e4a-ac4be4ee2114',
  region: 'eu1',
  // Endpoint indicato nel prompt. Per i portali eu1 la community HubSpot e
  // molti progetti indicano api-eu1.hsforms.com: se il primo risponde 404,
  // la submission viene ripetuta una volta sull'host EU (vedi report 15).
  formsHosts: ['https://api.hsforms.com', 'https://api-eu1.hsforms.com'],
  apiHost: 'https://api.hubapi.com',
  // proprietario di contatto, azienda e trattativa: Alessandro Poponi
  owner: '37994989',
  deal: {
    pipeline: 'default',
    // fase iniziale per tipo di richiesta (tipo_richiesta_sito)
    stages: {
      'Ricevere maggiori informazioni': '6062102776', // Nuovo Lead
      'Fissare una videocall': '6062103741', // Appuntamento da Fissare
    },
    defaultStage: '6062102776',
    sourceProperty: 'fonte_lead_agria',
    sourceValue: 'Sito web',
    serviceProperty: 'servizio_di_interesse',
    name: (company) => `${company} — Opportunità da qualificare`,
  },
  // proprietà personalizzate del contatto, scritte anche via CRM (non solo
  // dalla submission): nome interno → campo del modulo
  contactProperties: {
    servizio_di_interesse_sito: 'servizio',
    tempistica_progetto: 'tempistica',
    tipo_richiesta_sito: 'preferenza',
    message: 'messaggio',
  },
};

// Calendario di Alessandro: destinazione dopo l'invio con "Fissare una videocall"
export const MEETINGS_URL = 'https://meetings-eu1.hubspot.com/alessandro-poponi';

// Valore del modulo → valore di servizio_di_interesse della trattativa
export const SERVICE_TO_DEAL = {
  'Realizzazione sito web': 'Digital Presence',
  'Realizzazione E-commerce': 'Digital Commerce',
  'Implementazioni AI / varie': 'Digital Automation',
  'Realizzazione Software / Products': 'Software / Products',
  'Non ancora definito': 'Non ancora definito',
};

// Tipi di associazione predefiniti HubSpot (Associations v4)
export const ASSOCIATION = {
  dealToContact: 3,
  dealToPrimaryCompany: 5,
};

// Oggetti CRM per i campi della Forms API: 0-1 contatto, 0-2 azienda
export const OBJECT = { contact: '0-1', company: '0-2' };

// reCAPTCHA v3
export const RECAPTCHA = {
  action: 'contact_form',
  verifyUrl: 'https://www.google.com/recaptcha/api/siteverify',
  // la chiave è registrata per agriasystem.com e localhost
  hostnames: ['agriasystem.com', 'www.agriasystem.com', 'localhost'],
  defaultMinScore: 0.5,
};

// Limite di richieste per indirizzo IP (per istanza del server)
export const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// Timeout e ripetizione delle chiamate esterne
export const HTTP = { timeoutMs: 8000, retryDelayMs: 700 };
