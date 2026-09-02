import { motion, useReducedMotion } from "framer-motion";
import { revealVariants } from "./ScrollReveal";

/**
 * Staggered group entrance — wraps an array of children (e.g. the result
 * of an .map()) and cascades them in one-by-one using the same variant
 * vocabulary as <ScrollReveal>, instead of hand-rolled per-item delays.
 *
 * Usage:
 *   <ScrollStagger variant="rise-3d" stagger={0.12} style={{...}}>
 *     {items.map((item) => <Card key={item.id} {...item} />)}
 *   </ScrollStagger>
 */
export default function ScrollStagger({
  children,
  variant = "fade-up",
  stagger = 0.08,
  delayChildren = 0,
  duration = 0.7,
  className = "",
  style,
  viewportOnce = false,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();
  const childVariant = revealVariants[variant] || revealVariants["fade-up"];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className={className}
      style={style}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: viewportOnce, amount }}
      variants={container}
    >
      {items.map((child, i) => (
        <motion.div
          key={child?.key ?? i}
          variants={childVariant}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}