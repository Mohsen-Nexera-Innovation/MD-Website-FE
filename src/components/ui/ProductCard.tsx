import Link from 'next/link';
import Image from 'next/image';
import type { CatalogProduct } from '@/content/products';

type ProductCardProps = {
  product: CatalogProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="catalog-product-card catalog-product-card--link">
      <div className="catalog-product-media">
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={400}
          height={300}
          className="catalog-product-img"
          sizes="(max-width: 600px) 100vw, 280px"
        />
        <span className="catalog-product-badge">{product.specialty}</span>
      </div>
      <div className="catalog-product-body">
        <span className="catalog-product-brand">{product.brand}</span>
        <h3>{product.name}</h3>
        <p className="catalog-product-spec">{product.keySpec}</p>
        <span className="catalog-product-more">View specifications →</span>
      </div>
    </Link>
  );
}
