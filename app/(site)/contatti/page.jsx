import PageHero from '@/components/agria/sections/PageHero';
import ContactSection from '@/components/agria/contatti/ContactSection';
import ContactChannels from '@/components/agria/contatti/ContactChannels';
import NextSteps from '@/components/agria/contatti/NextSteps';
import ContactFaq from '@/components/agria/contatti/ContactFaq';
import ContactClosing from '@/components/agria/contatti/ContactClosing';
import { site } from '@/lib/data';
import { agriaPageMetadata, breadcrumbSchema, faqPageSchema, webPageSchema, SITE_URL, AGRIA_BRAND } from '@/lib/seo';
import { composer } from '@/content/agria/home';
import { meta, hero, reassurance, channels, nextSteps, faq, closing, WHATSAPP } from '@/content/agria/contatti';

// Pagina contatti AGRIA (Prompt 15). Fondi: scuro · bianco (modulo in
// evidenza, sovrapposto all'hero) · off-white · scuro · bianco · off-white.
// Interazioni proprie: modulo a passi con scelte a card, tappe che avanzano
// da sole, domande a schede apribili. Testi in content/agria/contatti.js.
export const metadata = agriaPageMetadata(meta);

// moduli del configuratore in homepage (?moduli=id): etichette per il messaggio
const moduleLabels = Object.fromEntries(composer.modules.map((m) => [m.id, m.label]));

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: meta.title,
  description: meta.description,
  url: `${SITE_URL}${meta.path}`,
  inLanguage: 'it-IT',
  about: {
    '@type': 'Organization',
    name: AGRIA_BRAND,
    url: SITE_URL,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  },
};

const faqForSchema = faq.items.map((item) => ({
  q: item.q,
  a: item.link ? `${item.a} ${item.link.before}${item.link.label}${item.link.after}` : item.a,
}));

const jsonLd = [
  contactPageSchema,
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contatti', path: meta.path },
  ]),
  faqPageSchema(faqForSchema),
];

export default function ContattiPage() {
  return (
    <>
      {jsonLd.map((data) => (
        <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      {/* 1. Hero · scuro, con la scena dei filari */}
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} titleId="contatti-title" />
      {/* 2. Modulo a passi e rassicurazione · bianco */}
      <ContactSection id="modulo" reassurance={reassurance} moduleLabels={moduleLabels} />
      {/* 3. Altri modi per parlarci · off-white */}
      <ContactChannels
        id="contatti-canali"
        {...channels}
        email={site.email}
        phone={site.phone}
        directEmail={site.directEmail}
        whatsapp={WHATSAPP}
      />
      {/* 4. Cosa succede dopo · scuro */}
      <NextSteps id="contatti-dopo" {...nextSteps} />
      {/* 5. Domande frequenti · bianco */}
      <ContactFaq id="contatti-faq" {...faq} />
      {/* 6. Chiusura · off-white */}
      <ContactClosing id="contatti-chiusura" {...closing} />
    </>
  );
}
