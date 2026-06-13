import Link from 'next/link';
import InnerPage from '@/components/InnerPage';
import { FEATURED_PRODUCTS } from '@/content/home';

export default function ProductsPage() {
  return (
    <InnerPage
      eyebrow="Product Catalog"
      title="Technical Specifications"
      lead="Browse 1,000+ SKUs with published specs and IFU downloads — content-to-commerce entry point."
      journeyFrom="catalog"
    >
      <div className="g3">
        {FEATURED_PRODUCTS.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="product-card product-card--link">
            <div className="brand">{p.brand}</div>
            <h3>{p.name}</h3>
            <div className="spec">{p.specialty}</div>
          </Link>
        ))}
      </div>
    </InnerPage>
  );
}
