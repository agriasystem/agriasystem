import { previews } from '@/content/agria/anteprime';
import styles from './PreviewPlayer.module.css';

// riga di trasparenza sotto le anteprime: nascosta dove le anteprime non ci sono
export default function PreviewNote() {
  return <p className={styles.note}>{previews.note}</p>;
}
