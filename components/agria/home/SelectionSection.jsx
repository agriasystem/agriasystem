import { Container, Reveal, Section } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { selection } from '@/content/agria/home';
import { HomeIntro } from './parts';

// 8. Quando sì, quando no (#selezione: vi punta anche il rimando breve delle
// pagine servizio). Due card bianche: spunte verdi a sinistra, trattini grigi a
// destra; la riga sotto dice che un no arriva con il perché.
export default function SelectionSection() {
  const { id, eyebrow, title, yes, no, note } = selection;
  const titleId = `${id}-titolo`;
  const cards = [
    { ...yes, key: 'si', icon: 'check', iconClass: 'text-agria-green-dark' },
    { ...no, key: 'no', icon: 'minus', iconClass: 'text-agria-grey' },
  ];
  return (
    <Section background="offwhite" id={id} aria-labelledby={titleId}>
      <Container>
        <HomeIntro eyebrow={eyebrow} title={title} titleId={titleId} />
        <div className="mt-10 grid grid-cols-1 gap-[18px] md:mt-12 md:grid-cols-2">
          {cards.map((card, index) => (
            <Reveal key={card.key} delay={index * 70} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-agria-card border border-agria-border bg-agria-white p-8">
                <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{card.title}</h3>
                <ul className="flex flex-col gap-4">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className={`mt-0.5 shrink-0 ${card.iconClass}`}>
                        <Icon name={card.icon} size={18} />
                      </span>
                      <span className="font-agria-sans text-agria-md text-agria-graphite">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 font-agria-sans text-agria-md text-agria-grey">{note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
