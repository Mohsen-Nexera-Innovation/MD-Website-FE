'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ARTICLES,
  BRAND_FILTER_OPTIONS,
  CONTENT_TYPES,
  DENTAL_SPECIALTIES,
  getFeaturedArticle,
  type ContentTypeSlug,
} from '@/content/articles';
import type { DentalSpecialtySlug } from '@/content/products';
import { EVENTS_PREVIEW } from '@/content/home';
import {
  ARTICLE_PAGE_SIZE,
  buildArticleQuery,
  filterArticles,
  hasActiveArticleFilters,
  paginateArticles,
  parseArticleParams,
} from '@/lib/article-catalog';
import type { CatalogSort } from '@/lib/catalog';
import ArticleCard from '@/components/ui/ArticleCard';
import ArticleFeatured from '@/components/ui/ArticleFeatured';
import EmptyState from '@/components/ui/EmptyState';
import FilterChips from '@/components/ui/FilterChips';
import Pagination from '@/components/ui/Pagination';

export default function ArticlesCatalog() {
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

  const filters = parseArticleParams(rawParams);

  const updateFilters = useCallback(
    (next: Partial<typeof filters>) => {
      const merged = { ...filters, ...next, page: next.page ?? 1 };
      router.push(`/articles${buildArticleQuery(merged)}`, { scroll: false });
    },
    [filters, router],
  );

  const filtered = filterArticles(ARTICLES, filters);
  const showFeatured = !hasActiveArticleFilters(filters);
  const featured = getFeaturedArticle();
  const listForPagination = showFeatured
    ? filtered.filter((a) => a.slug !== featured.slug)
    : filtered;

  const { items, page, totalPages, total } = paginateArticles(
    listForPagination,
    filters.page ?? 1,
    ARTICLE_PAGE_SIZE,
  );

  const chips = useMemo(() => {
    const list: { key: string; label: string }[] = [];
    filters.specialties?.forEach((slug) => {
      const label = DENTAL_SPECIALTIES.find((s) => s.slug === slug)?.label ?? slug;
      list.push({ key: `specialty:${slug}`, label });
    });
    filters.brands?.forEach((slug) => {
      const label = BRAND_FILTER_OPTIONS.find((b) => b.value === slug)?.label ?? slug;
      list.push({ key: `brand:${slug}`, label });
    });
    filters.contentTypes?.forEach((slug) => {
      const label = CONTENT_TYPES.find((t) => t.slug === slug)?.label ?? slug;
      list.push({ key: `type:${slug}`, label });
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
    if (type === 'type') {
      updateFilters({
        contentTypes: filters.contentTypes?.filter((t) => t !== value) as ContentTypeSlug[] | undefined,
      });
    }
  }

  function toggleSpecialty(slug: DentalSpecialtySlug) {
    const current = filters.specialties ?? [];
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    updateFilters({ specialties: next.length ? next : undefined });
  }

  function toggleBrand(slug: string) {
    const current = filters.brands ?? [];
    const next = current.includes(slug) ? current.filter((b) => b !== slug) : [...current, slug];
    updateFilters({ brands: next.length ? next : undefined });
  }

  function toggleContentType(slug: ContentTypeSlug) {
    const current = filters.contentTypes ?? [];
    const next = current.includes(slug) ? current.filter((t) => t !== slug) : [...current, slug];
    updateFilters({ contentTypes: next.length ? next : undefined });
  }

  function clearAll() {
    router.push('/articles', { scroll: false });
  }

  return (
    <>
      {showFeatured ? <ArticleFeatured article={featured} /> : null}

      <div className="catalog-layout reveal">
        <aside
          className={`catalog-filters${mobileFiltersOpen ? ' is-open' : ''}`}
          aria-label="Article filters"
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
            <h3>Content type</h3>
            <ul className="catalog-filter-list">
              {CONTENT_TYPES.map((t) => (
                <li key={t.slug}>
                  <label className="catalog-filter-check">
                    <input
                      type="checkbox"
                      checked={filters.contentTypes?.includes(t.slug) ?? false}
                      onChange={() => toggleContentType(t.slug)}
                    />
                    <span>{t.label}</span>
                  </label>
                </li>
              ))}
            </ul>
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

          <div className="catalog-sidebar-promo">
            <p>New to MD Dental?</p>
            <Link href="/register" className="md-btn md-btn-primary md-btn-full">
              Register your clinic
            </Link>
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
              placeholder="Search articles…"
              value={filters.search ?? ''}
              onChange={(e) => {
                const v = e.target.value;
                if (v === '' || v.length >= 2) {
                  updateFilters({ search: v || undefined });
                }
              }}
              aria-label="Search articles"
            />
            <select
              className="catalog-sort"
              value={filters.sort ?? 'newest'}
              onChange={(e) => updateFilters({ sort: e.target.value as CatalogSort })}
              aria-label="Sort articles"
            >
              <option value="newest">Newest</option>
              <option value="alpha">A – Z</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>

          <FilterChips chips={chips} onRemove={removeChip} onClearAll={chips.length ? clearAll : undefined} />

          <p className="catalog-result-count">
            {total} article{total === 1 ? '' : 's'}
          </p>

          {items.length === 0 ? (
            <EmptyState
              title="No articles match"
              message="Try adjusting your filters or search terms."
              actionLabel="Clear all filters"
              onAction={clearAll}
            />
          ) : (
            <div className="catalog-grid">
              {items.map((article) => (
                <ArticleCard key={article.slug} article={article} />
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

      <section className="articles-events-strip reveal" aria-labelledby="articles-events-heading">
        <h2 id="articles-events-heading">Upcoming events</h2>
        <div className="articles-events-grid">
          {EVENTS_PREVIEW.map((e) => (
            <Link key={e.id} href={`/events/${e.id}`} className="content-card content-card--link">
              <span className="tag">{e.type}</span>
              <h3>{e.title}</h3>
              <div className="meta">{e.date} · {e.location}</div>
            </Link>
          ))}
        </div>
        <Link href="/events" className="articles-events-more">View all events →</Link>
      </section>
    </>
  );
}
