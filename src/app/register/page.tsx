import InnerPage, { InnerCta } from '@/components/InnerPage';

export default function RegisterPage() {
  return (
    <InnerPage
      eyebrow="Get Started"
      title="Register Your Clinic"
      lead="Final conversion from homepage chapter 08 — shared auth for mddental.com and future shop."
      journeyFrom="action"
    >
      <p>Registration form (AUTH-001) with professional verification — launches Release 1 auth epic.</p>
      <InnerCta href="/products" label="Browse while you wait" />
    </InnerPage>
  );
}
