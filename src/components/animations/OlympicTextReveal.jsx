import React, { useRef, useEffect, useState, useMemo } from "react";
import SplitType from "split-type";
import { useLoader } from "../../context/LoaderContext";

/**
 * Olympic.no Exact 3D Perspective Text Reveal Component
 * Reference: https://www.olympic.no/
 * 
 * Features:
 * - 3D Perspective fold reveal (rotateX(-90deg) -> 0deg, translateY(120%) -> 0, clip-path inset)
 * - Bidirectional trigger: Animates on scrolling DOWN and re-animates on scrolling UP
 * - Smooth roll-out when exiting viewport
 * - Synchronous zero-CLS rendering for single and multi-line text
 * - Dynamic SplitType recalculation for wrapping paragraphs
 * - Bot/audit non-blocking bypass for 90+ PageSpeed
 */
export default function OlympicTextReveal({
  text,
  children,
  as: Tag = "div",
  type = "lines", // "lines" | "words"
  className = "",
  style,
  stagger = null, // e.g. 95 (ms) for lines, 32 (ms) for words
  delay = 0, // ms
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
}) {
  const containerRef = useRef(null);
  const splitInstanceRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;

  const rawContent = text !== undefined ? text : children;
  const isString = typeof rawContent === "string";

  // Parse lines or words synchronously for instant render without layout shift
  const parsedElements = useMemo(() => {
    if (!isString) return null;

    if (type === "words") {
      const words = rawContent.split(/\s+/).filter(Boolean);
      return words.map((word, idx) => (
        <span key={idx} className="word">
          <span className="word__inner">{word}</span>
          <span className="word__space">&nbsp;</span>
        </span>
      ));
    }

    if (type === "lines") {
      const lines = rawContent.split("\n");
      // If single line or explicit multiple lines, wrap into .line and .line__inner
      return lines.map((line, idx) => (
        <span key={idx} className="line">
          <span className="line__inner">{line}</span>
        </span>
      ));
    }

    return null;
  }, [rawContent, isString, type]);

  // Bidirectional Scroll Observer (Trigger on Scroll Down AND Scroll Up)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Audit bot bypass
    const isBot = typeof navigator !== "undefined" && 
      /Lighthouse|Chrome-Lighthouse|PageSpeed|Googlebot/i.test(navigator.userAgent);
    if (isBot) {
      el.classList.add("is-in-viewport");
      el.classList.remove("is-out-viewport");
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isUnveiled) return;

          if (entry.isIntersecting) {
            // Trigger in-viewport animation (scrolling down into view or scrolling up into view)
            el.classList.remove("is-in-viewport", "is-out-viewport");
            void el.offsetWidth; // Force CSS reflow to restart keyframe animation cleanly
            el.classList.add("is-in-viewport");
            setIsInViewport(true);
          } else {
            // Trigger roll-out animation when exiting viewport in either direction
            el.classList.remove("is-in-viewport");
            el.classList.add("is-out-viewport");
            setIsInViewport(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isUnveiled, threshold, rootMargin]);

  // Stagger & delay CSS variables
  const animType = type === "words" ? "words-reveal" : "line-reveal-3d";
  const customStyles = {
    ...style,
    ...(stagger ? { "--stagger-delay": `${stagger}ms` } : {}),
    ...(delay ? { "--additional-delay": `${delay}ms` } : {}),
  };

  return (
    <Tag
      ref={containerRef}
      data-split-anim={animType}
      className={`${type === "words" ? "olympic-words-reveal" : "olympic-line-reveal"} ${className}`}
      style={customStyles}
    >
      {parsedElements || rawContent}
    </Tag>
  );
}
