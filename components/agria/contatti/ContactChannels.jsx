import { Container, Heading, Reveal, Section } from '@/components/agria/ui';
import { HoverGroup } from '@/components/agria/motion';
import Icon from '@/components/agria/icons/Icon';

const CARD =
  'group flex h-full flex-col gap-4 rounded-agria-card border border-agria-border bg-agria-white p-6 transition-[border-color,box-shadow,transform] duration-300 motion-reduce:transition-none';
const LINKED = `${CARD} hover:-translate-y-[2px] hover:border-agria-green/45 hover:shadow-[0_18px_42px_rgb(var(--agria-graphite)/0.07)] motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2 focus-visible:ring-offset-agria-offwhite`;

// da lg: tre recapiti sopra, poi due righe da due (commerciale, sede e
// orari); da sm l'ultimo occupa la riga
const SPAN = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'sm:col-span-2 lg:col-span-3'];

// Altri modi per parlarci: sette recapiti con icona. Email, telefoni,
// WhatsApp (messaggio precompilato) e sede sono link; gli orari no.
const tel = (value) => `tel:${value.replace(/\s+/g, '')}`;

export default function ContactChannels({ id, title, labels, email, phone, salesPhone, salesEmail, whatsapp, whatsappMessage, address, mapsHref, hours }) {
  const items = [
    { key: 'email', icon: 'mail', label: labels.email, value: email, href: `mailto:${email}` },
    { key: 'phone', icon: 'phone', label: labels.phone, value: phone, href: tel(phone) },
    {
      key: 'whatsapp',
      icon: 'chat',
      label: labels.whatsapp,
      value: whatsapp.number,
      href: `${whatsapp.href}?text=${encodeURIComponent(whatsappMessage)}`,
      external: true,
    },
    { key: 'sales-phone', icon: 'phone', label: labels.salesPhone, value: salesPhone, href: tel(salesPhone) },
    { key: 'sales-email', icon: 'mail', label: labels.salesEmail, value: salesEmail, href: `mailto:${salesEmail}` },
    { key: 'address', icon: 'map-pin', label: labels.address, value: address, href: mapsHref, external: true },
    { key: 'hours', icon: 'clock', label: labels.hours, value: hours },
  ];

  return (
    <Section background="offwhite" aria-labelledby={id}>
      <Container>
        <Reveal>
          <Heading level="h2" id={id}>
            {title}
          </Heading>
        </Reveal>
        <HoverGroup as="ul" className="mt-8 grid grid-cols-1 gap-[14px] sm:grid-cols-2 md:mt-10 lg:grid-cols-6">
          {items.map((item, index) => {
            const body = (
              <>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-agria-border bg-agria-offwhite text-agria-green-dark">
                  <Icon name={item.icon} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-agria-mono text-agria-label uppercase text-agria-grey">{item.label}</span>
                  <span className="break-words font-agria-sans text-agria-md font-medium text-agria-graphite">{item.value}</span>
                </span>
                {item.href && (
                  <span className="mt-auto inline-flex text-agria-green-dark" aria-hidden="true">
                    <Icon name="arrow-right" size={16} />
                  </span>
                )}
              </>
            );
            return (
              <li key={item.key} className={SPAN[index]}>
                <Reveal delay={index * 60} className="h-full">
                  {item.href ? (
                    <a
                      href={item.href}
                      className={LINKED}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={CARD}>{body}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </HoverGroup>
      </Container>
    </Section>
  );
}
