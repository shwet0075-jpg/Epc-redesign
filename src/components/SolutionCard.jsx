import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { FiArrowUpRight, FiCpu, FiServer, FiShield, FiVideo } from 'react-icons/fi';

const solutionIcons = [FiShield, FiVideo, FiServer, FiCpu];

export default function SolutionCard({ title, blurb, image, path, index }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = solutionIcons[index] || FiCpu;
  const number = String(index + 1).padStart(2, '0');
  const [isHovered, setIsHovered] = useState(false);

  // Pointer-driven 3D tilt + a cursor-following spotlight, spring-smoothed
  // so it feels weighted rather than snapping straight to the cursor.
  // Applied via motion values/inline style so it works regardless of
  // whatever global CSS already targets these class names.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.16), transparent 70%)`;

  const handleMouseMove = (event) => {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    spotX.set(px * 100);
    spotY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      className="solution-card-item"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.52, delay: shouldReduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.015 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 1200,
            }
      }
    >
      <div className="solution-card-image-wrap">
        <motion.img
          src={image}
          alt={title}
          className="solution-card-img"
          animate={shouldReduceMotion ? undefined : { scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="solution-card-overlay" aria-hidden="true" />
        <div className="solution-card-glow" aria-hidden="true" />
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: spotlight,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity .3s ease',
              pointerEvents: 'none',
            }}
          />
        )}
        <span className="solution-card-number" aria-hidden="true">{number}</span>
      </div>

      <div className="solution-card-content">
        <div className="solution-card-heading">
          <motion.div
            className="solution-card-icon-wrap"
            animate={shouldReduceMotion ? undefined : { rotate: isHovered ? -8 : 0, scale: isHovered ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <span className="solution-card-icon" aria-hidden="true">
              <Icon />
            </span>
          </motion.div>
          <span className="solution-card-kicker">Solution {number}</span>
        </div>
        <h3 className="solution-card-title">{title}</h3>
        <p>{blurb}</p>
        <Link to={path} className="solution-card-link">
          Explore solution
          <motion.span
            style={{ display: 'inline-flex' }}
            animate={shouldReduceMotion ? undefined : { x: isHovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FiArrowUpRight aria-hidden="true" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}
