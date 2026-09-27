// Consenso cookie: solo localStorage, niente cookie HttpOnly né endpoint
// server — nessuna pagina legge il consenso lato server, quindi quella
// parte dell'infrastruttura non avrebbe uno scopo reale qui.
// CONSENT_VERSION: incrementarla forza un nuovo banner quando cambiano le
// categorie trattate (es. si attiva un nuovo strumento di analytics).

const STORAGE_KEY = 'mg_cookie_consent_v1';
const CONSENT_VERSION = 3; // 2: tolta la categoria Calendly; 3: tolta Analytics (solo tecnici)
const EXPIRY_DAYS = 90;

export const CONSENT_EVENT = 'mg-consent-changed';
export const CONSENT_REOPEN_EVENT = 'mg-consent-reopen';

export const CONSENT_CATEGORIES = {
  essential: { label: 'Essenziali', locked: true },
};

function readRaw() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getConsent() {
  const stored = readRaw();
  if (!stored || stored.version !== CONSENT_VERSION) return null;

  const ageDays = (Date.now() - stored.timestamp) / (1000 * 60 * 60 * 24);
  if (ageDays > EXPIRY_DAYS) return null;

  return stored;
}

export function hasValidConsent() {
  return getConsent() !== null;
}

export function isCategoryAllowed(category) {
  if (CONSENT_CATEGORIES[category]?.locked) return true;
  return getConsent()?.categories?.[category] === true;
}

export function saveConsent(categories) {
  const consent = {
    version: CONSENT_VERSION,
    timestamp: Date.now(),
    categories: { essential: true, ...categories },
  };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // localStorage non disponibile: il banner ricomparirà al prossimo giro.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  }
  return consent;
}

export function reopenConsentBanner() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT));
  }
}
