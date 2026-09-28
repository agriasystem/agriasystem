import '../globals.css';
import { Poppins, Inter, IBM_Plex_Mono } from 'next/font/google';
import Header from '@/components/agria/Header';
import Footer from '@/components/agria/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import AnalyticsConsent from '@/components/agria/consent/AnalyticsConsent';
import ConciergeSlot from '@/components/agria/ConciergeSlot';
import Assistant from '@/components/agria/assistant/Assistant';
import { site } from '@/lib/data';
import { OG_IMAGE, SITE_URL } from '@/lib/seo';
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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.positioning,
    type: 'website',
    locale: 'it_IT',
    siteName: site.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.positioning,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

// Lo schema Organization vive nella homepage (app/(site)/page.jsx), non qui.

export default function RootLayout({ children }) {
  return (
    <html lang={defaultLocale} className={`${poppins.variable} ${agriaSans.variable} ${agriaMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
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
