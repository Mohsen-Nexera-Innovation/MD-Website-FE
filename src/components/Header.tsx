'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/content/nav';
import MdLogo from '@/components/MdLogo';

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`md-header${scrolled ? ' scrolled' : ''}`}>
      <div className="md-header-glow" aria-hidden />
      <div className="md-header-inner">
        <Link href="/" id="header-logo-anchor" className="md-logo" aria-label="MD Dental home">
          <MdLogo variant={onHome ? 'light' : 'brand'} className="md-logo-svg" priority />
        </Link>

        <nav className="md-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md-header-actions">
          <button type="button" className="md-btn md-btn-ghost" aria-label="Switch to Arabic">
            العربية
          </button>
          <Link href="/login" className="md-btn md-btn-ghost">
            Login
          </Link>
          <Link href="/register" className="md-btn md-btn-primary">
            Register
          </Link>
          <button type="button" className="md-btn md-btn-disabled" title="Coming Soon — shop launches in Release 2">
            Shop
          </button>
        </div>
      </div>
    </header>
  );
}
