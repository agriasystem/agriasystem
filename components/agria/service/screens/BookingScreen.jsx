import Icon from '@/components/agria/icons/Icon';
import { ACCENT, ACCENT_BG, ACCENT_BORDER, Brand, Browser, Phone, Pill, ScreenLayout } from './ScreenFrame';

// Schermata di Digital Presence (brochure, pagina 3): il sito di un agriturismo
// inventato con camere e disponibilità, barra di prenotazione (pastiglia 1),
// selettore IT · EN (pastiglia 2); sul telefono la stessa prenotazione in
// inglese; sotto le didascalie il risultato di ricerca (pastiglia 3).
// Testi in content/agria/servizi-aree.js (screens[].mock).

// colline e ulivi, toni dell'azienda inventata (non il verde Agria)
function Landscape({ className = '' }) {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className={className}>
      <rect width="400" height="260" fill="#efe7da" />
      <circle cx="300" cy="78" r="34" fill="#f2dcb3" />
      <path d="M0 150 C 70 112 140 120 210 140 S 330 118 400 128 V260 H0 Z" fill="#ddd1bb" />
      <path d="M0 190 C 90 160 180 170 260 186 S 360 176 400 182 V260 H0 Z" fill="#cbbc9c" />
      <path d="M0 224 C 110 204 230 210 400 220 V260 H0 Z" fill="#b9a983" />
      {[
        [70, 182, 1],
        [118, 176, 0.8],
        [250, 184, 1.1],
        [300, 190, 0.85],
        [345, 186, 0.95],
      ].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0 V 22" stroke="#7c6a52" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="0" cy="-6" rx="18" ry="13" fill="#9aa07c" />
          <ellipse cx="-9" cy="-1" rx="10" ry="8" fill="#8c9370" />
        </g>
      ))}
      <rect x="150" y="214" width="78" height="16" rx="3" fill="#cfe0de" />
    </svg>
  );
}

function LangToggle({ active = 'it', small = false }) {
  const base = `rounded-full border border-agria-border px-2.5 py-1 font-agria-sans ${small ? 'text-[9px]' : 'text-[11px]'}`;
  return (
    <span className={base}>
      <span className={active === 'it' ? 'font-medium text-agria-graphite' : 'text-agria-grey'}>IT</span>
      <span className="text-agria-grey"> · </span>
      <span className={active === 'en' ? 'font-medium text-agria-graphite' : 'text-agria-grey'}>EN</span>
    </span>
  );
}

