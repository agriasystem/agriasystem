import SectorPage from '@/components/agria/sector/SectorPage';
import { sectorPages } from '@/content/agria/settori';
import { agriaPageMetadata } from '@/lib/seo';

const sector = sectorPages.frantoi;
const others = Object.values(sectorPages).filter((other) => other.key !== sector.key);

export const metadata = agriaPageMetadata(sector.meta);

export default function FrantoiPage() {
  return <SectorPage sector={sector} others={others} />;
}
