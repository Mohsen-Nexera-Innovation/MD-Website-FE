'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import {
  EGYPT_GOVERNORATES,
  GLOBE_CAMERA,
  GLOBE_RADIUS,
  GLOBE_STOPS,
  GLOBE_TRAVEL_SEC,
  easeOutCubic,
  easeInOutCubic,
  cameraFromEgyptBlend,
  resolveEgyptCamera,
  isEgyptPhaseIndex,
  latLonToVector3,
  lerpAngle,
  rotationForEgyptOverview,
  rotationForLatLon,
  type GlobeStop,
} from '@/content/heroGlobeStops';
import GlobeFlagHtmlPin from '@/components/journey/GlobeFlagHtmlPin';
import GlobeSurfaceFlag from '@/components/journey/GlobeSurfaceFlag';
import {
  GLOBE_TEXTURE_URLS,
  globeSegmentsForZoom,
  tuneGlobeColorTexture,
  tuneGlobeEmissiveTexture,
} from '@/components/journey/globeTextureUtils';

function EarthFallback({ segments }: { segments: number }) {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, segments, segments]} />
      <meshStandardMaterial color="#0a1850" roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

type HeroGlobeCanvasProps = {
  stopIndex: number;
  prevStopIndex: number;
  paused: boolean;
  htmlPortal?: React.RefObject<HTMLElement | null>;
  stops?: readonly GlobeStop[];
  zoom?: number;
  /** Drop the star field so the Earth floats on a transparent canvas. */
  transparent?: boolean;
  flagMode?: 'all' | 'active-only';
  flagVariant?: 'pin' | 'pole';
};

type GlobeSceneProps = {
  stopIndex: number;
  prevStopIndex: number;
  paused: boolean;
  htmlPortal?: React.RefObject<HTMLElement | null>;
  stops: readonly GlobeStop[];
  zoom: number;
  egyptFocusRef: React.RefObject<boolean>;
  flagMode: 'all' | 'active-only';
  flagVariant: 'pin' | 'pole';
};

function shouldShowFlag(
  active: boolean,
  routeArrived: boolean,
  flagMode: 'all' | 'active-only',
  egyptTravelFocus: boolean,
) {
  if (flagMode === 'active-only') return active && routeArrived;
  return active || !egyptTravelFocus;
}

function CameraRig({
  stopIndex,
  prevStopIndex,
  travelRef,
  stops,
}: {
  stopIndex: number;
  prevStopIndex: number;
  travelRef: React.RefObject<number>;
  stops: readonly GlobeStop[];
}) {
  const { camera } = useThree();
  const blendRef = useRef(resolveEgyptCamera(stopIndex, prevStopIndex, travelRef.current ?? 1, stops));

  useFrame((_, delta) => {
    const target = resolveEgyptCamera(stopIndex, prevStopIndex, travelRef.current ?? 1, stops);
    blendRef.current = {
      national: THREE.MathUtils.damp(blendRef.current.national, target.national, 1.25, delta),
      city: THREE.MathUtils.damp(blendRef.current.city, target.city, 1.15, delta),
    };
    const cam = cameraFromEgyptBlend(blendRef.current);

    camera.position.y = cam.y;
    camera.position.z = cam.z;
    camera.position.x = THREE.MathUtils.lerp(0, 0.03, blendRef.current.national);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = cam.fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function EarthSphere({
  segments,
  egyptFocusRef,
}: {
  segments: number;
  egyptFocusRef: React.RefObject<boolean>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
  const [colorMap, lightsMap] = useTexture([...GLOBE_TEXTURE_URLS]);
  const emissiveRef = useRef(0.58);

  useEffect(() => {
    const aniso = gl.capabilities.getMaxAnisotropy();
    tuneGlobeColorTexture(colorMap, aniso);
    tuneGlobeEmissiveTexture(lightsMap, aniso);
  }, [colorMap, lightsMap, gl]);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const focus = egyptFocusRef.current;
    const base = focus ? 0.32 : 0.58;
    const pulse = focus ? 0 : Math.sin(clock.getElapsedTime() * 1.2) * 0.06;
    emissiveRef.current = THREE.MathUtils.damp(emissiveRef.current, base + pulse, 5, delta);
    mat.emissiveIntensity = emissiveRef.current;
    mat.emissive.set(focus ? '#5a9080' : '#ffcc66');
  });

  return (
    <mesh ref={meshRef} key={`earth-${segments}`}>
      <sphereGeometry args={[GLOBE_RADIUS, segments, segments]} />
      <meshStandardMaterial
        map={colorMap}
        emissiveMap={lightsMap}
        emissive="#ffcc66"
        emissiveIntensity={0.58}
        roughness={0.54}
        metalness={0.06}
      />
    </mesh>
  );
}

function AtmosphereGlow({ egyptFocusRef }: { egyptFocusRef: React.RefObject<boolean> }) {
  const innerRef = useRef<THREE.MeshBasicMaterial>(null);
  const outerRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const focus = egyptFocusRef.current;
    const innerTarget = focus ? 0.07 : 0.16;
    const outerTarget = focus ? 0.02 : 0.07;
    if (innerRef.current) {
      innerRef.current.opacity = THREE.MathUtils.damp(innerRef.current.opacity, innerTarget, 4, delta);
    }
    if (outerRef.current) {
      outerRef.current.opacity = THREE.MathUtils.damp(outerRef.current.opacity, outerTarget, 4, delta);
    }
  });

  return (
    <>
      <mesh scale={1.06}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshBasicMaterial
          ref={innerRef}
          color="#6090e8"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          ref={outerRef}
          color="#ebb428"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function SunLight() {
  const ref = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.05;
    ref.current.position.set(Math.cos(t) * 7, 1.6 + Math.sin(t * 0.5) * 0.3, Math.sin(t) * 7);
  });

  return <directionalLight ref={ref} intensity={2.6} color="#fff6e8" />;
}

