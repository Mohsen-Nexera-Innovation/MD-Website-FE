'use client';

import Link from 'next/link';
import { FLAG_ART } from '@/content/flagArt';
import type { PartnerCountry } from '@/content/partnerStops';

type PartnerGalleryProps = {
  stops: readonly PartnerCountry[];
  active: number;
  onSelect: (index: number) => void;
  /** Notifies the parent to pause/resume auto-advance on hover/focus. */
  onInteractChange?: (interacting: boolean) => void;
};

export default function PartnerGallery({
  stops,
  active,
  onSelect,
  onInteractChange,
}: PartnerGalleryProps) {
  const country = stops[active] ?? stops[0];
  const count = stops.length;

  const go = (next: number) => onSelect((next + count) % count);

  return (
    <div
      className="partner-gallery reveal"
      onMouseEnter={() => onInteractChange?.(true)}
      onMouseLeave={() => onInteractChange?.(false)}
      onFocusCapture={() => onInteractChange?.(true)}
      onBlurCapture={() => onInteractChange?.(false)}
    >
      <div className="partner-gallery-stage">
        <button
          type="button"
          className="partner-gallery-arrow partner-gallery-arrow--prev"
          aria-label="Previous partner country"
          onClick={() => go(active - 1)}
        >
          <span aria-hidden>‹</span>
        </button>

        <div className="partner-gallery-main" aria-live="polite">
          <div className="partner-gallery-card">
            {/* key remounts the content so the CSS fade replays on each change */}
            <div key={country.id} className="partner-gallery-card-inner">
              <div className="partner-gallery-card-top">
                <span className="partner-gallery-flag" aria-hidden>
                  {FLAG_ART[country.flag]}
                </span>
                <span className="partner-gallery-region">{country.region}</span>
              </div>

              <h3 className="partner-gallery-country">{country.country}</h3>
              <p className="partner-gallery-blurb">{country.blurb}</p>

              <div className="partner-gallery-brands" aria-label={`${country.country} brands`}>
                {country.brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/partners/${brand.slug}`}
                    className="partner-gallery-brand"
                  >
                    <span className="partner-gallery-brand-name">{brand.name}</span>
                    <span className="partner-gallery-brand-go" aria-hidden>
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <span className="partner-gallery-count">
                {country.brands.length} exclusive brand{country.brands.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="partner-gallery-arrow partner-gallery-arrow--next"
          aria-label="Next partner country"
          onClick={() => go(active + 1)}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div className="partner-gallery-rail" role="tablist" aria-label="Partner countries">
        {stops.map((stop, i) => {
          const on = i === active;
          return (
            <button
              key={stop.id}
              type="button"
              role="tab"
              aria-selected={on}
              className={`partner-gallery-thumb${on ? ' is-active' : ''}`}
              onClick={() => onSelect(i)}
            >
              <span className="partner-gallery-thumb-flag" aria-hidden>
                {FLAG_ART[stop.flag]}
              </span>
              <span className="partner-gallery-thumb-text">
                <span className="partner-gallery-thumb-name">{stop.country}</span>
                <span className="partner-gallery-thumb-meta">
                  {stop.brands.length} brand{stop.brands.length > 1 ? 's' : ''}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
