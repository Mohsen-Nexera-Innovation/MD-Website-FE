import Link from 'next/link';
import { FLAG_ART } from '@/content/flagArt';
import type { PartnerBrand } from '@/content/partners';
import PartnerBrandLogo from '@/components/ui/PartnerBrandLogo';

type GlobalPartnerSlideProps = {
  partner: PartnerBrand;
};

export default function GlobalPartnerSlide({ partner }: GlobalPartnerSlideProps) {
  const flag = partner.flag ? FLAG_ART[partner.flag] : null;

  return (
    <Link
      href={`/partners/${partner.slug}`}
      className="partner-slider-slide partner-global-slide"
    >
      <div className="partner-global-slide-inner">
        <div className="partner-global-slide-top">
          <PartnerBrandLogo slug={partner.slug} name={partner.name} className="partner-global-slide-logo" />
          {flag ? (
            <span className="partner-global-slide-flag" aria-hidden>{flag}</span>
          ) : null}
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
