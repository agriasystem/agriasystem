'use client';

import { useEffect, useRef, useState } from 'react';

// Regia minima delle animazioni CSS della homepage (edificio, schede dei piani):
// quando il blocco entra nello schermo mette data-play, una volta sola. Le
// animazioni stanno nel CSS, ferme sul primo fotogramma finché manca data-play
// (solo con prefers-reduced-motion: no-preference e JavaScript attivo); senza
// animazioni si vede il fotogramma finale. threshold: quota visibile per partire.
// repeat: data-play solo finché il blocco è nello schermo (animazioni in ciclo,
// in pausa quando esce: edificio dell'apertura, Prompt 30).
export default function PlayOnView({ as: Tag = 'div', threshold = 0.35, repeat = false, className = '', children, ...props }) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setPlay(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (repeat) {
          setPlay(entry.isIntersecting);
        } else if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  return (
    <Tag ref={ref} data-play={play ? '' : undefined} className={className} {...props}>
      {children}
    </Tag>
  );
}
