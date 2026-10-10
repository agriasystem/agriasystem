import JsonLd from '@/components/agria/seo/JsonLd';
import HomeHero from '@/components/agria/home/HomeHero';
import FactStrip from '@/components/agria/home/FactStrip';
import ProblemSwitch from '@/components/agria/home/ProblemSwitch';
import ServiceCards from '@/components/agria/home/ServiceCards';
import SystemComposer from '@/components/agria/home/SystemComposer';
import SectorCards from '@/components/agria/home/SectorCards';
import SectorPreview from '@/components/agria/home/SectorPreview';
import MethodSection from '@/components/agria/home/MethodSection';
import ResearchSection from '@/components/agria/home/ResearchSection';
import WhenWeHelp from '@/components/agria/sections/WhenWeHelp';
import NewsSection from '@/components/agria/home/NewsSection';
import TerritoryBand from '@/components/agria/home/TerritoryBand';
import ClosingCta from '@/components/agria/home/ClosingCta';
import { site } from '@/lib/data';
import { pageMetadata } from '@/lib/seo';
import { graph, webPageNode } from '@/lib/schema';

const PAGE = {
  title: 'Agria System — sistemi digitali per hospitality, cantine e frantoi',
  description: site.positioning,
  path: '/',
};

export const metadata = pageMetadata(PAGE);

// Organizzazione e sito sono nel layout (lib/schema.js): qui la sola pagina.
const jsonLdGraph = graph(webPageNode({ ...PAGE, breadcrumb: false, about: true }));

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLdGraph} />
      {/* problema → soluzione → per chi → prova → chi siamo → contatto (Prompt 11) */}
      <HomeHero />
      <FactStrip />
      <ProblemSwitch />
      <ServiceCards />
      <WhenWeHelp />
      <SystemComposer />
      <SectorCards />
      <SectorPreview />
      <MethodSection />
      <ResearchSection />
      <NewsSection />
      <TerritoryBand />
      <ClosingCta />
    </>
  );
}
