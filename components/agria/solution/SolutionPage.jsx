import Link from 'next/link';
import PageHero from '@/components/agria/sections/PageHero';
import FaqAccordion from '@/components/agria/service/FaqAccordion';
import FinalCta from '@/components/agria/service/FinalCta';
import IconBadge from '@/components/agria/service/IconBadge';
import StickyCta from '@/components/agria/service/StickyCta';
import Icon from '@/components/agria/icons/Icon';
import { Button, Container, Eyebrow, Heading, Reveal, Section, Text, TextLink } from '@/components/agria/ui';
import { getPost } from '@/content/blog';
import { SOLUTIONS_LABEL, solutionPages } from '@/content/agria/soluzioni';
import JsonLd from '@/components/agria/seo/JsonLd';
import { breadcrumbNode, faqNode, graph, serviceNode, webPageNode } from '@/lib/schema';

// Titoli che il copy non fornisce: nome della sezione FAQ (come in /contatti)
// e dei gruppi di rimandi (come nelle pagine area).
const FAQ_TITLE = 'Domande frequenti';
const LINK_GROUPS = { services: 'Servizi', articles: 'Approfondimenti' };

// link su fondo scuro: green-bright (green-dark non raggiunge 4.5:1)
const DARK_LINK =
  'group mt-3 inline-flex items-center gap-1.5 rounded-sm font-agria-sans text-agria-sm font-medium text-agria-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink';

