import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchGithubProjects } from '../services/githubProjects';
import ImageLightbox from './ImageLightbox';
import './Projects.css';

export default function Projects() {
  const wrapRef   = useRef(null);
  const stickyRef = useRef(null);
  
  const [projects, setProjects]       = useState([]);
  const [loading, setLoading]         = useState(true);
  
  const [idx, setIdx]                 = useState(0);
  const [prog, setProg]               = useState(0);
  
  // Image slider per project card
  const [imgIndexes, setImgIndexes]   = useState({});
  
  // Lightbox Modal State
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    photos: [],
    currentIndex: 0,
    title: ''
  });
  
  const rafRef = useRef(null);

  // 1. Load Projects from GitHub (or local cache)
  const loadProjects = useCallback(async () => {
    setLoading(true);

    try {
      const result = await fetchGithubProjects(false);
      setProjects(result.projects || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = projects;
  const N = filteredProjects.length;

  // 2. Scroll progress logic
  const calc = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || N === 0) return;
    const rect     = wrap.getBoundingClientRect();
    const total    = rect.height - window.innerHeight;
    if (total <= 0) return;
    const scrolled = Math.max(0, -rect.top);
    if (scrolled > total) return;
    
    const perCard  = total / N;
    const raw      = scrolled / perCard;
    const cardIdx  = Math.min(Math.floor(raw), N - 1);
    const cardProg = raw - Math.floor(raw);
    
    setIdx(cardIdx);
    setProg(cardProg);
  }, [N]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calc);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    calc();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calc]);

  // 3. Auto-play Slideshow for active project photo
  useEffect(() => {
    const activeProject = filteredProjects[idx];
    if (!activeProject || !activeProject.photos || activeProject.photos.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setImgIndexes(prev => {
        const cur = prev[activeProject.id] || 0;
        const next = (cur + 1) % activeProject.photos.length;
        return { ...prev, [activeProject.id]: next };
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [idx, filteredProjects]);

  // Handle manual photo slide navigation
  const handlePrevPhoto = (e, projId, photoCount) => {
    e.stopPropagation();
    setImgIndexes(prev => {
      const cur = prev[projId] || 0;
      const next = (cur - 1 + photoCount) % photoCount;
      return { ...prev, [projId]: next };
    });
  };

  const handleNextPhoto = (e, projId, photoCount) => {
    e.stopPropagation();
    setImgIndexes(prev => {
      const cur = prev[projId] || 0;
      const next = (cur + 1) % photoCount;
      return { ...prev, [projId]: next };
    });
  };

  // Open Lightbox Gallery
  const openLightbox = (project, startIdx = 0) => {
    if (!project.photos || project.photos.length === 0) return;
    setLightboxState({
      isOpen: true,
      photos: project.photos,
      currentIndex: startIdx,
      title: project.title
    });
  };

  if (loading) {
    return (
      <section id="projects" className="projects-section projects-state-box">
        <div className="projects-loading-spinner">
          <div className="spinner-ring" />
          <p className="projects-hint-txt">Syncing portfolio.json from GitHub repos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section" style={{ '--proj-count': Math.max(1, N) }}>
      {/* Section header */}
      <div className="projects-head container">
        <div className="sec-head" style={{ opacity: 1, transform: 'none' }}>
          <span className="sec-num">04.</span>
          <h2 className="sec-title">Projects</h2>
          <div className="sec-line" />
        </div>
      </div>

      {N === 0 ? (
        <div className="container projects-state-box">
          <p className="projects-hint-txt">No projects found.</p>
        </div>
      ) : (
        <div 
          className="projects-scroll-wrap" 
          ref={wrapRef} 
          style={{ height: `calc(${N} * 100vh)` }}
        >
          <div className="projects-sticky" ref={stickyRef}>
            {/* Progress dots */}
            <div className="proj-dots">
              {filteredProjects.map((p, i) => (
                <div
                  key={p.id}
                  className={`proj-dot ${i === idx ? 'active' : i < idx ? 'done' : ''}`}
                  onClick={() => {
                    const wrap = wrapRef.current;
                    if (!wrap) return;
                    const totalHeight = wrap.clientHeight - window.innerHeight;
                    const targetY = wrap.offsetTop + (i / N) * totalHeight;
                    window.scrollTo({ top: targetY, behavior: 'smooth' });
                  }}
                  title={p.title}
                />
              ))}
            </div>

            {/* Cards */}
            {filteredProjects.map((p, i) => {
              const isActive = i === idx;
              const isFuture = i > idx;

              let ty      = 0;
              let opacity = 1;
              let scale   = 1;
              let rotate  = 0;

              if (isActive) {
                ty      = prog * -70;
                opacity = 1 - prog * 0.4;
                scale   = 1 - prog * 0.018;
                rotate  = prog * -1.5;
              } else if (isFuture) {
                const dist = i - idx;
                ty      = dist * 20;
                scale   = 1 - dist * 0.038;
                opacity = 1 - dist * 0.25;
              } else {
                opacity = 0;
                scale   = 0.95;
              }

              const photosList = p.photos && p.photos.length > 0 ? p.photos : ['/placeholder.jpg'];
              const currentImgI = imgIndexes[p.id] || 0;

              return (
                <div
                  key={p.id}
                  className={`proj-card ${isActive ? 'card-active' : ''}`}
                  style={{
                    transform: `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
                    opacity,
                    zIndex: N - Math.abs(i - idx),
                    transition: isFuture
                      ? 'transform 0.45s cubic-bezier(.4,0,.2,1), opacity 0.45s ease'
                      : 'none',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* LEFT: INFO */}
                  <div className="proj-info">
                    <div className="proj-info-header">
                      <span className="proj-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="proj-category-badge">{p.category}</span>
                    </div>

                    <span className="proj-tag">{p.metric}</span>
                    <h3 className="proj-title">{p.title}</h3>
                    {p.subtitle && <h4 className="proj-subtitle">{p.subtitle}</h4>}
                    <p className="proj-desc">{p.desc}</p>

                    <div className="proj-stack">
                      {p.stack.map(t => <span key={t} className="proj-chip">{t}</span>)}
                    </div>

                    <div className="proj-links">
                      {p.github && (
                        <a href={p.github} className="btn btn-outline proj-btn" target="_blank" rel="noreferrer">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          Repository
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} className="btn btn-gold proj-btn" target="_blank" rel="noreferrer">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Live Demo
                        </a>
                      )}
                      <button
                        className="btn btn-outline proj-btn gallery-trigger-btn"
                        onClick={() => openLightbox(p, currentImgI)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Photos ({photosList.length})
                      </button>
                    </div>
                  </div>

                  {/* RIGHT: IMAGE SLIDER FRAME */}
                  <div className="proj-img-wrap" onClick={() => openLightbox(p, currentImgI)}>
                    <div className="proj-img-frame">
                      {photosList.map((imgSrc, imgI) => (
                        <img
                          key={imgSrc + imgI}
                          src={imgSrc}
                          alt={`${p.title} screenshot ${imgI + 1}`}
                          className={`proj-img ${isActive && imgI === currentImgI ? 'active-slide' : ''}`}
                          loading="lazy"
                        />
                      ))}
                      
                      <div className="proj-img-overlay" />
                      
                      {/* Zoom hint overlay */}
                      <div className="proj-img-zoom-hint">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>Click to Expand HD Gallery</span>
                      </div>
                      
                      <div className="proj-img-badge">
                        <span className="proj-img-dot" />{p.category}
                      </div>

                      {/* Manual Slide Control Arrows */}
                      {photosList.length > 1 && (
                        <>
                          <button
                            className="proj-slide-arrow left"
                            onClick={(e) => handlePrevPhoto(e, p.id, photosList.length)}
                            aria-label="Previous photo"
                          >
                            ‹
                          </button>
                          <button
                            className="proj-slide-arrow right"
                            onClick={(e) => handleNextPhoto(e, p.id, photosList.length)}
                            aria-label="Next photo"
                          >
                            ›
                          </button>
                        </>
                      )}

                      {/* Pagination dashes */}
                      {photosList.length > 1 && (
                        <div className="proj-img-pagination">
                          {photosList.map((_, dotI) => (
                            <span
                              key={dotI}
                              className={`proj-img-pag-dash ${isActive && dotI === currentImgI ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setImgIndexes(prev => ({ ...prev, [p.id]: dotI }));
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Counter */}
            <div className="proj-counter">
              <span className="proj-counter-cur">{String(idx + 1).padStart(2, '0')}</span>
              <span className="proj-counter-sep">/</span>
              <span className="proj-counter-tot">{String(N).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxState.isOpen && (
        <ImageLightbox
          photos={lightboxState.photos}
          currentIndex={lightboxState.currentIndex}
          projectTitle={lightboxState.title}
          onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
          onSelectIndex={(newIdx) => setLightboxState(prev => ({ ...prev, currentIndex: newIdx }))}
        />
      )}
    </section>
  );
}