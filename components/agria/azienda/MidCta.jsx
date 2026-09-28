import Link from 'next/link';
import { Button, Container, Reveal, Section } from '@/components/agria/ui';

// CTA a metà pagina, dopo la linea temporale: una sola azione, senza testo
// aggiuntivo, su fondo bianco come la sezione che la precede.
export default function MidCta({ cta }) {
  return (
    <Section background="white" spacingTop="none" spacing="compact">
      <Container>
        <Reveal className="flex justify-center md:justify-start">
          <Button as={Link} href={cta.href}>
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
