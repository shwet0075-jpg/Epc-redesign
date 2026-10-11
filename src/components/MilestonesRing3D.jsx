import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiPause,
  FiAward,
  FiCpu,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiMove,
} from 'react-icons/fi';
import '../styles/milestones-ring.css';

const defaultIcons = [FiAward, FiCpu, FiUsers, FiTrendingUp, FiCheckCircle];

/**
 * 3D Ring Milestones Carousel Component
 * 
 * Signature features:
 * 1. 3D Rotating Cylinder: 6 milestones arranged symmetrically around a virtual cylinder in 3D space.
 * 2. Active Card Focus: The active milestone card faces the viewer directly at full opacity and scale.
 * 3. Perspective Angular Falloff: Neighbouring cards turn away at angles (±60°, ±120°) and dim naturally with depth.
 * 4. Front Card Liquid Light Sweep: A luminous metallic sheen glides across the front card on entry and cycle.
 * 5. Level 3D Platform: Clean, stable perspective without distracting cursor tilt.
 * 6. Multi-Modal Navigation: Drag/swipe gestures, arrow buttons, year pills/dots, and configurable auto-rotation.
 * 7. Screen reader accessible & prefers-reduced-motion support.
 */
export default function MilestonesRing3D({
  milestones = [],
  className = '',
  autoPlayInterval = 5500,
}) {
  const shouldReduceMotion = useReducedMotion();
  const total = milestones.length;
  const stepAngle = total > 0 ? 360 / total : 60;

  const [activeIndex, setActiveIndex] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetAngle, setDragOffsetAngle] = useState(0);
  const [radius, setRadius] = useState(325);

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const stageRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const autoPlayTimerRef = useRef(null);

  // Responsive radius calculation for 3D cylinder depth
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 600) {
        setRadius(225);
      } else if (w < 900) {
        setRadius(270);
      } else {
        setRadius(325);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Navigation handlers: advance Next / Prev with continuous angle accumulation
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setTargetAngle((prev) => prev - stepAngle);
  }, [total, stepAngle]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTargetAngle((prev) => prev + stepAngle);
  }, [total, stepAngle]);

  const handleGoTo = useCallback(
    (index) => {
      if (index === activeIndex) return;
      let diff = index - activeIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      setActiveIndex(index);
      setTargetAngle((prev) => prev - diff * stepAngle);
    },
    [activeIndex, total, stepAngle]
  );

  // Auto-rotation timer
  useEffect(() => {
    if (shouldReduceMotion || !isAutoPlay || isHovered || isDragging || total <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [shouldReduceMotion, isAutoPlay, isHovered, isDragging, total, autoPlayInterval, handleNext]);

  // Mouse move over 3D stage computes tilt
  const handleMouseMove = (e) => {
    if (shouldReduceMotion || isDragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild, responsive tilt (max ±7 deg)
    const rotateY = (x / (rect.width / 2)) * 6.5;
    const rotateX = -(y / (rect.height / 2)) * 5.5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Drag & Swipe Interaction (Mouse + Touch)
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragDistanceRef.current = 0;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    dragDistanceRef.current = deltaX;
    // Map pixels to rotation degrees with damping
    const angleDelta = (deltaX / 360) * 55;
    setDragOffsetAngle(angleDelta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = dragDistanceRef.current;
    setDragOffsetAngle(0);

    const threshold = 40;
    if (deltaX < -threshold) {
      handleNext();
    } else if (deltaX > threshold) {
      handlePrev();
    }
  };

  // Mouse drag listeners
  const onMouseDown = (e) => {
    // Only drag on primary button
    if (e.button !== 0) return;
    handleDragStart(e.clientX);
  };

  const onMouseMoveStage = (e) => {
    handleMouseMove(e);
    if (isDragging) {
      handleDragMove(e.clientX);
    }
  };

  const onMouseUp = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch swipe listeners
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (isDragging) handleDragEnd();
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const currentCylinderRotation = targetAngle + dragOffsetAngle;

  if (!milestones || milestones.length === 0) return null;

  return (
    <div
      className={`milestones-ring-section ${className}`}
      role="region"
      aria-label="3D Interactive Milestones Timeline"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Ambient Blueprint Grid Texture */}
      <div className="milestones-ambient-grid" aria-hidden="true" />

      {/* 3D Stage with Cursor Tilt */}
      <div
        ref={stageRef}
        className={`milestones-3d-stage ${isDragging ? 'is-dragging' : ''}`}
        onMouseMove={onMouseMoveStage}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Tilt Platform - responds to cursor motion */}
        <div
          className="milestones-tilt-platform"
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          }}
        >
          {/* Rotating 3D Cylinder Container */}
          <div
            className="milestones-cylinder"
            style={{
              transform: `rotateY(${currentCylinderRotation}deg)`,
              transition: isDragging
                ? 'none'
                : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {milestones.map((item, index) => {
              const cardAngle = index * stepAngle;
              const Icon = defaultIcons[index % defaultIcons.length];

              // Angular difference relative to front view (-3 to +3)
              let diff = ((index - activeIndex) % total + total) % total;
              if (diff > total / 2) diff -= total;

              const isActive = diff === 0;
              const isNeighbour = Math.abs(diff) === 1;
              const isFar = Math.abs(diff) === 2;
              const isBack = Math.abs(diff) >= 3;

              // Depth & Dimming values
              let opacity = 1;
              let scale = 1;
              let filter = 'none';

              if (isActive) {
                opacity = 1;
                scale = 1;
                filter = 'blur(0px) brightness(1)';
              } else if (isNeighbour) {
                opacity = 0.62;
                scale = 0.91;
                filter = 'blur(0.8px) brightness(0.92)';
              } else if (isFar) {
                opacity = 0.26;
                scale = 0.81;
                filter = 'blur(2px) brightness(0.82)';
              } else {
                opacity = 0.08;
                scale = 0.72;
                filter = 'blur(3.5px) brightness(0.7)';
              }

              return (
                <div
                  key={item.year || index}
                  className={`milestone-card-3d ${isActive ? 'is-active' : ''} ${
                    isNeighbour ? 'is-neighbour' : ''
                  } ${isBack ? 'is-back' : ''}`}
                  onClick={() => {
                    if (!isActive && !isDragging) {
                      handleGoTo(index);
                    }
                  }}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                    opacity,
                    filter,
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${item.year}: ${item.title}`}
                  aria-hidden={!isActive}
                >
                  {/* Top Gradient Accent Bar */}
                  <div className="milestone-card-top-bar" />

                  {/* Watermark Year Background */}
                  <span className="milestone-card-watermark" aria-hidden="true">
                    {item.year}
                  </span>

                  {/* Liquid Light Sweep across the active front card */}
                  {isActive && !shouldReduceMotion && (
                    <motion.div
                      key={`sweep-${activeIndex}`}
                      className="milestone-light-sweep-overlay"
                      initial={{ x: '-160%', opacity: 0 }}
                      animate={{ x: '260%', opacity: [0, 0.95, 0] }}
                      transition={{
                        duration: 1.35,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.18,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Card Content Top Meta */}
                  <div className="milestone-card-content-top">
                    <div className="milestone-card-meta">
                      <span className="milestone-badge-phase">
                        {item.badge || `Phase 0${index + 1}`}
                      </span>
                      <span className="milestone-badge-category">
                        {item.category}
                      </span>
                    </div>

                    <div className="milestone-card-hero">
                      <span className="milestone-card-year">{item.year}</span>
                      <div className="milestone-card-icon-pill">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h4 className="milestone-card-title">{item.title}</h4>
                    <p className="milestone-card-desc">{item.text}</p>
                  </div>

                  {/* Achievement Chips */}
                  {item.chips && item.chips.length > 0 && (
                    <div className="milestone-card-chips">
                      {item.chips.map((chip, chipIdx) => (
                        <span key={chipIdx} className="milestone-card-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floor Reflection / Shadow Disc */}
          <div className="milestones-cylinder-shadow" aria-hidden="true" />
        </div>
      </div>

      {/* Interactive Controls Bar: Prev Arrow, Year Scrubber, Next Arrow & AutoPlay Toggle */}
      <div className="milestones-controls-bar">
        {/* Prev Arrow */}
        <button
          type="button"
          className="milestones-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous Milestone"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Year Pills / Navigation Dots */}
        <div className="milestones-year-scrubber" role="tablist" aria-label="Milestone Years">
          {milestones.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={item.year || idx}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Jump to milestone ${item.year}`}
                className={`milestone-year-pill ${isCurrent ? 'is-active' : ''}`}
                onClick={() => handleGoTo(idx)}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="milestoneActivePill"
                    className="milestone-year-pill-bg"
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  />
                )}
                <span>{item.year}</span>
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          className="milestones-nav-btn next"
          onClick={handleNext}
          aria-label="Next Milestone"
        >
          <FiChevronRight size={24} />
        </button>

        {/* AutoPlay Toggle */}
        <button
          type="button"
          className={`milestones-autoplay-toggle ${!isAutoPlay ? 'is-paused' : ''}`}
          onClick={() => setIsAutoPlay((p) => !p)}
          aria-label={isAutoPlay ? 'Pause Auto Rotation' : 'Resume Auto Rotation'}
        >
          <span className="pulse-dot" />
          {isAutoPlay ? <FiPause size={13} /> : <FiPlay size={13} />}
          <span>{isAutoPlay ? 'Auto-Rotate' : 'Paused'}</span>
        </button>
      </div>

      {/* Helpful Interactive Hint */}
      <div className="milestones-drag-hint" aria-hidden="true">
        <FiMove size={14} />
        <span>Drag or swipe cylinder • Hover to pause • Click sides to rotate</span>
      </div>
    </div>
  );
}
