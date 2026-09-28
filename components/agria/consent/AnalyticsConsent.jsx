'use client';

import { useEffect } from 'react';
import { CONSENT_EVENT, getAnalyticsConsent } from '@/lib/consent';
import { disableAnalytics, enableAnalytics, trackContactClick, trackWhatsappClick } from '@/lib/analytics';

// Collega la scelta sui cookie a GA4: all'apertura del sito carica GA4 solo se
// il consenso è già stato dato; poi segue ogni cambio di scelta. Nel layout,
// quindi montato una sola volta per visita (la navigazione di Next non lo
// rimonta). Traccia anche i clic sui collegamenti marcati data-analytics="whatsapp"
// e, negli articoli (contenitore data-analytics-article), i clic verso /contatti.
export default function AnalyticsConsent() {
  useEffect(() => {
    if (getAnalyticsConsent() === 'granted') enableAnalytics();

    const onConsent = (event) => {
      if (event.detail?.analytics === 'granted') enableAnalytics();
      else disableAnalytics();
    };
    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      if (link.dataset.analytics === 'whatsapp') {
        trackWhatsappClick(link.dataset.analyticsLocation || 'sito');
        return;
      }
      const article = link.closest('[data-analytics-article]');
      if (article && new URL(link.href, window.location.href).pathname === '/contatti') {
        trackContactClick(link.dataset.analyticsLocation || 'article_inline', article.dataset.analyticsArticle);
      }
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
