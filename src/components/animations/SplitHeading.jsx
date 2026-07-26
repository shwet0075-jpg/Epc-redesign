import { motion } from "framer-motion";

const SplitHeading = ({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) => {
  const lines = text.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <div
          key={index}
          style={{
            overflow: "hidden",
          }}
        >
          <motion.span
            style={{
              display: "block",
            }}
            initial={{
              y: "110%",
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </Tag>
  );
};

export default SplitHeading;