import Icon from './icons/Icon';
import { QUICK_CONTACT } from './nav-data';

const ACTION =
  'flex items-center justify-center gap-2 font-agria-sans text-agria-sm font-medium text-agria-on-dark transition-colors hover:bg-white/[0.06] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-agria-green-bright';

// Barra contatti fissa sotto md (Prompt 24): stessi recapiti del contatto rapido
// dell'header, clic misurati da AnalyticsConsent con location "barra_mobile".
// Nell'HTML dal server, quindi nessuno spostamento al caricamento: l'altezza è
// --contact-bar, definita sul body (app/(site)/layout.jsx) che riserva lo stesso
// spazio in fondo alla pagina. Sparisce a menu aperto (non resta focalizzabile).
// z 30: sotto assistente, CTA fissa, menu mobile e banner cookie.
export default function MobileContactBar({ menuOpen = false }) {
  const { phone, whatsapp } = QUICK_CONTACT;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 h-[var(--contact-bar)] border-t border-white/[0.08] bg-agria-ink pb-[env(safe-area-inset-bottom)] md:hidden ${
        menuOpen ? 'hidden' : 'block'
      }`}
    >
      <div className="grid h-full grid-cols-2 divide-x divide-white/10">
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsapp.label}
          data-analytics="whatsapp"
          data-analytics-location="barra_mobile"
          className={ACTION}
        >
          <Icon name="whatsapp" size={18} className="text-agria-green-bright" />
          {whatsapp.short}
        </a>
        <a
          href={phone.href}
          aria-label={phone.label}
          data-analytics="phone"
          data-analytics-location="barra_mobile"
          className={ACTION}
        >
          <Icon name="phone" size={18} className="text-agria-green-bright" />
          {phone.short}
        </a>
      </div>
    </div>
  );
}
