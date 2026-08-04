import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-by-word cinematic mask reveal for headings — each word rises up
 * out of a clipped mask instead of the whole line fading as one block.
 * This is the signature heading treatment on most award-winning sites.
 *
 * Usage:
 *   <ScrollText as="h2" text="Some heading text" amount={0.4} />
 */
export default function ScrollText({
  text,
  as: Tag = "span",
  className = "",
  style,
  wordClassName = "",
  stagger = 0.045,
  delay = 0,
  once = true,
  amount = 0.4,
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const word = {
    hidden: {
      opacity: 0,
      y: "100%",
      rotateX: -40,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (shouldReduceMotion) {
    const StaticTag = Tag;
    return (
      <StaticTag className={className} style={style}>
        {text}
      </StaticTag>
    );
  }

  const StaticTag = Tag;

  return (
    <StaticTag className={className} style={{ ...style, perspective: 800 }}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={container}
        style={{ display: "inline" }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <motion.span
              variants={word}
              className={wordClassName}
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </StaticTag>
  );
}