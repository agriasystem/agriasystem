import { Reveal } from '@/components/agria/ui';

// Pezzi comuni delle schermate delle pagine servizio (Prompt 29, modello: brochure
// hospitality, pagine 3-6). Tutto in elementi della pagina, niente immagini:
// restano nitide, si leggono su mobile e pesano poco. Nessuna ombra (come la
// homepage): bordi sottili. Il verde Agria solo per pastiglie e didascalie;
// l'azienda inventata ha il suo accento (ACCENT, terracotta).

export const ACCENT = 'text-[#a5563e]';
export const ACCENT_BG = 'bg-[#a5563e]';
export const ACCENT_BORDER = 'border-[#a5563e]';

// pastiglia verde numerata, appoggiata sul punto di cui parla
export function Pill({ n, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-agria-green-dark font-agria-sans text-sm font-medium text-agria-white ring-4 ring-agria-offwhite ${className}`}
    >
      {n}
    </span>
  );
}

// finestra di browser: tre pallini e un indirizzo che finisce in .example
export function Browser({ url, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-[22px] border border-agria-border bg-agria-white ${className}`}>
      <div className="flex items-center gap-3 border-b border-agria-border bg-agria-offwhite px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-agria-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-agria-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-agria-border" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full border border-agria-border bg-agria-white px-3 py-1 font-agria-sans text-[11px] text-agria-grey">
          {url}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

// telefono: cornice scura, isola e ora in alto
export function Phone({ time, children, className = '' }) {
  return (
    <div className={`rounded-[34px] bg-[#1d1f1e] p-[7px] ${className}`}>
      <div className="relative overflow-hidden rounded-[28px] bg-agria-white">
        <div className="flex items-center justify-between px-5 pb-1 pt-3">
          <span className="font-agria-sans text-[11px] font-medium text-agria-graphite">{time}</span>
          <span aria-hidden="true" className="h-[18px] w-16 rounded-full bg-[#1d1f1e]" />
          <span aria-hidden="true" className="h-2.5 w-5 rounded-[3px] border border-agria-graphite/60" />
        </div>
        {children}
      </div>
    </div>
  );
}

// marchio dell'azienda inventata: nome spaziato e sottotitolo nel suo accento
export function Brand({ name, kind, small = false }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-agria-sans uppercase tracking-[0.32em] text-agria-graphite ${small ? 'text-[11px]' : 'text-[13px]'}`}>{name}</span>
      {kind && <span className={`mt-1 font-agria-sans text-[8.5px] uppercase tracking-[0.28em] ${ACCENT}`}>{kind}</span>}
    </span>
  );
}

// Schermata con didascalie: a sinistra la composizione (browser e telefono), a
// destra le didascalie numerate con un filetto sopra ciascuna; sotto lg la
// composizione sopra e le didascalie in fondo. aside: blocco sotto le didascalie
// (per esempio il risultato di ricerca della pastiglia 3). La dissolvenza
// leggera quando entra nello schermo è quella di Reveal (subito visibile con
// prefers-reduced-motion e senza JavaScript).
export function ScreenLayout({ title, titleId, captions, aside, note, children }) {
  return (
    <figure aria-labelledby={titleId} className="m-0">
      <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,3.6fr)] lg:items-center lg:gap-[clamp(28px,3.5vw,56px)]">
        {/* la composizione è scenografia: per i lettori di schermo parlano le didascalie */}
        <div className="min-w-0" aria-hidden="true">
          {children}
        </div>
        <div>
          <ol className="flex flex-col">
            {captions.map((caption, index) => (
              <li key={caption} className="flex gap-4 border-t border-agria-border py-5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-agria-green-dark font-agria-sans text-sm font-medium text-agria-white">
                  {index + 1}
                </span>
                <span className="pt-0.5 font-agria-sans text-agria-body text-agria-graphite">{caption}</span>
              </li>
            ))}
          </ol>
          {aside}
        </div>
      </Reveal>
      <figcaption className="mt-8 font-agria-sans text-agria-sm text-agria-grey">{note}</figcaption>
    </figure>
  );
}
