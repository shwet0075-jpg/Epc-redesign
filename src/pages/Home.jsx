import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiCpu, FiServer, FiShield, FiVideo } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import ContactCTA from '../components/ContactCTA';

const slides = [
  {
    title: "Fire Safety & Suppression Systems",
    cta: "Read More",
    path: "/solutions/fire-safety",
    image: "/assets/images/fire-safety.png",
  },
  {
    title: "Security & Surveillance Systems",
    cta: "Read More",
    path: "/solutions/security",
    image: "/assets/images/video-surveillance.jpg",
  },
  {
    title: "Data Centre Infrastructure",
    cta: "Read More",
    path: "/solutions/data-centre",
    image: "/assets/images/data-centre.png",
  },
  {
    title: "Integrated Building Management",
    cta: "Read More",
    path: "/solutions/ibms",
    image: "/assets/images/ibms.jpg",
  },
];

const capabilities = [
  {
    icon: <FiShield />,
    label: 'Fire & Life Safety',
    desc: 'SITC, suppression networks, early warnings & audits.',
    image: '/assets/images/bg/fire-life-safety.png',
  },
  {
    icon: <FiVideo />,
    label: 'Security & Surveillance',
    desc: 'IP-based CCTV networks, command grids & biometrics.',
    image: '/assets/images/bg/security.png',
  },
  {
    icon: <FiServer />,
    label: 'Data Centre Infrastructure',
    desc: 'High-availability power, precision cooling & systems monitoring.',
    image: '/assets/images/bg/ds-infra.png',
  },
  {
    icon: <FiCpu />,
    label: 'Integrated Building Management',
    desc: 'Intelligent automation & control networks for facility efficiency.',
    image: '/assets/images/bg/ib.png',
  },
];

const foundations = [
  {
    img: '/assets/images/Vision.png',
    title: 'Vision',
    text: 'Build a world-class project management and services organization in the engineering domain by empowering common and undiscovered youth through systems and management tools.',
  },
  {
    img: '/assets/images/Mission.png',
    title: 'Mission',
    text: 'To contribute to the Indian economy by delivering innovative and state-of-the-art projects in the electro-mechanical engineering domain.',
  },
  {
    img: '/assets/images/Values.png',
    title: 'Values',
    text: 'Transparency with stakeholders, work-first approach, delivering expected quality, leadership by empowerment.',
  },
];

const heroCopy = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    slides.forEach(({ image }) => {
      const preloadImage = new Image();
      preloadImage.src = image;
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const activeSlide = slides[active];

  return (
    <>
      <section className="hero hero--redesigned" aria-label={activeSlide.title}>
        <div className="hero-media" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.image}
              className="hero-slide"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.012 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.58, ease: [0.22, 1, 0.36, 1] }}
             style={{
  backgroundImage: `url(${activeSlide.image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}
            />
          </AnimatePresence>
          <div className="hero-wash" />
          <div className="hero-grid" />
          <motion.div
            className="hero-orbit hero-orbit--one"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="hero-orbit hero-orbit--two"
            animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container hero-shell">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.13 } } }}
          >
            <motion.p className="eyebrow hero-eyebrow" variants={heroCopy} transition={{ duration: 0.45 }}>
              Prudent EPC Pvt. Ltd.
            </motion.p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeSlide.title}
                  className="hero-title"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -15 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.15 : 0.46,
                    ease: [0.22, 1, 0.36, 1]
  }}
>
  {activeSlide.title}
</motion.h1>
            </AnimatePresence>
            <motion.div variants={heroCopy} transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.08 }}>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link to={activeSlide.path} className="btn btn-primary hero-cta">
                  {activeSlide.cta} <FiArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="hero-control" aria-label="Hero slides">
            <span className="hero-counter" aria-hidden="true">0{active + 1}</span>
            <div className="hero-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.path}
                  className={index === active ? 'is-active' : ''}
                  onClick={() => setActive(index)}
                  aria-label={`Slide ${index + 1}`}
                  aria-pressed={index === active}
                />
              ))}
            </div>
            <span className="hero-counter hero-counter--total" aria-hidden="true">0{slides.length}</span>
          </div>
        </div>

        <a className="hero-scroll" href="#capabilities" aria-label="Scroll to capabilities">
          <span />
          <FiArrowDown aria-hidden="true" />
        </a>
      </section>

      <section id="capabilities" className="section capabilities-section">
        <div className="container capabilities-layout">
          <ScrollReveal variant="fade-right" className="capabilities-intro">
            <SectionTitle
              eyebrow="Why Choose Prudent EPC"
              title="Engineering trust into every critical system"
              subtitle="We deliver fire detection, fire fighting, gas suppression, systems audit and maintenance of fire safety systems for commercial, industrial, hospital and public utility infrastructure. Our expertise spans IP-CCTV, premises surveillance over fibre networks, command & control centres, and building/maintaining critical infrastructure such as data centres, power control rooms and signal rooms."
            />
          </ScrollReveal>

         <div className="feature-grid" role="list">
  {capabilities.map((capability, index) => (
    <ScrollReveal
      key={capability.label}
      variant="fade-up"
      delay={index * 0.1}
      className={`feature-card-wrapper feature-card-wrapper--${index + 1}`}
    >
      <motion.article
        className="feature-card"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        role="listitem"
      >
        {/* Background Image */}
        <div
          className="feature-card-bg" 
          style={{
            backgroundImage: `url(${capability.image})`,
          }}
        />

        {/* Content */}
        <div className="feature-card-content">
          <div className="feature-index" aria-hidden="true">
            0{index + 1}
          </div>

          <div className="feature-icon">
            {capability.icon}
          </div>

          <h3>{capability.label}</h3>

          <p>{capability.desc}</p>

          <FiArrowRight
            className="feature-arrow"
            aria-hidden="true"
          />
        </div>
      </motion.article>
    </ScrollReveal>
  ))}
</div>
        </div>
      </section>

      <section className="section foundations-section">
        <div className="foundations-backdrop" aria-hidden="true" />
        <div className="container">
          <ScrollReveal variant="fade-up">
            <SectionTitle eyebrow="Our Core Foundations" title="The pillars of our operations" align="center" className="foundations-heading" />
          </ScrollReveal>

          <div className="vmv-grid">
            {foundations.map((foundation, index) => (
              <ScrollReveal key={foundation.title} variant={index === 1 ? 'fade-up' : index === 0 ? 'fade-right' : 'fade-left'} delay={index * 0.08} className={`vmv-card-wrapper vmv-card-wrapper--${index + 1}`}>
                <motion.article className="vmv-card" whileHover={{ y: -9 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
                  <div className="vmv-image" style={{ backgroundImage: `url(${foundation.img})` }}>
                    <span className="vmv-number" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <div className="vmv-content">
                    <span className="eyebrow">{foundation.title}</span>
                    <h3>{foundation.title}</h3>
                    <p>{foundation.text}</p>
                    <FiArrowRight className="vmv-arrow" aria-hidden="true" />
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
