import { previews } from '@/content/agria/anteprime';
import styles from './ServicePreview.module.css';

// Contenuto delle finte finestre dei tre servizi (Prompt 25): solo DOM, CSS e SVG.
// Lo carica PreviewPlayer, dentro la sua cornice (role="img", proporzioni
// riservate), quando la finestra si avvicina allo schermo. Lo stile di base è il
// fotogramma finale (movimento ridotto, schermi sotto lg); le animazioni del CSS
// partono ferme e girano solo con data-play sulla cornice. data-last segna
// l'ultima animazione della passata.
export default function ServicePreview({ kind }) {
  const p = previews[kind];
  const Mock = MOCKS[kind];
  return (
    <div className={styles.content}>
      <div className={styles.chrome}>
        <span />
        <span />
        <span />
        <i className={styles.bar}>{p.bar}</i>
      </div>
      <div className={styles.screen}>
        <Mock p={p} />
      </div>
    </div>
  );
}

// ritardo e durata di un'animazione in secondi: sempre entrambi, perché le
// variabili CSS si ereditano dagli elementi animati che le contengono
const at = (delay, duration = 0.6) => ({ '--d': `${delay}s`, '--t': `${duration}s` });

// La pagina si compone, il cursore preme il pulsante, sale la richiesta, arriva l'avviso.
function Presence({ p }) {
  return (
    <>
      <div className={styles.nav}>
        <span className={styles.brand}>{p.brand}</span>
        <span className={styles.links}>
          {p.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>
      <svg
        data-anim=""
        className={`${styles.hills} ${styles.rise}`}
        style={at(0)}
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className={styles.hillBack} d="M0 64C70 38 150 40 230 58S350 46 400 54V120H0Z" />
        <path className={styles.hillFront} d="M0 90C80 68 160 72 240 86S350 78 400 84V120H0Z" />
      </svg>
      <div className={styles.copy}>
        <span data-anim="" className={`${styles.title} ${styles.rise}`} style={at(0.1)}>
          {p.title}
        </span>
        <span data-anim="" className={`${styles.text} ${styles.rise}`} style={at(0.25)}>
          {p.text}
        </span>
        <span data-anim="" className={`${styles.ctaWrap} ${styles.rise}`} style={at(0.4)}>
          <span data-anim="" className={`${styles.pill} ${styles.solid} ${styles.press}`} style={at(2.05, 0.3)}>
            {p.cta}
          </span>
          <Cursor style={{ ...at(0.9, 1.4), '--fx': '34cqw', '--fy': '18cqw' }} />
        </span>
      </div>
      <div data-anim="" className={`${styles.sheet} ${styles.sheetMove}`} style={at(2.35, 1.7)}>
        <span className={styles.sheetTitle}>{p.sheet.title}</span>
        <Rows rows={p.sheet.rows} />
        <span data-anim="" className={`${styles.pill} ${styles.solid} ${styles.press} ${styles.sheetCta}`} style={at(3.25, 0.3)}>
          {p.sheet.cta}
        </span>
      </div>
      <Toast className={styles.toastBottom} title={p.toast.title} text={p.toast.text} style={at(4.05, 0.45)} />
    </>
  );
}

// I prodotti compaiono, il cursore aggiunge la bottiglia, si conferma l'ordine, l'ordine entra.
function Commerce({ p }) {
  return (
    <>
      <div className={styles.nav}>
        <span className={styles.brand}>{p.brand}</span>
        <span className={styles.bag}>
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 8h14l-1 13H6zM9 8V6.5a3 3 0 0 1 6 0V8" />
          </svg>
          {/* un punto, non un contatore */}
          <span data-anim="" className={`${styles.dot} ${styles.pop}`} style={at(2.2, 0.35)} />
        </span>
      </div>
      <div className={styles.grid}>
        {p.products.map((product, index) => (
          <span key={product.key} data-anim="" className={`${styles.tile} ${styles.rise}`} style={at(0.1 + index * 0.15)}>
            <span className={styles.art}>
              <ProductArt kind={product.key} />
            </span>
            <span className={styles.name}>{product.name}</span>
            {index === 0 ? (
              <span className={styles.btnWrap}>
                <span data-anim="" className={`${styles.pill} ${styles.line} ${styles.press} ${styles.swap}`} style={at(1.95, 0.3)}>
                  <span data-anim="" className={`${styles.addLabel} ${styles.hide}`} style={at(2.05, 0.2)}>
                    {p.add}
                  </span>
                  <span data-anim="" className={`${styles.addedLabel} ${styles.rise}`} style={at(2.1, 0.3)}>
                    <Check />
                    {p.added}
                  </span>
                </span>
                <Cursor style={{ ...at(0.9, 1.3), '--fx': '30cqw', '--fy': '14cqw' }} />
              </span>
            ) : (
              <span className={`${styles.pill} ${styles.line}`}>{p.add}</span>
            )}
          </span>
        ))}
      </div>
      <div data-anim="" className={`${styles.panel} ${styles.panelMove}`} style={at(2.5, 1.7)}>
        <span className={styles.sheetTitle}>{p.panel.title}</span>
        <Rows rows={p.panel.rows} />
        <span data-anim="" className={`${styles.pill} ${styles.solid} ${styles.press} ${styles.sheetCta}`} style={at(3.3, 0.3)}>
          {p.panel.cta}
        </span>
      </div>
      <Toast className={styles.toastBottom} title={p.toast.title} text={p.toast.text} style={at(4.15, 0.45)} />
    </>
  );
}

// La richiesta arriva, riceve un'etichetta, scende nella colonna giusta e la prende
// in carico una persona: l'ultimo fotogramma è lei, non un invio automatico.
function Automation({ p }) {
  return (
    <>
      <span data-anim="" className={`${styles.label} ${styles.rise}`} style={at(0)}>
        {p.incoming}
      </span>
      <div data-anim="" className={`${styles.columns} ${styles.rise}`} style={at(0.1)}>
        {p.columns.map((column, index) => (
          <span key={column} className={styles.column}>
            {index === 0 ? (
              <span data-anim="" className={`${styles.columnTitle} ${styles.highlight}`} style={at(3.2, 0.35)}>
                {column}
              </span>
            ) : (
              <>
                <span className={styles.columnTitle}>{column}</span>
                <i className={styles.ghost} />
                <i className={styles.ghost} />
              </>
            )}
          </span>
        ))}
      </div>
      <span data-anim="" className={`${styles.move} ${styles.moveIn}`} style={at(2.2, 1.1)}>
        <span data-anim="" className={`${styles.card} ${styles.rise}`} style={at(0.25)}>
          <span className={styles.meta}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 6h17v12h-17zM3.5 6.8 12 13l8.5-6.2" />
            </svg>
            {p.message.from}
          </span>
          <span className={styles.message}>{p.message.text}</span>
          <span data-anim="" className={`${styles.tag} ${styles.pop}`} style={at(1.2, 0.4)}>
            {p.tag}
          </span>
          <span data-anim="" className={`${styles.owner} ${styles.rise}`} style={at(3.6)}>
            <span className={styles.avatar}>{p.owner.initials}</span>
            <span>{p.owner.text}</span>
          </span>
          <span data-anim="" data-last="" className={`${styles.pill} ${styles.line} ${styles.small} ${styles.pop}`} style={at(4.1, 0.4)}>
            {p.draft}
          </span>
        </span>
      </span>
    </>
  );
}

// Arriva una domanda, l'assistente raccoglie le informazioni e prepara la bozza, la
// richiesta passa a una persona. La bozza resta tratteggiata: non è partita.
function Assistant({ p }) {
  return (
    <>
      <div className={styles.nav}>
        <span className={styles.brand}>{p.from}</span>
        <span className={styles.channel}>{p.channel}</span>
      </div>
      <div className={styles.thread}>
        <span data-anim="" className={`${styles.bubble} ${styles.rise}`} style={at(0.15)}>
          {p.question}
        </span>
        <span className={styles.collect}>
          <span data-anim="" className={`${styles.collectTitle} ${styles.rise}`} style={at(0.95)}>
            {p.collect.title}
          </span>
          <span className={styles.chips}>
            {p.collect.items.map((item, index) => (
              <span key={item} data-anim="" className={`${styles.tag} ${styles.pop}`} style={at(1.25 + index * 0.25, 0.4)}>
                {item}
              </span>
            ))}
          </span>
        </span>
        <span data-anim="" className={`${styles.draft} ${styles.rise}`} style={at(2.6)}>
          <span className={styles.collectTitle}>{p.draft.title}</span>
          <span>{p.draft.text}</span>
        </span>
        <span data-anim="" className={`${styles.handoff} ${styles.rise}`} style={at(3.6)}>
          <span className={styles.owner}>
            <span className={styles.avatar}>{p.owner.initials}</span>
            <span>{p.owner.text}</span>
          </span>
          <span data-anim="" data-last="" className={`${styles.pill} ${styles.line} ${styles.small} ${styles.pop}`} style={at(4.1, 0.4)}>
            {p.review}
          </span>
        </span>
      </div>
    </>
  );
}

const MOCKS = { presence: Presence, commerce: Commerce, automation: Automation, assistant: Assistant };

function Rows({ rows }) {
  return rows.map(([key, value]) => (
    <span key={key} className={styles.row}>
      <span>{key}</span>
      <span>{value}</span>
    </span>
  ));
}

function Toast({ title, text, className, style }) {
  return (
    <span data-anim="" data-last="" className={`${styles.toast} ${styles.drop} ${className}`} style={style}>
      <Check />
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
    </span>
  );
}

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  );
}

