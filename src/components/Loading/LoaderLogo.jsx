import { motion } from "framer-motion";

const easeOutSoft = [0.22, 1, 0.36, 1];

const prudentLetters = "Prudent".split("");
const epcLetters = [
  { char: "E", isOrange: true },
  { char: "P", isOrange: false },
  { char: "C", isOrange: false },
];

export default function LoaderLogo({ shouldReduceMotion }) {
  // Container stagger variant for Prudent text
  const prudentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 1.85,
      },
    },
  };

  // Container stagger variant for EPC text
  const epcContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 2.4,
      },
    },
  };

  const letterVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0, y: 0 }
      : { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: easeOutSoft,
      },
    },
  };

  return (
    <div className="loader-brand">
      {/* Symbol Container - Assembles Orange & Green Pieces */}
      <motion.div
        className="loader-logo-assembly"
        animate={
          shouldReduceMotion
            ? { scale: 1 }
            : { scale: [1, 1, 1.05, 1] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                times: [0, 0.45, 0.65, 1],
                duration: 2.2,
                ease: "easeOut",
              }
        }
      >
        {/* Refined "Systems Online" Radial Light Impact Pulse */}
        <motion.div
          className="loader-impact-pulse"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  scale: [0.3, 2.3],
                  opacity: [0, 0.85, 0],
                }
          }
          transition={{
            delay: 1.7,
            duration: 0.8,
            ease: "easeOut",
          }}
        />

        {/* Top-Left Orange Piece with Motion Trail Glow */}
        <motion.div
          className="loader-piece-wrapper loader-piece-orange-wrapper"
          initial={
            shouldReduceMotion
              ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }
              : { opacity: 0, x: "-55vw", y: "-55vh", scale: 1.28, rotate: -12 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 1.5, delay: 0.3, ease: easeOutSoft }
          }
        >
          <img
            src="/assets/images/logo-orange.png"
            alt="Prudent EPC Orange Symbol Piece"
            className="loader-piece loader-piece-orange"
          />
        </motion.div>

        {/* Bottom-Right Green Piece with Motion Trail Glow */}
        <motion.div
          className="loader-piece-wrapper loader-piece-green-wrapper"
          initial={
            shouldReduceMotion
              ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }
              : { opacity: 0, x: "55vw", y: "55vh", scale: 1.28, rotate: 12 }
          }
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 1.5, delay: 0.3, ease: easeOutSoft }
          }
        >
          <img
            src="/assets/images/logo-green.png"
            alt="Prudent EPC Green Symbol Piece"
            className="loader-piece loader-piece-green"
          />
        </motion.div>
      </motion.div>

      {/* Letter-Staggered Typography Reveal */}
      <div className="loader-text-wrapper">
        <h1 className="loader-title" aria-label="Prudent EPC">
          {/* Prudent Stagger Group (#006030) */}
          <motion.span
            className="loader-title-group loader-title-prudent"
            variants={prudentContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {prudentLetters.map((char, index) => (
              <motion.span
                key={`prudent-${index}`}
                className="loader-letter letter-prudent"
                variants={letterVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          {/* EPC Stagger Group (E: #F08020, PC: #006030) */}
          <motion.span
            className="loader-title-group loader-title-epc"
            variants={epcContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {epcLetters.map((item, index) => (
              <motion.span
                key={`epc-${index}`}
                className={`loader-letter ${
                  item.isOrange ? "letter-orange" : "letter-green"
                }`}
                variants={letterVariants}
              >
                {item.char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          className="loader-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { delay: 2.85, duration: 0.65, ease: easeOutSoft }
          }
        >
          ENGINEERING INTELLIGENCE
        </motion.p>
      </div>
    </div>
  );
}




