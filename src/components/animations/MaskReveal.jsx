import { motion } from "framer-motion";

const MaskReveal = ({
  children,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.3,
}) => {
  return (
    <motion.div
      initial={{
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        filter: "blur(12px)",
        scale: 1.08,
      }}
      whileInView={{
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        overflow: "hidden",
        willChange: "clip-path, transform, filter",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MaskReveal;