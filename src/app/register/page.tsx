import type { Metadata } from 'next';
import AuthLayout from '@/components/layout/AuthLayout';
import RegisterForm from '@/components/forms/RegisterForm';
import { AUTH_COPY } from '@/content/auth';

export const metadata: Metadata = {
  title: 'Register | MD Dental',
  description:
    'Register your clinic with MD Dental — professional verification, nationwide distribution, and authentic global brands.',
};

export default function RegisterPage() {
  return (
    <div className="inner-page inner-page--promise inner-page--auth">
      <AuthLayout
        eyebrow="Get started"
        title={AUTH_COPY.register.title}
        lead={AUTH_COPY.register.lead}
      >
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}
