import SolutionPage from '@/components/agria/solution/SolutionPage';
import { solutionPages } from '@/content/agria/soluzioni';
import { agriaPageMetadata } from '@/lib/seo';

// Pagina soluzione AGRIA (Prompt 23).
const solution = solutionPages['collegare-gestionale-e-sito'];

export const metadata = agriaPageMetadata(solution.meta);

export default function CollegareGestionaleESitoPage() {
  return <SolutionPage solution={solution} />;
}
