import Link from 'next/link';
import { PRODUCT_CATEGORIES, PRODUCT_INTRO } from '@/content/productCategories';
import ProductGallery from '@/components/journey/ProductGallery';
import Arrow from '@/components/journey/Arrow';

/**
 * Section — Our Products. ODYX-style coverflow gallery plus catalog CTA.
 */
export default function ProductsShowcase() {
  return (
    <section id="products" className="sec sec-alt sec-products">
      <div className="wrap">
        <header className="sec-head sec-head--center reveal">
          <div className="eyebrow">{PRODUCT_INTRO.eyebrow}</div>
          <h2>{PRODUCT_INTRO.heading}</h2>
          <p>{PRODUCT_INTRO.lead}</p>
        </header>
      </div>

      <div className="product-gallery-shell build-group">
        <ProductGallery categories={PRODUCT_CATEGORIES} />
      </div>

      <div className="wrap">
        <div className="product-cat-cta reveal">
          <Link href="/products" className="md-btn md-btn-primary">
            Browse full catalog <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
