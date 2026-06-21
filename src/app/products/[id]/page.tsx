import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailView from '@/components/catalog/ProductDetailView';
import { getProductById } from '@/content/products';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'Product | MD Dental' };
  return {
    title: `${product.name} - ${product.brand} | MD Dental`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="inner-page inner-page--products inner-page--catalog">
      <div className="wrap catalog-page-shell">
        <ProductDetailView product={product} />
      </div>
    </div>
  );
}
