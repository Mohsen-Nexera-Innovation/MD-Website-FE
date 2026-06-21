'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ProductCategory } from '@/content/productCategories';
import Arrow from '@/components/journey/Arrow';

type Accent = 'brand' | 'gold';

type ProductGalleryProps = {
  categories: readonly ProductCategory[];
};

const ADVANCE_MS = 4200;

function relIndex(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function accentFor(index: number): Accent {
  return index % 2 === 0 ? 'brand' : 'gold';
}

function chipsFor(category: ProductCategory): string[] {
  const featured = category.featured.split(' · ').map((s) => s.trim()).filter(Boolean);
  return [category.count, ...featured];
}

const Chevron = ({ left }: { left?: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {left ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

/**
 * ODYX-style 3D coverflow product gallery — focused category front-and-center,
 * neighbours fan in perspective. Auto-advances; pauses on hover/focus.
 */
export default function ProductGallery({ categories }: ProductGalleryProps) {
  const total = categories.length;
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const current = categories[active];
  const accent = accentFor(active);

  const go = (delta: number) => setActive((prev) => (prev + delta + total) % total);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const timer = window.setInterval(() => {
      if (!paused.current) setActive((prev) => (prev + 1) % total);
    }, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActive((prev) => (prev - 1 + total) % total);
      if (e.key === 'ArrowRight') setActive((prev) => (prev + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  return (
    <div
      className="md-pgx build"
      data-accent={accent}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocusCapture={() => { paused.current = true; }}
      onBlurCapture={() => { paused.current = false; }}
    >
      <div className="md-pgx-deck">
        <div className="md-pgx-ring" role="listbox" aria-label="Product categories">
          {categories.map((category, index) => {
            const offset = relIndex(index, active, total);
            const abs = Math.abs(offset);
            const cardAccent = accentFor(index);
            const style: CSSProperties = {
              transform: `translateX(calc(${offset} * 52%)) translateZ(calc(${-abs} * 130px)) rotateY(${-offset * 34}deg) scale(${1 - abs * 0.13})`,
              opacity: abs > 2 ? 0 : 1 - abs * 0.26,
              zIndex: 20 - abs,
              pointerEvents: abs > 2 ? 'none' : 'auto',
            };

            return (
              <button
                key={category.name}
                type="button"
                className={`md-pgx-card${index === active ? ' on' : ''}`}
                data-accent={cardAccent}
                style={style}
                onClick={() => setActive(index)}
                aria-selected={index === active}
                aria-label={category.name}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 720px) 88vw, 68vw"
                  className="md-pgx-card-img"
                  priority={index === 0}
                />
                <span className="md-pgx-scrim" aria-hidden />
                {index === active && <span className="md-pgx-beam" aria-hidden />}
                <span className="md-pgx-card-tag">
                  <b>{category.name}</b>
                  <span>{category.count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="md-pgx-nav prev"
          onClick={() => go(-1)}
          aria-label="Previous category"
        >
          <Chevron left />
        </button>
        <button
          type="button"
          className="md-pgx-nav next"
          onClick={() => go(1)}
          aria-label="Next category"
        >
          <Chevron />
        </button>
      </div>

      <div className="md-pgx-side">
        <div className="md-pgx-info" key={`info-${active}`}>
          <span className="md-pgx-eyebrow">{current.count}</span>
          <h3>{current.name}</h3>
          <p>{current.blurb}</p>
          <div className="md-pgx-chips">
            {chipsFor(current).map((chip) => (
              <span key={chip} className="md-pgx-chip">{chip}</span>
            ))}
          </div>
        </div>

        <Link
          href={current.href}
          className="md-btn md-btn-primary md-pgx-view-btn"
          key={`view-${active}`}
        >
          Browse category <Arrow />
        </Link>

        <div className="md-pgx-foot">
          <span className="md-pgx-count">
            <b>{String(active + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
          </span>
          <div className="md-pgx-dots" role="tablist" aria-label="Choose category">
            {categories.map((category, index) => (
              <button
                key={category.name}
                type="button"
                className={`md-pgx-dot${index === active ? ' on' : ''}`}
                data-accent={accentFor(index)}
                onClick={() => setActive(index)}
                aria-current={index === active}
                aria-label={category.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
