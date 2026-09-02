// src/components/OurExpertise/OurExpertise.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import SplitHeading from "../animations/SplitHeading";
import MaskReveal from "../animations/MaskReveal";
import AnimatedCount from "../animations/CountUp";
import {
  FiArrowUpRight,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

import {
  expertiseData,
  expertiseStats,
} from "./expertiseData";

import "./OurExpertise.css";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function OurExpertise() {
  const [activeId, setActiveId] = useState(expertiseData[0].id);

  const activeSolution =
    expertiseData.find((item) => item.id === activeId);

  return (
    <section className="our-expertise" id="expertise">
      <div className="expertise-bg-grid" />
      <div className="expertise-glow" />

      <div className="container">
        {/* ========================= HEADER ========================= */}

        <motion.div
          className="expertise-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="header-left">
             <motion.span
    className="section-tag"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.5 }}
  >
    OUR EXPERTISE
  </motion.span>

            <SplitHeading
    text={`Integrated Engineering
Solutions`}
    className="expertise-title"
    delay={0.15}
  />
          </div>

          <div className="header-right">
            <p>
              Delivering intelligent EPC solutions for
              government, healthcare, industrial,
              commercial and mission-critical
              infrastructure across India.
            </p>
          </div>
        </motion.div>

        {/* ========================= CONTENT ========================= */}

        <div className="expertise-content">
          {/* ================= SIDEBAR ================= */}

          <LayoutGroup>
            <aside className="expertise-sidebar">
              {expertiseData.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`expertise-nav-item ${
                    activeId === item.id ? "active" : ""
                  }`}
                  whileHover={{
                    x: 6,
                  }}
                >
                  {activeId === item.id && (
                    <motion.div
                      layoutId="activeExpertise"
                      className="active-indicator"
                    />
                  )}

                  <div className="nav-number">
                    {item.number}
                  </div>

                  <div className="nav-text">
                    <h4>{item.title}</h4>

                    <span>{item.subtitle}</span>
                  </div>

                  <FiArrowRight />
                </motion.button>
              ))}
            </aside>

            {/* ================= SHOWCASE ================= */}

            <div className="expertise-showcase">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution.id}
                  className="showcase-wrapper"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                >
                  {/* IMAGE */}

                 <MaskReveal>
  <motion.div
    className="showcase-image"
    initial={{
      scale: 1.08,
      opacity: 0,
    }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    transition={{
      duration: 0.6,
    }}
  >
    <img
      src={activeSolution.image}
      alt={activeSolution.title}
    />
  </motion.div>

</MaskReveal>

                  {/* CONTENT */}

                  <motion.div
                    className="showcase-info"
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                  >
                    <span className="solution-category">
                      {activeSolution.category}
                    </span>

                    <h3>
                      {activeSolution.title}
                    </h3>

                    <p>
                      {activeSolution.description}
                    </p>

                    {/* FEATURES */}

                    <div className="feature-block">
                      <h5>Capabilities</h5>

                      <div className="feature-grid">
                       {activeSolution.features.map(
                             (feature, index) => (
                            <motion.div
                                key={feature}
                                className="feature-chip"
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.08,
                                }}
                                >
                              <FiCheck />

                              {feature}
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>

                    {/* INDUSTRIES */}

                    <div className="industry-block">
                      <h5>Industries</h5>

                      <div className="industry-list">
                        {activeSolution.industries.map(
                          (industry) => (
                            <span
                              key={industry}
                              className="industry-chip"
                            >
                              {industry}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* CTA */}

                   <motion.div whileHover={{ x: 6 }}>
    <Link
        to={activeSolution.path}
        className="solution-link"
    >
        Explore Solution
        <FiArrowUpRight />
    </Link>
</motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>

        {/* ========================= STATS ========================= */}

        <motion.div
          className="expertise-stats"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {expertiseStats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card"
            >
              <h3>
  {typeof stat.value === "number" ? (
    <AnimatedCount end={stat.value} suffix={stat.suffix || ""} />
  ) : (
    stat.value
  )}
</h3>

              <p>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}