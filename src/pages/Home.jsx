import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiCpu, FiServer, FiShield, FiVideo } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import ContactCTA from '../components/ContactCTA';
import EngineeringBackground from '../components/EngineeringBackground';
import EngineeringIntelligence from "../components/EngineeringIntelligence";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import CountUp from "../components/animations/CountUp";
import NextHome from '../components/NextHome';

// motion(Link) so the primary CTA gets a real spring/tap interaction
// instead of relying on CSS :hover alone.
const MotionLink = motion(Link);

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

// Not currently rendered by any Home section (kept — ready to wire
// into an "Our Expertise" style grid later rather than deleted).
const capabilities = [
  {
    icon: <FiShield />,
    label: "Fire & Life Safety",
    desc: "Complete fire detection, suppression, hydrant, sprinkler and gas suppression solutions for critical infrastructure.",
    image: "/assets/images/bg/fire-life-safety.png",
  },
  {
    icon: <FiVideo />,
    label: "Security & Surveillance",
    desc: "Advanced IP CCTV, access control, perimeter security and centralized surveillance solutions.",
    image: "/assets/images/bg/security.png",
  },
  {
    icon: <FiServer />,
    label: "Data Centre Infrastructure",
    desc: "Mission-critical power, cooling, networking and infrastructure solutions for modern data centres.",
    image: "/assets/images/bg/ds-infra.png",
  },
  {
    icon: <FiCpu />,
    label: "Integrated Building Management",
    desc: "Smart building automation integrating HVAC, lighting, safety and operational intelligence.",
    image: "/assets/images/bg/ib.png",
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

const companyInfo = {
  eyebrow: "SINCE 2009 • ENGINEERING EXCELLENCE",
  title: "ENGINEERING THE FUTURE OF SMART INFRASTRUCTURE",
  description:
    "Delivering intelligent fire protection, security, building automation, data centre and mission-critical engineering solutions across India.",
};

const heroStats = [
  { value: "15+", label: "Years Experience" },
  { value: "250+", label: "Projects Delivered" },
  { value: "Pan India", label: "Execution Capability" },
];

const revealVariant = (index) => (index === 1 ? 'fade-up' : index === 0 ? 'fade-right' : 'fade-left');

export function LegacyHome() {
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
      <section className="hero hero--redesigned" aria-label="Prudent EPC Hero Section">
        <EngineeringBackground variant="hero" />

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
              {companyInfo.eyebrow}
            </motion.p>

            <h1 className="hero-title">{companyInfo.title}</h1>

            <motion.p className="hero-description" variants={heroCopy} transition={{ duration: 0.55 }}>
              {companyInfo.description}
            </motion.p>

            <motion.div
              className="hero-featured"
              variants={heroCopy}
              style={{ transformPerspective: 800 }}
              whileHover={shouldReduceMotion ? undefined : { y: -4, rotateX: 3 }}
            >
              <span className="hero-featured-label">FEATURED SOLUTION</span>
              <h3>{activeSlide.title}</h3>
              <Link to={activeSlide.path} className="hero-featured-link">
                Explore <FiArrowRight />
              </Link>
            </motion.div>

            <motion.div className="hero-actions" variants={heroCopy}>
              <MotionLink
                to="/solutions"
                className="btn btn-primary hero-cta"
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                Explore Solutions
                <FiArrowRight />
              </MotionLink>

              <Link to="/projects" className="btn btn-outline hero-cta-secondary">
                Our Projects
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={heroCopy}>
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <h3>
                    <CountUp end={stat.value} />
                  </h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hero-control" aria-label="Hero slides">
            <span className="hero-counter" aria-hidden="true">0{active + 1}</span>
            <div className="hero-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.path}
                  type="button"
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
          <span>SCROLL</span>
          <FiArrowDown />
          <small>Discover More</small>
        </a>
      </section>

      <EngineeringIntelligence />
      <FeaturedProjects />

      <section className="section foundations-section">
        <div className="foundations-backdrop" aria-hidden="true" />
        <div className="container">
          <ScrollReveal variant="fade-up">
            <SectionTitle
              eyebrow="Our Core Foundations"
              title="The pillars of our operations"
              align="center"
              className="foundations-heading"
            />
          </ScrollReveal>

          <div className="vmv-grid">
            {foundations.map((foundation, index) => (
              <ScrollReveal
                key={foundation.title}
                variant={revealVariant(index)}
                delay={index * 0.08}
                className={`vmv-card-wrapper vmv-card-wrapper--${index + 1}`}
              >
                <motion.article
                  className="vmv-card"
                  style={{ transformPerspective: 1000 }}
                  whileHover={{ y: -9, rotateX: -3, scale: 1.012 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
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

export default NextHome;
