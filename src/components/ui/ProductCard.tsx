import Link from 'next/link';
import Image from 'next/image';
import type { CatalogProduct } from '@/content/products';
import { getSpecialtyCatalogUrl } from '@/lib/catalog';
import { getProductShopUrl } from '@/lib/shop';

type ProductCardProps = {
  product: CatalogProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const shopUrl = getProductShopUrl(product.id);

  return (
    <article className="catalog-product-card">
      <div className="catalog-product-media">
        <Link href={`/products/${product.id}`} className="catalog-product-card-link">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={400}
            height={300}
            className="catalog-product-img"
            sizes="(max-width: 600px) 100vw, 280px"
          />
        </Link>
        <Link
          href={getSpecialtyCatalogUrl(product.specialtySlug)}
          className="catalog-product-badge catalog-product-badge--filter"
          aria-label={`Browse ${product.specialty} products`}
        >
          {product.specialty}
        </Link>
      </div>
      <Link href={`/products/${product.id}`} className="catalog-product-body-link">
        <div className="catalog-product-body">
          <span className="catalog-product-brand">{product.brand}</span>
          <h3>{product.name}</h3>
          <p className="catalog-product-spec">{product.keySpec}</p>
        </div>
      </Link>
      <div className="catalog-product-actions">
        <Link href={`/products/${product.id}`} className="catalog-product-more">
          View specifications →
        </Link>
        <a
          href={shopUrl}
          className="md-btn md-btn-primary md-btn-sm catalog-product-shop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop now
        </a>
      </div>
    </article>
  );
}
