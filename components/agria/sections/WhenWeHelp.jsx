import Link from 'next/link';
import { Container, Eyebrow, Heading, Reveal, Section, Text, TextLink } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { whenWeHelp } from '@/content/agria/home';

// "Quando interveniamo": quando ha senso chiamarci, quando no, come lo capiamo.
// Testi in content/agria/home.js (whenWeHelp).
// - variant "full" (homepage): sezione scura con h2 e tre blocchi in h3,
//   ancorata a #quando-interveniamo;
// - variant "short" (pagine servizio): due righe che dicono già la cosa e il
//   link alla sezione completa, senza duplicarne il testo.
export default function WhenWeHelp({ variant = 'full' }) {
  const { id, eyebrow, title, intro, blocks, short } = whenWeHelp;

  if (variant === 'short') {
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

  const titleId = `${id}-titolo`;
  return (
    <Section background="ink" id={id} aria-labelledby={titleId}>
      <Container>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <Heading level="h2" id={titleId} onDark className="max-w-[22ch]">
            {title}
          </Heading>
          <Text size="lg" onDark muted>
            {intro}
          </Text>
        </Reveal>
        {/* da md: i due elenchi affiancati e "Come lo capiamo" sotto, a tutta
            larghezza; da lg: tre colonne */}
        <div className="mt-10 grid grid-cols-1 gap-[18px] md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, index) => (
            <Reveal key={block.key} delay={index * 70} className={`h-full ${block.items ? '' : 'md:col-span-2 lg:col-span-1'}`}>
              <div className="flex h-full flex-col gap-5 rounded-agria-card border border-white/15 bg-white/[0.04] p-8">
                <h3 className="font-agria-sans text-agria-h3 text-agria-on-dark">{block.title}</h3>
                {block.items ? (
                  <ul className="flex flex-col gap-4">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-agria-green-bright">
                          <Icon name={block.icon} size={18} />
                        </span>
                        <Text as="span" size="md" onDark muted measure={false}>
                          {item}
                        </Text>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text size="md" onDark muted measure={false}>
                    {block.text}
                  </Text>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
