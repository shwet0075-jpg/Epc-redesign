import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxImage = ({
  src,
  alt,
  className = "",
  speed = 80,
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-speed, speed]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.08, 1]
  );

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{
          y,
          scale,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default ParallaxImage;