export type GlobeStop = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  phase: 'global' | 'egypt';
  flag: 'br' | 'de' | 'us' | 'my' | 'cn' | 'kr' | 'it' | 'eg';
  subtitle?: string;
};

/** Journey: global partner origins → Egypt hub → key cities */
export const GLOBE_STOPS: GlobeStop[] = [
  { id: 'brazil', name: 'Brazil', lat: -15.78, lon: -47.93, phase: 'global', flag: 'br', subtitle: 'Aditek · SIN' },
  { id: 'germany', name: 'Germany', lat: 51.17, lon: 10.45, phase: 'global', flag: 'de', subtitle: 'Heydent' },
  { id: 'usa', name: 'United States', lat: 41.76, lon: -72.68, phase: 'global', flag: 'us', subtitle: 'Centrix' },
  { id: 'malaysia', name: 'Malaysia', lat: 3.14, lon: 101.69, phase: 'global', flag: 'my', subtitle: 'TopGlove' },
  { id: 'china', name: 'China', lat: 35.86, lon: 104.2, phase: 'global', flag: 'cn', subtitle: 'PROFA' },
  { id: 'korea', name: 'South Korea', lat: 36.5, lon: 127.85, phase: 'global', flag: 'kr', subtitle: 'WBT' },
  { id: 'italy', name: 'Italy', lat: 41.87, lon: 12.57, phase: 'global', flag: 'it', subtitle: 'BMS' },
  { id: 'egypt', name: 'Egypt', lat: 26.82, lon: 30.8, phase: 'egypt', flag: 'eg', subtitle: 'MD Dental Hub · 27 Governorates' },
  { id: 'cairo', name: 'Cairo', lat: 30.04, lon: 31.24, phase: 'egypt', flag: 'eg', subtitle: 'Cairo Governorate' },
  { id: 'alexandria', name: 'Alexandria', lat: 31.2, lon: 29.92, phase: 'egypt', flag: 'eg', subtitle: 'Alexandria Governorate' },
  { id: 'luxor', name: 'Luxor', lat: 25.69, lon: 32.64, phase: 'egypt', flag: 'eg', subtitle: 'Luxor Governorate' },
  { id: 'aswan', name: 'Aswan', lat: 24.09, lon: 32.9, phase: 'egypt', flag: 'eg', subtitle: 'Aswan Governorate' },
  { id: 'hurghada', name: 'Hurghada', lat: 27.26, lon: 33.81, phase: 'egypt', flag: 'eg', subtitle: 'Red Sea Governorate' },
];

/** Representative pins for nationwide coverage (shown when zoomed on Egypt) */
export const EGYPT_GOVERNORATES = [
  { id: 'giza', name: 'Giza', lat: 30.01, lon: 31.21 },
  { id: 'port-said', name: 'Port Said', lat: 31.26, lon: 32.3 },
  { id: 'suez', name: 'Suez', lat: 29.97, lon: 32.55 },
  { id: 'ismailia', name: 'Ismailia', lat: 30.6, lon: 32.27 },
  { id: 'mansoura', name: 'Dakahlia', lat: 31.04, lon: 31.38 },
  { id: 'tanta', name: 'Gharbia', lat: 30.79, lon: 31.0 },
  { id: 'fayoum', name: 'Fayoum', lat: 29.31, lon: 30.84 },
  { id: 'minya', name: 'Minya', lat: 28.09, lon: 30.76 },
  { id: 'asyut', name: 'Asyut', lat: 27.18, lon: 31.18 },
  { id: 'sohag', name: 'Sohag', lat: 26.56, lon: 31.69 },
  { id: 'qena', name: 'Qena', lat: 26.16, lon: 32.72 },
  { id: 'sharm', name: 'South Sinai', lat: 27.92, lon: 34.33 },
  { id: 'matrouh', name: 'Matrouh', lat: 31.35, lon: 27.24 },
  { id: 'arish', name: 'North Sinai', lat: 31.13, lon: 33.8 },
  { id: 'damietta', name: 'Damietta', lat: 31.42, lon: 31.81 },
  { id: 'beheira', name: 'Beheira', lat: 30.85, lon: 30.34 },
  { id: 'menofia', name: 'Menofia', lat: 30.47, lon: 31.01 },
  { id: 'qalyubia', name: 'Qalyubia', lat: 30.33, lon: 31.21 },
  { id: 'sharqia', name: 'Sharqia', lat: 30.56, lon: 31.69 },
  { id: 'beni-suef', name: 'Beni Suef', lat: 29.07, lon: 31.1 },
  { id: 'kafr-el-sheikh', name: 'Kafr El Sheikh', lat: 31.11, lon: 30.94 },
  { id: 'new-valley', name: 'New Valley', lat: 25.44, lon: 30.55 },
] as const;

