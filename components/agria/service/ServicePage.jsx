import Link from 'next/link';
import PageHero from '@/components/agria/sections/PageHero';
import { Button, Container, Reveal } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { QUICK_CONTACT } from '@/components/agria/nav-data';
import { ArrowLabel, HomeIntro, HomeSection, TwoTone } from '@/components/agria/home/parts';
import MethodSection from '@/components/agria/home/MethodSection';
import HomeFaq from '@/components/agria/home/HomeFaq';
import { getPost } from '@/content/blog';
import { SOLUTIONS_LABEL, solutionLinks } from '@/content/agria/soluzioni';
import JsonLd from '@/components/agria/seo/JsonLd';
import { breadcrumbNode, faqNode, graph, serviceNode, webPageNode } from '@/lib/schema';
import SectorTabs from './SectorTabs';
import FinalCta from './FinalCta';
import StickyCta from './StickyCta';
import BookingScreen from './screens/BookingScreen';

// Pagina area del Prompt 29: otto sezioni, uguali per le tre aree, con l'aspetto
// della homepage (base offwhite, titoli bicolore, card bianche).
// 1 apertura · 2 tre problemi · 3 la schermata · 4 cosa costruiamo · 5 per il
// vostro mestiere · 6 come lavoriamo (i quattro passi della home, #come-lavoriamo)
// · 7 domande frequenti · 8 chiusura con gli articoli collegati.
// Testi in content/agria/servizi-aree.js; nessun testo qui, tranne i nomi dei
// gruppi di rimandi e il titolo delle FAQ (sotto).
const FAQ_TITLE = 'Domande frequenti';
const LINK_GROUPS = { services: 'Servizi', articles: 'Approfondimenti', index: 'Tutti i servizi' };
const NOTE = 'Esempio illustrativo: nomi e contenuti di fantasia.';
const SCREENS = { booking: BookingScreen };

