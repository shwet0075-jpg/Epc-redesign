import React from "react";
import OlympicTextReveal from "./OlympicTextReveal";

const SplitHeading = ({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) => {
  return (
    <OlympicTextReveal
      text={text}
      as={Tag}
      type="lines"
      className={`${className} split-heading-olympic`}
      delay={delay * 1000}
      stagger={95}
    />
  );
};

export default SplitHeading;