// Template delle pagine soluzione (Prompt 23): hero scuro · il problema
// (bianco) · cosa fa (off-white) · cosa non fa (scuro, ancora del pulsante
// secondario della hero) · come si collega (bianco) · i tre settori
// (off-white) · da dove si parte (bianco) · FAQ (off-white) · CTA finale
// scura, più la CTA fissa. Contenuti in content/agria/soluzioni.js, nessun
// testo qui oltre ai nomi della sezione FAQ e dei gruppi di link.
export default function SolutionPage({ solution }) {
  const { key, meta } = solution;
  const id = (name) => `${key}-${name}`;

  const others = Object.values(solutionPages).filter((other) => other.key !== key);
  const articles = solution.articles
    .map((slug) => getPost(slug))
    .filter(Boolean)
    .map((post) => ({ label: post.title, href: `/blog/${post.slug}` }));
  const links = [
    { title: SOLUTIONS_LABEL, items: others.map((other) => ({ label: other.name, href: other.meta.path })) },
    { title: LINK_GROUPS.services, items: solution.start.areas.map((area) => ({ label: area.name, href: area.href })) },
    ...(articles.length ? [{ title: LINK_GROUPS.articles, items: articles }] : []),
  ];

  const jsonLd = graph([
    webPageNode(meta),
    serviceNode({ name: solution.name, description: meta.description, path: meta.path }),
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Servizi', path: '/servizi' },
      { name: solution.areaName, path: solution.areaHref },
      { name: solution.name, path: meta.path },
    ]),
    faqNode(solution.faq, meta.path),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* 1. Hero · scuro */}
      <PageHero
        eyebrow={solution.hero.eyebrow}
        title={solution.hero.title}
        lead={solution.hero.lead}
        cta={solution.cta}
        secondaryCta={solution.hero.secondary}
        titleId={id('title')}
      />

      {/* 2. Il problema · bianco */}
      <Section background="white" spacing="compact" aria-labelledby={id('problema')}>
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[clamp(32px,5vw,72px)]">
          <Reveal>
            <Heading level="h2" id={id('problema')}>
              {solution.problem.title}
            </Heading>
          </Reveal>
          <Reveal delay={70}>
            <Text size="lg" muted>
              {solution.problem.text}
            </Text>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Cosa fa · off-white */}
      <Section background="offwhite" aria-labelledby={id('cosa-fa')}>
        <Container>
          <Reveal className="flex flex-col gap-5">
            <Heading level="h2" id={id('cosa-fa')} className="max-w-[22ch]">
              {solution.does.title}
            </Heading>
            {solution.does.intro && (
              <Text size="lg" muted>
                {solution.does.intro}
              </Text>
            )}
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
            {solution.does.items.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 70} className="flex h-full flex-col gap-4 rounded-agria-card border border-agria-border bg-agria-white p-7">
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

      {/* 4. Cosa non fa · scuro, ancora del pulsante secondario della hero */}
      <Section background="ink" id={solution.doesNot.anchor} aria-labelledby={id('cosa-non-fa')}>
        <Container>
          <Reveal className="flex flex-col gap-4">
            <Heading level="h2" id={id('cosa-non-fa')} onDark>
              {solution.doesNot.title}
            </Heading>
            {solution.doesNot.intro && (
              <Text size="lg" onDark muted>
                {solution.doesNot.intro}
              </Text>
            )}
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-[clamp(32px,5vw,72px)] gap-y-8 md:mt-12 md:grid-cols-2">
            {solution.doesNot.items.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={(index % 2) * 70} className="flex gap-4 border-t border-white/15 pt-6">
                  <span className="mt-1 shrink-0 text-agria-green-bright">
                    <Icon name="minus" size={18} />
                  </span>
                  <div>
                    <h3 className="font-agria-sans text-agria-body font-medium text-agria-on-dark">{item.title}</h3>
                    <Text size="md" onDark muted className="mt-2">
                      {item.text}
                    </Text>
                    {item.link && (
                      <Link href={item.link.href} className={DARK_LINK}>
                        {item.link.label}
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5. Come si collega a quello che avete già · bianco */}
      <Section background="white" aria-labelledby={id('collegamento')}>
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[clamp(32px,5vw,72px)]">
          <Reveal>
            <Heading level="h2" id={id('collegamento')}>
              {solution.connects.title}
            </Heading>
          </Reveal>
          <Reveal delay={70} className="flex flex-col items-start gap-6">
            <Text size="lg" muted>
              {solution.connects.text}
            </Text>
            {solution.connects.link && (
              <TextLink as={Link} href={solution.connects.link.href}>
                {solution.connects.link.label}
              </TextLink>
            )}
          </Reveal>
        </Container>
      </Section>

      {/* 6. I tre settori · off-white */}
      <Section background="offwhite" aria-labelledby={id('settori')}>
        <Container>
          <Reveal>
            <Heading level="h2" id={id('settori')} className="max-w-[22ch]">
              {solution.sectors.title}
            </Heading>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-[18px] md:mt-12 md:grid-cols-3">
            {solution.sectors.items.map((sector, index) => (
              <li key={sector.key}>
                <Reveal delay={index * 70} className="flex h-full flex-col items-start gap-4 rounded-agria-card border border-agria-border bg-agria-white p-7">
                  <Eyebrow as="h3">{sector.name}</Eyebrow>
                  <Text size="md" muted className="flex-1">
                    {sector.text}
                  </Text>
                  <TextLink as={Link} href={sector.href} aria-label={`${solution.sectors.linkLabel}: ${sector.name}`}>
                    {solution.sectors.linkLabel}
                  </TextLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Da dove si parte · bianco: area di appartenenza e contatti */}
      <Section background="white" aria-labelledby={id('partenza')}>
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-[clamp(32px,5vw,72px)]">
          <Reveal>
            <Heading level="h2" id={id('partenza')}>
              {solution.start.title}
            </Heading>
          </Reveal>
          <Reveal delay={70} className="flex flex-col items-start gap-6">
            <Text size="lg" muted>
              {solution.start.text}
            </Text>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {solution.start.areas.map((area) => (
                <TextLink key={area.href} as={Link} href={area.href}>
                  {area.name}
                </TextLink>
              ))}
              <Button as={Link} href={solution.start.contact.href} variant="secondary">
                {solution.start.contact.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 8. FAQ · off-white */}
      <FaqAccordion id={id('faq')} title={FAQ_TITLE} items={solution.faq} cta={solution.cta} />

      {/* 9. CTA finale · scuro */}
      <FinalCta
        id={id('cta-titolo')}
        sectionId={id('cta-finale')}
        title={solution.closing.title}
        text={solution.closing.text}
        primary={solution.cta}
        secondary={solution.closing.secondary}
        links={links}
      />
      <StickyCta label={solution.cta.label} href={solution.cta.href} endId={id('cta-finale')} />
    </>
  );
}
