import { Container, Section } from '@/components/agria/ui';
import IconBadge from '@/components/agria/service/IconBadge';
import ContactForm from './ContactForm';

// Modulo a passi in evidenza, con a fianco la colonna di rassicurazione
// (ferma allo scorrimento da lg). Sotto lg la colonna segue il modulo.
export default function ContactSection({ id, reassurance, moduleLabels, problemLabels }) {
  return (
    <Section background="white" id={id} spacingTop="compact" className="relative">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-[clamp(32px,4vw,64px)]">
        <div className="-mt-[clamp(72px,9vw,128px)] min-w-0">
          <ContactForm moduleLabels={moduleLabels} problemLabels={problemLabels} />
        </div>
        <aside aria-label="Cosa aspettarsi" className="lg:pt-6">
          <ul className="flex flex-col gap-8 lg:sticky lg:top-32">
            {reassurance.map((item) => (
              <li key={item.title} className="flex gap-4">
                <IconBadge name={item.icon} />
                <div>
                  <h3 className="font-agria-sans text-agria-body font-medium text-agria-graphite">{item.title}</h3>
                  <p className="mt-1 font-agria-sans text-agria-md text-agria-grey">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </Section>
  );
}
