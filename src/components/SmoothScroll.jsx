import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Keeps the site’s scroll response deliberate while allowing every section to
 * fall back to native scrolling for reduced-motion users and narrow screens.
 */
export default function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia('(max-width: 760px)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.82,
    });

    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.off('scroll', update);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return children;
}
