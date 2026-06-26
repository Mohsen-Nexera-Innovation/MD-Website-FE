'use client';

import { useRef, type RefObject } from 'react';
import type * as THREE from 'three';
import GlobeFlagMarker from '@/components/journey/GlobeFlagMarker';
import { useGlobeHtmlOverlay } from '@/components/journey/useGlobeHtmlOverlay';
import type { GlobeStop } from '@/content/heroGlobeStops';

type GlobeFlagHtmlPinProps = {
  name: string;
  flag: GlobeStop['flag'];
  phase: 'global' | 'egypt';
  active: boolean;
  travelingRef: RefObject<boolean>;
  htmlPortal?: RefObject<HTMLElement | null>;
  distanceFactor?: number;
};

/** Pole flag HTML overlay — replaces drei Html (broken under R3F 9). */
export default function GlobeFlagHtmlPin({
  name,
  flag,
  phase,
  active,
  travelingRef,
  htmlPortal,
  distanceFactor = 8,
}: GlobeFlagHtmlPinProps) {
  const anchorRef = useRef<THREE.Group>(null);

  useGlobeHtmlOverlay({
    anchorRef,
    portal: htmlPortal,
    distanceFactor: active ? distanceFactor * 0.78 : distanceFactor,
    children: (
      <GlobeFlagMarker
        name={name}
        flag={flag}
        phase={phase}
        active={active}
        travelingRef={travelingRef}
      />
    ),
  });

  return <group ref={anchorRef} position={[0, 0.022, 0]} />;
}
