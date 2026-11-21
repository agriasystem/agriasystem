import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Reveal, Text } from '@/components/agria/ui';
import { method } from '@/content/agria/home';
import MethodSteps from './MethodSteps';
import { ArrowLabel, TwoTone, HomeSection } from './parts';

// 9. Come lavoriamo (#come-lavoriamo): a sinistra titolo e pulsante, a destra
// i quattro passi sulla linea verticale, che si accendono scorrendo.
// Senza argomenti: la versione della homepage. Le pagine servizio possono passare
// un altro titolo e un testo sopra i passi; i quattro passi sono sempre quelli di
// method (content/agria/home.js), un'unica fonte.
export default function MethodSection({ eyebrow = method.eyebrow, title = method.title, text = null, spacingTop }) {
  const titleId = `${method.id}-titolo`;
  return (
    <HomeSection background="offwhite" spacingTop={spacingTop} id={method.id} aria-labelledby={titleId}>
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(32px,5vw,72px)]">
        <Reveal className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:self-start">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading level="h2" id={titleId} className="max-w-[20ch] text-balance">
            <TwoTone title={title} />
          </Heading>
          {text && (
            <Text size="lg" muted>
              {text}
            </Text>
          )}
          <Button as={Link} href={method.cta.href} variant="primary">
            <ArrowLabel label={method.cta.label} />
          </Button>
        </Reveal>
        <MethodSteps steps={method.steps} />
      </Container>
    </HomeSection>
  );
}