function Cards({ items, columns }) {
  return (
    <div className={`mt-10 grid grid-cols-1 gap-[18px] md:mt-12 ${columns}`}>
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 70} className="h-full">
          <div className="flex h-full flex-col gap-3 rounded-agria-card border border-agria-border bg-agria-white p-8">
            <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{item.title}</h3>
            <p className="font-agria-sans text-agria-md text-agria-grey">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Points({ points }) {
  return (
    <ul className="flex flex-col gap-4">
      {points.map((point) => (
        <li key={point} className="flex gap-3">
          <span className="mt-0.5 shrink-0 text-agria-green-dark">
            <Icon name="check" size={18} />
          </span>
          <span className="font-agria-sans text-agria-body text-agria-graphite">{point}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicePage({ area, others }) {
  const { key, meta } = area;
  const id = (name) => `${key}-${name}`;
  const solutions = solutionLinks(key);
  const links = [
    {
      title: LINK_GROUPS.services,
      items: [...others.map((other) => ({ label: other.name, href: other.meta.path })), { label: LINK_GROUPS.index, href: '/servizi' }],
    },
    ...(solutions.length ? [{ title: SOLUTIONS_LABEL, items: solutions }] : []),
    {
      title: LINK_GROUPS.articles,
      items: area.articles
        .map(({ slug }) => getPost(slug))
        .filter(Boolean)
        .map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
    },
  ];
  const jsonLd = graph([
    webPageNode(meta),
    serviceNode({ name: area.name, description: meta.description, path: meta.path }),
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Servizi', path: '/servizi' },
      { name: area.name, path: meta.path },
    ]),
    faqNode(area.faq, meta.path),
  ]);
  const screensTitle = area.screensTitle ?? area.screens[0].title;

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* 1. Apertura · scuro */}
      <PageHero
        eyebrow={area.hero.eyebrow}
        title={<TwoTone title={area.hero.title} onDark />}
        lead={area.hero.lead}
        cta={area.cta}
        secondaryCta={area.hero.secondary}
        pills={area.hero.pills}
        titleId={id('title')}
      />

      {/* 2. Tre problemi */}
      <HomeSection aria-labelledby={id('problemi-title')}>
        <Container>
          <HomeIntro title={area.diagnosis.title} titleId={id('problemi-title')} />
          <Cards items={area.diagnosis.items} columns="md:grid-cols-3" />
          <Button as={Link} href={area.diagnosis.cta.href} variant="primary" className="mt-8 md:mt-10">
            <ArrowLabel label={area.diagnosis.cta.label} />
          </Button>
        </Container>
      </HomeSection>

      {/* 3. La schermata (o le schermate) */}
      <HomeSection aria-labelledby={id('schermata-title')}>
        <Container>
          <HomeIntro title={screensTitle} titleId={id('schermata-title')} />
          <div className="mt-10 flex flex-col gap-20 md:mt-12">
            {area.screens.map((screen) => {
              const Screen = SCREENS[screen.kind];
              return <Screen key={screen.key} screen={screen} titleId={id('schermata-title')} note={NOTE} />;
            })}
          </div>
        </Container>
      </HomeSection>

      {/* 4. Cosa costruiamo */}
      <HomeSection aria-labelledby={id('costruiamo-title')}>
        <Container>
          <HomeIntro title={area.build.title} titleId={id('costruiamo-title')} />
          <Cards items={area.build.items} columns="md:grid-cols-2" />
        </Container>
      </HomeSection>

      {/* 5. Per il vostro mestiere: schede da md, fisarmonica sotto */}
      <HomeSection aria-labelledby={id('mestiere-title')}>
        <Container>
          <HomeIntro title={area.sectors.title} titleId={id('mestiere-title')} />
          <div className="mt-10 hidden md:mt-12 md:block">
            <SectorTabs titles={area.sectors.items.map((sector) => sector.title)}>
              {area.sectors.items.map((sector) => (
                <div key={sector.key}>
                  <h3 className="sr-only">{sector.title}</h3>
                  <Points points={sector.points} />
                </div>
              ))}
            </SectorTabs>
          </div>
          <div className="mt-8 flex flex-col gap-[10px] md:hidden">
            {area.sectors.items.map((sector, index) => (
              <details key={sector.key} name={id('mestiere')} open={index === 0} className="group rounded-agria-card border border-agria-border bg-agria-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-agria-card px-6 py-5 font-agria-sans text-agria-body font-medium text-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark [&::-webkit-details-marker]:hidden">
                  <h3>{sector.title}</h3>
                  <span className="shrink-0 text-agria-green-dark" aria-hidden="true">
                    <span className="group-open:hidden">
                      <Icon name="plus" />
                    </span>
                    <span className="hidden group-open:inline">
                      <Icon name="minus" />
                    </span>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <Points points={sector.points} />
                </div>
              </details>
            ))}
          </div>
        </Container>
      </HomeSection>

      {/* 6. Come lavoriamo: i quattro passi della homepage (#come-lavoriamo) */}
      <MethodSection eyebrow={null} title={area.method?.title} text={area.method?.text} />

      {/* 7. Domande frequenti */}
      <HomeFaq eyebrow={null} title={FAQ_TITLE} items={area.faq} group={id('faq')} titleId={id('faq-title')} />

      {/* 8. Chiusura · scuro, con i rimandi e gli articoli collegati */}
      <FinalCta
        id={id('cta-titolo')}
        sectionId={id('cta-finale')}
        title={<TwoTone title={area.closing.title} onDark />}
        text={area.closing.text}
        primary={area.cta}
        secondary={{ label: area.closing.secondary.label, href: QUICK_CONTACT.whatsapp.href }}
        secondaryProps={{ target: '_blank', rel: 'noopener', 'data-analytics': 'whatsapp', 'data-analytics-location': `${key}_chiusura` }}
        links={links}
        glow={false}
      />
      <StickyCta label={area.cta.label} href={area.cta.href} endId={id('cta-finale')} />
    </>
  );
}
