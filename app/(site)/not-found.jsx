import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Section, Text } from '@/components/agria/ui';

// Pagina 404 nel layout Agria (header e footer dal layout del gruppo). Lo
// stato 404 lo imposta Next; noindex esplicito. Gli indirizzi senza pagina
// arrivano qui tramite app/(site)/[...pagina]/page.jsx.
export const metadata = {
  title: { absolute: 'Pagina non trovata | Agria System' },
  description: 'La pagina richiesta non esiste o è stata spostata.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section background="white" className="flex min-h-[70vh] items-center pt-40">
      <Container>
        <Eyebrow as="p">Errore 404</Eyebrow>
        <Heading level="h1" className="mt-5 max-w-[20ch]">
          Questa pagina non esiste.
        </Heading>
        <Text size="lg" muted className="mt-5">
          L’indirizzo potrebbe essere cambiato o non essere più attivo.
        </Text>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} href="/">
            Vai alla homepage
          </Button>
          <Button as={Link} href="/contatti" variant="ghost">
            Contattaci
          </Button>
        </div>
      </Container>
    </Section>
  );
}
