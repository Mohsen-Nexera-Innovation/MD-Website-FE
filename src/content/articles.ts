/** MD Community — article hub static seed (SRS CONTENT-001/002 prototype). */

import type { DentalSpecialtySlug } from '@/content/products';

export const ARTICLES_INTRO = {
  eyebrow: 'MD Community',
  title: 'Clinical articles & guides',
  lead:
    'Evidence-backed clinical knowledge organized by specialty and partner brand — the education pillar behind every MD Dental partnership.',
};

export const CONTENT_TYPES = [
  { slug: 'CLINICAL_GUIDE', label: 'Clinical guide' },
  { slug: 'CASE_STUDY', label: 'Case study' },
  { slug: 'PRODUCT_FOCUS', label: 'Product focus' },
  { slug: 'NEWS', label: 'News' },
  { slug: 'PROTOCOL', label: 'Protocol' },
] as const;

export type ContentTypeSlug = (typeof CONTENT_TYPES)[number]['slug'];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  specialty: string;
  specialtySlug: DentalSpecialtySlug;
  brandSlug?: string;
  brand?: string;
  contentType: ContentTypeSlug;
  contentTypeLabel: string;
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
  image: string;
  imageAlt: string;
  relatedProductIds: string[];
  relatedArticleSlugs: string[];
  featured?: boolean;
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

export const DENTAL_SPECIALTIES = [
  { slug: 'RESTORATIVE', label: 'Restorative' },
  { slug: 'ENDODONTICS', label: 'Endodontics' },
  { slug: 'ORTHODONTICS', label: 'Orthodontics' },
  { slug: 'IMPRESSIONS', label: 'Impressions & Lab' },
  { slug: 'INFECTION_CONTROL', label: 'Infection Control' },
  { slug: 'PREVENTIVE', label: 'Preventive' },
  { slug: 'IMPLANTS', label: 'Implants' },
] as const;

