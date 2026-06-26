'use client';

import type { CoverageCity } from '@/content/coverageCities';
import { ZONE_LABELS_SHORT } from '@/content/coverageCities';

type CoverageMapCityTooltipProps = {
  city: CoverageCity;
  mapX: number;
  mapY: number;
};

/** Desktop hover hint — hidden on touch via CSS. */
export function CoverageMapCityTooltip({ city, mapX, mapY }: CoverageMapCityTooltipProps) {
  return (
    <div
      className="coverage-map-tooltip"
      style={{ left: `${mapX}%`, top: `${mapY}%` }}
      role="tooltip"
    >
      <strong>{city.name}</strong>
      <span>{ZONE_LABELS_SHORT[city.zone]}</span>
    </div>
  );
}

/** Compact zone key for homepage reach map. */
export function CoverageMapMiniLegend() {
  return (
    <div className="coverage-map-mini-legend" aria-label="Coverage zone legend">
      <span className="coverage-map-mini-legend-item">
        <span className="coverage-map-mini-legend-dot coverage-map-mini-legend-dot--rep" aria-hidden />
        Field rep
      </span>
      <span className="coverage-map-mini-legend-item">
        <span className="coverage-map-mini-legend-dot coverage-map-mini-legend-dot--ecom" aria-hidden />
        Bosta
      </span>
      <span className="coverage-map-mini-legend-item">
        <span className="coverage-map-mini-legend-dot coverage-map-mini-legend-dot--full" aria-hidden />
        Full
      </span>
    </div>
  );
}
