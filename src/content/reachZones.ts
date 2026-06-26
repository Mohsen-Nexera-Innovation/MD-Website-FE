/**
 * National Reach — three macro coverage areas for Local Reach.
 *
 * Coordinate systems:
 * - `svgMapX` / `svgMapY` → interactive SVG in `EgyptCoverageMap` (calibrated to `egyptGeo` outline)
 * - `mapX` / `mapY` → story-2024 iPad PNG (`public/reach/egypt-digital-map.png`)
 * - `nwMapX` / `nwMapY` → story-2021 nationwide PNG (`public/reach/egypt-nationwide-map.png`)
 */

export type ReachTone = 'rep' | 'ecom' | 'full';

/** Raster map pulled from Our Story milestone art. */
export type ReachMapStyle = 'digital' | 'nationwide';

export const REACH_MAP_ASSETS: Record<
  ReachMapStyle,
  { src: string; label: string; storyYear: string }
> = {
  digital: {
    src: '/reach/egypt-digital-map.png',
    label: 'Digital platform map',
    storyYear: '2024',
  },
  nationwide: {
    src: '/reach/egypt-nationwide-map.png',
    label: 'Nationwide logistics map',
    storyYear: '2021',
  },
};

export type ReachCity = {
  name: string;
  x: number;
  y: number;
  /** SVG coverage map (0–100). */
  svgMapX: number;
  svgMapY: number;
  /** Story-2024 iPad PNG overlay (0–100). */
  mapX: number;
  mapY: number;
  /** Story-2021 nationwide PNG overlay (0–100). */
  nwMapX: number;
  nwMapY: number;
  hub?: boolean;
};

export type ReachZone = {
  id: string;
  region: string;
  title: string;
  blurb: string;
  tone: ReachTone;
  stat: string;
  statLabel: string;
  cities: readonly ReachCity[];
  focus: { x: number; y: number };
  mapStyle: ReachMapStyle;
};

