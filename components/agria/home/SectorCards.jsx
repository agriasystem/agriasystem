import Link from 'next/link';
import { Container, Heading, Reveal, Section, Text, TextLink } from '@/components/agria/ui';
import { HoverGroup, ZoomImage } from '@/components/agria/motion';
import { sectors } from '@/content/agria/home';
import SectionIntro from './SectionIntro';
import SectorPattern from './SectorPattern';

const CARD =
  'agria-zoom-trigger flex h-full flex-col overflow-hidden rounded-agria-card border border-agria-border bg-agria-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-agria-green/45 hover:shadow-[0_18px_42px_rgb(var(--agria-graphite)/0.07)] motion-reduce:transition-none motion-reduce:hover:translate-y-0';

// eyebrow, title e titleId: in homepage quelli di content/agria/home.js; l'indice
// /settori passa un titolo diverso dall'h1 della pagina.
export default function SectorCards({ eyebrow = sectors.eyebrow, title = sectors.title, titleId = 'home-settori-title' }) {
  return (
    <Section background="offwhite" aria-labelledby={titleId}>
      <Container>
        <SectionIntro eyebrow={eyebrow} title={title} titleId={titleId} />
        {/* HoverGroup sugli li; Reveal dentro, così le due opacità non si sovrappongono */}
        <HoverGroup as="ul" className="mt-8 grid grid-cols-1 gap-[18px] md:mt-12 md:grid-cols-3">
          {sectors.items.map((sector, index) => (
            <li key={sector.key}>
              <Reveal delay={index * 70} className="h-full">
                <article className={CARD}>
                  {sector.image ? (
                    <ZoomImage
                      src={sector.image.src}
                      alt={sector.image.alt}
                      quality={sector.image.quality}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-[168px] rounded-none"
                    />
                  ) : (
                    // segnaposto finché non arriva la foto reale del settore
                    <div className="relative h-[168px] bg-agria-offwhite">
                      <SectorPattern sector={sector.key} />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-3 px-[26px] pb-7 pt-6">
                    <Heading level="h3">{sector.title}</Heading>
                    <Text size="md" muted>
                      {sector.text}
                    </Text>
                    <div className="mt-auto pt-3">
                      <TextLink as={Link} href={sector.href} aria-label={`${sectors.linkLabel}: ${sector.title}`}>
                        {sectors.linkLabel}
                      </TextLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </HoverGroup>
      </Container>
    </Section>
  );
}