function EgyptGovernorateLayer({
  showNetwork,
  travelDim,
}: {
  showNetwork: boolean;
  travelDim: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const fadeRef = useRef(0);
  const dimRef = useRef(1);

  const hub = useMemo(() => {
    const v = latLonToVector3(30.04, 31.24, GLOBE_RADIUS * 1.006);
    return new THREE.Vector3(v.x, v.y, v.z);
  }, []);

  const pins = useMemo(
    () =>
      EGYPT_GOVERNORATES.map((gov) => {
        const v = latLonToVector3(gov.lat, gov.lon, GLOBE_RADIUS * 1.006);
        return { ...gov, pos: new THREE.Vector3(v.x, v.y, v.z) };
      }),
    [],
  );

  useFrame((_, delta) => {
    const target = showNetwork ? 1 : 0;
    fadeRef.current = THREE.MathUtils.damp(fadeRef.current, target, 2.4, delta);
    dimRef.current = THREE.MathUtils.damp(dimRef.current, travelDim ? 0.08 : 1, 3.5, delta);
    if (groupRef.current) {
      groupRef.current.visible = fadeRef.current > 0.012;
    }
  });

  const alpha = fadeRef.current * dimRef.current;

  return (
    <group ref={groupRef} visible={false}>
      {pins.map((gov) => (
        <group key={gov.id}>
          <Line
            points={[hub, gov.pos]}
            color="#86efac"
            transparent
            opacity={0.14 * alpha}
            lineWidth={0.5}
          />
          <mesh position={gov.pos}>
            <sphereGeometry args={[0.005, 6, 6]} />
            <meshBasicMaterial color="#86efac" transparent opacity={0.35 * alpha} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function routePalette(toStop: GlobeStop | undefined) {
  const isEgypt = toStop?.phase === 'egypt';
  return {
    primary: isEgypt ? '#22d3ee' : '#ebb428',
    secondary: isEgypt ? '#86efac' : '#6090e8',
    core: isEgypt ? '#86efac' : '#fff4d6',
    glow: isEgypt ? '#a7f3d0' : '#ffe08a',
  };
}

function AiCityDot({
  active,
  phase,
  index,
}: {
  active: boolean;
  phase: 'global' | 'egypt';
  index: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const colors = routePalette({ phase } as GlobeStop);
  const seed = index * 1.37;
  const coreSize = active ? 0.0042 : 0.0032;
  const innerRing = active ? 0.0055 : 0.0045;
  const outerRing = active ? 0.007 : 0.0058;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + seed;
    const wave = (t * 0.9) % 1;

    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + wave * (active ? 1.4 : 0.8));
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        (active ? 0.42 : 0.22) * (1 - wave * 0.65);
    }

    if (coreRef.current) {
      const breathe = 1 + Math.sin(t * (active ? 4 : 2.8)) * (active ? 0.1 : 0.05);
      coreRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[innerRing, outerRing, 24]} />
        <meshBasicMaterial
          color={colors.primary}
          transparent
          opacity={active ? 0.38 : 0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={coreRef} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[coreSize, 12, 12]} />
        <meshBasicMaterial color={active ? colors.core : colors.primary} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

function LocationMarker({
  name,
  flag,
  position,
  active,
  travelingRef,
  phase,
  index,
  htmlPortal,
  egyptTravelFocus,
  flagMode,
  flagVariant,
  routeArrived,
}: {
  name: string;
  flag: GlobeStop['flag'];
  position: THREE.Vector3;
  active: boolean;
  travelingRef: React.RefObject<boolean>;
  phase: 'global' | 'egypt';
  index: number;
  htmlPortal?: React.RefObject<HTMLElement | null>;
  egyptTravelFocus: boolean;
  flagMode: 'all' | 'active-only';
  flagVariant: 'pin' | 'pole';
  routeArrived: boolean;
}) {
  const orient = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());
    return q;
  }, [position]);

  const showFlag = shouldShowFlag(active, routeArrived, flagMode, egyptTravelFocus);
  const isRouting = active && !routeArrived;

  return (
    <group position={position} quaternion={orient}>
      <AiCityDot active={active} phase={phase} index={index} />
      {showFlag && flagVariant === 'pin' ? (
        <GlobeSurfaceFlag flag={flag} active={active} traveling={isRouting} />
      ) : null}
      {showFlag && flagVariant === 'pole' ? (
        <GlobeFlagHtmlPin
          name={name}
          flag={flag}
          phase={phase}
          active={active}
          travelingRef={travelingRef}
          htmlPortal={htmlPortal}
        />
      ) : null}
    </group>
  );
}

function StopMarkers({
  activeIndex,
  travelingRef,
  htmlPortal,
  egyptTravelFocus,
  stops,
  flagMode,
  flagVariant,
  routeArrived,
}: {
  activeIndex: number;
  travelingRef: React.RefObject<boolean>;
  htmlPortal?: React.RefObject<HTMLElement | null>;
  egyptTravelFocus: boolean;
  stops: readonly GlobeStop[];
  flagMode: 'all' | 'active-only';
  flagVariant: 'pin' | 'pole';
  routeArrived: boolean;
}) {
  const markers = useMemo(
    () =>
      stops.map((stop) => {
        const v = latLonToVector3(stop.lat, stop.lon, GLOBE_RADIUS * 1.008);
        return { stop, pos: new THREE.Vector3(v.x, v.y, v.z) };
      }),
    [stops],
  );

  return (
    <group>
      {markers.map(({ stop, pos }, i) => (
        <LocationMarker
          key={stop.id}
          name={stop.name}
          flag={stop.flag}
          position={pos}
          active={i === activeIndex}
          travelingRef={travelingRef}
          phase={stop.phase}
          index={i}
          htmlPortal={htmlPortal}
          egyptTravelFocus={egyptTravelFocus}
          flagMode={flagMode}
          flagVariant={flagVariant}
          routeArrived={routeArrived}
        />
      ))}
    </group>
  );
}

/** Digital AI route courier — compact node with tight pulse rings along arc paths */
function DigitalRouteNode({
  colors,
  isCityLeg,
}: {
  colors: ReturnType<typeof routePalette>;
  isCityLeg: boolean;
}) {
  const shellRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);
  const crossRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = (ref: React.RefObject<THREE.Mesh | null>, offset: number, spread: number, base: number) => {
      if (!ref.current) return;
      const wave = (t * 1.6 + offset) % 1;
      ref.current.scale.setScalar(1 + wave * spread);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = base * (1 - wave * 0.85);
    };

    pulse(ringARef, 0, 0.55, 0.42);
    pulse(ringBRef, 0.33, 0.45, 0.32);
    pulse(ringCRef, 0.66, 0.35, 0.22);

    if (shellRef.current) {
      shellRef.current.rotation.y = t * 2.4;
      shellRef.current.rotation.x = Math.sin(t * 3.2) * 0.25;
      const mat = shellRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + Math.sin(t * 8) * 0.15;
    }

    if (coreRef.current) {
      const flicker = 0.92 + Math.sin(t * 11) * 0.06 + Math.sin(t * 23) * 0.04;
      coreRef.current.scale.setScalar(flicker);
    }

    if (crossRef.current) {
      crossRef.current.rotation.z = t * 1.8;
    }
  });

  const ringInner = isCityLeg ? 0.0022 : 0.0026;
  const ringOuter = isCityLeg ? 0.0032 : 0.0038;

  const crossPoints = useMemo(
    () => ({
      h: [new THREE.Vector3(-0.005, 0, 0), new THREE.Vector3(0.005, 0, 0)] as [THREE.Vector3, THREE.Vector3],
      v: [new THREE.Vector3(0, -0.005, 0), new THREE.Vector3(0, 0.005, 0)] as [THREE.Vector3, THREE.Vector3],
    }),
    [],
  );

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <group ref={crossRef}>
        <Line points={crossPoints.h} color={colors.primary} transparent opacity={0.55} lineWidth={0.35} />
        <Line points={crossPoints.v} color={colors.secondary} transparent opacity={0.45} lineWidth={0.35} />
      </group>

      <mesh ref={ringCRef}>
        <ringGeometry args={[ringInner * 1.35, ringOuter * 1.45, 20]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringBRef}>
        <ringGeometry args={[ringInner * 1.1, ringOuter * 1.15, 22]} />
        <meshBasicMaterial
          color={colors.secondary}
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringARef}>
        <ringGeometry args={[ringInner, ringOuter, 24]} />
        <meshBasicMaterial
          color={colors.primary}
          transparent
          opacity={0.38}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={shellRef} rotation={[Math.PI / 2, 0, 0]}>
        <octahedronGeometry args={[0.0038, 0]} />
        <meshBasicMaterial
          color={colors.primary}
          wireframe
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={coreRef} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.0024, 10, 10]} />
        <meshBasicMaterial color={colors.core} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.0012, 6, 6]} />
        <meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function AiRouteCourier({
  fromIdx,
  toIdx,
  stops,
}: {
  fromIdx: number;
  toIdx: number;
  stops: readonly GlobeStop[];
}) {
  const rootRef = useRef<THREE.Group>(null);
  const courierRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const lastTrailCountRef = useRef(0);
  const [trailPoints, setTrailPoints] = useState<THREE.Vector3[]>([]);

  const toStop = stops[toIdx];
  const fromStop = stops[fromIdx];
  const colors = routePalette(toStop);
  const isCityLeg = fromStop?.phase === 'egypt' && toStop?.phase === 'egypt';
  const arcLift = isCityLeg ? 0.06 : 0.1;
  const courierScale = isCityLeg ? 0.85 : 1;

  const { points, curve } = useMemo(() => {
    const from = stops[fromIdx];
    const to = stops[toIdx];
    const aV = latLonToVector3(from.lat, from.lon, GLOBE_RADIUS * 1.002);
    const bV = latLonToVector3(to.lat, to.lon, GLOBE_RADIUS * 1.002);
    const a = new THREE.Vector3(aV.x, aV.y, aV.z);
    const b = new THREE.Vector3(bV.x, bV.y, bV.z);
    const mid = a
      .clone()
      .add(b)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS * (1 + arcLift + a.angleTo(b) * (isCityLeg ? 0.22 : 0.4)));
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    const sampled = c.getPoints(120);
    return { points: sampled, curve: c };
  }, [fromIdx, toIdx, arcLift, isCityLeg, stops]);

  useEffect(() => {
    progressRef.current = 0;
    lastTrailCountRef.current = 0;
    setTrailPoints(points.length >= 2 ? [points[0], points[1]] : []);
  }, [points]);

  useFrame((_, delta) => {
    progressRef.current = Math.min(1, progressRef.current + delta / GLOBE_TRAVEL_SEC);
    const p = progressRef.current;

    if (rootRef.current) {
      rootRef.current.visible = p < 1;
    }

    if (!courierRef.current || !curve) return;

    const pos = curve.getPoint(p);
    const normal = pos.clone().normalize();
    courierRef.current.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.008)));
    courierRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

    const trailCount = Math.max(2, Math.min(points.length, Math.ceil(p * (points.length - 1)) + 1));
    if (trailCount !== lastTrailCountRef.current) {
      lastTrailCountRef.current = trailCount;
      setTrailPoints(points.slice(0, trailCount));
    }
  });

  const ghostWidth = isCityLeg ? 0.45 : 0.65;
  const glowWidth = isCityLeg ? 0.85 : 1.2;
  const trailWidth = isCityLeg ? 0.48 : 0.72;
  const trailGlowWidth = isCityLeg ? 0.75 : 1.05;

  return (
    <group ref={rootRef}>
      <Line points={points} color={colors.secondary} transparent opacity={0.1} lineWidth={ghostWidth} />
      <Line points={points} color={colors.primary} transparent opacity={0.06} lineWidth={glowWidth} />
      {trailPoints.length >= 2 && (
        <Line points={trailPoints} color={colors.primary} transparent opacity={0.72} lineWidth={trailWidth} />
      )}
      {trailPoints.length >= 2 && (
        <Line points={trailPoints} color={colors.glow} transparent opacity={0.3} lineWidth={trailGlowWidth} />
      )}

      <group ref={courierRef} scale={courierScale}>
        <DigitalRouteNode colors={colors} isCityLeg={isCityLeg} />
      </group>
    </group>
  );
}

