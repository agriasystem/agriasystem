import LegalPage from '@/components/agria/legal/LegalPage';
import { legalPages } from '@/content/agria/legale';
import { agriaPageMetadata } from '@/lib/seo';

const page = legalPages.notes;

export const metadata = agriaPageMetadata(page.meta);

export default function NoteLegaliPage() {
  return <LegalPage page={page} id="note-legali" />;
}
