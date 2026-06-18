/** Product categories — homepage "Our Products" discovery grid. */

export const PRODUCT_INTRO = {
  eyebrow: 'Our Products',
  heading: 'Authentic products across every specialty',
  lead: 'Factory-direct, CE-certified instruments and materials from eight global partners — organized by the way you practice.',
};

export type ProductCategory = {
  name: string;
  blurb: string;
  count: string;
  href: string;
  /** Representative SKUs from MD Dental partner brands */
  featured: string;
  image: string;
  imageAlt: string;
};

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    name: 'Restorative',
    blurb: 'Composites, bonding systems, zirconia discs and finishing materials.',
    count: '120+ SKUs',
    href: '/products',
    featured: 'BMS Composite · Heydent Zirconia',
    image: '/products/cat-restorative.png',
    imageAlt:
      'BMS composite syringes in shade guides, Heydent zirconia milling disc, bonding agents and polishing wheels on a dental tray',
  },
  {
    name: 'Endodontics',
    blurb: 'Rotary files, sealers and obturation systems for predictable treatment.',
    count: '60+ SKUs',
    href: '/products',
    featured: 'SIN Rotary File Sets',
    image: '/products/cat-endodontics.png',
    imageAlt:
      'SIN nickel-titanium rotary endodontic files in color-coded sequence with file organizer block',
  },
  {
    name: 'Orthodontics & Implants',
    blurb: 'Bracket systems, wires and implant lines from advanced manufacturers.',
    count: '90+ SKUs',
    href: '/products',
    featured: 'Aditek Brackets · Implant Lines',
    image: '/products/cat-ortho-implants.png',
    imageAlt:
      'Aditek orthodontic metal brackets on a bracket card, archwires and elastics beside a dental implant fixture',
  },
  {
    name: 'Prosthodontics',
    blurb: 'Impression materials, prosthetic components and lab solutions.',
    count: '70+ SKUs',
    href: '/products',
    featured: 'Centrix Impression Materials',
    image: '/products/cat-prosthodontics.png',
    imageAlt:
      'Centrix impression material cartridge gun, silicone putty in impression tray and prosthetic denture teeth',
  },
  {
    name: 'Infection Control',
    blurb: 'Sterilization pouches, gloves and protective consumables you can trust.',
    count: '50+ SKUs',
    href: '/products',
    featured: 'PROFA Endo Files · TopGlove',
    image: '/products/cat-infection-control.png',
    imageAlt:
      'PROFA nickel-titanium endodontic files beside TopGlove nitrile exam gloves and sterilization pouches',
  },
  {
    name: 'Equipment & Instruments',
    blurb: 'Hand instruments and clinic equipment built for daily reliability.',
    count: '110+ SKUs',
    href: '/products',
    featured: 'WBT Orthodontic Systems',
    image: '/products/cat-equipment.png',
    imageAlt:
      'WBT orthodontic bracket and archwire kit with ligatures and placement tools in a sterilization tray',
  },
];
