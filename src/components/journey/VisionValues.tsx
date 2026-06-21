import Image from 'next/image';
import {
  CORE_VALUES,
  MISSION,
  VALUES_HEADING,
  VISION,
  VISION_MISSION_INTRO,
} from '@/content/values';

/**
 * Section 03 — Who We Are. Image-led vision/mission pillars plus value cards
 * that surface the outcome each principle drives. Animates via MdMotion observers.
 */
export default function VisionValues() {
  return (
    <section id="vision" className="sec sec-vision">
      <div className="wrap">
        <header className="sec-head sec-head--center reveal">
          <div className="eyebrow">{VISION_MISSION_INTRO.eyebrow}</div>
          <h2>{VISION_MISSION_INTRO.heading}</h2>
          <p>{VISION_MISSION_INTRO.lead}</p>
        </header>

        <div className="vv-pillars build-group">
          <article className="vv-pillar vv-pillar--vision build">
            <div className="vv-pillar-media">
              <Image
                src={VISION.image}
                alt={VISION.imageAlt}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                className="vv-pillar-img"
                priority
              />
              <div className="vv-pillar-shade" aria-hidden />
              <span className="vv-pillar-aim">{VISION.aim}</span>
            </div>
            <div className="vv-pillar-body">
              <span className="vv-pillar-label">{VISION.label}</span>
              <p>{VISION.statement}</p>
            </div>
          </article>

          <article className="vv-pillar vv-pillar--mission build">
            <div className="vv-pillar-media">
              <Image
                src={MISSION.image}
                alt={MISSION.imageAlt}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                className="vv-pillar-img"
                priority
              />
              <div className="vv-pillar-shade vv-pillar-shade--gold" aria-hidden />
              <span className="vv-pillar-aim">{MISSION.aim}</span>
            </div>
            <div className="vv-pillar-body vv-pillar-body--dark">
              <span className="vv-pillar-label">{MISSION.label}</span>
              <p>{MISSION.statement}</p>
            </div>
          </article>
        </div>

        <header className="vv-values-head reveal">
          <h3>{VALUES_HEADING.title}</h3>
          <p>{VALUES_HEADING.lead}</p>
        </header>

        <div className="vv-values build-group">
          {CORE_VALUES.map((value, i) => (
            <article key={value.title} className="vv-value build">
              <div className="vv-value-media">
                <Image
                  src={value.image}
                  alt={value.imageAlt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 25vw"
                  className="vv-value-img"
                />
                <div className="vv-value-shade" aria-hidden />
                <span className="vv-value-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="vv-value-body">
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
                <span className="vv-value-outcome">{value.outcome}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
