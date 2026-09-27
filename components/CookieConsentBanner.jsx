'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CONSENT_REOPEN_EVENT,
  hasValidConsent,
  saveConsent,
} from '@/lib/consent';

const toggleableCategories = [
  {
    key: 'analytics',
    label: 'Analytics',
    body: 'Al momento non utilizziamo alcuno strumento di analytics. Se in futuro lo attiveremo, te lo chiederemo qui.',
  },
];

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState({ analytics: false });

  useEffect(() => {
    if (!hasValidConsent()) setVisible(true);

    function onReopen() {
      setExpanded(true);
      setVisible(true);
    }
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  function accept(categories) {
    saveConsent(categories);
    setVisible(false);
    setExpanded(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-paper border-t border-line shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-edge mx-auto px-6 py-6">
        {!expanded ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex-1">
              <p className="font-semibold text-ink text-sm">Usiamo i cookie, con misura.</p>
              <p className="mt-1 text-sm text-ink/65 leading-relaxed">
                Solo quelli essenziali sono sempre attivi. Il resto lo scegli tu — leggi la{' '}
                <Link href="/cookie-policy" className="underline hover:text-forest">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button type="button" onClick={() => setExpanded(true)} className="btn-ghost text-sm py-2.5">
                Personalizza
              </button>
              <button
                type="button"
                onClick={() => accept({ analytics: false })}
                className="btn-ghost text-sm py-2.5"
              >
                Rifiuta
              </button>
              <button
                type="button"
                onClick={() => accept({ analytics: true })}
                className="btn-solid text-sm py-2.5"
              >
                Accetta tutti
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-ink text-sm">Le tue preferenze cookie</p>
            <div className="mt-4 space-y-3">
              <div className="flex gap-3 items-start border border-line rounded-lg p-4 bg-paper-dim">
                <input type="checkbox" checked disabled className="mt-1 w-4 h-4 accent-forest" />
                <div>
                  <p className="text-sm font-semibold text-ink">Essenziali (sempre attivi)</p>
                  <p className="text-xs text-ink/60 mt-1">
                    Necessari per far funzionare il sito: memorizzano solo questa scelta e, per la durata della
                    visita, se il pannello dell’assistente è aperto.
                  </p>
                </div>
              </div>
              {toggleableCategories.map((c) => (
                <label
                  key={c.key}
                  className="flex gap-3 items-start border border-line rounded-lg p-4 cursor-pointer hover:border-ink/30"
                >
                  <input
                    type="checkbox"
                    checked={choices[c.key]}
                    onChange={(e) => setChoices((prev) => ({ ...prev, [c.key]: e.target.checked }))}
                    className="mt-1 w-4 h-4 accent-forest"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{c.label}</p>
                    <p className="text-xs text-ink/60 mt-1">{c.body}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => accept(choices)} className="btn-solid text-sm py-2.5">
                Salva preferenze
              </button>
              <button
                type="button"
                onClick={() => accept({ analytics: false })}
                className="btn-ghost text-sm py-2.5"
              >
                Rifiuta tutto
              </button>
              <button
                type="button"
                onClick={() => accept({ analytics: true })}
                className="btn-ghost text-sm py-2.5"
              >
                Accetta tutto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
