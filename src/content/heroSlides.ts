/** Legacy Figma hero — three full-bleed slides (Global → National → Trusted). */
export const HERO_SLIDE_MS = 5500;

/** Full-bleed hero background video — YouTube source, played via the IFrame API. */
export const HERO_VIDEO_YT_ID = 'X9J2ea8iNnM';

/**
 * Playback starts (and loops back to) this offset, in seconds, skipping the
 * video's intro so the hero opens on the meaningful footage.
 */
export const HERO_VIDEO_START_SEC = 8;

/**
 * Seconds trimmed from the END of the clip — playback loops back to the start
 * offset this many seconds before the real end (e.g. to skip an outro).
 */
export const HERO_VIDEO_END_TRIM_SEC = 10;

/**
 * Where each stepper beat begins, as a fraction (0–1) of the PLAYABLE window
 * (from HERO_VIDEO_START_SEC to duration − HERO_VIDEO_END_TRIM_SEC). The stepper
 * is driven by the video's playback time, so these markers keep the Global /
 * National / Trusted nodes locked to the footage. Defaults to equal thirds.
 */
export const HERO_VIDEO_SEGMENTS = [0, 1 / 3, 2 / 3] as const;

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
