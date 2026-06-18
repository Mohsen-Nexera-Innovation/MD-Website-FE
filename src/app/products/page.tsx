import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import PageHero from '@/components/layout/PageHero';
import ProductsCatalog from '@/components/catalog/ProductsCatalog';
import { PRODUCT_CATALOG_INTRO } from '@/content/products';
import Arrow from '@/components/journey/Arrow';

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

        <section className="catalog-cta-band reveal" aria-labelledby="products-help-heading">
          <h2 id="products-help-heading">Need help choosing?</h2>
          <p>Our clinical support team can guide you to the right specifications for your practice.</p>
          <Link href="/why-md-dental" className="md-btn md-btn-primary">
            Why MD Dental <Arrow />
          </Link>
        </section>
      </div>
    </div>
  );
}
