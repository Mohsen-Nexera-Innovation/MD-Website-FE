/** Figma homepage — Our Products tabs + grid (node 115-500). */

import { getProductById } from '@/content/products';

export const PRODUCT_GRID_INTRO = {
  eyebrow: 'Our Products',
  heading: 'Our Products',
};

export const PRODUCT_TABS = [
  { id: 'cosmetic', label: 'COSMETIC' },
  { id: 'surgical', label: 'SURGICAL' },
  { id: 'endodontic', label: 'ENDODONTIC' },
  { id: 'implant', label: 'IMPLANT' },
  { id: 'equipment', label: 'EQUIPMENT' },
  { id: 'materials', label: 'MATERIALS' },
] as const;

export type ProductTabId = (typeof PRODUCT_TABS)[number]['id'];

export type GridProduct = {
  id: string;
  name: string;
  brand: string;
  blurb: string;
  tab: ProductTabId;
  image: string;
  imageAlt: string;
  href: string;
};

function catalogImage(id: string, fallback: string): string {
  return getProductById(id)?.image ?? fallback;
}

export const GRID_PRODUCTS: readonly GridProduct[] = [
  {
    id: 'bms-composite-kit',
    name: 'BMS FILLBEST Composite',
    brand: 'BMS',
    blurb: 'Shade-stable restorative composites for daily anterior and posterior work.',
    tab: 'cosmetic',
    image: catalogImage('bms-composite-kit', '/products/cat-restorative.png'),
    imageAlt: 'BMS FILLBEST composite syringes',
    href: '/products/bms-composite-kit',
  },
  {
    id: 'heydent-zirconia-disc',
    name: 'Heydent Hey-TEC Universal',
    brand: 'Heydent',
    blurb: 'Universal composite system for direct aesthetic restorations.',
    tab: 'cosmetic',
    image: catalogImage('heydent-zirconia-disc', '/products/cat-restorative.png'),
    imageAlt: 'Heydent Hey-TEC Universal composite',
    href: '/products/heydent-zirconia-disc',
  },
  {
    id: 'centrix-temp-crown',
    name: 'Centrix SuperCure Original',
    brand: 'Centrix',
    blurb: 'Dual-cure core build-up for crown and bridge preparations.',
    tab: 'surgical',
    image: catalogImage('centrix-temp-crown', '/products/cat-prosthodontics.png'),
    imageAlt: 'Centrix SuperCure core buildup material',
    href: '/products/centrix-temp-crown',
  },
  {
    id: 'sin-endo-file-set',
    name: 'SIN Endo File Set',
    brand: 'SIN',
    blurb: 'Nickel-titanium rotary files for predictable canal shaping.',
    tab: 'endodontic',
    image: catalogImage('sin-endo-file-set', '/products/cat-endodontics.png'),
    imageAlt: 'SIN endodontic rotary file sequence',
    href: '/products/sin-endo-file-set',
  },
  {
    id: 'aditek-bracket-system',
    name: 'Aditek EasyClip+',
    brand: 'Aditek',
    blurb: 'Low-profile brackets and archwires for efficient orthodontic treatment.',
    tab: 'implant',
    image: catalogImage('aditek-bracket-system', '/products/cat-ortho-implants.png'),
    imageAlt: 'Aditek EasyClip+ orthodontic bracket system',
    href: '/products/aditek-bracket-system',
  },
  {
    id: 'wbt-ortho-system',
    name: 'WBT Orthodontic System',
    brand: 'WBT',
    blurb: 'Complete bracket, wire, and ligature kits for chairside efficiency.',
    tab: 'implant',
    image: catalogImage('wbt-ortho-system', '/products/cat-equipment.png'),
    imageAlt: 'WBT orthodontic instruments and brackets',
    href: '/products/wbt-ortho-system',
  },
  {
    id: 'profa-sterilization-pouch',
    name: 'PROFA T-Blue Files',
    brand: 'PROFA',
    blurb: 'Heat-treated NiTi rotary files for endodontic shaping.',
    tab: 'equipment',
    image: catalogImage('profa-sterilization-pouch', '/products/cat-infection-control.png'),
    imageAlt: 'PROFA T-Blue endodontic rotary files',
    href: '/products/profa-sterilization-pouch',
  },
  {
    id: 'topglove-exam-gloves',
    name: 'TopGlove Exam Gloves',
    brand: 'TopGlove',
    blurb: 'Powder-free nitrile gloves for infection control in every procedure.',
    tab: 'materials',
    image: catalogImage('topglove-exam-gloves', '/products/cat-infection-control.png'),
    imageAlt: 'TopGlove nitrile examination gloves',
    href: '/products/topglove-exam-gloves',
  },
];

export function productsForTab(tab: ProductTabId): readonly GridProduct[] {
  return GRID_PRODUCTS.filter((p) => p.tab === tab);
}
