/** Product catalog types — shared by content modules. */

export const PRODUCT_CATALOG_INTRO = {
  eyebrow: 'Product Catalog',
  title: 'Technical specifications',
  lead:
    'Browse factory-direct, CE-certified SKUs with published specs and IFU downloads — MD Dental\'s content-to-commerce entry point.',
};

export const DENTAL_SPECIALTIES = [
  { slug: 'RESTORATIVE', label: 'Restorative' },
  { slug: 'ENDODONTICS', label: 'Endodontics' },
  { slug: 'ORTHODONTICS', label: 'Orthodontics' },
  { slug: 'IMPRESSIONS', label: 'Impressions & Lab' },
  { slug: 'INFECTION_CONTROL', label: 'Infection Control' },
  { slug: 'PREVENTIVE', label: 'Preventive' },
  { slug: 'IMPLANTS', label: 'Implants' },
] as const;

export type DentalSpecialtySlug = (typeof DENTAL_SPECIALTIES)[number]['slug'];

export type ProductClinical = {
  indications?: string;
  usage?: string;
  storage?: string;
  contraindications?: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  brandSlug: string;
  specialty: string;
  specialtySlug: DentalSpecialtySlug;
  subcategory: string;
  keySpec: string;
  image: string;
  imageAlt: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  clinical?: ProductClinical;
  certifications: string[];
  ifuUrl?: string;
  datasheetUrl?: string;
  relatedIds: string[];
  publishedAt: string;
};

export const BRAND_FILTER_OPTIONS = [
  { value: 'aditek', label: 'Aditek' },
  { value: 'bms', label: 'BMS' },
  { value: 'heydent', label: 'Heydent' },
  { value: 'sin', label: 'SIN' },
  { value: 'centrix', label: 'Centrix' },
  { value: 'profa', label: 'PROFA' },
  { value: 'topglove', label: 'TopGlove' },
  { value: 'wbt', label: 'WBT' },
] as const;

export const FALLBACK_PRODUCT_IMAGES: Record<string, string> = {
  aditek: '/products/cat-ortho-implants.png',
  bms: '/products/cat-restorative.png',
  heydent: '/products/cat-restorative.png',
  sin: '/products/cat-endodontics.png',
  centrix: '/products/cat-prosthodontics.png',
  profa: '/products/cat-endodontics.png',
  topglove: '/products/cat-infection-control.png',
  wbt: '/products/cat-equipment.png',
};
