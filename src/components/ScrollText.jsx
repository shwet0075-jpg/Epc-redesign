import { motion, useReducedMotion } from "framer-motion";

/**
 * KK Agro-Inspired Smooth Upward Text Reveal
 * Signature Treatment: translateY(40px) -> 0, opacity 0 -> 1, 1.1s duration,
 * with luxurious [0.16, 1, 0.3, 1] cubic-bezier deceleration curve.
 *
 * Usage:
 *   <ScrollText as="h2" text="Some heading text" />
 *   <ScrollText as="h1">Header with <span>Accent</span></ScrollText>
 */
export default function ScrollText({
  text,
  children,
  as: Tag = "span",
  className = "",
  style,
  delay = 0,
  duration = 1.1,
  once = false,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();
  const content = text !== undefined ? text : children;

  if (shouldReduceMotion) {
    const StaticTag = Tag;
    return (
      <StaticTag className={className} style={style}>
        {content}
      </StaticTag>
    );
  }

  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      className={className}
      style={{
        ...style,
        willChange: "transform, opacity, filter",
      }}
      initial={{
        opacity: 0,
        y: 40,
        filter: "blur(4px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {content}
    </MotionTag>
  );
}