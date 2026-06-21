import { describe, expect, it } from 'vitest';
import { CATALOG_PRODUCTS } from '@/content/products';
import { filterProducts, paginate, parseCatalogParams } from '@/lib/catalog';

describe('filterProducts', () => {
  it('filters by search query', () => {
    const result = filterProducts(CATALOG_PRODUCTS, { search: 'zirconia' });
    expect(result.some((p) => p.id === 'heydent-zirconia-disc')).toBe(true);
    expect(result.every((p) => p.name.toLowerCase().includes('zirconia') || p.brand.toLowerCase().includes('zirconia'))).toBe(true);
  });

  it('filters by brand slug', () => {
    const result = filterProducts(CATALOG_PRODUCTS, { brands: ['bms'] });
    expect(result.every((p) => p.brandSlug === 'bms')).toBe(true);
  });
});

describe('paginate', () => {
  it('returns correct page slice', () => {
    const { items, totalPages } = paginate(CATALOG_PRODUCTS, 1, 6);
    expect(items.length).toBe(6);
    expect(totalPages).toBe(2);
  });
});

describe('parseCatalogParams', () => {
  it('parses query string params', () => {
    const f = parseCatalogParams({ q: 'endo', brand: 'sin,bms', page: '2', sort: 'alpha' });
    expect(f.search).toBe('endo');
    expect(f.brands).toEqual(['sin', 'bms']);
    expect(f.page).toBe(2);
    expect(f.sort).toBe('alpha');
  });
});
