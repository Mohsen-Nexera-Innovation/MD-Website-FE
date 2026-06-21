import Link from 'next/link';
import Image from 'next/image';
import {
  ABOUT_HERO_IMAGE,
  ABOUT_LEAD_PARAGRAPH,
  ABOUT_METRICS,
  ABOUT_MISSION,
  ABOUT_STORY,
  ABOUT_TAGLINE,
  ABOUT_VALUES,
  ABOUT_VISION,
} from '@/content/about';
import Arrow from '@/components/journey/Arrow';

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

      <section className="about-pillars">
        <div className="about-pillar about-pillar--vision">
          <Image
            src={ABOUT_VISION.image}
            alt={ABOUT_VISION.imageAlt}
            width={600}
            height={360}
            className="about-pillar-img"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="about-pillar-body">
            <span className="eyebrow">{ABOUT_VISION.label}</span>
            <p>{ABOUT_VISION.statement}</p>
          </div>
        </div>
        <div className="about-pillar about-pillar--mission">
          <Image
            src={ABOUT_MISSION.image}
            alt={ABOUT_MISSION.imageAlt}
            width={600}
            height={360}
            className="about-pillar-img"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="about-pillar-body about-pillar-body--dark">
            <span className="eyebrow">{ABOUT_MISSION.label}</span>
            <p>{ABOUT_MISSION.statement}</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2>Core values</h2>
        <div className="about-values-grid">
          {ABOUT_VALUES.map((v) => (
            <article key={v.title} className="about-value-card">
              <div className="about-value-media">
                <Image
                  src={v.image}
                  alt={v.imageAlt}
                  width={400}
                  height={240}
                  className="about-value-img"
                  sizes="(max-width: 560px) 100vw, 280px"
                />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

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
