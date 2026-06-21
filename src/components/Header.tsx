'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { NAV_LINKS } from '@/content/nav';
import MdLogo from '@/components/MdLogo';
import SocialIcons from '@/components/SocialIcons';

function navIsActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('md-nav-open', menuOpen);
    return () => document.body.classList.remove('md-nav-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`md-header${scrolled ? ' scrolled' : ''}`}>
      <div className="md-header-glow" aria-hidden />
      <div className="md-header-inner">
        <Link href="/" id="header-logo-anchor" className="md-logo" aria-label="MD Dental home">
          <MdLogo variant={onHome ? 'light' : 'brand'} className="md-logo-svg" priority />
        </Link>

        <nav className="md-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navIsActive(pathname, link.href) ? 'active' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md-header-actions">
          <SocialIcons className="header-socials" linkClassName="header-social" />
          <button type="button" className="md-btn md-btn-ghost md-btn-sm md-lang-btn" aria-label="Switch to Arabic">
            العربية
          </button>
          <Link href="/login" className="md-btn md-btn-ghost md-btn-sm md-auth-btn">
            Login
          </Link>
          <Link href="/register" className="md-btn md-btn-primary md-btn-sm md-auth-btn">
            Register
          </Link>
          <button type="button" className="md-btn md-btn-disabled md-btn-sm md-shop-btn" title="Coming Soon — shop launches in Release 2">
            Shop Now
          </button>
          <button
            type="button"
            className="md-nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="md-nav-drawer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="md-nav-toggle-bar" aria-hidden />
            <span className="md-nav-toggle-bar" aria-hidden />
            <span className="md-nav-toggle-bar" aria-hidden />
          </button>
        </div>
      </div>

      <div
        className={`md-nav-backdrop${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <nav
        id="md-nav-drawer"
        className={`md-nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="md-nav-drawer-head">
          <span className="md-nav-drawer-title">Menu</span>
          <button type="button" className="md-nav-drawer-close" onClick={closeMenu} aria-label="Close menu">
            ×
          </button>
        </div>
        <ul className="md-nav-drawer-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={navIsActive(pathname, link.href) ? 'active' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md-nav-drawer-actions">
          <Link href="/login" className="md-btn md-btn-ghost md-btn-full" onClick={closeMenu}>
            Login
          </Link>
          <Link href="/register" className="md-btn md-btn-primary md-btn-full" onClick={closeMenu}>
            Register
          </Link>
          <Link href="/why-md-dental" className="md-btn md-btn-ghost md-btn-full" onClick={closeMenu}>
            Why MD Dental
          </Link>
          <Link href="/coverage" className="md-btn md-btn-ghost md-btn-full" onClick={closeMenu}>
            Coverage Map
          </Link>
        </div>
      </nav>
    </header>
  );
}
