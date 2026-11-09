import { previews } from '@/content/agria/anteprime';
import { HOME_HIDDEN } from './home';

// riga di trasparenza sotto le anteprime: nascosta dove le anteprime non ci sono
export default function PreviewNote() {
  return <p className={`mt-6 font-agria-sans text-agria-sm text-agria-grey ${HOME_HIDDEN}`}>{previews.note}</p>;
}
