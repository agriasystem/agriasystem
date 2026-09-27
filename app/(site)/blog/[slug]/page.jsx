import { notFound } from 'next/navigation';
import PageHero from '@/components/agria/sections/PageHero';
import ArticleCards from '@/components/agria/sections/ArticleCards';
import FinalCta from '@/components/agria/service/FinalCta';
import AgriaImage from '@/components/agria/media/AgriaImage';
import { Container, Eyebrow, Heading, Reveal, Section } from '@/components/agria/ui';
import { closing } from '@/content/agria/home';
import { KEPT_POSTS } from '@/content/blog/kept';
import { getPost } from '@/lib/data';
import { AGRIA_BRAND, SITE_URL, agriaPageMetadata, breadcrumbSchema } from '@/lib/seo';
import { RICH_TEXT_AGRIA, isBlockquote, renderRichText, stripBlockquoteMarker } from '@/lib/richtext';

// Articolo nel layout Agria (migration map: KEEP + REWRITE, in attesa della
// riscrittura). Stesso indirizzo e stesso testo, ripulito dai riferimenti
// legacy. Solo gli articoli mantenuti: gli altri sono reindirizzati o 410
// (next.config.js), prima di arrivare qui.
const CTA = closing.cta;
const DATE = { day: '2-digit', month: 'long', year: 'numeric' };
const LABELS = {
  toc: 'In questo articolo',
  related: 'Continua a leggere',
  links: 'Approfondimenti',
  reading: (n) => `${n} min di lettura`,
  updated: 'Aggiornato il',
};

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const formatDate = (value) => new Date(value).toLocaleDateString('it-IT', DATE);

export const dynamicParams = false;

export function generateStaticParams() {
  return KEPT_POSTS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  if (!p) return {};
  const base = agriaPageMetadata({
    title: `${p.seoTitle || p.title} | ${AGRIA_BRAND}`,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
  });
  const image = p.featuredImage ? [{ url: p.featuredImage, width: 1200, height: 630, alt: p.imageAlt || p.title }] : base.openGraph.images;
  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: p.date, images: image },
    twitter: { ...base.twitter, images: image.map((i) => i.url) },
  };
}

function Paragraph({ text }) {
  if (isBlockquote(text)) {
    return (
      <blockquote className="border-l-2 border-agria-green-dark pl-5 font-agria-sans text-agria-lg italic text-agria-graphite">
        {renderRichText(stripBlockquoteMarker(text), RICH_TEXT_AGRIA)}
      </blockquote>
    );
  }
  return <p className="font-agria-sans text-agria-md leading-relaxed text-agria-graphite/85">{renderRichText(text, RICH_TEXT_AGRIA)}</p>;
}

export default function Post({ params }) {
  const p = getPost(params.slug);
  if (!p || !KEPT_POSTS.includes(p.slug)) notFound();

  const related = (p.relatedSlugs || []).filter((slug) => KEPT_POSTS.includes(slug) && getPost(slug));
  const sections = p.body.filter((s) => typeof s !== 'string' && s.h2);
  const wordCount = p.body
    .flatMap((s) => (typeof s === 'string' ? [s] : s.paragraphs))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      image: p.featuredImage ? `${SITE_URL}${p.featuredImage}` : undefined,
      datePublished: p.date,
      dateModified: p.updated || p.date,
      author: { '@type': 'Organization', name: AGRIA_BRAND, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: AGRIA_BRAND,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/brand/agria-logo-centered.svg` },
      },
      mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
      inLanguage: 'it-IT',
      keywords: (p.keywords || []).join(', '),
      wordCount,
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: p.title, path: `/blog/${p.slug}` },
    ]),
  ];

  const links = (p.relatedLinks || []).length ? [{ title: LABELS.links, items: p.relatedLinks.map((l) => ({ label: l.label, href: l.href })) }] : [];

  return (
    <>
      {jsonLd.map((data) => (
        <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      {/* 1. Hero · scuro */}
      <PageHero eyebrow={p.category} title={p.title} lead={p.excerpt} titleId="articolo-titolo" />

      {/* 2. Articolo · bianco */}
      <Section background="white" aria-labelledby="articolo-titolo">
        <Container>
          <p className="flex flex-wrap gap-x-4 gap-y-1 font-agria-sans text-agria-sm text-agria-grey">
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            {p.updated && p.updated !== p.date && (
              <span>
                {LABELS.updated} <time dateTime={p.updated}>{formatDate(p.updated)}</time>
              </span>
            )}
            {p.readingMinutes && <span>{LABELS.reading(p.readingMinutes)}</span>}
          </p>

          {p.featuredImage && (
            <div className="relative mt-6 aspect-[16/7] overflow-hidden rounded-agria-card">
              <AgriaImage src={p.featuredImage} alt={p.imageAlt || ''} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            {sections.length >= 2 ? (
              <nav aria-label={LABELS.toc} className="hidden lg:block">
                <div className="sticky top-28">
                  <Eyebrow as="p">{LABELS.toc}</Eyebrow>
                  <ul className="mt-4 flex flex-col gap-3">
                    {sections.map((s) => (
                      <li key={s.h2}>
                        <a
                          href={`#${slugifyHeading(s.h2)}`}
                          className="rounded-sm font-agria-sans text-agria-sm text-agria-grey hover:text-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark"
                        >
                          {s.h2}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            ) : (
              <div className="hidden lg:block" />
            )}

            <article className="flex max-w-[68ch] flex-col gap-10">
              {p.body.map((section, i) =>
                typeof section === 'string' ? (
                  <Paragraph key={i} text={section} />
                ) : (
                  <div key={section.h2} id={slugifyHeading(section.h2)} className="flex scroll-mt-28 flex-col gap-4">
                    <Heading level="h3" as="h2" className="text-agria-h3">
                      {section.h2}
                    </Heading>
                    {section.paragraphs.map((para, j) => (
                      <Paragraph key={j} text={para} />
                    ))}
                  </div>
                )
              )}
            </article>
          </div>
        </Container>
      </Section>

      {/* 3. Articoli correlati · off-white */}
      {related.length > 0 && (
        <Section background="offwhite" aria-labelledby="articolo-correlati">
          <Container>
            <Reveal>
              <Heading level="h2" id="articolo-correlati">
                {LABELS.related}
              </Heading>
            </Reveal>
            <ArticleCards
              articles={related.map((slug) => ({ slug, alt: getPost(slug).imageAlt || '' }))}
              columns={related.length === 2 ? 2 : 3}
              className="mt-8 md:mt-10"
            />
          </Container>
        </Section>
      )}

      {/* 4. CTA finale · scuro */}
      <FinalCta
        id="articolo-cta-titolo"
        sectionId="articolo-cta-finale"
        title={closing.title}
        text={closing.text}
        primary={CTA}
        links={links}
      />
    </>
  );
}