const articles: Article[] = [
  {
    slug: 'ce-certified-composites',
    title: 'Choosing CE-Certified Composites in Daily Practice',
    excerpt:
      'How to verify authentic restorative materials and avoid grey-market risk in Egyptian clinics.',
    body: [
      'CE marking is more than a label on the box — it confirms that a composite meets EU safety and performance standards audited by notified bodies.',
      'When evaluating suppliers, request the declaration of conformity and batch traceability. MD Dental distributes factory-direct from BMS and Heydent with full documentation.',
      'Shade stability, filler loading, and polish retention should match your clinical workflow. Document your shade selection protocol for multi-chair consistency.',
    ],
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    brandSlug: 'bms',
    brand: 'BMS',
    contentType: 'CLINICAL_GUIDE',
    contentTypeLabel: 'Clinical guide',
    author: 'Dr. Nadia El-Sayed',
    publishedAt: '2026-03-28',
    readingTimeMinutes: 6,
    image: '/articles/ce-certified-composites.png',
    imageAlt: 'Composite restorative materials on a dental tray',
    relatedProductIds: ['bms-composite-kit', 'bms-bonding-agent'],
    relatedArticleSlugs: ['composite-shade-protocol', 'heydent-zirconia-workflow'],
    featured: true,
  },
  {
    slug: 'orthodontic-multi-clinic',
    title: 'Orthodontic Workflow Tips for Multi-Location Clinics',
    excerpt:
      'Standardize bracket inventory, wire sequencing, and emergency protocols across branches.',
    body: [
      'Multi-site orthodontic practices need a single source of truth for bracket prescriptions and wire progression charts.',
      'Centralize procurement through one verified distributor to ensure every location receives authentic Aditek and WBT components with matching torque values.',
      'Schedule quarterly calibration sessions so auxiliary staff bond consistently — variation between sites is a leading cause of extended treatment times.',
    ],
    specialty: 'Orthodontics',
    specialtySlug: 'ORTHODONTICS',
    brandSlug: 'aditek',
    brand: 'Aditek',
    contentType: 'PROTOCOL',
    contentTypeLabel: 'Protocol',
    author: 'Dr. Karim Mostafa',
    publishedAt: '2026-03-22',
    readingTimeMinutes: 5,
    image: '/articles/orthodontic-multi-clinic.png',
    imageAlt: 'Orthodontic brackets and archwires',
    relatedProductIds: ['aditek-bracket-system', 'wbt-ortho-system'],
    relatedArticleSlugs: ['bracket-bonding-checklist'],
  },
  {
    slug: 'infection-control-standards',
    title: 'Infection Control Standards Every Clinic Should Meet',
    excerpt:
      'Sterilization pouch selection, glove protocols, and audit-ready documentation for Egyptian clinics.',
    body: [
      'Infection control is a patient safety baseline — not an optional upgrade. Every instrument cycle should be traceable from cleaning through sterile storage.',
      'Use medical-grade pouches with chemical indicators that change color when sterilization parameters are met. PROFA pouches distributed by MD Dental meet steam and EO indicator requirements.',
      'Pair pouch protocols with powder-free nitrile gloves from a verified supplier to reduce cross-contamination during chairside procedures.',
    ],
    specialty: 'Infection Control',
    specialtySlug: 'INFECTION_CONTROL',
    brandSlug: 'profa',
    brand: 'PROFA',
    contentType: 'CLINICAL_GUIDE',
    contentTypeLabel: 'Clinical guide',
    author: 'Dr. Hana Rizk',
    publishedAt: '2026-03-15',
    readingTimeMinutes: 7,
    image: '/articles/infection-control-standards.png',
    imageAlt: 'Sterilization pouches and infection control supplies',
    relatedProductIds: ['profa-sterilization-pouch', 'topglove-exam-gloves'],
    relatedArticleSlugs: ['sterilization-audit-checklist'],
  },
  {
    slug: 'endo-rotary-selection',
    title: 'Selecting Rotary Files for Curved Canals',
    excerpt:
      'Taper, tip size, and alloy choice when shaping challenging endodontic anatomy.',
    body: [
      'Nickel-titanium rotary files from SIN offer color-coded sequences that simplify staff training in busy practices.',
      'For curved canals, prefer conservative taper (.04) and pre-flare with hand files before introducing rotary motion.',
      'Single-use discipline reduces fracture risk — never attempt to sterilize and reuse rotary instruments beyond manufacturer guidance.',
    ],
    specialty: 'Endodontics',
    specialtySlug: 'ENDODONTICS',
    brandSlug: 'sin',
    brand: 'SIN',
    contentType: 'CLINICAL_GUIDE',
    contentTypeLabel: 'Clinical guide',
    author: 'Dr. Youssef Amin',
    publishedAt: '2026-03-10',
    readingTimeMinutes: 8,
    image: '/articles/endo-rotary-selection.png',
    imageAlt: 'Endodontic rotary file sequence',
    relatedProductIds: ['sin-endo-file-set', 'sin-sealer-kit'],
    relatedArticleSlugs: ['obturation-best-practices'],
  },
  {
    slug: 'impression-accuracy-tips',
    title: 'Five Steps to More Accurate VPS Impressions',
    excerpt:
      'Tray selection, material viscosity, and timing for crown and bridge records.',
    body: [
      'VPS impression accuracy starts with tray rigidity — flexible trays distort under pressure and compromise marginal fit.',
      'Centrix addition silicone materials offer predictable working and set times for single-arch and dual-arch techniques.',
      'Document pour time and stone type in your lab prescription to reduce remakes and chair time for adjustments.',
    ],
    specialty: 'Impressions & Lab',
    specialtySlug: 'IMPRESSIONS',
    brandSlug: 'centrix',
    brand: 'Centrix',
    contentType: 'PROTOCOL',
    contentTypeLabel: 'Protocol',
    author: 'Dr. Layla Hassan',
    publishedAt: '2026-03-05',
    readingTimeMinutes: 5,
    image: '/articles/impression-accuracy-tips.png',
    imageAlt: 'Impression material and dental tray',
    relatedProductIds: ['centrix-impression', 'centrix-temp-crown'],
    relatedArticleSlugs: ['provisional-crown-guide'],
  },
  {
    slug: 'composite-shade-protocol',
    title: 'Building a Composite Shade Protocol for Your Team',
    excerpt:
      'Shade guides, ambient lighting, and photography tips for consistent aesthetics.',
    body: [
      'Ambient operatory lighting skews shade perception — standardize LED color temperature across operatories before selecting composite shades.',
      'Keep a photographed shade map for each patient’s approved combination of dentin and enamel layers.',
      'BMS composite kits with 16 VITA shades cover most daily anterior and posterior needs when paired with a documented layering protocol.',
    ],
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    brandSlug: 'bms',
    brand: 'BMS',
    contentType: 'PROTOCOL',
    contentTypeLabel: 'Protocol',
    author: 'Dr. Nadia El-Sayed',
    publishedAt: '2026-02-28',
    readingTimeMinutes: 4,
    image: '/articles/composite-shade-protocol.png',
    imageAlt: 'Composite shade guide and syringes',
    relatedProductIds: ['bms-composite-kit'],
    relatedArticleSlugs: ['ce-certified-composites'],
  },
  {
    slug: 'heydent-zirconia-workflow',
    title: 'Monolithic Zirconia Workflow with Heydent Discs',
    excerpt:
      'Milling, sintering, and finishing for high-strength posterior restorations.',
    body: [
      'Heydent zirconia discs balance translucency and flexural strength for monolithic crowns in high-load areas.',
      'Follow manufacturer sintering cycles precisely — shortcut programs increase fracture risk under functional load.',
      'Stage polish with a multi-step system to control surface gloss without overheating the ceramic surface.',
    ],
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    brandSlug: 'heydent',
    brand: 'Heydent',
    contentType: 'PRODUCT_FOCUS',
    contentTypeLabel: 'Product focus',
    author: 'Dr. Amr Farouk',
    publishedAt: '2026-02-20',
    readingTimeMinutes: 6,
    image: '/articles/heydent-zirconia-workflow.png',
    imageAlt: 'Zirconia milling disc and crown',
    relatedProductIds: ['heydent-zirconia-disc', 'heydent-polish-system'],
    relatedArticleSlugs: ['ce-certified-composites'],
  },
  {
    slug: 'bracket-bonding-checklist',
    title: 'Chairside Bracket Bonding Checklist',
    excerpt:
      'Moisture control, adhesive selection, and light-cure verification for reliable bonds.',
    body: [
      'Isolate thoroughly before etching — salivary contamination is the primary cause of early bracket failure.',
      'Use manufacturer-recommended cure times; under-curing leaves adhesive resin weak at the bracket base interface.',
      'Photograph the first molars and incisors after bonding as a reference for emergency rebond appointments.',
    ],
    specialty: 'Orthodontics',
    specialtySlug: 'ORTHODONTICS',
    brandSlug: 'aditek',
    brand: 'Aditek',
    contentType: 'PROTOCOL',
    contentTypeLabel: 'Protocol',
    author: 'Dr. Karim Mostafa',
    publishedAt: '2026-02-14',
    readingTimeMinutes: 4,
    image: '/articles/bracket-bonding-checklist.png',
    imageAlt: 'Orthodontic bonding procedure',
    relatedProductIds: ['aditek-bracket-system'],
    relatedArticleSlugs: ['orthodontic-multi-clinic'],
  },
  {
    slug: 'sterilization-audit-checklist',
    title: 'Monthly Sterilization Audit Checklist',
    excerpt:
      'Documentation templates for autoclave logs, pouch integrity, and staff training records.',
    body: [
      'Assign one team member to review sterilization logs weekly — gaps in documentation often precede instrument traceability failures.',
      'Verify indicator strips on every pouch batch and archive results for compliance reviews.',
      'Rotate staff through sterilization duty with structured training so knowledge does not depend on a single person.',
    ],
    specialty: 'Infection Control',
    specialtySlug: 'INFECTION_CONTROL',
    brandSlug: 'profa',
    brand: 'PROFA',
    contentType: 'PROTOCOL',
    contentTypeLabel: 'Protocol',
    author: 'Dr. Hana Rizk',
    publishedAt: '2026-02-08',
    readingTimeMinutes: 5,
    image: '/articles/sterilization-audit-checklist.png',
    imageAlt: 'Sterilization area in a dental clinic',
    relatedProductIds: ['profa-sterilization-pouch'],
    relatedArticleSlugs: ['infection-control-standards'],
  },
  {
    slug: 'obturation-best-practices',
    title: 'Bioceramic Obturation Best Practices',
    excerpt:
      'Sealer selection, cone fit, and coronal seal for long-term endodontic success.',
    body: [
      'Bioceramic sealers require dry canal conditions — excessive moisture compromises bond to dentin.',
      'Verify cone fit at working length before dispensing sealer to avoid voids in the apical third.',
      'Place a well-sealed coronal restoration within the same visit when clinically appropriate to reduce bacterial leakage.',
    ],
    specialty: 'Endodontics',
    specialtySlug: 'ENDODONTICS',
    brandSlug: 'sin',
    brand: 'SIN',
    contentType: 'CLINICAL_GUIDE',
    contentTypeLabel: 'Clinical guide',
    author: 'Dr. Youssef Amin',
    publishedAt: '2026-02-01',
    readingTimeMinutes: 6,
    image: '/articles/obturation-best-practices.png',
    imageAlt: 'Endodontic obturation materials',
    relatedProductIds: ['sin-sealer-kit', 'sin-endo-file-set'],
    relatedArticleSlugs: ['endo-rotary-selection'],
  },
  {
    slug: 'provisional-crown-guide',
    title: 'Temporary Crown Materials for Busy Schedules',
    excerpt:
      'Bis-acrylic automix techniques when patients need same-day temporization.',
    body: [
      'Bis-acrylic materials set quickly but require attention to margin adaptation — overfill slightly and trim after initial set.',
      'Centrix temp materials offer shade stability for short-term aesthetics during lab turnaround.',
      'Inform patients about dietary restrictions for the first hour to reduce fracture of provisional restorations.',
    ],
    specialty: 'Restorative',
    specialtySlug: 'RESTORATIVE',
    brandSlug: 'centrix',
    brand: 'Centrix',
    contentType: 'PRODUCT_FOCUS',
    contentTypeLabel: 'Product focus',
    author: 'Dr. Layla Hassan',
    publishedAt: '2026-01-25',
    readingTimeMinutes: 4,
    image: '/articles/provisional-crown-guide.png',
    imageAlt: 'Temporary crown material application',
    relatedProductIds: ['centrix-temp-crown', 'centrix-impression'],
    relatedArticleSlugs: ['impression-accuracy-tips'],
  },
  {
    slug: 'md-dental-nationwide-delivery',
    title: 'How Nationwide Delivery Supports Rural Clinics',
    excerpt:
      'Bosta logistics and field rep coverage — what dentists outside Cairo should expect.',
    body: [
      'MD Dental combines field representatives in key governorates with Bosta e-commerce delivery to all 27 governorates.',
      'Authentic product sourcing matters equally in Alexandria and Upper Egypt — grey-market risk is not limited to capital cities.',
      'Register your clinic to receive SMS and email tracking when shop ordering launches in Release 2.',
    ],
    specialty: 'Preventive',
    specialtySlug: 'PREVENTIVE',
    contentType: 'NEWS',
    contentTypeLabel: 'News',
    author: 'MD Dental Team',
    publishedAt: '2026-01-18',
    readingTimeMinutes: 3,
    image: '/articles/md-dental-nationwide-delivery.png',
    imageAlt: 'MD Dental logistics and distribution',
    relatedProductIds: [],
    relatedArticleSlugs: ['infection-control-standards'],
  },
];

export const ARTICLES: readonly Article[] = articles;

export const ARTICLES_PREVIEW = ARTICLES.slice(0, 3).map((a) => ({
  slug: a.slug,
  title: a.title,
  tag: a.specialty,
  date: formatArticleDate(a.publishedAt),
}));

export function formatArticleDate(publishedAt: string): string {
  const d = new Date(publishedAt);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== undefined);
}

export function getFeaturedArticle(): Article {
  const featured = ARTICLES.find((a) => a.featured);
  return featured ?? ARTICLES[0];
}
