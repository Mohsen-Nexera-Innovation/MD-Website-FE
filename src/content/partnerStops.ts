import type { GlobeStop } from '@/content/heroGlobeStops';

export type PartnerBrand = { name: string; slug: string };

/**
 * Partner-country stops for the Partners section globe.
 * All stops are `phase: 'global'` so the Earth holds a clean world framing
 * and simply rotates between partner countries (no Egypt zoom/route).
 * Coordinates are country-centred for pleasant globe centring.
 *
 * Country ↔ brand mapping matches MD Dental Company Profile 2024 (Figma reference).
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
      'Orthodontic innovation and advanced dental solutions from Brazil — Aditek and SIN, trusted globally for research-driven quality since 1990.',
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
    subtitle: 'Heydent',
    blurb:
      'German dental aesthetics — Heydent composites, bonding agents and veneer cements engineered for customized, top-quality restorative results.',
    brands: [{ name: 'Heydent', slug: 'heydent' }],
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
      'American delivery systems that make dentistry easier — Centrix fluoride varnish, temporary cements and preventive solutions built on quality and ethics.',
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
      'The world’s largest glove manufacturer — TopGlove exports to over 2,000 customers globally, with MD Dental on a private-label collaboration.',
    brands: [{ name: 'TopGlove', slug: 'topglove' }],
  },
  {
    id: 'china',
    name: 'China',
    country: 'China',
    region: 'East Asia',
    lat: 35.86,
    lon: 104.2,
    phase: 'global',
    flag: 'cn',
    subtitle: 'PROFA',
    blurb:
      'High-quality endodontic manufacturing from China — PROFA rotary and manual files, Glidden drills and precision obturation devices.',
    brands: [{ name: 'PROFA', slug: 'profa' }],
  },
  {
    id: 'korea',
    name: 'South Korea',
    country: 'South Korea',
    region: 'East Asia',
    lat: 36.5,
    lon: 127.85,
    phase: 'global',
    flag: 'kr',
    subtitle: 'WBT',
    blurb:
      'Korean orthodontic excellence — WBT advanced bracket and wire systems that enhance patient comfort and practitioner efficiency.',
    brands: [{ name: 'WBT', slug: 'wbt' }],
  },
  {
    id: 'italy',
    name: 'Italy',
    country: 'Italy',
    region: 'Europe',
    lat: 41.87,
    lon: 12.57,
    phase: 'global',
    flag: 'it',
    subtitle: 'BMS',
    blurb:
      'Italian impression and laboratory materials — BMS cements and impression systems trusted by modern practices for decades.',
    brands: [{ name: 'BMS', slug: 'bms' }],
  },
];
