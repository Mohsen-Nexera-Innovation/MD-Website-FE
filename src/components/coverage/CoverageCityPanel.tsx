'use client';

import CityCoveragePopover from '@/components/coverage/CityCoveragePopover';
import { ZONE_LABELS, type CoverageCity } from '@/content/coverageCities';

type CoverageCityPanelProps = {
  city: CoverageCity | null;
  onClose: () => void;
};

const ZONE_LEGEND = [
  { zone: 'REP_TERRITORY' as const, dotClass: 'coverage-legend-dot--rep' },
  { zone: 'ECOMMERCE_ONLY' as const, dotClass: 'coverage-legend-dot--ecom' },
  { zone: 'ECOMMERCE_FULL' as const, dotClass: 'coverage-legend-dot--full' },
];

export default function CoverageCityPanel({ city, onClose }: CoverageCityPanelProps) {
  if (!city) {
    return (
      <aside className="coverage-city-panel coverage-city-panel--empty" aria-live="polite">
        <h3 className="coverage-city-panel-title">City details</h3>
        <p className="coverage-city-panel-lead">
          Select a pin on the map to view the area manager or delivery option for that city.
        </p>
        <div className="coverage-zone-legend" aria-label="Coverage zone legend">
          {ZONE_LEGEND.map(({ zone, dotClass }) => (
            <div key={zone} className="coverage-zone-legend-item">
              <span className={`coverage-zone-legend-dot ${dotClass}`} aria-hidden />
              <span>{ZONE_LABELS[zone]}</span>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="coverage-city-panel" aria-live="polite">
      <CityCoveragePopover city={city} onClose={onClose} variant="panel" />
    </aside>
  );
}
