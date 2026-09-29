import { useEffect, useRef } from 'react';

/**
 * Auto-adds 'visible' class to elements with .reveal / .reveal-l / .reveal-r
 * inside the given root ref when they enter the viewport.
 */
export function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef?.current || document;
    const els = root.querySelectorAll
      ? root.querySelectorAll('.reveal, .reveal-l, .reveal-r')
      : [];

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Standalone hook version — returns a ref to attach to any element */
export function useRevealEl() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
