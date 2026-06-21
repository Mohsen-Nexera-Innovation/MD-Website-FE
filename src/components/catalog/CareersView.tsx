'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import AlertBanner from '@/components/ui/AlertBanner';
import FormField from '@/components/ui/FormField';
import {
  CAREERS_CONTACT,
  CAREERS_METRICS,
  CORE_VALUES,
  OPEN_ROLES,
} from '@/content/careers';
import Arrow from '@/components/journey/Arrow';

export default function CareersView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleInterest, setRoleInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setError(null);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  }

  return (
    <div className="careers-page reveal">
      <section className="careers-metrics">
        {CAREERS_METRICS.map((m) => (
          <div key={m.label} className="careers-metric">
            <span className="careers-metric-value">{m.value}</span>
            <span className="careers-metric-label">{m.label}</span>
          </div>
        ))}
      </section>

      <section className="careers-values">
        <h2>Our values</h2>
        <div className="careers-values-grid">
          {CORE_VALUES.map((v) => (
            <div key={v.title} className="careers-value-card">
              <div className="careers-value-media">
                <Image
                  src={v.image}
                  alt={v.imageAlt}
                  width={400}
                  height={220}
                  className="careers-value-img"
                  sizes="(max-width: 560px) 100vw, 280px"
                />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="careers-roles">
        <h2>Open roles</h2>
        <div className="careers-role-list">
          {OPEN_ROLES.map((role) => (
            <article key={role.id} className="careers-role-card">
              <div className="careers-role-media">
                <Image
                  src={role.image}
                  alt={role.imageAlt}
                  width={120}
                  height={90}
                  className="careers-role-img"
                  sizes="96px"
                />
              </div>
              <div className="careers-role-body">
                <div className="careers-role-head">
                  <h3>{role.title}</h3>
                  <span className="careers-role-type">{role.type}</span>
                </div>
                <p className="careers-role-location">{role.location}</p>
                <p className="careers-role-desc">{role.description}</p>
                <button
                  type="button"
                  className="md-btn md-btn-ghost md-btn-sm"
                  onClick={() => {
                    setRoleInterest(role.title);
                    document.getElementById('careers-apply')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Apply
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="careers-apply" className="careers-apply">
        <h2>Apply or register your interest</h2>
        <p>{CAREERS_CONTACT.hint}</p>

        {submitted ? (
          <AlertBanner variant="success">
            Thank you — we&apos;ll review your application and contact you at {email}.
          </AlertBanner>
        ) : (
          <form className="md-form careers-form" onSubmit={handleSubmit} noValidate>
            {error ? <AlertBanner variant="error">{error}</AlertBanner> : null}
            <FormField
              id="careers-name"
              label="Full name"
              value={name}
              onChange={setName}
              required
            />
            <FormField
              id="careers-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />
            <FormField
              id="careers-role"
              label="Role interest"
              value={roleInterest}
              onChange={setRoleInterest}
              placeholder="e.g. Field Sales Representative"
            />
            <div className="md-field">
              <label className="md-field-label" htmlFor="careers-message">Message</label>
              <textarea
                id="careers-message"
                className="md-field-input careers-textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Brief introduction and CV link"
              />
            </div>
            <p className="careers-email-hint">
              Or email directly:{' '}
              <a href={`mailto:${CAREERS_CONTACT.email}`}>{CAREERS_CONTACT.email}</a>
            </p>
            <button type="submit" className="md-btn md-btn-primary md-btn-full">
              Submit application
            </button>
          </form>
        )}
      </section>

      <section className="catalog-cta-band careers-cta">
        <h2>Questions about careers?</h2>
        <p>We grow strategically for our customers — and for the people who join our team.</p>
        <Link href="/about" className="md-btn md-btn-primary">
          About MD Dental <Arrow />
        </Link>
      </section>
    </div>
  );
}
