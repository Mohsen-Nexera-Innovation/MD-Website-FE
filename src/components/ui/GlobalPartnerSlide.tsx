import Link from 'next/link';
import { FLAG_ART } from '@/content/flagArt';
import type { PartnerBrand } from '@/content/partners';

type GlobalPartnerSlideProps = {
  partner: PartnerBrand;
};

function brandMonogram(name: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, '');
  return clean.slice(0, 2).toUpperCase();
}

export default function GlobalPartnerSlide({ partner }: GlobalPartnerSlideProps) {
  const flag = partner.flag ? FLAG_ART[partner.flag] : null;

  return (
    <Link
      href={`/partners/${partner.slug}`}
      className="partner-slider-slide partner-global-slide"
    >
      <div className="partner-global-slide-inner">
        <div className="partner-global-slide-top">
          {flag ? (
            <span className="partner-global-slide-flag" aria-hidden>{flag}</span>
          ) : (
            <span className="partner-global-slide-mark" aria-hidden>
              {brandMonogram(partner.name)}
            </span>
          )}
          <span className="partner-global-slide-region">{partner.region}</span>
        </div>
        <h3 className="partner-global-slide-name">{partner.name}</h3>
        <p className="partner-global-slide-country">{partner.country}</p>
        <p className="partner-global-slide-excerpt">{partner.excerpt}</p>
        <div className="partner-global-slide-meta">
          <span>{partner.productCount}</span>
          <span className="partner-global-slide-go" aria-hidden>View partner →</span>
        </div>
      </div>
    </Link>
  );
}