function Cursor({ style }) {
  return (
    <svg data-anim="" className={styles.cursor} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3v15.5l4.2-3.9 2.7 6.2 2.8-1.2-2.7-6.1 5.8-.2z" />
    </svg>
  );
}

function ProductArt({ kind }) {
  if (kind === 'vino') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path className={styles.artDark} d="M10 2h4v5.2c2.3 1.4 3.4 3.3 3.4 6V21a1 1 0 0 1-1 1H7.6a1 1 0 0 1-1-1v-7.8c0-2.7 1.1-4.6 3.4-6z" />
        <rect className={styles.artLabel} x="8.2" y="14" width="7.6" height="4.4" rx="0.6" />
      </svg>
    );
  }
  if (kind === 'olio') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path className={styles.artMid} d="M9.5 2h5v3.2h-5z" />
        <path className={styles.artLight} d="M8 6.2h8l1.2 3.2V21a1 1 0 0 1-1 1H7.8a1 1 0 0 1-1-1V9.4z" />
        <path className={styles.artDark} d="M12 11.5c1.6 2 2.4 3.4 2.4 4.5a2.4 2.4 0 0 1-4.8 0c0-1.1.8-2.5 2.4-4.5z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path className={styles.artLight} d="M4 11.4 12 5l8 6.4V21a1 1 0 0 1-1 1h-4.6v-6.2H9.6V22H5a1 1 0 0 1-1-1z" />
      <path className={styles.artDark} d="M12 3 2 11l1.2 1.5L12 5.6l8.8 6.9L22 11z" />
    </svg>
  );
}
