import Link from 'next/link';
import { Eyebrow, Reveal } from '@/components/agria/ui';
import { HoverGroup, ZoomImage } from '@/components/agria/motion';
import { getPost } from '@/content/blog';

const CARD =
  'agria-zoom-trigger relative flex h-full flex-col overflow-hidden rounded-agria-card border border-agria-border bg-agria-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-agria-green/45 hover:shadow-[0_18px_42px_rgb(var(--agria-graphite)/0.07)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-agria-green-dark has-[a:focus-visible]:ring-offset-2';

// Card di articoli reali del blog: immagine, etichetta (categoria del post) e
// titolo (h3, oppure headingLevel dove la pagina non ha h2 sopra le card).
// Tutta la card porta all'articolo (link esteso sul titolo).
// articles: [{ slug, alt }] — alt scritto da chi usa il componente.
// keepEcommerce: solo in visualizzazione, il trattino di «e-commerce» diventa
// unificatore (U+2011), così il titolo non va a capo dentro la parola («l’e- /
// commerce», Prompt 33); il dato dell'articolo non cambia. Lo usa l'indice /blog.
const NB_HYPHEN = String.fromCodePoint(0x2011);
const NO_BREAK = (text) => text.replace(/(e)-(commerce)/gi, `$1${NB_HYPHEN}$2`);

export default function ArticleCards({ articles, columns = 3, className = '', headingLevel = 'h3', keepEcommerce = false }) {
  const Title = headingLevel;
  const items = articles.map((article) => ({ ...article, post: getPost(article.slug) })).filter((a) => a.post);
  const grid = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
  const sizes = columns === 2 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw';

  return (
    <HoverGroup as="ul" className={`grid grid-cols-1 gap-[18px] ${grid} ${className}`}>
      {items.map(({ slug, alt, post }, index) => (
        <li key={slug}>
          <Reveal delay={index * 70} className="h-full">
            <article className={CARD}>
              <ZoomImage src={post.featuredImage} alt={alt} sizes={sizes} className="aspect-[2/1] rounded-none" />
              <div className="flex flex-1 flex-col gap-3 px-[26px] pb-7 pt-6">
                <Eyebrow>{post.category}</Eyebrow>
                <Title className="font-agria-sans text-agria-h3 text-agria-graphite">
                  <Link
                    href={`/blog/${slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {keepEcommerce ? NO_BREAK(post.title) : post.title}
                  </Link>
                </Title>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </HoverGroup>
  );
}
