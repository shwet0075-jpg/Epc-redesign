import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import LoaderBackground from "./LoaderBackground";
import LoaderLogo from "./LoaderLogo";

export default function PremiumLoader({ onComplete }) {
  const [closing, setClosing] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Start exit transition after logo is fully assembled and presented (~1.5s)
    const exitTimer = setTimeout(() => {
      setClosing(true);
    }, 1500);

    // Complete loader lifecycle and mount website (~2.1s)
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 2100);

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
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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