import Link from 'next/link';
import PageHero from '@/components/agria/sections/PageHero';
import FinalCta from '@/components/agria/service/FinalCta';
import IconBadge from '@/components/agria/service/IconBadge';
import PhotoCredit from '@/components/agria/media/PhotoCredit';
import { ZoomImage } from '@/components/agria/motion';
import { Container, Eyebrow, Heading, Reveal, Section, Text, TextLink } from '@/components/agria/ui';
import { getPost } from '@/content/blog';
import { AREA_LINK_LABEL } from '@/content/agria/settori';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo';

const LINK_GROUPS = { sectors: 'Settori', articles: 'Approfondimenti', index: 'Tutti i settori' };

// Template delle pagine settore: hero scuro · settore con foto (bianco) ·
// le tre aree applicate al settore (off-white, bianco, off-white) · CTA finale
// scura con gli altri settori e gli articoli collegati. Contenuti in
// content/agria/settori.js, nessun testo qui oltre ai nomi dei gruppi di link.
export default function SectorPage({ sector, others }) {
  const { key, meta } = sector;
  const id = (name) => `${key}-${name}`;

  const links = [
    {
      title: LINK_GROUPS.sectors,
      items: [
        ...others.map((other) => ({ label: other.name, href: other.meta.path })),
        { label: LINK_GROUPS.index, href: '/settori' },
      ],
    },
    {
      title: LINK_GROUPS.articles,
      items: sector.articles
        .map((slug) => getPost(slug))
        .filter(Boolean)
        .map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
    },
  ];

  const jsonLd = [
    webPageSchema(meta),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Settori', path: '/settori' },
      { name: sector.name, path: meta.path },
    ]),
  ];

  return (
    <>
      {jsonLd.map((data) => (
        <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      {/* 1. Hero · scuro */}
      <PageHero
        eyebrow={sector.hero.eyebrow}
        title={sector.hero.title}
        lead={sector.hero.lead}
        cta={sector.cta}
        titleId={id('title')}
      />

      {/* 2. Il settore · bianco, foto con credito */}
      <Section background="white" aria-labelledby={id('settore')}>
        <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-[clamp(32px,5vw,72px)]">
          <figure className="m-0">
            <ZoomImage
              src={sector.intro.image.src}
              alt={sector.intro.image.alt}
              quality={sector.intro.image.quality}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3]"
            />
            <PhotoCredit as="figcaption" credit={sector.intro.image.credit} className="mt-3" />
          </figure>
          <Reveal className="flex flex-col items-start gap-5">
            <Eyebrow>{sector.intro.eyebrow}</Eyebrow>
            <Heading level="h2" id={id('settore')}>
              {sector.intro.title}
            </Heading>
            <Text size="lg" muted>
              {sector.intro.text}
            </Text>
            <ul className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              {sector.intro.tiles.map((tile) => (
                <li key={tile.title} className="rounded-agria-card border border-agria-border bg-agria-offwhite px-5 py-4">
                  <p className="font-agria-sans text-agria-body font-medium text-agria-graphite">{tile.title}</p>
                  <Text size="sm" muted>
                    {tile.text}
                  </Text>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Le tre aree per il settore · off-white, bianco, off-white */}
      {sector.areas.map((area, index) => (
        <Section
          key={area.key}
          background={index % 2 === 0 ? 'offwhite' : 'white'}
          spacingTop={index === 0 ? 'normal' : 'compact'}
          aria-labelledby={id(`area-${area.key}`)}
        >
          <Container>
            <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="flex flex-col gap-4">
                {index === 0 && <Eyebrow>{sector.areasTitle}</Eyebrow>}
                <Heading level="h2" id={id(`area-${area.key}`)}>
                  {area.name}
                </Heading>
                <Text size="lg" muted>
                  {area.description}
                </Text>
              </div>
              <TextLink as={Link} href={area.href} aria-label={`${AREA_LINK_LABEL}: ${area.name}`} className="shrink-0">
                {AREA_LINK_LABEL}
              </TextLink>
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
              {area.items.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * 70} className="flex h-full flex-col gap-4 rounded-agria-card border border-agria-border bg-agria-white p-7">
                    <IconBadge name={item.icon} />
                    <h3 className="font-agria-sans text-agria-body font-medium text-agria-graphite">{item.title}</h3>
                    <Text size="sm" muted>
                      {item.text}
                    </Text>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      {/* 4. CTA finale · scuro */}
      <FinalCta
        id={id('cta-titolo')}
        sectionId={id('cta-finale')}
        title={sector.closing.title}
        text={sector.closing.text}
        primary={sector.cta}
        links={links}
      />
    </>
  );
}
