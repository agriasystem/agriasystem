import { Eyebrow, Heading, Reveal, Text } from '@/components/agria/ui';

// Pezzi comuni della homepage (Prompt 28).

// Sezione della homepage: come Section della libreria (components/agria/ui),
// con la spaziatura verticale ridotta di circa un terzo (correzioni prima
// della Fase C): normal da clamp(4rem, 1.875rem + 9vw, 10rem) a
// clamp(2.75rem, 1.25rem + 6vw, 6.75rem), compact da clamp(3rem, 1.875rem +
// 4.5vw, 6rem) a clamp(2rem, 1.25rem + 3vw, 4rem).
const HOME_BG = { offwhite: 'bg-agria-offwhite', ink: 'bg-agria-ink', white: 'bg-agria-white' };
const HOME_PAD_TOP = { normal: 'pt-[clamp(2.75rem,1.25rem+6vw,6.75rem)]', compact: 'pt-[clamp(2rem,1.25rem+3vw,4rem)]' };
const HOME_PAD_BOTTOM = { normal: 'pb-[clamp(2.75rem,1.25rem+6vw,6.75rem)]', compact: 'pb-[clamp(2rem,1.25rem+3vw,4rem)]' };
// spacingTop: sovrascrive il solo margine superiore (pagine servizio: tra due
// sezioni chiare di seguito i due margini si sommano, quello sopra è compatto)
export function HomeSection({ background = 'offwhite', spacing = 'normal', spacingTop, className = '', children, ...props }) {
  return (
    <section className={`${HOME_BG[background]} ${HOME_PAD_TOP[spacingTop ?? spacing]} ${HOME_PAD_BOTTOM[spacing]} ${className}`} {...props}>
      {children}
    </section>
  );
}

// Titolo bicolore: { text, accent }. accent è la seconda frase, in verde
// (green-dark su chiaro, green-bright su ink), stesso peso del titolo.
// Una stringa resta un titolo in un colore solo.
export function TwoTone({ title, onDark = false }) {
  if (typeof title === 'string') return title;
  return (
    <>
      {title.text} <span className={onDark ? 'text-agria-green-bright' : 'text-agria-green-dark'}>{title.accent}</span>
    </>
  );
}

// Etichetta con la freccia finale (file a sé: la usano anche componenti client)
export { default as ArrowLabel } from './ArrowLabel';

// Apertura di sezione: etichetta tra parentesi, titolo bicolore, introduzione.
export function HomeIntro({ eyebrow, title, intro, titleId, onDark = false, className = '' }) {
  return (
    <Reveal className={`flex flex-col gap-4 ${className}`}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <Heading level="h2" id={titleId} onDark={onDark} className="max-w-[24ch] text-balance">
        <TwoTone title={title} onDark={onDark} />
      </Heading>
      {intro && (
        <Text size="lg" muted onDark={onDark}>
          {intro}
        </Text>
      )}
    </Reveal>
  );
}
