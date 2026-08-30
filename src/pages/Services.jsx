import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  FiCpu,
  FiServer,
  FiAward,
  FiShield,
  FiCheck,
  FiArrowRight,
  FiActivity,
  FiClock,
  FiTool,
  FiLayers,
  FiTrendingUp,
} from 'react-icons/fi';
import { services } from '../data/services';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import MagneticButton from '../components/animations/MagneticButton';

const iconMap = {
  epc: <FiCpu size={28} />,
  'remote-monitoring': <FiServer size={28} />,
  'project-works': <FiAward size={28} />,
  amc: <FiShield size={28} />,
};

const lifecycleStages = [
  {
    step: '01',
    title: 'Planning & Design',
    desc: 'We understand your exact requirements, prepare clear drawings, and create a complete project roadmap.',
    icon: <FiLayers size={22} />,
    tag: 'Step 1: Planning',
  },
  {
    step: '02',
    title: 'Quality Sourcing',
    desc: 'We procure genuine, certified equipment and materials directly from trusted manufacturers with strict quality checks.',
    icon: <FiCpu size={22} />,
    tag: 'Step 2: Procurement',
  },
  {
    step: '03',
    title: 'Installation & Testing',
    desc: 'Our experienced engineering team installs, inspects, and thoroughly tests every system before final handover.',
    icon: <FiTool size={22} />,
    tag: 'Step 3: Execution',
  },
  {
    step: '04',
    title: '24×7 Support & AMC',
    desc: 'We provide round-the-clock monitoring, routine maintenance checkups, and fast on-site assistance.',
    icon: <FiActivity size={22} />,
    tag: 'Step 4: Care & Support',
  },
];

const serviceStandards = [
  {
    icon: <FiClock size={24} />,
    title: 'Fast Response Time',
    desc: 'Our dedicated support team is always ready to assist you quickly whenever you need help or emergency support.',
    metric: 'Quick Help',
  },
  {
    icon: <FiShield size={24} />,
    title: 'Safety First',
    desc: 'We strictly follow all national building and fire safety codes on every single project we execute.',
    metric: '100% Safe',
  },
  {
    icon: <FiServer size={24} />,
    title: 'Pan-India Service',
    desc: 'We have certified technicians and spare parts ready to support facilities across all major regions in India.',
    metric: 'Pan India',
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: 'Single Team Responsibility',
    desc: 'You work with one trusted team from initial design all the way through installation and yearly maintenance.',
    metric: 'Full Care',
  },
];

function ServicesStyles() {
  return (
    <style>{`
      @keyframes svcGridDrift {
        from { background-position: 0px 0px, 0px 0px; }
        to { background-position: 48px 48px, 48px 48px; }
      }
      @keyframes svcPulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      .services-blueprint-bg {
        background-image:
          linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
        background-size: 48px 48px, 48px 48px;
        animation: svcGridDrift 16s linear infinite;
      }
      .service-tilt {
        transform-style: preserve-3d;
        transition: transform .2s ease-out, box-shadow .35s ease;
        will-change: transform;
      }
      .service-tilt:hover {
        box-shadow: 0 24px 60px rgba(0,96,48,.12);
      }
      .services-side-rail {
        position: fixed;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 40;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
      @media (max-width: 1100px) {
        .services-side-rail { display: none; }
      }
      .services-list-bg {
        position: relative;
        background: #fbfdfc;
      }
      .services-list-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        background-image:
          linear-gradient(rgba(0, 96, 48, .045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 96, 48, .045) 1px, transparent 1px);
        background-size: 44px 44px, 44px 44px;
        animation: svcGridDrift 20s linear infinite;
      }
      .svc-radar-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #F08020;
        box-shadow: 0 0 10px #F08020;
        display: inline-block;
        animation: svcPulse 2s infinite ease-in-out;
      }
      .svc-kpi-badge {
        padding: 10px 14px;
        border-radius: 12px;
        background: rgba(0, 96, 48, 0.05);
        border: 1px solid rgba(0, 96, 48, 0.12);
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .svc-kpi-badge span {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #557565;
        font-weight: 700;
      }
      .svc-kpi-badge strong {
        font-size: 0.95rem;
        color: #006030;
        font-weight: 800;
      }
      .svc-stage-card {
        background: #ffffff;
        border: 1px solid rgba(0, 96, 48, 0.12);
        border-radius: 20px;
        padding: 32px 24px;
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .svc-stage-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 40px rgba(0, 96, 48, 0.1);
        border-color: rgba(240, 128, 32, 0.4);
      }
      .svc-standard-card {
        background: linear-gradient(145deg, #072215 0%, #03140c 100%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 32px 26px;
        color: #ffffff;
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, border-color 0.3s ease;
      }
      .svc-standard-card:hover {
        transform: translateY(-4px);
        border-color: rgba(240, 128, 32, 0.6);
      }
      @media (prefers-reduced-motion: reduce) {
        .services-blueprint-bg,
        .services-list-bg::before,
        .svc-radar-dot { animation: none !important; }
        .service-tilt { transition: none !important; }
      }
    `}</style>
  );
}

