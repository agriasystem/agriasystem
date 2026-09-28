'use client';

import Link from 'next/link';
import { reopenConsentBanner } from '@/lib/consent';
import BrandLockup from './BrandLockup';
import SocialIcon from './SocialIcon';
import { FieldScene } from './motion';
import { Container, Eyebrow } from './ui';
import { NAV_PANELS } from './nav-data';
import { SOCIAL } from './social';

const FISCAL = 'P.IVA IT04006460549';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink';

const LINK_CLASS = `rounded font-agria-sans text-agria-sm text-agria-on-dark-muted transition-colors hover:text-agria-on-dark ${FOCUS_RING}`;

const panelLinks = (key) =>
  NAV_PANELS.find((panel) => panel.key === key).items.map(({ title, href }) => ({ label: title, href }));

const LEGAL = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Cookie', href: '/cookie-policy' },
  { label: 'Termini', href: '/termini-e-condizioni' },
];

const COLUMNS = [
  { title: 'Servizi', links: panelLinks('servizi') },
  { title: 'Settori', links: panelLinks('settori') },
  {
    title: 'Azienda',
    links: [
      { label: 'Azienda', href: '/azienda' },
      { label: 'Insights', href: '/blog' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
  {
    title: 'Legale',
    links: [...LEGAL, { label: 'Note legali', href: '/note-legali' }, { label: 'Crediti fotografici', href: '/crediti-immagini' }],
    // pulsante gestito dal banner consenso esistente
    extra: (
      <button type="button" onClick={reopenConsentBanner} className={`text-left ${LINK_CLASS}`}>
        Preferenze cookie
      </button>
    ),
  },
];

// Footer sul modello bipsync: fondo ink con la scena dei filari tenue (senza
// parallasse, disegnata quando il footer si avvicina), colonne di navigazione
// e riga finale con lockup, dati fiscali, link legali e social.
export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-agria-ink">
      <FieldScene variant="subtle" interactive={false} lazy />
      <Container className="relative z-10 pb-40 pt-16 md:pb-56 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <Eyebrow as="h2" onDark>
                {column.title}
              </Eyebrow>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {column.extra && <li>{column.extra}</li>}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <BrandLockup tone="dark" />
            <p className="font-agria-sans text-agria-sm text-agria-on-dark-muted">
              © {new Date().getFullYear()} Agria System · {FISCAL}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {SOCIAL.length > 0 && (
              <ul className="flex gap-2">
                {SOCIAL.map((profile) => (
                  <li key={profile.key}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Agria System su ${profile.label} (si apre in una nuova scheda)`}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-agria-on-dark-muted transition-colors hover:border-white/40 hover:text-agria-on-dark ${FOCUS_RING}`}
                    >
                      <SocialIcon name={profile.key} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
