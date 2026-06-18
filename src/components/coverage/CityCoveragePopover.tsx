'use client';

import {
  COVERAGE_CITIES,
  HUB_CONTACT,
  ZONE_LABELS,
  type CoverageCity,
} from '@/content/coverageCities';

type CityCoveragePopoverProps = {
  city: CoverageCity;
  onClose: () => void;
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

export default function CityCoveragePopover({ city, onClose }: CityCoveragePopoverProps) {
  const hasRep = city.zone === 'REP_TERRITORY' && city.manager;
  const zoneLabel = ZONE_LABELS[city.zone];

  return (
    <div
      className="coverage-popover coverage-popover--fancy"
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
            <p className="coverage-popover-role">Area manager · {city.manager!.name}</p>
          ) : (
            <p className="coverage-popover-role">Nationwide Bosta delivery</p>
          )}
        </div>
      </div>

      {hasRep ? (
        <div className="coverage-popover-actions">
          <a
            href={`tel:${city.manager!.phone.replace(/\s/g, '')}`}
            className="coverage-popover-btn coverage-popover-btn--call"
          >
            Call {formatPhoneDisplay(city.manager!.phone)}
          </a>
          {city.manager!.email ? (
            <a
              href={`mailto:${city.manager!.email}`}
              className="coverage-popover-btn coverage-popover-btn--email"
            >
              Email manager
            </a>
          ) : null}
        </div>
      ) : (
        <div className="coverage-popover-ecom-wrap">
          <p className="coverage-popover-ecom">
            Order online or contact our Cairo hub for delivery across Egypt.
          </p>
          <a
            href={`tel:${HUB_CONTACT.phone}`}
            className="coverage-popover-btn coverage-popover-btn--call"
          >
            {formatPhoneDisplay(HUB_CONTACT.phone)}
          </a>
        </div>
      )}
    </div>
  );
}
