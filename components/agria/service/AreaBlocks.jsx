import Link from 'next/link';
import { Container, Eyebrow, Reveal, Section, Text, TextLink } from '@/components/agria/ui';
import { ZoomImage } from '@/components/agria/motion';
import PhotoCredit from '@/components/agria/media/PhotoCredit';
import IconBadge from './IconBadge';

// Indice /servizi: un blocco a piena larghezza per area, con testo (etichetta,
// titolo, descrizione, tre voci con icona, "Scoprite di più") e fotografia.
// Fondo e lato della foto si alternano da un blocco all'altro.
export default function AreaBlocks({ areas, linkLabel }) {
  return areas.map((area, index) => {
    const flipped = index % 2 === 1;
    const titleId = `servizi-${area.key}`;
    return (
      <Section key={area.key} background={flipped ? 'offwhite' : 'white'} aria-labelledby={titleId}>
        <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-[clamp(32px,5vw,72px)]">
          <Reveal className={`flex flex-col items-start gap-5 ${flipped ? 'md:order-2' : ''}`}>
            <Eyebrow>{area.eyebrow}</Eyebrow>
            <h2
              id={titleId}
              className="font-agria-sans text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.12] tracking-[-0.02em] text-agria-graphite"
            >
              {area.title}
            </h2>
            <Text size="lg" muted>
              {area.text}
            </Text>
            <ul className="mt-2 flex w-full flex-col gap-4 border-t border-agria-border pt-6">
              {area.items.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <IconBadge name={item.icon} />
                  <div>
                    <h3 className="font-agria-sans text-agria-body font-medium text-agria-graphite">{item.title}</h3>
                    <p className="mt-0.5 font-agria-sans text-agria-sm text-agria-grey">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <TextLink as={Link} href={area.href} aria-label={`${linkLabel}: ${area.name}`} className="mt-2">
              {linkLabel}
            </TextLink>
          </Reveal>
          <figure className={`m-0 ${flipped ? 'md:order-1' : ''}`}>
            <ZoomImage
              src={area.image.src}
              alt={area.image.alt}
              quality={area.image.quality}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3]"
            />
            <PhotoCredit credit={area.image.credit} className="mt-3" />
          </figure>
        </Container>
      </Section>
    );
  });
}
