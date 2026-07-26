import { motion } from "framer-motion";

export default function LoaderBackground() {
  return (
    <>
      {/* Engineering Grid */}
      <div className="loader-grid" />

      {/* Green Glow */}
      <motion.div
        className="loader-glow loader-glow-green"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orange Glow */}
      <motion.div
        className="loader-glow loader-glow-orange"
        animate={{
          x: [0, -25, 30, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.94, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Engineering Lines */}
      <svg
        className="loader-lines"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="120"
          y1="220"
          x2="420"
          y2="220"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.line
          x1="420"
          y1="220"
          x2="620"
          y2="380"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.circle
          cx="420"
          cy="220"
          r="5"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <motion.circle
          cx="620"
          cy="380"
          r="5"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />
      </svg>

      {/* Noise */}
      <div className="loader-noise" />
    </>
  );
}