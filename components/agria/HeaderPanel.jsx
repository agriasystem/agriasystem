'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Eyebrow } from './ui';

const ITEM_LINK =
  'block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-inset';

// voce del pannello: titolo e descrizione
function PanelLink({ item }) {
  return (
    <Link href={item.href} className={ITEM_LINK}>
      <span className="block font-agria-sans text-agria-sm font-medium text-agria-on-dark">{item.title}</span>
      <span className="mt-0.5 block font-agria-sans text-agria-sm text-agria-on-dark-muted">{item.description}</span>
    </Link>
  );
}

export default function HeaderPanel({ panel, isOpen, onOpen, onClose, onToggle, active }) {
  const triggerRef = useRef(null);
  const panelId = `agria-panel-${panel.key}`;

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      onClose();
      triggerRef.current?.focus();
      return;
    }
    if (event.key === 'ArrowDown' && document.activeElement === triggerRef.current) {
      event.preventDefault();
      onOpen();
      requestAnimationFrame(() => {
        document.getElementById(panelId)?.querySelector('a')?.focus();
      });
    }
  }

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex items-center gap-1 rounded-full px-3 py-2 font-agria-sans text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink ${
          active || isOpen ? 'text-agria-on-dark' : 'text-agria-on-dark-muted hover:text-agria-on-dark'
        } ${active ? 'font-medium' : ''}`}
      >
        {panel.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-150 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="group"
          aria-label={panel.label}
          className="absolute left-1/2 top-full z-10 mt-3 w-[320px] -translate-x-1/2 rounded-2xl border border-white/10 bg-agria-ink p-2 shadow-[0_24px_58px_rgb(0_0_0/0.45)] lg:grid lg:w-[640px] lg:grid-cols-[1fr_236px] lg:gap-2"
        >
          <div>
            {panel.items.map((item) => (
              <PanelLink key={item.href} item={item} />
            ))}
            {/* secondo gruppo (Soluzioni): sotto le voci, con il suo titolo, sempre visibile */}
            {panel.group && (
              <div role="group" aria-labelledby={`${panelId}-group`} className="mt-1 border-t border-white/10 pt-2">
                <Eyebrow id={`${panelId}-group`} onDark className="px-4 pb-1 pt-2">
                  {panel.group.title}
                </Eyebrow>
                {panel.group.items.map((item) => (
                  <PanelLink key={item.href} item={item} />
                ))}
              </div>
            )}
            {/* sotto lg la card di evidenza è nascosta: il suo link resta qui (indice della sezione) */}
            {panel.feature && (
              <Link
                href={panel.feature.link.href}
                className="flex items-center gap-1.5 rounded-xl px-4 py-3 font-agria-sans text-agria-sm font-medium text-agria-green-bright transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-inset lg:hidden"
              >
                {panel.feature.link.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {/* card di evidenza: solo da lg, dove il pannello ha spazio per due colonne */}
          {panel.feature && (
            <div className="relative isolate hidden flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 p-5 lg:flex">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(90% 80% at 0% 0%, rgb(var(--agria-green-bright) / 0.2), transparent 70%), radial-gradient(80% 70% at 100% 100%, rgb(var(--agria-green) / 0.3), transparent 70%)',
                }}
              />
              <p className="font-agria-sans text-agria-lg font-light leading-snug text-agria-on-dark">
                {panel.feature.title}
              </p>
              <Link
                href={panel.feature.link.href}
                className="group inline-flex items-center gap-1.5 self-start rounded-sm font-agria-sans text-agria-sm font-medium text-agria-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink"
              >
                {panel.feature.link.label}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
