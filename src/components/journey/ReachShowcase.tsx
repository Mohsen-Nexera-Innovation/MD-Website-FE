'use client';

import { useCallback, useEffect, useState } from 'react';
import type { JourneySectionMeta } from '@/content/journey';
import SecHead from '@/components/SecHead';
import JourneySection from '@/components/journey/JourneySection';
import ReachCoverage from '@/components/journey/ReachCoverage';
import { REACH_ZONES } from '@/content/reachZones';

const ADVANCE_MS = 6000;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type ReachShowcaseProps = {
  meta: JourneySectionMeta;
};

/**
 * Section 03 — National Reach. Same concept as the Partners section: a frosted
 * card slides in from the right (in step with the previous section) carrying a
 * synced visual — here a digital Egypt map — plus an auto-advancing zone rail.
 */
export default function ReachShowcase({ meta }: ReachShowcaseProps) {
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

  // Scroll-linked entrance — identical mechanism + pacing to the Partners card,
  // so the section block slides in from the right as it rises into view.
  useEffect(() => {
    const root = document.getElementById(meta.id);
    if (!root) return;

    const setEnter = (v: number) => root.style.setProperty('--reach-enter', String(v));

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
      root.style.removeProperty('--reach-enter');
    };
  }, [meta.id, reduced]);

  const select = useCallback((index: number) => setActive(index), []);

  useEffect(() => {
    if (reduced || interacting || !visible) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % REACH_ZONES.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reduced, interacting, visible]);

  return (
    <JourneySection meta={meta} className="sec sec-reach" hideChapter hideBridge>
      <SecHead
        className="sec-head--center"
        eyebrow="Our Reach"
        h2="Our Reach"
        p="Present across Egypt's 27 governorates — field representatives in key territories plus Bosta e-commerce nationwide."
      />
      <ReachCoverage
        active={active}
        reduced={reduced}
        onSelect={select}
        onInteractChange={setInteracting}
      />
    </JourneySection>
  );
}
