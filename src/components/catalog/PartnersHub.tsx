import PartnerSlider from '@/components/catalog/PartnerSlider';
import GlobalPartnerSlide from '@/components/ui/GlobalPartnerSlide';
import LocalPartnerSlide from '@/components/ui/LocalPartnerSlide';
import PartnerBrandLogo from '@/components/ui/PartnerBrandLogo';
import {
  GLOBAL_PARTNERS_SECTION,
  LOCAL_PARTNERS_SECTION,
  LOCAL_PARTNERS,
  PARTNER_BRANDS,
} from '@/content/partners';

export default function PartnersHub() {
  return (
    <div className="partners-hub">
      <section className="partners-hub-section reveal" aria-labelledby="global-partners-title">
        <h2 id="global-partners-title" className="partners-hub-title partners-hub-title--compact">
          {GLOBAL_PARTNERS_SECTION.title}
        </h2>
        <div className="partners-logo-strip reveal" aria-label="Global partner brand logos">
          {PARTNER_BRANDS.map((partner) => (
            <PartnerBrandLogo
              key={partner.slug}
              slug={partner.slug}
              name={partner.name}
              className="partners-logo-strip-item"
            />
          ))}
        </div>
        <PartnerSlider label="Global manufacturer partners">
          {PARTNER_BRANDS.map((partner, index) => (
            <GlobalPartnerSlide key={partner.slug} partner={partner} />
          ))}
        </PartnerSlider>
      </section>

      <section
        className="partners-hub-section partners-hub-section--local reveal"
        aria-labelledby="local-partners-title"
      >
        <h2 id="local-partners-title" className="partners-hub-title partners-hub-title--compact">
          {LOCAL_PARTNERS_SECTION.title}
        </h2>
        <PartnerSlider label="Local academic and professional partners" autoAdvanceMs={5200}>
          {LOCAL_PARTNERS.map((partner, index) => (
            <LocalPartnerSlide key={partner.id} partner={partner} index={index} />
          ))}
        </PartnerSlider>
      </section>
    </div>
  );
}
