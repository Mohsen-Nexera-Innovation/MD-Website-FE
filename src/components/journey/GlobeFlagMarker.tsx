'use client';

import { useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { FLAG_ART, type FlagCode } from '@/content/flagArt';

type GlobeFlagMarkerProps = {
  name: string;
  flag: FlagCode;
  phase: 'global' | 'egypt';
  active: boolean;
  travelingRef: RefObject<boolean>;
};

/** Pole-mounted flag; bottom anchor dot sits on the globe location. */
export default function GlobeFlagMarker({
  name,
  flag,
  phase,
  active,
  travelingRef,
}: GlobeFlagMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!ref.current || !active) return;
    ref.current.classList.toggle('globe-flag--routing', Boolean(travelingRef.current));
  });

  return (
    <div
      ref={ref}
      className={`globe-flag-root${active ? ' globe-flag-root--active' : ' globe-flag-root--idle'}`}
      data-phase={phase}
      data-flag={flag}
    >
      <div className="globe-flag-stack">
        <div className="globe-flag-banner">
          <div className="globe-flag-cloth">{FLAG_ART[flag]}</div>
          <div className="globe-flag-ribbon">
            <span className="globe-flag-name">{name}</span>
          </div>
        </div>
        <div className="globe-flag-pole" aria-hidden />
      </div>
    </div>
  );
}
