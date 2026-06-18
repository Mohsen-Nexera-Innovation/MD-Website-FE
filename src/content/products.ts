/** Product catalog — static seed for /products (SRS CONTENT-004/005 prototype). */

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

const products: CatalogProduct[] = [
  {
    id: 'aditek-bracket-system',
    name: 'Aditek Bracket System',
    brand: 'Aditek',
    brandSlug: 'aditek',
    specialty: 'Orthodontics',
    specialtySlug: 'ORTHODONTICS',
    subcategory: 'Brackets',
    keySpec: 'Slot: 0.022"',
    image: '/products/cat-ortho-implants.png',
    imageAlt: 'Aditek orthodontic bracket system',
    images: ['/products/cat-ortho-implants.png'],
    description:
      'Low-profile stainless steel brackets engineered for efficient tooth movement and patient comfort in daily orthodontic practice.',
    specs: {
      'Slot size': '0.022"',
      'Base design': 'Mesh pad',
      Material: 'Stainless steel',
      'Bracket type': 'Active self-ligating',
      Torque: 'Preset per tooth',
    },
    clinical: {
      indications: 'Fixed orthodontic treatment for malocclusion correction.',
      usage: 'Bond per manufacturer torque/angulation chart; verify full seating before light-cure.',
      storage: 'Store in dry conditions below 30°C.',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['wbt-ortho-system', 'bms-composite-kit'],
    publishedAt: '2026-02-10',
  },
  {
    id: 'bms-composite-kit',
    name: 'BMS Composite Kit',
    brand: 'BMS',
    brandSlug: 'bms',
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    subcategory: 'Composites',
    keySpec: '16 shades',
    image: '/products/cat-restorative.png',
    imageAlt: 'BMS composite syringes and shade guide',
    images: ['/products/cat-restorative.png'],
    description:
      'Shade-stable nanohybrid composites for anterior and posterior restorations with polished aesthetics.',
    specs: {
      'Shade range': '16 VITA shades',
      'Filler content': '68% by weight',
      'Flexural strength': '120 MPa',
      'Working time': '2 min',
      'Setting time': '40 sec light-cure',
    },
    clinical: {
      indications: 'Direct restorations in anterior and posterior teeth.',
      usage: 'Incremental layering; cure each layer per lamp specification.',
      storage: '15–25°C, protect from light.',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['heydent-zirconia-disc', 'centrix-impression'],
    publishedAt: '2026-01-18',
  },
  {
    id: 'heydent-zirconia-disc',
    name: 'Heydent Zirconia Disc',
    brand: 'Heydent',
    brandSlug: 'heydent',
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    subcategory: 'Zirconia',
    keySpec: '1200 MPa flexural',
    image: '/products/cat-restorative.png',
    imageAlt: 'Heydent zirconia milling disc',
    images: ['/products/cat-restorative.png'],
    description:
      'High-translucency zirconia discs for monolithic crowns and multi-layer aesthetic restorations.',
    specs: {
      'Flexural strength': '1200 MPa',
      Translucency: 'High',
      'Disc thickness': '12–25 mm',
      Sintering: 'Per manufacturer cycle',
    },
    clinical: {
      indications: 'Crowns, bridges, and implant-supported restorations.',
      storage: 'Dry environment, room temperature.',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['bms-composite-kit', 'centrix-impression'],
    publishedAt: '2026-01-22',
  },
  {
    id: 'sin-endo-file-set',
    name: 'SIN Endo File Set',
    brand: 'SIN',
    brandSlug: 'sin',
    specialty: 'Endodontics',
    specialtySlug: 'ENDODONTICS',
    subcategory: 'Rotary files',
    keySpec: 'NiTi rotary sequence',
    image: '/products/cat-endodontics.png',
    imageAlt: 'SIN endodontic rotary file sequence',
    images: ['/products/cat-endodontics.png'],
    description:
      'Color-coded nickel-titanium rotary files for predictable canal shaping and minimal iatrogenic risk.',
    specs: {
      Alloy: 'Nickel-titanium',
      Taper: '0.04–0.06',
      'Tip sizes': '#15–#40',
      Length: '21 / 25 / 31 mm',
      'Rotational speed': '250–350 rpm',
    },
    clinical: {
      indications: 'Root canal preparation in vital and non-vital teeth.',
      usage: 'Crown-down technique with irrigation; discard after single use.',
      contraindications: 'Severely curved canals without pre-flaring.',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['profa-sterilization-pouch'],
    publishedAt: '2026-02-01',
  },
  {
    id: 'centrix-impression',
    name: 'Centrix Impression Material',
    brand: 'Centrix',
    brandSlug: 'centrix',
    specialty: 'Impressions & Lab',
    specialtySlug: 'IMPRESSIONS',
    subcategory: 'VPS impression',
    keySpec: '3 min set time',
    image: '/products/cat-prosthodontics.png',
    imageAlt: 'Centrix impression cartridge and tray',
    images: ['/products/cat-prosthodontics.png'],
    description:
      'Addition silicone impression material for precise crown, bridge, and implant prosthetic records.',
    specs: {
      Type: 'VPS addition silicone',
      'Working time': '2 min',
      'Set time': '3 min',
      'Tear strength': 'High',
      'Dimensional stability': '24 h',
    },
    clinical: {
      indications: 'Fixed and removable prosthodontic impressions.',
      usage: 'Dispense via automix cartridge; tray selection per arch.',
      storage: 'Cool, dry storage per IFU.',
    },
    certifications: ['CE', 'FDA'],
    relatedIds: ['heydent-zirconia-disc', 'bms-composite-kit'],
    publishedAt: '2026-02-05',
  },
  {
    id: 'profa-sterilization-pouch',
    name: 'PROFA Sterilization Pouch',
    brand: 'PROFA',
    brandSlug: 'profa',
    specialty: 'Infection Control',
    specialtySlug: 'INFECTION_CONTROL',
    subcategory: 'Sterilization',
    keySpec: 'Self-seal medical grade',
    image: '/products/cat-infection-control.png',
    imageAlt: 'PROFA sterilization pouches',
    images: ['/products/cat-infection-control.png'],
    description:
      'Medical-grade sterilization pouches with indicator strip for steam and EO sterilization cycles.',
    specs: {
      Material: 'Medical-grade film + paper',
      Sizes: '90×170 mm to 305×430 mm',
      Indicator: 'Steam / EO reactive',
      Seal: 'Self-seal adhesive',
    },
    clinical: {
      indications: 'Packaging instruments for autoclave sterilization.',
      storage: 'Dry, away from direct sunlight.',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['topglove-exam-gloves', 'sin-endo-file-set'],
    publishedAt: '2026-01-30',
  },
  {
    id: 'wbt-ortho-system',
    name: 'WBT Orthodontic System',
    brand: 'WBT',
    brandSlug: 'wbt',
    specialty: 'Orthodontics',
    specialtySlug: 'ORTHODONTICS',
    subcategory: 'Bracket kits',
    keySpec: 'Complete chairside kit',
    image: '/products/cat-equipment.png',
    imageAlt: 'WBT orthodontic instruments and brackets',
    images: ['/products/cat-equipment.png'],
    description:
      'Complete bracket, archwire, and ligature kit for efficient orthodontic chairside workflows.',
    specs: {
      'Slot size': '0.022"',
      'Wire range': 'NiTi + stainless',
      'Kit contents': 'Brackets, wires, ligatures, tools',
      Material: 'Stainless steel',
    },
    clinical: {
      indications: 'Fixed appliance orthodontic treatment.',
      usage: 'Follow WBT bonding protocol and wire sequencing guide.',
    },
    certifications: ['CE'],
    relatedIds: ['aditek-bracket-system'],
    publishedAt: '2026-02-12',
  },
  {
    id: 'topglove-exam-gloves',
    name: 'TopGlove Exam Gloves',
    brand: 'TopGlove',
    brandSlug: 'topglove',
    specialty: 'Infection Control',
    specialtySlug: 'INFECTION_CONTROL',
    subcategory: 'Gloves',
    keySpec: 'Powder-free nitrile',
    image: '/products/cat-infection-control.png',
    imageAlt: 'TopGlove nitrile examination gloves',
    images: ['/products/cat-infection-control.png'],
    description:
      'Powder-free nitrile examination gloves for daily infection control across all clinical procedures.',
    specs: {
      Material: 'Nitrile',
      'Powder-free': 'Yes',
      Sizes: 'XS–XL',
      Color: 'Blue / violet',
    },
    clinical: {
      indications: 'General examination and procedure barrier protection.',
      storage: 'Cool, dry place; avoid heat.',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['profa-sterilization-pouch'],
    publishedAt: '2026-02-08',
  },
  {
    id: 'bms-bonding-agent',
    name: 'BMS Bonding Agent',
    brand: 'BMS',
    brandSlug: 'bms',
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    subcategory: 'Bonding agents',
    keySpec: 'Universal adhesive',
    image: '/products/cat-restorative.png',
    imageAlt: 'BMS dental bonding agent bottle',
    images: ['/products/cat-restorative.png'],
    description: 'Single-bottle universal adhesive for direct and indirect bonding protocols.',
    specs: {
      Type: 'Universal adhesive',
      'Film thickness': 'Low',
      'Compatibility': 'Light-cure composites',
    },
    certifications: ['CE'],
    relatedIds: ['bms-composite-kit'],
    publishedAt: '2026-02-14',
  },
  {
    id: 'sin-sealer-kit',
    name: 'SIN Endo Sealer Kit',
    brand: 'SIN',
    brandSlug: 'sin',
    specialty: 'Endodontics',
    specialtySlug: 'ENDODONTICS',
    subcategory: 'Obturation',
    keySpec: 'Bioceramic sealer',
    image: '/products/cat-endodontics.png',
    imageAlt: 'SIN endodontic sealer kit',
    images: ['/products/cat-endodontics.png'],
    description: 'Bioceramic root canal sealer for warm and cold obturation techniques.',
    specs: {
      Type: 'Bioceramic sealer',
      'Working time': 'Extended',
      Solubility: 'Low',
    },
    certifications: ['CE', 'ISO 13485'],
    relatedIds: ['sin-endo-file-set'],
    publishedAt: '2026-02-15',
  },
  {
    id: 'heydent-polish-system',
    name: 'Heydent Polish System',
    brand: 'Heydent',
    brandSlug: 'heydent',
    specialty: 'Preventive',
    specialtySlug: 'PREVENTIVE',
    subcategory: 'Finishing',
    keySpec: 'Multi-step polish',
    image: '/products/cat-restorative.png',
    imageAlt: 'Heydent composite polishers',
    images: ['/products/cat-restorative.png'],
    description: 'Multi-step polishing system for composite and ceramic surface finishing.',
    specs: {
      Steps: '4-step sequence',
      'Grit range': 'Fine to ultra-fine',
      'RPM max': '15,000',
    },
    certifications: ['CE'],
    relatedIds: ['bms-composite-kit', 'heydent-zirconia-disc'],
    publishedAt: '2026-02-16',
  },
  {
    id: 'centrix-temp-crown',
    name: 'Centrix Temp Crown Material',
    brand: 'Centrix',
    brandSlug: 'centrix',
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    subcategory: 'Temporization',
    keySpec: 'Auto-mix bis-acrylic',
    image: '/products/cat-prosthodontics.png',
    imageAlt: 'Centrix temporary crown material',
    images: ['/products/cat-prosthodontics.png'],
    description: 'Bis-acrylic temporary crown and bridge material with natural shade stability.',
    specs: {
      Type: 'Bis-acrylic automix',
      'Set time': '90 sec',
      Shades: 'A2 / B1',
    },
    certifications: ['CE', 'FDA'],
    relatedIds: ['centrix-impression', 'bms-composite-kit'],
    publishedAt: '2026-02-18',
  },
];

export const CATALOG_PRODUCTS: readonly CatalogProduct[] = products;

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
