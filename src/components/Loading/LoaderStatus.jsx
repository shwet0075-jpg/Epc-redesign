import { AnimatePresence, motion } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1];

export default function LoaderStatus({ status }) {
  return (
    <div className="loader-status-wrapper">
      <AnimatePresence mode="wait">
        <motion.p
          key={status}
          className="loader-status"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.35,
            ease: premiumEase,
          }}
        >
          {status}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}