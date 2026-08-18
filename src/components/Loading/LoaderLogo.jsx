import { motion } from "framer-motion";

const easeOutSoft = [0.22, 1, 0.36, 1];

const prudentLetters = "Prudent".split("");
const epcLetters = [
  { char: "E", isOrange: true },
  { char: "P", isOrange: false },
  { char: "C", isOrange: false },
];

export default function LoaderLogo({ shouldReduceMotion }) {
  // Base start delay so letters begin landing as the logo pieces assemble
  const baseDelay = 0.55;
  const letterStagger = 0.085;

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
              ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0, filter: "drop-shadow(0px 0px 0px rgba(240,128,32,0))" }
              : { opacity: 0, x: "-55vw", y: "-55vh", scale: 1.28, rotate: -12, filter: "drop-shadow(-16px -16px 20px rgba(240,128,32,0.65))" }
          }
          animate={{
            opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
            filter: "drop-shadow(0px 0px 0px rgba(240,128,32,0))",
          }}
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
              ? { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0, filter: "drop-shadow(0px 0px 0px rgba(0,96,48,0))" }
              : { opacity: 0, x: "55vw", y: "55vh", scale: 1.28, rotate: 12, filter: "drop-shadow(16px 16px 20px rgba(0,96,48,0.65))" }
          }
          animate={{
            opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
            filter: "drop-shadow(0px 0px 0px rgba(0,96,48,0))",
          }}
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

      {/* Typography with Sequential Landing Animation */}
      <div className="loader-text-wrapper">
        <h2 className="loader-title text-xl" aria-label="Prudent EPC">
          {/* Prudent Stagger Group (#006030) */}
          <span className="loader-title-group loader-title-prudent">
            {prudentLetters.map((char, index) => (
              <motion.span
                key={`prudent-${index}`}
                className="loader-letter letter-prudent"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: -45, scale: 1.35, filter: "blur(4px)" }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.2 }
                    : {
                        type: "spring",
                        stiffness: 420,
                        damping: 20,
                        mass: 0.7,
                        delay: baseDelay + index * letterStagger,
                      }
                }
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* EPC Stagger Group (E: #F08020, PC: #006030) */}
          <span className="loader-title-group loader-title-epc">
            {epcLetters.map((item, index) => {
              const letterIndex = prudentLetters.length + index;
              return (
                <motion.span
                  key={`epc-${index}`}
                  className={`loader-letter ${
                    item.isOrange ? "letter-orange" : "letter-green"
                  }`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: -45, scale: 1.35, filter: "blur(4px)" }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.2 }
                      : {
                          type: "spring",
                          stiffness: 420,
                          damping: 20,
                          mass: 0.7,
                          delay: baseDelay + letterIndex * letterStagger + 0.08,
                        }
                  }
                >
                  {item.char}
                </motion.span>
              );
            })}
          </span>
        </h2>
      </div>
    </div>
  );
}
