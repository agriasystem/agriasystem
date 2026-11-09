'use client';

import { useLayoutEffect, useRef } from 'react';
import { previews } from '@/content/agria/anteprime';
import PreviewPlayer from './PreviewPlayer';

// il pannello lo chiama all'apertura: scarica il contenuto delle finestre senza montarlo
export { loadPreview as preload } from './PreviewPlayer';

// Anteprima nel pannello Servizi del menu (Prompt 25, fase C): la stessa regia
// della home (PreviewPlayer), nello spazio che HeaderPanel riserva da xl. Il codice
// arriva all'apertura del pannello, la finestra si monta al primo passaggio su una
// voce: niente pesa sul caricamento delle pagine. La key la rimonta a ogni cambio
// di voce, così parte da capo; alla chiusura del pannello si smonta e le
// animazioni si fermano. Nessun modulo CSS su questo percorso (vedi PreviewPlayer).
export default function MenuPreview({ kind }) {
  const ref = useRef(null);

  // breve dissolvenza d'ingresso, prima del primo disegno: la cornice chiara non
  // compare di colpo sul fondo scuro. Con movimento ridotto compare e basta.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' });
  }, [kind]);

  return (
    <div ref={ref} className="absolute inset-0">
      <PreviewPlayer key={kind} kind={kind} label={previews[kind].label} />
    </div>
  );
}
