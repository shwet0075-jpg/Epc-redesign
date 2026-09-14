import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Premium Hero Eyebrow Reveal Animation
 * 
 * Signature reveal choreography:
 * 1. Precision Laser Draw: The orange accent line expands from width 0 to full width,
 *    spearheaded by a luminous glowing laser head.
 * 2. 3D Perspective Word Mask Reveal: "SINCE", "2019", "ENGINEERING", "EXCELLENCE"
 *    rise up through clipped perspective masks with kinetic stagger, optical blur clearance,
 *    and smooth deceleration.
 * 3. Engineering Beacon Core: The separator dot springs in with dynamic scale and features
 *    a continuous radar ping pulse radiating outward.
 * 4. Metallic Light Sweep: A high-end liquid light sheen glides across the revealed text
 *    upon entry and on interactive hover.
 * 5. Full reduced motion & screen reader accessibility support.
 */
export default function HeroEyebrow({
  text = 'SINCE 2019 • ENGINEERING EXCELLENCE',
  className = '',
  delay = 0.05,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [hoverTrigger, setHoverTrigger] = useState(0);

  // Static accessible fallback if user prefers reduced motion
  if (shouldReduceMotion) {
    return (
      <div className={`epc-hero-eyebrow epc-hero-eyebrow-animated ${className}`} aria-label={text}>
        <span className="epc-eyebrow-line-static" />
        <span className="epc-eyebrow-text-static">{text}</span>
      </div>
    );
  }

  // Tokenize string into words and separator dot
  const parts = text.split(/(\s*•\s*|\s+)/).filter(Boolean);
  const tokens = [];

  parts.forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;
    if (trimmed === '•') {
      tokens.push({ type: 'dot', value: '•' });
    } else {
      tokens.push({ type: 'word', value: trimmed });
    }
  });

  // Orchestrated motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '120%',
      opacity: 0,
      rotateX: -35,
      filter: 'blur(5px)',
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 420,
        damping: 18,
      },
    },
  };

  const shimmerVariants = {
    hidden: {
      x: '-120%',
      opacity: 0,
    },
    visible: {
      x: ['-120%', '220%'],
      opacity: [0, 0.85, 0],
      transition: {
        duration: 1.15,
        delay: delay + 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={`epc-hero-eyebrow epc-hero-eyebrow-animated ${className}`}
      variants={containerVariants}
      onHoverStart={() => setHoverTrigger((c) => c + 1)}
      aria-label={text}
      role="text"
    >
      {/* Precision Engineered Drawing Line with Laser Head */}
      <div className="epc-eyebrow-line-track">
        <motion.span
          className="epc-eyebrow-line-fill"
          variants={lineVariants}
          style={{ transformOrigin: 'left center' }}
        >
          <span className="epc-eyebrow-laser-head" />
        </motion.span>
      </div>

      {/* Words and Beacon Reveal in Perspective Mask */}
      <div className="epc-eyebrow-content-wrap">
        {tokens.map((token, index) => {
          if (token.type === 'dot') {
            return (
              <span key={`dot-${index}`} className="epc-eyebrow-dot-mask">
                <motion.span
                  className="epc-eyebrow-beacon"
                  variants={dotVariants}
                >
                  <span className="epc-eyebrow-beacon-core" />
                  <span className="epc-eyebrow-beacon-ping" />
                </motion.span>
              </span>
            );
          }

          return (
            <span key={`word-${index}-${token.value}`} className="epc-eyebrow-word-mask">
              <motion.span
                className="epc-eyebrow-word"
                variants={wordVariants}
              >
                {token.value}
              </motion.span>
            </span>
          );
        })}

        {/* Award-winning metallic light sweep across revealed eyebrow */}
        <motion.span
          key={`shimmer-${hoverTrigger}`}
          className="epc-eyebrow-shimmer"
          variants={shimmerVariants}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
