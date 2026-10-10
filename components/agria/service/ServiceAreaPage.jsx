import PageHero from '@/components/agria/sections/PageHero';
import { getPost } from '@/content/blog';
import JsonLd from '@/components/agria/seo/JsonLd';
import { breadcrumbNode, faqNode, graph, serviceNode, webPageNode } from '@/lib/schema';
import Diagnosis from './Diagnosis';
import BuildSelector from './BuildSelector';
import AiSection from './AiSection';
import SeoGeo from './SeoGeo';
import IdentityBlock from './IdentityBlock';
import MethodTimeline from './MethodTimeline';
import Deliverables from './Deliverables';
import Verticals from './Verticals';
import MarketsPhoto from './MarketsPhoto';
import FaqAccordion from './FaqAccordion';
import FinalCta from './FinalCta';
import StickyCta from './StickyCta';

// Titoli che il copy non fornisce: nome della sezione FAQ e dei gruppi di
// rimandi (già usati in navigazione e nel Prompt 12).
const FAQ_TITLE = 'FAQ';
const LINK_GROUPS = { services: 'Servizi', articles: 'Approfondimenti', index: 'Tutti i servizi' };

// Template delle pagine area (Prompt 13, concept v6): dieci sezioni con fondi
// scuro · bianco · off-white · bianco · scuro · bianco · off-white · bianco ·
// off-white · scuro, più la CTA fissa. Sezioni facoltative (Prompt 14), solo se
// l'area le definisce: area.seo dopo l'AI (sfumata) e area.identity prima delle
// FAQ (bianca, con filetto). Nessun contenuto qui: la pagina passa
// area (contenuti dell'area), others (le altre due: { name, meta.path }) e
// sectorLabels (nomi delle schede dei verticali).
export default function ServiceAreaPage({ area, others, sectorLabels }) {
  const { key, meta } = area;
  const id = (name) => `${key}-${name}`;

  const links = [
    {
      title: LINK_GROUPS.services,
      items: [
        ...others.map((other) => ({ label: other.name, href: other.meta.path })),
        { label: LINK_GROUPS.index, href: '/servizi' },
      ],
    },
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

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* 1. Hero · scuro */}
      <PageHero
        eyebrow={area.hero.eyebrow}
        title={area.hero.title}
        lead={area.hero.lead}
        cta={area.cta}
        secondaryCta={area.hero.secondary}
        pills={area.hero.pills}
        titleId={id('title')}
      />
      {/* 2. Diagnosi · bianco */}
      <Diagnosis id={id('diagnosi')} {...area.diagnosis} />
      {/* 3. Cosa costruiamo · off-white */}
      <BuildSelector id={id('costruiamo')} {...area.build} />
      {/* 4. AI · bianco */}
      <AiSection id={id('ai')} {...area.ai} />
      {/* 4b. SEO e GEO · sfumato (facoltativa) */}
      {area.seo && <SeoGeo id={id('seo-geo')} {...area.seo} />}
      {/* 5. Metodo · scuro (ancora del "Guardate il metodo") */}
      <MethodTimeline id={id('metodo-titolo')} anchor="metodo" {...area.method} />
      {/* 6. Deliverable · bianco */}
      <Deliverables id={id('deliverable')} {...area.deliverables} />
      {/* 7. Verticali · off-white */}
      <Verticals id={id('verticali')} title={area.verticals.title} sectors={area.verticals.sectors} labels={sectorLabels} />
      {/* 8. Fotografia e mercati · bianco */}
      <MarketsPhoto id={id('mercati')} {...area.markets} />
      {/* 8b. Identità e digital experience · bianco (facoltativa) */}
      {area.identity && <IdentityBlock id={id('identita')} {...area.identity} />}
      {/* 9. FAQ · off-white */}
      <FaqAccordion id={id('faq')} title={FAQ_TITLE} items={area.faq} cta={area.cta} />
      {/* 10. CTA finale · scuro */}
      <FinalCta
        id={id('cta-titolo')}
        sectionId={id('cta-finale')}
        title={area.closing.title}
        text={area.closing.text}
        primary={area.cta}
        secondary={area.closing.secondary}
        links={links}
      />
      <StickyCta label={area.cta.label} href={area.cta.href} endId={id('cta-finale')} />
    </>
  );
}
