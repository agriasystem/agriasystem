import LegalPage from '@/components/agria/legal/LegalPage';
import { legalPages } from '@/content/agria/legale';
import { agriaPageMetadata } from '@/lib/seo';

const page = legalPages.privacy;

export const metadata = agriaPageMetadata(page.meta);

export default function PrivacyPolicyPage() {
  return <LegalPage page={page} id="privacy-policy" />;
}
