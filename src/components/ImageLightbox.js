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
      {/* SMALL GOLD CLOSE BUTTON TOP RIGHT */}
      <button 
        className="lightbox-close-gold" 
        onClick={onClose} 
        aria-label="Close image modal"
        title="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* MAIN IMAGE VIEWPORT WITH NAV ARROWS ONLY */}
      <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
        {photos.length > 1 && (
          <button
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex((currentIndex + 1) % photos.length);
            }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
