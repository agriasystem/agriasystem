import PageHero from '@/components/agria/sections/PageHero';
import AreaBlocks from '@/components/agria/service/AreaBlocks';
import GoalSelector from '@/components/agria/service/GoalSelector';
import IndexSteps from '@/components/agria/service/IndexSteps';
import FinalCta from '@/components/agria/service/FinalCta';
import { areaSummary, servicesIndex } from '@/content/agria/servizi';
import JsonLd from '@/components/agria/seo/JsonLd';
import { agriaPageMetadata } from '@/lib/seo';
import { breadcrumbNode, graph, webPageNode } from '@/lib/schema';

// Indice dei servizi AGRIA (Prompt 13): struttura propria, non il template delle
// pagine area. Fondi: scuro · bianco · off-white · bianco · off-white · bianco · scuro.
// Le pagine legacy /servizi/[slug] restano (migration map: Prompt 14).
const { meta } = servicesIndex;

export const metadata = agriaPageMetadata(meta);

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Servizi', path: meta.path },
];

export default function ServiziPage() {
  return (
    <>
      <JsonLd data={graph([webPageNode({ ...meta, type: 'CollectionPage' }), breadcrumbNode(BREADCRUMB)])} />
      {/* 1. Hero · scuro */}
      <PageHero
        eyebrow={servicesIndex.eyebrow}
        title={servicesIndex.title}
        lead={servicesIndex.lead}
        cta={servicesIndex.cta}
        titleId="servizi-title"
      />
      {/* 2. Tre aree · bianco, off-white, bianco */}
      <AreaBlocks areas={servicesIndex.areas} linkLabel={servicesIndex.linkLabel} />
      {/* 3. Da dove si parte · off-white */}
      <GoalSelector
        id="servizi-obiettivo"
        title={servicesIndex.goals.title}
        goals={servicesIndex.goals.items}
        areas={areaSummary}
        linkLabel={servicesIndex.linkLabel}
      />
      {/* 4. Come lavoriamo · bianco */}
      <IndexSteps id="servizi-metodo" {...servicesIndex.method} />
      {/* 5. CTA finale · scuro */}
      <FinalCta
        id="servizi-cta-titolo"
        sectionId="servizi-cta-finale"
        title={servicesIndex.closing.title}
        text={servicesIndex.closing.text}
        primary={servicesIndex.closing.cta}
      />
    </>
  );
}
