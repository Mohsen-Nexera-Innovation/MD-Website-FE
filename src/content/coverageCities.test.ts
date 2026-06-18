import { describe, expect, it } from 'vitest';
import { COVERAGE_CITIES, coverageCityById } from '@/content/coverageCities';
import { isInMapBounds } from '@/content/egyptGeo';

const PHONE_RE = /^\+?[0-9]{10,15}$/;

describe('coverageCities', () => {
  it('lists every network city with unique ids', () => {
    const ids = COVERAGE_CITIES.map((c) => c.id);
    expect(ids.length).toBeGreaterThanOrEqual(16);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps map coordinates inside the viewBox', () => {
    for (const city of COVERAGE_CITIES) {
      expect(isInMapBounds(city.mapX, city.mapY)).toBe(true);
    }
  });

  it('assigns managers to rep territories with valid phones', () => {
    const reps = COVERAGE_CITIES.filter((c) => c.zone === 'REP_TERRITORY');
    expect(reps.length).toBeGreaterThanOrEqual(10);
    for (const city of reps) {
      expect(city.manager?.name).toBeTruthy();
      expect(city.manager?.phone.replace(/\s/g, '')).toMatch(PHONE_RE);
    }
  });

  it('does not assign managers to e-commerce-only cities', () => {
    const ecom = COVERAGE_CITIES.filter((c) => c.zone === 'ECOMMERCE_ONLY');
    expect(ecom.length).toBeGreaterThan(0);
    for (const city of ecom) {
      expect(city.manager).toBeUndefined();
    }
  });

  it('resolves cities by id', () => {
    expect(coverageCityById('cairo')?.name).toBe('Cairo');
    expect(coverageCityById('unknown')).toBeUndefined();
  });
});
