import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35
  });

  return (
    <section className="engineering-impact" ref={ref}>

      <div className="container">

        <motion.div
          className="impact-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
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

                {inView && (
                  <CountUp
                    end={item.number}
                    duration={2}
                  />
                )}

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