import React from "react";
import OlympicTextReveal from "./animations/OlympicTextReveal";
import { useReducedMotion } from "framer-motion";

/**
 * Prudent EPC — Olympic.no Exact 3D Text Reveal
 * Reference: https://www.olympic.no/
 * 
 * Reveals seamlessly on scrolling DOWN and re-reveals on scrolling UP.
 */
export default function ScrollText({
  text,
  children,
  as = "div",
  type = "lines", // "lines" | "words"
  className = "",
  style,
  delay = 0,
  stagger = null,
  amount = 0.15,
}) {
  const shouldReduceMotion = useReducedMotion();
  const content = text !== undefined ? text : children;
  const Tag = as || "div";

  if (shouldReduceMotion) {
    const StaticTag = Tag;
    return (
      <StaticTag className={className} style={style}>
        {content}
      </StaticTag>
    );
  }

  // Convert fractional delay (e.g. 0.1s -> 100ms) to integer ms if needed
  const delayMs = typeof delay === "number" && delay < 10 ? Math.round(delay * 1000) : delay;

  return (
    <OlympicTextReveal
      text={text}
      as={Tag}
      type={type}
      className={`scroll-text-olympic ${className}`}
      style={style}
      delay={delayMs}
      stagger={stagger}
      threshold={amount}
    >
      {children}
    </OlympicTextReveal>
  );
}