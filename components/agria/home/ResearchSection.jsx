import { Container, Reveal, Section, Text } from '@/components/agria/ui';
import { research } from '@/content/agria/home';
import SectionIntro from './SectionIntro';

// Ricerca: un blocco breve su fondo bianco, titolo a sinistra e testo a destra
// da md in su, in colonna su mobile. Il blocco "Meglio dirlo subito" che gli
// stava accanto è confluito nella sezione "Quando interveniamo".
export default function ResearchSection() {
  return (
    <Section background="white" spacing="compact" aria-labelledby="home-ricerca-title">
      <Container>
        <div className="grid grid-cols-1 gap-5 border-t border-agria-border pt-8 md:grid-cols-2 md:gap-[clamp(26px,4vw,58px)]">
          <SectionIntro title={research.title} titleId="home-ricerca-title" />
          <Reveal>
            <Text size="lg" muted>
              {research.text}
            </Text>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
