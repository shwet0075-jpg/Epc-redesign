import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLoader } from "../context/LoaderContext";
import { useIsMobile } from "../hooks/useIsMobile";
import MobileTypewriter from "./animations/MobileTypewriter";

/**
 * KK Agro-Inspired Smooth Upward Text Reveal on Desktop,
 * with High-Tech Typewriter Animation on Mobile screens.
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
  const isMobile = useIsMobile(768);
  const shouldReduceMotion = useReducedMotion();
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const content = text !== undefined ? text : children;
  const isShown = isUnveiled && isInView;

  if (shouldReduceMotion) {
    const StaticTag = Tag;
    return (
      <StaticTag className={className} style={style}>
        {content}
      </StaticTag>
    );
  }

  // Mobile-only high-tech typewriter animation
  if (isMobile && typeof content === "string") {
    return (
      <MobileTypewriter
        text={content}
        as={Tag}
        className={className}
        style={style}
        delay={delay}
        once={once}
        amount={amount}
      />
    );
  }

  // Desktop / Laptop: Exact signature 1.1s upward blur reveal curve (100% untouched)
  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      ref={ref}
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
      animate={
        isShown
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: 40,
              filter: "blur(4px)",
            }
      }
      transition={{
        duration,
        delay: isShown ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {content}
    </MotionTag>
  );
}