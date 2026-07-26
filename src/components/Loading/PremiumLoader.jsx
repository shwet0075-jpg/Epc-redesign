import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoaderBackground from "./LoaderBackground";
import LoaderLogo from "./LoaderLogo";
import LoaderStatus from "./LoaderStatus";
import LoaderProgress from "./LoaderProgress";

const STATUSS = [
  { value: 8, text: "Initializing Infrastructure..." },
  { value: 22, text: "Loading Fire Safety Systems..." },
  { value: 42, text: "Connecting Security Network..." },
  { value: 62, text: "Building Automation Systems..." },
  { value: 82, text: "Configuring Data Centre Solutions..." },
  { value: 100, text: "Infrastructure Ready" },
];

// Natural (non-linear) progress values
const PROGRESS_STEPS = [
  0,
  3,
  7,
  12,
  18,
  26,
  34,
  43,
  55,
  68,
  79,
  88,
  94,
  97,
  100,
];

export default function PremiumLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(STATUSS[0].text);
  const [closing, setClosing] = useState(false);

  // Progress engine
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      if (index >= PROGRESS_STEPS.length) {
        clearInterval(interval);

        // Give users a moment to see "Infrastructure Ready"
        setTimeout(() => {
          setClosing(true);

          // Match loaderFadeOut animation duration
          setTimeout(() => {
            onComplete?.();
          }, 700);
        }, 300);

        return;
      }

      const value = PROGRESS_STEPS[index];

      setProgress(value);

      const current =
        [...STATUSS]
          .reverse()
          .find((s) => value >= s.value) || STATUSS[0];

      setStatus(current.text);
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!closing ? (
        <motion.div
          className="loader-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoaderBackground />

          <div className="loader-content">
            <LoaderLogo />

            <LoaderStatus status={status} />

            <LoaderProgress progress={progress} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="loader-bg loader-bg--exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <LoaderBackground />

          <div className="loader-content">
            <LoaderLogo />

            <LoaderStatus status="Infrastructure Ready" />

            <LoaderProgress progress={100} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}