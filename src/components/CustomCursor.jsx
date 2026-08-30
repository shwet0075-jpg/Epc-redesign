import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Selector for anything that should trigger the magnetic + growth effect.
// Add data-cursor="magnetic" to any custom element you want included.
const MAGNETIC_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="magnetic"]';

// Input elements get a tighter, more precise cursor behavior
const INPUT_SELECTOR = 'input, textarea, select';

export default function CustomCursor() {
  const enabledRef = useRef(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef(null);
  const pulseTimeoutRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Raw mouse position — instant 1:1 hardware tracking with zero latency
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-speed snappy spring for the trailing ring
  const ringX = useSpring(mouseX, { stiffness: 1400, damping: 50, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 1400, damping: 50, mass: 0.1 });

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

    document.documentElement.classList.add('custom-cursor-active');

    const handlePointerMove = (e) => {
      const magnet = targetRef.current;

      if (!isInitializedRef.current) {
        isInitializedRef.current = true;
        mouseX.jump(e.clientX);
        mouseY.jump(e.clientY);
        ringX.jump(e.clientX);
        ringY.jump(e.clientY);
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }

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
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      isInitializedRef.current = false;
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mouseout', handleOut, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
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
      {/* Orange Pointer Cursor — true 1:1 instantaneous hardware cursor position */}
      <motion.div
        ref={dotRef}
        className="custom-cursor-pointer"
        style={{ left: mouseX, top: mouseY }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-arrow-svg"
        >
          <path
            d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
            fill="#F08020"
            stroke="#006030"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Trailing ring — magnetically pulled toward hovered elements */}
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
