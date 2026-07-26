import { motion } from "framer-motion";

const SEGMENTS = 20;

export default function LoaderProgress({ progress }) {
  const active = Math.round((progress / 100) * SEGMENTS);

  return (
    <div className="loader-progress">

      <div className="loader-progress-track">
        {[...Array(SEGMENTS)].map((_, index) => (
          <motion.div
            key={index}
            className={`loader-segment ${
              index < active ? "active" : ""
            }`}
            layout
            transition={{
              duration: 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="loader-percent"
        key={progress}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
      >
        {progress}%
      </motion.div>

    </div>
  );
}