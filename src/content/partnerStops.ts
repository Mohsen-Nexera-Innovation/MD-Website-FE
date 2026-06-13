import type { GlobeStop } from '@/content/heroGlobeStops';

export type PartnerBrand = { name: string; slug: string };

/**
 * Partner-country stops for the Partners section globe.
 * All stops are `phase: 'global'` so the Earth holds a clean world framing
 * and simply rotates between partner countries (no Egypt zoom/route).
 * Coordinates are country-centred for pleasant globe centring.
 */
export type PartnerCountry = GlobeStop & {
  country: string;
  region: string;
  blurb: string;
  brands: PartnerBrand[];
};

export const PARTNER_STOPS: PartnerCountry[] = [
  {
    id: 'brazil',
    name: 'Brazil',
    country: 'Brazil',
    region: 'South America',
    lat: -14.24,
    lon: -51.93,
    phase: 'global',
    flag: 'br',
    subtitle: 'Aditek · SIN',
    blurb:
      'Implant systems and orthodontic engineering from Brazil’s advanced dental manufacturing base.',
    brands: [
      { name: 'Aditek', slug: 'aditek' },
      { name: 'SIN', slug: 'sin' },
    ],
  },
  {
    id: 'germany',
    name: 'Germany',
    country: 'Germany',
    region: 'Europe',
    lat: 51.17,
    lon: 10.45,
    phase: 'global',
    flag: 'de',
    subtitle: 'BMS · Heydent · PROFA · WBT',
    blurb:
      'German precision across restoratives, infection control and laboratory materials — four exclusive brands.',
    brands: [
      { name: 'BMS', slug: 'bms' },
      { name: 'Heydent', slug: 'heydent' },
      { name: 'PROFA', slug: 'profa' },
      { name: 'WBT', slug: 'wbt' },
    ],
  },
  {
    id: 'usa',
    name: 'United States',
    country: 'United States',
    region: 'North America',
    lat: 39.5,
    lon: -98.35,
    phase: 'global',
    flag: 'us',
    subtitle: 'Centrix',
    blurb:
      'Clinically trusted dental delivery systems and restorative solutions, made in the USA.',
    brands: [{ name: 'Centrix', slug: 'centrix' }],
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    country: 'Malaysia',
    region: 'Southeast Asia',
    lat: 4.21,
    lon: 101.98,
    phase: 'global',
    flag: 'my',
    subtitle: 'TopGlove',
    blurb:
      'World-leading glove manufacturing — high-volume, certified protection for every clinic.',
    brands: [{ name: 'TopGlove', slug: 'topglove' }],
  },
];
