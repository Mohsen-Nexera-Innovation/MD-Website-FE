import Link from 'next/link';
import { FOOTER_GROUPS } from '@/content/nav';
import MdLogo from '@/components/MdLogo';

export default function Footer() {
  return (
    <footer className="md-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="md-logo" style={{ marginBottom: 12 }} aria-label="MD Dental home">
              <MdLogo variant="light" className="md-logo-svg" />
            </Link>
            <p style={{ margin: 0, maxWidth: 280, lineHeight: 1.6 }}>
              Strategically growing for you — Egypt&apos;s exclusive distributor of global dental brands.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MD Dental. All rights reserved.</span>
          <span>Cairo, Egypt · mddental.com</span>
        </div>
      </div>
    </footer>
  );
}
