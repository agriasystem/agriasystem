import { Container, Eyebrow, Heading, Reveal, Section, Text } from '@/components/agria/ui';
import { HoverGroup, ZoomImage } from '@/components/agria/motion';
import Icon from '@/components/agria/icons/Icon';
import styles from './Azienda.module.css';

const LINK =
  'mt-4 inline-flex items-center gap-1.5 self-start rounded font-agria-sans text-agria-sm font-medium text-agria-green-dark underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2';

// "Matteo De Pilla" → "MP": prima e ultima parola del nome
function initials(name) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ''}`.toUpperCase();
}

// Team: tre card con ritratto (foto, se c'è, altrimenti iniziali su fondo
// tipografico), nome e ruolo; al passaggio del cursore o al focus si apre la
// riga di dettaglio, con il link a LinkedIn quando esiste. Solo CSS: la riga
// resta nel documento (i lettori di schermo la leggono sempre), su touch e
// senza JavaScript è sempre aperta. La card senza link è focalizzabile.
export default function TeamCards({ id, label, title, intro, linkLabel, people }) {
  return (
    <Section background="white" aria-labelledby={id}>
      <Container>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>{label}</Eyebrow>
          <Heading level="h2" id={id} className="max-w-[20ch]">
            {title}
          </Heading>
          {intro && (
            <Text size="lg" muted>
              {intro}
            </Text>
          )}
        </Reveal>
        <HoverGroup as="ul" className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {people.map((person, index) => (
            <li key={person.name}>
              <Reveal delay={index * 70} className="h-full">
                <article
                  tabIndex={person.linkedin ? undefined : 0}
                  className={`agria-zoom-trigger ${styles.person} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2`}
                >
                  {person.photo ? (
                    <ZoomImage
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-square !rounded-none"
                    />
                  ) : (
                    <div className={styles.initials} aria-hidden="true">
                      <span className={styles.initialsGhost}>{initials(person.name)}</span>
                      <span className={styles.initialsMark}>{initials(person.name)}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                    <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{person.name}</h3>
                    <p className="mt-1 font-agria-sans text-agria-sm font-medium text-agria-green-dark">{person.role}</p>
                    <div className={styles.personDetail}>
                      <div className="-mx-1 flex flex-col px-1 pb-1">
                        <Text size="md" muted className="pt-3">
                          {person.detail}
                        </Text>
                        {person.linkedin && (
                          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
                            {linkLabel}
                            <Icon name="arrow-right" size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </HoverGroup>
      </Container>
    </Section>
  );
}
