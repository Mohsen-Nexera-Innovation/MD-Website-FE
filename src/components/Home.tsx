import Link from 'next/link';
import {
  ARTICLES_PREVIEW,
  EVENTS_PREVIEW,
  FEATURED_PRODUCTS,
  METRICS,
  VALUE_PROPS,
} from '@/content/home';
import { journeyMeta } from '@/content/journey';
import SecHead from '@/components/SecHead';
import Spine from '@/components/Spine';
import JourneySection from '@/components/journey/JourneySection';
import JourneyProgress from '@/components/journey/JourneyProgress';
import HeroAuthority from '@/components/journey/HeroAuthority';
import PartnersShowcase from '@/components/journey/PartnersShowcase';
import Arrow from '@/components/journey/Arrow';

function eventTagClass(type: string) {
  if (type === 'Workshop') return 'tag event-workshop';
  if (type === 'Webinar') return 'tag event-webinar';
  return 'tag event-conference';
}

export default function Home() {
  return (
    <>
      <JourneyProgress />
      <Spine />

      <HeroAuthority />

      {/* 02 Partners */}
      <PartnersShowcase meta={journeyMeta('partners')} />

      {/* 03 Reach */}
      <JourneySection meta={journeyMeta('reach')} className="sec">
        <div className="map-teaser">
          <div className="reveal">
            <SecHead
              eyebrow="National Reach"
              h2="Present across Egypt&apos;s 27 governorates"
              p="Physical sales representatives in key territories plus Bosta e-commerce delivery nationwide — from Cairo to North Sinai."
            />
            <div className="map-legend">
              <span className="legend-item">
                <span className="legend-swatch" style={{ background: 'var(--md-zone-rep)' }} />
                Rep territory
              </span>
              <span className="legend-item">
                <span className="legend-swatch" style={{ background: 'var(--md-zone-ecom)' }} />
                E-commerce only
              </span>
              <span className="legend-item">
                <span className="legend-swatch" style={{ background: 'var(--md-zone-full)' }} />
                Full coverage
              </span>
            </div>
            <Link href="/coverage" className="md-btn md-btn-primary" style={{ marginTop: 24 }}>
              View coverage map <Arrow />
            </Link>
          </div>
          <div className="egypt-map-stage reveal">
            <div className="egypt-silhouette" aria-hidden />
            <span className="map-pin" style={{ top: '18%', left: '52%' }} title="Cairo" />
            <span className="map-pin" style={{ top: '42%', left: '48%' }} title="Minya" />
            <span className="map-pin" style={{ top: '28%', left: '22%' }} title="Alexandria" />
            <span className="map-pin" style={{ top: '65%', left: '58%' }} title="Aswan" />
            <span className="map-pin map-pin--gold" style={{ top: '35%', left: '72%' }} title="Sinai hub" />
          </div>
        </div>
      </JourneySection>

      {/* 04 Promise */}
      <JourneySection meta={journeyMeta('promise')} className="sec sec-alt">
        <SecHead
          eyebrow="Choose Your Path"
          h2="Built for clinicians and global manufacturers"
          p="Two audiences, one platform — each journey leads to the proof they need in one click."
        />
        <div className="dual-grid build-group">
          <Link href="/products" className="path-card path-card--dentist build reveal">
            <span className="path-card-icon" aria-hidden>🦷</span>
            <h3>I&apos;m a Dentist</h3>
            <p>Discover authentic products, clinical articles, and a supplier you can trust across every governorate.</p>
            <span className="more">Explore products — 1 click <Arrow /></span>
          </Link>
          <Link href="/why-md-dental#for-manufacturers" className="path-card path-card--manufacturer build reveal">
            <span className="path-card-icon" aria-hidden>🌍</span>
            <h3>I&apos;m a Manufacturer</h3>
            <p>Evaluate MD Dental&apos;s exclusive distribution model, digital infrastructure, and national market maturity.</p>
            <span className="more">View partnership case — 1 click <Arrow /></span>
          </Link>
        </div>
      </JourneySection>

      {/* 05 Proof */}
      <JourneySection meta={journeyMeta('proof')} className="sec">
        <SecHead eyebrow="By the Numbers" h2="Scale you can verify" p="Metrics that back our national distribution claim." />
        <div className="metrics-grid reveal build-group">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-card build">
              <div className="num" data-count={m.value} data-suffix={m.suffix}>
                0{m.suffix}
              </div>
              <div className="lbl">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="g2 proof-content" style={{ marginTop: 48 }}>
          <div className="reveal">
            <SecHead eyebrow="Latest Articles" h2="Clinical knowledge" />
            <div className="g3 build-group">
              {ARTICLES_PREVIEW.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="content-card content-card--link build">
                  <span className="tag">{a.tag}</span>
                  <h3>{a.title}</h3>
                  <div className="meta">{a.date}</div>
                  <span className="card-cta">Read article <Arrow /></span>
                </Link>
              ))}
            </div>
            <Link href="/articles" className="md-btn md-btn-ghost" style={{ marginTop: 16 }}>
              View all articles
            </Link>
          </div>
          <div className="reveal">
            <SecHead eyebrow="Upcoming Events" h2="Meet the community" />
            <div className="g3 build-group">
              {EVENTS_PREVIEW.map((e) => (
                <Link key={e.id} href={`/events/${e.id}`} className="content-card content-card--link build">
                  <span className={eventTagClass(e.type)}>{e.type}</span>
                  <h3>{e.title}</h3>
                  <div className="meta">
                    {e.date} · {e.location}
                  </div>
                  <span className="card-cta">Event details <Arrow /></span>
                </Link>
              ))}
            </div>
            <Link href="/events" className="md-btn md-btn-ghost" style={{ marginTop: 16 }}>
              View all events
            </Link>
          </div>
        </div>
      </JourneySection>

      {/* 06 Catalog */}
      <JourneySection meta={journeyMeta('catalog')} className="sec sec-alt">
        <SecHead
          eyebrow="Featured Products"
          h2="Authentic specs from our partner brands"
          p="Browse technical specifications with IFU downloads — your path from discovery to order."
        />
        <div className="g3 build-group reveal">
          {FEATURED_PRODUCTS.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="product-card product-card--link build">
              <div className="product-card-visual" aria-hidden />
              <div className="brand">{p.brand}</div>
              <h3>{p.name}</h3>
              <div className="spec">{p.specialty}</div>
              <span className="card-cta">View specs <Arrow /></span>
            </Link>
          ))}
        </div>
        <Link href="/products" className="md-btn md-btn-primary" style={{ marginTop: 28 }}>
          Browse full catalog <Arrow />
        </Link>
      </JourneySection>

      {/* 07 Advantage */}
      <JourneySection meta={journeyMeta('advantage')} className="sec">
        <SecHead
          eyebrow="Why MD Dental"
          h2="The advantage dentists and manufacturers rely on"
          p="Innovation, integrity, transparency, and excellence — backed by exclusive global partnerships."
        />
        <div className="value-grid build-group reveal">
          {VALUE_PROPS.map((v, i) => (
            <div key={v.title} className="value-item build" style={{ ['--i' as string]: i }}>
              <span className="value-item-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/why-md-dental" className="md-btn md-btn-primary" style={{ marginTop: 28 }}>
          Explore our advantage <Arrow />
        </Link>
      </JourneySection>

      {/* 08 Action */}
      <JourneySection meta={journeyMeta('action')} className="cta-band" hideBridge>
        <h2>Ready to order authentic dental products?</h2>
        <p>
          Register your clinic to access specifications, educational content, and nationwide delivery.
          Online shop launching soon.
        </p>
        <div className="cta-band-actions">
          <Link href="/register" className="md-btn md-btn-primary">
            Register your clinic
          </Link>
          <Link href="/products" className="md-btn md-btn-ghost cta-band-secondary">
            Browse products
          </Link>
        </div>
        <p className="journey-click-hint journey-click-hint--light">{journeyMeta('action').maxClicks}</p>
      </JourneySection>
    </>
  );
}
