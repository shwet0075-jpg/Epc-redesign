import { motion } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1];

export default function LoaderLogo() {
  return (
    <div className="loader-brand">

      <motion.div
        className="loader-logo-wrapper"
        initial={{
          opacity: 0,
          scale: 0.75,
          rotate: -8,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1,
          ease: premiumEase,
        }}
      >
        <div className="loader-logo-glow" />

        <img
          src="/assets/images/logo.png"
          alt="Prudent EPC"
          className="loader-logo"
        />
      </motion.div>

      <motion.h1
        className="loader-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: .25,
          duration: .8,
          ease: premiumEase
        }}
      >
        PRUDENT EPC
      </motion.h1>

      <motion.p
        className="loader-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: .45,
          duration: .8
        }}
      >
        ENGINEERING INTELLIGENCE
      </motion.p>

    </div>
  );
}