import PageHero from '@/components/agria/sections/PageHero';
import SectorCards from '@/components/agria/home/SectorCards';
import SectorPreview from '@/components/agria/home/SectorPreview';
import FinalCta from '@/components/agria/service/FinalCta';
import { sectorsIndex } from '@/content/agria/settori';
import { agriaPageMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';

// Indice dei settori AGRIA: hero scuro · tre settori (off-white) · anteprima
// per settore (bianco) · CTA finale scura. Componenti e testi della homepage.
const { meta } = sectorsIndex;

export const metadata = agriaPageMetadata(meta);

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Settori', path: meta.path },
];

export default function SettoriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema(meta)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(BREADCRUMB)) }}
      />
      <PageHero eyebrow={sectorsIndex.hero.eyebrow} title={sectorsIndex.hero.title} cta={sectorsIndex.cta} titleId="settori-title" />
      <SectorCards eyebrow={null} title={sectorsIndex.cardsTitle} titleId="settori-griglia-title" />
      <SectorPreview />
      <FinalCta
        id="settori-cta-titolo"
        sectionId="settori-cta-finale"
        title={sectorsIndex.closing.title}
        text={sectorsIndex.closing.text}
        primary={sectorsIndex.cta}
      />
    </>
  );
}
