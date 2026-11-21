'use client';

import { useEffect, useRef, useState } from 'react';

// Passi di "Come lavoriamo" su una linea verticale: il cerchietto di ogni
// passo si accende quando il passo entra nello schermo, una volta sola, poi
// resta acceso. Fotogramma finale (tutti accesi) nell'HTML del server, senza
// JavaScript e con prefers-reduced-motion; si spengono, per accendersi
// scorrendo, solo i passi ancora sotto lo schermo al caricamento.
export default function MethodSteps({ steps }) {
  const listRef = useRef(null);
  const [lit, setLit] = useState(() => steps.map(() => true));

  useEffect(() => {
    const list = listRef.current;
    if (!list || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const items = [...list.children];
    const below = items.map((el) => el.getBoundingClientRect().top > window.innerHeight * 0.75);
    if (!below.some(Boolean)) return undefined;
    setLit(below.map((b) => !b));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = items.indexOf(entry.target);
          setLit((current) => current.map((value, i) => value || i === index));
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -25% 0px' }
    );
    items.forEach((el, i) => below[i] && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={listRef} className="relative flex flex-col gap-10">
      {/* la linea verticale passa dietro i cerchietti */}
      <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-agria-border" />
      {steps.map((step, index) => (
        <li key={step.number} data-lit={lit[index]} className="group relative grid grid-cols-[40px_minmax(0,1fr)] gap-5">
          <span
            aria-hidden="true"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-agria-border bg-agria-white font-agria-mono text-agria-sm text-agria-grey transition-colors duration-500 group-data-[lit=true]:border-agria-green-dark group-data-[lit=true]:bg-agria-green-dark group-data-[lit=true]:text-agria-white motion-reduce:transition-none"
          >
            {step.number}
          </span>
          <div className="pt-1.5">
            <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">
              <span className="sr-only">{step.number}. </span>
              {step.title}
            </h3>
            <p className="mt-1.5 font-agria-mono text-agria-label uppercase text-agria-green-dark">{step.label}</p>
            <p className="mt-3 max-w-[56ch] font-agria-sans text-agria-md text-agria-grey">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
