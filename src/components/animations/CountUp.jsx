import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLoader } from "../../context/LoaderContext";

export default function AnimatedCount({
  end,
  suffix = "",
  duration = 2,
  className = "",
}) {
  const loader = useLoader();
  const isUnveiled = loader?.isUnveiled ?? true;
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
  });

  const shouldAnimate = isUnveiled && isInView;

  return (
    <div
      ref={ref}
      className={className}
    >
      {shouldAnimate ? (
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