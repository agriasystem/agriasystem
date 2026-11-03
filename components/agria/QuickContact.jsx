import Icon from './icons/Icon';
import { QUICK_CONTACT } from './nav-data';

const BUTTON =
  'group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-agria-on-dark transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink md:h-10 md:w-10';
// micro-animazione al passaggio: la cornetta oscilla appena, senza rimbalzi,
// in meno di 300 ms; con movimento ridotto non si muove
const PHONE_ICON =
  'transition-transform duration-200 ease-out group-hover:-rotate-12 motion-reduce:transition-none motion-reduce:group-hover:rotate-0';

// Contatto rapido nell'header: telefono e WhatsApp, pulsanti circolari solo
// icona con aria-label esplicito. Su fondo scuro il verde è green-bright.
// Clic misurati da components/agria/consent/AnalyticsConsent.jsx tramite
// data-analytics: phone_click e whatsapp_click, location "header".
export default function QuickContact({ className = '' }) {
  const { phone, whatsapp } = QUICK_CONTACT;
  return (
    <div className={`items-center gap-2 ${className}`}>
      <a
        href={phone.href}
        aria-label={phone.label}
        data-analytics="phone"
        data-analytics-location="header"
        className={`${BUTTON} hover:border-white/35 hover:bg-white/[0.06]`}
      >
        <Icon name="phone" size={18} className={PHONE_ICON} />
      </a>
      <a
        href={whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsapp.label}
        data-analytics="whatsapp"
        data-analytics-location="header"
        className={`${BUTTON} hover:border-agria-green-bright/60 hover:bg-agria-green-bright/10 hover:text-agria-green-bright`}
      >
        <Icon name="whatsapp" size={18} />
      </a>
    </div>
  );
}
