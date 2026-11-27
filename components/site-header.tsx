'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { route } from '../lib/paths';
import { SaffronRibbon } from './artwork';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/menus/', label: 'Menus' },
  { href: '/delivery/', label: 'Delivery' },
  { href: '/kitchen/', label: 'The Kitchen' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const current = route(pathname || '/');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-rule-strong bg-paper/95 backdrop-blur-xs">
      {/* Slim editorial issue strip on desktop */}
      <div className="hidden border-b border-rule/70 bg-paper-deep/45 py-1.5 md:block">
        <div className="wrap flex items-center justify-between text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-muted">
          <span>{business.issueLine}</span>
          <span>{business.kitchenLocation}</span>
        </div>
      </div>

      <div className="wrap relative flex min-h-18 items-center justify-between gap-4 py-2.5">
        {/* Masthead wordmark */}
        <SiteLink
          href="/"
          className="group relative flex items-baseline gap-1 font-editorial text-[1.65rem] italic leading-none text-ink no-underline hover:no-underline sm:text-[1.95rem]"
        >
          <span>{business.wordmark.leading}</span>
          <span className="font-normal text-saffron not-italic">{business.wordmark.ampersand}</span>
          <span>{business.wordmark.trailing}</span>
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map(item => {
            const active = current === item.href;
            return (
              <div key={item.href} className="relative flex items-center">
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  className={`py-2 text-sm font-medium tracking-[0.06em] uppercase no-underline transition-colors ${
                    active ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </SiteLink>
                {active ? (
                  <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 -mt-0.5">
                    <SaffronRibbon width={16} height={36} />
                  </span>
                ) : null}
              </div>
            );
          })}

          <div className="relative flex items-center">
            <SiteLink
              href="/contact/"
              markCurrent="page"
              className="button py-2 text-xs"
            >
              Request a quote
            </SiteLink>
            {current === '/contact/' ? (
              <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 -mt-0.5">
                <SaffronRibbon width={16} height={36} />
              </span>
            ) : null}
          </div>

          <DarkModeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <DarkModeToggle />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-rule bg-paper-deep/60 px-3 text-xs font-semibold tracking-[0.14em] uppercase text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-rule bg-paper-deep px-4 py-5 md:hidden"
        >
          <p className="folio mb-4">{business.issueLine}</p>
          <ul className="flex flex-col divide-y divide-rule/70">
            {NAV_ITEMS.map(item => {
              const active = current === item.href;
              return (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent="page"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between py-3 font-editorial text-2xl italic no-underline ${
                      active ? 'text-link' : 'text-ink'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active ? <span className="folio text-link">Current</span> : null}
                  </SiteLink>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 pt-2">
            <SiteLink
              href="/contact/"
              markCurrent="page"
              onClick={() => setMenuOpen(false)}
              className="button w-full"
            >
              Request a quote
            </SiteLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
