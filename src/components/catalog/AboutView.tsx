import Link from 'next/link';
import Image from 'next/image';
import {
  ABOUT_HERO_IMAGE,
  ABOUT_LEAD_PARAGRAPH,
  ABOUT_METRICS,
  ABOUT_STORY,
  ABOUT_TAGLINE,
} from '@/content/about';
import Arrow from '@/components/journey/Arrow';
import VisionValues from '@/components/journey/VisionValues';

export default function AboutView() {
  return (
    <div className="about-page reveal">
      <section className="about-hero-band">
        <div className="about-hero-copy">
          <p className="about-tagline">{ABOUT_TAGLINE}</p>
          <p>{ABOUT_LEAD_PARAGRAPH}</p>
          <Link href="/coverage" className="md-btn md-btn-primary">
            National coverage <Arrow />
          </Link>
        </div>
        <div className="about-hero-media">
          <Image
            src={ABOUT_HERO_IMAGE.src}
            alt={ABOUT_HERO_IMAGE.alt}
            width={640}
            height={420}
            className="about-hero-img"
            sizes="(max-width: 900px) 100vw, 480px"
            priority
          />
        </div>
      </section>

      <section className="about-metrics">
        {ABOUT_METRICS.map((m) => (
          <div key={m.label} className="about-metric">
            <span className="about-metric-value">
              {m.value}{m.suffix}
            </span>
            <span className="about-metric-label">{m.label}</span>
          </div>
        ))}
      </section>

      <section className="about-story">
        <header className="about-section-head">
          <div className="eyebrow">{ABOUT_STORY.intro.eyebrow}</div>
          <h2>{ABOUT_STORY.intro.heading}</h2>
        </header>
        <div className="about-timeline">
          {ABOUT_STORY.milestones.map((m) => (
            <article key={m.year} className="about-timeline-card">
              <div className="about-timeline-media">
                <Image
                  src={m.image}
                  alt={m.imageAlt}
                  width={400}
                  height={260}
                  className="about-timeline-img"
                  sizes="(max-width: 700px) 100vw, 280px"
                />
                <span className="about-timeline-year">{m.year}</span>
              </div>
              <div className="about-timeline-body">
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                {m.stat ? (
                  <p className="about-timeline-stat">
                    <strong>{m.stat.value}</strong> {m.stat.label}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <VisionValues embedded />

      <section className="catalog-cta-band about-cta">
        <h2>Explore our partner network</h2>
        <p>Eight exclusive global manufacturers — one trusted distributor in Egypt.</p>
        <Link href="/partners" className="md-btn md-btn-primary">
          View partners <Arrow />
        </Link>
      </section>
    </div>
  );
}
