import { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = [
  { id: 'about',          label: 'About',          num: '01' },
  { id: 'certifications', label: 'Certifications', num: '02' },
  { id: 'skills',         label: 'Skills',         num: '03' },
  { id: 'projects',       label: 'Projects',       num: '04' },
  { id: 'contact',        label: 'Contact',        num: '05' },
];

// Google Drive CV Link
const CV_DRIVE_URL = "https://drive.google.com/file/d/1tS5gmjfwO0FfwcUSPFAeK---B0jL16Fu/view?usp=sharing";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = LINKS.map(l => document.getElementById(l.id));
      sections.forEach((s, i) => {
        if (!s) return;
        const rect = s.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) setActive(LINKS[i].id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = id => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-stuck' : ''}`}>
        {/* LOGO */}
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="nav-logo-text">JR</span>
          <span className="nav-logo-dot" />
        </button>

        {/* RIGHT SIDE CONTAINER */}
        <div className="nav-right-container">
          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.id}>
                <button
                  className={`nav-link ${active === l.id ? 'nav-link-active' : ''}`}
                  onClick={() => go(l.id)}
                >
                  <span className="nav-link-num">{l.num}.</span>{l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* PROFESSIONAL CV BUTTON */}
          <a 
            className="nav-cv-btn" 
            href={CV_DRIVE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {/* Document Icon */}
            <svg className="cv-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>CV</span>
            {/* External Arrow Icon */}
            <svg className="cv-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>

          <button className={`nav-burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${open ? 'open' : ''}`}>
        <div className="nav-drawer-inner">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              className="nav-drawer-link"
              style={{ transitionDelay: open ? `${i * 0.06}s` : '0s' }}
              onClick={() => go(l.id)}
            >
              <span className="nav-link-num">{l.num}.</span> {l.label}
            </button>
          ))}
          <a 
            className="nav-cv-btn drawer-cv-btn" 
            href={CV_DRIVE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg className="cv-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>View CV</span>
          </a>
        </div>
      </div>
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}