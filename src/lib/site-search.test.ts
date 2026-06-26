import { describe, expect, it } from 'vitest';
import { searchSite, SITE_SEARCH_INDEX } from '@/lib/site-search';

describe('site-search', () => {
  it('indexes products, events, articles, and pages', () => {
    expect(SITE_SEARCH_INDEX.length).toBeGreaterThan(50);
    expect(SITE_SEARCH_INDEX.some((item) => item.category === 'Product')).toBe(true);
    expect(SITE_SEARCH_INDEX.some((item) => item.category === 'Event')).toBe(true);
    expect(SITE_SEARCH_INDEX.some((item) => item.category === 'Article')).toBe(true);
    expect(SITE_SEARCH_INDEX.some((item) => item.category === 'Page')).toBe(true);
  });

  it('finds products by brand or name', () => {
    const results = searchSite('bms');
    expect(results.some((item) => item.category === 'Product')).toBe(true);
  });

  it('finds events by title fragment', () => {
    const results = searchSite('workshop');
    expect(results.some((item) => item.category === 'Event')).toBe(true);
  });

  it('returns empty for short queries', () => {
    expect(searchSite('a')).toEqual([]);
  });
});
