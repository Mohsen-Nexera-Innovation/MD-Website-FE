import type { Metadata } from 'next';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/forms/LoginForm';
import { AUTH_COPY } from '@/content/auth';

export const metadata: Metadata = {
  title: 'Login | MD Dental',
  description: 'Sign in to your MD Dental clinic account — saved specs, profile, and future shop access.',
};

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Account"
      title={AUTH_COPY.login.title}
      lead={AUTH_COPY.login.lead}
    >
      <LoginForm />
    </AuthLayout>
  );
}
