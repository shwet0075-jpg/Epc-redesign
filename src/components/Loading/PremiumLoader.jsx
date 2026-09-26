import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import LoaderLogo from "./LoaderLogo";

/**
 * Prudent EPC — Cinematic Brand & Motion.dev Loading Line Reveal
 * 
 * Choreography Narrative:
 * Phase 1 (0.0s – 2.6s) [logo]: Envato 3D Studio Chevron assembly, lens flare, typography reveal & hold.
 * Phase 2 (2.6s – 2.95s) [fade]: Logo smoothly focuses and fades into the center vertical axis.
 * Phase 3 (2.95s – 3.37s) [draw]: Motion.dev Central Laser Beam extends down the center axis (scaleY: 0 -> 1) with radiant spark beacon.
 * Phase 4 (3.37s – 4.25s) [expand]: Dual shutter panels part horizontally to -102% and +102% with glowing orange & green laser leading edges, revealing the live website beneath.
 * Phase 5 (4.25s+): Complete handover to interactive home screen.
 */
export default function PremiumLoader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("logo"); // "logo" | "fade" | "draw" | "expand"

  useEffect(() => {
    const isHoldMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("hold") === "1";
    if (isHoldMode) return;

    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 250);
      return () => clearTimeout(timer);
    }

    const tFade = setTimeout(() => {
      setPhase("fade");
    }, 2400);

    const tDraw = setTimeout(() => {
      setPhase("draw");
    }, 2750);

    const tExpand = setTimeout(() => {
      setPhase("expand");
    }, 3150);

    const tComplete = setTimeout(() => {
      onComplete?.();
    }, 3950);

    return () => {
      clearTimeout(tFade);
      clearTimeout(tDraw);
      clearTimeout(tExpand);
      clearTimeout(tComplete);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="loader-portal-root">
        <div className="loader-logo-layer">
          <div className="loader-content">
            <LoaderLogo shouldReduceMotion={shouldReduceMotion} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loader-portal-root" aria-hidden={phase === "expand"}>
      {/* Left Shutter Panel (Slides to the left to reveal website) */}
      <motion.div
        className={`line-reveal-panel line-reveal-panel--left ${
          phase === "expand" ? "line-reveal-panel--laser" : ""
        }`}
        initial={{ x: "0%" }}
        animate={phase === "expand" ? { x: "-102%" } : { x: "0%" }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* Right Shutter Panel (Slides to the right to reveal website) */}
      <motion.div
        className={`line-reveal-panel line-reveal-panel--right ${
          phase === "expand" ? "line-reveal-panel--laser" : ""
        }`}
        initial={{ x: "0%" }}
        animate={phase === "expand" ? { x: "102%" } : { x: "0%" }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* Atmospheric Glow Veil during Horizontal Expansion */}
      {phase === "expand" && (
        <motion.div
          className="line-reveal-glow-veil"
          initial={{ opacity: 0.9, scaleX: 1 }}
          animate={{ opacity: 0, scaleX: 3.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}

      {/* Central Vertical Laser Beam (Draw Phase & Flash on Expand) */}
      {(phase === "draw" || phase === "expand") && (
        <motion.div
          className="line-reveal-center-beam"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            phase === "draw"
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 1, opacity: [1, 0.8, 0] }
          }
          transition={
            phase === "draw"
              ? { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.2, ease: "easeOut" }
          }
        >
          {/* Radiant Central Spark Beacon */}
          <motion.div
            className="line-reveal-spark"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "draw"
                ? { scale: [0, 1.5, 1], opacity: [0, 1, 0.95] }
                : { scale: [1, 2.8, 0], opacity: [0.95, 1, 0] }
            }
            transition={
              phase === "draw"
                ? { duration: 0.42, ease: "easeOut" }
                : { duration: 0.25, ease: "easeOut" }
            }
          />
        </motion.div>
      )}

      {/* 3D Studio Logo Layer (Phase 1: Logo & Phase 2: Fade) */}
      {phase !== "expand" && (
        <motion.div
          className="loader-logo-layer"
          initial={{ opacity: 1 }}
          animate={
            phase === "fade" || phase === "draw"
              ? { opacity: 0, scale: 0.95, filter: "blur(6px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="loader-content">
            <LoaderLogo shouldReduceMotion={shouldReduceMotion} />
          </div>
        </motion.div>
      )}
    </div>
  );
}