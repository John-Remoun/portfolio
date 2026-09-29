import { useRef, useState, useEffect } from 'react';
import { useReveal } from './useReveal';
import './Skills.css';

const BARS = [
  { name: 'Node.js / Express.js / TypeScript', pct: 95, cat: 'Backend & Runtimes' },
  { name: 'RESTful & GraphQL APIs',            pct: 92, cat: 'API Architecture' },
  { name: 'MongoDB & Aggregations',            pct: 90, cat: 'Databases & Schemas' },
  { name: 'Redis & Caching Strategies',        pct: 88, cat: 'Caching & Rate Limiting' },
  { name: 'OAuth2, JWT & System Security',      pct: 92, cat: 'Security & Auth' },
  { name: 'Socket.IO / Real-Time Engines',      pct: 86, cat: 'Real-Time Systems' },
  { name: 'Data Structures & Algorithms',      pct: 90, cat: 'Computer Science Core' },
  { name: 'Docker, Git & Linux Tooling',        pct: 82, cat: 'DevOps & Tooling' },
];

const TECH_ROW1 = [
  { l: 'Node.js',       i: '⬡' }, { l: 'Express.js',   i: '⚡' },
  { l: 'TypeScript',    i: '📘' }, { l: 'JavaScript',   i: '🟨' },
  { l: 'REST APIs',     i: '🌐' }, { l: 'GraphQL',      i: '◈'  },
  { l: 'MongoDB',       i: '🍃' }, { l: 'Redis',        i: '🔴' },
];

const TECH_ROW2 = [
  { l: 'Socket.IO',     i: '🔌' }, { l: 'Security/Auth', i: '🔐' },
  { l: 'Zod & Multer',  i: '🛡'  }, { l: 'Docker',       i: '🐳' },
  { l: 'Stripe',        i: '💳' }, { l: 'Git / Linux',   i: '🐧' },
  { l: 'C++',           i: '⚡' }, { l: 'Python',       i: '🐍' },
];

export default function Skills() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);
  useReveal(ref, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-num">03.</span>
          <h2 className="sec-title">Technical Skills</h2>
          <div className="sec-line" />
        </div>

        {/* 1. TOP SECTION: ENGINEERING COMPETENCIES (DIVIDED EQUALLY IN 2 COLUMNS) */}
        <div className="competencies-block reveal">
          <h3 className="skills-sub">Engineering Competencies</h3>
          <div className="bars-grid">
            {BARS.map((s, i) => (
              <div key={s.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
                <div className="skill-track">
                  <div
                    className="skill-fill"
                    style={{
                      width: animated ? `${s.pct}%` : '0%',
                      transitionDelay: `${i * 0.07}s`,
                    }}
                  />
                </div>
                <span className="skill-cat">{s.cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MIDDLE SECTION: SKILLS MANIFEST JSON (FULL WIDTH UNDER COMPETENCIES) */}
        <div className="skills-code-block reveal">
          <div className="skills-code">
            <div className="sc-head">
              <span className="sc-lang">json</span>
              <span className="sc-file">skills-manifest.json</span>
            </div>
            <pre className="sc-body">{`{
  "backend":    ["Node.js", "Express.js", "TypeScript", "RESTful APIs", "GraphQL", "Socket.IO", "Zod", "Multer"],
  "databases":  ["MongoDB (Mongoose, Aggregations, Indexing)", "Redis (Caching, Rate Limiting)", "SQL"],
  "security":   ["JWT (Revocation)", "Google OAuth2", "RBAC", "AES-256-CBC", "Bcrypt", "Argon2", "OTP"],
  "devops":     ["Git", "GitHub", "Docker", "Postman", "Stripe Webhooks", "Vercel", "Netlify", "Linux"],
  "cs_core":    ["Data Structures", "Algorithms", "OOP", "C++", "Python", "Problem Solving"]
}`}</pre>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: TECHNICAL STACK (COUNTER-MOVING INFINITE MARQUEE CARDS) */}
        <div className="tech-stack-block reveal">
          <h3 className="skills-sub">Technical Stack</h3>
          <div className="tech-marquee-container">
            {/* ROW 1: MOVES RIGHT */}
            <div className="tech-marquee-wrapper">
              <div className="tech-marquee-track track-right">
                {[...TECH_ROW1, ...TECH_ROW1, ...TECH_ROW1].map((t, i) => (
                  <div key={`${t.l}-r1-${i}`} className="tech-card">
                    <span className="tech-icon">{t.i}</span>
                    <span className="tech-lbl">{t.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: MOVES LEFT */}
            <div className="tech-marquee-wrapper">
              <div className="tech-marquee-track track-left">
                {[...TECH_ROW2, ...TECH_ROW2, ...TECH_ROW2].map((t, i) => (
                  <div key={`${t.l}-r2-${i}`} className="tech-card">
                    <span className="tech-icon">{t.i}</span>
                    <span className="tech-lbl">{t.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
