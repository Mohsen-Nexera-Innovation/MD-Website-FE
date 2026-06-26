'use client';

import {
  HUB_CONTACT,
  ZONE_LABELS_SHORT,
  type CoverageCity,
} from '@/content/coverageCities';

type CityCoveragePopoverProps = {
  city: CoverageCity;
  onClose: () => void;
  variant?: 'overlay' | 'panel';
};

function formatPhoneDisplay(phone: string) {
  return phone.replace(/(\+20)(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4');
}

function managerInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function CityCoveragePopover({
  city,
  onClose,
  variant = 'overlay',
}: CityCoveragePopoverProps) {
  const hasRep = city.zone === 'REP_TERRITORY' && city.manager;
  const zoneLabel = ZONE_LABELS_SHORT[city.zone];

  return (
    <div
      className={`coverage-popover coverage-popover--fancy coverage-popover--${variant}`}
      role="dialog"
      aria-labelledby={`coverage-popover-${city.id}`}
    >
      <div className="coverage-popover-ribbon" aria-hidden />
      <button type="button" className="coverage-popover-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      <div className="coverage-popover-header">
        {hasRep ? (
          <div className="coverage-popover-avatar" aria-hidden>
            {managerInitials(city.manager!.name)}
          </div>
        ) : (
          <div className="coverage-popover-avatar coverage-popover-avatar--hub" aria-hidden>
            MD
          </div>
        )}
        <div className="coverage-popover-header-text">
          <span className="coverage-popover-zone-badge" data-zone={city.zone}>
            {zoneLabel}
          </span>
          <h4 id={`coverage-popover-${city.id}`} className="coverage-popover-title">
            {city.name}
          </h4>
          {hasRep ? (
            <p className="coverage-popover-role">
              {city.manager!.name}
              {city.manager!.role ? ` · ${city.manager!.role}` : ' · Area manager'}
            </p>
          ) : (
            <p className="coverage-popover-role">Delivered via Bosta nationwide</p>
          )}
        </div>
      </div>

      {hasRep ? (
        <div className="coverage-popover-actions">
          {city.manager!.phone ? (
            <a
              href={`tel:${city.manager!.phone.replace(/\s/g, '')}`}
              className="coverage-popover-btn coverage-popover-btn--call"
            >
              <span className="coverage-popover-btn-label">Call</span>
              <span className="coverage-popover-btn-value">{formatPhoneDisplay(city.manager!.phone)}</span>
            </a>
          ) : null}
          <a
            href={`mailto:${city.manager!.email ?? HUB_CONTACT.email}`}
            className="coverage-popover-btn coverage-popover-btn--email"
          >
            Email {city.manager!.name.replace(/^Dr\.\s|^Eng\.\s|^Mr\.\s/i, '').split(' ')[0]}
          </a>
        </div>
      ) : (
        <div className="coverage-popover-ecom-wrap">
          <p className="coverage-popover-ecom">
            Order online or call our Cairo hub for delivery across Egypt.
          </p>
          <a
            href={`tel:${HUB_CONTACT.phone}`}
            className="coverage-popover-btn coverage-popover-btn--call"
          >
            <span className="coverage-popover-btn-label">Cairo hub</span>
            <span className="coverage-popover-btn-value">
              {HUB_CONTACT.phone ? formatPhoneDisplay(HUB_CONTACT.phone) : HUB_CONTACT.email}
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
