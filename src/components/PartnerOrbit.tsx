'use client';

import Link from 'next/link';
import Image from 'next/image';
import MdLogo from '@/components/MdLogo';
import { MANUFACTURERS } from '@/content/home';
import { getBrandLogo } from '@/content/mdMedia';

/** Global partner orbit — large ring, chips stay horizontal while rotating. */
export default function PartnerOrbit() {
  const count = MANUFACTURERS.length;

  return (
    <div className="partner-orbit-stage reveal">
      <div className="partner-orbit-decor" aria-hidden>
        <div className="partner-orbit-decor-glow partner-orbit-decor-glow--gold" />
        <div className="partner-orbit-decor-glow partner-orbit-decor-glow--blue" />
        <div className="partner-orbit-decor-ring partner-orbit-decor-ring--outer" />
        <div className="partner-orbit-decor-ring partner-orbit-decor-ring--inner" />
      </div>

      <div className="partner-orbit-wrap">
        <div className="partner-orbit-hub" aria-hidden>
          <span className="partner-orbit-hub-ring" />
          <MdLogo variant="light" className="partner-orbit-logo" />
        </div>

        <div className="partner-orbit-spin" aria-label="Partner brands orbit">
          {MANUFACTURERS.map((m, i) => (
            <div
              key={m.slug}
              className="partner-orbit-slot"
              style={{
                ['--angle' as string]: `${(360 / count) * i}deg`,
                ['--i' as string]: i,
              }}
            >
              <Link href={`/partners/${m.slug}`} className="partner-chip">
                {getBrandLogo(m.slug) ? (
                  <Image
                    src={getBrandLogo(m.slug)!}
                    alt={`${m.name} logo`}
                    width={96}
                    height={28}
                    className="partner-chip-logo"
                    sizes="96px"
                  />
                ) : (
                  <span className="partner-chip-name">{m.name}</span>
                )}
                <small>{m.country}</small>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
