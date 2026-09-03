import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiPlay,
  FiPause,
  FiMaximize2,
  FiMapPin,
  FiCheckCircle,
  FiZap,
} from 'react-icons/fi';

const SLIDE_DURATION = 4500; // 4.5 seconds per slide

export default function MotionCarouselAutoplay({
  slides = [],
  onSelectProject,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [cardWidth, setCardWidth] = useState(640);
  const [cardGap, setCardGap] = useState(24);
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Measure container and compute responsive card dimensions
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    setContainerWidth(width);

    if (width < 640) {
      // Mobile
      setCardWidth(Math.min(width - 48, 380));
      setCardGap(16);
    } else if (width < 1024) {
      // Tablet
      setCardWidth(Math.min(width * 0.72, 540));
      setCardGap(20);
    } else {
      // Desktop / Laptop
      setCardWidth(Math.min(width * 0.58, 680));
      setCardGap(28);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || shouldReduceMotion || slides.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, activeIndex, slides.length, shouldReduceMotion]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (idx) => {
    setActiveIndex(idx);
  };

  // Drag / swipe detection
  const handleDragEnd = (event, info) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  if (!slides || slides.length === 0) return null;

  // Calculate track translation to keep activeIndex precisely centered
  const centerOffset = containerWidth / 2 - cardWidth / 2;
  const trackX = centerOffset - activeIndex * (cardWidth + cardGap);

  return (
    <div
      className="motion-carousel-root"
      ref={containerRef}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Interactive Landmark Projects Carousel"
    >
      {/* Top Header Row */}
      <div className="motion-carousel-header">
        <div>
          <span className="motion-carousel-eyebrow">
            <FiZap size={14} className="motion-carousel-eyebrow-icon" />
            Motion Showcase • Autoplay
          </span>
          <h2 className="motion-carousel-title">
            Landmark Engineering Highlights
          </h2>
        </div>

        <div className="motion-carousel-counter-badge">
          <span className="gallery-live-pulse-dot" />
          <span>
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Carousel Viewport */}
      <div className="motion-carousel-viewport">
        <motion.div
          className="motion-carousel-track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={handleDragEnd}
          animate={{ x: trackX }}
          transition={
            shouldReduceMotion
              ? { duration: 0.2 }
              : { type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }
          }
        >
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.article
                key={slide.id || idx}
                className={`motion-carousel-card ${isActive ? 'is-active' : 'is-flanking'}`}
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${cardGap}px`,
                }}
                animate={{
                  scale: isActive ? 1 : 0.93,
                  opacity: isActive ? 1 : 0.68,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  if (!isActive) goToSlide(idx);
                }}
              >
                {/* Background Media */}
                <div className="motion-card-media-wrapper">
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className="motion-card-img"
                    loading="lazy"
                  />
                  <div className="motion-card-scrim" />
                </div>

                {/* Card Corner Tech Decals */}
                <span className="motion-card-corner motion-corner-tl" />
                <span className="motion-card-corner motion-corner-tr" />
                <span className="motion-card-corner motion-corner-bl" />
                <span className="motion-card-corner motion-corner-br" />

                {/* Card Overlay Content */}
                <div className="motion-card-overlay">
                  <div className="motion-card-top-pills">
                    <span className="motion-card-code-pill">
                      <span className="gallery-live-pulse-dot" />
                      {slide.code}
                    </span>
                    <span className="motion-card-cat-pill">
                      {slide.categoryLabel}
                    </span>
                  </div>

                  <div className="motion-card-bottom-info">
                    <h3 className="motion-card-heading">{slide.name}</h3>
                    <p className="motion-card-desc">{slide.desc}</p>

                    <div className="motion-card-meta-row">
                      <span className="motion-meta-item">
                        <FiMapPin size={13} style={{ color: '#f08020' }} />
                        {slide.location}
                      </span>
                      <span className="motion-meta-item">
                        <FiCheckCircle size={13} style={{ color: '#22c55e' }} />
                        {slide.status}
                      </span>
                    </div>

                    <div className="motion-card-actions">
                      <button
                        type="button"
                        className="motion-card-inspect-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject?.(slide);
                        }}
                      >
                        <FiMaximize2 size={15} />
                        <span>Inspect Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Motion.dev Signature Autoplay Progress Bar & Controls Dock */}
      <div className="motion-carousel-controls-dock">
        {/* Previous Button */}
        <button
          type="button"
          className="motion-carousel-arrow-btn"
          onClick={prevSlide}
          aria-label="Previous Slide"
          title="Previous Slide"
        >
          <FiArrowLeft size={18} />
        </button>

        {/* The Animated Progress Capsule (Motion.dev style) */}
        <div className="motion-carousel-progress-box">
          <div className="motion-carousel-progress-track">
            <motion.div
              key={`${activeIndex}-${isPlaying}`}
              className="motion-carousel-progress-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isPlaying ? 1 : 0 }}
              transition={{
                duration: isPlaying ? SLIDE_DURATION / 1000 : 0,
                ease: 'linear',
              }}
            />
          </div>

          {/* Mini Interactive Dot Navigation */}
          <div className="motion-carousel-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`motion-dot ${i === activeIndex ? 'is-active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          className="motion-carousel-arrow-btn"
          onClick={nextSlide}
          aria-label="Next Slide"
          title="Next Slide"
        >
          <FiArrowRight size={18} />
        </button>

        {/* Play/Pause Toggle */}
        <button
          type="button"
          className={`motion-carousel-play-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
          title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
        >
          {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
        </button>
      </div>
    </div>
  );
}
