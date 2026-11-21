import Link from 'next/link';
import { Button, Container, Heading, Reveal, Text } from '@/components/agria/ui';
import { QUICK_CONTACT } from '@/components/agria/nav-data';
import { homeClosing } from '@/content/agria/home';
import { ArrowLabel, TwoTone, HomeSection } from './parts';
import Building from './Building';

// 13. Chiusura (fascia ink): titolo bicolore, testo, prima analisi e WhatsApp
// (stesso link di QUICK_CONTACT.whatsapp). A destra (sotto lg, sotto il testo)
// l'edificio piccolo, tutto acceso.
export default function HomeClosing() {
  return (
    <HomeSection background="ink" aria-labelledby="home-chiusura-title">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
        <Reveal className="flex flex-col items-start">
          <Heading level="h2" id="home-chiusura-title" onDark className="max-w-[20ch] text-balance">
            <TwoTone title={homeClosing.title} onDark />
          </Heading>
          <Text size="lg" onDark muted className="mt-5">
            {homeClosing.text}
          </Text>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button as={Link} href={homeClosing.primary.href} variant="bright">
              <ArrowLabel label={homeClosing.primary.label} />
            </Button>
            <Button
              href={QUICK_CONTACT.whatsapp.href}
              variant="line"
              target="_blank"
              rel="noopener"
              data-analytics="whatsapp"
              data-analytics-location="home_chiusura"
            >
              {homeClosing.secondary.label}
            </Button>
          </div>
        </Reveal>
        {/* l'edificio piccolo, tutto acceso (nessuna animazione) */}
        <Building tone="dark" labels={false} className="mx-auto w-full max-w-[220px] lg:mr-0" />
      </Container>
    </HomeSection>
  );
}
