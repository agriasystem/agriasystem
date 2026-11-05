import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Text } from '@/components/agria/ui';
import { FieldScene } from '@/components/agria/motion';
import Icon from '@/components/agria/icons/Icon';
import { hero } from '@/content/agria/home';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <FieldScene />

      <Container className={styles.content}>
        <Eyebrow onDark className={`text-balance ${styles.enter}`}>
          {hero.eyebrow}
        </Eyebrow>
        <Heading
          level="display"
          as="h1"
          id="home-hero-title"
          onDark
          className={`mx-auto mt-5 max-w-[19ch] text-balance ${styles.enter}`}
        >
          {hero.title}
        </Heading>
        <Text size="lg" onDark muted measure={false} className={`mx-auto mt-6 max-w-[54ch] ${styles.enter}`}>
          {hero.lead}
        </Text>
        <div className={`mt-9 flex flex-wrap justify-center gap-3 ${styles.enter}`}>
          <Button as={Link} href={hero.primary.href} variant="bright">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="line">
            {hero.secondary.label}
          </Button>
        </div>
        {/* indicazioni di rassicurazione, con una spunta discreta */}
        <ul className={`mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2.5 ${styles.enter}`}>
          {hero.reassurance.map((item) => (
            <li key={item} className="flex items-center gap-2 font-agria-sans text-agria-sm text-agria-on-dark-muted">
              <Icon name="check" size={16} className="shrink-0 text-agria-green-bright" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
      {/* da lg le pill fluttuano sul campo; fino a lg scendono sotto le CTA */}
      <ul className={styles.chips} aria-hidden="true">
        {hero.chips.map((chip) => (
          <li key={chip} className={styles.chip}>
            {chip}
          </li>
        ))}
      </ul>
    </section>
  );
}
