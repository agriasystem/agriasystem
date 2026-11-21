import JsonLd from '@/components/agria/seo/JsonLd';
import HomeHero from '@/components/agria/home/HomeHero';
import GlanceStrip from '@/components/agria/home/GlanceStrip';
import ProblemsSection from '@/components/agria/home/ProblemsSection';
import FloorCards from '@/components/agria/home/FloorCards';
import SelectionSection from '@/components/agria/home/SelectionSection';
import MethodSection from '@/components/agria/home/MethodSection';
import TeamSection from '@/components/agria/home/TeamSection';
import HomeFaq from '@/components/agria/home/HomeFaq';
import NewsSection from '@/components/agria/home/NewsSection';
import HomeClosing from '@/components/agria/home/HomeClosing';
import { faq } from '@/content/agria/home';
import { site } from '@/lib/data';
import { pageMetadata } from '@/lib/seo';
import { faqNode, graph, webPageNode } from '@/lib/schema';

const PAGE = {
  title: 'Agria System — siti, e-commerce e automazioni per hospitality, cantine e frantoi',
  description: site.positioning,
  path: '/',
};

export const metadata = pageMetadata(PAGE);

// Organizzazione e sito sono nel layout (lib/schema.js): qui la pagina e le
// domande frequenti (sezione 11).
const jsonLdGraph = graph([webPageNode({ ...PAGE, breadcrumb: false, about: true }), faqNode(faq.items, PAGE.path)]);

// Ordine del Prompt 28. Fase B: edificio (apertura, sezione 4, chiusura) e la
// lista dei problemi (3); la 5 (schema), la 6 (assistente) e la 7 (reparti)
// arrivano con la Fase C.
export default function Home() {
  return (
    <>
      <JsonLd data={jsonLdGraph} />
      <HomeHero />
      <GlanceStrip />
      <ProblemsSection />
      <FloorCards />
      <SelectionSection />
      <MethodSection />
      <TeamSection />
      <HomeFaq />
      <NewsSection />
      <HomeClosing />
    </>
  );
}
