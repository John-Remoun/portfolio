import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      const totalScroll = d.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const pct = (window.scrollY / totalScroll) * 100;
      if (ref.current) ref.current.style.width = `${Math.min(pct, 100)}%`;
    };

    window.addEventListener('scroll', fn, { passive: true });
    fn(); // Initial trigger

    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="sp-track">
      <div ref={ref} className="sp-bar" />
    </div>
  );
}