'use client';

import { useEffect, useState } from 'react';

const TYPE_MS = 85; // velocità di scrittura per carattere (± variazione naturale)
const DELETE_MS = 42; // velocità di cancellazione
const HOLD_MS = 2400; // pausa a parola completa
const GAP_MS = 380; // pausa a parola cancellata, prima di riscrivere

// Titolo con parte finale che si cancella e si riscrive in ciclo (macchina da scrivere).
//
// - Una sola rappresentazione testuale: la frase predefinita (prefix +
//   phrases[0] + suffix) è testo vero, visibile nell'HTML del server, senza
//   JavaScript e con prefers-reduced-motion. Mentre l'animazione gira resta
//   nel documento per screen reader e motori di ricerca (sr-only).
// - La parte animata è solo grafica: lettere disegnate in CSS
//   (content: attr(...)) su uno strato aria-hidden, quindi nessun testo in più
//   nel documento.
// - Nessun salto di layout: ogni variante occupa la stessa cella di una griglia
//   tramite un segnaposto invisibile generato in CSS, quindi l'altezza è quella
//   della variante più lunga.
export default function RotatingHeadline({
  as: Tag = 'span',
  prefix = '',
  phrases,
  suffix = '',
  className = '',
  ...props
}) {
  const [text, setText] = useState(phrases[0]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let cancelled = false;

    function stop() {
      cancelled = true;
      clearTimeout(timer);
      setAnimating(false);
      setText(phrases[0]);
    }

    function wait(ms) {
      return new Promise((resolve) => {
        timer = setTimeout(resolve, ms);
      });
    }

    async function run() {
      let index = 0;
      setAnimating(true);
      while (!cancelled) {
        await wait(HOLD_MS);
        const current = phrases[index];
        for (let i = current.length; i >= 0 && !cancelled; i -= 1) {
          setText(current.slice(0, i));
          await wait(DELETE_MS);
        }
        await wait(GAP_MS);
        index = (index + 1) % phrases.length;
        const next = phrases[index];
        for (let i = 1; i <= next.length && !cancelled; i += 1) {
          setText(next.slice(0, i));
          await wait(TYPE_MS + Math.round((Math.random() - 0.5) * 50));
        }
      }
    }

    function onChange() {
      if (media.matches) {
        stop();
      } else {
        cancelled = false;
        run();
      }
    }

    if (!media.matches) run();
    media.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      media.removeEventListener('change', onChange);
    };
  }, [phrases]);

  return (
    <Tag className={`grid ${className}`} {...props}>
      {phrases.map((phrase) => (
        <span
          key={phrase}
          aria-hidden="true"
          data-text={`${prefix}${phrase}${suffix}`}
          className="invisible col-start-1 row-start-1 before:content-[attr(data-text)]"
        />
      ))}
      <span className={animating ? 'sr-only' : 'col-start-1 row-start-1'}>{`${prefix}${phrases[0]}${suffix}`}</span>
      {animating && (
        <span
          aria-hidden="true"
          data-text={`${prefix}${text}`}
          data-suffix={suffix}
          className="col-start-1 row-start-1 before:content-[attr(data-text)] after:content-[attr(data-suffix)]"
        >
          <span className="agria-caret" />
        </span>
      )}
    </Tag>
  );
}
