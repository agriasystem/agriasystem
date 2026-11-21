'use client';

import { Children, useId, useRef, useState } from 'react';

// Schede verticali selezionabili (pagine servizio, "Per il vostro mestiere"), come
// i reparti della homepage: a sinistra i titoli (tablist), a destra il pannello
// aperto. I pannelli arrivano già resi dal server (children, uno per titolo).
// Da tastiera: frecce su e giù (anche sinistra e destra), Home e Fine; il focus
// segue la selezione. Sotto md la sezione usa una fisarmonica (ServicePage).
export default function SectorTabs({ titles, children }) {
  const panels = Children.toArray(children);
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabs = useRef([]);

  function select(index) {
    const next = (index + titles.length) % titles.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event) {
    const keys = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: titles.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key]);
  }

  return (
    <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-[18px]">
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2" onKeyDown={onKeyDown}>
        {titles.map((title, index) => {
          const selected = index === active;
          return (
            <button
              key={title}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`rounded-2xl border px-5 py-4 text-left font-agria-sans text-agria-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2 focus-visible:ring-offset-agria-offwhite motion-reduce:transition-none ${
                selected
                  ? 'border-agria-green-dark bg-agria-white text-agria-graphite'
                  : 'border-agria-border bg-transparent text-agria-grey hover:border-agria-graphite/40 hover:text-agria-graphite'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
      {panels.map((panel, index) => (
        <div
          key={titles[index]}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          tabIndex={0}
          className="rounded-agria-card border border-agria-border bg-agria-white p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
