'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { JourneySectionMeta } from '@/content/journey';
import JourneySection from '@/components/journey/JourneySection';
import PathValueCards from '@/components/journey/PathValueCards';
import PathAcademicProof from '@/components/journey/PathAcademicProof';
import Arrow from '@/components/journey/Arrow';
import {
  PATH_CTAS,
  PATH_INTRO,
  PATH_VALUE_CARDS,
} from '@/content/pathCards';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type PromiseShowcaseProps = {
  meta: JourneySectionMeta;
};

/**
 * Choose Your Path — value pillars, academic proof, and dual CTAs (Figma).
 * Every value card is one click to the right destination.
 */
export default function PromiseShowcase({ meta }: PromiseShowcaseProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.getElementById(meta.id);
    if (!root) return;

    const setEnter = (v: number) => root.style.setProperty('--promise-enter', String(v));

    if (reduced) {
      setEnter(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const startTop = vh * 1.0;
      const endTop = vh * 0.55;
      const p = clamp((startTop - rect.top) / Math.max(startTop - endTop, 1), 0, 1);
      setEnter(p);
    };

    update();
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.style.removeProperty('--promise-enter');
    };
  }, [meta.id, reduced]);

  return (
    <JourneySection meta={meta} className="sec sec-promise" hideChapter hideBridge>
      <header className="path-hero reveal">
        <h2 id={`${meta.id}-title`} className="path-hero-title">
          <span>{PATH_INTRO.headingLead}</span>
          <span className="path-hero-accent">{PATH_INTRO.headingAccent}</span>
        </h2>
        <p className="path-hero-lead">{PATH_INTRO.lead}</p>
      </header>

      <PathValueCards cards={PATH_VALUE_CARDS} />

      <PathAcademicProof />

      <div className="path-cta-band reveal">
        <Link href={PATH_CTAS.partner.href} className="md-btn md-btn-primary path-cta-primary">
          {PATH_CTAS.partner.label}
        </Link>
        <Link href={PATH_CTAS.products.href} className="md-btn md-btn-ghost path-cta-secondary">
          {PATH_CTAS.products.label} <Arrow />
        </Link>
      </div>
    </JourneySection>
  );
}
