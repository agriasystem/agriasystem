import Link from 'next/link';
import { Button, Container, Eyebrow, Heading, Text } from '@/components/agria/ui';
import { FieldScene } from '@/components/agria/motion';
import { ArrowLabel } from '@/components/agria/home/parts';
import styles from './PageHero.module.css';

// Hero compatto delle pagine interne: fondo scuro con la scena dei filari in
// versione ridotta, etichetta, h1 (unico della pagina), sottotitolo e, se
// presenti, una o due CTA e le pill. Allineato a sinistra; la scena resta
// nella parte bassa.
// Prompt 33, due proprietà facoltative (senza, l'apertura resta identica):
// - subtitle: frase forte tra h1 e lead, più grande del lead e in colore pieno
//   (stessa misura dei titoli delle schede di /servizi, GoalSelector);
// - wide: titolo largo per gli h1 lunghi con la frase cercata (pagine servizio e
//   settore), che con 20ch andrebbero a capo quattro o cinque volte.
const TITLE_WIDTH = 'max-w-[20ch]';
const TITLE_WIDE = 'max-w-[30ch] text-balance';

export default function PageHero({ eyebrow, title, subtitle, lead, cta, secondaryCta, pills, titleId = 'page-title', id, wide = false }) {
  return (
    <section id={id} className={styles.hero} aria-labelledby={titleId}>
      <FieldScene style={{ '--field-ground': 'calc(var(--hero-pad-bottom) + 40px)' }} />
      <Container className={styles.content}>
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <Heading level="h1" id={titleId} onDark className={`mt-5 ${wide ? TITLE_WIDE : TITLE_WIDTH}`}>
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-5 max-w-[40ch] text-balance font-agria-sans text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-[1.15] tracking-[-0.015em] text-agria-on-dark">
            {subtitle}
          </p>
        )}
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
