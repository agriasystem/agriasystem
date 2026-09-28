'use client';

import { useEffect } from 'react';
import { CONSENT_EVENT, getAnalyticsConsent } from '@/lib/consent';
import { disableAnalytics, enableAnalytics, trackWhatsappClick } from '@/lib/analytics';

// Collega la scelta sui cookie a GA4: all'apertura del sito carica GA4 solo se
// il consenso è già stato dato; poi segue ogni cambio di scelta. Nel layout,
// quindi montato una sola volta per visita (la navigazione di Next non lo
// rimonta). Traccia anche i clic sui collegamenti marcati data-analytics="whatsapp".
export default function AnalyticsConsent() {
  useEffect(() => {
    if (getAnalyticsConsent() === 'granted') enableAnalytics();

    const onConsent = (event) => {
      if (event.detail?.analytics === 'granted') enableAnalytics();
      else disableAnalytics();
    };
    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[data-analytics="whatsapp"]') : null;
      if (link) trackWhatsappClick(link.dataset.analyticsLocation || 'sito');
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return null;
}
