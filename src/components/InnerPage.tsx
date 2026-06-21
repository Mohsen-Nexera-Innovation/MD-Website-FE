import Link from 'next/link';
import Arrow from '@/components/journey/Arrow';

type InnerPageTheme = 'default' | 'reach' | 'vision' | 'products' | 'promise' | 'faq';

type InnerPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  journeyFrom?: string;
  theme?: InnerPageTheme;
  children?: React.ReactNode;
};

const THEME_CLASS: Record<InnerPageTheme, string> = {
  default: '',
  reach: 'inner-page--reach',
  vision: 'inner-page--vision',
  products: 'inner-page--products',
  promise: 'inner-page--promise',
  faq: 'inner-page--faq',
};

export default function InnerPage({
  eyebrow,
  title,
  lead,
  journeyFrom,
  theme = 'default',
  children,
}: InnerPageProps) {
  const themeClass = THEME_CLASS[theme];

  return (
    <div className={`inner-page${themeClass ? ` ${themeClass}` : ''}`}>
      <div className="wrap">
        <nav className="inner-breadcrumb reveal" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span>{title}</span>
        </nav>
        {journeyFrom ? (
          <p className="inner-journey-link reveal">
            ← Continues from homepage chapter: <Link href={`/#${journeyFrom}`}>{journeyFrom}</Link>
          </p>
        ) : null}
        <header className="inner-hero reveal">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </header>
        <div className="inner-body reveal">{children}</div>
      </div>
    </div>
  );
}

export function InnerCta({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="md-btn md-btn-primary" style={{ marginTop: 24 }}>
      {label} <Arrow />
    </Link>
  );
}
