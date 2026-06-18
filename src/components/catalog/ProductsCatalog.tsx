'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BRAND_FILTER_OPTIONS,
  CATALOG_PRODUCTS,
  DENTAL_SPECIALTIES,
  type DentalSpecialtySlug,
} from '@/content/products';
import {
  buildCatalogQuery,
  CATALOG_PAGE_SIZE,
  filterProducts,
  paginate,
  parseCatalogParams,
  type CatalogSort,
} from '@/lib/catalog';
import EmptyState from '@/components/ui/EmptyState';
import FilterChips from '@/components/ui/FilterChips';
import Pagination from '@/components/ui/Pagination';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const rawParams = useMemo(() => {
    const record: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      record[key] = value;
    });
    return record;
  }, [searchParams]);

  const filters = parseCatalogParams(rawParams);

  const updateFilters = useCallback(
    (next: Partial<typeof filters>) => {
      const merged = { ...filters, ...next, page: next.page ?? 1 };
      router.push(`/products${buildCatalogQuery(merged)}`, { scroll: false });
    },
    [filters, router],
  );

  const filtered = filterProducts(CATALOG_PRODUCTS, filters);
  const { items, page, totalPages, total } = paginate(
    filtered,
    filters.page ?? 1,
    CATALOG_PAGE_SIZE,
  );

  const chips = useMemo(() => {
    const list: { key: string; label: string }[] = [];
    filters.specialties?.forEach((slug) => {
      const label = DENTAL_SPECIALTIES.find((s) => s.slug === slug)?.label ?? slug;
      list.push({ key: `specialty:${slug}`, label: label });
    });
    filters.brands?.forEach((slug) => {
      const label = BRAND_FILTER_OPTIONS.find((b) => b.value === slug)?.label ?? slug;
      list.push({ key: `brand:${slug}`, label: label });
    });
    if (filters.search) list.push({ key: 'q', label: `Search: ${filters.search}` });
    return list;
  }, [filters]);

  function removeChip(key: string) {
    if (key === 'q') {
      updateFilters({ search: undefined });
      return;
    }
    const [type, value] = key.split(':');
    if (type === 'specialty') {
      updateFilters({
        specialties: filters.specialties?.filter((s) => s !== value) as DentalSpecialtySlug[] | undefined,
      });
    }
    if (type === 'brand') {
      updateFilters({ brands: filters.brands?.filter((b) => b !== value) });
    }
  }

  function toggleSpecialty(slug: DentalSpecialtySlug) {
    const current = filters.specialties ?? [];
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    updateFilters({ specialties: next.length ? next : undefined });
  }

  function toggleBrand(slug: string) {
    const current = filters.brands ?? [];
    const next = current.includes(slug) ? current.filter((b) => b !== slug) : [...current, slug];
    updateFilters({ brands: next.length ? next : undefined });
  }

  function clearAll() {
    router.push('/products', { scroll: false });
  }

  return (
    <div className="catalog-layout reveal">
      <aside
        className={`catalog-filters${mobileFiltersOpen ? ' is-open' : ''}`}
        aria-label="Product filters"
      >
        <div className="catalog-filters-head">
          <h2>Filters</h2>
          <button
            type="button"
            className="catalog-filters-close"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className="catalog-filter-group">
          <h3>Specialty</h3>
          <ul className="catalog-filter-list">
            {DENTAL_SPECIALTIES.map((s) => (
              <li key={s.slug}>
                <label className="catalog-filter-check">
                  <input
                    type="checkbox"
                    checked={filters.specialties?.includes(s.slug) ?? false}
                    onChange={() => toggleSpecialty(s.slug)}
                  />
                  <span>{s.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="catalog-filter-group">
          <h3>Brand</h3>
          <ul className="catalog-filter-list">
            {BRAND_FILTER_OPTIONS.map((b) => (
              <li key={b.value}>
                <label className="catalog-filter-check">
                  <input
                    type="checkbox"
                    checked={filters.brands?.includes(b.value) ?? false}
                    onChange={() => toggleBrand(b.value)}
                  />
                  <span>{b.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="catalog-main">
        <div className="catalog-toolbar">
          <button
            type="button"
            className="md-btn md-btn-ghost catalog-filter-toggle"
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filters
          </button>
          <input
            type="search"
            className="catalog-search"
            placeholder="Search products…"
            value={filters.search ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              if (v === '' || v.length >= 2) {
                updateFilters({ search: v || undefined });
              }
            }}
            aria-label="Search products"
          />
          <select
            className="catalog-sort"
            value={filters.sort ?? 'newest'}
            onChange={(e) => updateFilters({ sort: e.target.value as CatalogSort })}
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="alpha">A – Z</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>

        <FilterChips chips={chips} onRemove={removeChip} onClearAll={chips.length ? clearAll : undefined} />

        <p className="catalog-result-count">
          {total} product{total === 1 ? '' : 's'}
        </p>

        {items.length === 0 ? (
          <EmptyState
            title="No products match"
            message="Try adjusting your filters or search terms."
            actionLabel="Clear all filters"
            onAction={clearAll}
          />
        ) : (
          <div className="catalog-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => updateFilters({ page: p })}
        />
      </div>
    </div>
  );
}
