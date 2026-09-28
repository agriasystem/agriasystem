'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_REOPEN_EVENT, getAnalyticsConsent, setAnalyticsConsent } from '@/lib/consent';

const LINK =
  'rounded-sm text-agria-green-dark underline underline-offset-4 hover:text-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark';
// stesse dimensioni, stesso peso: nessuna scelta messa in evidenza
const ACTION =
  'rounded-full border border-agria-graphite bg-agria-white px-5 py-2.5 font-agria-sans text-agria-sm font-medium text-agria-graphite transition-colors hover:bg-agria-graphite hover:text-agria-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2';

// Avviso cookie: strumenti tecnici sempre attivi, statistiche (GA4) solo con
// consenso. Nessuna preselezione; finché non si sceglie, GA4 non si carica.
// "Preferenze cookie" nel footer riapre l'avviso per cambiare la scelta.
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const choice = getAnalyticsConsent();
    setCurrent(choice);
    if (!choice) setVisible(true);
    const onReopen = () => {
      setCurrent(getAnalyticsConsent());
      setVisible(true);
    };
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  if (!visible) return null;

  function choose(value) {
    setAnalyticsConsent(value);
    setCurrent(value);
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-agria-border bg-agria-white shadow-[0_-8px_28px_rgb(var(--agria-graphite)/0.08)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="font-agria-sans text-agria-sm text-agria-graphite">
          <p>
            Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo consenso, strumenti statistici per
            capire come viene utilizzato il sito e migliorarlo.
          </p>
          <p className="mt-1 text-agria-grey">
            <Link href="/cookie-policy" className={LINK}>
              Cookie policy
            </Link>{' '}
            ·{' '}
            <Link href="/privacy-policy" className={LINK}>
              Privacy policy
            </Link>
            {current && (
              <span>
                {' '}
                · Scelta attuale: statistiche {current === 'granted' ? 'accettate' : 'rifiutate'}
              </span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={() => choose('denied')} className={ACTION}>
            Rifiuta
          </button>
          <button type="button" onClick={() => choose('granted')} className={ACTION}>
            Accetta statistiche
          </button>
        </div>
      </div>
    </div>
  );
}
