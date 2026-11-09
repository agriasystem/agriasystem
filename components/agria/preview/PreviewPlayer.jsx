'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './PreviewPlayer.module.css';

// Il contenuto delle finestre (ServicePreview, con i suoi stili) è un modulo a parte,
// scaricato una volta sola. Import gestito qui e non con next/dynamic: con il
// caricamento differito di React ogni livello aspettava circa 300 ms prima di
// comparire, anche con il file già scaricato. Così, una volta arrivato, il
// contenuto si monta subito. loadPreview: per scaricarlo in anticipo (menu).
let Content = null;
export function loadPreview() {
  return import('./ServicePreview').then((module) => (Content = module.default));
}

// Regia delle anteprime: la cornice è resa dal server con le proporzioni riservate,
// il contenuto si carica a 400 px dallo schermo. L'animazione è tutta CSS, qui si
// decide solo quando gira: una passata quando l'anteprima entra nello schermo,
// pausa se ne esce, poi resta sul fotogramma finale, senza cicli a riposo. Riparte
// al passaggio del cursore (solo puntatori fini) o quando il focus entra nel blocco.
// Con movimento ridotto si carica il contenuto e basta: il CSS mostra già il finale.
// label: descrizione della finestra (role="img").
export default function PreviewPlayer({ kind, label, children, className = '' }) {
  const frameRef = useRef(null);
  const done = useRef(false);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Loaded, setLoaded] = useState(() => Content);
  // cambia la key del contenuto: rimontato, riparte da capo
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!near || Loaded) return undefined;
    let alive = true;
    loadPreview()
      .then((component) => alive && setLoaded(() => component))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [near, Loaded]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return undefined;
    }
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    nearObserver.observe(frame);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => nearObserver.disconnect();
    const playObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    playObserver.observe(frame);
    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  function replay() {
    if (!done.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    done.current = false;
    setRun((n) => n + 1);
  }

  return (
    <div
      className={className}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) replay();
      }}
      onFocus={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) replay();
      }}
    >
      <div
        ref={frameRef}
        role="img"
        aria-label={label}
        data-nosnippet=""
        data-play={visible ? '' : undefined}
        className={styles.frame}
        onAnimationEnd={(event) => {
          if (event.target.hasAttribute('data-last')) done.current = true;
        }}
      >
        {near && Loaded && (
          <Fragment key={run}>
            <Loaded kind={kind} />
          </Fragment>
        )}
      </div>
      {children}
    </div>
  );
}
