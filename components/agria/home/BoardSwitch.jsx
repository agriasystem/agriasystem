'use client';

import { useState } from 'react';
import styles from './HomeHero.module.css';

// Interruttore dello schema "Come funziona": porta la tavola (resa dal server,
// id boardId) da "Oggi" a "Con Agria" e ritorno, con la didascalia dello stato.
// "↻ rivedi" fa ripartire la sequenza: riavvia le animazioni CSS della tavola.
// Senza JavaScript l'interruttore è nascosto e la tavola resta su "Oggi".
export default function BoardSwitch({ boardId, states, captions, replay }) {
  const [connected, setConnected] = useState(false);

  function toggle() {
    const next = !connected;
    setConnected(next);
    document.getElementById(boardId)?.setAttribute('data-state', next ? 'after' : 'before');
  }

  function rewatch() {
    const board = document.getElementById(boardId);
    if (!board || typeof CSSAnimation === 'undefined') return;
    for (const animation of board.getAnimations({ subtree: true })) {
      if (animation instanceof CSSAnimation) {
        animation.cancel();
        animation.play();
      }
    }
  }

  return (
    <div className={`${styles.switchArea} flex flex-col items-start gap-4`}>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          role="switch"
          aria-checked={connected}
          aria-label={states.after}
          aria-controls={boardId}
          onClick={toggle}
          className={`${styles.switch} rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-4 focus-visible:ring-offset-agria-offwhite`}
        >
          <span className={styles.switchLabel} data-active={!connected || undefined}>
            {states.before}
          </span>
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
          <span className={styles.switchLabel} data-active={connected || undefined}>
            {states.after}
          </span>
        </button>
        {connected && (
          <button
            type="button"
            onClick={rewatch}
            className="rounded-full border border-agria-border bg-agria-white px-4 py-2 font-agria-mono text-agria-sm text-agria-graphite transition-colors hover:border-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2 focus-visible:ring-offset-agria-offwhite"
          >
            {replay}
          </button>
        )}
      </div>
      <p aria-live="polite" className="font-agria-sans text-agria-md italic text-agria-grey">
        {connected ? captions.after : captions.before}
      </p>
    </div>
  );
}
