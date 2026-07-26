import { motion, useReducedMotion } from "framer-motion";

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  viewportOnce = true,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    "fade-up": {
      hidden: {
        opacity: 0,
        y: 36,
        filter: "blur(8px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },
    },

    "fade-down": {
      hidden: {
        opacity: 0,
        y: -36,
        filter: "blur(8px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },
    },

    "fade-left": {
      hidden: {
        opacity: 0,
        x: 36,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },

    "fade-right": {
      hidden: {
        opacity: 0,
        x: -36,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },

    "scale-in": {
      hidden: {
        opacity: 0,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        scale: 1,
      },
    },

    "zoom-out": {
      hidden: {
        opacity: 0,
        scale: 1.05,
      },
      visible: {
        opacity: 1,
        scale: 1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={{
        willChange: "transform, opacity",
      }}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{
        once: viewportOnce,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={variants[variant] || variants["fade-up"]}
    >
      {children}
    </motion.div>
  );
}