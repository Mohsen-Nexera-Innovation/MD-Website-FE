export const JOURNEY_STEPS = [
  { id: 'authority', label: 'Authority', short: '01' },
  { id: 'partners', label: 'Partners', short: '02' },
  { id: 'reach', label: 'Reach', short: '03' },
  { id: 'promise', label: 'Promise', short: '04' },
  { id: 'proof', label: 'Proof', short: '05' },
  { id: 'catalog', label: 'Products', short: '06' },
  { id: 'advantage', label: 'Advantage', short: '07' },
  { id: 'action', label: 'Action', short: '08' },
] as const;

export const MANUFACTURERS = [
  { name: 'Aditek', slug: 'aditek', country: 'Brazil' },
  { name: 'BMS', slug: 'bms', country: 'Germany' },
  { name: 'Heydent', slug: 'heydent', country: 'Germany' },
  { name: 'SIN', slug: 'sin', country: 'Brazil' },
  { name: 'Centrix', slug: 'centrix', country: 'USA' },
  { name: 'PROFA', slug: 'profa', country: 'Germany' },
  { name: 'TopGlove', slug: 'topglove', country: 'Malaysia' },
  { name: 'WBT', slug: 'wbt', country: 'Germany' },
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

export const ARTICLES_PREVIEW = [
  { slug: 'ce-certified-composites', title: 'Choosing CE-Certified Composites in Daily Practice', tag: 'Restorative', date: 'Mar 28, 2026' },
  { slug: 'orthodontic-multi-clinic', title: 'Orthodontic Workflow Tips for Multi-Location Clinics', tag: 'Orthodontics', date: 'Mar 22, 2026' },
  { slug: 'infection-control-standards', title: 'Infection Control Standards Every Clinic Should Meet', tag: 'Preventive', date: 'Mar 15, 2026' },
] as const;

export const EVENTS_PREVIEW = [
  { id: 'clinical-day-cairo', title: 'MD Dental Clinical Day — Cairo', type: 'Workshop', date: 'Apr 12, 2026', location: 'Cairo, Egypt' },
  { id: 'digital-webinar-series', title: 'Digital Dentistry Webinar Series', type: 'Webinar', date: 'Apr 28, 2026', location: 'Online' },
  { id: 'alex-partner-showcase', title: 'Alexandria Partner Showcase', type: 'Conference', date: 'May 10, 2026', location: 'Alexandria, Egypt' },
] as const;

export const FEATURED_PRODUCTS = [
  { id: 'aditek-bracket-system', name: 'Aditek Bracket System', brand: 'Aditek', specialty: 'Orthodontics' },
  { id: 'bms-composite-kit', name: 'BMS Composite Kit', brand: 'BMS', specialty: 'Restorative' },
  { id: 'heydent-zirconia-disc', name: 'Heydent Zirconia Disc', brand: 'Heydent', specialty: 'Restorative' },
  { id: 'sin-endo-file-set', name: 'SIN Endo File Set', brand: 'SIN', specialty: 'Endodontics' },
  { id: 'centrix-impression', name: 'Centrix Impression Material', brand: 'Centrix', specialty: 'Impressions' },
  { id: 'profa-sterilization-pouch', name: 'PROFA Sterilization Pouch', brand: 'PROFA', specialty: 'Infection Control' },
] as const;

export const HERO = {
  eyebrow: 'MD Dental · Exclusive Distributor',
  tagline: 'Strategically Growing for YOU',
  headline: 'Global brands. Egyptian reach. Trusted in your clinic.',
  supplyChain: ['Global brands', 'Egypt hub', 'Your clinic'] as const,
  subheadline:
    'Authentic, CE-certified products from eight exclusive global partners — delivered nationwide with scientific support you can rely on.',
  ctaPrimary: { label: 'Explore Products', href: '/products' },
  ctaSecondary: { label: 'Why MD Dental', href: '/why-md-dental' },
};
