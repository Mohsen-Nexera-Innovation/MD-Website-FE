import InnerPage, { InnerCta } from '@/components/InnerPage';

export default function WhyMdDentalPage() {
  return (
    <InnerPage
      eyebrow="Why MD Dental"
      title="The MD Dental Advantage"
      lead="Dual-audience positioning — value for clinicians and proof for global manufacturer partners."
      journeyFrom="advantage"
    >
      <section id="for-manufacturers">
        <h2>For Manufacturers</h2>
        <p>Exclusive distribution, Odoo-backed ops, digital maturity, and nationwide reach across Egypt.</p>
      </section>
      <section style={{ marginTop: 32 }}>
        <h2>For Dentists</h2>
        <p>Authentic CE-certified products, transparent specs, scientific support, and Bosta delivery.</p>
      </section>
      <InnerCta href="/register" label="Register your clinic" />
    </InnerPage>
  );
}
