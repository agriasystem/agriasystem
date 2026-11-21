'use client';

import { useEffect, useRef, useState } from 'react';

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
//
// Con `words` il componente lavora su una parola sola dentro il titolo
// (RotatingWord, sotto): stessa scrittura, un giro e poi fermo.
export default function RotatingHeadline({ words, ...props }) {
  if (words) return <RotatingWord words={words} {...props} />;
  return <RotatingSentence {...props} />;
}

function RotatingSentence({
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

// Parola che si riscrive dentro un titolo (homepage, Prompt 28):
// "Il vostro [sito], collegato a tutto il resto."
//
// - before e after: testo fisso; la parola sta su una riga sua, in una cella
//   larga quanto la parola più lunga (più `punct`, la punteggiatura che la
//   segue): il titolo non cambia misura mentre scrive (CLS zero).
// - Il testo del documento è uno solo: before + words[0] + punct + after. Mentre
//   scrive, la parola vera resta nel documento (trasparente) e le lettere
//   animate sono disegnate in CSS su uno strato aria-hidden.
// - Un giro completo (words[0] → … → ultima → words[0]), poi fermo; riparte al
//   passaggio del cursore sul titolo. Con prefers-reduced-motion resta su words[0].
// - wordClassName: colore della parola; punctClassName: colore della
//   punteggiatura disegnata mentre scrive (after:text-…, quello del titolo).
function RotatingWord({
  as: Tag = 'span',
  before,
  words,
  punct = '',
  after,
  wordClassName = '',
  punctClassName = '',
  className = '',
  ...props
}) {
  const [text, setText] = useState(words[0]);
  // parola completa: solo allora si disegna la punteggiatura (niente che si
  // sposta mentre scrive, vedi .agria-typing in globals.css)
  const [done, setDone] = useState(true);
  const [animating, setAnimating] = useState(false);
  const run = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let cancelled = false;
    let running = false;
    const wait = (ms) =>
      new Promise((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    async function round() {
      if (running || media.matches) return;
      running = true;
      setAnimating(true);
      const sequence = [...words.slice(1), words[0]];
      let current = words[0];
      for (const next of sequence) {
        await wait(HOLD_MS);
        setDone(false);
        for (let i = current.length; i >= 0 && !cancelled; i -= 1) {
          setText(current.slice(0, i));
          await wait(DELETE_MS);
        }
        await wait(GAP_MS);
        for (let i = 1; i <= next.length && !cancelled; i += 1) {
          setText(next.slice(0, i));
          await wait(TYPE_MS + Math.round((Math.random() - 0.5) * 50));
        }
        if (cancelled) return;
        setDone(true);
        current = next;
      }
      await wait(HOLD_MS / 2);
      running = false;
      setAnimating(false);
      setText(words[0]);
    }

    run.current = round;
    round();
    function onChange() {
      if (media.matches) {
        cancelled = true;
        clearTimeout(timer);
        running = false;
        setAnimating(false);
        setDone(true);
        setText(words[0]);
      } else {
        cancelled = false;
      }
    }
    media.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      run.current = null;
      media.removeEventListener('change', onChange);
    };
  }, [words]);

  return (
    <Tag className={className} onMouseEnter={() => run.current?.()} {...props}>
      {before}{' '}
      <span className="grid justify-start">
        {words.map((word) => (
          <span
            key={word}
            aria-hidden="true"
            data-text={`${word}${punct}`}
            className="invisible col-start-1 row-start-1 whitespace-nowrap before:content-[attr(data-text)]"
          />
        ))}
        <span className={`col-start-1 row-start-1 whitespace-nowrap ${animating ? 'opacity-0' : ''}`}>
          <span className={wordClassName}>{words[0]}</span>
          {punct}
        </span>
        {animating && (
          <span
            aria-hidden="true"
            data-text={text}
            data-punct={punct}
            data-done={done ? '' : undefined}
            className={`agria-typing col-start-1 row-start-1 whitespace-nowrap ${wordClassName} ${punctClassName}`}
          />
        )}
      </span>{' '}
      {after}
    </Tag>
  );
}
