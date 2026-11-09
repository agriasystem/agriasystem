'use client';

import { previews } from '@/content/agria/anteprime';
import PreviewPlayer from './PreviewPlayer';
import styles from './MenuPreview.module.css';

// il pannello lo chiama all'apertura: scarica il contenuto delle finestre senza montarlo
export { loadPreview as preload } from './PreviewPlayer';

// Anteprima nel pannello Servizi del menu (Prompt 25, fase C): la stessa regia
// della home (PreviewPlayer), nello spazio che HeaderPanel riserva da xl. Il codice
// arriva all'apertura del pannello, la finestra si monta al primo passaggio su una
// voce: niente pesa sul caricamento delle pagine. La key la rimonta a ogni cambio
// di voce, così parte da capo; alla chiusura del pannello si smonta e le
// animazioni si fermano.
export default function MenuPreview({ kind }) {
  return (
    <PreviewPlayer key={kind} kind={kind} label={previews[kind].label} className={`absolute inset-0 ${styles.enter}`} />
  );
}
