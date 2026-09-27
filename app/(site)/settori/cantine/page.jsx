import SectorPage from '@/components/agria/sector/SectorPage';
import { sectorPages } from '@/content/agria/settori';
import { agriaPageMetadata } from '@/lib/seo';

const sector = sectorPages.cantine;
const others = Object.values(sectorPages).filter((other) => other.key !== sector.key);

export const metadata = agriaPageMetadata(sector.meta);

export default function CantinePage() {
  return <SectorPage sector={sector} others={others} />;
}
