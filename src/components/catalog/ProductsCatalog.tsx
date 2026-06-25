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
  countProductsBySpecialty,
  filterProducts,
  hasActiveCatalogFilters,
  paginate,
  parseCatalogParams,
  type CatalogSort,
} from '@/lib/catalog';
import { SHOP_BASE_URL } from '@/lib/shop';
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
  const specialtyCounts = useMemo(() => countProductsBySpecialty(CATALOG_PRODUCTS), []);

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

  function selectSpecialtyOnly(slug: DentalSpecialtySlug | null) {
    updateFilters({ specialties: slug ? [slug] : undefined });
  }

  function toggleBrand(slug: string) {
    const current = filters.brands ?? [];
    const next = current.includes(slug) ? current.filter((b) => b !== slug) : [...current, slug];
    updateFilters({ brands: next.length ? next : undefined });
  }

  function clearAll() {
    router.push('/products', { scroll: false });
  }

  const activeSpecialty =
    filters.specialties?.length === 1 ? filters.specialties[0] : null;

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
            {DENTAL_SPECIALTIES.map((s) => {
              const count = specialtyCounts[s.slug] ?? 0;
              if (count === 0) return null;
              return (
                <li key={s.slug}>
                  <label className="catalog-filter-check">
                    <input
                      type="checkbox"
                      checked={filters.specialties?.includes(s.slug) ?? false}
                      onChange={() => toggleSpecialty(s.slug)}
                    />
                    <span>{s.label}</span>
                    <span className="catalog-filter-count">{count}</span>
                  </label>
                </li>
              );
            })}
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

        <div className="catalog-sidebar-promo">
          <p>Found what you need? Order authentic stock with nationwide delivery from MD shop.</p>
          <a
            href={SHOP_BASE_URL}
            className="md-btn md-btn-primary md-btn-sm catalog-sidebar-shop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop with MD
          </a>
        </div>
      </aside>

      <div className="catalog-main">
        <nav className="catalog-specialty-nav" aria-label="Browse by specialty">
          <button
            type="button"
            className={`catalog-specialty-pill${!filters.specialties?.length ? ' is-active' : ''}`}
            onClick={() => selectSpecialtyOnly(null)}
          >
            All
            <span className="catalog-specialty-count">{CATALOG_PRODUCTS.length}</span>
          </button>
          {DENTAL_SPECIALTIES.map((s) => {
            const count = specialtyCounts[s.slug] ?? 0;
            if (count === 0) return null;
            const isActive = activeSpecialty === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                className={`catalog-specialty-pill${isActive ? ' is-active' : ''}`}
                onClick={() => selectSpecialtyOnly(s.slug)}
                aria-pressed={isActive}
              >
                {s.label}
                <span className="catalog-specialty-count">{count}</span>
              </button>
            );
          })}
        </nav>

        <div className="catalog-shop-band">
          <div className="catalog-shop-band-copy">
            <strong>Order from MD shop</strong>
            <p>
              {hasActiveCatalogFilters(filters)
                ? `${total} SKU${total === 1 ? '' : 's'} match your filters — open shop to buy authentic stock with Bosta delivery across Egypt.`
                : 'Every product in this catalog is available through shop.mddental.com — CE-certified, factory-direct, delivered nationwide.'}
            </p>
          </div>
          <a
            href={SHOP_BASE_URL}
            className="md-btn md-btn-primary catalog-shop-band-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop now
          </a>
        </div>

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
          {filters.specialties?.length ? (
            <>
              {' '}
              in{' '}
              {filters.specialties
                .map((slug) => DENTAL_SPECIALTIES.find((s) => s.slug === slug)?.label ?? slug)
                .join(', ')}
            </>
          ) : null}
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
