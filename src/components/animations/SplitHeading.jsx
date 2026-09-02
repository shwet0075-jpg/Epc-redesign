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
    <motion.div
      key={index}
      initial={{ y: "110%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        duration: 0.8,
        delay: delay + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {line}
    </motion.div>
  ))}
</Tag>
  );
};

export default SplitHeading;