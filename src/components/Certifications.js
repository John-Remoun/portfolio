import { useRef } from 'react';
import { useReveal } from './useReveal';
import './Certifications.css';

const CERTS = [
  {
    id: 'route-backend',
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
    title: 'The Complete Node.js Course (RESTful Web Services)',
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
  useReveal(ref, []);

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

        {/* CERTIFICATIONS GRID */}
        <div className="certs-grid reveal">
          {CERTS.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
              title={`View ${cert.title} Certificate PDF`}
            >
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
                <div className="cert-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 15c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 7z"/>
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/>
                  </svg>
                </div>
                
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
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