const REACH_ZONES_RAW: readonly ReachZone[] = [
  {
    id: 'cairo',
    region: 'Capital Hub',
    title: 'Greater Cairo',
    blurb:
      'Flagship sales reps and same-week dispatch across Cairo, Giza, and Qalyubia — the operational heart of the network.',
    tone: 'full',
    stat: '3',
    statLabel: 'Governorates covered',
    focus: { x: 192, y: 64 },
    mapStyle: 'nationwide',
    cities: [
      {
        name: 'Cairo',
        x: 192.32,
        y: 62.68,
        svgMapX: 53.4,
        svgMapY: 19.5,
        mapX: 36,
        mapY: 22.7,
        nwMapX: 47,
        nwMapY: 26,
        hub: true,
      },
      {
        name: 'Giza',
        x: 191.51,
        y: 64.19,
        svgMapX: 52.8,
        svgMapY: 20.4,
        mapX: 35.5,
        mapY: 23.2,
        nwMapX: 46,
        nwMapY: 28,
      },
      {
        name: 'Qalyubia',
        x: 198.5,
        y: 54.2,
        svgMapX: 55.1,
        svgMapY: 16.8,
        mapX: 38.5,
        mapY: 21.2,
        nwMapX: 49,
        nwMapY: 24,
      },
    ],
  },
  {
    id: 'delta',
    region: 'Northern Delta',
    title: 'Delta & Alexandria',
    blurb:
      'Dedicated representatives across the Nile Delta and Mediterranean coast — Alexandria through Damietta, plus Bosta delivery to Canal and Red Sea cities.',
    tone: 'rep',
    stat: '9',
    statLabel: 'Northern hubs',
    focus: { x: 187, y: 30 },
    mapStyle: 'digital',
    cities: [
      {
        name: 'Alexandria',
        x: 156.73,
        y: 27.65,
        svgMapX: 43.5,
        svgMapY: 8.6,
        mapX: 14.4,
        mapY: 10.3,
        nwMapX: 24,
        nwMapY: 20,
        hub: true,
      },
      {
        name: 'Tanta',
        x: 185.85,
        y: 40.03,
        svgMapX: 51.6,
        svgMapY: 12.4,
        mapX: 32.1,
        mapY: 14.7,
        nwMapX: 40,
        nwMapY: 22,
      },
      {
        name: 'Mansoura',
        x: 196.09,
        y: 32.48,
        svgMapX: 54.5,
        svgMapY: 10.1,
        mapX: 38.3,
        mapY: 12.1,
        nwMapX: 50,
        nwMapY: 20,
      },
      {
        name: 'Damietta',
        x: 205.2,
        y: 29,
        svgMapX: 57.0,
        svgMapY: 9.0,
        mapX: 45.3,
        mapY: 8,
        nwMapX: 54,
        nwMapY: 15,
      },
      {
        name: 'Port Said',
        x: 216,
        y: 33.8,
        svgMapX: 60.0,
        svgMapY: 10.5,
        mapX: 53.3,
        mapY: 9.6,
        nwMapX: 60,
        nwMapY: 16,
      },
      {
        name: 'Ismailia',
        x: 220.09,
        y: 45.77,
        svgMapX: 61.1,
        svgMapY: 14.2,
        mapX: 52.8,
        mapY: 16.7,
        nwMapX: 58,
        nwMapY: 24,
      },
      {
        name: 'Suez',
        x: 227.1,
        y: 64.8,
        svgMapX: 63.1,
        svgMapY: 20.1,
        mapX: 57,
        mapY: 23.5,
        nwMapX: 63,
        nwMapY: 30,
      },
      {
        name: 'Hurghada',
        x: 237.6,
        y: 128.8,
        svgMapX: 66.0,
        svgMapY: 40.0,
        mapX: 77.9,
        mapY: 52.3,
        nwMapX: 74,
        nwMapY: 54,
      },
      {
        name: 'Sharm El-Sheikh',
        x: 268,
        y: 108,
        svgMapX: 72.5,
        svgMapY: 32.5,
        mapX: 86.4,
        mapY: 45.3,
        nwMapX: 86,
        nwMapY: 42,
        hub: true,
      },
    ],
  },
  {
    id: 'upper',
    region: 'Upper Egypt',
    title: 'Upper Egypt',
    blurb:
      'From Minya to Aswan — field reps and nationwide e-commerce carry authentic stock the full length of the Nile.',
    tone: 'full',
    stat: '5',
    statLabel: 'Southern hubs',
    focus: { x: 208, y: 175 },
    mapStyle: 'digital',
    cities: [
      {
        name: 'Minya',
        x: 179.11,
        y: 121.28,
        svgMapX: 49.8,
        svgMapY: 37.7,
        mapX: 28,
        mapY: 43.4,
        nwMapX: 35,
        nwMapY: 45,
      },
      {
        name: 'Asyut',
        x: 190.7,
        y: 149.06,
        svgMapX: 53.0,
        svgMapY: 46.3,
        mapX: 35,
        mapY: 53.2,
        nwMapX: 42,
        nwMapY: 52,
      },
      {
        name: 'Sohag',
        x: 204.72,
        y: 167.79,
        svgMapX: 56.9,
        svgMapY: 52.1,
        mapX: 43.5,
        mapY: 59.8,
        nwMapX: 48,
        nwMapY: 58,
      },
      {
        name: 'Luxor',
        x: 230.06,
        y: 194.06,
        svgMapX: 63.9,
        svgMapY: 60.3,
        mapX: 58.8,
        mapY: 69.1,
        nwMapX: 54,
        nwMapY: 66,
        hub: true,
      },
      {
        name: 'Aswan',
        x: 237.07,
        y: 242.39,
        svgMapX: 65.9,
        svgMapY: 75.3,
        mapX: 63.1,
        mapY: 86.1,
        nwMapX: 52,
        nwMapY: 76,
      },
    ],
  },
];

export const REACH_ZONES = REACH_ZONES_RAW;

export const REACH_HUB = {
  x: 192.32,
  y: 62.68,
  name: 'Cairo',
  svgMapX: 53.4,
  svgMapY: 19.5,
  mapX: 36,
  mapY: 22.7,
  nwMapX: 47,
  nwMapY: 26,
} as const;

export const REACH_NETWORK_CITIES: readonly ReachCity[] = (() => {
  const seen = new Map<string, ReachCity>();
  for (const z of REACH_ZONES_RAW) {
    for (const c of z.cities) {
      if (!seen.has(c.name)) seen.set(c.name, c);
    }
  }
  return Array.from(seen.values());
})();

export function reachCityByName(name: string): ReachCity | undefined {
  return REACH_NETWORK_CITIES.find((c) => c.name === name);
}

export function reachCityOverlay(city: ReachCity, style: ReachMapStyle) {
  return style === 'nationwide'
    ? { x: city.nwMapX, y: city.nwMapY }
    : { x: city.mapX, y: city.mapY };
}

export function reachHubOverlay(style: ReachMapStyle) {
  return style === 'nationwide'
    ? { x: REACH_HUB.nwMapX, y: REACH_HUB.nwMapY }
    : { x: REACH_HUB.mapX, y: REACH_HUB.mapY };
}

/** SVG coverage map overlay (percent on `egyptGeo` outline). */
export function reachCitySvgOverlay(city: ReachCity) {
  return { x: city.svgMapX, y: city.svgMapY };
}

export function reachHubSvgOverlay() {
  return { x: REACH_HUB.svgMapX, y: REACH_HUB.svgMapY };
}
