import { useRef } from 'react';
import { useReveal } from './useReveal';
import './About.css';

const TIMELINE = [
  { 
    year: '2023 — 2027', 
    role: 'B.Sc. in Computer Science', 
    place: 'Modern Academy for Engineering & Technology', 
    desc: 'Core CS foundation: Data Structures, Algorithms, OOP, Database Systems, Computer Networks, and Operating Systems.' 
  },
  { 
    year: 'Jun 2026', 
    role: 'Backend Development (Node.js) Diploma', 
    place: 'Route Academy (Top Achiever 🏆)', 
    desc: 'Scalable REST/GraphQL service architecture, Redis caching, schema design, and enterprise system security.' 
  },
  { 
    year: 'Jun 2026', 
    role: 'The Complete Node.js Course (RESTful APIs)', 
    place: 'Mahara-Tech — ITI Certified', 
    desc: 'Production-ready RESTful web services, Express.js backend routing, and MongoDB aggregations.' 
  },
  { 
    year: 'Aug 2026', 
    role: 'Back-End Web Development Using Node.js', 
    place: 'OrbScope Academy', 
    desc: 'Server-side web architecture, asynchronous workflows, and high-performance Node.js patterns.' 
  }
];

const FACTS = [
  ['Location', 'Cairo, Egypt'],
  ['Phone / WhatsApp', '+20 120 429 2945'],
  ['Email Address', 'johnremoun789@gmail.com'],
  ['Primary Focus', 'Backend Engineering & Distributed Systems'],
  ['Backend & Runtimes', 'Node.js, Express.js, TypeScript, RESTful & GraphQL APIs'],
  ['Databases & Caching', 'MongoDB (Aggregations, Indexing), Redis, SQL'],
  ['Security & Auth', 'JWT (Revocation), Google OAuth2, RBAC, AES-256-CBC, Argon2'],
  ['Real-Time & DevOps', 'Socket.IO, Docker, Stripe Webhooks, Git, Linux'],
  ['Languages', 'JavaScript (ES6+), TypeScript, C++, Python, Java'],
  ['Honors & Recognition', 'Top Achiever — Route Academy Backend Diploma'],
  ['Status', 'Seeking Junior Backend Engineer Roles']
];

export default function About() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        
        {/* SECTION TITLE */}
        <div className="sec-head reveal">
          <span className="sec-num">01.</span>
          <h2 className="sec-title">About Me</h2>
          <div className="sec-line" />
        </div>

        <div className="about-grid">
          
          {/* LEFT COLUMN: BIO & SPECS */}
          <div className="about-left reveal-l">
            <h3 className="about-subhead">Backend Engineer & Systems Architect</h3>
            
            <p className="about-text">
              I'm <strong className="g">John Remoun</strong>, a Backend Engineer and Computer Science student with practical expertise architecting scalable RESTful and GraphQL APIs, real-time engines, and distributed services using <strong className="g">Node.js, TypeScript, Express, MongoDB, and Redis</strong>.
            </p>

            <p className="about-text">
              Recognized as a <strong className="g">Top Achiever at Route Academy's Backend Diploma</strong>, I maintain a strong foundation in database design, caching strategies, and enterprise-grade security (Google OAuth2, JWT with Redis-backed revocation, AES-256-CBC, Argon2, Bcrypt, and RBAC).
            </p>

            {/* QUICK SPECS CONTAINER */}
            <div className="specs-card">
              <div className="specs-header">
                <span className="specs-dot" />
                <span className="specs-title">Engineering System Specs</span>
              </div>
              <div className="specs-grid">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="spec-item">
                    <span className="spec-key">{k}</span>
                    <span className="spec-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TIMELINE JOURNEY */}
          <div className="about-right reveal-r">
            
            <div className="block-wrapper">
              <h4 className="block-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                Education & Career Journey
              </h4>

              <div className="timeline-container">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="tl-row">
                    {/* LEFT YEAR COLUMN */}
                    <div className="tl-year-left">
                      <span className="tl-year-text">{t.year}</span>
                    </div>

                    {/* CENTER MARKER */}
                    <div className="tl-marker">
                      <div className="tl-circle" />
                      {i < TIMELINE.length - 1 && <div className="tl-line" />}
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="tl-content">
                      <div className="tl-role">{t.role}</div>
                      <div className="tl-place">{t.place}</div>
                      <p className="tl-desc">{t.desc}</p>
                    </div>
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