import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.28,
  ...props
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.1 });

  const handleMove = (e) => {
    if (shouldReduceMotion) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}