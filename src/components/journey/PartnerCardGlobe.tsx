'use client';

import { useEffect, useState } from 'react';
import HeroGlobeJourney from '@/components/journey/HeroGlobeJourney';
import { PARTNER_STOPS } from '@/content/partnerStops';

type PartnerCardGlobeProps = {
  /** Country index the Earth should travel to, driven by the gallery. */
  activeIndex?: number;
};

/**
 * In-card live Earth for the Partners section. Renders on a transparent canvas
 * so it blends with the gallery card background, steered by the active country.
 */
export default function PartnerCardGlobe({ activeIndex }: PartnerCardGlobeProps) {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="partner-card-globe" aria-hidden>
      <HeroGlobeJourney
        reduced={reduced}
        pauseRootId="partners"
        stops={PARTNER_STOPS}
        controlledIndex={activeIndex}
        showHud={false}
        variant="card"
        zoom={0.92}
      />
    </div>
  );
}
