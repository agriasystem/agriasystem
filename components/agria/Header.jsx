'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AnnouncementBar from './AnnouncementBar';
import BrandLockup from './BrandLockup';
import HeaderPanel from './HeaderPanel';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { FocusOverlay } from './motion';
import { Button } from './ui';
import { NAV_PANELS, NAV_DIRECT, CTA } from './nav-data';

const CLOSE_DELAY_MS = 150;

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-bright focus-visible:ring-offset-2 focus-visible:ring-offset-agria-ink';

export default function Header() {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpenPanel(null);
    }
    function onClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  useEffect(() => {
    setOpenPanel(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function isActive(href) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function handlePanelOpen(key) {
    clearTimeout(closeTimer.current);
    setOpenPanel(key);
  }

  function handlePanelClose() {
    closeTimer.current = setTimeout(() => setOpenPanel(null), CLOSE_DELAY_MS);
  }

  function toggleMobile() {
    // il menu mobile parte dal bordo inferiore dell'header, qualunque sia lo scroll
    if (!mobileOpen && headerRef.current) {
      setMenuTop(headerRef.current.getBoundingClientRect().bottom);
    }
    setMobileOpen((v) => !v);
  }

  return (
    <>
      <AnnouncementBar />
      {/* velo dietro i pannelli (z 45, sotto l'header); da md in su, dove esistono i pannelli */}
      <FocusOverlay open={openPanel !== null} onClose={() => setOpenPanel(null)} className="hidden md:block" />
      {/* non fisso: scorre via con la pagina; z-50 lo tiene sopra il velo dei pannelli */}
      <header ref={headerRef} className="relative z-50">
        {/* fondo su un livello separato: backdrop-filter sull'header renderebbe
            il menu mobile (position: fixed) relativo all'header invece che alla finestra */}
        <div
          aria-hidden="true"
          className="absolute inset-0 border-b border-white/[0.08] bg-agria-ink/[0.92] backdrop-blur-[16px]"
        />
        <div className="relative mx-auto flex max-w-[1220px] items-center gap-6 px-5 py-[13px] sm:px-10 lg:gap-8">
          <BrandLockup
            tone="dark"
            wordmarkClassName="hidden md:inline"
            onClick={() => setOpenPanel(null)}
          />

          <nav className="mx-auto hidden items-center gap-1 md:flex lg:gap-3" aria-label="Navigazione principale">
            {NAV_PANELS.map((panel) => (
              <HeaderPanel
                key={panel.key}
                panel={panel}
                isOpen={openPanel === panel.key}
                onOpen={() => handlePanelOpen(panel.key)}
                onClose={handlePanelClose}
                onToggle={() => setOpenPanel((v) => (v === panel.key ? null : panel.key))}
                active={panel.items.some((item) => isActive(item.href))}
              />
            ))}
            {NAV_DIRECT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`rounded-full px-3 py-2 font-agria-sans text-[15px] transition-colors ${FOCUS_RING} ${
                  isActive(item.href) ? 'font-medium text-agria-on-dark' : 'text-agria-on-dark-muted hover:text-agria-on-dark'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <Button as={Link} href={CTA.href} variant="bright" className="whitespace-nowrap px-[22px] text-[14.5px]">
              {CTA.label}
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? 'Chiudete il menu' : 'Aprite il menu'}
            aria-expanded={mobileOpen}
            aria-controls="agria-mobile-menu"
            onClick={toggleMobile}
            className={`ml-auto flex items-center justify-center rounded-full p-2.5 text-agria-on-dark md:hidden ${FOCUS_RING}`}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <MobileMenu
          id="agria-mobile-menu"
          open={mobileOpen}
          top={menuTop}
          onClose={() => setMobileOpen(false)}
          isActive={isActive}
        />
      </header>
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
