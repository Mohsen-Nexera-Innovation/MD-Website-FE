export const JOURNEY_STEPS = [
  { id: 'authority', label: 'Hero', short: '01' },
  { id: 'story', label: 'Our Story', short: '02' },
  { id: 'partners', label: 'Partners', short: '03' },
  { id: 'reach', label: 'Reach', short: '04' },
  { id: 'products', label: 'Products', short: '05' },
  { id: 'promise', label: 'Promise', short: '06' },
  { id: 'faq', label: 'FAQ', short: '07' },
  { id: 'contact', label: 'Contact', short: '08' },
] as const;

export const MANUFACTURERS = [
  { name: 'Centrix', slug: 'centrix', country: 'USA' },
  { name: 'Heydent', slug: 'heydent', country: 'Germany' },
  { name: 'BMS', slug: 'bms', country: 'Italy' },
  { name: 'WBT', slug: 'wbt', country: 'South Korea' },
  { name: 'Aditek', slug: 'aditek', country: 'Brazil' },
  { name: 'SIN', slug: 'sin', country: 'Brazil' },
  { name: 'PROFA', slug: 'profa', country: 'China' },
  { name: 'TopGlove', slug: 'topglove', country: 'Malaysia' },
] as const;

export const METRICS = [
  { value: 27, suffix: '', label: 'Governorates served' },
  { value: 8, suffix: '', label: 'Global brand partners' },
  { value: 2000, suffix: '+', label: 'Dentists supported' },
  { value: 10, suffix: '', label: 'Field representatives' },
] as const;

export const VALUE_PROPS = [
  { title: '8 Exclusive Global Brands', desc: 'Factory-direct, authentic products from world-class manufacturers.' },
  { title: 'Nationwide Delivery', desc: 'E-commerce to all 27 governorates in 3–5 days via Bosta logistics.' },
  { title: 'Scientific Support', desc: 'Egypt-based clinical team and educational content for your practice.' },
  { title: 'Transparent Specs', desc: 'Published technical specifications — no hidden costs or grey-market risk.' },
] as const;

/** @deprecated import from `@/content/articles` */
export { ARTICLES_PREVIEW } from '@/content/articles';

/** @deprecated import from `@/content/events` */
export { EVENTS_PREVIEW } from '@/content/events';

/** @deprecated import from `@/content/products` — kept for backward compatibility */
export { FEATURED_PRODUCTS } from '@/content/products';

export const HERO = {
  eyebrow: 'MD Dental · Exclusive Distributor',
  headlineLead: 'The Dental Supply',
  headlineSub: 'Strategically growing for you',
  lead:
    'From premium instruments to clinical guides, we equip dental professionals with everything they need to deliver exceptional patient care.',
  stats: [
    { value: '20', label: 'Governorates' },
    { value: '8', label: 'Global Partners' },
    { value: '2019', label: 'Est.' },
    { value: '7', label: 'Specialties' },
  ] as const,
  trust: { count: '2,500+', text: 'clinics across 15 strategic markets' },
  ctaPrimary: { label: 'Explore Products', href: '/products' },
  ctaSecondary: { label: 'Why MD Dental', href: '/why-md-dental' },
};
