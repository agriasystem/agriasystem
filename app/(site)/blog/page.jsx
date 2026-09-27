import PageHero from '@/components/agria/sections/PageHero';
import ArticleCards from '@/components/agria/sections/ArticleCards';
import FinalCta from '@/components/agria/service/FinalCta';
import { Container, Section } from '@/components/agria/ui';
import { closing, news } from '@/content/agria/home';
import { KEPT_POSTS } from '@/content/blog/kept';
import { getPost } from '@/lib/data';
import { agriaPageMetadata, webPageSchema } from '@/lib/seo';

// Indice degli articoli (Insights) nel layout Agria: solo gli articoli
// mantenuti dalla migration map, dal più recente. Etichetta e titolo della
// sezione News della homepage; meta nuovi, da approvare.
const PAGE = {
  title: 'Insights — siti, vendita diretta e automazioni per hospitality, cantine e frantoi | Agria System',
  description:
    'Articoli su siti, e-commerce, prenotazioni e automazioni per agriturismi, cantine e frantoi: cosa funziona, cosa evitare, da dove partire.',
  path: '/blog',
};

export const metadata = agriaPageMetadata(PAGE);

// nome della sezione in navigazione (footer)
const INSIGHTS = 'Insights';

const articles = KEPT_POSTS.map((slug) => getPost(slug))
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((post) => ({ slug: post.slug, alt: post.imageAlt || '' }));

export default function Blog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema(PAGE)) }} />
      <PageHero eyebrow={INSIGHTS} title={news.title} titleId="blog-title" />
      <Section background="offwhite" aria-labelledby="blog-title">
        <Container>
          <ArticleCards articles={articles} />
        </Container>
      </Section>
      <FinalCta
        id="blog-cta-titolo"
        sectionId="blog-cta-finale"
        title={closing.title}
        text={closing.text}
        primary={closing.cta}
      />
    </>
  );
}
