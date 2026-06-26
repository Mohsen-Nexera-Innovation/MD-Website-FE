import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import PageHero from '@/components/layout/PageHero';
import ProductsCatalog from '@/components/catalog/ProductsCatalog';
import { PRODUCT_CATALOG_INTRO } from '@/content/products';
import Arrow from '@/components/journey/Arrow';
import { SHOP_BASE_URL } from '@/lib/shop';

export const metadata: Metadata = {
  title: 'Products | MD Dental',
  description:
    'Browse MD Dental technical specifications — factory-direct dental products from 8 global brands across every specialty.',
};

export default function ProductsPage() {
  return (
    <div className="inner-page inner-page--products inner-page--catalog">
      <div className="wrap catalog-page-shell">
        <PageHero
          breadcrumbLabel="Products"
          eyebrow={PRODUCT_CATALOG_INTRO.eyebrow}
          title={PRODUCT_CATALOG_INTRO.title}
          lead={PRODUCT_CATALOG_INTRO.lead}
          journeyFrom="products"
        />

        <Suspense fallback={<p className="catalog-loading">Loading catalog…</p>}>
          <ProductsCatalog />
        </Suspense>

        <section className="catalog-cta-band catalog-cta-band--shop reveal" aria-labelledby="products-shop-heading">
          <h2 id="products-shop-heading">Ready to order?</h2>
          <p>
            Browse specs here, then checkout on MD shop — authentic global brands, CE-certified,
            delivered across 27 governorates.
          </p>
          <div className="catalog-cta-band-actions">
            <a
              href={SHOP_BASE_URL}
              className="md-btn md-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop now <Arrow />
            </a>
            <Link href="/why-md-dental" className="md-btn md-btn-ghost">
              Why MD Dental
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
