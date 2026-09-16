import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Prudent EPC — Okara AI Inspired Kinetic Logo Animation
 * Reference: https://dribbble.com/shots/27287390-Okara-Ai-logo-animation
 * 
 * Choreography:
 * Phase 1 (0.0s – 0.85s): Futuristic Waveform Pulse (sinusoidal frequency dots)
 * Phase 2 (0.85s – 1.65s): Energy Coalescence & Precision Chevron Assembly with Impact Ring
 * Phase 3 (1.65s – 2.55s): Fluid Emblem Translation & Typographic Draw/Reveal
 * Phase 4 (2.55s – 3.2s): Final Balanced Lockup Hold with Liquid Metallic Sheen
 */

const prudentLetters = "Prudent".split("");
const epcLetters = [
  { char: "E", isOrange: true },
  { char: "P", isOrange: false },
  { char: "C", isOrange: false },
];

export default function LoaderLogo({ shouldReduceMotion }) {
  const [phase, setPhase] = useState("wave"); // "wave" -> "assemble" -> "lockup"

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("lockup");
      return;
    }

    const t1 = setTimeout(() => setPhase("assemble"), 850);
    const t2 = setTimeout(() => setPhase("lockup"), 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shouldReduceMotion]);

  // Waveform nodes (7 engineering frequency dots oscillating in sine wave)
  const waveDots = [-3, -2, -1, 0, 1, 2, 3];

  if (shouldReduceMotion) {
    return (
      <div className="okara-loader-lockup static-mode">
        <div className="okara-emblem-wrap">
          <img src="/assets/images/logo.png" alt="Prudent EPC" className="okara-static-logo" />
        </div>
        <div className="okara-type-wrap">
          <h2 className="okara-title">
            <span className="okara-text-prudent">Prudent</span>
            <span className="okara-text-epc">
              <span className="okara-letter-orange">E</span>
              <span className="okara-letter-green">PC</span>
            </span>
          </h2>
        
        </div>
      </div>
    );
  }

  return (
    <div className="okara-loader-container">
      {/* PHASE 1: Sine Waveform Energy Pulse */}
      <AnimatePresence>
        {phase === "wave" && (
          <motion.div
            key="okara-wave"
            className="okara-wave-stage"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              filter: "blur(8px)",
              transition: { duration: 0.35, ease: "easeIn" },
            }}
          >
            <div className="okara-wave-track">
              {waveDots.map((offset, i) => {
                const isCenter = Math.abs(offset) <= 1;
                return (
                  <motion.div
                    key={`dot-${i}`}
                    className={`okara-wave-dot ${isCenter ? "dot-orange" : "dot-green"}`}
                    animate={{
                      y: [-12, 12, -12],
                      scale: [0.85, 1.3, 0.85],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }}
                  />
                );
              })}
            </div>
            <motion.span
              className="okara-wave-label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2 & 3: Logo Assembly + Okara-style Fluid Shift & Wordmark Draw */}
      {phase !== "wave" && (
        <motion.div
          className={`okara-lockup-stage ${phase === "lockup" ? "is-locked" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Emblem Container: Dead center in Phase 2, shifts left in Phase 3 */}
          <motion.div
            className="okara-emblem-box"
            animate={
              phase === "lockup"
                ? { x: -140, scale: 0.95 }
                : { x: 0, scale: 1 }
            }
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Impact Light Pulse when chevrons lock */}
            <motion.div
              className="okara-impact-ring"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: [0.3, 2.2],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 0.75,
                ease: "easeOut",
              }}
            />

            {/* Top-Left Orange Chevron Piece */}
            <motion.div
              className="okara-piece okara-piece--orange"
              initial={{
                x: -50,
                y: -50,
                opacity: 0,
                scale: 1.25,
                rotate: -15,
                filter: "drop-shadow(-8px -8px 12px rgba(240,128,32,0.3))",
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "drop-shadow(0px 0px 0px rgba(240,128,32,0))",
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/assets/images/logo-orange.png"
                alt="Prudent Orange Chevron"
                className="okara-piece-img"
              />
            </motion.div>

            {/* Bottom-Right Green Chevron Piece */}
            <motion.div
              className="okara-piece okara-piece--green"
              initial={{
                x: 50,
                y: 50,
                opacity: 0,
                scale: 1.25,
                rotate: 15,
                filter: "drop-shadow(8px 8px 12px rgba(0,96,48,0.3))",
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "drop-shadow(0px 0px 0px rgba(0,96,48,0))",
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src="/assets/images/logo-green.png"
                alt="Prudent Green Chevron"
                className="okara-piece-img"
              />
            </motion.div>

            {/* Liquid Light Sheen sweep across emblem */}
            <motion.div
              className="okara-emblem-sheen"
              initial={{ x: "-150%", opacity: 0 }}
              animate={{
                x: ["-150%", "200%"],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: 1.1,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </motion.div>

          {/* Typography Container: Draws out to the right as emblem shifts left */}
          <motion.div
            className="okara-typography-box"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={
              phase === "lockup"
                ? {
                    opacity: 1,
                    clipPath: "inset(0 0% 0 0)",
                  }
                : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
            }
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Wordmark: "Prudent EPC" */}
            <div className="okara-title-wrapper">
              <h2 className="okara-title" aria-label="Prudent EPC">
                {/* Prudent group in #006030 */}
                <span className="okara-group okara-group--prudent">
                  {prudentLetters.map((char, index) => (
                    <motion.span
                      key={`prudent-${index}`}
                      className="okara-letter letter-prudent"
                      initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                      animate={
                        phase === "lockup"
                          ? { opacity: 1, y: 0, filter: "blur(0px)" }
                          : {}
                      }
                      transition={{
                        duration: 0.45,
                        delay: 0.05 + index * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* EPC group: E in #F08020, PC in #006030 */}
                <span className="okara-group okara-group--epc">
                  {epcLetters.map((item, index) => (
                    <motion.span
                      key={`epc-${index}`}
                      className={`okara-letter ${item.isOrange ? "letter-orange" : "letter-green"}`}
                      initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                      animate={
                        phase === "lockup"
                          ? { opacity: 1, y: 0, filter: "blur(0px)" }
                          : {}
                      }
                      transition={{
                        duration: 0.45,
                        delay: 0.38 + index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {item.char}
                    </motion.span>
                  ))}
                </span>
              </h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
