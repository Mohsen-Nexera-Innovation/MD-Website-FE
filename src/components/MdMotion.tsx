'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
}

function markVisible(el: Element) {
  el.classList.add('is-visible');
}

function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal, .build-group');
    if (!els.length) return;

    if (reduced) {
      els.forEach((el) => markVisible(el));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    );

    els.forEach((el) => {
      if (isInViewport(el)) markVisible(el);
      else io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);
}

function useCountUp() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nums = document.querySelectorAll<HTMLElement>('[data-count]');
    if (!nums.length) return;

    const animate = (el: HTMLElement) => {
      const target = Number(el.dataset.count ?? 0);
      const suffix = el.dataset.suffix ?? '';
      if (reduced) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );

    nums.forEach((n) => {
      if (isInViewport(n)) animate(n);
      else io.observe(n);
    });

    return () => io.disconnect();
  }, [pathname]);
}

function useHeroParallax() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const hero = document.querySelector('.journey-hero');
    const layers = document.querySelectorAll<HTMLElement>('.hero-parallax-layer');
    if (!hero || !layers.length) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      layers.forEach((layer, i) => {
        const drift = (i + 1) * progress * 28;
        layer.style.transform = `translate3d(0, ${drift}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
}

function useMapPulse() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const pins = document.querySelectorAll('.map-pin');
    pins.forEach((pin, i) => {
      (pin as HTMLElement).style.animationDelay = `${i * 0.35}s`;
    });
  }, [pathname]);
}

export default function MdMotion() {
  useReveal();
  useCountUp();
  useHeroParallax();
  useMapPulse();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scrollToTarget = (id: string) => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    };

    if (reduced) {
      document.querySelectorAll<HTMLElement>('.spine button, .story-bridge').forEach((el) => {
        el.addEventListener('click', (e) => {
          const href = el.getAttribute('href') ?? '';
          const id = el.dataset.target?.replace('#', '') ?? href.replace('#', '');
          if (id) {
            e.preventDefault();
            scrollToTarget(id);
          }
        });
      });
      return;
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.querySelectorAll<HTMLElement>('.spine button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sel = btn.dataset.target ?? '';
        const target = sel ? (document.querySelector(sel) as HTMLElement | null) : null;
        if (target) lenis.scrollTo(target, { offset: -88 });
      });
    });

    document.querySelectorAll<HTMLAnchorElement>('a.story-bridge').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href')?.replace('#', '') ?? '';
        const target = document.getElementById(id);
        if (target) lenis.scrollTo(target, { offset: -88 });
      });
    });

    document.querySelectorAll<HTMLAnchorElement>('a.scroll-cue').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href')?.replace('#', '') ?? '';
        const target = document.getElementById(id);
        if (target) lenis.scrollTo(target, { offset: -88 });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
