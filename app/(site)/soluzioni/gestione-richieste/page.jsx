import SolutionPage from '@/components/agria/solution/SolutionPage';
import { solutionPages } from '@/content/agria/soluzioni';
import { agriaPageMetadata } from '@/lib/seo';

// Pagina soluzione AGRIA (Prompt 23).
const solution = solutionPages['gestione-richieste'];

export const metadata = agriaPageMetadata(solution.meta);

export default function GestioneRichiestePage() {
  return <SolutionPage solution={solution} />;
}
