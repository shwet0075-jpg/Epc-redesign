import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiCpu, FiServer, FiShield, FiVideo } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import ScrollStagger from '../components/ScrollStagger';
import ScrollText from '../components/ScrollText';
import ContactCTA from '../components/ContactCTA';
import EngineeringIntelligence from '../components/EngineeringIntelligence';
import FeaturedProjects from '../components/FeaturedProjects/FeaturedProjects';
import CountUp from '../components/animations/CountUp';
import { useTilt3D } from '../animations/parallaxVariants';

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

// Same capability data as before.
const capabilities = [
  {
    icon: <FiShield />,
    label: "Fire & Life Safety",
    desc: "Complete fire detection, suppression, hydrant, sprinkler and gas suppression solutions for critical infrastructure.",
    image: "/assets/images/bg/fire-life-safety.png",
    path: "/solutions/fire-safety",
  },
  {
    icon: <FiVideo />,
    label: "Security & Surveillance",
    desc: "Advanced IP CCTV, access control, perimeter security and centralized surveillance solutions.",
    image: "/assets/images/bg/security.png",
    path: "/solutions/security",
  },
  {
    icon: <FiServer />,
    label: "Data Centre Infrastructure",
    desc: "Mission-critical power, cooling, networking and infrastructure solutions for modern data centres.",
    image: "/assets/images/bg/ds-infra.png",
    path: "/solutions/data-centre",
  },
  {
    icon: <FiCpu />,
    label: "Integrated Building Management",
    desc: "Smart building automation integrating HVAC, lighting, safety and operational intelligence.",
    image: "/assets/images/bg/ib.png",
    path: "/solutions/ibms",
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
  eyebrow: "SINCE 2019 • ENGINEERING EXCELLENCE",
  title: "ENGINEERING THE FUTURE OF SMART INFRASTRUCTURE",
  description:
    "Delivering intelligent fire protection, security, building automation, data centre and mission-critical engineering solutions across India.",
};

// Derived once from companyInfo.title — same visual result as the old
// CSS lowercase + ::first-letter trick, just computed in JS since the
// heading is now split into individually-animated words.
const heroLine1 = (() => {
  const base = companyInfo.title.toLowerCase().replace(/smart infrastructure/i, '').trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
})();
const heroLine2 = 'smart infrastructure.';

const heroStats = [
  { value: "15+", label: "Years Experience" },
  { value: "250+", label: "Projects Delivered" },
  { value: "Pan India", label: "Clients Served" },
];

// Marquee strip content — built from existing capability labels plus
// the same "Pan India" / founding facts already used elsewhere on the
// page (heroStats / companyInfo), so no new copy is invented.
const marqueeItems = [
  ...capabilities.map((c) => c.label),
  'Pan India',
  'Est. 2019',
  'Engineering Excellence',
];

export default function Home() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);

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

  // Cursor-tracked 3D tilt for the featured-solution panel.
  const featuredTilt = useTilt3D({ max: 6 });

  // Scroll-linked hero parallax — watermark drifts + fades, hero copy
  // scales/dims slightly, and the dashed ring rotates, all tied to how
  // far the user has scrolled through the hero itself (works natively
  // with Lenis since it drives real window scroll under the hood).
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const watermarkY = useTransform(heroProgress, [0, 1], [0, 160]);
  const watermarkOpacity = useTransform(heroProgress, [0, 1], [1, 0.25]);
  const heroCopyScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 1], [1, 0.4]);
  const ringRotate = useTransform(heroProgress, [0, 1], [0, 90]);

  return (
    <>
      {/* HERO */}
      <section className="epc-hero-v2" aria-label="Prudent EPC Hero Section" ref={heroRef}>
        <motion.div
          className="epc-hero-watermark"
          aria-hidden="true"
          style={shouldReduceMotion ? undefined : { y: watermarkY, opacity: watermarkOpacity }}
        >
          PRUDENT
        </motion.div>

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '60px', alignItems: 'start', position: 'relative' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } } }}
              style={{
                position: 'relative',
                zIndex: 1,
                ...(shouldReduceMotion ? {} : { scale: heroCopyScale, opacity: heroCopyOpacity }),
              }}
            >
              <motion.span className="epc-hero-eyebrow" variants={heroCopy} transition={{ duration: 0.45 }}>
                {companyInfo.eyebrow}
              </motion.span>

              <h1 className="epc-hero-title-v2">
                <ScrollText as="span" text={heroLine1} className="epc-hero-title-line" amount={0} delay={0.1} />
                <ScrollText as="span" text={heroLine2} className="epc-hero-title-line accent" amount={0} delay={0.42} />
              </h1>

              <motion.p className="epc-hero-desc-v2" variants={heroCopy} transition={{ duration: 0.55, delay: 0.15 }}>
                {companyInfo.description}
              </motion.p>

              <motion.div className="epc-hero-actions-v2" variants={heroCopy} transition={{ delay: 0.2 }}>
                <MotionLink
                  to="/solutions"
                  className="epc-btn-primary-v2"
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                >
                  Explore Solutions
                  <FiArrowRight />
                </MotionLink>
                <Link to="/gallery" className="epc-btn-outline-v2">
                  Our Projects
                </Link>
              </motion.div>

              <motion.div className="epc-hero-stats-v2" variants={heroCopy} transition={{ delay: 0.25 }}>
                {heroStats.map((stat) => (
                  <div key={stat.label} className="epc-hero-stat-v2">
                    <h3><CountUp end={stat.value} /></h3>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <a className="epc-scroll-link-v2" href="#capabilities">
                Scroll to Operations <FiArrowDown />
              </a>
            </motion.div>

            <div style={{ position: 'relative' }}>
              <motion.div
                className="epc-featured-ring"
                aria-hidden="true"
                style={shouldReduceMotion ? undefined : { rotate: ringRotate }}
              />
              <motion.div
                className="epc-featured-card-v2"
                {...(shouldReduceMotion ? {} : featuredTilt.handlers)}
                style={shouldReduceMotion ? undefined : featuredTilt.style}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                    Featured Solution / {String(active + 1).padStart(2, '0')}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
                    <span className="epc-live-dot" /> Live
                  </span>
                </div>

                <div
                  style={{
                    width: '46px', height: '46px', borderRadius: '12px',
                    background: 'rgba(0,96,48,.08)', color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <FiShield size={20} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeSlide.title}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-dark)', margin: '0 0 18px', lineHeight: 1.3 }}
                  >
                    {activeSlide.title}
                  </motion.h3>
                </AnimatePresence>

                <Link
                  to={activeSlide.path}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '.78rem', fontWeight: 700, letterSpacing: '.08em',
                    textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'none',
                  }}
                >
                  {activeSlide.cta} <FiArrowRight />
                </Link>

                <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                  {slides.map((slide, index) => (
                    <button
                      key={slide.path}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Slide ${index + 1}`}
                      aria-pressed={index === active}
                      style={{
                        width: index === active ? '22px' : '8px',
                        height: '8px',
                        borderRadius: '999px',
                        border: 'none',
                        cursor: 'pointer',
                        background: index === active ? 'var(--color-secondary)' : 'var(--color-gray-300)',
                        transition: 'all .3s ease',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="epc-marquee-strip" aria-hidden="true">
        <div className="epc-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="epc-marquee-item" key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      {/* CAPABILITIES */}
      <section id="capabilities" className="section capabilities-section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="epc-cap-header-row">
            <div>
              <ScrollReveal variant="fade-up">
                <span className="epc-hero-eyebrow">What We Deliver</span>
              </ScrollReveal>
              <ScrollText
                as="h2"
                text="Engineering capabilities built for critical infrastructure"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 800, color: 'var(--color-text-dark)', margin: '10px 0 0', lineHeight: 1.15 }}
                amount={0.4}
              />
            </div>
            <ScrollReveal variant="fade-left" delay={0.15}>
              <p className="epc-cap-side-note">
                Systems designed for the moments that matter.
                <br />
                Four disciplines. One trusted partner.
              </p>
            </ScrollReveal>
          </div>

          <div className="epc-cap-list">
            {capabilities.map((cap, index) => (
              <ScrollReveal
                key={cap.label}
                variant={index % 2 === 0 ? 'swing-right-3d' : 'swing-left-3d'}
                delay={index * 0.05}
              >
                <Link to={cap.path} className="epc-cap-row">
                  <span className="epc-cap-num">{String(index + 1).padStart(2, '0')}</span>
                  <ScrollReveal
                    variant="rise-blur-3d"
                    delay={index * 0.05 + 0.1}
                    className="epc-cap-icon-wrap"
                  >
                    <span className="epc-cap-icon" aria-hidden="true">{cap.icon}</span>
                  </ScrollReveal>
                  <div>
                    <h4>{cap.label}</h4>
                    <p>{cap.desc}</p>
                  </div>
                  <FiArrowRight className="epc-cap-arrow" size={20} aria-hidden="true" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    

      {/* FOUNDATIONS */}
      <section className="epc-foundations-v2">
        <div className="container">
          <ScrollReveal variant="fade-up">
            <span className="epc-hero-eyebrow">Our Core Foundations</span>
          </ScrollReveal>
          <ScrollText
            as="h2"
            text="The pillars of our operations"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 800, color: 'var(--color-text-dark)', margin: '10px 0 60px' }}
            amount={0.4}
          />

          <ScrollStagger
            variant="rise-3d"
            stagger={0.14}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '60px' }}
          >
            {foundations.map((foundation, index) => (
              <div className="epc-foundation-col" key={foundation.title}>
                <span className="epc-foundation-ghost" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{foundation.title}</h3>
                <p>{foundation.text}</p>
              </div>
            ))}
          </ScrollStagger>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}