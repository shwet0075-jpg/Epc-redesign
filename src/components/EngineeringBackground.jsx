import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const variants = {
  hero: {
    nodes: [
      { x: "8%", y: "18%", size: "sm" },
      { x: "18%", y: "28%", size: "md" },
      { x: "28%", y: "16%", size: "sm" },
      { x: "42%", y: "12%", size: "hub" },
      { x: "58%", y: "24%", size: "md" },
      { x: "72%", y: "18%", size: "sm" },
      { x: "88%", y: "16%", size: "md" },
      { x: "18%", y: "72%", size: "sm" },
      { x: "34%", y: "62%", size: "md" },
      { x: "52%", y: "76%", size: "hub" },
      { x: "74%", y: "62%", size: "md" },
      { x: "92%", y: "74%", size: "sm" },
    ],

    paths: [
  "M70 110 L180 170 L320 110 L460 180 L610 120 L760 170 L920 110",

  "M120 320 L250 250 L430 330 L620 250 L820 340",

  "M100 560 L250 470 L420 550 L610 470 L860 560",

  "M180 170 L180 470",

  "M320 110 L430 330",

  "M460 180 L610 470",

  "M760 170 L820 340",

  "M610 120 L610 470",

  "M250 250 L250 470",

  "M430 330 L420 550",
],
  },

  blueprint: {
    nodes: [],
    paths: [],
  },

  circuit: {
    nodes: [],
    paths: [],
  },

  globe: {
    nodes: [],
    paths: [],
  },

  network: {
    nodes: [],
    paths: [],
  },
};

export default function EngineeringBackground({
  variant = "hero",
}) {
  const config = variants[variant] || variants.hero;

  const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const x = useSpring(mouseX, {
  stiffness: 45,
  damping: 18,
});

const y = useSpring(mouseY, {
  stiffness: 45,
  damping: 18,
});

useEffect(() => {
  const handleMove = (e) => {
    const offsetX = (e.clientX / window.innerWidth - 0.5) * 24;
    const offsetY = (e.clientY / window.innerHeight - 0.5) * 24;

    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  window.addEventListener("mousemove", handleMove);

  return () => {
    window.removeEventListener("mousemove", handleMove);
  };
}, [mouseX, mouseY]);

  return (
   <motion.div
  className={`engineering-bg engineering-bg--${variant}`}
  aria-hidden="true"
  style={{
    x,
    y,
  }}
>
    
      {/* Base Grid */}
      <div className="engineering-grid" />

      {/* Future Hex Pattern */}
      <div className="engineering-hex" />

      {/* Future Particle Layer */}
      <div className="engineering-particles" />

      {/* SVG Network */}
      <svg
        className="engineering-lines"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
       {config.paths.map((path, index) => (
  <g key={index}>
    <motion.path
      id={`engineering-path-${index}`}
      d={path}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 4 + index * 0.45,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: index * 0.15,
      }}
    />

    <circle
      r="3"
      className="engineering-packet"
    >
      <animateMotion
        dur={`${5 + index}s`}
        repeatCount="indefinite"
      >
        <mpath href={`#engineering-path-${index}`} />
      </animateMotion>
    </circle>
  </g>
))}
      </svg>

      {/* Nodes */}
     {config.nodes.map((node, index) => (
  <motion.div
    key={index}
    className={`engineering-node engineering-node--${node.size}`}
    style={{
      left: node.x,
      top: node.y,
    }}
    animate={{
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      delay: index * 0.15,
    }}
  >
    <span className="engineering-node-core" />

    {node.size === "hub" && (
      <>
        <span className="engineering-ring engineering-ring-1" />
        <span className="engineering-ring engineering-ring-2" />
      </>
    )}
  </motion.div>
))}

    {/* Floating Particles */}
{Array.from({ length: 18 }).map((_, i) => (
  <motion.span
    key={`particle-${i}`}
    className="engineering-particle"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [-10, 10, -10],
      opacity: [0.15, 0.5, 0.15],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 5,
    }}
  />
))}

      {/* Glow */}
      <div className="engineering-glow" />
      <div className="glow glow-1"></div>
    <div className="glow glow-2"></div>
    <div className="glow glow-3"></div>
   </motion.div>
  );
}