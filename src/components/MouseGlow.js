import { useEffect, useRef } from 'react';
import './MouseGlow.css';

export default function MouseGlow() {
  const ref = useRef(null);
  const target = useRef({ x: -500, y: -500 });
  const cur = useRef({ x: -500, y: -500 });
  const raf = useRef(null);

  useEffect(() => {
    const move = e => { target.current = { x: e.clientX, y: e.clientY }; };
    const touch = e => { target.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('touchmove', touch, { passive: true });

    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.06;
      cur.current.y += (target.current.y - cur.current.y) * 0.06;
      if (ref.current)
        ref.current.style.transform = `translate(${cur.current.x - 280}px,${cur.current.y - 280}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', touch);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={ref} className="mglow" />;
}
