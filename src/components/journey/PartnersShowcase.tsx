'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import type { JourneySectionMeta } from '@/content/journey';
import SecHead from '@/components/SecHead';
import JourneySection from '@/components/journey/JourneySection';
import PartnerGallery from '@/components/journey/PartnerGallery';
import Arrow from '@/components/journey/Arrow';
import { PARTNER_STOPS } from '@/content/partnerStops';

const ADVANCE_MS = 6000;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type PartnersShowcaseProps = {
  meta: JourneySectionMeta;
};

/**
 * Section 02 — Partners. Owns a single active-country index shared by the
 * background Earth and the foreground gallery so they move in lockstep.
 */
export default function PartnersShowcase({ meta }: PartnersShowcaseProps) {
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(true);
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
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [meta.id]);

  // Scroll-linked entrance: the gallery card slides in from the right as the
  // section rises into view. It begins the instant the section's top crosses
  // the viewport bottom — which is the same scroll window in which the hero
  // card is still sliding off to the left — so the two cards move together.
  useEffect(() => {
    const root = document.getElementById(meta.id);
    if (!root) return;

    const setEnter = (v: number) => root.style.setProperty('--partner-enter', String(v));

    if (reduced) {
      setEnter(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Driven off the section top so the heading and the gallery card move as
      // one block. The window is tuned so the slide BEGINS almost the instant
      // you start scrolling (section top ~1.15 vh below the fold ≈ scrollY 0)
      // and travels a span close to the hero card's leftward exit — the two
      // cards start together and finish together, mirroring each other.
      const startTop = vh * 1.0;
      const endTop = vh * 0.55;
      // Linear (constant-rate) like the hero card's exit, so the two panels read
      // as one continuous, evenly-paced motion rather than two different eases.
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
      root.style.removeProperty('--partner-enter');
    };
  }, [meta.id, reduced]);

  const select = useCallback((index: number) => setActive(index), []);

  // One stable interval — `active` is intentionally NOT a dependency so the
  // timer isn't torn down/recreated on every advance (which stacked timers and
  // sped the cadence up). The functional update keeps it current.
  useEffect(() => {
    if (reduced || interacting || !visible) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % PARTNER_STOPS.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reduced, interacting, visible]);

  return (
    <JourneySection
      meta={meta}
      className="sec sec-partners"
      hideChapter
      hideBridge
    >
      <SecHead
        className="sec-head--center"
        eyebrow="Global Partners"
        h2="Global Partners"
        p="Eight exclusive factory-direct partnerships across Brazil, Germany, Italy, the USA, Malaysia, China, and South Korea."
      />
      <PartnerGallery
        stops={PARTNER_STOPS}
        active={active}
        onSelect={select}
        onInteractChange={setInteracting}
      />
      <div className="partners-home-cta reveal">
        <h3>Browse the full catalog</h3>
        <p>Every partner brand — published specs and IFU downloads.</p>
        <Link href="/products" className="md-btn md-btn-primary">
          View products <Arrow />
        </Link>
      </div>
    </JourneySection>
  );
}
