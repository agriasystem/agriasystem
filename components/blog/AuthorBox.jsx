import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/data';

export default function AuthorBox({ className = '' }) {
  return (
    <div className={`bg-paper-dim border border-line rounded-xl p-6 ${className}`}>
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-line mx-auto">
        <Image src="/images/team/matteo-garuzzo.jpg" alt={site.founder} fill className="object-cover" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink text-center">{site.founder}</h3>
      <p className="mt-1 text-xs font-semibold text-forest text-center">CEO &amp; CTO</p>
      <p className="mt-3 text-sm text-ink/60 text-center leading-relaxed">
        Aiuto cantine, oleifici e agriturismi a scalare online. Siti, e-commerce e software su
        misura.
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-ink/50 hover:text-forest transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.9c0-1.4-.03-3.2-2-3.2-2 0-2.3 1.5-2.3 3.1V21h-4V9Z" />
          </svg>
        </a>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-ink/50 hover:text-forest transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a
          href={`mailto:${site.email}`}
          aria-label="Email"
          className="text-ink/50 hover:text-forest transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
      </div>
      <Link href="/prenota-call" className="btn-solid w-full justify-center mt-5 text-[13px] py-2.5">
        Prenota una call
      </Link>
    </div>
  );
}
