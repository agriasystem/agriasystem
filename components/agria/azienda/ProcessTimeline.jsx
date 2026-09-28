'use client';

import { useEffect, useRef, useState } from 'react';
import { Container, Eyebrow, Heading, Reveal, Section } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import styles from './Azienda.module.css';

// Sotto questa frazione dell'altezza della finestra un passo è "raggiunto":
// il binario si riempie fino a quel punto e il passo si accende.
const ANCHOR = 0.72;

// Come si lavora con noi: linea temporale verticale che si illumina allo
// scorrimento. Il riempimento del binario segue la posizione della lista nella
// finestra (variabile CSS --progress), ogni passo si accende quando entra
// nella parte alta dello schermo. Nessun testo è nascosto: prima di accendersi
// il titolo è grigio (contrasto conforme), poi grafite. Senza JavaScript la
// linea è piena e tutti i passi sono accesi; con movimento ridotto non c'è
// animazione legata allo scorrimento: tutto acceso subito.
export default function ProcessTimeline({ id, eyebrow, title, steps }) {
  const listRef = useRef(null);
  const [lit, setLit] = useState(0); // passi accesi, dal primo

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      list.style.setProperty('--progress', '1');
      setLit(steps.length);
      return undefined;
    }

    const items = Array.from(list.querySelectorAll('[data-step]'));
    let frame = 0;
    function update() {
      frame = 0;
      const anchor = window.innerHeight * ANCHOR;
      const rect = list.getBoundingClientRect();
      const reached = items.filter((item) => item.getBoundingClientRect().top + 24 <= anchor);
      // il riempimento segue lo scorrimento e arriva sempre almeno al centro
      // dell'ultimo passo acceso (in fondo alla pagina la lista non può salire oltre)
      const last = reached[reached.length - 1];
      const toLast = last ? (last.getBoundingClientRect().top + 40 - rect.top) / rect.height : 0;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height, toLast));
      list.style.setProperty('--progress', progress.toFixed(3));
      setLit(reached.length);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [steps.length]);

  return (
    <Section background="white" aria-labelledby={id}>
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-[clamp(32px,5vw,72px)]">
        <Reveal>
          <div className="flex flex-col gap-4 md:sticky md:top-32">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading level="h2" id={id} className="max-w-[16ch]">
              {title}
            </Heading>
          </div>
        </Reveal>
        <ol ref={listRef} className={styles.timeline}>
          {steps.map((step, index) => (
            <li key={step.title} data-step="" data-lit={index < lit || undefined} className={styles.tstep}>
              <span className={styles.marker} aria-hidden="true">
                <Icon name={step.icon} size={18} />
              </span>
              <div className="pt-2">
                <span className="font-agria-mono text-agria-label text-agria-green-dark">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={`${styles.tstepTitle} mt-2 font-agria-sans text-agria-h3`}>{step.title}</h3>
                <p className="mt-3 max-w-[52ch] font-agria-sans text-agria-md text-agria-grey">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
