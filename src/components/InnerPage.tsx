import Link from 'next/link';
import Arrow from '@/components/journey/Arrow';

type InnerPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  journeyFrom?: string;
  children?: React.ReactNode;
};

export default function InnerPage({ eyebrow, title, lead, journeyFrom, children }: InnerPageProps) {
  return (
    <div className="inner-page">
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
