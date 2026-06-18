import Link from 'next/link';
import Image from 'next/image';
import Arrow from '@/components/journey/Arrow';
import type { CatalogProduct } from '@/content/products';
import { getRelatedProducts } from '@/content/products';
import ProductCard from '@/components/ui/ProductCard';

type ProductDetailViewProps = {
  product: CatalogProduct;
};

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const related = getRelatedProducts(product.relatedIds);

  return (
    <div className="product-detail reveal">
      <nav className="inner-breadcrumb product-detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/products">Products</Link>
        <span aria-hidden>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail-hero">
        <div className="product-detail-gallery">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={640}
            height={480}
            className="product-detail-img"
            priority
            sizes="(max-width: 900px) 100vw, 480px"
          />
        </div>
        <div className="product-detail-intro">
          <Link href={`/partners/${product.brandSlug}`} className="product-detail-brand">
            {product.brand}
          </Link>
          <h1>{product.name}</h1>
          <div className="product-detail-tags">
            <span className="catalog-product-badge">{product.specialty}</span>
            <span className="product-detail-sub">{product.subcategory}</span>
          </div>
          <p className="product-detail-lead">{product.description}</p>
          <p className="product-detail-key">
            <strong>Key spec:</strong> {product.keySpec}
          </p>
          <div className="product-detail-actions">
            <Link href="/register" className="md-btn md-btn-primary">
              Register to order <Arrow />
            </Link>
            <button type="button" className="md-btn md-btn-disabled" title="Shop launches in Release 2">
              Buy on MD Shop
            </button>
          </div>
        </div>
      </div>

      <div className="product-detail-grid">
        <section className="product-detail-section">
          <h2>Specifications</h2>
          <table className="product-spec-table">
            <tbody>
              {Object.entries(product.specs).map(([label, value]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="product-detail-sidebar">
          {product.clinical ? (
            <section className="product-detail-panel">
              <h2>Clinical information</h2>
              {product.clinical.indications ? (
                <p><strong>Indications:</strong> {product.clinical.indications}</p>
              ) : null}
              {product.clinical.usage ? (
                <p><strong>Usage:</strong> {product.clinical.usage}</p>
              ) : null}
              {product.clinical.storage ? (
                <p><strong>Storage:</strong> {product.clinical.storage}</p>
              ) : null}
              {product.clinical.contraindications ? (
                <p><strong>Contraindications:</strong> {product.clinical.contraindications}</p>
              ) : null}
            </section>
          ) : null}

          {product.certifications.length > 0 ? (
            <section className="product-detail-panel">
              <h2>Certifications</h2>
              <div className="product-cert-badges">
                {product.certifications.map((c) => (
                  <span key={c} className="product-cert-badge">{c}</span>
                ))}
              </div>
            </section>
          ) : null}

          <section className="product-detail-panel">
            <h2>Downloads</h2>
            <button type="button" className="md-btn md-btn-ghost md-btn-full product-download-btn">
              Download IFU (PDF)
            </button>
            <button type="button" className="md-btn md-btn-ghost md-btn-full product-download-btn">
              Download datasheet (PDF)
            </button>
            <p className="product-download-hint">Secure download — API integration in Release 1 CMS.</p>
          </section>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="product-related">
          <h2>Related products</h2>
          <div className="catalog-grid catalog-grid--related">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
