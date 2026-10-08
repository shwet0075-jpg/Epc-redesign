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
import ScreenTextReveal from './animations/ScreenTextReveal';

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

  // Left column (01, 03) comes from left; right column (02, 04) comes from right
  const isLeft = index % 2 === 0;
  const initialX = isLeft ? -85 : 85;
  const initialRotateY = isLeft ? -9 : 9;
  const initialRotateZ = isLeft ? -1.5 : 1.5;
  const staggerDelay = isLeft ? 0.05 : 0.18;

  // Variants for synchronized bi-directional entrance (scroll down & scroll bottom-to-top)
  const wrapperVariants = {
    hidden: {
      opacity: 0,
      x: initialX,
      y: 40,
      scale: 0.94,
      rotateY: initialRotateY,
      rotateZ: initialRotateZ,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.72,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const accentVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: [0, 1, 0.24],
      transition: {
        duration: 0.85,
        delay: staggerDelay + 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const sheenVariants = {
    hidden: { x: '-160%', opacity: 0 },
    visible: {
      x: ['-160%', '240%'],
      opacity: [0, 0.85, 0],
      transition: {
        duration: 0.95,
        delay: staggerDelay + 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imgVariants = {
    hidden: { scale: 1.15, filter: 'brightness(0.92)' },
    visible: {
      scale: 1,
      filter: 'brightness(1)',
      transition: {
        duration: 0.75,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, x: isLeft ? -20 : 20, scale: 0.7 },
    visible: {
      opacity: 0.9,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: staggerDelay + 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: isLeft ? -25 : 25, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: staggerDelay + 0.18,
      },
    },
  };

  const kickerVariants = {
    hidden: { opacity: 0, x: isLeft ? -10 : 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        delay: staggerDelay + 0.22,
        ease: 'easeOut',
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: staggerDelay + 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const blurbVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: staggerDelay + 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: staggerDelay + 0.32,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="solution-card-wrapper"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? false : "visible"}
      viewport={{ once: false, amount: 0.15 }}
      variants={shouldReduceMotion ? undefined : wrapperVariants}
    >
      <motion.article
        className="solution-card-item"
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
        {/* Animated Precision Engineering Top Accent Bar */}
        {!shouldReduceMotion && (
          <motion.div
            className="solution-card-accent-bar"
            variants={accentVariants}
          />
        )}

        {/* Specular Liquid Light Sheen Sweep on Reveal */}
        {!shouldReduceMotion && (
          <motion.div
            className="solution-card-reveal-sheen"
            variants={sheenVariants}
          />
        )}

        <motion.div className="solution-card-image-wrap" layoutId={`sol-img-${path}`}>
          <motion.img
            src={image}
            alt={title}
            className="solution-card-img"
            variants={shouldReduceMotion ? undefined : imgVariants}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: isHovered ? 1.08 : 1,
                  }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="solution-card-overlay" aria-hidden="true" />
          <div className="solution-card-glow" aria-hidden="true" />

          {/* Interactive Mouse Spotlight */}
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

          {/* Animated Watermark Index Number */}
          <motion.span
            className="solution-card-number"
            aria-hidden="true"
            variants={shouldReduceMotion ? undefined : numberVariants}
          >
            {number}
          </motion.span>
        </motion.div>

        <div className="solution-card-content">
          <div className="solution-card-heading">
            <motion.div
              className="solution-card-icon-wrap"
              variants={shouldReduceMotion ? undefined : iconVariants}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { rotate: isHovered ? -8 : 0, scale: isHovered ? 1.08 : 1 }
              }
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <span className="solution-card-icon" aria-hidden="true">
                <Icon />
              </span>
            </motion.div>

            <ScreenTextReveal
              as="span"
              variant="blueprint"
              delay={staggerDelay + 0.12}
              className="solution-card-kicker"
            >
              Solution {number}
            </ScreenTextReveal>
          </div>

          <ScreenTextReveal
            as="h3"
            variant="blueprint"
            delay={staggerDelay + 0.18}
            className="solution-card-title"
          >
            {title}
          </ScreenTextReveal>

          <ScreenTextReveal
            as="p"
            variant="blueprint"
            delay={staggerDelay + 0.24}
            className="solution-card-blurb"
          >
            {blurb}
          </ScreenTextReveal>

          <ScreenTextReveal
            as="div"
            variant="blueprint"
            delay={staggerDelay + 0.3}
            style={{ width: '100%', marginTop: 'auto' }}
          >
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
          </ScreenTextReveal>
        </div>
      </motion.article>
    </motion.div>
  );
}
