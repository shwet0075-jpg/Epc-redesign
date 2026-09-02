import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: 15,
    suffix: "+",
    title: "Years of Excellence",
    description: "Delivering trusted engineering solutions."
  },
  {
    number: 500,
    suffix: "+",
    title: "Projects Delivered",
    description: "Across industrial, commercial and infrastructure sectors."
  },
  {
    number: 50,
    suffix: "+",
    title: "Enterprise Clients",
    description: "Long-term partnerships built on quality and trust."
  },
  {
    number: 24,
    suffix: "×7",
    title: "Engineering Support",
    description: "Reliable assistance throughout every project lifecycle."
  },
  {
    number: 98,
    suffix: "%",
    title: "Client Satisfaction",
    description: "Focused on quality, safety and timely delivery."
  }
];

export default function EngineeringImpact() {
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (shouldReduceMotion || window.matchMedia('(max-width: 760px)').matches) return undefined;
    const context = gsap.context(() => {
      const counters = valueRefs.current.map(() => ({ value: 0 }));
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', end: 'bottom 42%', scrub: .55 },
      });
      timeline.fromTo('.impact-card', { rotateX: 16, y: 48, opacity: .18 }, { rotateX: 0, y: 0, opacity: 1, stagger: .08, duration: .34, ease: 'none' }, 0);
      counters.forEach((counter, index) => {
        timeline.to(counter, { value: stats[index].number, duration: .5, ease: 'none', onUpdate: () => {
          if (valueRefs.current[index]) valueRefs.current[index].textContent = Math.round(counter.value).toLocaleString();
        } }, .12 + index * .07);
      });
    }, sectionRef);
    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section className="engineering-impact" ref={sectionRef}>

      <div className="container">

        <motion.div
          className="impact-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: .7 }}
        >

          <span className="section-eyebrow">
            ENGINEERING IMPACT
          </span>

          <h2>
            Delivering Engineering Excellence
            <br />
            Across Every Project
          </h2>

          <p>
            Every installation reflects our commitment to innovation,
            precision, safety and long-term operational reliability.
          </p>

        </motion.div>

        <div className="impact-grid">

          {stats.map((item, index) => (

            <motion.div
              key={item.title}
              className="impact-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                delay: index * 0.12,
                duration: .6
              }}
              whileHover={{
                y: -10,
                transition: { duration: .3 }
              }}
            >

              <div className="impact-number">

                <span ref={(element) => { valueRefs.current[index] = element; }}>{item.number}</span>

                {item.suffix}

              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
