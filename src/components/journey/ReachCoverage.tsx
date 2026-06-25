'use client';

import Link from 'next/link';
import EgyptCoverageMap from '@/components/coverage/EgyptCoverageMap';
import { managerForZoneId } from '@/content/regionalManagers';
import { REACH_ZONES } from '@/content/reachZones';

type ReachCoverageProps = {
  active: number;
  reduced: boolean;
  onSelect: (index: number) => void;
  onInteractChange?: (interacting: boolean) => void;
};

/**
 * National Reach gallery — mirrors the partner gallery, but the synced visual is
 * a digital Egypt map instead of the globe. The whole block lives in a frosted
 * card that slides in from the right (driven by --reach-enter).
 */
export default function ReachCoverage({
  active,
  reduced,
  onSelect,
  onInteractChange,
}: ReachCoverageProps) {
  const zone = REACH_ZONES[active] ?? REACH_ZONES[0];
  const zoneManager = managerForZoneId(zone.id);
  const count = REACH_ZONES.length;
  const go = (next: number) => onSelect((next + count) % count);

  return (
    <div
      className="reach-gallery reveal"
      onMouseEnter={() => onInteractChange?.(true)}
      onMouseLeave={() => onInteractChange?.(false)}
      onFocusCapture={() => onInteractChange?.(true)}
      onBlurCapture={() => onInteractChange?.(false)}
    >
      <div className="reach-reveal-card">
        <div className="reach-gallery-stage">
          <button
            type="button"
            className="reach-gallery-arrow reach-gallery-arrow--prev"
            aria-label="Previous coverage zone"
            onClick={() => go(active - 1)}
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="reach-gallery-main" aria-live="polite">
            <EgyptCoverageMap highlightZoneId={zone.id} reduced={reduced} surface="light" />

            <div className="reach-gallery-card">
              <div key={zone.id} className="reach-gallery-card-inner">
                <div className="reach-gallery-card-top">
                  <span className={`reach-gallery-dot reach-gallery-dot--${zone.tone}`} aria-hidden />
                  <span className="reach-gallery-region">{zone.region}</span>
                </div>

                <h3 className="reach-gallery-title">{zone.title}</h3>
                <p className="reach-gallery-blurb">{zone.blurb}</p>

                {zoneManager ? (
                  <p className="reach-gallery-manager">
                    <span className="reach-gallery-manager-label">Area manager</span>
                    <strong>{zoneManager.name}</strong>
                    {zoneManager.role ? <span>{zoneManager.role}</span> : null}
                  </p>
                ) : null}

                <div className="reach-gallery-stat">
                  <strong>{zone.stat}</strong>
                  <span>{zone.statLabel}</span>
                </div>

                <Link href="/coverage" className="reach-gallery-cta">
                  <span>View coverage map</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="reach-gallery-arrow reach-gallery-arrow--next"
            aria-label="Next coverage zone"
            onClick={() => go(active + 1)}
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="reach-gallery-rail" role="tablist" aria-label="Coverage zones">
          {REACH_ZONES.map((z, i) => {
            const on = i === active;
            return (
              <button
                key={z.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`reach-gallery-thumb${on ? ' is-active' : ''}`}
                onClick={() => onSelect(i)}
              >
                <span className={`reach-gallery-dot reach-gallery-dot--${z.tone}`} aria-hidden />
                <span className="reach-gallery-thumb-text">
                  <span className="reach-gallery-thumb-name">{z.title}</span>
                  <span className="reach-gallery-thumb-meta">
                    {z.cities.length} hub{z.cities.length > 1 ? 's' : ''}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
