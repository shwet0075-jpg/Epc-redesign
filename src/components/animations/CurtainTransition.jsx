import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Prudent EPC — Cinematic Brand Luxury Screen Opening Transition
 * 
 * Tuned with deliberate, engineering-grade pacing:
 * - Clear visibility: Initial hold allows the eye to register the transition and holographic emblem
 * - Refined easing: [0.76, 0, 0.24, 1] gives substantial, weighted momentum
 * - Synchronized reveal: New screen content smoothly unveils as curtains open
 */
export default function CurtainTransition({ children, mode = 'doors' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  const bars = [0, 1, 2, 3, 4];
  const shutters = [0, 1, 2, 3];

  // Reusable Holographic Center Emblem with perception hold & graceful dissolve
  const renderBrandBadge = (delay = 0.2) => (
    <motion.div
      className="curtain-brand-badge"
      initial={{ opacity: 1, scale: 0.96 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0.96, 1, 1.08],
      }}
      transition={{
        duration: 0.85,
        delay,
        times: [0, 0.35, 1],
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      <div className="curtain-brand-inner">
        <span className="curtain-brand-glow" />
        <span className="curtain-brand-text">PRUDENT EPC</span>
        <span className="curtain-brand-sub">ENGINEERING EXCELLENCE</span>
      </div>
    </motion.div>
  );

  return (
    <div className="curtain-wrapper">
      {/* 1. DOORS MODE: Double split doors with holographic center badge */}
      {mode === 'doors' && (
        <>
          <motion.div
            className="curtain-panel curtain-panel--left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.22,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-panel curtain-panel--right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.22,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-accent-line"
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {renderBrandBadge(0.05)}
        </>
      )}

      {/* 2. STAGGER WIPE MODE: 5 vertical deep emerald columns with glowing laser edges */}
      {mode === 'stagger' && (
        <>
          <div className="curtain-bars">
            {bars.map((index) => (
              <motion.div
                key={index}
                className="curtain-bar"
                style={{
                  left: `${index * 20}%`,
                  width: '20.2%',
                }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.18 + index * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <div className="curtain-grid-overlay" />
              </motion.div>
            ))}
          </div>
          {renderBrandBadge(0.05)}
        </>
      )}

      {/* 3. CLIP WIPE MODE: Angled diagonal deep emerald wipe with orange laser flare */}
      {mode === 'wipe' && (
        <>
          <motion.div
            className="curtain-wipe-panel"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            animate={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            transition={{
              duration: 0.95,
              delay: 0.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>
          {renderBrandBadge(0.05)}
        </>
      )}

      {/* 4. IRIS MODE: Expanding radial circular deep emerald opening */}
      {mode === 'iris' && (
        <>
          <motion.div
            className="curtain-iris-panel"
            initial={{ clipPath: 'circle(100% at 50% 50%)' }}
            animate={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{
              duration: 1.0,
              delay: 0.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>
          {renderBrandBadge(0.05)}
        </>
      )}

      {/* 5. SHUTTER MODE: 4 horizontal deep emerald shutter blades */}
      {mode === 'shutter' && (
        <>
          <div className="curtain-shutters">
            {shutters.map((index) => (
              <motion.div
                key={index}
                className="curtain-shutter"
                style={{
                  top: `${index * 25}%`,
                  height: '25.2%',
                }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.18 + index * 0.09,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <div className="curtain-grid-overlay" />
              </motion.div>
            ))}
          </div>
          {renderBrandBadge(0.05)}
        </>
      )}

      {/* 6. MIXED MODE: Split doors + central glowing orange accent line + badge */}
      {mode === 'mixed' && (
        <>
          <motion.div
            className="curtain-panel curtain-panel--left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.22,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-panel curtain-panel--right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.22,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-accent-line"
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {renderBrandBadge(0.05)}
        </>
      )}

      {/* Screen content revelation with smooth upward settle */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
