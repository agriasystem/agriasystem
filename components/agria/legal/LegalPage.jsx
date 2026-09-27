import PageHero from '@/components/agria/sections/PageHero';
import { Container, Heading, Section } from '@/components/agria/ui';
import { LAST_UPDATED } from '@/content/agria/legale';
import { RICH_TEXT_AGRIA, renderRichText } from '@/lib/richtext';
import { webPageSchema } from '@/lib/seo';

// Pagina legale nel layout Agria: hero scuro con la data di ultimo
// aggiornamento, poi le sezioni in una colonna di lettura. Ogni sezione:
// paragraphs, list, after, list2, after2 (in quest'ordine, tutti facoltativi).
const UPDATED_LABEL = 'Ultimo aggiornamento';
const updated = new Date(LAST_UPDATED).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

const P = 'font-agria-sans text-agria-md leading-relaxed text-agria-graphite/85';

function Paragraphs({ items }) {
  return (items || []).map((text, i) => (
    <p key={i} className={P}>
      {renderRichText(text, RICH_TEXT_AGRIA)}
    </p>
  ));
}

function List({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-agria-green-dark">
      {items.map((text, i) => (
        <li key={i} className={P}>
          {renderRichText(text, RICH_TEXT_AGRIA)}
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage({ page, id }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema(page.meta)) }} />
      <PageHero eyebrow={`${UPDATED_LABEL}: ${updated}`} title={page.title} lead={page.lead} titleId={`${id}-title`} />
      <Section background="white" aria-labelledby={`${id}-title`}>
        <Container>
          <div className="flex max-w-[72ch] flex-col gap-12">
            {page.sections.map((section) => (
              <section key={section.h2} className="flex flex-col gap-4">
                <Heading level="h3" as="h2">
                  {section.h2}
                </Heading>
                <Paragraphs items={section.paragraphs} />
                <List items={section.list} />
                <Paragraphs items={section.after} />
                <List items={section.list2} />
                <Paragraphs items={section.after2} />
              </section>
            ))}
            <p className="font-agria-sans text-agria-sm text-agria-grey">
              {UPDATED_LABEL}: <time dateTime={LAST_UPDATED}>{updated}</time>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
