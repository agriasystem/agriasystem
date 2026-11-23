import { Button, Container } from '@/components/agria/ui';
import { problems } from '@/content/agria/home';
import { ArrowLabel, HomeIntro, HomeSection } from './parts';
import ProblemCounter from './ProblemCounter';

// 3. Quante ne riconoscete? Otto situazioni da segnare (4×2 da lg, 2×4 da md,
// una colonna sotto). È un form GET verso /contatti: le scelte arrivano come
// ?problemi=prenotazioni&problemi=richieste e la pagina contatti ne scrive i
// titoli nel messaggio. Funziona anche senza JavaScript; il contatore è l'unica
// parte che ne ha bisogno. Ogni scheda è l'etichetta della sua casella: si
// segna con un clic o un tocco ovunque sulla scheda, o da tastiera con Tab e
// Spazio.
// Prompt 30, perché si capisca che la lista si usa:
// - un'istruzione sopra le schede ("toccate" con il dito, "segnate" con il mouse);
// - la scheda segnata ha il bordo verde #4F8F57 di 2 px (1 px di bordo più 1 px
//   di ombra interna, così niente si sposta), un fondo appena verde e la casella
//   piena; al passaggio del cursore la scheda si alza e il bordo si scurisce;
// - con almeno una scheda segnata il pulsante dice "Portiamo queste in analisi":
//   lo decide il CSS (:has sul form), quindi anche senza JavaScript;
// - sotto md la barra in fondo resta appiccicata al bordo inferiore mentre si
//   scorre la lista, sopra la barra contatti e il pulsante dell'assistente
//   (76 px = 16 di margine + 48 del pulsante + 12 di stacco), e se ne va con la
//   fine della sezione (su una riga da 360 px circa; a 320 contatore sopra e
//   pulsante sotto). Le caselle tengono un margine di scorrimento, così da
//   tastiera la casella col focus non finisce sotto la barra.
const CARD =
  'relative flex h-full cursor-pointer flex-col gap-3 rounded-agria-card border border-agria-border bg-agria-white p-6 pr-16 transition-[transform,border-color,background-color] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-agria-graphite/35 has-[:checked]:border-agria-green has-[:checked]:bg-[#eef4ef] has-[:checked]:shadow-[inset_0_0_0_1px_rgb(var(--agria-green))] [@media(hover:hover)]:has-[:checked]:hover:border-agria-green has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-agria-green-dark has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-agria-offwhite motion-reduce:transition-none motion-reduce:[@media(hover:hover)]:hover:translate-y-0';

export default function ProblemsSection() {
  const total = problems.items.length;
  return (
    <HomeSection background="offwhite" aria-labelledby="home-problemi-title">
      <Container>
        <HomeIntro eyebrow={problems.eyebrow} title={problems.title} intro={problems.intro} titleId="home-problemi-title" />
        <form action={problems.action} method="get" className="group/problemi mt-10 md:mt-12">
          <fieldset aria-labelledby="home-problemi-title" aria-describedby="home-problemi-istruzione">
            <p id="home-problemi-istruzione" className="mb-5 font-agria-mono text-agria-label uppercase text-agria-green-dark">
              <span className="[@media(pointer:fine)]:hidden">{problems.instruction.touch}</span>
              <span className="hidden [@media(pointer:fine)]:inline">{problems.instruction.pointer}</span>
            </p>
            <ul className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-4">
              {problems.items.map((item) => {
                const id = `problema-${item.id}`;
                return (
                  <li key={item.id}>
                    <label htmlFor={id} className={CARD}>
                      <input
                        id={id}
                        type="checkbox"
                        name={problems.param}
                        value={item.id}
                        aria-labelledby={`${id}-etichetta ${id}-titolo`}
                        aria-describedby={`${id}-testo`}
                        className="peer absolute right-5 top-5 h-7 w-7 cursor-pointer appearance-none rounded-lg border-[1.5px] border-agria-grey/50 bg-agria-white transition-colors checked:border-agria-green checked:bg-agria-green focus-visible:outline-none motion-reduce:transition-none max-md:scroll-mb-[calc(var(--contact-bar)+190px)]"
                      />
                      {/* spunta disegnata sopra la casella, visibile quando è segnata */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="pointer-events-none absolute right-[26px] top-[26px] hidden h-4 w-4 text-agria-white peer-checked:block"
                      >
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span id={`${id}-etichetta`} className="font-agria-mono text-agria-label uppercase text-agria-green-dark">
                        {item.label}
                      </span>
                      <span id={`${id}-titolo`} className="font-agria-sans text-agria-body font-medium leading-snug text-agria-graphite">
                        {item.title}
                      </span>
                      <span id={`${id}-testo`} className="font-agria-sans text-agria-md text-agria-grey">
                        {item.text}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          {/* barra in fondo: contatore, invito, pulsante (appiccicata sotto md) */}
          <div className="mt-[14px] flex flex-wrap items-center justify-between gap-3 rounded-agria-card border border-agria-border bg-agria-white p-3 pl-4 max-md:sticky max-md:bottom-[calc(var(--contact-bar)+76px)] max-md:z-[31] md:flex-nowrap md:gap-4 md:p-6">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <ProblemCounter template={problems.count} total={total} className="font-agria-mono text-agria-body text-agria-green-dark" />
              <p className="hidden font-agria-sans text-agria-md text-agria-grey md:block">{problems.hint}</p>
            </div>
            <Button type="submit" variant="primary" className="max-md:!px-5">
              <span className="group-has-[:checked]/problemi:hidden">
                <ArrowLabel label={problems.cta} />
              </span>
              <span className="hidden group-has-[:checked]/problemi:inline">
                <ArrowLabel label={problems.ctaChosen} />
              </span>
            </Button>
          </div>
        </form>
      </Container>
    </HomeSection>
  );
}
