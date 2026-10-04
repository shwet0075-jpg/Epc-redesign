import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import MobileTypewriter from "./MobileTypewriter";

const SplitHeading = ({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) => {
  const isMobile = useIsMobile(768);
  const lines = text.split("\n");

  if (isMobile) {
    return (
      <Tag className={`${className} mobile-split-heading`}>
        {lines.map((line, index) => (
          <div key={index} style={{ marginBottom: "4px" }}>
            <MobileTypewriter
              text={line}
              as="span"
              delay={delay + index * 0.22}
              speed={24}
            />
          </div>
        ))}
      </Tag>
    );
  }

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