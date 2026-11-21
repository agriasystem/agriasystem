import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Text } from '@/components/agria/ui';
import { FieldScene } from '@/components/agria/motion';
import { ArrowLabel } from '@/components/agria/home/parts';
import styles from './PageHero.module.css';

// Hero compatto delle pagine interne: fondo scuro con la scena dei filari in
// versione ridotta, etichetta, h1 (unico della pagina), sottotitolo e, se
// presenti, una o due CTA e le pill. Allineato a sinistra; la scena resta
// nella parte bassa.
export default function PageHero({ eyebrow, title, lead, cta, secondaryCta, pills, titleId = 'page-title', id }) {
  return (
    <section id={id} className={styles.hero} aria-labelledby={titleId}>
      <FieldScene style={{ '--field-ground': 'calc(var(--hero-pad-bottom) + 40px)' }} />
      <Container className={styles.content}>
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <Heading level="h1" id={titleId} onDark className="mt-5 max-w-[20ch]">
          {title}
        </Heading>
        {lead && (
          <Text size="lg" onDark muted measure={false} className="mt-5 max-w-[56ch]">
            {lead}
          </Text>
        )}
        {(cta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {cta && (
              <Button as={Link} href={cta.href} variant="bright">
                <ArrowLabel label={cta.label} />
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="line">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
        {pills && pills.length > 0 && (
          <ul className={styles.pills}>
            {pills.map((pill) => (
              <li key={pill} className={styles.pill}>
                {pill}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
