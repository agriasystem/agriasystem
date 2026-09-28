import { Container, Eyebrow, Reveal, Section, Text } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';

const VALUE_LINK =
  'rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2';

// Dati aziendali: riquadro sobrio su fondo off-white con titolare (facoltativo),
// indirizzo, P.IVA, email e telefono (lista di definizioni), più la formula
// sul marchio. Nessuna interazione oltre i link.
export default function CompanyData({ id, label, name, claim, vat, addressLine, labels, email, phone }) {
  const rows = [
    ...(name ? [{ key: 'name', icon: 'badge-check', label: labels.name, value: name }] : []),
    { key: 'address', icon: 'map-pin', label: labels.address, value: addressLine },
    { key: 'vat', icon: 'file-text', label: labels.vat, value: vat },
    { key: 'email', icon: 'mail', label: labels.email, value: email, href: `mailto:${email}` },
    { key: 'phone', icon: 'phone', label: labels.phone, value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
  ];

  return (
    <Section background="offwhite" spacing="compact" aria-labelledby={id}>
      <Container>
        <Reveal className="mx-auto max-w-[60rem] rounded-agria-card border border-agria-border bg-agria-white p-6 sm:p-10">
          <Eyebrow as="h2" id={id}>
            {label}
          </Eyebrow>
          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.key}>
                <dt className="flex items-center gap-2 font-agria-mono text-agria-label uppercase text-agria-grey">
                  <span className="text-agria-green-dark" aria-hidden="true">
                    <Icon name={row.icon} size={16} />
                  </span>
                  {row.label}
                </dt>
                <dd className="mt-1 pl-6 font-agria-sans text-agria-body text-agria-graphite">
                  {row.href ? (
                    <a href={row.href} className={VALUE_LINK}>
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <Text size="sm" muted className="mt-8 border-t border-agria-border pt-5">
            {claim}
          </Text>
        </Reveal>
      </Container>
    </Section>
  );
}
