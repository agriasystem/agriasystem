import PageHero from '@/components/agria/sections/PageHero';
import Positioning from '@/components/agria/azienda/Positioning';
import PrinciplesAccordion from '@/components/agria/azienda/PrinciplesAccordion';
import TeamCards from '@/components/agria/azienda/TeamCards';
import ResearchBand from '@/components/agria/azienda/ResearchBand';
import TerritoryPhoto from '@/components/agria/azienda/TerritoryPhoto';
import ProcessTimeline from '@/components/agria/azienda/ProcessTimeline';
import CompanyData from '@/components/agria/azienda/CompanyData';
import FinalCta from '@/components/agria/service/FinalCta';
import { site } from '@/lib/data';
import { AGRIA_BRAND, SITE_URL, agriaPageMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import {
  meta,
  hero,
  positioning,
  principles,
  team,
  research,
  territory,
  howWeWork,
  company,
  closing,
} from '@/content/agria/azienda';

// Pagina Azienda AGRIA (Prompt 14). Nove sezioni con fondi scuro · bianco ·
// sfumato · bianco · scuro · bianco con foto · bianco · off-white · scuro.
// Interazioni proprie: fisarmonica orizzontale (principi), ritratti con scheda
// che si apre (team), linea temporale verticale che si illumina allo
// scorrimento (come si lavora con noi). Contenuti in content/agria/azienda.js.

export const metadata = agriaPageMetadata(meta);

// Organization con i dati reali (indirizzo, P.IVA, contatti come nello schema
// della homepage): nessun profilo social finché non esiste.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: AGRIA_BRAND,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/agria-logo-centered.svg`,
  description: meta.description,
  telephone: site.phone,
  email: site.email,
  vatID: company.vat,
  // persone del team con il loro ruolo (Person con jobTitle)
  employee: team.people.map((person) => ({ '@type': 'Person', name: person.name, jobTitle: person.role })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.province,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
};

const jsonLd = [
  webPageSchema(meta),
  organizationSchema,
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Azienda', path: meta.path },
  ]),
];

export default function AziendaPage() {
  return (
    <>
      {jsonLd.map((data) => (
        <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      {/* 1. Hero · scuro, con la scena dei filari */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        cta={hero.primary}
        secondaryCta={hero.secondary}
        titleId="azienda-title"
      />
      {/* 2. Posizionamento · bianco */}
      <Positioning id="azienda-chi-siamo" {...positioning} />
      {/* 3. Principi · sfumato */}
      <PrinciplesAccordion id="azienda-principi" {...principles} />
      {/* 4. Team · bianco */}
      <TeamCards id="azienda-team" {...team} />
      {/* 5. Ricerca e sviluppo · scuro */}
      <ResearchBand id="azienda-ricerca" {...research} />
      {/* 6. Territorio · bianco con fotografia */}
      <TerritoryPhoto id="azienda-territorio" {...territory} />
      {/* 7. Come si lavora con noi · bianco */}
      <ProcessTimeline id="azienda-percorso" {...howWeWork} />
      {/* 8. Dati aziendali · off-white */}
      <CompanyData id="azienda-dati" {...company} email={site.email} phone={site.phone} />
      {/* 9. CTA finale · scuro */}
      <FinalCta
        id="azienda-cta-titolo"
        sectionId="azienda-cta-finale"
        title={closing.title}
        text={closing.text}
        primary={closing.cta}
      />
    </>
  );
}
