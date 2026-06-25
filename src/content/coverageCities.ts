/**
 * Interactive coverage map — city hubs, zones, and area manager contacts.
 * Positions are calibrated to the SVG outline via `reachZones` (not raw lat/lon).
 */

import {
  AREA_ZONE_MANAGERS,
  CITY_AREA_MANAGERS,
} from '@/content/regionalManagers';
import { REACH_NETWORK_CITIES, REACH_ZONES } from '@/content/reachZones';

export type CoverageZoneType = 'REP_TERRITORY' | 'ECOMMERCE_ONLY' | 'ECOMMERCE_FULL';

export type CoverageManager = {
  name: string;
  phone?: string;
  email?: string;
  role?: string;
};

export type CoverageCity = {
  id: string;
  name: string;
  nameAr: string;
  governorateSlug: string;
  zone: CoverageZoneType;
  mapX: number;
  mapY: number;
  /** Reach zone ids this city belongs to (for gallery highlight). */
  zoneIds: readonly string[];
  manager?: CoverageManager;
};

/** Re-export for map UI — sourced from Regional_Structure sheet. */
export { AREA_ZONE_MANAGERS } from '@/content/regionalManagers';

/** City-level reps from regional sheet. */
const MANAGERS: Record<string, CoverageManager> = CITY_AREA_MANAGERS;

const GOVERNORATE_SLUG: Record<string, string> = {
  Cairo: 'cairo',
  Giza: 'giza',
  Qalyubia: 'qalyubia',
  Alexandria: 'alexandria',
  Tanta: 'gharbia',
  Mansoura: 'dakahlia',
  Damietta: 'damietta',
  'Port Said': 'port-said',
  Ismailia: 'ismailia',
  Suez: 'suez',
  'Sharm El-Sheikh': 'south-sinai',
  Hurghada: 'red-sea',
  Minya: 'minya',
  Asyut: 'asyut',
  Sohag: 'sohag',
  Luxor: 'luxor',
  Aswan: 'aswan',
};

const NAME_AR: Record<string, string> = {
  Cairo: 'القاهرة',
  Giza: 'الجيزة',
  Qalyubia: 'القليوبية',
  Alexandria: 'الإسكندرية',
  Tanta: 'طنطا',
  Mansoura: 'المنصورة',
  Damietta: 'دمياط',
  'Port Said': 'بورسعيد',
  Ismailia: 'الإسماعيلية',
  Suez: 'السويس',
  'Sharm El-Sheikh': 'شرم الشيخ',
  Hurghada: 'الغردقة',
  Minya: 'المنيا',
  Asyut: 'أسيوط',
  Sohag: 'سوهاج',
  Luxor: 'الأقصر',
  Aswan: 'أسوان',
};

const ECOM_ONLY = new Set([
  'port-said',
  'ismailia',
  'suez',
  'sharm-el-sheikh',
  'hurghada',
  'aswan',
]);

function cityId(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function zoneIdsForCity(name: string) {
  return REACH_ZONES.filter((z) => z.cities.some((c) => c.name === name)).map((z) => z.id);
}

function zoneTypeForId(id: string): CoverageZoneType {
  if (ECOM_ONLY.has(id)) return 'ECOMMERCE_ONLY';
  if (MANAGERS[id]) return 'REP_TERRITORY';
  return 'ECOMMERCE_FULL';
}

export const COVERAGE_CITIES: readonly CoverageCity[] = REACH_NETWORK_CITIES.map((rc) => {
  const id = cityId(rc.name);
  const zone = zoneTypeForId(id);
  return {
    id,
    name: rc.name,
    nameAr: NAME_AR[rc.name] ?? rc.name,
    governorateSlug: GOVERNORATE_SLUG[rc.name] ?? id,
    zone,
    mapX: rc.svgMapX,
    mapY: rc.svgMapY,
    zoneIds: zoneIdsForCity(rc.name),
    manager: zone === 'REP_TERRITORY' ? MANAGERS[id] : undefined,
  };
});

export const COVERAGE_HUB_ID = 'cairo';

export function coverageCityById(id: string | null | undefined): CoverageCity | undefined {
  if (!id) return undefined;
  return COVERAGE_CITIES.find((c) => c.id === id);
}

export const ZONE_LABELS: Record<CoverageZoneType, string> = {
  REP_TERRITORY: 'Sales representative territory',
  ECOMMERCE_ONLY: 'Bosta e-commerce delivery',
  ECOMMERCE_FULL: 'Full coverage',
};

/** Shorter labels for map popover badges. */
export const ZONE_LABELS_SHORT: Record<CoverageZoneType, string> = {
  REP_TERRITORY: 'Field rep territory',
  ECOMMERCE_ONLY: 'Bosta delivery',
  ECOMMERCE_FULL: 'Full coverage',
};

export const HUB_CONTACT: CoverageManager = {
  name: 'Cairo operations hub',
  phone: '+201012345678',
  email: 'sales@md-dental.com',
};