function GlobeRig({
  stopIndex,
  prevStopIndex,
  htmlPortal,
  egyptFocusRef,
  stops,
  zoom,
  flagMode,
  flagVariant,
}: GlobeSceneProps) {
  const outerRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const travelRef = useRef(1);
  const fromRotRef = useRef(rotationForLatLon(stops[0].lat, stops[0].lon));
  const toRotRef = useRef(fromRotRef.current);
  const lastIndexRef = useRef(0);
  const blendRef = useRef(resolveEgyptCamera(stopIndex, prevStopIndex, 1, stops));
  const travelingRef = useRef(false);
  const [routeArrived, setRouteArrived] = useState(true);
  const [earthSegments, setEarthSegments] = useState(globeSegmentsForZoom(0));
  const earthSegmentsRef = useRef(earthSegments);

  const activeStop = stops[stopIndex];
  const egyptVisible = isEgyptPhaseIndex(stopIndex, stops);

  useEffect(() => {
    const init = rotationForLatLon(stops[0].lat, stops[0].lon);
    if (groupRef.current) {
      groupRef.current.rotation.x = init.x;
      groupRef.current.rotation.y = init.y;
    }
    fromRotRef.current = init;
    toRotRef.current = init;
  }, [stops]);

  useEffect(() => {
    if (stopIndex === lastIndexRef.current && travelRef.current >= 1) return;

    const g = groupRef.current;
    if (g) {
      fromRotRef.current = { x: g.rotation.x, y: g.rotation.y };
    }

    toRotRef.current =
      activeStop.id === 'egypt'
        ? rotationForEgyptOverview()
        : rotationForLatLon(activeStop.lat, activeStop.lon);
    travelRef.current = 0;
    travelingRef.current = true;
    setRouteArrived(false);
    lastIndexRef.current = stopIndex;
  }, [stopIndex, activeStop.id, activeStop.lat, activeStop.lon]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    const outer = outerRef.current;
    if (!g || !outer) return;

    const target = resolveEgyptCamera(stopIndex, prevStopIndex, travelRef.current, stops);
    blendRef.current = {
      national: THREE.MathUtils.damp(blendRef.current.national, target.national, 1.25, delta),
      city: THREE.MathUtils.damp(blendRef.current.city, target.city, 1.15, delta),
    };
    const cam = cameraFromEgyptBlend(blendRef.current);
    const travelBoost = 1 + Math.sin(Math.min(1, travelRef.current) * Math.PI) * 0.05;
    outer.scale.setScalar(cam.scale * zoom * travelBoost);

    const nextSegments = globeSegmentsForZoom(blendRef.current.city);
    if (nextSegments !== earthSegmentsRef.current) {
      earthSegmentsRef.current = nextSegments;
      setEarthSegments(nextSegments);
    }

    if (travelRef.current < 1) {
      travelRef.current = Math.min(1, travelRef.current + delta / GLOBE_TRAVEL_SEC);
      const e = easeInOutCubic(travelRef.current);
      g.rotation.x = lerpAngle(fromRotRef.current.x, toRotRef.current.x, e);
      g.rotation.y = lerpAngle(fromRotRef.current.y, toRotRef.current.y, e);
      if (travelRef.current >= 1) {
        travelingRef.current = false;
        setRouteArrived(true);
      }
    }
  });

  const showArc = prevStopIndex !== stopIndex;
  const fromStop = stops[prevStopIndex];
  const egyptPhase = egyptVisible || fromStop?.phase === 'egypt';
  const egyptTravelFocus = egyptPhase && travelingRef.current;
  egyptFocusRef.current = egyptTravelFocus;
  const showGovNetwork =
    egyptVisible && activeStop.id === 'egypt' && !travelingRef.current;

  return (
    <group ref={outerRef}>
      <CameraRig stopIndex={stopIndex} prevStopIndex={prevStopIndex} travelRef={travelRef} stops={stops} />
      <group ref={groupRef}>
        <Suspense fallback={<EarthFallback segments={earthSegments} />}>
          <EarthSphere segments={earthSegments} egyptFocusRef={egyptFocusRef} />
        </Suspense>
        <AtmosphereGlow egyptFocusRef={egyptFocusRef} />
        <EgyptGovernorateLayer
          showNetwork={showGovNetwork}
          travelDim={egyptTravelFocus || (egyptVisible && activeStop.id !== 'egypt')}
        />
        <StopMarkers
          activeIndex={stopIndex}
          travelingRef={travelingRef}
          htmlPortal={htmlPortal}
          egyptTravelFocus={egyptTravelFocus}
          stops={stops}
          flagMode={flagMode}
          flagVariant={flagVariant}
          routeArrived={routeArrived}
        />
        {showArc && (
          <AiRouteCourier
            key={`${prevStopIndex}-${stopIndex}`}
            fromIdx={prevStopIndex}
            toIdx={stopIndex}
            stops={stops}
          />
        )}
      </group>
    </group>
  );
}

