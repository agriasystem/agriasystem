import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Reveal, Section, Text } from '@/components/agria/ui';

const LINK =
  'rounded font-agria-sans text-agria-sm text-agria-on-dark-muted underline-offset-4 transition-colors hover:text-agria-on-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink';

// CTA finale su fondo scuro con una o due CTA e, sotto, gli eventuali rimandi interni:
// le altre aree con l'indice, e gli articoli del blog collegati.
// links: [{ title, items: [{ label, href }] }]
export default function FinalCta({ id, sectionId, title, text, primary, primaryProps = {}, secondary, links = [] }) {
  return (
    <Section background="ink" id={sectionId} aria-labelledby={id} className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-60%] -z-10 h-full"
        style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgb(var(--agria-green-bright) / 0.18), transparent 70%)' }}
      />
      <Container>
        <Reveal className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <Heading level="h2" id={id} onDark>
            {title}
          </Heading>
          <Text onDark muted className="mt-4">
            {text}
          </Text>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button as={Link} href={primary.href} variant="bright" {...primaryProps}>
              {primary.label}
            </Button>
            {secondary && (
              <Button as={Link} href={secondary.href} variant="line">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
        {links.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
            {links.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <Eyebrow as="h3" onDark>
                  {group.title}
                </Eyebrow>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={LINK}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
