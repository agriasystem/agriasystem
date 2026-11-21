import ServicePage from '@/components/agria/service/ServicePage';
import { serviceAreas } from '@/content/agria/servizi-aree';
import { agriaPageMetadata } from '@/lib/seo';

// Pagina area AGRIA, struttura del Prompt 29 (ServicePage). Rotta statica: ha la
// precedenza su /servizi/[slug] (legacy).
const area = serviceAreas.presence;
const others = Object.values(serviceAreas).filter((other) => other.key !== area.key);

export const metadata = agriaPageMetadata(area.meta);

export default function DigitalPresencePage() {
  return <ServicePage area={area} others={others} />;
}
