import { notFound } from 'next/navigation';

// Indirizzi che non corrispondono a nessuna pagina: la 404 del gruppo (site),
// con header e footer Agria, invece della 404 predefinita di Next (il sito ha
// più layout radice nei gruppi, quindi manca un not-found globale).
export default function CatchAll() {
  notFound();
}
