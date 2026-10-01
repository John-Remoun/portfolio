import { useRef, useState } from 'react';
import { useReveal } from './useReveal';
import './Certifications.css';

const CERTS = [
  {
    id: 'route-backend',
    coverTitle: 'Route Certificate',
    title: 'Backend Development (Node.js) Diploma',
    issuer: 'Route Academy',
    date: 'Issued: Jun 2026',
    badge: '🏆 Top Achiever',
    badgeType: 'gold',
    code: null,
    link: 'https://drive.google.com/file/d/1m5rhn-PE1uo6LOC5UJ1FgFMNDWu8jE9Q/view?usp=drivesdk',
    desc: 'Awarded Top Achiever for outstanding performance in Node.js, TypeScript, REST & GraphQL service architecture, Redis caching, and enterprise security.',
    tags: ['Node.js', 'TypeScript', 'REST & GraphQL', 'Redis Caching', 'Enterprise Security']
  },
  {
    id: 'mahara-tech-iti',
    coverTitle: 'ITI Mahara-Tech Certificate',
    title: 'The Complete Node.js Course (RESTful Services)',
    issuer: 'Mahara-Tech (ITI)',
    date: 'Issued: Jun 2026',
    badge: 'ITI Verified',
    badgeType: 'blue',
    code: 'aF4nIg4mE1',
    link: 'https://drive.google.com/file/d/1T7hmr35UmI23449AhU6CDo-p5goTqMxL/view',
    desc: 'Mastery of building production-grade RESTful web services, Express.js backend routing, and MongoDB database aggregations.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs']
  },
  {
    id: 'orbscope-backend',
    coverTitle: 'OrbScope Certificate',
    title: 'Back-End Web Development Using Node.js',
    issuer: 'OrbScope Academy',
    date: 'Issued: Aug 2026',
    badge: 'OrbScope Certified',
    badgeType: 'emerald',
    code: null,
    link: 'https://drive.google.com/file/d/1Qq_Em0ysdZI5qZHhEdrPtWJ53coQFxFe/view?usp=sharing',
    desc: 'Intensive training program focused on back-end web architecture, asynchronous workflows, and scalable Node.js microservice patterns.',
    tags: ['Node.js', 'Server Architecture', 'REST Services', 'Async Patterns']
  }
];

export default function Certifications() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const [openId, setOpenId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useReveal(ref, []);

  const handleScroll = (e) => {
    const el = e.target;
    if (!el) return;
    const cardWidth = el.scrollWidth / CERTS.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    if (idx >= 0 && idx < CERTS.length && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  };

  const scrollToCard = (index) => {
    if (gridRef.current) {
      const container = gridRef.current;
      const cardWidth = container.scrollWidth / CERTS.length;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleCardClick = (e, cert) => {
    // Detect mobile / touch pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouch) {
      if (openId !== cert.id) {
        // First tap on mobile: Open 3D book cover
        e.preventDefault();
        setOpenId(cert.id);
      } else {
        // Second tap on mobile: Navigate to certificate link
        window.open(cert.link, '_blank');
      }
    } else {
      // Desktop click: Open link directly in new tab
      window.open(cert.link, '_blank');
    }
  };

  return (
    <section id="certifications" className="section certs-section" ref={ref}>
      <div className="container">
        
        {/* SECTION HEADER */}
        <div className="sec-head reveal">
          <span className="sec-num">02.</span>
          <h2 className="sec-title">Certifications</h2>
          <div className="sec-line" />
        </div>

        <p className="certs-section-subtitle reveal">
          Verified diplomas, credentials, and honors in Backend Engineering & Architecture
        </p>

        {/* 3D BOOK CERTIFICATIONS GRID */}
        <div 
          className="certs-grid reveal"
          ref={gridRef}
          onScroll={handleScroll}
        >
          {CERTS.map((cert) => (
            <div
              key={cert.id}
              className={`cert-book ${openId === cert.id ? 'is-open' : ''}`}
              onClick={(e) => handleCardClick(e, cert)}
            >
              {/* INNER PAGE (ALL CERTIFICATE DETAILS) */}
              <div className="cert-inner-page">
                <div className="cert-card-header">
                  <div className="cert-badge-wrap">
                    <span className={`cert-badge-chip ${cert.badgeType}`}>
                      {cert.badge}
                    </span>
                    {cert.code && (
                      <span className="cert-code-chip">
                        Code: {cert.code}
                      </span>
                    )}
                  </div>
                  <span className="cert-date-text">{cert.date}</span>
                </div>

                <div className="cert-card-body">
                  <h3 className="cert-card-title">{cert.title}</h3>
                  <span className="cert-card-issuer">
                    Verified Credential • <strong>{cert.issuer}</strong>
                  </span>

                  <p className="cert-card-description">{cert.desc}</p>

                  <div className="cert-tags-row">
                    {cert.tags.map((t) => (
                      <span key={t} className="cert-tag-pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="cert-card-footer">
                  <span className="cert-action-text">View Certificate PDF</span>
                  <svg className="cert-action-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              </div>

              {/* 3D HARD COVER PAGE (OUTSIDE TITLE & EMBLEM) */}
              <div className="cert-cover-page">
                <div className="cert-cover-spine" />
                <div className="cert-cover-content">
                  <div className="cert-cover-emblem">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 15c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 7z"/>
                      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/>
                    </svg>
                  </div>
                  <h4 className="cert-cover-title">{cert.coverTitle}</h4>
                  <span className="cert-cover-issuer">{cert.issuer}</span>
                  <div className="cert-cover-prompt">
                    <span>Tap to Open</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CUSTOM LUXURY MOBILE NAVIGATION */}
        <div className="certs-mobile-nav">
          <div className="certs-swipe-hint">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Swipe to explore</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="certs-dots">
            {CERTS.map((c, i) => (
              <button
                key={c.id}
                className={`cert-dot ${activeIndex === i ? 'is-active' : ''}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
