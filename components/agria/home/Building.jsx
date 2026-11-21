import { floors } from '@/content/agria/home';
// stili nel modulo della homepage (vedi il commento in HomeHero.module.css)
import styles from './HomeHero.module.css';

// Edificio a tre piani (Prompt 28): dal basso "Sito e vendita",
// "Collegamenti", "Assistenti" (titoli di floors in content/agria/home.js),
// con etichette mono a destra. Disegno a linee sottili in leggera
// assonometria: facciata, fianco e tetto.
// - tone: "dark" su ink (verde #7AE098), "light" su offwhite
// - labels: false per la versione piccola della chiusura
// Le classi .face/.detail/.label/.leader portano --floor (0 = piano terra):
// dentro uno .stage di PlayOnView si accendono dal basso uno alla volta.
// È un'illustrazione: per i lettori di schermo i piani sono già nel testo.

const W = 160; // larghezza della facciata
const H = 70; // altezza di un piano
const DX = 50; // profondità del fianco
const DY = 28;
const X0 = 40;
const GROUND = 292;

function Floor({ index, label, labels }) {
  const yb = GROUND - index * H;
  const yt = yb - H;
  const x1 = X0 + W;
  const style = { '--floor': index };
  const mid = (yt + yb) / 2 - DY; // centro del bordo lontano del fianco
  return (
    <g style={style}>
      {/* facciata e fianco */}
      <rect className={styles.face} x={X0} y={yt} width={W} height={H} />
      <polygon className={styles.face} points={`${x1},${yt} ${x1 + DX},${yt - DY} ${x1 + DX},${yb - DY} ${x1},${yb}`} />
      {/* tetto, solo sull'ultimo piano */}
      {index === floors.items.length - 1 && (
        <polygon className={styles.face} points={`${X0},${yt} ${X0 + DX},${yt - DY} ${x1 + DX},${yt - DY} ${x1},${yt}`} />
      )}
      {index === 0 ? (
        <>
          {/* piano terra: vetrina e porta */}
          <rect className={styles.detail} x={X0 + 16} y={yt + 18} width={86} height={34} rx={2} />
          <rect className={styles.detail} x={X0 + 116} y={yt + 22} width={26} height={48} rx={2} />
        </>
      ) : (
        [0, 1, 2, 3].map((i) => (
          <rect key={i} className={styles.detail} x={X0 + 18 + i * 34} y={yt + 22} width={22} height={26} rx={2} />
        ))
      )}
      {/* finestre sul fianco */}
      <line className={styles.detail} x1={x1 + DX * 0.5} y1={yt + 22 - DY * 0.5} x2={x1 + DX * 0.5} y2={yb - 18 - DY * 0.5} />
      {labels && (
        <>
          <line className={styles.leader} x1={x1 + DX + 6} y1={mid} x2={x1 + DX + 22} y2={mid} />
          <text className={styles.label} x={x1 + DX + 28} y={mid + 4}>
            {label}
          </text>
        </>
      )}
    </g>
  );
}

export default function Building({ tone = 'dark', labels = true, className = '' }) {
  const width = labels ? 410 : X0 + W + DX + 30;
  return (
    <div className={`${styles[tone]} ${className}`}>
      <svg className={styles.svg} viewBox={`0 44 ${width} 256`} aria-hidden="true" focusable="false">
        <line className={styles.ground} x1={10} y1={GROUND} x2={X0 + W + DX + 20} y2={GROUND} />
        {floors.items.map((floor, index) => (
          <Floor key={floor.key} index={index} label={floor.title} labels={labels} />
        ))}
      </svg>
    </div>
  );
}

// classi per chi monta l'edificio dentro uno stage animato (PlayOnView)
export const buildingStage = styles.stage;
export const floorCard = styles.card;
