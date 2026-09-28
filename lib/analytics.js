// Google Analytics 4 con gtag.js, in Consent Mode base: gtag.js si carica
// solo dopo il consenso agli strumenti statistici (lib/consent.js) e una sola
// volta per visita. Identificativo: NEXT_PUBLIC_GA_MEASUREMENT_ID.
// I cambi di pagina di Next li rileva la misurazione avanzata dello stream
// (cronologia del browser): qui nessun page_view manuale, quindi nessun doppione.
// Mai dati personali nei parametri degli eventi: solo valori di scelta.

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const DENIED = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

let loaded = false;
let enabled = false;

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

// Consenso dato: consenso predefinito tutto negato, poi solo analytics_storage
// concesso; al primo consenso carica gtag.js e configura la proprietà.
export function enableAnalytics() {
  if (!GA_ID || typeof window === 'undefined') return;
  window[`ga-disable-${GA_ID}`] = false;
  window.gtag = window.gtag || gtag;
  if (!loaded) {
    loaded = true;
    window.gtag('consent', 'default', DENIED);
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(script);
  } else {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
  enabled = true;
}

// Consenso revocato: stato negato, nessun invio successivo, cookie GA rimossi.
export function disableAnalytics() {
  if (!GA_ID || typeof window === 'undefined') return;
  enabled = false;
  window[`ga-disable-${GA_ID}`] = true;
  if (loaded && typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
  removeGaCookies();
}

// Cookie _ga e _ga_<ID> sul dominio del sito e sui domini superiori; i cookie
// tecnici non vengono toccati.
function removeGaCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  const parts = window.location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i += 1) domains.push(`; domain=.${parts.slice(i).join('.')}`);
  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
  }
}

export function trackEvent(name, params = {}) {
  if (!enabled || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// Valore del modulo → parametri ammessi per generate_lead
const REQUEST_TYPE = { 'Ricevere maggiori informazioni': 'information', 'Fissare una videocall': 'videocall' };
const SERVICE_CATEGORY = {
  'Realizzazione sito web': 'digital_presence',
  'Realizzazione E-commerce': 'digital_commerce',
  'Implementazioni AI / varie': 'digital_automation',
  'Realizzazione Software / Products': 'software_products',
  'Non ancora definito': 'undefined',
};

// Richiesta accettata dal server (chiamare solo dopo la risposta positiva).
export function trackLead({ preference, service }) {
  trackEvent('generate_lead', {
    request_type: REQUEST_TYPE[preference] || 'information',
    service_category: SERVICE_CATEGORY[service] || 'undefined',
  });
}

// Prima interazione con il modulo contatti (una volta per pagina). Nome
// proprio: form_start è già usato dalla misurazione avanzata dello stream.
export function trackFormStart() {
  trackEvent('contact_form_start', { form_name: 'contatti' });
}

// Clic su un collegamento WhatsApp; location: 'contatti' | 'assistente'.
export function trackWhatsappClick(location) {
  trackEvent('whatsapp_click', { location });
}
