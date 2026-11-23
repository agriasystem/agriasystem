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
// (RotatingWord, sotto): stessa scrittura, in ciclo finché il titolo è nello schermo.
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

// Parola che si riscrive dentro un titolo (homepage, Prompt 28 e 30):
// "Il vostro [sito], collegato a tutto il resto."
//
// - before e after: testo fisso. La parola sta sulla riga di before, in una
//   cella in linea larga quanto la parola più lunga (più `punct`, la
//   punteggiatura che la segue); after va a capo. Il titolo non cambia misura
//   mentre scrive (CLS zero).
// - Il testo del documento è uno solo: before + words[0] + punct + after. Mentre
//   scrive, la parola vera resta nel documento (trasparente) e le lettere
//   animate sono disegnate in CSS su uno strato aria-hidden.
// - Gira in continuo (words[0] → … → ultima → words[0] → …) finché la sezione
//   che contiene il titolo è nello schermo e la scheda del browser è in primo
//   piano; quando esce si ferma su words[0], senza timer attivi, e quando
//   rientra riparte. Su tutti i dispositivi, senza bisogno del cursore. Con
//   prefers-reduced-motion resta su words[0].
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
  const ref = useRef(null);
  const [text, setText] = useState(words[0]);
  // parola completa: solo allora si disegna la punteggiatura (niente che si
  // sposta mentre scrive, vedi .agria-typing in globals.css)
  const [done, setDone] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const target = el.closest('section') ?? el;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer = 0;
    // ogni giro ha il suo numero: fermarsi vuol dire cambiarlo e cancellare il
    // timer in attesa, così il giro vecchio non riprende più
    let token = 0;
    let running = false;
    let inView = false;
    const wait = (ms) =>
      new Promise((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    async function loop(current) {
      let index = 0;
      while (true) {
        await wait(HOLD_MS);
        if (current !== token) return;
        const nextIndex = (index + 1) % words.length;
        const word = words[index];
        const next = words[nextIndex];
        setDone(false);
        for (let i = word.length; i >= 0; i -= 1) {
          setText(word.slice(0, i));
          await wait(DELETE_MS);
          if (current !== token) return;
        }
        await wait(GAP_MS);
        if (current !== token) return;
        for (let i = 1; i <= next.length; i += 1) {
          setText(next.slice(0, i));
          await wait(TYPE_MS + Math.round((Math.random() - 0.5) * 50));
          if (current !== token) return;
        }
        setDone(true);
        index = nextIndex;
      }
    }

    function start() {
      if (running) return;
      running = true;
      token += 1;
      setText(words[0]);
      setDone(true);
      setAnimating(true);
      loop(token);
    }

    function stop() {
      token += 1;
      clearTimeout(timer);
      if (!running) return;
      running = false;
      setAnimating(false);
      setDone(true);
      setText(words[0]);
    }

    function update() {
      if (inView && !media.matches && !document.hidden) start();
      else stop();
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            update();
          })
        : null;
    if (observer) observer.observe(target);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer?.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      token += 1;
      clearTimeout(timer);
    };
  }, [words]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {before}{' '}
      <span className="inline-grid justify-start">
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
      <br />
      {after}
    </Tag>
  );
}
