import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import "./FeaturedProjects.css";
import { projects } from "./projects";
import SplitHeading from "../animations/SplitHeading";

const MotionLink = motion(Link);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const activeProject = featuredProjects[activeIndex];

  useLayoutEffect(() => {
    if (shouldReduceMotion || window.matchMedia('(max-width: 900px)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 66%', end: 'center 38%', scrub: .7 } })
        .fromTo('.fp-sidebar', { x: -48, opacity: .25 }, { x: 0, opacity: 1, ease: 'none', duration: .45 }, 0)
        .fromTo('.fp-preview', { xPercent: 14, scale: .93, opacity: .25 }, { xPercent: 0, scale: 1, opacity: 1, ease: 'none', duration: .6 }, 0);
    }, sectionRef);
    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="featured-projects section">
      <div className="container">
        {/* ================= HEADER ================= */}

        <div className="fp-header">
          <span className="section-tag">
            ENGINEERING EXCELLENCE
          </span>

         <SplitHeading
  text="Delivered Across India"
  className="fp-title"
/>

          <p>
            From Government institutions and Railways to Healthcare,
            Power Utilities and Data Centres, Prudent EPC has delivered
            mission-critical engineering solutions across India's most
            prestigious organizations.
          </p>
        </div>

        {/* ================= GRID ================= */}

        <div className="fp-grid">

          {/* ================= LEFT SIDEBAR ================= */}

          <LayoutGroup>
            <aside className="fp-sidebar">
              {featuredProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`fp-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${project.title}`}
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeProject"
                      className="fp-active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                      }}
                    />
                  )}

                  <span className="fp-category">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>
                    <FiMapPin />
                    {project.location}
                  </p>
                </button>
              ))}
            </aside>
          </LayoutGroup>

          {/* ================= RIGHT PREVIEW ================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              className="fp-preview"
              initial={{
                opacity: 0,
                scale: 1.04,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              {/* IMAGE */}

              <div className="fp-image">
  <img
    src={activeProject.image}
    alt={activeProject.title}
  />
</div>

              {/* CONTENT */}

              <motion.div
                className="fp-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="fp-top"
                  variants={itemVariants}
                >
                  <span className="fp-badge">
                    {activeProject.category}
                  </span>

                  <span className="fp-location">
                    <FiMapPin />
                    {activeProject.location}
                  </span>
                </motion.div>

                <motion.h2 variants={itemVariants}>
                  {activeProject.title}
                </motion.h2>

                <motion.p
                  className="fp-description"
                  variants={itemVariants}
                >
                  {activeProject.description}
                </motion.p>

                <motion.div
                  className="fp-services"
                  variants={itemVariants}
                >
                  {activeProject.services.map((service, index) => (
                    <motion.span
                      key={service}
                      variants={itemVariants}
                      transition={{
                        delay: index * 0.06,
                      }}
                    >
                      {service}
                    </motion.span>
                  ))}
                </motion.div>

                <MotionLink
                  to="/gallery"
                  className="fp-button"
                  variants={itemVariants}
                >
                  Explore Project
                  <FiArrowRight />
                </MotionLink>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
