import LegalPage from '@/components/agria/legal/LegalPage';
import { legalPages } from '@/content/agria/legale';
import { agriaPageMetadata } from '@/lib/seo';

const page = legalPages.terms;

export const metadata = agriaPageMetadata(page.meta);

export default function TerminiPage() {
  return <LegalPage page={page} id="termini-e-condizioni" />;
}