function Field({ label, value, active = false }) {
  return (
    <span className={`flex flex-col gap-0.5 rounded-xl border px-3 py-2 ${active ? `${ACCENT_BORDER} bg-[#a5563e]/[0.06]` : 'border-agria-border'}`}>
      <span className="whitespace-nowrap font-agria-sans text-[8px] uppercase tracking-[0.06em] text-agria-grey">{label}</span>
      <span className="font-agria-sans text-[11px] text-agria-graphite">{value}</span>
    </span>
  );
}

export default function BookingScreen({ screen, titleId, note }) {
  const { mock, captions } = screen;
  const search = (
    <div className="relative mt-6 rounded-2xl border border-agria-border bg-agria-white p-4">
      <Pill n={3} className="-left-3 -top-3" />
      <div className="flex items-center gap-2 rounded-full border border-agria-border px-3 py-2 font-agria-sans text-[12px] text-agria-grey">
        <Icon name="search" size={14} />
        <span className="truncate">{mock.search.query}</span>
      </div>
      <p className={`mt-3 font-agria-sans text-[13px] font-medium ${ACCENT}`}>{mock.search.title}</p>
      <p className="font-agria-sans text-[12px] text-agria-grey">{mock.search.text}</p>
    </div>
  );

  return (
    <ScreenLayout title={screen.title} titleId={titleId} captions={captions} aside={search} note={note}>
      <div className="relative lg:pb-10 lg:pr-[22%]">
        <Browser url={mock.url}>
          {/* intestazione del sito */}
          <div className="flex items-center justify-between gap-3 border-b border-agria-border px-5 py-4">
            <Brand name={mock.brand} kind={mock.kind} />
            <div className="flex items-center gap-4">
              <ul className="hidden gap-4 font-agria-sans text-[11px] text-agria-graphite md:flex">
                {mock.nav.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="relative">
                <LangToggle />
                <Pill n={2} className="-bottom-9 left-1/2 -translate-x-1/2" />
              </span>
              <span className={`rounded-full px-3.5 py-1.5 font-agria-sans text-[11px] font-medium text-agria-white ${ACCENT_BG}`}>{mock.book}</span>
            </div>
          </div>
          {/* apertura: testo e camere a sinistra, colline a destra */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="px-5 pb-5 pt-7">
              <p className={`font-agria-sans text-[9.5px] uppercase tracking-[0.16em] ${ACCENT}`}>{mock.eyebrow}</p>
              <p className="mt-2 font-agria-sans text-[22px] font-light leading-tight text-agria-graphite">
                {mock.headline[0]}
                <br />
                {mock.headline[1]}
              </p>
              <p className="mt-2 font-agria-sans text-[11px] text-agria-grey">{mock.sub}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {mock.rooms.map((room) => (
                  <li key={room.name} className="flex items-center justify-between gap-3 rounded-xl border border-agria-border px-3 py-2">
                    <span className="flex flex-col">
                      <span className="font-agria-sans text-[11.5px] font-medium text-agria-graphite">{room.name}</span>
                      <span className="font-agria-sans text-[10px] text-agria-grey">{room.note}</span>
                    </span>
                    <span className={`shrink-0 rounded-full bg-[#a5563e]/[0.08] px-2 py-0.5 font-agria-sans text-[9.5px] ${ACCENT}`}>{room.state}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Landscape className="hidden h-full min-h-[230px] w-full md:block" />
          </div>
          {/* barra di prenotazione */}
          <div className="relative mx-4 mb-4 mt-1 grid grid-cols-2 items-center gap-2 rounded-2xl border border-agria-border bg-agria-white p-2.5 pl-4 sm:grid-cols-[1.4fr_1fr_1fr_auto] lg:mr-[11%]">
            <Pill n={1} className="-left-3 -top-3 sm:top-1/2 sm:-translate-y-1/2" />
            {mock.bar.map((field, index) => (
              <span key={field.label} className={`flex flex-col gap-0.5 px-2 ${index === 0 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <span className="font-agria-sans text-[8.5px] uppercase tracking-[0.14em] text-agria-grey">{field.label}</span>
                <span className="font-agria-sans text-[11.5px] text-agria-graphite">{field.value}</span>
              </span>
            ))}
            <span className={`col-span-2 rounded-full px-4 py-2 text-center font-agria-sans text-[11.5px] font-medium text-agria-white sm:col-span-1 ${ACCENT_BG}`}>
              {mock.book}
            </span>
          </div>
        </Browser>
        {/* il telefono: la stessa prenotazione in inglese */}
        <Phone time={mock.phone.time} className="mx-auto mt-8 w-full max-w-[250px] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[27%]">
          <div className="flex items-center justify-between border-b border-agria-border px-4 py-2.5">
            <Brand name={mock.brand} small />
            <LangToggle active="en" small />
          </div>
          <Landscape className="block h-20 w-full" />
          <div className="flex flex-col gap-2 px-3.5 pb-4 pt-3">
            <p className="font-agria-sans text-[14px] font-light text-agria-graphite">{mock.phone.title}</p>
            <Field label={mock.phone.fields[0].label} value={mock.phone.fields[0].value} />
            <div className="grid grid-cols-2 gap-2">
              {mock.phone.fields.slice(1).map((field) => (
                <Field key={field.label} {...field} />
              ))}
            </div>
            <span className="flex items-baseline justify-between px-1 font-agria-sans text-[10.5px] text-agria-grey">
              {mock.phone.total.label}
              <span className="text-[12px] font-medium text-agria-graphite">{mock.phone.total.value}</span>
            </span>
            <span className={`rounded-full py-2 text-center font-agria-sans text-[11.5px] font-medium text-agria-white ${ACCENT_BG}`}>{mock.phone.button}</span>
          </div>
        </Phone>
      </div>
    </ScreenLayout>
  );
}
