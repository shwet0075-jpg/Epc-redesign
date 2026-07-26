import { useScroll, useTransform } from "framer-motion";

export function useParallax(speed = 80) {
  const { scrollYProgress } = useScroll();

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, speed]
  );

  return y;
}