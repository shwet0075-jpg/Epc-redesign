import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import LoaderBackground from "./LoaderBackground";
import LoaderLogo from "./LoaderLogo";

export default function PremiumLoader({ onComplete }) {
  const [closing, setClosing] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Natural animation timeline (adjusted for slower, cinematic presentation)
    const exitTimer = setTimeout(() => {
      setClosing(true);
    }, 4200);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 4800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!closing ? (
        <motion.div
          key="loader-active"
          className="loader-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        >
          <LoaderBackground />

          <div className="loader-content">
            <LoaderLogo shouldReduceMotion={shouldReduceMotion} />
          </div>

        </motion.div>
      ) : (
        <motion.div
          key="loader-exiting"
          className="loader-bg loader-bg--exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <LoaderBackground />

          <div className="loader-content">
            <LoaderLogo shouldReduceMotion={shouldReduceMotion} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}