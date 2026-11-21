import Link from 'next/link';
import { Container, Eyebrow, TextLink } from '@/components/agria/ui';
import { floors } from '@/content/agria/home';
import { HomeIntro, HomeSection } from './parts';
import Building, { buildingStage, floorCard } from './Building';
import PlayOnView from './PlayOnView';
import styles from './HomeHero.module.css';

// 4. Tre piani. Titolo e introduzione in alto a sinistra; a destra l'edificio
// e le tre schede nella stessa griglia, una riga per piano: ogni piano è alto
// quanto la sua scheda (piano 3 con "Assistenti", piano 2 con "Collegamenti",
// piano terra con "Sito e vendita"). L'edificio di questa versione è in HTML e
// CSS (facciata, fianco e tetto inclinati), così segue l'altezza delle schede
// senza deformarsi. Sotto md: l'edificio SVG sopra e le schede sotto, 1-2-3.
// Quando il blocco entra nello schermo i piani si accendono dal basso e la
// scheda del piano acceso si stacca in bianco (HomeHero.module.css, PlayOnView).
const ROW = ['md:row-start-3', 'md:row-start-2', 'md:row-start-1'];

function TowerFloor({ index, top }) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.tFloor} ${index === 0 ? styles.tGround : ''} hidden md:col-start-1 md:block ${ROW[index]}`}
      style={{ '--floor': index }}
    >
      {top && <span className={`${styles.tFace} ${styles.tRoof}`} />}
      <span className={`${styles.tFace} ${styles.tSide}`} />
      <span className={`${styles.tFace} ${styles.tFront}`}>
        {index === 0 ? (
          <span className={styles.tShop}>
            <span className={`${styles.tWin} ${styles.tWindow}`} />
            <span className={`${styles.tWin} ${styles.tDoor}`} />
          </span>
        ) : (
          <span className={styles.tWindows}>
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className={`${styles.tWin} ${styles.tPane}`} />
            ))}
          </span>
        )}
      </span>
    </div>
  );
}

export default function FloorCards() {
  const last = floors.items.length - 1;
  return (
    <HomeSection background="offwhite" aria-labelledby="home-piani-title">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-[clamp(32px,4vw,64px)]">
        <HomeIntro eyebrow={floors.eyebrow} title={floors.title} intro={floors.intro} titleId="home-piani-title" className="lg:self-start" />
        <PlayOnView threshold={0.25} className={`${buildingStage} ${styles.light}`}>
          <Building tone="light" className="mx-auto mb-8 w-full max-w-[420px] md:hidden" />
          <div className={`grid grid-cols-1 gap-[14px] md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-x-8 md:gap-y-0 ${styles.tGrid}`}>
            {floors.items.map((floor, index) => (
              <TowerFloor key={`piano-${floor.key}`} index={index} top={index === last} />
            ))}
            {floors.items.map((floor, index) => (
              <div key={floor.key} className={`md:col-start-2 md:py-[7px] ${ROW[index]}`} style={{ '--floor': index }}>
                <div className={`${floorCard} flex h-full flex-col gap-1.5 rounded-agria-card border border-agria-border px-6 py-5`}>
                  <Eyebrow>{floor.label}</Eyebrow>
                  <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{floor.title}</h3>
                  <p className="font-agria-sans text-agria-sm text-agria-grey">{floor.text}</p>
                  <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
                    {floor.links.map((link) => (
                      <TextLink key={link.href} as={Link} href={link.href}>
                        {link.label}
                      </TextLink>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PlayOnView>
      </Container>
    </HomeSection>
  );
}
