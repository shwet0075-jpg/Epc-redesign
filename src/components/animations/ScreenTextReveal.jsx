import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLoader } from "../../context/LoaderContext";

/**
 * Screen-Specific Kinetic Text & Card Micro-Reveal Animations
 * Tailored for small & medium texts, badges, pills, and descriptions.
 * 
 * Variants:
 * - "milestone": Staggered archive slide & badge glow (About Timeline)
 * - "executive": 3D perspective credentials & line accent (About Director)
 * - "blueprint": High-tech line wipe & badge glide (Solutions cards)
 * - "kinetic": Smooth directional flow with soft blur (Home cards)
 * - "matrix": Cascading vector unmask (Services features)
 * - "focus": Depth defocus-to-sharpness reveal (Clients & Gallery)
 * - "elevation": Clean spring lift with soft shadow (Career & Contact)
 * 
 * Works bidirectionally (triggers both scrolling DOWN and scrolling UP).
 */

const variantsConfig = {
  milestone: {
    hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  },
  executive: {
    hidden: { opacity: 0, x: -20, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
  blueprint: {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
    },
  },
  kinetic: {
    hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  matrix: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  focus: {
    hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
    },
  },
  elevation: {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export default function ScreenTextReveal({
  children,
  as = "div",
  variant = "milestone",
  delay = 0,
  className = "",
  style,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;
  const Tag = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={style}>
        {children}
      </StaticTag>
    );
  }

  const selectedVariant = variantsConfig[variant] || variantsConfig.milestone;

  return (
    <Tag
      className={`screen-reveal-wrap ${className}`}
      style={{ willChange: "transform, opacity, filter", ...style }}
      initial="hidden"
      whileInView={isUnveiled ? "visible" : "hidden"}
      viewport={{ once: false, amount }}
      variants={{
        hidden: selectedVariant.hidden,
        visible: {
          ...selectedVariant.visible,
          transition: {
            ...selectedVariant.visible.transition,
            delay: delay > 0 ? delay : 0,
          },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggered container for badges, chips, pills, and card lists.
 */
export function ScreenTextStagger({
  children,
  as = "div",
  variant = "milestone",
  stagger = 0.08,
  delayChildren = 0,
  className = "",
  style,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;
  const Tag = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={style}>
        {children}
      </StaticTag>
    );
  }

  const selectedVariant = variantsConfig[variant] || variantsConfig.milestone;
  const items = Array.isArray(children) ? children : [children];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <Tag
      className={`screen-stagger-wrap ${className}`}
      style={style}
      initial="hidden"
      whileInView={isUnveiled ? "visible" : "hidden"}
      viewport={{ once: false, amount }}
      variants={containerVariants}
    >
      {items.map((child, idx) => (
        <motion.div
          key={child?.key ?? idx}
          variants={selectedVariant}
          style={{ willChange: "transform, opacity" }}
        >
          {child}
        </motion.div>
      ))}
    </Tag>
  );
}
