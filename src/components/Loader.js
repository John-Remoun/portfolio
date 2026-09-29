import { useEffect, useRef, useState } from 'react';
import './Loader.css';

const LINES = [
  '$ initializing server...',
  'const app = express();',
  'await mongoose.connect(MONGO_URI);',
  'app.use(cors({ origin: "*" }));',
  'router.post("/auth", authController);',
  'redis.setex("session:" + id, 3600, token);',
  'const hash = await bcrypt.hash(pwd, 12);',
  'app.listen(PORT, () => log("ready"));',
];

export default function Loader() {
  const cvs = useRef(null);
  const [phase, setPhase] = useState(0); // 0=rain 1=reveal 2=done
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const addLine = () => {
      if (i < LINES.length) { setLines(l => [...l, i]); i++; setTimeout(addLine, 200); }
    };
    addLine();
    const t1 = setTimeout(() => setPhase(1), 3000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, drops;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 14);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    };
    resize();
    window.addEventListener('resize', resize);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ{}[]()/<>=+-*&|%$#@!01'.split('');
    const draw = () => {
      ctx.fillStyle = 'rgba(8,8,8,.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '13px JetBrains Mono, monospace';
      drops.forEach((y, i) => {
        const p = y / (canvas.height / 14);
        ctx.fillStyle = p > .8 ? '#E8C97A' : p > .5 ? '#C9A84C' : 'rgba(201,168,76,.3)';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > .97) drops[i] = 0; else drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className={`loader ${phase === 1 ? 'out' : ''}`}>
      <canvas ref={cvs} className="loader-canvas" />
      <div className="loader-ui">
        <div className="loader-term">
          {lines.map(i => (
            <div key={i} className="loader-line" style={{ animationDelay: `${i * .15}s` }}>
              <span className="loader-ln">{String(i+1).padStart(2,'0')}</span>
              <span className="loader-code">{LINES[i]}</span>
            </div>
          ))}
        </div>
        <div className="loader-brand">
          <div className="loader-name">JOHN REMOUN</div>
          <div className="loader-role">Back-End Developer</div>
          <div className="loader-bar"><div className="loader-fill" /></div>
        </div>
      </div>
    </div>
  );
}
