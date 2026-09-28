// Consenso agli strumenti statistici (GA4), salvato in forma minimale nel
// browser: localStorage "analytics_consent" = "granted" | "denied". Nessun
// valore = scelta non ancora fatta: l'avviso resta visibile e GA4 non si carica.
// Gli strumenti tecnici non dipendono da questa scelta.

const STORAGE_KEY = 'analytics_consent';
// chiave del vecchio avviso (solo tecnico): rimossa alla prima lettura
const LEGACY_KEY = 'mg_cookie_consent_v1';

export const CONSENT_EVENT = 'agria-consent-changed';
export const CONSENT_REOPEN_EVENT = 'agria-consent-reopen';

export function getAnalyticsConsent() {
  if (typeof window === 'undefined') return null;
  try {
    localStorage.removeItem(LEGACY_KEY);
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function hasValidConsent() {
  return getAnalyticsConsent() !== null;
}

// Categorie: "essential" sempre attiva, "analytics" solo con consenso.
export function isCategoryAllowed(category) {
  if (category === 'essential') return true;
  return category === 'analytics' && getAnalyticsConsent() === 'granted';
}

export function setAnalyticsConsent(value) {
  if (typeof window === 'undefined' || (value !== 'granted' && value !== 'denied')) return;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage non disponibile: la scelta vale solo per questa pagina.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { analytics: value } }));
}

export function reopenConsentBanner() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT));
}
