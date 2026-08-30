import { motion, useReducedMotion } from 'framer-motion';

/**
 * Prudent EPC — Cinematic Brand Luxury Screen Opening Transition
 * Features:
 * - Deep Emerald Black Glass Matrix
 * - Glowing Engineering Blueprint Grid Overlay
 * - Holographic Center Brand Badge Unveil
 * - Laser Amber/Orange Guide Seams
 */
export default function CurtainTransition({ children, mode = 'doors' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  const bars = [0, 1, 2, 3, 4];
  const shutters = [0, 1, 2, 3];

  return (
    <div className="curtain-wrapper">
      {/* 1. DOORS MODE: Double split doors with holographic center badge */}
      {mode === 'doors' && (
        <>
          <motion.div
            className="curtain-panel curtain-panel--left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-panel curtain-panel--right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-accent-line"
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />

          {/* Holographic Center Emblem that dissolves as doors open */}
          <motion.div
            className="curtain-brand-badge"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="curtain-brand-inner">
              <span className="curtain-brand-glow" />
              <span className="curtain-brand-text">PRUDENT EPC</span>
              <span className="curtain-brand-sub">ENGINEERING EXCELLENCE</span>
            </div>
          </motion.div>
        </>
      )}

      {/* 2. STAGGER WIPE MODE: 5 vertical deep emerald columns with glowing laser edges */}
      {mode === 'stagger' && (
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
                duration: 0.55,
                delay: index * 0.05,
                ease: [0.77, 0, 0.175, 1],
              }}
            >
              <div className="curtain-grid-overlay" />
            </motion.div>
          ))}
        </div>
      )}

      {/* 3. CLIP WIPE MODE: Angled diagonal deep emerald wipe with orange laser flare */}
      {mode === 'wipe' && (
        <motion.div
          className="curtain-wipe-panel"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          animate={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="curtain-grid-overlay" />
        </motion.div>
      )}

      {/* 4. IRIS MODE: Expanding radial circular deep emerald opening */}
      {mode === 'iris' && (
        <motion.div
          className="curtain-iris-panel"
          initial={{ clipPath: 'circle(100% at 50% 50%)' }}
          animate={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="curtain-grid-overlay" />
        </motion.div>
      )}

      {/* 5. SHUTTER MODE: 4 horizontal deep emerald shutter blades */}
      {mode === 'shutter' && (
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
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.77, 0, 0.175, 1],
              }}
            >
              <div className="curtain-grid-overlay" />
            </motion.div>
          ))}
        </div>
      )}

      {/* 6. MIXED MODE: Split doors + central glowing orange accent line + badge */}
      {mode === 'mixed' && (
        <>
          <motion.div
            className="curtain-panel curtain-panel--left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-panel curtain-panel--right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="curtain-grid-overlay" />
          </motion.div>

          <motion.div
            className="curtain-accent-line"
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          <motion.div
            className="curtain-brand-badge"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="curtain-brand-inner">
              <span className="curtain-brand-glow" />
              <span className="curtain-brand-text">PRUDENT EPC</span>
              <span className="curtain-brand-sub">ENGINEERING EXCELLENCE</span>
            </div>
          </motion.div>
        </>
      )}

      {/* Screen opening content view */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
