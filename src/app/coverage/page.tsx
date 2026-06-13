import InnerPage, { InnerCta } from '@/components/InnerPage';

export default function CoveragePage() {
  return (
    <InnerPage
      eyebrow="National Reach"
      title="Egypt Coverage Map"
      lead="Interactive map of rep territories, e-commerce zones, and full coverage — continuing chapter 03 of the homepage journey."
      journeyFrom="reach"
    >
      <p>Full SVG governorate map (BRAND-003) ships in Phase 2. This stub confirms the 1-click path from the homepage teaser.</p>
      <InnerCta href="/products" label="Explore products in your zone" />
    </InnerPage>
  );
}
