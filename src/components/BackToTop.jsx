import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [shockwaveTrigger, setShockwaveTrigger] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 350);
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min(100, (window.scrollY / maximum) * 100) : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const scrollTop = () => {
    setIsLaunching(true);
    setShockwaveTrigger((prev) => prev + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setIsLaunching(false);
    }, 900);
  };

  // Circumference for r=25 in 58x58 dial: 2 * Math.PI * 25 ≈ 157.08
  const strokeDashoffset = 157.08 - (157.08 * progress) / 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`back-to-top-anchor ${isHovered ? "is-hovered" : ""} ${isLaunching ? "is-launching" : ""}`}
          initial={{ opacity: 0, scale: 0.6, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 35 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Kinetic Expanding Shockwave on Click */}
          <AnimatePresence>
            {isLaunching && (
              <motion.span
                key={shockwaveTrigger}
                className="back-to-top-shockwave"
                initial={{ scale: 0.8, opacity: 0.9 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* 3D Magnetic Gyroscope Capsule Button */}
          <motion.button
            className="back-to-top"
            onClick={scrollTop}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.93 }}
            animate={{
              rotateX: mouseOffset.y,
              rotateY: mouseOffset.x,
              width: isHovered ? 156 : 58,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
              mass: 0.8,
            }}
            aria-label="Ascend to top of page"
          >
            {/* Ambient Specular Glass Reflection */}
            <span className="back-to-top-dome-glint" />

            {/* Left Circular Altimeter Gyro Dial */}
            <div className="back-to-top-dial">
              {/* Precision SVG Altimeter Progress Track */}
              <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                className="back-to-top-gauge-svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#ffb366" />
                    <stop offset="100%" stopColor="#f08020" />
                  </linearGradient>

                  <filter id="gaugeLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#f08020" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* Instrument Background Ring */}
                <circle
                  cx="29"
                  cy="29"
                  r="25"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Cardinal Tick Marks (Aerospace Altimeter Calibration) */}
                <line x1="29" y1="4" x2="29" y2="7.5" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" />
                <line x1="54" y1="29" x2="50.5" y2="29" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
                <line x1="29" y1="54" x2="29" y2="50.5" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
                <line x1="4" y1="29" x2="7.5" y2="29" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />

                {/* Animated Laser Progress Arc */}
                <circle
                  cx="29"
                  cy="29"
                  r="25"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="2.8"
                  strokeDasharray="157.08"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90 29 29)"
                  filter="url(#gaugeLaserGlow)"
                  className="gauge-progress-circle"
                />
              </svg>

              {/* 3D Sculpted Rocket Arrow Container */}
              <motion.div
                className="back-to-top-arrow-wrapper"
                animate={
                  isLaunching
                    ? { y: -48, opacity: 0, scale: 0.55 }
                    : isHovered
                    ? { y: -3, scale: 1.1 }
                    : { y: [0, -2.5, 0], scale: 1 }
                }
                transition={
                  isLaunching
                    ? { duration: 0.45, ease: [0.32, 0, 0.67, 0] }
                    : isHovered
                    ? { type: "spring", stiffness: 350, damping: 18 }
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="back-to-top-3d-arrow-svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="bttFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#ffc58a" />
                      <stop offset="75%" stopColor="#f08020" />
                      <stop offset="100%" stopColor="#c85906" />
                    </linearGradient>

                    <linearGradient id="bttFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffa042" />
                      <stop offset="45%" stopColor="#cf620c" />
                      <stop offset="100%" stopColor="#753001" />
                    </linearGradient>

                    <linearGradient id="bttStem" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9e4202" />
                      <stop offset="35%" stopColor="#ffb970" />
                      <stop offset="65%" stopColor="#f08020" />
                      <stop offset="100%" stopColor="#692900" />
                    </linearGradient>

                    <linearGradient id="bttBooster" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#f08020" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#00e676" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>

                  {/* Surface Drop-Shadow */}
                  <path
                    d="M14 4.8L6.5 12.3H11V21H17V12.3H21.5L14 4.8Z"
                    fill="rgba(0, 0, 0, 0.6)"
                    transform="translate(0, 2) scale(0.96)"
                  />

                  {/* Kinetic Booster Chevron */}
                  <path
                    d="M8.5 18.8L14 14.2L19.5 18.8L18.2 20.2L14 16.8L9.8 20.2L8.5 18.8Z"
                    fill="url(#bttBooster)"
                    className="back-to-top-booster"
                  />

                  {/* 3D Stem */}
                  <path
                    d="M11.6 11.5H16.4V20.2C16.4 21 15.8 21.6 15 21.6H13C12.2 21.6 11.6 21 11.6 20.2V11.5Z"
                    fill="url(#bttStem)"
                  />

                  {/* Left Facet */}
                  <path
                    d="M14 3.4L5.6 11.8C5 12.4 5.4 13.4 6.3 13.4H11.6V11.5H14V3.4Z"
                    fill="url(#bttFacetLeft)"
                  />

                  {/* Right Facet */}
                  <path
                    d="M14 3.4V11.5H16.4V13.4H21.7C22.6 13.4 23 12.4 22.4 11.8L14 3.4Z"
                    fill="url(#bttFacetRight)"
                  />

                  {/* Specular Bevel Line */}
                  <path
                    d="M14 3.4V21.6"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth="0.85"
                    strokeLinecap="round"
                  />

                  {/* Apex Glint */}
                  <circle cx="14" cy="3.6" r="1.1" fill="#ffffff" />
                </svg>
              </motion.div>

              {/* Live Digital Mini Altitude Readout */}
              <span className="back-to-top-micro-alt">
                {isHovered ? "TOP" : `${Math.round(progress)}%`}
              </span>
            </div>

            {/* Expanding Telemetry HUD Info (Right Wing) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="back-to-top-telemetry"
                  initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <span className="telemetry-action">ASCEND</span>
                  <span className="telemetry-stat">
                    <span className="telemetry-live-dot" />
                    <span>{Math.round(progress)}% ELEV</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
