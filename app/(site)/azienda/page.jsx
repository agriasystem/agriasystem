import JsonLd from '@/components/agria/seo/JsonLd';
import PageHero from '@/components/agria/sections/PageHero';
import Positioning from '@/components/agria/azienda/Positioning';
import PrinciplesAccordion from '@/components/agria/azienda/PrinciplesAccordion';
import TeamCards from '@/components/agria/azienda/TeamCards';
import ResearchBand from '@/components/agria/azienda/ResearchBand';
import TerritoryPhoto from '@/components/agria/azienda/TerritoryPhoto';
import ProcessTimeline from '@/components/agria/azienda/ProcessTimeline';
import MidCta from '@/components/agria/azienda/MidCta';
import CompanyData from '@/components/agria/azienda/CompanyData';
import FinalCta from '@/components/agria/service/FinalCta';
import { site } from '@/lib/data';
import { agriaPageMetadata } from '@/lib/seo';
import { breadcrumbNode, graph, personNode, webPageNode } from '@/lib/schema';
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

// Pagina Azienda AGRIA (Prompt 14, copy definitivo Prompt 17). Nove sezioni con
// fondi scuro · bianco · sfumato · bianco · bianco (percorso e CTA a metà pagina) ·
// scuro · bianco con foto · off-white · scuro.
// Interazioni proprie: fisarmonica orizzontale (principi), ritratti con scheda
// che si apre (team), linea temporale verticale che si illumina allo
// scorrimento (come si lavora con noi). Contenuti in content/agria/azienda.js.

export const metadata = agriaPageMetadata(meta);

// Pagina "chi siamo" dell'organizzazione (lib/schema.js) con le persone del
// team: ruolo e foto come nella pagina, LinkedIn solo dove esiste.
const PERSON_ID = (name) => name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');

const jsonLd = graph([
  webPageNode({ ...meta, type: 'AboutPage', about: true }),
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Azienda', path: meta.path },
  ]),
  ...team.people.map((person) => personNode({ id: PERSON_ID(person.name), ...person })),
]);

export default function AziendaPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

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
      {/* 5. Come si lavora con noi · bianco, poi la CTA a metà pagina */}
      <ProcessTimeline id="azienda-percorso" {...howWeWork} />
      <MidCta cta={howWeWork.cta} />
      {/* 6. Ricerca e sviluppo · scuro */}
      <ResearchBand id="azienda-ricerca" {...research} />
      {/* 7. Territorio · bianco con fotografia */}
      <TerritoryPhoto id="azienda-territorio" {...territory} />
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
