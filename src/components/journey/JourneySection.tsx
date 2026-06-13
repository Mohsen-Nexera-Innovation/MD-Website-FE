import type { JourneySectionMeta } from '@/content/journey';
import StoryBridge from './StoryBridge';

type JourneySectionProps = {
  meta: JourneySectionMeta;
  className?: string;
  children: React.ReactNode;
  hideBridge?: boolean;
  hideChapter?: boolean;
  backdrop?: React.ReactNode;
};

export default function JourneySection({
  meta,
  className = '',
  children,
  hideBridge,
  hideChapter,
  backdrop,
}: JourneySectionProps) {
  return (
    <section
      id={meta.id}
      className={`journey-sec ${className}`.trim()}
      data-journey-step={meta.step}
      aria-labelledby={`${meta.id}-title`}
    >
      {backdrop}
      <div className="wrap journey-sec-inner">
        {!hideChapter ? (
          <header className="journey-chapter reveal">
            <div className="journey-chapter-badge">
              <span className="journey-chapter-num">{meta.step}</span>
              <span className="journey-chapter-label">{meta.label}</span>
            </div>
            <p className="journey-story-beat">{meta.storyBeat}</p>
            <details className="journey-ux-detail">
              <summary>Design intent</summary>
              <dl>
                <div>
                  <dt>Business value</dt>
                  <dd>{meta.businessValue}</dd>
                </div>
                <div>
                  <dt>Mechanism</dt>
                  <dd>{meta.designMechanism}</dd>
                </div>
                <div>
                  <dt>Click budget</dt>
                  <dd>{meta.maxClicks}</dd>
                </div>
              </dl>
            </details>
          </header>
        ) : null}
        {children}
        {!hideBridge ? <StoryBridge next={meta.next} isLast={meta.id === 'action'} /> : null}
      </div>
    </section>
  );
}
