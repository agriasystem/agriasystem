'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button, Eyebrow } from './ui';
import { NAV_PANELS, NAV_DIRECT, CTA, panelLinks } from './nav-data';

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function MobileMenu({ id, open, top = 0, onClose, isActive }) {
  const [expanded, setExpanded] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = containerRef.current?.querySelector(FOCUSABLE);
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) return;
      const focusable = Array.from(containerRef.current.querySelectorAll(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id={id}
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      style={{ top }}
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-white/[0.08] bg-agria-ink pt-4 md:hidden"
    >
      <div className="flex flex-1 flex-col px-6 pb-10">
        <nav className="flex flex-col" aria-label="Navigazione mobile">
          {NAV_PANELS.map((panel) => {
            const panelActive = panelLinks(panel).some((item) => isActive(item.href));
            return (
              <div key={panel.key} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={expanded === panel.key}
                  aria-controls={`${id}-${panel.key}`}
                  onClick={() => setExpanded((v) => (v === panel.key ? null : panel.key))}
                  className={`flex w-full items-center justify-between rounded-lg py-4 font-agria-sans text-agria-lg text-agria-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright ${
                    panelActive ? 'font-medium' : ''
                  }`}
                >
                  {panel.label}
                  <span
                    aria-hidden="true"
                    className={`text-agria-on-dark-muted transition-transform duration-150 motion-reduce:transition-none ${
                      expanded === panel.key ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {expanded === panel.key && (
                  <div id={`${id}-${panel.key}`} className="flex flex-col gap-1 pb-4">
                    {panel.items.map((item) => (
                      <MenuLink key={item.href} item={item} onClose={onClose} isActive={isActive} />
                    ))}
                    {/* secondo gruppo (Soluzioni), come nel pannello desktop */}
                    {panel.group && (
                      <div role="group" aria-labelledby={`${id}-${panel.key}-group`} className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-3">
                        <Eyebrow id={`${id}-${panel.key}-group`} onDark className="px-3 pb-1 pt-1">
                          {panel.group.title}
                        </Eyebrow>
                        {panel.group.items.map((item) => (
                          <MenuLink key={item.href} item={item} onClose={onClose} isActive={isActive} />
                        ))}
                      </div>
                    )}
                    {/* indice della sezione (lo stesso link della card di evidenza su desktop) */}
                    {panel.feature && (
                      <Link
                        href={panel.feature.link.href}
                        onClick={onClose}
                        aria-current={isActive(panel.feature.link.href) ? 'page' : undefined}
                        className="flex items-center gap-1.5 rounded-xl px-3 py-3 font-agria-sans text-agria-sm font-medium text-agria-green-bright hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright"
                      >
                        {panel.feature.link.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {NAV_DIRECT.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-lg border-b border-white/10 py-5 font-agria-sans text-agria-lg text-agria-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright ${
                isActive(item.href) ? 'font-medium' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button as={Link} href={CTA.href} onClick={onClose} variant="bright" className="mt-8 py-3.5">
          {CTA.label}
        </Button>
      </div>
    </div>
  );
}

// voce di un pannello: titolo e descrizione
function MenuLink({ item, onClose, isActive }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      aria-current={isActive(item.href) ? 'page' : undefined}
      className="rounded-xl px-3 py-3 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright"
    >
      <span className="block font-agria-sans text-agria-body font-medium text-agria-on-dark">{item.title}</span>
      <span className="mt-0.5 block font-agria-sans text-agria-sm text-agria-on-dark-muted">{item.description}</span>
    </Link>
  );
}
