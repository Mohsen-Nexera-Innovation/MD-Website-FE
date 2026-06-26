import { describe, expect, it } from 'vitest';
import { CATALOG_PRODUCTS } from '@/content/products';
import { filterProducts, paginate, parseCatalogParams } from '@/lib/catalog';

describe('filterProducts', () => {
  it('filters by search query', () => {
    const result = filterProducts(CATALOG_PRODUCTS, { search: 'fillbest' });
    expect(result.some((p) => p.id === 'bms-composite-kit')).toBe(true);
    expect(
      result.every(
        (p) =>
          p.name.toLowerCase().includes('fillbest') ||
          p.brand.toLowerCase().includes('fillbest') ||
          p.keySpec.toLowerCase().includes('fillbest'),
      ),
    ).toBe(true);
  });

  it('filters by brand slug', () => {
    const result = filterProducts(CATALOG_PRODUCTS, { brands: ['bms'] });
    expect(result.every((p) => p.brandSlug === 'bms')).toBe(true);
  });

  it('filters by specialty slug', () => {
    const result = filterProducts(CATALOG_PRODUCTS, { specialties: ['ENDODONTICS'] });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.specialtySlug === 'ENDODONTICS')).toBe(true);
  });
});

describe('paginate', () => {
  it('returns correct page slice', () => {
    const pageSize = 6;
    const { items, totalPages } = paginate(CATALOG_PRODUCTS, 1, pageSize);
    expect(items.length).toBe(pageSize);
    expect(totalPages).toBe(Math.ceil(CATALOG_PRODUCTS.length / pageSize));
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

  it('parses specialty filter param', () => {
    const f = parseCatalogParams({ specialty: 'RESTORATIVE,ENDODONTICS' });
    expect(f.specialties).toEqual(['RESTORATIVE', 'ENDODONTICS']);
  });
});
