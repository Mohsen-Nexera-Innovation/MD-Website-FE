'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import AlertBanner from '@/components/ui/AlertBanner';
import FormField, { FormSelect } from '@/components/ui/FormField';
import {
  AUTH_COPY,
  AUTH_FILE_RULES,
  EGYPT_GOVERNORATES,
  USER_ROLES,
  VERIFICATION_TYPES,
} from '@/content/auth';
import {
  isAllowedVerificationFile,
  validateRegisterAccount,
  validateRegisterClinic,
  validateRegisterVerification,
  type RegisterAccountFields,
  type RegisterClinicFields,
  type RegisterVerificationFields,
} from '@/lib/auth-validation';

const GOVERNORATE_OPTIONS = EGYPT_GOVERNORATES.map((g) => ({ value: g, label: g }));

const INITIAL_ACCOUNT: RegisterAccountFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
};

const INITIAL_CLINIC: RegisterClinicFields = {
  clinicName: '',
  governorate: '',
  city: '',
  phone: '',
};

const INITIAL_VERIFICATION: RegisterVerificationFields = {
  verificationType: '',
  file: null,
};

export default function RegisterForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [account, setAccount] = useState<RegisterAccountFields>(INITIAL_ACCOUNT);
  const [clinic, setClinic] = useState<RegisterClinicFields>(INITIAL_CLINIC);
  const [verification, setVerification] = useState<RegisterVerificationFields>(INITIAL_VERIFICATION);
  const [accountErrors, setAccountErrors] = useState<Partial<Record<keyof RegisterAccountFields, string>>>({});
  const [clinicErrors, setClinicErrors] = useState<Partial<Record<keyof RegisterClinicFields, string>>>({});
  const [verificationErrors, setVerificationErrors] = useState<
    Partial<Record<keyof RegisterVerificationFields, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function goNext() {
    if (step === 0) {
      const next = validateRegisterAccount(account);
      setAccountErrors(next);
      if (Object.keys(next).length > 0) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const next = validateRegisterClinic(clinic);
      setClinicErrors(next);
      if (Object.keys(next).length > 0) return;
      setStep(2);
    }
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function setFile(file: File | null) {
    setVerification((prev) => ({ ...prev, file }));
    if (verificationErrors.file) {
      setVerificationErrors((prev) => ({ ...prev, file: undefined }));
    }
  }

  function handleFilePick(file: File) {
    if (!isAllowedVerificationFile(file)) {
      setVerificationErrors((prev) => ({
        ...prev,
        file: 'Use JPG, PNG, or PDF up to 5 MB.',
      }));
      return;
    }
    setFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validateRegisterVerification(verification);
    setVerificationErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // Prototype: replace with POST /api/v1/auth/register + upload
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="auth-success reveal">
        <div className="auth-success-icon" aria-hidden>✓</div>
        <h2>{AUTH_COPY.register.successTitle}</h2>
        <p>{AUTH_COPY.register.successLead}</p>
        <p className="auth-success-email">
          <strong>{account.email}</strong>
        </p>
        <Link href="/products" className="md-btn md-btn-primary md-btn-full auth-submit">
          {AUTH_COPY.register.browse}
        </Link>
        <p className="auth-switch">
          <Link href="/login">Return to login</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="register-wizard">
      <ol className="auth-steps" aria-label="Registration progress">
        {AUTH_COPY.register.steps.map((label, i) => (
          <li
            key={label}
            className={`auth-step${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
          >
            <span className="auth-step-dot" aria-hidden />
            <span className="auth-step-label">{label}</span>
          </li>
        ))}
      </ol>

      <form className="md-form auth-form" onSubmit={handleSubmit} noValidate>
        {step === 0 ? (
          <>
            <div className="md-form-row md-form-row--2">
              <FormField
                id="reg-first-name"
                label="First name"
                value={account.firstName}
                onChange={(v) => {
                  setAccount((p) => ({ ...p, firstName: v }));
                  if (accountErrors.firstName) setAccountErrors((e) => ({ ...e, firstName: undefined }));
                }}
                error={accountErrors.firstName}
                required
                autoComplete="given-name"
              />
              <FormField
                id="reg-last-name"
                label="Last name"
                value={account.lastName}
                onChange={(v) => {
                  setAccount((p) => ({ ...p, lastName: v }));
                  if (accountErrors.lastName) setAccountErrors((e) => ({ ...e, lastName: undefined }));
                }}
                error={accountErrors.lastName}
                required
                autoComplete="family-name"
              />
            </div>
            <FormField
              id="reg-email"
              label="Email"
              type="email"
              value={account.email}
              onChange={(v) => {
                setAccount((p) => ({ ...p, email: v }));
                if (accountErrors.email) setAccountErrors((e) => ({ ...e, email: undefined }));
              }}
              error={accountErrors.email}
              required
              autoComplete="email"
              placeholder="you@clinic.com"
            />
            <FormField
              id="reg-password"
              label="Password"
              type="password"
              value={account.password}
              onChange={(v) => {
                setAccount((p) => ({ ...p, password: v }));
                if (accountErrors.password) setAccountErrors((e) => ({ ...e, password: undefined }));
              }}
              error={accountErrors.password}
              hint="At least 8 characters"
              required
              autoComplete="new-password"
            />
            <FormSelect
              id="reg-role"
              label="Your role"
              value={account.role}
              onChange={(v) => {
                setAccount((p) => ({ ...p, role: v }));
                if (accountErrors.role) setAccountErrors((e) => ({ ...e, role: undefined }));
              }}
              error={accountErrors.role}
              options={USER_ROLES}
              required
            />
            <button type="button" className="md-btn md-btn-primary md-btn-full auth-submit" onClick={goNext}>
              {AUTH_COPY.register.continue}
            </button>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <FormField
              id="reg-clinic"
              label="Clinic name"
              value={clinic.clinicName}
              onChange={(v) => {
                setClinic((p) => ({ ...p, clinicName: v }));
                if (clinicErrors.clinicName) setClinicErrors((e) => ({ ...e, clinicName: undefined }));
              }}
              error={clinicErrors.clinicName}
              required
              autoComplete="organization"
            />
            <FormSelect
              id="reg-governorate"
              label="Governorate"
              value={clinic.governorate}
              onChange={(v) => {
                setClinic((p) => ({ ...p, governorate: v }));
                if (clinicErrors.governorate) setClinicErrors((e) => ({ ...e, governorate: undefined }));
              }}
              error={clinicErrors.governorate}
              options={GOVERNORATE_OPTIONS}
              required
            />
            <FormField
              id="reg-city"
              label="City"
              value={clinic.city}
              onChange={(v) => {
                setClinic((p) => ({ ...p, city: v }));
                if (clinicErrors.city) setClinicErrors((e) => ({ ...e, city: undefined }));
              }}
              error={clinicErrors.city}
              required
            />
            <FormField
              id="reg-phone"
              label="Phone"
              type="tel"
              value={clinic.phone}
              onChange={(v) => {
                setClinic((p) => ({ ...p, phone: v }));
                if (clinicErrors.phone) setClinicErrors((e) => ({ ...e, phone: undefined }));
              }}
              error={clinicErrors.phone}
              hint="e.g. 01xxxxxxxxx"
              required
              autoComplete="tel"
            />
            <div className="auth-form-actions">
              <button type="button" className="md-btn md-btn-ghost" onClick={goBack}>
                Back
              </button>
              <button type="button" className="md-btn md-btn-primary auth-submit-inline" onClick={goNext}>
                {AUTH_COPY.register.continue}
              </button>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <FormSelect
              id="reg-verification-type"
              label="Document type"
              value={verification.verificationType}
              onChange={(v) => {
                setVerification((p) => ({ ...p, verificationType: v }));
                if (verificationErrors.verificationType) {
                  setVerificationErrors((e) => ({ ...e, verificationType: undefined }));
                }
              }}
              error={verificationErrors.verificationType}
              options={VERIFICATION_TYPES}
              required
            />

            <div className={`md-field${verificationErrors.file ? ' md-field--error' : ''}`}>
              <span className="md-field-label">
                Professional document
                <span className="md-field-required" aria-hidden> *</span>
              </span>
              <div
                className={`auth-upload${dragOver ? ' is-dragover' : ''}${verification.file ? ' has-file' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFilePick(file);
                }}
              >
                {verification.file ? (
                  <div className="auth-upload-file">
                    <span className="auth-upload-name">{verification.file.name}</span>
                    <button type="button" className="auth-link-btn" onClick={() => setFile(null)}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="auth-upload-lead">Drag and drop your file here</p>
                    <p className="auth-upload-hint">JPG, PNG, or PDF — max 5 MB</p>
                    <button
                      type="button"
                      className="md-btn md-btn-ghost md-btn-sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose file
                    </button>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept={AUTH_FILE_RULES.accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFilePick(file);
                    e.target.value = '';
                  }}
                />
              </div>
              {verificationErrors.file ? (
                <p className="md-field-error" role="status">{verificationErrors.file}</p>
              ) : null}
            </div>

            <AlertBanner variant="info">{AUTH_COPY.register.pdplNotice}</AlertBanner>

            <div className="auth-form-actions">
              <button type="button" className="md-btn md-btn-ghost" onClick={goBack}>
                Back
              </button>
              <button
                type="submit"
                className="md-btn md-btn-primary auth-submit-inline"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : AUTH_COPY.register.submit}
              </button>
            </div>
          </>
        ) : null}

        <p className="auth-switch">
          {AUTH_COPY.register.switch}{' '}
          <Link href="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
