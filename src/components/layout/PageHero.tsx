import Link from 'next/link';

type PageHeroProps = {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  lead?: string;
  journeyFrom?: string;
};

export default function PageHero({
  breadcrumbLabel,
  eyebrow,
  title,
  lead,
  journeyFrom,
}: PageHeroProps) {
  return (
    <header className="page-hero reveal">
      <div className="page-hero-ribbon" aria-hidden />
      <nav className="inner-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <span>{breadcrumbLabel}</span>
      </nav>
      {journeyFrom ? (
        <p className="inner-journey-link">
          ← Continues from homepage: <Link href={`/#${journeyFrom}`}>{journeyFrom}</Link>
        </p>
      ) : null}
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}
