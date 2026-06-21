/** Figma homepage — Our Products tabs + grid (node 115-500). */

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

export const GRID_PRODUCTS: readonly GridProduct[] = [
  {
    id: 'bms-composite-kit',
    name: 'BMS Composite Kit',
    brand: 'BMS',
    blurb: 'Shade-stable restorative composites for daily anterior and posterior work.',
    tab: 'cosmetic',
    image: '/products/cat-restorative.png',
    imageAlt: 'BMS composite syringes and shade guide',
    href: '/products/bms-composite-kit',
  },
  {
    id: 'heydent-zirconia-disc',
    name: 'Heydent Zirconia Disc',
    brand: 'Heydent',
    blurb: 'High-strength zirconia blanks for aesthetic monolithic restorations.',
    tab: 'cosmetic',
    image: '/products/cat-restorative.png',
    imageAlt: 'Heydent zirconia milling disc',
    href: '/products/heydent-zirconia-disc',
  },
  {
    id: 'centrix-impression',
    name: 'Centrix Impression Material',
    brand: 'Centrix',
    blurb: 'Precise VPS impressions for crown, bridge, and implant prosthetics.',
    tab: 'surgical',
    image: '/products/cat-prosthodontics.png',
    imageAlt: 'Centrix impression cartridge and tray',
    href: '/products/centrix-impression',
  },
  {
    id: 'sin-endo-file-set',
    name: 'SIN Endo File Set',
    brand: 'SIN',
    blurb: 'Nickel-titanium rotary files for predictable canal shaping.',
    tab: 'endodontic',
    image: '/products/cat-endodontics.png',
    imageAlt: 'SIN endodontic rotary file sequence',
    href: '/products/sin-endo-file-set',
  },
  {
    id: 'aditek-bracket-system',
    name: 'Aditek Bracket System',
    brand: 'Aditek',
    blurb: 'Low-profile brackets and archwires for efficient orthodontic treatment.',
    tab: 'implant',
    image: '/products/cat-ortho-implants.png',
    imageAlt: 'Aditek orthodontic bracket system',
    href: '/products/aditek-bracket-system',
  },
  {
    id: 'wbt-ortho-system',
    name: 'WBT Orthodontic System',
    brand: 'WBT',
    blurb: 'Complete bracket, wire, and ligature kits for chairside efficiency.',
    tab: 'implant',
    image: '/products/cat-equipment.png',
    imageAlt: 'WBT orthodontic instruments and brackets',
    href: '/products/wbt-ortho-system',
  },
  {
    id: 'profa-sterilization-pouch',
    name: 'PROFA Sterilization Pouch',
    brand: 'PROFA',
    blurb: 'Medical-grade sterilization pouches for instrument reprocessing.',
    tab: 'equipment',
    image: '/products/cat-infection-control.png',
    imageAlt: 'PROFA sterilization pouches and gloves',
    href: '/products/profa-sterilization-pouch',
  },
  {
    id: 'topglove-exam-gloves',
    name: 'TopGlove Exam Gloves',
    brand: 'TopGlove',
    blurb: 'Powder-free nitrile gloves for infection control in every procedure.',
    tab: 'materials',
    image: '/products/cat-infection-control.png',
    imageAlt: 'TopGlove nitrile examination gloves',
    href: '/products/topglove-exam-gloves',
  },
];

export function productsForTab(tab: ProductTabId): readonly GridProduct[] {
  return GRID_PRODUCTS.filter((p) => p.tab === tab);
}
