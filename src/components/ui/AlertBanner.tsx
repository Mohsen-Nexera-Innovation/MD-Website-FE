type AlertVariant = 'error' | 'success' | 'info';

type AlertBannerProps = {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AlertBanner({ variant, title, children, className = '' }: AlertBannerProps) {
  return (
    <div className={`md-alert md-alert--${variant} ${className}`.trim()} role="alert">
      {title ? <strong className="md-alert-title">{title}</strong> : null}
      <div className="md-alert-body">{children}</div>
    </div>
  );
}
