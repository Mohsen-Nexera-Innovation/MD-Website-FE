import Link from 'next/link';
import { journeyChapterLabel } from '@/content/journeyLabels';

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
  const chapterLabel = journeyFrom ? journeyChapterLabel(journeyFrom) : null;

  return (
    <header className="page-hero reveal">
      <div className="page-hero-ribbon" aria-hidden />
      <nav className="inner-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <span>{breadcrumbLabel}</span>
      </nav>
      {journeyFrom && chapterLabel ? (
        <p className="page-hero-journey">
          <Link href={`/#${journeyFrom}`}>← {chapterLabel}</Link>
          <span className="page-hero-journey-sep">·</span>
          <span>Homepage chapter</span>
        </p>
      ) : null}
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}
