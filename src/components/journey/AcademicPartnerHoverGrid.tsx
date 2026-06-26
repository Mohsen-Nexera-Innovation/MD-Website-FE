'use client';

import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import UniversityPartnerLogo from '@/components/ui/UniversityPartnerLogo';
import PartnerBrandLogo from '@/components/ui/PartnerBrandLogo';
import type { AcademicPartner, UniversityBrand } from '@/content/universities';
import { getUniversityLogo } from '@/content/universityLogos';
import {
  getBrandCatalogUrl,
  getBrandShopUrl,
  SHOP_BASE_URL,
} from '@/lib/shop';

function AcademyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

type AcademicPartnerHoverGridProps = {
  partners: readonly AcademicPartner[];
  variant: 'university' | 'academy';
  gridClassName: string;
  tileClassName: string;
};

function useGridColumns(variant: 'university' | 'academy') {
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const breakpoints =
      variant === 'university'
        ? [
            { mq: window.matchMedia('(min-width: 900px)'), cols: 5 },
            { mq: window.matchMedia('(min-width: 640px)'), cols: 3 },
          ]
        : [{ mq: window.matchMedia('(min-width: 720px)'), cols: 3 }];

    const update = () => {
      for (const { mq, cols: nextCols } of breakpoints) {
        if (mq.matches) {
          setCols(nextCols);
          return;
        }
      }
      setCols(2);
    };

    update();
    for (const { mq } of breakpoints) {
      mq.addEventListener('change', update);
    }
    return () => {
      for (const { mq } of breakpoints) {
        mq.removeEventListener('change', update);
      }
    };
  }, [variant]);

  return cols;
}

function rowEndIndex(index: number, cols: number, total: number) {
  const rowStart = Math.floor(index / cols) * cols;
  return Math.min(rowStart + cols - 1, total - 1);
}

function initials(name: string): string {
  const words = name.replace(/University|Academy|Institute|Association|Center|School/gi, '').trim().split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function BrandShopRow({ brand }: { brand: UniversityBrand }) {
  const hasCatalog = Boolean(brand.slug);

  return (
    <li className="path-academic-brand-row">
      <span className="path-academic-brand-label">
        {brand.slug ? (
          <PartnerBrandLogo slug={brand.slug} name={brand.label} className="path-academic-brand-logo" />
        ) : null}
        <span>{brand.label}</span>
      </span>
      <span className="path-academic-brand-actions">
        {hasCatalog ? (
          <Link href={getBrandCatalogUrl(brand.slug!)} className="path-academic-brand-link">
            Specs
          </Link>
        ) : null}
        <a
          href={hasCatalog ? getBrandShopUrl(brand.slug!) : SHOP_BASE_URL}
          className="path-academic-brand-shop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop now
        </a>
      </span>
    </li>
  );
}

function BrandDetailPanel({
  partner,
  onClose,
}: {
  partner: AcademicPartner;
  onClose: () => void;
}) {
  const detailId = `academic-detail-${partner.id}`;

  return (
    <div className="path-academic-detail" id={detailId} role="region" aria-label={`${partner.name} — MD brands`}>
      <div className="path-academic-detail-head">
        <div className="path-academic-detail-intro">
          {getUniversityLogo(partner.id) ? (
            <UniversityPartnerLogo
              id={partner.id}
              name={partner.name}
              className="path-academic-detail-logo"
            />
          ) : null}
          <div>
            <h4 className="path-academic-detail-title">{partner.name}</h4>
            <p className="path-academic-detail-sub">Supplied by MD Dental</p>
          </div>
        </div>
        <button type="button" className="path-academic-detail-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      {partner.brands.length > 0 ? (
        <ul className="path-academic-brand-list">
          {partner.brands.map((brand) => (
            <BrandShopRow key={`${partner.id}-${brand.label}`} brand={brand} />
          ))}
        </ul>
      ) : (
        <p className="path-academic-hover-empty">
          Full MD Dental catalog available — browse authentic global brands for your faculty.
        </p>
      )}

      <div className="path-academic-hover-foot">
        <p className="path-academic-hover-foot-lead">Same stock Egypt&apos;s top faculties order from MD.</p>
        <div className="path-academic-hover-foot-actions">
          <Link href="/products" className="path-academic-hover-catalog">
            View catalog
          </Link>
          <a
            href={SHOP_BASE_URL}
            className="path-academic-hover-shop-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop with MD
          </a>
        </div>
      </div>

      {partner.eventUrl ? (
        <a
          href={partner.eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="path-academic-hover-event"
        >
          Campus events & photos ↗
        </a>
      ) : null}
    </div>
  );
}

export default function AcademicPartnerHoverGrid({
  partners,
  variant,
  gridClassName,
  tileClassName,
}: AcademicPartnerHoverGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const cols = useGridColumns(variant);
  const selectedIndex = selectedId ? partners.findIndex((p) => p.id === selectedId) : -1;
  const selectedPartner = selectedIndex >= 0 ? partners[selectedIndex] : null;
  const detailAfterIndex =
    selectedIndex >= 0 ? rowEndIndex(selectedIndex, cols, partners.length) : -1;

  const togglePartner = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  const btnClass =
    variant === 'university' ? 'path-uni-tile--btn' : 'path-academy-tile--btn';

  return (
    <ul className={gridClassName}>
      {partners.map((partner, index) => {
        const preview = partner.brands.slice(0, 2);
        const extra = partner.brands.length - preview.length;
        const isSelected = selectedId === partner.id;
        const detailId = `academic-detail-${partner.id}`;
        const hasLogo = variant === 'university' && Boolean(getUniversityLogo(partner.id));
        const mark =
          variant === 'academy' ? (
            <span className="path-academy-icon" aria-hidden>
              <AcademyIcon />
            </span>
          ) : hasLogo ? (
            <UniversityPartnerLogo id={partner.id} name={partner.name} />
          ) : (
            <span className="path-uni-mark" aria-hidden>
              {initials(partner.name)}
            </span>
          );

        return (
          <Fragment key={partner.id}>
            <li
              className={`path-academic-expand-wrap path-academic-expand-wrap--${variant} build`}
              style={{ ['--uni-i' as string]: index, ['--acad-i' as string]: index }}
            >
              <button
                type="button"
                className={`${tileClassName} ${btnClass}${isSelected ? ' is-selected' : ''}`}
                aria-expanded={isSelected}
                aria-controls={detailId}
                onClick={() => togglePartner(partner.id)}
              >
                {mark}
                <span className={variant === 'university' ? 'path-uni-name' : 'path-academy-name'}>
                  {partner.name}
                </span>
                {preview.length > 0 ? (
                  <span className="path-uni-brand-row" aria-hidden>
                    {preview.map((b) => (
                      <span key={b.label} className="path-uni-brand-pill">
                        {b.label}
                      </span>
                    ))}
                    {extra > 0 ? (
                      <span className="path-uni-brand-pill path-uni-brand-pill--more">+{extra}</span>
                    ) : null}
                  </span>
                ) : null}
              </button>
            </li>

            {index === detailAfterIndex && selectedPartner ? (
              <li className="path-academic-detail-row">
                <BrandDetailPanel partner={selectedPartner} onClose={() => setSelectedId(null)} />
              </li>
            ) : null}
          </Fragment>
        );
      })}
    </ul>
  );
}
