import Link from 'next/link';
import { Button, Container } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { departments } from '@/content/agria/home';
import { ArrowLabel, HomeIntro, HomeSection } from './parts';
import DepartmentTabs, { DepartmentPanel } from './DepartmentTabs';

// 7. Reparto per reparto. Da md: schede verticali (DepartmentTabs); sotto md:
// fisarmonica con <details> nativi dello stesso gruppo (una aperta alla volta,
// anche senza JavaScript), la prima aperta. Pulsante verso /contatti.
export default function DepartmentsSection() {
  const { eyebrow, title, intro, labels, items, cta } = departments;
  return (
    <HomeSection background="offwhite" aria-labelledby="home-reparti-title">
      <Container>
        <HomeIntro eyebrow={eyebrow} title={title} intro={intro} titleId="home-reparti-title" />
        <div className="mt-10 hidden md:mt-12 md:block">
          <DepartmentTabs items={items} labels={labels} />
        </div>
        <div className="mt-8 flex flex-col gap-[10px] md:hidden">
          {items.map((item, index) => (
            <details
              key={item.key}
              name="home-reparti"
              open={index === 0}
              className="group rounded-agria-card border border-agria-border bg-agria-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-agria-card px-6 py-5 font-agria-sans text-agria-body font-medium text-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark [&::-webkit-details-marker]:hidden">
                <h3>{item.title}</h3>
                <span className="shrink-0 text-agria-green-dark" aria-hidden="true">
                  <span className="group-open:hidden">
                    <Icon name="plus" />
                  </span>
                  <span className="hidden group-open:inline">
                    <Icon name="minus" />
                  </span>
                </span>
              </summary>
              <div className="px-6 pb-6">
                <DepartmentPanel item={item} labels={labels} />
              </div>
            </details>
          ))}
        </div>
        <Button as={Link} href={cta.href} variant="primary" className="mt-8 md:mt-10">
          <ArrowLabel label={cta.label} />
        </Button>
      </Container>
    </HomeSection>
  );
}
