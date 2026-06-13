'use client';

import { useEffect, useState } from 'react';
import SectionAmbientVideo from '@/components/journey/SectionAmbientVideo';

type HeroAtmosphereVideoProps = {
  reduced?: boolean;
};

/** Hero distribution cinema — dual-layer loop crossfade. */
export default function HeroAtmosphereVideo({ reduced: reducedProp }: HeroAtmosphereVideoProps) {
  const [reduced, setReduced] = useState(reducedProp ?? false);

  useEffect(() => {
    if (reducedProp !== undefined) {
      setReduced(reducedProp);
      return;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [reducedProp]);

  return (
    <SectionAmbientVideo
      reduced={reduced}
      sectionId="authority"
      blockClass="hero-stage-bg-video"
    />
  );
}
