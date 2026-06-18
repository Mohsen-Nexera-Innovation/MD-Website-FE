import Link from 'next/link';
import PathAcademicProof from '@/components/journey/PathAcademicProof';
import Arrow from '@/components/journey/Arrow';
import {
  WHY_MD_FOR_DENTISTS,
  WHY_MD_FOR_MANUFACTURERS,
  WHY_MD_METRICS,
  WHY_MD_PILLARS,
} from '@/content/whyMd';

export default function WhyMdDentalView() {
  return (
    <div className="why-md-page reveal">
      <section className="why-md-metrics">
        {WHY_MD_METRICS.map((m) => (
          <div key={m.label} className="why-md-metric">
            <span className="why-md-metric-value">
              {m.value}{m.suffix}
            </span>
            <span className="why-md-metric-label">{m.label}</span>
          </div>
        ))}
      </section>

      <section className="why-md-pillars" aria-labelledby="why-md-pillars-title">
        <h2 id="why-md-pillars-title" className="why-md-section-title">Four reasons to choose MD</h2>
        <div className="why-md-pillars-grid">
          {WHY_MD_PILLARS.map((pillar) => (
            <article key={pillar.title} className="why-md-pillar">
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-md-audiences">
        <article className="why-md-audience">
          <h2>{WHY_MD_FOR_MANUFACTURERS.title}</h2>
          <ul>
            {WHY_MD_FOR_MANUFACTURERS.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link href="/partners" className="catalog-product-more">
            View global partners →
          </Link>
        </article>
        <article className="why-md-audience">
          <h2>{WHY_MD_FOR_DENTISTS.title}</h2>
          <ul>
            {WHY_MD_FOR_DENTISTS.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link href="/products" className="catalog-product-more">
            Browse products →
          </Link>
        </article>
      </section>

      <PathAcademicProof />

      <section className="catalog-cta-band why-md-cta">
        <h2>Ready to register your clinic?</h2>
        <p>Verified accounts unlock ordering, IFU downloads, and event registration.</p>
        <Link href="/register" className="md-btn md-btn-primary">
          Register now <Arrow />
        </Link>
      </section>
    </div>
  );
}
