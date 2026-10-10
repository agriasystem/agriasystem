import '../globals.css';
import { Poppins, Inter, IBM_Plex_Mono } from 'next/font/google';
import Header from '@/components/agria/Header';
import Footer from '@/components/agria/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import AnalyticsConsent from '@/components/agria/consent/AnalyticsConsent';
import ConciergeSlot from '@/components/agria/ConciergeSlot';
import Assistant from '@/components/agria/assistant/Assistant';
import { site } from '@/lib/data';
import JsonLd from '@/components/agria/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import { siteGraph } from '@/lib/schema';
import { defaultLocale } from '@/lib/i18n';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Font Agria (redesign): solo variabili CSS, non applicati al body.
// Il font di default del sito resta Poppins (vedi globals.css).
const agriaSans = Inter({
  subsets: ['latin'],
  variable: '--font-agria-sans',
  display: 'swap',
});
const agriaMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-agria-mono',
  display: 'swap',
});

// Valori di ripiego per le pagine senza metadata propri (404): ogni pagina li
// sostituisce con pageMetadata (lib/seo.js). Robots non è impostato qui: la 404
// riceve il noindex di Next, le pagine il proprio.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${site.name} — ${site.tagline}`,
  description: site.positioning,
};

// Organizzazione e sito (lib/schema.js) su ogni pagina; le pagine aggiungono
// i propri nodi collegati tramite @id.

export default function RootLayout({ children }) {
  return (
    <html lang={defaultLocale} className={`${poppins.variable} ${agriaSans.variable} ${agriaMono.variable}`}>
      <head>
        {/* Favicon con percorsi nuovi: Google teneva in cache l'icona del vecchio
            marchio allo stesso indirizzo. /favicon.ico (Agria) resta servita per i
            client che la chiedono da soli, ma non è dichiarata. */}
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/agria-icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/agria-icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/agria-icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <JsonLd data={siteGraph()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <ConciergeSlot>
          <Assistant />
        </ConciergeSlot>
        <CookieConsentBanner />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
