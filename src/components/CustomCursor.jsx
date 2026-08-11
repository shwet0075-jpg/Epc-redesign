import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Selector for anything that should trigger the magnetic + growth effect.
// Add data-cursor="magnetic" to any custom element you want included.
const MAGNETIC_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="magnetic"]';

// Input elements get a tighter, more precise cursor behavior
const INPUT_SELECTOR = 'input, textarea, select';

export default function CustomCursor() {
  // Use refs instead of useState for hover/press to avoid re-renders on every interaction
  const enabledRef = useRef(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef(null);
  const pulseTimeoutRef = useRef(null);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows almost instantly — extremely tight spring for precise tracking
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 50, mass: 0.12 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 50, mass: 0.12 });

  // Ring trails behind with a responsive spring — fast enough to feel connected,
  // loose enough to convey fluid inertia. Significantly faster than original.
  const ringX = useSpring(mouseX, { stiffness: 500, damping: 30, mass: 0.35 });
const ringY = useSpring(mouseY, { stiffness: 500, damping: 30, mass: 0.35 });

  // Direct DOM class manipulation — zero React re-renders
  const setHoverState = useCallback((hovering, isInput) => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    if (hovering) {
      ring.classList.add('is-hovering');
      dot.classList.add('is-hovering');
      if (isInput) {
        ring.classList.add('is-input');
        dot.classList.add('is-input');
      }
    } else {
      ring.classList.remove('is-hovering', 'is-input');
      dot.classList.remove('is-hovering', 'is-input');
    }
  }, []);

  const setPressedState = useCallback((pressed) => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    if (pressed) {
      ring.classList.add('is-pressed');
      dot.classList.add('is-pressed');
    } else {
      ring.classList.remove('is-pressed');
      dot.classList.remove('is-pressed');

      // Trigger a brief click-pulse on release for feedback
      ring.classList.add('is-click-pulse');
      dot.classList.add('is-click-pulse');
      clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = setTimeout(() => {
        ring?.classList.remove('is-click-pulse');
        dot?.classList.remove('is-click-pulse');
      }, 160);
    }
  }, []);

  useEffect(() => {
    // Only enable on devices with a real mouse (skip touch/coarse pointers)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return undefined;
    enabledRef.current = true;

    // Force initial render to show cursor elements
    if (dotRef.current) dotRef.current.style.display = '';
    if (ringRef.current) ringRef.current.style.display = '';

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      const magnet = targetRef.current;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Distance-weighted pull — stronger when closer, weaker when far
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxPull = 0.38;
        const minPull = 0.12;
        const pullRadius = Math.max(rect.width, rect.height) * 1.2;
        const pull = dist < pullRadius
          ? maxPull - (maxPull - minPull) * (dist / pullRadius)
          : minPull;

        ringX.set(cx + dx * (1 - pull));
        ringY.set(cy + dy * (1 - pull));
      }
    };

    const handleOver = (e) => {
      const el = e.target.closest(MAGNETIC_SELECTOR);
      if (el) {
        targetRef.current = el;
        const isInput = !!el.matches(INPUT_SELECTOR);
        setHoverState(true, isInput);
      }
    };

    const handleOut = (e) => {
      const el = e.target.closest(MAGNETIC_SELECTOR);
      if (el && el === targetRef.current) {
        targetRef.current = null;
        setHoverState(false, false);
      }
    };

    const handleDown = () => setPressedState(true);
    const handleUp = () => setPressedState(false);
    const handleLeaveWindow = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mouseout', handleOut, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseleave', handleLeaveWindow);
      clearTimeout(pulseTimeoutRef.current);
    };
  }, [mouseX, mouseY, ringX, ringY, setHoverState, setPressedState]);

  return (
    <>
      {/* Tight glowing dot — true cursor position */}
      <motion.div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ left: dotX, top: dotY }}
      />

      {/* Trailing ring — magnetically pulled toward hovered elements */}
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
