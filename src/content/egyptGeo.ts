/**
 * Shared Egypt map geometry — lat/lon projection into SVG viewBox space.
 */

export const EGYPT_VIEW_W = 360;
export const EGYPT_VIEW_H = 322;

/** Egypt bounding box for equirectangular projection. */
export const EGYPT_BBOX = {
  minLon: 24.65,
  maxLon: 36.95,
  minLat: 22.0,
  maxLat: 31.75,
} as const;

/** Egypt country outline (GeoJSON-derived). */
export const EGYPT_OUTLINE_PATH =
  'M 291.6 78.95 L 284.03 91.09 L 278.23 113.91 L 270.89 129.63 L 264.61 134.91 L 255.62 125.16 L 243.45 111.68 L 224.22 68.39 L 221.45 71.13 L 232.62 103 L 249.17 133.36 L 269.55 180.4 L 279.5 196.83 L 288.16 213.88 L 312.35 247.32 L 307 252.59 L 307.87 272.22 L 339.27 299.32 L 344 305.51 L 237.07 305.51 L 132.47 305.51 L 24.09 305.51 L 24.09 194.29 L 24.09 86.89 L 16 62.56 L 22.94 43.91 L 18.77 30.99 L 28.53 16.5 L 64.4 16 L 90.34 23.99 L 117.11 32.91 L 129.59 37.61 L 150.35 28.05 L 161.45 19.39 L 185.22 16.9 L 204.39 20.71 L 211.74 35.69 L 218 25.83 L 239.6 32.96 L 260.62 34.67 L 273.88 27.06 L 291.6 78.95 Z';

/** Nile River spine — geographic waypoints projected to SVG coords. */
export const NILE_RIVER_PATH = (() => {
  const pts = [
    latLonToSvg(31.15, 30.2), // delta west
    latLonToSvg(31.0, 31.0),
    latLonToSvg(30.04, 31.24), // cairo
    latLonToSvg(29.5, 31.2),
    latLonToSvg(28.09, 30.76), // minya
    latLonToSvg(27.18, 31.18), // asyut
    latLonToSvg(26.56, 31.69), // sohag
    latLonToSvg(25.69, 32.64), // luxor
    latLonToSvg(24.5, 32.85),
    latLonToSvg(24.09, 32.9), // aswan
  ];
  return `M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`;
})();

export function latLonToMapPercent(lat: number, lon: number) {
  const { minLon, maxLon, minLat, maxLat } = EGYPT_BBOX;
  return {
    x: ((lon - minLon) / (maxLon - minLon)) * 100,
    y: ((maxLat - lat) / (maxLat - minLat)) * 100,
  };
}

export function latLonToSvg(lat: number, lon: number) {
  const { x, y } = latLonToMapPercent(lat, lon);
  return mapPercentToSvg(x, y);
}

export function mapPercentToSvg(x: number, y: number) {
  return {
    x: (x / 100) * EGYPT_VIEW_W,
    y: (y / 100) * EGYPT_VIEW_H,
  };
}

/** @deprecated use latLonToMapPercent */
export function geoToMapPercent(x: number, y: number) {
  return {
    x: (x / EGYPT_VIEW_W) * 100,
    y: (y / EGYPT_VIEW_H) * 100,
  };
}

export function isInMapBounds(x: number, y: number) {
  return x >= 0 && x <= 100 && y >= 0 && y <= 100;
}
