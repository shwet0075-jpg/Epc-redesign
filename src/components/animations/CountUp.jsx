import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedCount({
  end,
  suffix = "",
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
  });

  return (
    <div
      ref={ref}
      className={className}
    >
      {isInView ? (
        <CountUp
          end={end}
          duration={duration}
          suffix={suffix}
        />
      ) : (
        0
      )}
    </div>
  );
}