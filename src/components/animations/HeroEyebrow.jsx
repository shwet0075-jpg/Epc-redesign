import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useLoader } from '../../context/LoaderContext';

const SMOOTH_EASE = [0.22, 1, 0.36, 1];

/**
 * Hero Eyebrow Reveal Animation
 * 
 * 1. The orange line draws from the left (0.85s), and the glowing dot rides along at its tip.
 * 2. When the line lands, the green text is wiped in from left to right (1.35s starting at 0.8s),
 *    led by a thin orange light bar. Both use the same smooth ease.
 * 3. After that, the dot keeps a soft glow pulse.
 * 
 * - Starts when the label scrolls into view, or after the loader finishes.
 * - With reduced motion turned on, shows the final state with no animation.
 */
export default function HeroEyebrow({
  text = 'SINCE 2019 • ENGINEERING EXCELLENCE',
  className = '',
  isVisible: propIsVisible,
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Start it when the label scrolls into view, or after the loader finishes (bidirectional)
  const shouldAnimate = propIsVisible !== undefined ? propIsVisible : (isUnveiled && isInView);

  // With reduced motion turned on, show the final state with no animation
  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        className={`epc-hero-eyebrow epc-hero-eyebrow-animated ${className}`}
        aria-label={text}
      >
        <div className="epc-eyebrow-line-track">
          <span className="epc-eyebrow-line-fill" style={{ width: '100%' }}>
            <span className="epc-eyebrow-laser-head" />
          </span>
        </div>
        <div className="epc-eyebrow-content-wrap">
          <span className="epc-eyebrow-text-wiped" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            {text}
          </span>
        </div>
      </div>
    );
  }

  // 1. Line draws from left (forward) and retracts back to left (reverse)
  const lineVariants = {
    hidden: {
      width: '0%',
      transition: {
        duration: 0.8,
        delay: 0.7, // waits for text to un-wipe first in reverse
        ease: SMOOTH_EASE,
      },
    },
    visible: {
      width: '100%',
      transition: {
        duration: 1.25,
        delay: 0,
        ease: SMOOTH_EASE,
      },
    },
  };

  // 2. Green text wipes in left-to-right (forward) and un-wipes right-to-left (reverse)
  const textWipeVariants = {
    hidden: {
      clipPath: 'inset(0% 100% 0% 0%)',
      WebkitClipPath: 'inset(0% 100% 0% 0%)',
      transition: {
        duration: 1.0,
        delay: 0,
        ease: SMOOTH_EASE,
      },
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      WebkitClipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: 2.0,
        delay: 1.15,
        ease: SMOOTH_EASE,
      },
    },
  };

  // Thin orange light bar leading the text wipe forward and reverse
  const leadBarVariants = {
    hidden: {
      left: '0%',
      opacity: [1, 1, 0],
      transition: {
        left: {
          duration: 1.0,
          delay: 0,
          ease: SMOOTH_EASE,
        },
        opacity: {
          duration: 1.0,
          times: [0, 0.9, 1],
        },
      },
    },
    visible: {
      left: ['0%', '100%'],
      opacity: [0, 1, 1, 0],
      transition: {
        left: {
          duration: 2.0,
          delay: 1.15,
          ease: SMOOTH_EASE,
        },
        opacity: {
          duration: 2.0,
          delay: 1.15,
          times: [0, 0.05, 0.95, 1],
        },
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`epc-hero-eyebrow epc-hero-eyebrow-animated ${className}`}
      aria-label={text}
      role="text"
    >
      {/* Orange line track & fill with riding glowing dot */}
      <div className="epc-eyebrow-line-track">
        <motion.span
          className="epc-eyebrow-line-fill"
          variants={lineVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          <span className="epc-eyebrow-laser-head" />
        </motion.span>
      </div>

      {/* Content wrapper with wiped green text & leading thin orange light bar */}
      <div className="epc-eyebrow-content-wrap">
        <motion.span
          className="epc-eyebrow-text-wiped"
          variants={textWipeVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
        >
          {text}
        </motion.span>

        <motion.span
          className="epc-eyebrow-lead-bar"
          variants={leadBarVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
