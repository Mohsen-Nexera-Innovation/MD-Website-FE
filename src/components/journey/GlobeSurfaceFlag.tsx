'use client';

import { Billboard } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { FlagCode } from '@/content/flagArt';
import { loadFlagTexture } from '@/components/journey/flagTexture';

type GlobeSurfaceFlagProps = {
  flag: FlagCode;
  active: boolean;
  traveling?: boolean;
};

/** Small flag pin rendered on the globe surface (billboard, rotates with the Earth). */
export default function GlobeSurfaceFlag({ flag, active, traveling = false }: GlobeSurfaceFlagProps) {
  const [map, setMap] = useState<THREE.CanvasTexture | null>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    let alive = true;
    loadFlagTexture(flag).then((tex) => {
      if (alive) setMap(tex);
    });
    return () => {
      alive = false;
    };
  }, [flag]);

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.opacity = active ? 1 : 0.82;
  }, [active]);

  if (!map) return null;

  const aspect = 24 / 38;
  const width = active ? 0.15 : 0.115;
  const height = width * aspect;

  return (
    <Billboard follow lockX={false} lockY={false} lockZ={false}>
      <group position={[0, 0.018, 0]}>
        {active ? (
          <mesh renderOrder={9}>
            <circleGeometry args={[width * 0.42, 16]} />
            <meshBasicMaterial
              color={traveling ? '#ebb428' : '#6090e8'}
              transparent
              opacity={traveling ? 0.55 : 0.35}
              depthWrite={false}
            />
          </mesh>
        ) : null}
        <mesh renderOrder={10}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            ref={matRef}
            map={map}
            transparent
            opacity={active ? 1 : 0.82}
            depthTest
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      </group>
    </Billboard>
  );
}
