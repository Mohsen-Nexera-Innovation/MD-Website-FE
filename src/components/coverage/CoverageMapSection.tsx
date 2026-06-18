'use client';

import EgyptCoverageMap from '@/components/coverage/EgyptCoverageMap';

export default function CoverageMapSection() {
  return (
    <section className="coverage-page-map" aria-label="Egypt coverage map">
      <p className="coverage-page-hint">
        Click any city on the map to see your area manager and contact details.
      </p>
      <div className="coverage-page-map-wrap">
        <EgyptCoverageMap />
      </div>
    </section>
  );
}
