/**
 * Area managers from MD Data / Regional_Structure(AutoRecovered).xlsx
 * Mapped to the three macro coverage zones on the interactive map.
 */

import type { CoverageManager } from '@/content/coverageCities';

export type RegionalManager = CoverageManager & {
  title: string;
  /** e.g. District Manager, Commercial Manager */
  role?: string;
};

function cleanName(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .replace(/^Dr\/?\.?\s*/i, 'Dr. ')
    .replace(/^Eng\.?\s*/i, 'Eng. ')
    .replace(/^Mr\/?\.?\s*/i, 'Mr. ')
    .trim();
}

/** Primary area manager per macro zone (District Manager from regional sheet). */
export const AREA_ZONE_MANAGERS: Record<'cairo' | 'delta' | 'upper', RegionalManager> = {
  cairo: {
    title: 'Greater Cairo',
    name: cleanName('Dr.Islam Yasser'),
    role: 'District Manager',
    email: 'sales@md-dental.com',
  },
  delta: {
    title: 'Delta & Alexandria',
    name: cleanName('Dr/Kareem anwer'),
    role: 'District Manager',
    email: 'sales@md-dental.com',
  },
  upper: {
    title: 'Upper Egypt',
    name: cleanName('Dr/Mohamed Gamal'),
    role: 'District Manager',
    email: 'sales@md-dental.com',
  },
};

/** Commercial lead for Greater Cairo (same sheet). */
export const GREATER_CAIRO_COMMERCIAL: RegionalManager = {
  title: 'Greater Cairo',
  name: cleanName('Eng.Karim Sabrh'),
  role: 'Commercial Manager',
  email: 'sales@md-dental.com',
};

/** City hub → area manager (derived from governorate assignments in regional sheet). */
export const CITY_AREA_MANAGERS: Record<string, CoverageManager & { role?: string }> = {
  cairo: { ...AREA_ZONE_MANAGERS.cairo },
  giza: { ...AREA_ZONE_MANAGERS.cairo },
  qalyubia: { ...AREA_ZONE_MANAGERS.cairo },
  alexandria: { name: cleanName('Dr/Kareem anwer'), role: 'District Manager', email: 'sales@md-dental.com' },
  tanta: { name: cleanName('Dr/Ahmed Mahmoud'), role: 'Field representative', email: 'sales@md-dental.com' },
  mansoura: { name: cleanName('Dr/Ahmed Mahmoud'), role: 'Field representative', email: 'sales@md-dental.com' },
  damietta: { name: cleanName('Dr/ahmed el zohry'), role: 'Field representative', email: 'sales@md-dental.com' },
  minya: { ...AREA_ZONE_MANAGERS.upper },
  asyut: { ...AREA_ZONE_MANAGERS.upper },
  sohag: { name: cleanName('Dr/Mariam Essa'), role: 'Field representative', email: 'sales@md-dental.com' },
  luxor: { name: cleanName('Dr/zinab mohktar'), role: 'Field representative', email: 'sales@md-dental.com' },
};

export function managerForZoneId(zoneId: string): RegionalManager | undefined {
  if (zoneId === 'cairo' || zoneId === 'delta' || zoneId === 'upper') {
    return AREA_ZONE_MANAGERS[zoneId];
  }
  return undefined;
}
