'use client';

import { useCallback, useEffect, useState } from 'react';
import type { JourneySectionMeta } from '@/content/journey';
import SecHead from '@/components/SecHead';
import JourneySection from '@/components/journey/JourneySection';
import PartnersGlobeBackdrop from '@/components/journey/PartnersGlobeBackdrop';
import PartnerGallery from '@/components/journey/PartnerGallery';
import { PARTNER_STOPS } from '@/content/partnerStops';

const ADVANCE_MS = 5200;

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

  const select = useCallback((index: number) => setActive(index), []);

  useEffect(() => {
    if (reduced || interacting || !visible) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % PARTNER_STOPS.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reduced, interacting, visible, active]);

  return (
    <JourneySection
      meta={meta}
      className="sec sec-partners"
      hideChapter
      backdrop={<PartnersGlobeBackdrop activeIndex={active} />}
    >
      <SecHead
        h2="Eight world-class brands, one trusted distributor"
        p="Manufacturer VPs and clinicians see the same proof — exclusive partnerships with Aditek, BMS, Heydent, SIN, Centrix, PROFA, TopGlove, and WBT."
      />
      <PartnerGallery
        stops={PARTNER_STOPS}
        active={active}
        onSelect={select}
        onInteractChange={setInteracting}
      />
    </JourneySection>
  );
}
