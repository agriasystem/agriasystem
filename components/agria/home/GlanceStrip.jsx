import { Container, Eyebrow, Reveal } from '@/components/agria/ui';
import { glance } from '@/content/agria/home';
import { HomeSection } from './parts';

// 2. In trenta secondi: quattro colonne di testo su offwhite, separate da righe
// sottili (orizzontali fino a lg, verticali da lg). Nessuna immagine.
export default function GlanceStrip() {
  return (
    <HomeSection background="offwhite" spacing="compact" aria-labelledby="home-glance-label">
      <Container>
        <Reveal>
          <Eyebrow id="home-glance-label">{glance.eyebrow}</Eyebrow>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
            {glance.columns.map((column, index) => (
              <li
                key={column.title}
                className={`border-t border-agria-border py-6 lg:border-t-0 lg:py-1 ${
                  index === 0 ? 'lg:pr-8' : 'lg:border-l lg:px-8'
                } ${index === glance.columns.length - 1 ? 'lg:pr-0' : ''}`}
              >
                <h2 className="font-agria-sans text-agria-body font-medium text-agria-graphite">{column.title}</h2>
                <p className="mt-2 font-agria-sans text-agria-md text-agria-grey">{column.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </HomeSection>
  );
}
