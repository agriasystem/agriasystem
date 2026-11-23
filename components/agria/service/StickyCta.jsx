'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '@/components/agria/icons/Icon';
import styles from './ServiceArea.module.css';

const SHOW_AFTER = 160; // px di scorrimento

// CTA fissa in basso a sinistra, solo sotto i 1024 px (da lì in su la toglie il
// CSS): compare dopo il primo scorrimento e si nasconde appena la sezione di
// chiusura (endId) entra nella parte visibile della finestra, cioè sopra la barra
// contatti (il body riserva in fondo lo spazio della barra, --contact-bar).
// Nascosta non è focalizzabile (visibility: hidden). Senza JavaScript non
// compare: le CTA restano nella pagina.
export default function StickyCta({ label, href, endId }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const end = document.getElementById(endId);
    let frame = 0;
    function update() {
      frame = 0;
      const bar = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
      const reachedEnd = end ? end.getBoundingClientRect().top < window.innerHeight - bar : false;
      setVisible(window.scrollY > SHOW_AFTER && !reachedEnd);
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
  }, [endId]);

  return (
    <div className={styles.sticky} data-visible={visible || undefined}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-agria-graphite px-5 py-3 ring-1 ring-white/15 font-agria-sans text-agria-sm font-medium text-agria-white shadow-[0_14px_34px_rgb(var(--agria-graphite)/0.28)] transition-colors hover:bg-agria-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2"
      >
        {/* la freccia la disegna già il pulsante (icona): via quella del testo */}
        {label.replace(/\s*→$/, '')}
        <Icon name="arrow-right" size={16} className="shrink-0" />
      </Link>
    </div>
  );
}
