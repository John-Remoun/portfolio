import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    const move = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move, { passive: true });

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.12;
      if (dot.current) dot.current.style.transform = `translate(${mouse.current.x - 4}px,${mouse.current.y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${smooth.current.x - 20}px,${smooth.current.y - 20}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const over = () => { dot.current?.classList.add('h'); ring.current?.classList.add('h'); };
    const out  = () => { dot.current?.classList.remove('h'); ring.current?.classList.remove('h'); };
    const obs = new MutationObserver(() => {
      document.querySelectorAll('a,button,[data-cur]').forEach(el => {
        el.removeEventListener('mouseenter', over);
        el.removeEventListener('mouseleave', out);
        el.addEventListener('mouseenter', over);
        el.addEventListener('mouseleave', out);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('a,button,[data-cur]').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </>
  );
}
