/** Story spine metadata — ties UI sections to business outcomes and click budgets. */
export type JourneyNext = { id: string; label: string; hint: string };

export type JourneySectionMeta = {
  id: string;
  step: string;
  label: string;
  storyBeat: string;
  businessValue: string;
  designMechanism: string;
  maxClicks: string;
  audience: 'both' | 'dentist' | 'manufacturer';
  next: JourneyNext;
};

export const JOURNEY_SECTIONS: JourneySectionMeta[] = [
  {
    id: 'authority',
    step: '01',
    label: 'Authority',
    storyBeat: 'Who MD Dental is — Egypt’s exclusive gateway to global dental brands.',
    businessValue: 'Establishes trust in 5 seconds for VPs and clinicians (exclusive distributor, not reseller).',
    designMechanism: 'Full-viewport blue hero, official wordmark, tricolor ribbon, dual CTA, scroll cue.',
    maxClicks: '1 click → Products or Why MD Dental',
    audience: 'both',
    next: { id: 'partners', label: 'Global Partners', hint: 'See the 8 exclusive brands' },
  },
  {
    id: 'partners',
    step: '02',
    label: 'Partners',
    storyBeat: 'Proof of global partnerships — the credibility signal manufacturers evaluate first.',
    businessValue: 'Answers “Who do you represent?” before a VP asks — reduces partnership due-diligence friction.',
    designMechanism: '3D partner orbit (live rotation), hover pause, 1-click to partner showcase pages.',
    maxClicks: '1 click → /partners/[slug]',
    audience: 'both',
    next: { id: 'reach', label: 'National Reach', hint: 'How far delivery and reps extend' },
  },
  {
    id: 'reach',
    step: '03',
    label: 'Reach',
    storyBeat: 'Geographic scale — from Cairo reps to nationwide Bosta e-commerce.',
    businessValue: 'Proves market penetration (27 governorates) for manufacturers; delivery confidence for dentists.',
    designMechanism: 'Animated Egypt silhouette + zone legend + pulsing pins; 1-click to interactive map.',
    maxClicks: '1 click → /coverage',
    audience: 'both',
    next: { id: 'promise', label: 'Your Path', hint: 'Choose clinician or manufacturer journey' },
  },
  {
    id: 'promise',
    step: '04',
    label: 'Promise',
    storyBeat: 'Fork in the story — two audiences, one platform, tailored proof.',
    businessValue: 'Segments B2C discovery vs B2B evaluation without separate websites.',
    designMechanism: 'Split path cards with distinct visual language (light clinician / dark manufacturer).',
    maxClicks: '1 click → Products or Why MD Dental (manufacturers)',
    audience: 'both',
    next: { id: 'proof', label: 'Proof', hint: 'Numbers and fresh content' },
  },
  {
    id: 'proof',
    step: '05',
    label: 'Proof',
    storyBeat: 'Evidence the platform is alive — metrics, articles, events.',
    businessValue: 'Second-visit freshness for VPs; education entry for dentists (content-to-commerce pipeline).',
    designMechanism: 'Count-up metrics on scroll + clickable article/event cards (no dead-end previews).',
    maxClicks: '1 click → article, event, or listing hub',
    audience: 'both',
    next: { id: 'catalog', label: 'Products', hint: 'Featured authentic specs' },
  },
  {
    id: 'catalog',
    step: '06',
    label: 'Products',
    storyBeat: 'From trust to catalog — authentic SKUs with published specifications.',
    businessValue: 'Bridges informative site to future shop; specs transparency vs grey-market competitors.',
    designMechanism: 'Staggered product build-reveal; brand badge + specialty; 1-click to spec detail.',
    maxClicks: '1 click → /products/[id]',
    audience: 'dentist',
    next: { id: 'advantage', label: 'Why MD', hint: 'The full value proposition' },
  },
  {
    id: 'advantage',
    step: '07',
    label: 'Advantage',
    storyBeat: 'Why MD wins — exclusive brands, logistics, science, transparency.',
    businessValue: 'Closes objections before registration; supports manufacturer positioning page.',
    designMechanism: 'Four-pillar value grid with scroll build + single deep-link CTA.',
    maxClicks: '1 click → /why-md-dental',
    audience: 'both',
    next: { id: 'action', label: 'Register', hint: 'Start your clinic account' },
  },
  {
    id: 'action',
    step: '08',
    label: 'Action',
    storyBeat: 'Conversion — register now, shop soon.',
    businessValue: 'Captures verified dentist accounts for R1 auth + R2 commerce handoff.',
    designMechanism: 'Gold-on-blue CTA band; register primary, browse secondary (2-click max to catalog).',
    maxClicks: '1 click → /register',
    audience: 'dentist',
    next: { id: 'authority', label: 'Back to top', hint: 'Restart the journey' },
  },
];

export function journeyMeta(id: string): JourneySectionMeta {
  return JOURNEY_SECTIONS.find((s) => s.id === id) ?? JOURNEY_SECTIONS[0];
}
