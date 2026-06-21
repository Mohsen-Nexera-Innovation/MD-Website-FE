'use client';

import EgyptCoverageMap from '@/components/coverage/EgyptCoverageMap';

export default function CoverageMapSection() {
  return (
    <section className="coverage-page-map reveal" aria-label="Egypt coverage map">
      <EgyptCoverageMap layout="panel" />
    </section>
  );
}
