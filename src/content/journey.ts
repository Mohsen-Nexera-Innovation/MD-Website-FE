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
    next: { id: 'promise', label: 'Choose Your Path', hint: 'Fresh grad, upgrade, or new clinic' },
  },
  {
    id: 'promise',
    step: '04',
    label: 'Promise',
    storyBeat: 'Value pillars behind every clinician — education, support, partnership, and latest solutions.',
    businessValue: 'One-click paths to learning, support, catalog, and partnership proof without extra navigation.',
    designMechanism: 'Four linked value cards, academic partner grid, academy strip, dual CTA band.',
    maxClicks: '1 click → articles, products, or Why MD Dental',
    audience: 'dentist',
    next: { id: 'products', label: 'Products', hint: 'Featured authentic specs' },
  },
  {
    id: 'products',
    step: '06',
    label: 'Products',
    storyBeat: 'From trust to catalog — authentic SKUs with published specifications.',
    businessValue: 'Bridges informative site to future shop; specs transparency vs grey-market competitors.',
    designMechanism: 'Staggered product build-reveal; brand badge + specialty; 1-click to spec detail.',
    maxClicks: '1 click → /products/[id]',
    audience: 'dentist',
    next: { id: 'faq', label: 'FAQ', hint: 'Common questions answered' },
  },
  {
    id: 'faq',
    step: '08',
    label: 'FAQ',
    storyBeat: 'Answers before registration — delivery, authenticity, and support.',
    businessValue: 'Reduces support load and registration friction for new clinics.',
    designMechanism: 'Accordion FAQ on light canvas; links to coverage and products.',
    maxClicks: '1 click → /coverage or /products',
    audience: 'both',
    next: { id: 'contact', label: 'Contact', hint: 'Get in touch' },
  },
  {
    id: 'contact',
    step: '09',
    label: 'Contact',
    storyBeat: 'Conversion — register now, shop soon.',
    businessValue: 'Captures verified dentist accounts for R1 auth + R2 commerce handoff.',
    designMechanism: 'Gold-on-blue CTA band; register primary, contact form.',
    maxClicks: '1 click → /register',
    audience: 'dentist',
    next: { id: 'authority', label: 'Back to top', hint: 'Restart the journey' },
  },
];

export function journeyMeta(id: string): JourneySectionMeta {
  return JOURNEY_SECTIONS.find((s) => s.id === id) ?? JOURNEY_SECTIONS[0];
}
