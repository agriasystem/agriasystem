'use client';

import { useId, useRef, useState } from 'react';

// Reparti come schede verticali (da md): a sinistra i quattro reparti
// (tablist), a destra la scheda aperta con le tre voci. Da tastiera: frecce su
// e giù (anche sinistra e destra), Home e Fine; il focus segue la selezione.
// Sotto md la stessa sezione usa una fisarmonica (DepartmentsSection).
export function DepartmentPanel({ item, labels }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <p className="font-agria-mono text-agria-label uppercase text-agria-green-dark">{labels.auto}</p>
        <p className="mt-2 font-agria-sans text-agria-body text-agria-graphite">{item.auto}</p>
      </div>
      <div>
        <p className="font-agria-mono text-agria-label uppercase text-agria-green-dark">{labels.tools}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-agria-border px-3 py-1 font-agria-mono text-agria-label uppercase text-agria-graphite"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-agria-mono text-agria-label uppercase text-agria-green-dark">{labels.first}</p>
        <p className="mt-2 font-agria-sans text-agria-body text-agria-graphite">{item.first}</p>
      </div>
    </div>
  );
}

export default function DepartmentTabs({ items, labels }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabs = useRef([]);

  function select(index) {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event) {
    const keys = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: items.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key]);
  }

  return (
    <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-[18px]">
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2" onKeyDown={onKeyDown}>
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.key}
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
              {item.title}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => (
        <div
          key={item.key}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          tabIndex={0}
          className="rounded-agria-card border border-agria-border bg-agria-white p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark"
        >
          <h3 className="sr-only">{item.title}</h3>
          <DepartmentPanel item={item} labels={labels} />
        </div>
      ))}
    </div>
  );
}
