'use client';

import Link from 'next/link';
import { useState } from 'react';
import AlertBanner from '@/components/ui/AlertBanner';
import FormField from '@/components/ui/FormField';
import { AUTH_COPY } from '@/content/auth';
import { validateLogin, type LoginFields } from '@/lib/auth-validation';

const EMPTY: LoginFields = { email: '', password: '' };

export default function LoginForm() {
  const [fields, setFields] = useState<LoginFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFields, string>>>({});
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showForgotHint, setShowForgotHint] = useState(false);

  function updateField<K extends keyof LoginFields>(key: K, value: LoginFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (formError) setFormError(null);
  }

  function blurField(key: keyof LoginFields) {
    const next = validateLogin(fields);
    if (next[key]) setErrors((prev) => ({ ...prev, [key]: next[key] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validateLogin(fields);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setFormError(null);

    // Prototype: simulate API — replace with POST /api/v1/auth/login
    await new Promise((r) => setTimeout(r, 900));

    setSubmitting(false);

    if (fields.email.toLowerCase() === 'locked@example.com') {
      setFormError(AUTH_COPY.login.rateLimit);
      return;
    }

    if (fields.password === 'wrongpass') {
      setFormError(AUTH_COPY.login.invalid);
      return;
    }

    // Success stub — future: redirect to /account or shop handoff
    window.location.href = '/products';
  }

  return (
    <form className="md-form auth-form" onSubmit={handleSubmit} noValidate>
      {formError ? (
        <AlertBanner variant="error">{formError}</AlertBanner>
      ) : null}

      {showForgotHint ? (
        <AlertBanner variant="info">{AUTH_COPY.login.forgotHint}</AlertBanner>
      ) : null}

      <FormField
        id="login-email"
        label="Email"
        type="email"
        value={fields.email}
        onChange={(v) => updateField('email', v)}
        onBlur={() => blurField('email')}
        error={errors.email}
        required
        autoComplete="email"
        placeholder="you@clinic.com"
      />

      <FormField
        id="login-password"
        label="Password"
        type="password"
        value={fields.password}
        onChange={(v) => updateField('password', v)}
        onBlur={() => blurField('password')}
        error={errors.password}
        required
        autoComplete="current-password"
      />

      <div className="auth-form-row">
        <label className="md-checkbox">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span>Remember me</span>
        </label>
        <button
          type="button"
          className="auth-link-btn"
          onClick={() => setShowForgotHint(true)}
        >
          {AUTH_COPY.login.forgot}
        </button>
      </div>

      <button
        type="submit"
        className="md-btn md-btn-primary md-btn-full auth-submit"
        disabled={submitting}
      >
        {submitting ? 'Signing in…' : AUTH_COPY.login.submit}
      </button>

      <p className="auth-switch">
        {AUTH_COPY.register.switch}{' '}
        <Link href="/register">{AUTH_COPY.login.switch}</Link>
      </p>
    </form>
  );
}
