'use client';

import { useEffect, useState } from 'react';

export default function JourneyProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="journey-progress" aria-hidden>
      <div className="journey-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
