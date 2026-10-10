'use client';

import { useEffect, useId, useRef, useState } from 'react';

// Schede con barra di avanzamento a tempo: allo scadere passa alla scheda successiva.
//
// - Il tempo è un'animazione CSS sulla barra (agria-progress): alla fine
//   dell'animazione si passa alla scheda seguente, niente timer.
// - Pausa: cursore sopra il blocco, focus dentro il blocco, pulsante Pausa
//   (WCAG 2.2.2, necessario anche su touch). Scegliere una scheda ferma la
//   rotazione definitivamente.
// - Con prefers-reduced-motion la rotazione non parte e non c'è barra.
// - Senza JavaScript tutti i pannelli sono visibili uno sotto l'altro
//   (vedi [data-autotabs] in globals.css).
// - Tastiera: frecce sinistra/destra, Home, End (pattern WAI-ARIA Tabs).
export default function AutoTabs({ items, label, duration = 7000, className = '' }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const tabRefs = useRef([]);
  const baseId = useId();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAutoplay(!media.matches);
    function onChange() {
      if (media.matches) setAutoplay(false);
    }
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const paused = hovered || focused || userPaused;

  function select(index, { moveFocus = false } = {}) {
    setActive(index);
    setAutoplay(false);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function onKeyDown(event, index) {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(next, { moveFocus: true });
  }

  function onProgressEnd() {
    setActive((current) => (current + 1) % items.length);
  }

  return (
    <div
      data-autotabs=""
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="flex items-end gap-4 border-b border-agria-border">
        <div role="tablist" aria-label={label} className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id ?? index}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`relative shrink-0 rounded-t-lg px-4 pb-3.5 pt-3 font-agria-sans text-agria-body font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-agria-green-dark ${
                  selected ? 'text-agria-graphite' : 'text-agria-grey hover:text-agria-graphite'
                }`}
              >
                {item.label}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-transparent">
                  {selected && !autoplay && <span className="block h-full w-full bg-agria-green-dark" />}
                  {selected && autoplay && (
                    <span
                      key={active}
                      className="agria-progress block h-full w-full origin-left bg-agria-green-dark"
                      style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={onProgressEnd}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        {autoplay && (
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={userPaused ? 'Riprendete la rotazione delle schede' : 'Mettete in pausa la rotazione delle schede'}
            className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-agria-border text-agria-graphite transition-colors hover:border-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2"
          >
            {userPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}
      </div>

      {items.map((item, index) => (
        <div
          key={item.id ?? index}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          tabIndex={0}
          className="pt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="2.6" height="9" rx="0.6" />
      <rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M3 1.8v8.4a.6.6 0 0 0 .9.5l6.6-4.2a.6.6 0 0 0 0-1L3.9 1.3a.6.6 0 0 0-.9.5Z" />
    </svg>
  );
}
