import React from 'react';
import { motion } from 'framer-motion';

/**
 * 3D Dots Morph Button
 * Inspired by https://motion.dev/examples/react-dots-morph-button
 * 
 * When closed: 4 circular dots in a 2x2 grid with spring physics.
 * When open: Morphs smoothly into crossing diagonal lines (✕).
 */
export default function DotsMorphButton({ isOpen, onClick, label = 'Quick Connect' }) {
  return (
    <motion.button
      type="button"
      className={`dots-morph-btn-3d ${isOpen ? 'is-active' : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close quick actions menu' : 'Open quick actions menu'}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96, y: 1 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
    >
      {/* 3D Specular Sheen Layer */}
      <span className="morph-btn-sheen" aria-hidden="true" />

      {/* Button Content: Label + Live Status + Morphing Icon */}
      <span className="morph-btn-content">
        <span className="morph-status-indicator" aria-hidden="true">
          <span className="morph-status-beacon" />
        </span>

        <span className="morph-btn-label">
          {isOpen ? 'Close Desk' : label}
        </span>

        {/* The 4-Dots to ✕ Morphing SVG Canvas */}
        <span className="morph-icon-stage" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="morph-svg"
          >
            {/* Diagonal 1: from top-left (6, 6) to bottom-right (18, 18) */}
            <motion.line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="#F08020"
              strokeWidth="3.2"
              strokeLinecap="round"
              initial={false}
              animate={{
                strokeDasharray: isOpen ? '22 0' : '0.01 16.97',
                stroke: isOpen ? '#ffffff' : '#F08020',
                rotate: isOpen ? 90 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 460,
                damping: 26,
              }}
              style={{ transformOrigin: '12px 12px' }}
            />

            {/* Diagonal 2: from top-right (18, 6) to bottom-left (6, 18) */}
            <motion.line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke="#00e070"
              strokeWidth="3.2"
              strokeLinecap="round"
              initial={false}
              animate={{
                strokeDasharray: isOpen ? '22 0' : '0.01 16.97',
                stroke: isOpen ? '#ffffff' : '#00e070',
                rotate: isOpen ? -90 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 460,
                damping: 26,
              }}
              style={{ transformOrigin: '12px 12px' }}
            />
          </svg>
        </span>
      </span>
    </motion.button>
  );
}
