export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeDown = {
  hidden: {
    opacity: 0,
    y: -32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ==========================================================
   3D / depth reveal variants
   Same hidden/visible shape as the ones above, so they drop
   straight into ScrollReveal wherever fadeUp/fadeScale are used —
   just with rotation and perspective for a real depth entrance.
========================================================== */

// Tips up out of the page as if hinged at the bottom edge.
export const tiltUp3D = {
  hidden: {
    opacity: 0,
    y: 48,
    rotateX: -18,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 1000,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Swings in from the side on the Y axis, like a card turning to face you.
export const swingLeft3D = {
  hidden: {
    opacity: 0,
    x: -60,
    rotateY: 24,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transformPerspective: 1000,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const swingRight3D = {
  hidden: {
    opacity: 0,
    x: 60,
    rotateY: -24,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transformPerspective: 1000,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Rises from depth — starts small/back, scales/rotates up to full size.
export const riseFromDepth3D = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.88,
    rotateX: 12,
    transformPerspective: 1200,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transformPerspective: 1200,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Soft blur-in, good paired with fadeUp for hero/eyebrow text so it
// reads as "coming into focus" rather than just sliding.
export const blurIn = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 16,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Wraps any of the variants above with staggerChildren, for a
 * parent container whose children each use one of the variants.
 */
export function withStagger(variant, stagger = 0.12) {
  return {
    hidden: variant.hidden,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        staggerChildren: stagger,
      },
    },
  };
}