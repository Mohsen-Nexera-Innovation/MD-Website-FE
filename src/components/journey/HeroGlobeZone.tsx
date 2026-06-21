'use client';

import { useEffect, useState } from 'react';
import HeroGlobeJourney from '@/components/journey/HeroGlobeJourney';

type HeroGlobeZoneProps = {
  children: React.ReactNode;
};

/** Sticky live Earth — spans hero + global partners while both scroll. */
export default function HeroGlobeZone({ children }: HeroGlobeZoneProps) {
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="hero-globe-zone" id="hero-globe-zone">
      <div className="hero-globe-zone-pin" aria-hidden>
        <div className="hero-stage-bg hero-stage-bg--atmosphere">
          <HeroGlobeJourney reduced={reduceMotion} pauseRootId="hero-globe-zone" />
          <div className="hero-stage-bg-veil hero-stage-bg-veil--zone" />
          <div className="hero-stage-bg-mesh" />
          <div className="hero-stage-bg-grid" />
          <div className="hero-stage-bg-glow hero-stage-bg-glow--gold" />
          <div className="hero-stage-bg-glow hero-stage-bg-glow--blue" />
        </div>
      </div>
      <div className="hero-globe-zone-content">{children}</div>
    </div>
  );
}
