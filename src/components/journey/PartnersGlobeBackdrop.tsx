'use client';

import { useEffect, useState } from 'react';
import HeroGlobeJourney from '@/components/journey/HeroGlobeJourney';
import { PARTNER_STOPS } from '@/content/partnerStops';

type PartnersGlobeBackdropProps = {
  /** Country index the Earth should travel to, driven by the gallery. */
  activeIndex?: number;
};

/** Partners section — live Earth, steered by the partner gallery. */
export default function PartnersGlobeBackdrop({ activeIndex }: PartnersGlobeBackdropProps) {
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
    <div className="sec-partners-globe" aria-hidden>
      <HeroGlobeJourney
        reduced={reduced}
        pauseRootId="partners"
        stops={PARTNER_STOPS}
        controlledIndex={activeIndex}
        showHud={false}
        zoom={1.2}
      />
      <div className="sec-partners-veil sec-partners-veil--globe" />
      <div className="sec-partners-mesh" />
    </div>
  );
}
