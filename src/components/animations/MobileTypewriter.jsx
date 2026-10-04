import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLoader } from '../../context/LoaderContext';

/**
 * MobileTypewriter:
 * High-tech precision typewriter text animation designed specifically for mobile screens.
 * Types character-by-character with an animated glowing engineering cursor.
 */
export default function MobileTypewriter({
  text = '',
  as: Tag = 'span',
  className = '',
  style = {},
  delay = 0,
  speed = 28,
  cursorColor = '#f08020',
  showCursor = true,
  once = false,
  amount = 0.05,
  isShown: explicitIsShown,
}) {
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once, amount });
  const isShown = explicitIsShown !== undefined ? explicitIsShown : (inView && isUnveiled);

  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const fullText = String(text || '');

  useEffect(() => {
    if (!isShown) {
      if (!once) {
        setDisplayedText('');
        setIsFinished(false);
      }
      return;
    }

    let timeoutId;
    let intervalId;
    let cursorFadeTimer;

    // Start typing after initial delay
    timeoutId = setTimeout(() => {
      let currentIndex = 0;
      // Adapt speed: slightly faster for long text so user doesn't wait too long
      const charSpeed = fullText.length > 50 ? 18 : fullText.length > 30 ? 24 : speed;

      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayedText(fullText.slice(0, currentIndex));

        if (currentIndex >= fullText.length) {
          clearInterval(intervalId);
          setIsFinished(true);

          // Fade out cursor after 1.8s of finishing
          cursorFadeTimer = setTimeout(() => {
            setCursorVisible(false);
          }, 1800);
        }
      }, charSpeed);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      clearTimeout(cursorFadeTimer);
    };
  }, [isShown, fullText, delay, speed, once]);

  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      ref={containerRef}
      className={`mobile-typewriter-text ${className}`}
      style={{
        ...style,
        display: Tag === 'span' ? 'inline' : 'block',
        position: 'relative',
      }}
    >
      <span>{displayedText}</span>
      {showCursor && cursorVisible && isShown && (
        <span
          className="mobile-typewriter-cursor"
          aria-hidden="true"
          style={{
            color: cursorColor,
            fontWeight: 300,
            marginLeft: '2px',
            opacity: isFinished ? 0.6 : 1,
          }}
        >
          |
        </span>
      )}
    </MotionTag>
  );
}
