import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function ContinuityThread() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <div className="continuity-thread" aria-hidden="true">
    <span className="continuity-thread__rail" />
    <motion.span className="continuity-thread__progress" style={{ scaleY }} />
    <motion.i className="continuity-thread__node" animate={reduced ? undefined : { y: [0, 18, 0], opacity: [.65, 1, .65] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} />
  </div>;
}
