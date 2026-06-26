import {
  BRAND_DEFAULTS,
  LEGACY_PRODUCT_SPECS,
} from '@/content/productLegacySpecs';
import {
  getMdProductImage,
  MD_MEDIA_PRODUCTS,
  type MdMediaProduct,
} from '@/content/mdMedia';
import {
  BRAND_FILTER_OPTIONS,
  DENTAL_SPECIALTIES,
  FALLBACK_PRODUCT_IMAGES,
  PRODUCT_CATALOG_INTRO,
  type CatalogProduct,
  type DentalSpecialtySlug,
} from '@/content/products.types';

function resolveLegacyProduct(spec: (typeof LEGACY_PRODUCT_SPECS)[number]): CatalogProduct {
  const imageFromFile =
    spec.imageFile && getMdProductImage(spec.brandSlug, spec.imageFile);
  const image =
    imageFromFile ??
    MD_MEDIA_PRODUCTS.find((p) => p.id === spec.id)?.image ??
    FALLBACK_PRODUCT_IMAGES[spec.brandSlug] ??
    '/products/cat-restorative.png';

  const galleryProduct = MD_MEDIA_PRODUCTS.find((p) => p.id === spec.id);
  const images = galleryProduct?.images?.length ? galleryProduct.images : [image];

  return {
    ...spec,
    image,
    images,
    imageAlt: `${spec.name} — ${spec.brand}`,
  };
}

function buildGeneratedProduct(entry: MdMediaProduct): CatalogProduct {
  const defaults = BRAND_DEFAULTS[entry.brandSlug] ?? {
    brand: entry.brandSlug,
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE' as DentalSpecialtySlug,
    subcategory: 'General',
  };

  return {
    id: entry.id,
    name: entry.name,
    brand: defaults.brand,
    brandSlug: entry.brandSlug,
    specialty: defaults.specialty,
    specialtySlug: defaults.specialtySlug,
    subcategory: defaults.subcategory,
    keySpec: 'Authentic MD Dental supply',
    image: entry.image,
    imageAlt: `${entry.name} — ${defaults.brand}`,
    images: entry.images,
    description: `${entry.name} from ${defaults.brand}, exclusively distributed by MD Dental in Egypt.`,
    specs: {
      Brand: defaults.brand,
      Product: entry.name,
    },
    certifications: ['CE'],
    relatedIds: [],
    publishedAt: '2026-01-01',
  };
}

const legacyIds = new Set(LEGACY_PRODUCT_SPECS.map((p) => p.id));
const legacyProducts = LEGACY_PRODUCT_SPECS.map(resolveLegacyProduct);
const generatedProducts = MD_MEDIA_PRODUCTS.filter((p) => !legacyIds.has(p.id)).map(
  buildGeneratedProduct,
);

export const CATALOG_PRODUCTS: readonly CatalogProduct[] = [
  ...legacyProducts,
  ...generatedProducts,
].sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));

export const FEATURED_PRODUCTS = CATALOG_PRODUCTS.slice(0, 6).map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  specialty: p.specialty,
}));

export function getProductById(id: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(ids: string[]): CatalogProduct[] {
  return ids
    .map((id) => getProductById(id))
    .filter((p): p is CatalogProduct => p !== undefined);
}

export {
  BRAND_FILTER_OPTIONS,
  DENTAL_SPECIALTIES,
  PRODUCT_CATALOG_INTRO,
};
export type { CatalogProduct, DentalSpecialtySlug, ProductClinical } from '@/content/products.types';
