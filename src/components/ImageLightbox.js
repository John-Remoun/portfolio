import { useEffect } from 'react';
import './ImageLightbox.css';

export default function ImageLightbox({ photos, currentIndex, projectTitle, onClose, onSelectIndex }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, photos.length, onClose, onSelectIndex]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        {/* TOP BAR */}
        <div className="lightbox-header">
          <div className="lightbox-title-wrap">
            <span className="lightbox-badge">HD Gallery</span>
            <h4 className="lightbox-title">{projectTitle}</h4>
            <span className="lightbox-counter">{currentIndex + 1} / {photos.length}</span>
          </div>
          <div className="lightbox-header-actions">
            <a
              href={currentPhoto}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-action-btn"
              title="Open full size image"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button className="lightbox-close-btn" onClick={onClose} aria-label="Close image modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* MAIN IMAGE VIEWPORT */}
        <div className="lightbox-body">
          {photos.length > 1 && (
            <button
              className="lightbox-nav-btn prev"
              onClick={() => onSelectIndex((currentIndex - 1 + photos.length) % photos.length)}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <div className="lightbox-img-wrapper">
            <img
              key={currentPhoto}
              src={currentPhoto}
              alt={`${projectTitle} screenshot ${currentIndex + 1}`}
              className="lightbox-img"
            />
          </div>

          {photos.length > 1 && (
            <button
              className="lightbox-nav-btn next"
              onClick={() => onSelectIndex((currentIndex + 1) % photos.length)}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* THUMBNAIL STRIP */}
        {photos.length > 1 && (
          <div className="lightbox-thumbs">
            {photos.map((p, idx) => (
              <button
                key={p + idx}
                className={`lightbox-thumb ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => onSelectIndex(idx)}
              >
                <img src={p} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
