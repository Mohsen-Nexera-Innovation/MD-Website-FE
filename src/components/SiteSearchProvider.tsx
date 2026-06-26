'use client';

import Link from 'next/link';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  searchSite,
  SITE_SEARCH_SUGGESTIONS,
  type SiteSearchCategory,
  type SiteSearchItem,
} from '@/lib/site-search';

type SiteSearchContextValue = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export function useSiteSearch(): SiteSearchContextValue {
  const ctx = useContext(SiteSearchContext);
  if (!ctx) throw new Error('useSiteSearch must be used within SiteSearchProvider');
  return ctx;
}

const CATEGORY_LABELS: Record<SiteSearchCategory, string> = {
  Product: 'Product',
  Event: 'Event',
  Article: 'Article',
  Partner: 'Partner',
  Page: 'Page',
};

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      }

      if (event.key === 'Enter' && results[activeIndex]) {
        event.preventDefault();
        window.location.href = results[activeIndex].href;
        close();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, results, activeIndex, close]);

  return (
    <SiteSearchContext.Provider value={{ open, close, toggle, isOpen }}>
      {children}

      <div
        className={`md-search-ov${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search MD Dental"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="md-search-box">
          <label className="md-search-field" htmlFor="md-site-search">
            <SearchIcon />
            <input
              ref={inputRef}
              id="md-site-search"
              type="search"
              placeholder="Search products, events, articles, partners…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <div className="md-search-results" role="listbox" aria-label="Search results">
            {query.trim().length < 2 ? (
              <div className="md-search-hint">
                <p>Type at least 2 characters to search the full site.</p>
                <div className="md-search-suggest">
                  {SITE_SEARCH_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="md-search-suggest-btn"
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="md-search-empty">No results for &ldquo;{query.trim()}&rdquo;</p>
            ) : (
              results.map((item, index) => (
                <SearchResultRow
                  key={item.id}
                  item={item}
                  active={index === activeIndex}
                  onNavigate={close}
                  onHover={() => setActiveIndex(index)}
                />
              ))
            )}
          </div>

          <p className="md-search-kbd">
            <kbd>↑</kbd> <kbd>↓</kbd> navigate · <kbd>Enter</kbd> open · <kbd>Esc</kbd> close ·{' '}
            <kbd>⌘</kbd><kbd>K</kbd> search
          </p>
        </div>
      </div>
    </SiteSearchContext.Provider>
  );
}

function SearchResultRow({
  item,
  active,
  onNavigate,
  onHover,
}: {
  item: SiteSearchItem;
  active: boolean;
  onNavigate: () => void;
  onHover: () => void;
}) {
  return (
    <Link
      href={item.href}
      className={`md-search-result${active ? ' is-active' : ''}`}
      role="option"
      aria-selected={active}
      onClick={onNavigate}
      onMouseEnter={onHover}
    >
      <span className="md-search-result-main">
        <strong>{item.title}</strong>
        <span>{item.subtitle}</span>
      </span>
      <span className={`md-search-result-cat md-search-result-cat--${item.category.toLowerCase()}`}>
        {CATEGORY_LABELS[item.category]}
      </span>
    </Link>
  );
}

export function SiteSearchTrigger({
  className,
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { open } = useSiteSearch();

  return (
    <button
      type="button"
      className={className ?? 'md-search-trigger'}
      onClick={open}
      aria-label="Search site"
      title="Search (⌘K)"
    >
      <SearchIcon />
      {showLabel ? <span>Search</span> : null}
      {!showLabel ? <span className="md-search-trigger-kbd" aria-hidden>⌘K</span> : null}
    </button>
  );
}
