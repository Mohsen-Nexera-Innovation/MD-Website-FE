import type { CatalogProduct, DentalSpecialtySlug } from '@/content/products';

export type CatalogSort = 'relevance' | 'newest' | 'alpha';

export type CatalogFilters = {
  search?: string;
  specialties?: DentalSpecialtySlug[];
  brands?: string[];
  sort?: CatalogSort;
  page?: number;
};

export const CATALOG_PAGE_SIZE = 12;

export function filterProducts(
  products: readonly CatalogProduct[],
  filters: CatalogFilters,
): CatalogProduct[] {
  let result = [...products];
  const q = filters.search?.trim().toLowerCase();

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.keySpec.toLowerCase().includes(q),
    );
  }

  if (filters.specialties?.length) {
    const set = new Set(filters.specialties);
    result = result.filter((p) => set.has(p.specialtySlug));
  }

  if (filters.brands?.length) {
    const set = new Set(filters.brands);
    result = result.filter((p) => set.has(p.brandSlug));
  }

  const sort = filters.sort ?? (q ? 'relevance' : 'newest');

  if (sort === 'alpha') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'newest') {
    result.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  // relevance keeps search filter order (already narrowed)

  return result;
}

export function paginate<T>(items: T[], page: number, pageSize: number): {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
} {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  };
}

export function parseCatalogParams(searchParams: Record<string, string | string[] | undefined>): CatalogFilters {
  const get = (key: string) => {
    const v = searchParams[key];
    return typeof v === 'string' ? v : undefined;
  };

  const specialties = get('specialty')?.split(',').filter(Boolean) as DentalSpecialtySlug[] | undefined;
  const brands = get('brand')?.split(',').filter(Boolean);

  const sort = get('sort');
  const validSort: CatalogSort[] = ['relevance', 'newest', 'alpha'];
  const parsedSort = validSort.includes(sort as CatalogSort) ? (sort as CatalogSort) : undefined;

  const page = parseInt(get('page') ?? '1', 10);

  return {
    search: get('q') ?? undefined,
    specialties: specialties?.length ? specialties : undefined,
    brands: brands?.length ? brands : undefined,
    sort: parsedSort,
    page: Number.isFinite(page) ? page : 1,
  };
}

export function buildCatalogQuery(filters: CatalogFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set('q', filters.search);
  if (filters.specialties?.length) params.set('specialty', filters.specialties.join(','));
  if (filters.brands?.length) params.set('brand', filters.brands.join(','));
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  const s = params.toString();
  return s ? `?${s}` : '';
}
