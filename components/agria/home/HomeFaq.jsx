import { Container, Section } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { faq } from '@/content/agria/home';
import { HomeIntro } from './parts';

// 11. Domande frequenti: fisarmonica con <details> nativi dello stesso gruppo
// (attributo name): il browser tiene aperta una domanda alla volta, senza
// JavaScript, da tastiera con Invio e Spazio. I browser senza il gruppo le
// aprono anche insieme. Le stesse domande sono nei dati strutturati FAQPage
// (app/(site)/page.jsx).
export default function HomeFaq() {
  return (
    <Section background="offwhite" aria-labelledby="home-faq-title">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(32px,5vw,72px)]">
        <HomeIntro eyebrow={faq.eyebrow} title={faq.title} titleId="home-faq-title" className="lg:self-start" />
        <div className="border-t border-agria-border">
          {faq.items.map((item) => (
            <details key={item.q} name="home-faq" className="group border-b border-agria-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-5 text-left font-agria-sans text-agria-body font-medium text-agria-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2 focus-visible:ring-offset-agria-offwhite [&::-webkit-details-marker]:hidden">
                <h3>{item.q}</h3>
                <span className="shrink-0 text-agria-green-dark" aria-hidden="true">
                  <span className="group-open:hidden">
                    <Icon name="plus" />
                  </span>
                  <span className="hidden group-open:inline">
                    <Icon name="minus" />
                  </span>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 pr-10 font-agria-sans text-agria-md text-agria-grey">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
