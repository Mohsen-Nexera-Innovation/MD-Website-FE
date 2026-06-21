'use client';

import { useState, type FormEvent } from 'react';
import { CONTACT_DETAILS } from '@/content/contact';

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateContact(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!message.trim()) {
    errors.message = 'Please enter a message.';
  } else if (message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const supportEmail =
    CONTACT_DETAILS.find((item) => item.id === 'email')?.value ?? 'info@mddental.com';

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateContact(name, email, message);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`MD Dental inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    );
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-form contact-form--success" role="status">
        <p className="contact-form-success-title">Message ready to send</p>
        <p className="contact-form-success-lead">
          Your email app should open with your message addressed to{' '}
          <strong>{supportEmail}</strong>. If it did not open, email us directly.
        </p>
        <a href={`mailto:${supportEmail}`} className="md-btn md-btn-primary contact-submit">
          Email {supportEmail}
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label className={`contact-field${errors.name ? ' contact-field--error' : ''}`}>
        <span>Full Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Dr. Ahmed Hassan"
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name ? <span className="contact-field-error">{errors.name}</span> : null}
      </label>
      <label className={`contact-field${errors.email ? ' contact-field--error' : ''}`}>
        <span>Email Address</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="clinic@example.com"
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email ? <span className="contact-field-error">{errors.email}</span> : null}
      </label>
      <label className={`contact-field${errors.message ? ' contact-field--error' : ''}`}>
        <span>Your Message</span>
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="How can we help your practice?"
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message ? <span className="contact-field-error">{errors.message}</span> : null}
      </label>
      <button type="submit" className="md-btn md-btn-primary contact-submit">
        Send Message
      </button>
    </form>
  );
}
