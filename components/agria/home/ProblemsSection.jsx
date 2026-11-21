import { Button, Container, Section } from '@/components/agria/ui';
import { problems } from '@/content/agria/home';
import { ArrowLabel, HomeIntro } from './parts';
import ProblemCounter from './ProblemCounter';

// 3. Quante ne riconoscete? Otto situazioni da spuntare (4×2 da lg, 2×4 da md,
// una colonna sotto). È un form GET verso /contatti: le scelte arrivano come
// ?problemi=prenotazioni&problemi=richieste e la pagina contatti ne scrive i
// titoli nel messaggio. Funziona anche senza JavaScript; il contatore è l'unica
// parte che ne ha bisogno. Ogni scheda è l'etichetta della sua casella: si
// spunta con un clic ovunque sulla scheda, o da tastiera con Tab e Spazio.
export default function ProblemsSection() {
  const total = problems.items.length;
  return (
    <Section background="offwhite" aria-labelledby="home-problemi-title">
      <Container>
        <HomeIntro eyebrow={problems.eyebrow} title={problems.title} intro={problems.intro} titleId="home-problemi-title" />
        <form action={problems.action} method="get" className="mt-10 md:mt-12">
          <fieldset aria-labelledby="home-problemi-title">
            <ul className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-4">
              {problems.items.map((item) => {
                const id = `problema-${item.id}`;
                return (
                  <li key={item.id}>
                    <label
                      htmlFor={id}
                      className="relative flex h-full cursor-pointer flex-col gap-3 rounded-agria-card border border-agria-border bg-agria-white p-6 pr-14 transition-colors duration-200 hover:border-agria-green/45 has-[:checked]:border-agria-green-dark has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-agria-green-dark has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-agria-offwhite motion-reduce:transition-none"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        name={problems.param}
                        value={item.id}
                        aria-labelledby={`${id}-etichetta ${id}-titolo`}
                        aria-describedby={`${id}-testo`}
                        className="peer absolute right-5 top-5 h-6 w-6 cursor-pointer appearance-none rounded-md border border-agria-border bg-agria-white transition-colors checked:border-agria-green-dark checked:bg-agria-green-dark focus-visible:outline-none motion-reduce:transition-none"
                      />
                      {/* spunta disegnata sopra la casella, visibile quando è scelta */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="pointer-events-none absolute right-[25px] top-[25px] hidden h-4 w-4 text-agria-white peer-checked:block"
                      >
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          {/* barra in fondo: contatore, invito, pulsante */}
          <div className="mt-[14px] flex flex-col gap-4 rounded-agria-card border border-agria-border bg-agria-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <ProblemCounter template={problems.count} total={total} className="font-agria-mono text-agria-body text-agria-green-dark" />
              <p className="font-agria-sans text-agria-md text-agria-grey">{problems.hint}</p>
            </div>
            <Button type="submit" variant="primary" className="self-start sm:self-auto">
              <ArrowLabel label={problems.cta} />
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  );
}
