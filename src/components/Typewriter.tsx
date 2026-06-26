'use client';

import { useEffect, useRef, useState } from 'react';

type TypewriterProps = {
  phrases: string[];
  className?: string;
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
  loop?: boolean;
};

/**
 * Lightweight typewriter used by the hero headline. Types each phrase out,
 * holds, deletes, and moves on. Reduced-motion users see the first phrase in
 * full with no animation. A blinking caret is rendered alongside.
 */
export default function Typewriter({
  phrases,
  className,
  typingMs = 70,
  deletingMs = 38,
  holdMs = 1700,
  loop = true,
}: TypewriterProps) {
  const [text, setText] = useState('');
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(phrases[0] ?? '');
      return;
    }

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const current = phrases[phraseIdx] ?? '';

      if (!deleting) {
        charIdx += 1;
        setText(current.slice(0, charIdx));
        if (charIdx >= current.length) {
          const isLast = phraseIdx === phrases.length - 1;
          if (isLast && !loop) return;
          deleting = true;
          timer.current = setTimeout(tick, holdMs);
          return;
        }
        timer.current = setTimeout(tick, typingMs);
      } else {
        charIdx -= 1;
        setText(current.slice(0, Math.max(charIdx, 0)));
        if (charIdx <= 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timer.current = setTimeout(tick, typingMs * 3);
          return;
        }
        timer.current = setTimeout(tick, deletingMs);
      }
    };

    timer.current = setTimeout(tick, typingMs * 4);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phrases, typingMs, deletingMs, holdMs, loop, reduced]);

  return (
    <span className={className}>
      {text}
      {text.length > 0 ? (
        <span className={`typewriter-caret${reduced ? ' is-static' : ''}`} aria-hidden />
      ) : null}
    </span>
  );
}
