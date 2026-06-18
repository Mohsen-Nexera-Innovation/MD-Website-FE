import Link from 'next/link';
import { AUTH_BRAND_BULLETS, AUTH_TAGLINE } from '@/content/auth';

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
};

export default function AuthLayout({ eyebrow, title, lead, children }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="wrap auth-layout">
        <nav className="auth-back reveal" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span>{title}</span>
        </nav>

        <div className="auth-layout-inner reveal">
          <aside className="auth-brand-panel" aria-label="MD Dental">
            <div className="auth-brand-ribbon" aria-hidden />
            <p className="auth-brand-eyebrow">MD Dental</p>
            <h2 className="auth-brand-title">{AUTH_TAGLINE}</h2>
            <p className="auth-brand-lead">
              Egypt&apos;s exclusive distributor of global dental brands — authentic products,
              nationwide delivery, and clinical support behind every clinic.
            </p>
            <ul className="auth-brand-list">
              {AUTH_BRAND_BULLETS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <div className="auth-form-panel">
            <header className="auth-form-head">
              <div className="eyebrow">{eyebrow}</div>
              <h1>{title}</h1>
              <p className="lead">{lead}</p>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
