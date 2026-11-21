import Link from 'next/link';
import { Container, Eyebrow, Reveal, Section, TextLink } from '@/components/agria/ui';
import { floors } from '@/content/agria/home';
import { HomeIntro } from './parts';

// 4. Tre piani (Fase A: tre card statiche, l'edificio arriva in Fase B).
// A sinistra titolo e introduzione; a destra le schede impilate come i piani:
// da lg il piano terra in basso, sotto lg nell'ordine 1-2-3. Nel documento
// l'ordine è sempre 1-2-3.
// In Fase A la sezione porta l'ancora #come-funziona del secondo pulsante
// dell'apertura; con lo schema animato (Fase C) l'ancora passa alla sezione 5.
export default function FloorCards() {
  return (
    <Section background="offwhite" id="come-funziona" aria-labelledby="home-piani-title">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(32px,5vw,72px)]">
        <HomeIntro eyebrow={floors.eyebrow} title={floors.title} intro={floors.intro} titleId="home-piani-title" className="lg:self-start" />
        <ol className="flex flex-col gap-[18px] lg:flex-col-reverse">
          {floors.items.map((floor, index) => (
            <li key={floor.key}>
              <Reveal delay={index * 70} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-agria-card border border-agria-border bg-agria-white p-8">
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
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
