import Link from 'next/link';
import { Container, Eyebrow, Section, TextLink } from '@/components/agria/ui';
import { floors } from '@/content/agria/home';
import { HomeIntro } from './parts';
import Building, { buildingStage, floorCard } from './Building';
import PlayOnView from './PlayOnView';

// 4. Tre piani. A sinistra titolo e introduzione; a destra l'edificio grande e
// le tre schede impilate come i piani (da lg il piano terra in basso; nel
// documento e sotto lg l'ordine è 1-2-3, con l'edificio sopra le schede).
// Quando il blocco entra nello schermo i piani si accendono dal basso e la
// scheda del piano acceso si stacca in bianco, le altre restano attenuate; a
// fine passata tutto acceso (Building.module.css, regia di PlayOnView).
// L'ancora #come-funziona del secondo pulsante dell'apertura sta qui finché lo
// schema animato (sezione 5, Fase C) non la prende.
export default function FloorCards() {
  return (
    <Section background="offwhite" id="come-funziona" aria-labelledby="home-piani-title">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-[clamp(32px,4vw,64px)]">
        <HomeIntro eyebrow={floors.eyebrow} title={floors.title} intro={floors.intro} titleId="home-piani-title" className="lg:self-start" />
        <PlayOnView
          threshold={0.25}
          className={`${buildingStage} grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-center md:gap-6`}
        >
          <Building tone="light" className="mx-auto w-full max-w-[420px]" />
          <ol className="flex flex-col gap-[14px] md:flex-col-reverse">
            {floors.items.map((floor, index) => (
              <li key={floor.key} style={{ '--floor': index }}>
                <div className={`${floorCard} flex h-full flex-col gap-2.5 rounded-agria-card border border-agria-border p-6`}>
                  <Eyebrow>{floor.label}</Eyebrow>
                  <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{floor.title}</h3>
                  <p className="font-agria-sans text-agria-md text-agria-grey">{floor.text}</p>
                  <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
                    {floor.links.map((link) => (
                      <TextLink key={link.href} as={Link} href={link.href}>
                        {link.label}
                      </TextLink>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </PlayOnView>
      </Container>
    </Section>
  );
}
