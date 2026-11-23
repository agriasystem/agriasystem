import ServicePage from '@/components/agria/service/ServicePage';
import { serviceAreas } from '@/content/agria/servizi-aree';
import { agriaPageMetadata } from '@/lib/seo';

// Pagina area AGRIA, struttura del Prompt 29 (ServicePage). Rotta statica: ha la
// precedenza su /servizi/[slug] (legacy).
const area = serviceAreas.automation;
const others = Object.values(serviceAreas).filter((other) => other.key !== area.key);

export const metadata = agriaPageMetadata(area.meta);

export default function DigitalAutomationPage() {
  return <ServicePage area={area} others={others} />;
}
