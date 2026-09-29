import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import PageHero from '@/components/agria/sections/PageHero';
import ArticleCards from '@/components/agria/sections/ArticleCards';
import FinalCta from '@/components/agria/service/FinalCta';
import AgriaImage from '@/components/agria/media/AgriaImage';
import PhotoCredit from '@/components/agria/media/PhotoCredit';
import { Container, Eyebrow, Heading, Reveal, Section, TextLink } from '@/components/agria/ui';
import Link from 'next/link';
import { closing } from '@/content/agria/home';
import { KEPT_POSTS } from '@/content/blog/kept';
import { getPost } from '@/lib/data';
import { AGRIA_BRAND, SITE_URL, agriaPageMetadata, breadcrumbSchema } from '@/lib/seo';
import { RICH_TEXT_AGRIA, isBlockquote, renderRichText, stripBlockquoteMarker } from '@/lib/richtext';

// Articolo nel layout Agria (migration map: KEEP + REWRITE). Solo gli articoli
// mantenuti: gli altri sono reindirizzati o 410 (middleware.js).
// Campi facoltativi del post, per gli articoli riscritti:
// - description: meta description (altrimenti excerpt);
// - midLink: { text, label, href } rimando a servizio o settore a metà articolo;
// - cta: { title, text } CTA finale contestuale verso /contatti;
// - updated: data dell'ultima revisione (dateModified e sitemap);
// - notice: [stringhe] avvertenza mostrata prima dell'immagine e del corpo
//   (per esempio: l'articolo non sostituisce un parere professionale).
// I clic verso /contatti nella pagina inviano contact_click (con consenso):
// data-analytics-article sul contenitore, location sul collegamento.
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

// URL assoluto dell'immagine per Open Graph e JSON-LD: le foto della pipeline
// Unsplash (hotlinking) le ritaglia il CDN a 1200×630, le foto locali sono
// percorsi del sito.
function shareImage(src) {
  if (!src.startsWith('https://images.unsplash.com/')) return `${SITE_URL}${src}`;
  const url = new URL(src);
  Object.entries({ w: '1200', h: '630', fit: 'crop', q: '80', fm: 'jpg' }).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

export const dynamicParams = false;

export function generateStaticParams() {
  return KEPT_POSTS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  if (!p) return {};
  const base = agriaPageMetadata({
    title: `${p.seoTitle || p.title} | ${AGRIA_BRAND}`,
    description: p.description || p.excerpt,
    path: `/blog/${p.slug}`,
  });
  const image = p.featuredImage ? [{ url: shareImage(p.featuredImage), width: 1200, height: 630, alt: p.imageAlt || p.title }] : base.openGraph.images;
  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: p.date, modifiedTime: p.updated || p.date, images: image },
    twitter: { ...base.twitter, images: image.map((i) => i.url) },
  };
}

// Rimando contestuale a metà articolo: una riga e un collegamento a servizio o
// settore. Non è una CTA commerciale.
function MidLink({ text, label, href }) {
  return (
    <aside className="rounded-agria-card border border-agria-border bg-agria-offwhite px-6 py-5">
      <p className="font-agria-sans text-agria-md text-agria-graphite">{text}</p>
      <TextLink as={Link} href={href} className="mt-3">
        {label}
      </TextLink>
    </aside>
  );
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
      '@type': 'Article',
      headline: p.title,
      description: p.description || p.excerpt,
      image: p.featuredImage ? shareImage(p.featuredImage) : undefined,
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

  // rimando a metà articolo: dopo il blocco centrale del corpo
  const midAfter = Math.ceil(p.body.length / 2) - 1;
  const cta = p.cta || closing;

  const links = (p.relatedLinks || []).length ? [{ title: LABELS.links, items: p.relatedLinks.map((l) => ({ label: l.label, href: l.href })) }] : [];

  return (
    <>
      {jsonLd.map((data) => (
        <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <div data-analytics-article={p.slug}>
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

          {p.notice?.length > 0 && (
            <aside role="note" className="mt-6 flex max-w-[80ch] flex-col gap-2 rounded-agria-card border-l-2 border-agria-green-dark bg-agria-offwhite px-6 py-5">
              {p.notice.map((text, i) => (
                <p key={i} className="font-agria-sans text-agria-md text-agria-graphite">
                  {renderRichText(text, RICH_TEXT_AGRIA)}
                </p>
              ))}
            </aside>
          )}

          {p.featuredImage && (
            <figure className="m-0 mt-6">
              <div className="relative aspect-[16/7] overflow-hidden rounded-agria-card">
                <AgriaImage src={p.featuredImage} alt={p.imageAlt || ''} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
              </div>
              <PhotoCredit as="figcaption" credit={p.imageCredit} className="mt-3" />
            </figure>
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
              {p.body.map((section, i) => (
                <Fragment key={typeof section === 'string' ? i : section.h2}>
                  {typeof section === 'string' ? (
                    <Paragraph text={section} />
                  ) : (
                    <div id={slugifyHeading(section.h2)} className="flex scroll-mt-28 flex-col gap-4">
                      <Heading level="h3" as="h2" className="text-agria-h3">
                        {section.h2}
                      </Heading>
                      {section.paragraphs.map((para, j) => (
                        <Paragraph key={j} text={para} />
                      ))}
                    </div>
                  )}
                  {i === midAfter && p.midLink && <MidLink {...p.midLink} />}
                </Fragment>
              ))}
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
        title={cta.title}
        text={cta.text}
        primary={CTA}
        primaryProps={{ 'data-analytics-location': 'article_cta' }}
        links={links}
      />
      </div>
    </>
  );
}
