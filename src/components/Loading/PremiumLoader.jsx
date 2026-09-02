import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import LoaderBackground from "./LoaderBackground";
import LoaderLogo from "./LoaderLogo";

export default function PremiumLoader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Natural animation timeline tuned to logo assembly completion (~2.1s)
    const duration = shouldReduceMotion ? 300 : 2100;
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
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
    >
      <LoaderBackground />

      <div className="loader-content">
        <LoaderLogo shouldReduceMotion={shouldReduceMotion} />
      </div>
    </motion.div>
  );
}