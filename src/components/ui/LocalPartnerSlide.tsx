import type { LocalPartner } from '@/content/partners';
import { partnerMonogram } from '@/content/partners';

type LocalPartnerSlideProps = {
  partner: LocalPartner;
  index: number;
};

function AcademyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

export default function LocalPartnerSlide({ partner, index }: LocalPartnerSlideProps) {
  return (
    <article
      className="partner-slider-slide partner-local-slide"
      style={{ ['--local-i' as string]: index }}
    >
      <div className="partner-local-slide-inner">
        <span
          className={`partner-local-slide-mark partner-local-slide-mark--${partner.type}`}
          aria-hidden
        >
          {partner.type === 'academy' ? <AcademyIcon /> : partnerMonogram(partner.name)}
        </span>
        <div className="partner-local-slide-body">
          <span className="partner-local-slide-type">
            {partner.type === 'university' ? 'University' : 'Academy'}
          </span>
          <h3 className="partner-local-slide-name">{partner.name}</h3>
          {partner.city ? (
            <p className="partner-local-slide-city">{partner.city}</p>
          ) : null}
          <p className="partner-local-slide-excerpt">{partner.excerpt}</p>
        </div>
      </div>
    </article>
  );
}
