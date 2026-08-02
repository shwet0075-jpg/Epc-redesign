import { useEffect } from "react";
import {
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * Original vertical scroll-parallax hook — signature and behaviour
 * unchanged, still the default for simple background/image drift.
 */
export function useParallax(speed = 80) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  return y;
}

/**
 * Same idea, horizontal axis — for elements that should drift
 * sideways as the page scrolls (wide banners, offset image rows).
 */
export function useParallaxX(speed = 80) {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, speed]);
  return x;
}

/**
 * Scroll-linked scale + fade, useful for a "recede into depth" effect
 * on hero media or section backgrounds as the user scrolls past them.
 */
export function useParallaxDepth({ scaleRange = [1, 1.12], opacityRange = [1, 0.4] } = {}) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);
  return { scale, opacity };
}

/**
 * Element-scoped scroll parallax — pass a ref and it maps that
 * element's own scroll progress (as it enters/leaves the viewport)
 * to a translateY range, instead of the whole page's progress.
 * Use for cards/images inside a section rather than full-bleed layers.
 */
export function useScrollParallax(targetRef, { range = [-40, 40], offset = ["start end", "end start"] } = {}) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset });
  const y = useTransform(scrollYProgress, [0, 1], range);
  return y;
}

/**
 * Mouse-driven 3D tilt (rotateX/rotateY) with spring smoothing —
 * pass the returned style straight onto a motion element wrapped in
 * a `perspective` container to get a true depth-tilt-on-hover effect.
 */
export function useTilt3D({ max = 10, stiffness = 150, damping = 18 } = {}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness, damping });
  const springY = useSpring(rotateY, { stiffness, damping });

  const onMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    style: { rotateX: springX, rotateY: springY, transformPerspective: 900 },
    handlers: { onMouseMove, onMouseLeave },
  };
}

/**
 * Viewport-wide mouse parallax (as opposed to useTilt3D's
 * per-element tilt) — tracks the window, not a single element.
 * Useful for ambient background layers like EngineeringBackground.
 */
export function useMouseParallax(strength = 24) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const y = useSpring(mouseY, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * strength);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * strength);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, strength]);

  return { x, y };
}