import InnerPage, { InnerCta } from '@/components/InnerPage';

export default function AboutPage() {
  return (
    <InnerPage
      eyebrow="Company Profile"
      title="About MD Dental"
      lead="Founded in 2019, MD Dental is one of Egypt's fastest-growing dental suppliers — exclusive distributor for 8 global brands across 27 governorates."
      journeyFrom="authority"
    >
      <p>
        Our mission is to empower Egyptian and Arab dental professionals with cutting-edge solutions,
        scientific support, and authentic products — strategically growing for you.
      </p>
      <InnerCta href="/coverage" label="See our national coverage" />
    </InnerPage>
  );
}
