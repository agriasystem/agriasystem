import Link from 'next/link';
import { Container, Reveal, Section, Text, TextLink } from '@/components/agria/ui';
import { whenWeHelp } from '@/content/agria/home';

// Rimando breve in fondo alle pagine servizio: due righe che dicono già la cosa
// e il link alla sezione "Quando sì, quando no" della homepage (/#selezione).
// Testi in content/agria/home.js (whenWeHelp). La versione completa, che stava
// in homepage, è diventata components/agria/home/SelectionSection.jsx (Prompt 28).
export default function WhenWeHelp() {
  const { eyebrow, short } = whenWeHelp;
  return (
    // senza margine superiore: chiude la sezione bianca che la precede, con
    // un filetto (come IdentityBlock), invece di aggiungerne un'altra
    <Section as="aside" background="white" spacing="compact" spacingTop="none" aria-label={eyebrow}>
      <Container>
        <div className="border-t border-agria-border pt-8">
          <Reveal className="flex flex-col items-start gap-4">
            <Text size="lg">{short.text}</Text>
            {/* righe bilanciate: su mobile il link va a capo senza lasciare "no" da solo */}
            <TextLink as={Link} href={short.link.href} className="text-balance">
              {short.link.label}
            </TextLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
