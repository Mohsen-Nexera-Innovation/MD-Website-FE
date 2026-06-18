/**
 * Interactive coverage map — city hubs, zones, and area manager contacts.
 * R1 static seed; replace with DB (BRAND-003) when Prisma is wired.
 */

import { latLonToMapPercent } from '@/content/egyptGeo';
import { REACH_ZONES } from '@/content/reachZones';

export type CoverageZoneType = 'REP_TERRITORY' | 'ECOMMERCE_ONLY' | 'ECOMMERCE_FULL';

export type CoverageManager = {
  name: string;
  phone: string;
  email?: string;
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

/** Placeholder reps — replace when MD Dental confirms territory list. */
const MANAGERS: Record<string, CoverageManager> = {
  cairo: { name: 'Ahmed Hassan', phone: '+201012345678', email: 'cairo@md-dental.com' },
  giza: { name: 'Ahmed Hassan', phone: '+201012345678', email: 'cairo@md-dental.com' },
  alexandria: { name: 'Karim El-Sayed', phone: '+201023456789', email: 'alexandria@md-dental.com' },
  tanta: { name: 'Mahmoud Farouk', phone: '+201034567890', email: 'tanta@md-dental.com' },
  mansoura: { name: 'Hassan Ibrahim', phone: '+201045678901', email: 'mansoura@md-dental.com' },
  damietta: { name: 'Hassan Ibrahim', phone: '+201045678901', email: 'mansoura@md-dental.com' },
  minya: { name: 'Youssef Nabil', phone: '+201056789012', email: 'minya@md-dental.com' },
  asyut: { name: 'Omar Khaled', phone: '+201067890123', email: 'asyut@md-dental.com' },
  sohag: { name: 'Omar Khaled', phone: '+201067890123', email: 'asyut@md-dental.com' },
  luxor: { name: 'Tarek Mostafa', phone: '+201078901234', email: 'luxor@md-dental.com' },
};

const GOVERNORATE_SLUG: Record<string, string> = {
  Cairo: 'cairo',
  Giza: 'giza',
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

/** Real lat/lon for accurate map placement. */
const CITY_COORDS: Record<
  string,
  { lat: number; lon: number; name: string; hub?: boolean }
> = {
  Cairo: { lat: 30.0444, lon: 31.2357, name: 'Cairo', hub: true },
  Giza: { lat: 30.0131, lon: 31.2089, name: 'Giza' },
  Alexandria: { lat: 31.2001, lon: 29.9187, name: 'Alexandria', hub: true },
  Tanta: { lat: 30.7865, lon: 31.0004, name: 'Tanta' },
  Mansoura: { lat: 31.0409, lon: 31.3785, name: 'Mansoura' },
  Damietta: { lat: 31.4175, lon: 31.8117, name: 'Damietta' },
  'Port Said': { lat: 31.2653, lon: 32.3019, name: 'Port Said' },
  Ismailia: { lat: 30.5965, lon: 32.2715, name: 'Ismailia' },
  Suez: { lat: 29.9668, lon: 32.5498, name: 'Suez' },
  'Sharm El-Sheikh': { lat: 27.9158, lon: 34.3299, name: 'Sharm El-Sheikh', hub: true },
  Hurghada: { lat: 27.2579, lon: 33.8116, name: 'Hurghada' },
  Minya: { lat: 28.1099, lon: 30.7503, name: 'Minya' },
  Asyut: { lat: 27.1783, lon: 31.1859, name: 'Asyut' },
  Sohag: { lat: 26.5569, lon: 31.6948, name: 'Sohag' },
  Luxor: { lat: 25.6872, lon: 32.6396, name: 'Luxor', hub: true },
  Aswan: { lat: 24.0889, lon: 32.8998, name: 'Aswan' },
};

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

export const COVERAGE_CITIES: readonly CoverageCity[] = Object.values(CITY_COORDS).map((coord) => {
  const id = cityId(coord.name);
  const { x: mapX, y: mapY } = latLonToMapPercent(coord.lat, coord.lon);
  const zone = zoneTypeForId(id);
  return {
    id,
    name: coord.name,
    nameAr: NAME_AR[coord.name] ?? coord.name,
    governorateSlug: GOVERNORATE_SLUG[coord.name] ?? id,
    zone,
    mapX,
    mapY,
    zoneIds: zoneIdsForCity(coord.name),
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
