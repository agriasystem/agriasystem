import PageHero from '@/components/agria/sections/PageHero';
import { Container, Section, Text } from '@/components/agria/ui';
import * as home from '@/content/agria/home';
import * as azienda from '@/content/agria/azienda';
import { serviceAreas } from '@/content/agria/servizi-aree';
import { KEPT_POSTS } from '@/content/blog/kept';
import { getPost } from '@/lib/data';
import { agriaImageCredits } from '@/lib/agria-images';
import { agriaPageMetadata, webPageSchema } from '@/lib/seo';
import blogCredits from '@/public/images/blog/CREDITS.json';
import softwareCredits from '@/public/images/software/CREDITS.json';
import serviziCredits from '@/public/images/servizi/CREDITS.json';

// Crediti delle foto Unsplash, generati dai dati: manifest della pipeline
// Agria (content/agria/image-credits.json) e CREDITS.json delle cartelle
// precedenti, limitati alle foto davvero pubblicate (pagine Agria e articoli
// mantenuti). Parametri utm di Unsplash con il nome dell'applicazione Agria.
const PAGE = {
  title: 'Crediti immagini | Agria System',
  description: 'Attribuzione dei fotografi Unsplash per le immagini pubblicate sul sito di Agria System.',
  path: '/crediti-immagini',
};

export const metadata = {
  ...agriaPageMetadata(PAGE),
  robots: { index: false, follow: true },
};

const UTM_SOURCE = 'agria_website';
const withUtm = (url) => {
  const u = new URL(url);
  u.searchParams.set('utm_source', UTM_SOURCE);
  u.searchParams.set('utm_medium', 'referral');
  return u.toString();
};

// percorsi delle foto locali usate dalle pagine Agria e dagli articoli mantenuti
const published = [
  JSON.stringify([home, azienda, serviceAreas]),
  ...KEPT_POSTS.map((slug) => getPost(slug)?.featuredImage || ''),
].join(' ');
const legacy = [
  ['blog', blogCredits],
  ['software', softwareCredits],
  ['servizi', serviziCredits],
].flatMap(([dir, credits]) => credits.filter((c) => published.includes(`/images/${dir}/${c.slug}.`)));

const credits = [...legacy, ...agriaImageCredits()]
  .map((c) => ({ photographer: c.photographer, profileUrl: withUtm(c.profileUrl), photoUrl: withUtm(c.photoUrl) }))
  .filter((c, i, all) => all.findIndex((o) => o.photoUrl === c.photoUrl) === i)
  .sort((a, b) => a.photographer.localeCompare(b.photographer, 'it'));

const LINK =
  'rounded-sm font-medium text-agria-green-dark underline-offset-4 hover:text-agria-graphite hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark';

export default function CreditiImmaginiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema(PAGE)) }} />
      <PageHero
        eyebrow="Attribuzione"
        title="Crediti immagini"
        lead="Molte fotografie del sito arrivano da Unsplash. Qui l'elenco dei fotografi, con il link a ogni foto."
        titleId="crediti-title"
      />
      <Section background="white" aria-labelledby="crediti-title">
        <Container>
          <Text muted>
            Fotografie pubblicate con la{' '}
            <a href={withUtm('https://unsplash.com/license')} className={LINK} target="_blank" rel="noopener noreferrer">
              licenza Unsplash
            </a>
            .
          </Text>
          <ul className="mt-8 divide-y divide-agria-border border-y border-agria-border">
            {credits.map((c) => (
              <li key={c.photoUrl} className="flex flex-wrap items-center justify-between gap-3 py-3.5 font-agria-sans text-agria-sm">
                <span className="text-agria-graphite">
                  Foto di{' '}
                  <a href={c.profileUrl} className={LINK} target="_blank" rel="noopener noreferrer">
                    {c.photographer}
                  </a>
                </span>
                <a href={c.photoUrl} className={`${LINK} text-agria-grey`} target="_blank" rel="noopener noreferrer">
                  Vedi la foto
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
