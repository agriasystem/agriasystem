'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_REOPEN_EVENT, hasValidConsent, saveConsent } from '@/lib/consent';

// Avviso cookie: il sito usa solo strumenti tecnici (nessuna statistica né
// profilazione), quindi non ci sono categorie da scegliere. La presa visione
// resta memorizzata 90 giorni (lib/consent.js); "Preferenze cookie" nel footer
// riapre l'avviso. Se un giorno si aggiunge uno strumento facoltativo, qui
// tornano le scelte e CONSENT_VERSION va incrementata.
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasValidConsent()) setVisible(true);
    const onReopen = () => setVisible(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  if (!visible) return null;

  function close() {
    saveConsent({});
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Informativa sui cookie"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-agria-border bg-agria-white shadow-[0_-8px_28px_rgb(var(--agria-graphite)/0.08)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-agria-sans text-agria-sm text-agria-graphite">
          <span className="font-medium">Solo cookie tecnici.</span>{' '}
          <span className="text-agria-grey">
            Il sito non usa strumenti di statistica né di profilazione. Dettagli nella{' '}
            <Link
              href="/cookie-policy"
              className="rounded-sm text-agria-green-dark underline underline-offset-4 hover:text-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark"
            >
              cookie policy
            </Link>
            .
          </span>
        </p>
        <button
          type="button"
          onClick={close}
          className="shrink-0 self-start rounded-full bg-agria-green-dark px-5 py-2.5 font-agria-sans text-agria-sm font-medium text-agria-white transition-colors hover:bg-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2 lg:self-auto"
        >
          Ho capito
        </button>
      </div>
    </div>
  );
}
