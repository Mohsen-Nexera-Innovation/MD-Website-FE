import media from '@/content/mdMedia.generated.json';

export type MdMediaEvent = (typeof media.events)[number];
export type MdMediaProduct = (typeof media.products)[number];

export const BRAND_LOGOS: Record<string, string> = media.logos;

export const MD_TRUST_VIDEO = media.video ?? '/md/video/global-trust-dental.mp4';

export const MD_MEDIA_EVENTS: readonly MdMediaEvent[] = media.events;

export const MD_MEDIA_PRODUCTS: readonly MdMediaProduct[] = media.products ?? [];

export const STORY_IMAGES: Record<string, string> = media.story ?? {};

export const PRODUCT_FILES_BY_BRAND: Record<string, Record<string, string>> =
  media.productFilesByBrand ?? {};

export function getBrandLogo(slug: string): string | undefined {
  return BRAND_LOGOS[slug];
}

export function getMdMediaEvent(id: string): MdMediaEvent | undefined {
  return MD_MEDIA_EVENTS.find((event) => event.id === id);
}

export function getMdProductImage(brandSlug: string, filename: string): string | undefined {
  return PRODUCT_FILES_BY_BRAND[brandSlug]?.[filename];
}
