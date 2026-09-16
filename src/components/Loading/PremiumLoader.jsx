import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import LoaderBackground from "./LoaderBackground";
import LoaderLogo from "./LoaderLogo";

/**
 * Prudent EPC — Okara AI Inspired Kinetic Brand Loader
 * Complete narrative: Waveform Energy -> Chevron Assembly -> Fluid Shift & Typographic Draw -> Site Reveal
 */
export default function PremiumLoader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // 3.4s allows the complete Okara AI narrative sequence and lockup hold to play gracefully
    const duration = shouldReduceMotion ? 300 : 3400;
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      key="premium-loader-screen"
      className="loader-bg"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <LoaderBackground />

      <div className="loader-content">
        <LoaderLogo shouldReduceMotion={shouldReduceMotion} />
      </div>
    </motion.div>
  );
}