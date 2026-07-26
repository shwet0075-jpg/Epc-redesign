import { motion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.transform = "translate(0px,0px)";
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}