function SceneLighting({
  egyptFocusRef,
  bright,
}: {
  egyptFocusRef: React.RefObject<boolean>;
  bright?: boolean;
}) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const focus = egyptFocusRef.current;
    const ambientBase = bright ? 0.92 : 0.4;
    const fillBase = bright ? 0.95 : 0.55;
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.damp(
        ambientRef.current.intensity,
        focus ? ambientBase * 0.7 : ambientBase,
        4,
        delta,
      );
    }
    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.damp(
        fillRef.current.intensity,
        focus ? fillBase * 0.5 : fillBase,
        4,
        delta,
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={bright ? 0.92 : 0.4} color="#bcd2f5" />
      <SunLight />
      <pointLight ref={fillRef} position={[-3, 2, 4]} intensity={0.55} color="#3050a0" />
      {/* Steady viewer-side fill so the country facing the camera is always lit
          (no dark night-side hemisphere on the in-card globe). */}
      {bright ? (
        <directionalLight position={[0, 1.2, 6]} intensity={1.5} color="#fff6ea" />
      ) : null}
    </>
  );
}

function Scene({
  egyptFocusRef,
  transparent,
  flagMode,
  flagVariant,
  ...props
}: GlobeSceneProps & { transparent: boolean }) {
  return (
    <>
      <SceneLighting egyptFocusRef={egyptFocusRef} bright={transparent} />
      {!transparent ? (
        <Stars radius={90} depth={50} count={600} factor={3.2} saturation={0.12} fade speed={0.25} />
      ) : null}
      <GlobeRig
        {...props}
        egyptFocusRef={egyptFocusRef}
        flagMode={flagMode}
        flagVariant={flagVariant}
      />
    </>
  );
}

export default function HeroGlobeCanvas({
  stopIndex,
  prevStopIndex,
  paused,
  htmlPortal,
  stops = GLOBE_STOPS,
  zoom = 1,
  transparent = false,
  flagMode = 'all',
  flagVariant = 'pole',
}: HeroGlobeCanvasProps) {
  const egyptFocusRef = useRef(false);

  return (
    <Canvas
      camera={{ position: [0, GLOBE_CAMERA.global.y, GLOBE_CAMERA.global.z], fov: GLOBE_CAMERA.global.fov, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      frameloop={paused ? 'demand' : 'always'}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
        gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
      }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Scene
        stopIndex={stopIndex}
        prevStopIndex={prevStopIndex}
        paused={paused}
        htmlPortal={htmlPortal}
        stops={stops}
        zoom={zoom}
        transparent={transparent}
        egyptFocusRef={egyptFocusRef}
        flagMode={flagMode}
        flagVariant={flagVariant}
      />
    </Canvas>
  );
}
