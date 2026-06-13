/** Legacy Figma hero — three full-bleed slides (Global → National → Trusted). */
export const HERO_SLIDE_MS = 5500;

export const HERO_SLIDES = [
  {
    id: 'global',
    no: '01',
    label: 'Global',
    short: 'Global brands',
    accent: 'gold' as const,
    cap: 'Authentic, CE-certified products from eight exclusive global partners — factory-direct for your clinic.',
    stat: '8',
    statLabel: 'Global partners',
    image: '/hero/hero-global-ai.png',
  },
  {
    id: 'national',
    no: '02',
    label: 'National',
    short: 'Egypt hub',
    accent: 'green' as const,
    cap: 'Field reps and Bosta e-commerce deliver to all 27 governorates in 3–5 days.',
    stat: '27',
    statLabel: 'Governorates',
    image: '/hero/hero-national-ai.png',
    showWaves: true,
  },
  {
    id: 'trusted',
    no: '03',
    label: 'Trusted',
    short: 'Your clinic',
    accent: 'gold' as const,
    cap: '2,000+ Egyptian dental professionals rely on MD for products they can trust.',
    stat: '2K+',
    statLabel: 'Dentists served',
    image: '/hero/hero-trusted-ai.png',
  },
] as const;

export type HeroSlide = (typeof HERO_SLIDES)[number];
