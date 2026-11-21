import { Container } from '@/components/agria/ui';
import { howItWorks } from '@/content/agria/home';
import { HomeIntro, HomeSection } from './parts';
import BoardSwitch from './BoardSwitch';
import styles from './HomeHero.module.css';

// 5. Come funziona (#come-funziona). Sei riquadri: "Oggi" sparsi e scollegati;
// "Con Agria" si dispongono intorno al centro (tre a sinistra, tre a destra; sotto
// md in colonna, con il centro in mezzo) e parte la sequenza, circa sei secondi:
// un punto percorre le linee e il riquadro si accende quando il dato arriva,
// con la sua riga mono (Sito, Pagamenti, Gestionale, Email; poi Portali e Fogli
// insieme). Tutto in CSS (HomeHero.module.css): gli spostamenti sono transform,
// i punti viaggiano nell'SVG, così niente conta come spostamento di layout.
// L'interruttore (BoardSwitch) cambia solo lo stato della tavola.
// Movimento ridotto: stato finale subito. Senza JavaScript: "Oggi".

const T0 = 0.9; // la sequenza parte quando i riquadri sono arrivati
const LIGHT = { 1: T0, 2: T0 + 1.6, 3: T0 + 2.7, 4: T0 + 3.8, 5: T0 + 4.4 };
// posizioni (percentuali della tavola): "Con Agria" larga e stretta, "Oggi" sparse
const WIDE = { left: 15, right: 85, rows: [18, 50, 82] };
const NARROW = { left: [7, 20, 33], right: [67, 80, 93] };
const BEFORE_WIDE = [
  [20, 20, -6],
  [52, 13, 5],
  [23, 64, 4],
  [81, 30, -4],
  [55, 85, -5],
  [81, 71, 6],
];
const BEFORE_NARROW = [
  [42, 10, -5],
  [58, 24, 4],
  [41, 40, -3],
  [59, 58, 5],
  [42, 75, -4],
  [57, 90, 3],
];
// tavola larga 160×100, stretta 100×190 (stesse proporzioni dei viewBox)
const wide = (n) => [(n.side === 'left' ? WIDE.left : WIDE.right) * 1.6, WIDE.rows[n.row]];
const narrow = (n) => [50, (n.side === 'left' ? NARROW.left : NARROW.right)[n.row] * 1.9];
// i punti della sequenza: dal Sito al centro, poi dal centro ai riquadri 2, 3, 4
const DOTS = [
  { from: 'sito', to: 'centro', start: T0 },
  { from: 'centro', to: 'pagamenti', start: T0 + 0.9 },
  { from: 'centro', to: 'gestionale', start: T0 + 2.0 },
  { from: 'centro', to: 'email', start: T0 + 3.1 },
];

function Links({ size, center, at, className }) {
  const [w, h] = size;
  const point = (key) => (key === 'centro' ? center : at(howItWorks.nodes.find((n) => n.key === key)));
  return (
    <svg className={`${styles.links} ${className}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      {howItWorks.nodes.map((node) => {
        const [x, y] = at(node);
        return (
          <line
            key={node.key}
            className={styles.link}
            style={{ '--light': `${LIGHT[node.order]}s` }}
            x1={x}
            y1={y}
            x2={center[0]}
            y2={center[1]}
            pathLength="1"
          />
        );
      })}
      {DOTS.map((dot) => {
        const [x1, y1] = point(dot.from);
        const [x2, y2] = point(dot.to);
        return (
          <circle
            key={`${dot.from}-${dot.to}`}
            className={styles.dot}
            r="1.8"
            style={{ '--x1': `${x1}px`, '--y1': `${y1}px`, '--x2': `${x2}px`, '--y2': `${y2}px`, '--start': `${dot.start}s` }}
          />
        );
      })}
    </svg>
  );
}

export default function HowItWorks() {
  const { id, eyebrow, title, text, states, replay, nodes, center, captions, note } = howItWorks;
  const boardId = `${id}-tavola`;
  return (
    <HomeSection background="offwhite" id={id} aria-labelledby={`${id}-titolo`}>
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[clamp(32px,5vw,72px)]">
        <div className="flex flex-col gap-8">
          <HomeIntro eyebrow={eyebrow} title={title} intro={text} titleId={`${id}-titolo`} />
          <BoardSwitch boardId={boardId} states={states} captions={captions} replay={replay} />
        </div>
        <div>
          <div id={boardId} className={styles.board} data-state="before">
            <Links size={[160, 100]} center={[80, 50]} at={wide} className={styles.linksWide} />
            <Links size={[100, 190]} center={[50, 95]} at={narrow} className={styles.linksNarrow} />
            <ul className={styles.nodes}>
              {nodes.map((node, i) => {
                const [wx, wy] = [(node.side === 'left' ? WIDE.left : WIDE.right), WIDE.rows[node.row]];
                const ny = (node.side === 'left' ? NARROW.left : NARROW.right)[node.row];
                return (
                  <li
                    key={node.key}
                    className={styles.node}
                    style={{
                      '--wx': wx,
                      '--wy': wy,
                      '--nx': 50,
                      '--ny': ny,
                      '--bwx': BEFORE_WIDE[i][0],
                      '--bwy': BEFORE_WIDE[i][1],
                      '--bnx': BEFORE_NARROW[i][0],
                      '--bny': BEFORE_NARROW[i][1],
                      '--br': `${BEFORE_WIDE[i][2]}deg`,
                      '--brn': `${BEFORE_NARROW[i][2]}deg`,
                      '--light': `${LIGHT[node.order]}s`,
                      '--i': i,
                    }}
                  >
                    <span className={styles.nodeLabel}>{node.label}</span>
                    <span className={styles.nodeStep}>{node.step}</span>
                  </li>
                );
              })}
            </ul>
            <p className={styles.hub}>
              <strong>{center.title}</strong>
              <span>{center.text}</span>
            </p>
          </div>
          <p className="mt-5 font-agria-sans text-agria-md text-agria-graphite">{note}</p>
        </div>
      </Container>
    </HomeSection>
  );
}
