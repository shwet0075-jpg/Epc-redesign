import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Prudent EPC — 3D Studio Logo Reveal
 * Reference: Envato Elements Template T9TMYG8 (https://elements.envato.com/logo-animated-T9TMYG8)
 * 
 * Choreography Breakdown:
 * Phase 1 (0.0s – 1.4s): 3D Extruded Chevron Glide along perspective vector drafting lines with directional floor shadows
 * Phase 2 (1.3s – 2.4s): Center Nexus Impact Snap, Anamorphic Lens Flare burst, and smooth upward Typography Reveal beneath emblem
 * Phase 3 (2.4s – 3.4s): Liquid Specular Sheen sweep across glossy bevels and clean hero rest state
 */

export default function LoaderLogo({ shouldReduceMotion }) {
  const [stage, setStage] = useState("assemble"); // "assemble" -> "locked"

  useEffect(() => {
    if (shouldReduceMotion) {
      setStage("locked");
      return;
    }

    const t1 = setTimeout(() => setStage("locked"), 950);
    return () => clearTimeout(t1);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="envato-loader-container static-mode">
        <div className="envato-emblem-box static-emblem">
          <img src="/assets/images/logo-green2.png" alt="Prudent EPC" className="envato-piece-img" />
          <img src="/assets/images/logo-orange2.png" alt="" className="envato-piece-img" />
        </div>
        <div className="envato-typography-block">
          <h2 className="envato-title">
            <span className="envato-text-prudent">
              <span className="envato-char-green">PRUDENT</span>
            </span>
            <span className="envato-text-epc">
              <span className="envato-letter-orange">E</span>
              <span className="envato-letter-green">PC</span>
            </span>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="envato-loader-container">
      {/* Studio Perspective Floor Grid & Architectural Vector Tracers */}
      <svg
        className="envato-studio-grid"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gridLineFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006030" stopOpacity="0" />
            <stop offset="50%" stopColor="#006030" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#006030" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orangeTracer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F08020" stopOpacity="0" />
            <stop offset="70%" stopColor="#F08020" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F08020" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="greenTracer" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#006030" stopOpacity="0" />
            <stop offset="70%" stopColor="#008844" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Isometric Floor Grid Lines */}
        <g className="envato-grid-lines" opacity="0.6">
          <line x1="200" y1="210" x2="600" y2="440" stroke="url(#gridLineFade)" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="180" y1="290" x2="580" y2="520" stroke="url(#gridLineFade)" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="600" y1="210" x2="200" y2="440" stroke="url(#gridLineFade)" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="620" y1="290" x2="220" y2="520" stroke="url(#gridLineFade)" strokeWidth="1" strokeDasharray="4 6" />
        </g>

        {/* Dynamic Vector Drafting Guides for Chevrons */}
        <motion.path
          d="M260 170 L400 270"
          stroke="url(#orangeTracer)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M540 370 L400 270"
          stroke="url(#greenTracer)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />

        {/* Studio Center Target Reticle */}
        <circle cx="400" cy="270" r="45" stroke="#006030" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.2" />
        <circle cx="400" cy="270" r="85" stroke="#006030" strokeWidth="0.75" strokeDasharray="3 6" opacity="0.1" />
      </svg>

      {/* Main 3D Stage: Centered Vertically & Horizontally */}
      <div className="envato-stage">
        {/* Emblem 3D Isometric Viewport */}
        <motion.div
          className="envato-emblem-box"
          animate={
            stage === "locked"
              ? {
                  scale: [1, 1.05, 1],
                  transition: { duration: 0.45, ease: "easeOut" },
                }
              : {}
          }
        >
          {/* Directional Soft Studio Floor Shadow under the Emblem */}
          <motion.div
            className="envato-floor-shadow"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: stage === "locked" ? 0.35 : 0.15,
              scale: stage === "locked" ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Fusion Shockwave Pulse at Lock Moment */}
          <motion.div
            className="envato-shockwave-ring"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: [0.2, 2.5],
              opacity: [0, 0.85, 0],
            }}
            transition={{
              duration: 0.65,
              delay: 0.92,
              ease: "easeOut",
            }}
          />

          {/* Anamorphic Lens Flare Burst across the Apex */}
          <motion.div
            className="envato-lens-flare"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1.9, 2.4],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.55,
              delay: 0.92,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Radiant Nexus Spark Core */}
          <motion.div
            className="envato-spark-core"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.45,
              delay: 0.92,
              ease: "easeOut",
            }}
          />

          {/* 3D Perspective Chevrons Container */}
          <div className="envato-chevrons-3d">
            {/* Bottom Green Chevron (Behind) */}
            <motion.div
              className="envato-chevron-layer envato-chevron-layer--green"
              initial={{
                x: 130,
                y: 95,
                z: 60,
                rotateX: -32,
                rotateY: 24,
                rotateZ: 18,
                scale: 1.3,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/assets/images/logo-green2.png"
                alt="Green Chevron"
                className="envato-piece-img"
                draggable="false"
              />
            </motion.div>

            {/* Top Orange Chevron (In Front) */}
            <motion.div
              className="envato-chevron-layer envato-chevron-layer--orange"
              initial={{
                x: -130,
                y: -95,
                z: 60,
                rotateX: 32,
                rotateY: -24,
                rotateZ: -18,
                scale: 1.3,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/assets/images/logo-orange2.png"
                alt="Orange Chevron"
                className="envato-piece-img"
                draggable="false"
              />
            </motion.div>
          </div>

          {/* Specular Liquid Metallic Sheen sweep across the assembled glossy logo */}
          <motion.div
            className="envato-emblem-sheen"
            initial={{ x: "-180%", opacity: 0 }}
            animate={{
              x: ["-180%", "240%"],
              opacity: [0, 0.95, 0],
            }}
            transition={{
              duration: 1.0,
              delay: 1.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </motion.div>

        {/* Centered Typography Reveal Below the Emblem — Modern Split-Letter 3D Kinetic Roll & Specular Sheen */}
        <div className="envato-typography-block">
          <h2 className="envato-title">
            <span className="envato-text-prudent">
              {"PRUDENT".split("").map((char, index) => (
                <span key={index} className="envato-char-cell">
                  <motion.span
                    className="envato-char envato-char-green"
                    initial={{
                      y: "115%",
                      opacity: 0,
                      rotateX: 45,
                      filter: "blur(6px)",
                    }}
                    animate={
                      stage === "locked"
                        ? {
                            y: "0%",
                            opacity: 1,
                            rotateX: 0,
                            filter: "blur(0px)",
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.58,
                      delay: 0.05 + index * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>

            <span className="envato-text-epc">
              <span className="envato-char-cell">
                <motion.span
                  className="envato-char envato-letter-orange"
                  initial={{
                    y: "115%",
                    opacity: 0,
                    scale: 0.75,
                    rotateX: 45,
                    filter: "blur(6px)",
                  }}
                  animate={
                    stage === "locked"
                      ? {
                          y: "0%",
                          opacity: 1,
                          scale: 1,
                          rotateX: 0,
                          filter: "blur(0px)",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.58,
                    delay: 0.36,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  E
                </motion.span>
              </span>

              {"PC".split("").map((char, index) => (
                <span key={index} className="envato-char-cell">
                  <motion.span
                    className="envato-char envato-letter-green"
                    initial={{
                      y: "115%",
                      opacity: 0,
                      rotateX: 45,
                      filter: "blur(6px)",
                    }}
                    animate={
                      stage === "locked"
                        ? {
                            y: "0%",
                            opacity: 1,
                            rotateX: 0,
                            filter: "blur(0px)",
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.58,
                      delay: 0.42 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>

            {/* Specular Liquid Light Sheen sweep across typography */}
            <motion.span
              className="envato-title-shimmer"
              initial={{ x: "-180%", opacity: 0 }}
              animate={
                stage === "locked"
                  ? {
                      x: ["-180%", "240%"],
                      opacity: [0, 0.9, 0],
                    }
                  : {}
              }
              transition={{
                duration: 1.05,
                delay: 1.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </h2>

          {/* Precision Architectural Glow Laser Line beneath the title */}
          <motion.div
            className="envato-title-underline"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              stage === "locked"
                ? {
                    scaleX: [0, 1.1, 1],
                    opacity: [0, 0.75, 0.45],
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: "easeOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
