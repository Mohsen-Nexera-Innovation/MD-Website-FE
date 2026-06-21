'use client';

import { useState } from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

export default function FormField({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  disabled,
  placeholder,
  autoComplete,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`md-field${error ? ' md-field--error' : ''}`}>
      <label className="md-field-label" htmlFor={id}>
        {label}
        {required ? <span className="md-field-required" aria-hidden> *</span> : null}
      </label>
      <div className="md-field-control">
        <input
          id={id}
          name={name ?? id}
          type={inputType}
          className="md-field-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        />
        {isPassword ? (
          <button
            type="button"
            className="md-field-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        ) : null}
      </div>
      {hint && !error ? (
        <p id={`${id}-hint`} className="md-field-hint">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="md-field-error" role="status">{error}</p>
      ) : null}
    </div>
  );
}

type FormSelectProps = {
  id: string;
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
};

export function FormSelect({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  disabled,
  placeholder = 'Select…',
  options,
}: FormSelectProps) {
  return (
    <div className={`md-field${error ? ' md-field--error' : ''}`}>
      <label className="md-field-label" htmlFor={id}>
        {label}
        {required ? <span className="md-field-required" aria-hidden> *</span> : null}
      </label>
      <select
        id={id}
        name={name ?? id}
        className="md-field-input md-field-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && !error ? (
        <p id={`${id}-hint`} className="md-field-hint">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="md-field-error" role="status">{error}</p>
      ) : null}
    </div>
  );
}