function TiltPanel({ children, style, className = '', maxTilt = 3, ...rest }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('none');

  const handleMove = (e) => {
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);
    setTransform(`perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(3px)`);
  };

  const handleLeave = () => {
    setTransform('none');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`service-tilt ${className}`}
      style={{ transform, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

function ServiceRail({ count, activeIndex, onJump }) {
  return (
    <div className="services-side-rail" aria-hidden="false">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          aria-label={`Jump to service ${i + 1}`}
          style={{
            width: activeIndex === i ? '12px' : '8px',
            height: activeIndex === i ? '12px' : '8px',
            borderRadius: '50%',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            background: activeIndex === i ? 'var(--color-secondary)' : 'rgba(0,96,48,.25)',
            transition: 'all .3s ease',
            boxShadow: activeIndex === i ? '0 0 0 5px rgba(240,128,32,.2)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

export default function Services() {
  const listRef = useRef(null);
  const panelRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const observers = panelRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const jumpTo = (i) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <ServicesStyles />
      <ServiceRail count={services.length} activeIndex={activeIndex} onJump={jumpTo} />

      {/* =========================================================
          HERO SECTION — Simple, Clear & Inviting Header
      ========================================================= */}
      <section
        className="page-header"
        style={{
          background: 'linear-gradient(135deg, #03160c 0%, #006030 100%)',
          padding: '145px 0 85px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="services-blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }} />

        {/* Ambient radial glow */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.16) 0%, transparent 70%)',
            top: '-15%',
            right: '-5%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}
          >
            <span className="svc-radar-dot" />
            <span
              style={{
                color: 'var(--color-secondary)',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              WHAT WE DO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 5.2vw, 4.8rem)', fontWeight: 800, margin: '6px 0 20px', color: '#ffffff', letterSpacing: '-0.03em' }}
          >
            Our <span style={{ color: '#F08020' }}>Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1.15rem', color: '#d8e5df', maxWidth: '780px', margin: '0 0 36px', lineHeight: 1.65 }}
          >
            From planning and installing electrical, fire safety, and automation systems to 24×7 monitoring and annual maintenance, we take care of your facilities every step of the way.
          </motion.p>

          {/* Quick Navigator Pill Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '36px',
            }}
          >
            {services.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpTo(idx)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  border: activeIndex === idx ? '1px solid #F08020' : '1px solid rgba(255,255,255,0.18)',
                  background: activeIndex === idx ? 'rgba(240, 128, 32, 0.18)' : 'rgba(255,255,255,0.06)',
                  color: activeIndex === idx ? '#F08020' : '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                }}
              >
                0{idx + 1}. {s.badge}
              </button>
            ))}
          </motion.div>

          {/* Hero Performance Overview Grid */}
          <div
            className="services-hero-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
              marginTop: '20px',
            }}
          >
            {[
              { val: 'Full EPC', lbl: 'Electrical & Mechanical' },
              { val: '24×7 Live', lbl: 'System Monitoring' },
              { val: '100% Safe', lbl: 'Verified Standards' },
              { val: 'Pan India', lbl: 'Quick Support' },
            ].map((stat, i) => (
              <motion.div
                key={stat.lbl}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div style={{ color: '#F08020', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em' }}>
                    {stat.val}
                  </div>
                  <div style={{ marginTop: '6px', color: '#cad8d1', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {stat.lbl}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES LIST — Simple & Clear Cards
      ========================================================= */}
      <section className="section services-list-bg" style={{ overflow: 'hidden', padding: '90px 0' }}>
        <div ref={listRef} className="container services-list-content" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {services.map((s, i) => (
            <div key={s.id} ref={(el) => (panelRefs.current[i] = el)}>
              <ScrollReveal
                variant={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                className="service-panel-reveal"
              >
                <TiltPanel
                  maxTilt={2}
                  className={`service-panel ${i % 2 === 1 ? 'reverse' : ''}`}
                  style={{
                    padding: '2px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, #FF9933 0%, rgba(255,153,51,0.3) 45%, rgba(0,96,48,0.15) 100%)',
                    boxShadow: '0 20px 45px -20px rgba(0,96,48,0.15)',
                    position: 'relative',
                  }}
                >
                  <div
                    className="service-panel-inner"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                      gap: 'clamp(32px, 5vw, 70px)',
                      alignItems: 'center',
                      background: '#ffffff',
                      padding: 'clamp(26px, 4vw, 48px)',
                      borderRadius: 'calc(var(--radius-lg) - 2px)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Background subtle watermark */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        right: i % 2 === 0 ? '5%' : 'auto',
                        left: i % 2 === 1 ? '5%' : 'auto',
                        bottom: '5%',
                        fontSize: '9rem',
                        fontWeight: 900,
                        color: 'rgba(0, 96, 48, 0.025)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        lineHeight: 1,
                      }}
                    >
                      0{i + 1}
                    </div>

                    {/* Image Showcase */}
                    <div
                      className="service-panel-image-wrap"
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                        height: 'clamp(260px, 32vw, 390px)',
                        position: 'relative',
                        zIndex: 1,
                        border: '1px solid rgba(0, 96, 48, 0.1)',
                      }}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        className="service-panel-image"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(3, 22, 12, 0.45) 0%, transparent 60%)',
                          pointerEvents: 'none',
                        }}
                      />
                      {/* Top Corner Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          background: 'rgba(3, 22, 12, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#F08020',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                        }}
                      >
                        SERVICE 0{i + 1}
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="service-panel-info" style={{ position: 'relative', zIndex: 1 }}>
                      {/* Header Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                        <span className="svc-radar-dot" />
                        <span
                          style={{
                            color: '#006030',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {s.badge}
                        </span>
                      </div>

                      {/* Icon + Title */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '18px' }}>
                        <div
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, rgba(0, 96, 48, 0.12), rgba(240, 128, 32, 0.08))',
                            color: '#006030',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: '1px solid rgba(0, 96, 48, 0.15)',
                          }}
                        >
                          {iconMap[s.id] || <FiCpu size={28} />}
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.5rem, 2vw, 1.95rem)', fontWeight: 800, color: '#102219', lineHeight: 1.25, margin: 0 }}>
                          {s.title}
                        </h3>
                      </div>

                      <p style={{ color: '#4a6356', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '24px' }}>
                        {s.text}
                      </p>

                      {/* KPI Highlights */}
                      {s.kpis && (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                            gap: '10px',
                            marginBottom: '26px',
                          }}
                        >
                          {s.kpis.map((kpi) => (
                            <div key={kpi.label} className="svc-kpi-badge">
                              <span>{kpi.label}</span>
                              <strong>{kpi.value}</strong>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Capabilities Check List */}
                      {s.bullets && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '10px', marginBottom: '28px' }}>
                          {s.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                            >
                              <div
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  background: 'rgba(0, 96, 48, 0.1)',
                                  color: '#006030',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  fontSize: '0.72rem',
                                }}
                              >
                                <FiCheck />
                              </div>
                              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#273f32' }}>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <MagneticButton style={{ display: 'inline-block' }}>
                        <Link
                          to="/contact"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '999px',
                            background: '#006030',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          Talk to our Team <FiArrowRight />
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
                </TiltPanel>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '3px',
            width: '100%',
            transformOrigin: 'left',
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, #006030, #F08020)',
            zIndex: 50,
          }}
        />
      </section>

      {/* =========================================================
          SECTION: How We Work (Our 4-Step Process)
      ========================================================= */}
      <section className="section" style={{ background: '#f2f6f3', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span
              style={{
                color: '#F08020',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              HOW WE WORK
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', fontWeight: 800, color: '#0c1e15', lineHeight: 1.15, margin: '0 0 16px' }}>
              Our 4-Step <span style={{ color: '#006030' }}>Process</span>
            </h2>
            <p style={{ color: '#557262', fontSize: '1.05rem', margin: 0 }}>
              A straightforward, transparent approach that ensures your projects are finished on schedule and run safely.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '24px',
            }}
          >
            {lifecycleStages.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 0.1}>
                <div className="svc-stage-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'rgba(0, 96, 48, 0.08)',
                        color: '#006030',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stage.icon}
                    </div>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'rgba(240, 128, 32, 0.45)', lineHeight: 1 }}>
                      {stage.step}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F08020', display: 'block', marginBottom: '8px' }}>
                    {stage.tag}
                  </span>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0b1d14', marginBottom: '12px' }}>
                    {stage.title}
                  </h3>

                  <p style={{ color: '#587465', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {stage.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION: Our Commitments to You
      ========================================================= */}
      <section className="section" style={{ background: '#07180f', color: '#ffffff', padding: '95px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
            <span
              style={{
                color: '#F08020',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              OUR PROMISE
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, margin: '0 0 16px' }}>
              Service Standards You Can <span style={{ color: '#F08020' }}>Count On</span>
            </h2>
            <p style={{ color: '#9bb8a8', fontSize: '1.05rem', margin: 0 }}>
              Backed by experienced engineers, dependable equipment, and round-the-clock support.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '24px',
            }}
          >
            {serviceStandards.map((std, idx) => (
              <ScrollReveal key={std.title} delay={idx * 0.1}>
                <div className="svc-standard-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(240, 128, 32, 0.15)',
                        color: '#F08020',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(240, 128, 32, 0.3)',
                      }}
                    >
                      {std.icon}
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(0, 96, 48, 0.4)',
                        color: '#8fe3b2',
                        border: '1px solid rgba(0, 96, 48, 0.8)',
                      }}
                    >
                      {std.metric}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                    {std.title}
                  </h3>

                  <p style={{ color: '#94b2a2', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {std.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CALL TO ACTION
      ========================================================= */}
      <ContactCTA />
    </>
  );
}
