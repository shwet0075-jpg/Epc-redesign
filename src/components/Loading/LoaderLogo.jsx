import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";

const easeOutSoft = [0.22, 1, 0.36, 1];

const prudentLetters = "Prudent".split("");
const epcLetters = [
  { char: "E", isOrange: true },
  { char: "P", isOrange: false },
  { char: "C", isOrange: false },
];

export default function LoaderLogo({ shouldReduceMotion }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion || !textRef.current) return;

    const letters = textRef.current.querySelectorAll(".loader-letter");
    if (!letters.length) return;

    const anim = animate(letters, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50, { start: 400 }),
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });

    return () => {
      if (anim) {
        if (typeof anim.pause === "function") anim.pause();
        if (typeof anim.revert === "function") anim.revert();
      }
    };
  }, [shouldReduceMotion]);

  return (
    <div className="loader-brand">
      {/* Symbol Container - Assembles Orange & Green Pieces */}
      <motion.div
        className="loader-logo-assembly"
        animate={
          shouldReduceMotion
            ? { scale: 1 }
            : { scale: [1, 1, 1.05, 1] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                times: [0, 0.45, 0.65, 1],
                duration: 2.2,
                ease: "easeOut",
              }
        }
      >
        {/* Refined "Systems Online" Radial Light Impact Pulse */}
        <motion.div
          className="loader-impact-pulse"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  scale: [0.3, 2.3],
                  opacity: [0, 0.85, 0],
                }
          }
          transition={{
            delay: 1.7,
            duration: 0.8,
            ease: "easeOut",
          }}
        />

        {/* Top-Left Orange Piece with Motion Trail Glow */}
        <motion.div
          className="loader-piece-wrapper loader-piece-orange-wrapper"
          initial={
            shouldReduceMotion
              ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0, filter: "drop-shadow(0px 0px 0px rgba(240,128,32,0))" }
              : { opacity: 0, x: "-55vw", y: "-55vh", scale: 1.28, rotate: -12, filter: "drop-shadow(-16px -16px 20px rgba(240,128,32,0.65))" }
          }
          animate={{
            opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
            filter: "drop-shadow(0px 0px 0px rgba(240,128,32,0))",
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 1.5, delay: 0.3, ease: easeOutSoft }
          }
        >
          <img
            src="/assets/images/logo-orange.png"
            alt="Prudent EPC Orange Symbol Piece"
            className="loader-piece loader-piece-orange"
          />
        </motion.div>

        {/* Bottom-Right Green Piece with Motion Trail Glow */}
        <motion.div
          className="loader-piece-wrapper loader-piece-green-wrapper"
          initial={
            shouldReduceMotion
              ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0, filter: "drop-shadow(0px 0px 0px rgba(0,96,48,0))" }
              : { opacity: 0, x: "55vw", y: "55vh", scale: 1.28, rotate: 12, filter: "drop-shadow(16px 16px 20px rgba(0,96,48,0.65))" }
          }
          animate={{
            opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
            filter: "drop-shadow(0px 0px 0px rgba(0,96,48,0))",
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 1.5, delay: 0.3, ease: easeOutSoft }
          }
        >
          <img
            src="/assets/images/logo-green.png"
            alt="Prudent EPC Green Symbol Piece"
            className="loader-piece loader-piece-green"
          />
        </motion.div>
      </motion.div>

      {/* Typography with Character Bounce & Spin Animation */}
      <div className="loader-text-wrapper" ref={textRef}>
        <h2 className="loader-title text-xl" aria-label="Prudent EPC">
          {/* Prudent Stagger Group (#006030) */}
          <span className="loader-title-group loader-title-prudent">
            {prudentLetters.map((char, index) => (
              <span
                key={`prudent-${index}`}
                className="loader-letter letter-prudent"
              >
                {char}
              </span>
            ))}
          </span>

          {/* EPC Stagger Group (E: #F08020, PC: #006030) */}
          <span className="loader-title-group loader-title-epc">
            {epcLetters.map((item, index) => (
              <span
                key={`epc-${index}`}
                className={`loader-letter ${
                  item.isOrange ? "letter-orange" : "letter-green"
                }`}
              >
                {item.char}
              </span>
            ))}
          </span>
        </h2>
      </div>
    </div>
  );
}




