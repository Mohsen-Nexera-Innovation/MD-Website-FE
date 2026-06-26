/** MD Dental e-commerce handoff — shop.mddental.com product pages. */

import { CATALOG_PRODUCTS } from '@/content/products';

export const SHOP_BASE_URL =
  process.env.NEXT_PUBLIC_SHOP_URL?.replace(/\/$/, '') ?? 'https://shop.mddental.com';

export function getProductShopUrl(productId: string): string {
  return `${SHOP_BASE_URL}/products/${encodeURIComponent(productId)}`;
}

/** Catalog page filtered by manufacturer brand. */
export function getBrandCatalogUrl(brandSlug: string): string {
  return `/products?brand=${encodeURIComponent(brandSlug)}`;
}

/** Shop handoff — first in-catalog SKU for the brand, else shop home. */
export function getBrandShopUrl(brandSlug: string): string {
  const product = CATALOG_PRODUCTS.find((p) => p.brandSlug === brandSlug);
  return product ? getProductShopUrl(product.id) : SHOP_BASE_URL;
}
