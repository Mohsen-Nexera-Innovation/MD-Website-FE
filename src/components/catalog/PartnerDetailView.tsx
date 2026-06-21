import Link from 'next/link';
import Image from 'next/image';
import type { PartnerBrand } from '@/content/partners';
import { CATALOG_PRODUCTS } from '@/content/products';
import ProductCard from '@/components/ui/ProductCard';
import Arrow from '@/components/journey/Arrow';

type PartnerDetailViewProps = {
  partner: PartnerBrand;
};

export default function PartnerDetailView({ partner }: PartnerDetailViewProps) {
  const products = CATALOG_PRODUCTS.filter((p) => p.brandSlug === partner.slug);

  return (
    <div className="partner-detail reveal">
      <nav className="inner-breadcrumb partner-detail-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/partners">Partners</Link>
        <span aria-hidden>/</span>
        <span>{partner.name}</span>
      </nav>

      <div className="partner-detail-hero">
        <div className="partner-detail-media">
          <Image
            src={partner.image}
            alt={partner.imageAlt}
            width={720}
            height={480}
            className="partner-detail-img"
            priority
            sizes="(max-width: 900px) 100vw, 520px"
          />
        </div>
        <div className="partner-detail-intro">
          <span className="partner-detail-region">{partner.region} · {partner.country}</span>
          <h1>{partner.name}</h1>
          <p className="partner-detail-excerpt">{partner.excerpt}</p>
          <div className="partner-detail-tags">
            {partner.specialties.map((s) => (
              <span key={s} className="catalog-product-badge">{s}</span>
            ))}
          </div>
          <p className="partner-detail-count">{partner.productCount} in MD Dental catalog</p>
          <div className="product-cert-badges">
            {partner.certifications.map((c) => (
              <span key={c} className="product-cert-badge">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="partner-detail-story">
        <h2>Distribution in Egypt</h2>
        {partner.story.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {products.length > 0 ? (
        <section className="partner-detail-products">
          <h2>{partner.name} products</h2>
          <div className="catalog-grid catalog-grid--related">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Link href={`/products?brand=${partner.slug}`} className="md-btn md-btn-ghost" style={{ marginTop: 16 }}>
            Browse all {partner.name} SKUs <Arrow />
          </Link>
        </section>
      ) : null}

      <section className="catalog-cta-band partner-detail-cta">
        <h2>Partner with MD Dental</h2>
        <p>Register your clinic for authentic {partner.name} supply and clinical support.</p>
        <Link href="/register" className="md-btn md-btn-primary">
          Register your clinic <Arrow />
        </Link>
      </section>
    </div>
  );
}
