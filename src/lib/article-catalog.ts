import type { Article, ContentTypeSlug } from '@/content/articles';
import type { DentalSpecialtySlug } from '@/content/products';
import { paginate, type CatalogSort } from '@/lib/catalog';

export type ArticleCatalogFilters = {
  search?: string;
  specialties?: DentalSpecialtySlug[];
  brands?: string[];
  contentTypes?: ContentTypeSlug[];
  sort?: CatalogSort;
  page?: number;
};

export const ARTICLE_PAGE_SIZE = 12;

export function filterArticles(
  articles: readonly Article[],
  filters: ArticleCatalogFilters,
): Article[] {
  let result = [...articles];
  const q = filters.search?.trim().toLowerCase();

  if (q) {
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.specialty.toLowerCase().includes(q) ||
        (a.brand?.toLowerCase().includes(q) ?? false) ||
        a.contentTypeLabel.toLowerCase().includes(q),
    );
  }

  if (filters.specialties?.length) {
    const set = new Set(filters.specialties);
    result = result.filter((a) => set.has(a.specialtySlug));
  }

  if (filters.brands?.length) {
    const set = new Set(filters.brands);
    result = result.filter((a) => a.brandSlug && set.has(a.brandSlug));
  }

  if (filters.contentTypes?.length) {
    const set = new Set(filters.contentTypes);
    result = result.filter((a) => set.has(a.contentType));
  }

  const sort = filters.sort ?? (q ? 'relevance' : 'newest');

  if (sort === 'alpha') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'newest') {
    result.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  return result;
}

export function parseArticleParams(
  searchParams: Record<string, string | string[] | undefined>,
): ArticleCatalogFilters {
  const get = (key: string) => {
    const v = searchParams[key];
    return typeof v === 'string' ? v : undefined;
  };

  const specialties = get('specialty')?.split(',').filter(Boolean) as DentalSpecialtySlug[] | undefined;
  const brands = get('brand')?.split(',').filter(Boolean);
  const contentTypes = get('type')?.split(',').filter(Boolean) as ContentTypeSlug[] | undefined;

  const sort = get('sort');
  const validSort: CatalogSort[] = ['relevance', 'newest', 'alpha'];
  const parsedSort = validSort.includes(sort as CatalogSort) ? (sort as CatalogSort) : undefined;

  const page = parseInt(get('page') ?? '1', 10);

  return {
    search: get('q') ?? undefined,
    specialties: specialties?.length ? specialties : undefined,
    brands: brands?.length ? brands : undefined,
    contentTypes: contentTypes?.length ? contentTypes : undefined,
    sort: parsedSort,
    page: Number.isFinite(page) ? page : 1,
  };
}

export function buildArticleQuery(filters: ArticleCatalogFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set('q', filters.search);
  if (filters.specialties?.length) params.set('specialty', filters.specialties.join(','));
  if (filters.brands?.length) params.set('brand', filters.brands.join(','));
  if (filters.contentTypes?.length) params.set('type', filters.contentTypes.join(','));
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  const s = params.toString();
  return s ? `?${s}` : '';
}

export function paginateArticles(
  articles: Article[],
  page: number,
  pageSize = ARTICLE_PAGE_SIZE,
) {
  return paginate(articles, page, pageSize);
}

export function hasActiveArticleFilters(filters: ArticleCatalogFilters): boolean {
  return Boolean(
    filters.search ||
      filters.specialties?.length ||
      filters.brands?.length ||
      filters.contentTypes?.length,
  );
}
