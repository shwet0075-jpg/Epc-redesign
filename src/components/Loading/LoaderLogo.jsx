import { motion } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1];
const premiumEase = [0.22, 1, 0.36, 1];

export default function LoaderLogo({ shouldReduceMotion }) {
  return (
    <div className="loader-brand">
      {/* Symbol Container - Assembles Orange and Green Pieces */}
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
                times: [0, 0.43, 0.6, 1],
                duration: 1.25,
                ease: "easeOut",
              }
        }
      >
        {/* Subtle glow behind joined symbol mark */}
        <motion.div
          className="loader-symbol-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />

        {/* Top-Left Orange Piece */}
        <motion.img
          src="/assets/images/logo-orange.png"
          alt="Prudent EPC Orange Piece"
          className="loader-piece loader-piece-orange"
          initial={
            shouldReduceMotion
              ? { opacity: 0, x: 0, y: 0 }
              : { opacity: 0, x: -140, y: -140 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 0.7, delay: 0.2, ease: smoothEase }
          }
        />

        {/* Bottom-Right Green Piece */}
        <motion.img
          src="/assets/images/logo-green.png"
          alt="Prudent EPC Green Piece"
          className="loader-piece loader-piece-green"
          initial={
            shouldReduceMotion
              ? { opacity: 0, x: 0, y: 0 }
              : { opacity: 0, x: 140, y: 140 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 0.7, delay: 0.2, ease: smoothEase }
          }
        />
      </motion.div>

      {/* Typography Reveal */}
      <div className="loader-text-wrapper">
        <motion.h1
          className="loader-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { delay: 0.85, duration: 0.45, ease: premiumEase }
          }
        >
          PRUDENT EPC
        </motion.h1>

        <motion.p
          className="loader-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { delay: 1.05, duration: 0.4 }
          }
        >
          ENGINEERING INTELLIGENCE
        </motion.p>
      </div>
    </div>
  );
}