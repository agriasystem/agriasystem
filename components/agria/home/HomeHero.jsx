import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Text } from '@/components/agria/ui';
import { FieldScene, RotatingHeadline } from '@/components/agria/motion';
import { hero } from '@/content/agria/home';
import { ArrowLabel } from './parts';
import Building, { buildingCycle } from './Building';
import PlayOnView from './PlayOnView';
import styles from './HomeHero.module.css';

// Apertura (fascia ink, Prompt 28): griglia dei filari sullo sfondo, testo a
// sinistra. Il titolo riscrive la parola: "Il vostro [sito], collegato a tutto
// il resto." (RotatingHeadline con words), in ciclo finché l'apertura è nello
// schermo. A destra l'edificio a tre piani in versione compatta (lo stesso della
// sezione 4): i piani si accendono dal basso in ciclo, la base sfuma nella
// griglia. Tra md e lg va sotto il testo; sotto md non c'è (Prompt 30: resta
// nella sezione dei tre piani e nella chiusura).
export default function HomeHero() {
  const { before, words, after } = hero.title;
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <FieldScene />

      <Container className={`${styles.content} grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12`}>
        <div className={`min-w-0 ${styles.column}`}>
          <Eyebrow onDark className={`text-balance ${styles.enter}`}>
            {hero.eyebrow}
          </Eyebrow>
          <Heading level="h1" as="h1" id="home-hero-title" onDark className={`mt-5 ${styles.title} ${styles.enter}`}>
            <RotatingHeadline
              before={before}
              words={words}
              punct={after.slice(0, 1)}
              after={after.slice(1).trim()}
              wordClassName="text-agria-green-bright"
              punctClassName="after:text-agria-on-dark"
            />
          </Heading>
          <Text size="lg" onDark muted className={`mt-6 max-w-[54ch] max-sm:text-agria-body ${styles.enter}`}>
            {hero.lead}
          </Text>
          <div className={`mt-9 flex flex-wrap gap-3 ${styles.enter}`}>
            <Button as={Link} href={hero.primary.href} variant="bright">
              <ArrowLabel label={hero.primary.label} />
            </Button>
            <Button href={hero.secondary.href} variant="line">
              {hero.secondary.label}
            </Button>
          </div>
          <p className={`mt-6 font-agria-mono text-agria-sm text-agria-on-dark-muted ${styles.enter}`}>{hero.note}</p>
        </div>
        {/* l'edificio, versione compatta: i piani si accendono dal basso, in ciclo */}
        <PlayOnView repeat threshold={0} className={`${buildingCycle} mx-auto mt-14 hidden w-full max-w-[380px] md:block lg:mx-0 lg:mt-0 lg:max-w-[420px] lg:justify-self-end`}>
          <Building tone="dark" base="fade" />
        </PlayOnView>
      </Container>
    </section>
  );
}
