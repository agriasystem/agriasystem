// Set di icone AGRIA (Prompt 13): 20×20, tratto 1,5 px, colore corrente, angoli
// e terminali arrotondati. Ogni icona è definita una sola volta qui e usata
// con <Icon name="..." />. Decorative: il significato sta nel testo accanto.
const ICONS = {
  // ricerca, visibilità, misura
  search: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13 13l4 4" />
    </>
  ),
  funnel: <path d="M3 4h14l-5.5 6.5V16l-3 1.5v-7L3 4z" />,
  chart: <path d="M3 3v14h14M6 13l3.5-4 3 2.5L17 6" />,
  target: (
    <>
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="10" cy="10" r="0.6" fill="currentColor" />
    </>
  ),
  gauge: <path d="M3.5 14.5a7 7 0 1 1 13 0M10 14l3-5" />,
  'map-pin': (
    <>
      <path d="M10 17.5s-5.5-5-5.5-9a5.5 5.5 0 0 1 11 0c0 4-5.5 9-5.5 9z" />
      <circle cx="10" cy="8.5" r="2" />
    </>
  ),
  globe: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c2 2 3 4.3 3 7s-1 5-3 7c-2-2-3-4.3-3-7s1-5 3-7z" />
    </>
  ),

  // comunicazione e richieste
  phone: (
    <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.5C3 11.4 8.6 17 15.5 17a1.5 1.5 0 0 0 1.5-1.5v-2l-3.5-1.5-1.8 1.8a10 10 0 0 1-4.5-4.5L8 7.5 6.5 3z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 5.5l7 5.5 7-5.5" />
    </>
  ),
  chat: (
    <path d="M4 4h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM6.5 8h7M6.5 10.5H11" />
  ),
  // fumetto rotondo con la coda in basso a sinistra e, dentro, la cornetta di
  // "phone" ridotta (tratto non scalato, uguale al resto del set)
  whatsapp: (
    <>
      <path d="M3.72 13.63L2.75 17.25l3.63-.97A7.25 7.25 0 1 0 3.72 13.63z" />
      <path
        transform="translate(5.6 5.6) scale(0.44)"
        vectorEffect="non-scaling-stroke"
        d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.5C3 11.4 8.6 17 15.5 17a1.5 1.5 0 0 0 1.5-1.5v-2l-3.5-1.5-1.8 1.8a10 10 0 0 1-4.5-4.5L8 7.5 6.5 3z"
      />
    </>
  ),
  inbox: <path d="M3 11l2-7h10l2 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zM3 11h4l1 2h4l1-2h4" />,
  bell: <path d="M5 13.5V9a5 5 0 0 1 10 0v4.5l1.5 1.5h-13L5 13.5zM8.5 17a1.5 1.5 0 0 0 3 0" />,

  // persone
  users: (
    <>
      <circle cx="7.5" cy="7" r="2.8" />
      <path d="M2.5 16.5c.5-2.7 2.5-4 5-4s4.5 1.3 5 4" />
      <circle cx="13.5" cy="6.5" r="2.3" />
      <path d="M14 12c1.9.2 3.2 1.5 3.5 4" />
    </>
  ),
  'user-plus': (
    <>
      <circle cx="8" cy="7" r="3" />
      <path d="M2.5 17c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M15.5 6.5v5M13 9h5" />
    </>
  ),
  'user-check': (
    <>
      <circle cx="8" cy="7" r="3" />
      <path d="M2.5 17c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M13 8.5l1.7 1.7L18 7" />
    </>
  ),

  // documenti, dati, regole
  'file-text': <path d="M5 2.5h6.5L15 6v11.5H5v-15zM11.5 2.5V6H15M7.5 10h5M7.5 13h5" />,
  copy: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    </>
  ),
  pen: <path d="M13.5 3.5l3 3L7 16H4v-3l9.5-9.5zM11.5 5.5l3 3" />,
  list: <path d="M7.5 5h9.5M7.5 10h9.5M7.5 15h9.5M3.5 5h.01M3.5 10h.01M3.5 15h.01" />,
  sort: <path d="M3 5h14M5.5 10h9M8 15h4" />,
  layers: <path d="M10 3l7 3.5-7 3.5-7-3.5L10 3zM3 10l7 3.5 7-3.5M3 13.5L10 17l7-3.5" />,
  grid: (
    <>
      <rect x="3" y="3" width="5.5" height="5.5" rx="1" />
      <rect x="11.5" y="3" width="5.5" height="5.5" rx="1" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1" />
    </>
  ),
  layout: (
    <>
      <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
      <path d="M2.5 7h15M7.5 7v9.5" />
    </>
  ),
  code: <path d="M7 6l-4 4 4 4M13 6l4 4-4 4" />,
  link: (
    <path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.8-2.8a3 3 0 0 0-4.2-4.2l-1 1M11.5 8.5a3 3 0 0 0-4.2 0l-2.8 2.8a3 3 0 0 0 4.2 4.2l1-1" />
  ),
  repeat: <path d="M4 9V8a3 3 0 0 1 3-3h9M13 2l3 3-3 3M16 11v1a3 3 0 0 1-3 3H4M7 18l-3-3 3-3" />,
  zap: <path d="M11 2.5L4.5 11H10l-1 6.5L15.5 9H10l1-6.5z" />,
  sparkles: (
    <path d="M9 3l1.5 4L14.5 8.5 10.5 10 9 14l-1.5-4-4-1.5 4-1.5L9 3zM15 12.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
  ),
  download: <path d="M10 3v10M6 9l4 4 4-4M4 17h12" />,
  key: (
    <>
      <circle cx="7" cy="13" r="3.5" />
      <path d="M9.5 10.5L17 3M14 6l2 2M12 8l1.5 1.5" />
    </>
  ),
  shield: <path d="M10 2.5l6 2.5v5c0 3.8-2.6 6.3-6 7.5-3.4-1.2-6-3.7-6-7.5V5l6-2.5zM7.5 10l1.8 1.8L12.8 8.3" />,
  'badge-check': (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M7 10.2l2 2 4-4.2" />
    </>
  ),

  // tempo
  calendar: (
    <>
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
      <path d="M3 8.5h14M7 2.5V6M13 2.5V6" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.5 2.5" />
    </>
  ),

  // vendita e logistica
  cart: (
    <>
      <path d="M2.5 3.5h2l2 9.5h9l1.5-7H6" />
      <circle cx="8" cy="16.5" r="1" />
      <circle cx="15" cy="16.5" r="1" />
    </>
  ),
  'credit-card': (
    <>
      <rect x="2.5" y="5" width="15" height="10" rx="2" />
      <path d="M2.5 8.5h15M5.5 12h3" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="8" cy="6" rx="5" ry="2.5" />
      <path d="M3 6v4c0 1.4 2.2 2.5 5 2.5 .7 0 1.3-.1 1.9-.2M13 6v2.5" />
      <ellipse cx="13" cy="12" rx="4" ry="2" />
      <path d="M9 12v2.5c0 1.1 1.8 2 4 2s4-.9 4-2V12" />
    </>
  ),
  tag: (
    <>
      <path d="M3 3.5h6.5l7.5 7.5-6 6L3.5 9.5V3.5z" />
      <circle cx="6.8" cy="7" r="1" />
    </>
  ),
  ticket: (
    <path d="M3 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4V6zM12 5.5v1.5M12 9.25v1.5M12 13v1.5" />
  ),
  package: <path d="M10 2.5l7 3.5v8l-7 3.5-7-3.5V6l7-3.5zM3 6l7 3.5L17 6M10 9.5v8" />,
  truck: (
    <>
      <path d="M2.5 5h9v8.5h-9V5zM11.5 8h3l3 3v2.5h-6" />
      <circle cx="6" cy="14.5" r="1.5" />
      <circle cx="14.5" cy="14.5" r="1.5" />
    </>
  ),
  'arrow-in': <path d="M11 4h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4M3 10h9M9 6.5l3.5 3.5L9 13.5" />,
  sprout: <path d="M10 17V9M10 11c0-3.5-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5zM10 9c0-3 2-5 5.5-5 0 3-2 5-5.5 5z" />,

  // interfaccia
  plus: <path d="M10 4v12M4 10h12" />,
  minus: <path d="M4 10h12" />,
  'arrow-right': <path d="M4 10h12M11.5 5.5L16 10l-4.5 4.5" />,
  check: <path d="M4.5 10.5l3.5 3.5 7.5-8" />,
};

export const ICON_NAMES = Object.keys(ICONS);

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}
