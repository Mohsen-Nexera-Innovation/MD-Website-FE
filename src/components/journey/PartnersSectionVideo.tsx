'use client';

import { useEffect, useState } from 'react';
import SectionAmbientVideo from '@/components/journey/SectionAmbientVideo';

/** Partners section — same distribution cinema as hero story (global partner narrative). */
export default function PartnersSectionVideo() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <SectionAmbientVideo
        reduced={reduced}
        sectionId="partners"
        blockClass="sec-partners-video"
        animateEnter={false}
      />
      <div className="sec-partners-veil" aria-hidden />
      <div className="sec-partners-mesh" aria-hidden />
    </>
  );
}
