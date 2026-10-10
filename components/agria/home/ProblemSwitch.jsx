'use client';

import { useState } from 'react';
import { Container, Eyebrow, Heading, Reveal, Section, Text } from '@/components/agria/ui';
import { problem } from '@/content/agria/home';
import styles from './ProblemSwitch.module.css';

// Posizioni delle sei fonti sulla tavola (percentuali, centro del nodo).
// before: sparse e ruotate; after: allineate ai lati del sistema (colonne da
// md in su, righe sopra e sotto su mobile). I collegamenti partono dalle
// posizioni "after" e arrivano al centro, dietro al blocco scuro.
const BEFORE = [
  [20, 20, -6],
  [52, 13, 5],
  [81, 30, -4],
  [23, 64, 4],
  [55, 85, -5],
  [81, 71, 6],
];
const AFTER_WIDE = [
  [15, 22],
  [15, 50],
  [15, 78],
  [85, 22],
  [85, 50],
  [85, 78],
];
const AFTER_NARROW = [
  [18, 14],
  [50, 14],
  [82, 14],
  [18, 86],
  [50, 86],
  [82, 86],
];

// viewBox con le stesse proporzioni della tavola (16:11 da md, 1:1 su mobile):
// il tratto scala in modo uniforme e pathLength resta affidabile per il disegno.
function Links({ points, width, height, className }) {
  const sx = width / 100;
  const sy = height / 100;
  return (
    <svg className={`${styles.links} ${className}`} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {points.map(([x, y]) => (
        <line key={`${x}-${y}`} x1={x * sx} y1={y * sy} x2={50 * sx} y2={50 * sy} pathLength="1" />
      ))}
    </svg>
  );
}

// Modulo "Il punto di partenza": un interruttore porta le fonti dai loro posti
// sparsi a un solo sistema. Senza JavaScript resta lo stato di partenza e
// l'interruttore è nascosto; con movimento ridotto il cambio è immediato.
export default function ProblemSwitch() {
  const [connected, setConnected] = useState(false);
  const state = connected ? 'after' : 'before';

  return (
    <Section background="white" aria-labelledby="home-problema-title">
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[clamp(32px,5vw,72px)]">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <Heading level="h2" id="home-problema-title">
            {problem.title}
          </Heading>
          <Text size="lg" muted>
            {problem.text}
          </Text>
          <button
            type="button"
            role="switch"
            aria-checked={connected}
            aria-label={problem.states.after}
            onClick={() => setConnected((v) => !v)}
            className={`${styles.switch} mt-4 self-start rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-4`}
          >
            <span className={styles.label} data-active={!connected || undefined}>
              {problem.states.before}
            </span>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.thumb} />
            </span>
            <span className={styles.label} data-active={connected || undefined}>
              {problem.states.after}
            </span>
          </button>
        </Reveal>

        <div>
          <div className={styles.board} data-state={state}>
            <Links points={AFTER_WIDE} width={160} height={110} className={styles.linksWide} />
            <Links points={AFTER_NARROW} width={100} height={100} className={styles.linksNarrow} />
            <ul className={styles.sources}>
              {problem.sources.map((source, i) => (
                <li
                  key={source}
                  className={styles.node}
                  style={{
                    '--bx': `${BEFORE[i][0]}%`,
                    '--by': `${BEFORE[i][1]}%`,
                    '--br': `${BEFORE[i][2]}deg`,
                    '--wx': `${AFTER_WIDE[i][0]}%`,
                    '--wy': `${AFTER_WIDE[i][1]}%`,
                    '--nx': `${AFTER_NARROW[i][0]}%`,
                    '--ny': `${AFTER_NARROW[i][1]}%`,
                    '--i': i,
                  }}
                >
                  {source}
                </li>
              ))}
            </ul>
            <p className={styles.system} aria-hidden={!connected}>
              <strong>{problem.system.title}</strong>
              <span>{problem.system.text}</span>
            </p>
          </div>
          <p aria-live="polite" className="mt-4 font-agria-sans text-agria-md text-agria-grey">
            {problem.captions[state]}
          </p>
          <p className="mt-3 font-agria-sans text-agria-md text-agria-graphite">{problem.limit}</p>
        </div>
      </Container>
    </Section>
  );
}
