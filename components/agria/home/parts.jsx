import { Eyebrow, Heading, Reveal, Text } from '@/components/agria/ui';

// Pezzi comuni della homepage (Prompt 28).

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

// Etichetta con la freccia finale del testo approvato ("… →"): la freccia resta
// visibile ma fuori dal nome accessibile del pulsante.
export function ArrowLabel({ label }) {
  const match = label.match(/^(.*?)\s*→$/);
  if (!match) return label;
  return (
    <>
      {match[1]} <span aria-hidden="true">→</span>
    </>
  );
}

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