export const GLOBE_RADIUS = 1.65;
export const GLOBE_TRAVEL_SEC = 3.6;
export const GLOBE_ZOOM_SEC = 4.2;

export const GLOBE_CAMERA = {
  global: { y: 0.2, z: 4.85, fov: 40, scale: 1 },
  /** Egypt national view — first landing on the hub */
  egypt: { y: 0.12, z: 3.28, fov: 33, scale: 1.13 },
  /** Closer framing while touring cities */
  egyptCity: { y: 0.08, z: 2.82, fov: 29, scale: 1.26 },
} as const;

export type EgyptCameraBlend = { national: number; city: number };

/** national 0→1 = global to Egypt; city 0→1 = national to city close-up */
export function resolveEgyptCamera(
  stopIndex: number,
  prevStopIndex: number,
  travelProgress: number,
  stops: readonly GlobeStop[] = GLOBE_STOPS,
): EgyptCameraBlend {
  const to = stops[stopIndex];
  const from = stops[prevStopIndex];
  if (!to) return { national: 0, city: 0 };

  if (to.phase === 'egypt') {
    let national = 0;
    if (from?.phase === 'global') {
      national = easeInOutCubic(Math.max(0, (travelProgress - 0.52) / 0.48));
    } else {
      national = 1;
    }

    let city = 0;
    const touringCities = to.id !== 'egypt' || (from?.phase === 'egypt' && from.id !== 'egypt');
    if (touringCities) {
      city = travelProgress < 1 ? easeInOutCubic(travelProgress) : 1;
    }

    return { national, city };
  }

  if (from?.phase === 'egypt' && to.phase === 'global') {
    const out = easeInOutCubic(Math.min(1, travelProgress / 0.58));
    return { national: 1 - out, city: Math.max(0, 1 - out * 1.35) };
  }

  return { national: 0, city: 0 };
}

function lerpNum(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Interpolate global → Egypt national → Egypt city camera settings */
export function cameraFromEgyptBlend(blend: EgyptCameraBlend) {
  const g = GLOBE_CAMERA.global;
  const e = GLOBE_CAMERA.egypt;
  const c = GLOBE_CAMERA.egyptCity;
  const mid = {
    y: lerpNum(g.y, e.y, blend.national),
    z: lerpNum(g.z, e.z, blend.national),
    fov: lerpNum(g.fov, e.fov, blend.national),
    scale: lerpNum(g.scale, e.scale, blend.national),
  };
  return {
    y: lerpNum(mid.y, c.y, blend.city),
    z: lerpNum(mid.z, c.z, blend.city),
    fov: lerpNum(mid.fov, c.fov, blend.city),
    scale: lerpNum(mid.scale, c.scale, blend.city),
  };
}

export function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

/** Rotation (rad) that brings lat/lon to the camera-facing meridian */
export function rotationForLatLon(lat: number, lon: number) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  return {
    x: latRad * 0.88,
    y: -lonRad - Math.PI / 2,
  };
}

/** Egypt overview — center on Nile Delta for zoomed national view */
export function rotationForEgyptOverview() {
  return rotationForLatLon(27.5, 30.8);
}

export function stopHoldMs(stop: GlobeStop) {
  return stop.phase === 'global' ? 3200 : 2400;
}

export function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function lerpAngle(from: number, to: number, t: number) {
  let delta = to - from;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return from + delta * t;
}

export function isEgyptPhaseIndex(index: number, stops: readonly GlobeStop[] = GLOBE_STOPS) {
  return stops[index]?.phase === 'egypt';
}

/** @deprecated use resolveEgyptCamera — kept for legacy single-channel callers */
export function egyptZoomTarget(
  stopIndex: number,
  prevStopIndex: number,
  travelProgress: number,
) {
  const { national, city } = resolveEgyptCamera(stopIndex, prevStopIndex, travelProgress);
  return Math.min(1, national + city * 0.35);
}
