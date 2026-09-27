import HomeHero from '@/components/agria/home/HomeHero';
import FactStrip from '@/components/agria/home/FactStrip';
import ProblemSwitch from '@/components/agria/home/ProblemSwitch';
import ServiceCards from '@/components/agria/home/ServiceCards';
import SystemComposer from '@/components/agria/home/SystemComposer';
import SectorCards from '@/components/agria/home/SectorCards';
import SectorPreview from '@/components/agria/home/SectorPreview';
import MethodSection from '@/components/agria/home/MethodSection';
import ClaritySection from '@/components/agria/home/ClaritySection';
import NewsSection from '@/components/agria/home/NewsSection';
import TerritoryBand from '@/components/agria/home/TerritoryBand';
import ClosingCta from '@/components/agria/home/ClosingCta';
import { site } from '@/lib/data';
import { pageMetadata, webPageSchema, SITE_URL } from '@/lib/seo';

const BRAND = 'Agria';

const PAGE = {
  title: 'Agria — sistemi digitali per hospitality, cantine e frantoi',
  description:
    'Siti, e-commerce e automazioni per agriturismi, hotel, cantine e frantoi. Progettiamo sistemi digitali integrati con gli strumenti che già usate.',
  path: '/',
};

// La root page condivide il segmento con app/layout.jsx: il title.template
// lì definito non si applica qui, quindi il <title> è esattamente PAGE.title.
// pageMetadata aggiunge al titolo social il nome del sito (site.name): qui lo
// sovrascriviamo. Immagine social: quella predefinita di Agria (OG_IMAGE).
const base = pageMetadata(PAGE);
const { openGraph, twitter } = base;

export const metadata = {
  ...base,
  keywords: null,
  openGraph: { ...openGraph, title: PAGE.title, siteName: BRAND },
  twitter: { ...twitter, title: PAGE.title },
};

// Dati di contatto e indirizzo invariati rispetto allo schema legacy; niente
// founder né profili social personali.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/agria-logo-centered.svg`,
  description: PAGE.description,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.province,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema(PAGE)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* problema → soluzione → per chi → prova → chi siamo → contatto (Prompt 11) */}
      <HomeHero />
      <FactStrip />
      <ProblemSwitch />
      <ServiceCards />
      <SystemComposer />
      <SectorCards />
      <SectorPreview />
      <MethodSection />
      <ClaritySection />
      <NewsSection />
      <TerritoryBand />
      <ClosingCta />
    </>
  );
}
