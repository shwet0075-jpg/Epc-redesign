import { motion, useReducedMotion } from 'framer-motion';

/**
 * World-class Motion Curtain Screen Opening Transition
 * Adapted from Motion Official References:
 * - react-curtains-doors
 * - react-curtains-clip-wipe
 * - react-curtains-stagger-wipe
 * - react-curtains-iris
 * - react-curtains-mixed
 * - react-curtains-shutter
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
      {/* 1. DOORS MODE: Double panel split opening from center out */}
      {mode === 'doors' && (
        <>
          <motion.div
            className="curtain-panel curtain-panel--left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="curtain-panel curtain-panel--right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}

      {/* 2. STAGGER WIPE MODE: 5 vertical columns sliding up with staggered delay */}
      {mode === 'stagger' && (
        <div className="curtain-bars">
          {bars.map((index) => (
            <motion.div
              key={index}
              className="curtain-bar"
              style={{ left: `${index * 20}%`, width: '20.2%' }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}
        </div>
      )}

      {/* 3. CLIP WIPE MODE: Angled diagonal curtain wipe */}
      {mode === 'wipe' && (
        <motion.div
          className="curtain-wipe-panel"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          animate={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}

      {/* 4. IRIS MODE: Expanding radial circular curtain opening */}
      {mode === 'iris' && (
        <motion.div
          className="curtain-iris-panel"
          initial={{ clipPath: 'circle(100% at 50% 50%)' }}
          animate={{ clipPath: 'circle(0% at 50% 50%)' }}
          exit={{ clipPath: 'circle(100% at 50% 50%)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}

      {/* 5. SHUTTER MODE: 4 horizontal shutter blades opening top to bottom */}
      {mode === 'shutter' && (
        <div className="curtain-shutters">
          {shutters.map((index) => (
            <motion.div
              key={index}
              className="curtain-shutter"
              style={{ top: `${index * 25}%`, height: '25.2%' }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}
        </div>
      )}

      {/* 6. MIXED MODE: Split doors + central gold accent thread line */}
      {mode === 'mixed' && (
        <>
          <motion.div
            className="curtain-panel curtain-panel--left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="curtain-panel curtain-panel--right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="curtain-accent-line"
            initial={{ scaleY: 1, opacity: 1 }}
            animate={{ scaleY: 0, opacity: 0 }}
            exit={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </>
      )}

      {/* Screen opening content view */}
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
