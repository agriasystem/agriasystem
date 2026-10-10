import '../../globals.css';
import { Inter, IBM_Plex_Mono } from 'next/font/google';

// Root layout indipendente per l'anteprima del design system: niente Nav,
// Footer, QuizFloatingButton, QuizPopup o CookieConsentBanner (quelli del
// sito legacy sono in app/(site)/layout.jsx, non condiviso con questo albero).
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

export default function DesignSystemRootLayout({ children }) {
  return (
    <html lang="it" className={`${agriaSans.variable} ${agriaMono.variable}`}>
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
        <div className="min-h-screen bg-agria-white font-agria-sans text-agria-graphite">
          {children}
        </div>
      </body>
    </html>
  );
}
