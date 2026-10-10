import JsonLd from '@/components/agria/seo/JsonLd';
import PageHero from '@/components/agria/sections/PageHero';
import ContactSection from '@/components/agria/contatti/ContactSection';
import ContactChannels from '@/components/agria/contatti/ContactChannels';
import NextSteps from '@/components/agria/contatti/NextSteps';
import ContactFaq from '@/components/agria/contatti/ContactFaq';
import ContactClosing from '@/components/agria/contatti/ContactClosing';
import { site } from '@/lib/data';
import { agriaPageMetadata } from '@/lib/seo';
import { breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/schema';
import { composer } from '@/content/agria/home';
import { meta, hero, reassurance, channels, nextSteps, faq, closing, WHATSAPP } from '@/content/agria/contatti';

// Pagina contatti AGRIA (Prompt 15). Fondi: scuro · bianco (modulo in
// evidenza, sovrapposto all'hero) · off-white · scuro · bianco · off-white.
// Interazioni proprie: modulo a passi con scelte a card, tappe che avanzano
// da sole, domande a schede apribili. Testi in content/agria/contatti.js.
export const metadata = agriaPageMetadata(meta);

// moduli del configuratore in homepage (?moduli=id): etichette per il messaggio
const moduleLabels = Object.fromEntries(composer.modules.map((m) => [m.id, m.label]));

const faqForSchema = faq.items.map((item) => ({
  q: item.q,
  a: item.link ? `${item.a} ${item.link.before}${item.link.label}${item.link.after}` : item.a,
}));

const jsonLd = graph([
  webPageNode({ ...meta, type: 'ContactPage', about: true }),
  breadcrumbNode([
    { name: 'Home', path: '/' },
    { name: 'Contatti', path: meta.path },
  ]),
  faqNode(faqForSchema, meta.path),
]);

export default function ContattiPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
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
