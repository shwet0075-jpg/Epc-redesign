import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCpu, FiServer, FiAward, FiShield, FiCheck } from 'react-icons/fi';
import { services } from '../data/services';
import ScrollReveal from '../components/ScrollReveal';
import ScrollStagger from '../components/ScrollStagger';
import ScrollText from '../components/ScrollText';
import ContactCTA from '../components/ContactCTA';

const iconMap = {
  epc: <FiCpu size={32} />,
  'remote-monitoring': <FiServer size={32} />,
  'project-works': <FiAward size={32} />,
  amc: <FiShield size={32} />,
};

/* ------------------------------------------------------------------ */
/*  Local keyframes — scoped to this page, no new dependencies         */
/* ------------------------------------------------------------------ */
function ServicesStyles() {
  return (
    <style>{`
      @keyframes svcGridDrift {
        from { background-position: 0px 0px, 0px 0px; }
        to { background-position: 48px 48px, 48px 48px; }
      }
      @keyframes svcFloatOrb {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        50% { transform: translateY(-22px) translateX(10px); }
      }
      .services-blueprint-bg {
        background-image:
          linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
        background-size: 48px 48px, 48px 48px;
        animation: svcGridDrift 14s linear infinite;
      }
      .service-tilt {
        transform-style: preserve-3d;
        transition: transform .18s ease-out, box-shadow .35s ease, border-color .35s ease;
        will-change: transform;
      }
      .service-tilt:hover {
        box-shadow: 0 30px 70px rgba(0,96,48,.16);
      }
      @keyframes ringRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .service-ring-motif {
        animation: ringRotate 70s linear infinite;
      }
      .services-side-rail {
        position: fixed;
        right: 28px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 40;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
      }
      @media (max-width: 1100px) {
        .services-side-rail { display: none; }
      }

      /* Light pattern for the services-list section, replacing the flat
         white background — same grid-drift technique used elsewhere on
         the site (capabilities/engineering sections), just a lighter,
         brand-green-tinted variant so it stays quiet behind the panels. */
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
          linear-gradient(rgba(0, 96, 48, .05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 96, 48, .05) 1px, transparent 1px);
        background-size: 44px 44px, 44px 44px;
        animation: svcGridDrift 18s linear infinite;
      }
      .services-list-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        background: radial-gradient(circle at 12% 15%, rgba(0, 96, 48, .05), transparent 55%);
      }
      .services-list-content {
        position: relative;
        z-index: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .services-blueprint-bg { animation: none !important; }
        .service-tilt { transition: none !important; }
        .services-list-bg::before { animation: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse-tracked 3D tilt wrapper                                       */
/* ------------------------------------------------------------------ */
function TiltPanel({ children, style, className = '', maxTilt = 3, ...rest }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)');

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);
    setTransform(`perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`);
  };

  const handleLeave = () => {
    setTransform('perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
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

/* ------------------------------------------------------------------ */
/*  Fixed side rail — a live spec-index of the service list, tracks     */
/*  scroll position and lets you jump between services                 */
/* ------------------------------------------------------------------ */
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
            boxShadow: activeIndex === i ? '0 0 0 5px rgba(240,128,32,.16)' : 'none',
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
        { threshold: 0.4 }
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

      {/* PAGE HEADER */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', padding: '140px 0 80px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="services-blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <motion.div
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.14) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
            style={{ color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <span style={{ width: '28px', height: '2px', background: 'var(--color-secondary)', display: 'inline-block' }} />
            Engineering Services
          </motion.span>

          <ScrollText
            as="h1"
            text="Services"
            style={{ fontSize: 'clamp(3rem,5vw,4.8rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}
            amount={0}
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '760px', margin: '0' }}
          >
            Our engineering services extend beyond project delivery, providing complete lifecycle support—from engineering, procurement, commissioning, remote monitoring, modernization, and preventive maintenance to ensure reliable, efficient, and future-ready infrastructure.
          </motion.p>

          <ScrollStagger
            variant="rise-blur-3d"
            stagger={0.08}
            className="services-hero-stats"
            style={{
              display: 'grid',
              gap: '24px',
              marginTop: '44px',
            }}
          >
            {[
              ['EPC', 'Execution'],
              ['AMC', 'Support'],
              ['24×7', 'Monitoring'],
              ['Pan India', 'Service'],
            ].map(([value, label]) => (
              <TiltPanel
                key={label}
                maxTilt={5}
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.05))',
                  border: '1px solid rgba(255,255,255,.14)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: value === 'Pan India' ? '1.3rem' : '2rem',
                  }}
                >
                  {value}
                </div>

                <div
                  style={{
                    marginTop: '8px',
                    color: '#dbe5df',
                    fontSize: '.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.12em',
                  }}
                >
                  {label}
                </div>
              </TiltPanel>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* SERVICES LIST — a scroll-tracked spec index, each entry a rich,
          tactile panel. Alternating fade-right/fade-left ScrollReveal per
          panel is kept exactly as-is; it's already doing what the richer
          system does elsewhere, tied to the IntersectionObserver-driven
          rail above, so it isn't touched. */}
      <section className="section services-list-bg" style={{ overflow: 'hidden' }}>
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
                    background: 'linear-gradient(135deg, #FF9933 0%, rgba(255,153,51,.35) 45%, rgba(255,153,51,0) 72%)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '80px',
                      alignItems: 'center',
                      background: 'var(--color-white)',
                      padding: '48px',
                      borderRadius: 'calc(var(--radius-lg) - 2px)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >

                  {/* Abstract engineering ring — a quiet nod to national institutional trust, not a literal emblem */}
                  <svg
                    className="service-ring-motif"
                    viewBox="0 0 200 200"
                    style={{
                      position: 'absolute',
                      right: '-60px',
                      bottom: '-60px',
                      width: '260px',
                      height: '260px',
                      opacity: 0.05,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }}
                  >
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#0B2447" strokeWidth="2" />
                    <circle cx="100" cy="100" r="6" fill="#0B2447" />
                    {Array.from({ length: 16 }).map((_, spoke) => {
                      const angle = (spoke / 16) * 2 * Math.PI;
                      const x2 = 100 + 90 * Math.cos(angle);
                      const y2 = 100 + 90 * Math.sin(angle);
                      return (
                        <line
                          key={spoke}
                          x1="100"
                          y1="100"
                          x2={x2}
                          y2={y2}
                          stroke="#0B2447"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>

                  {/* Soft diagonal tricolor bands — fade out toward the photo, stay quiet behind the text */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      zIndex: 0,
                      backgroundImage: `
                        linear-gradient(${i % 2 === 0 ? 105 : 75}deg,
                          transparent 0%,
                          rgba(255,153,51,.04) 4%,
                          rgba(255,153,51,.16) 9%,
                          rgba(255,153,51,.16) 21%,
                          rgba(255,153,51,.04) 26%,
                          transparent 30%,
                          transparent 34%,
                          rgba(18,136,7,.04) 38%,
                          rgba(18,136,7,.14) 43%,
                          rgba(18,136,7,.14) 55%,
                          rgba(18,136,7,.04) 60%,
                          transparent 64%,
                          transparent 100%
                        ),
                        linear-gradient(${i % 2 === 0 ? 90 : 270}deg,
                          rgba(255,255,255,0) 0%,
                          rgba(255,255,255,.55) 55%,
                          #ffffff 75%
                        )
                      `,
                    }}
                  />

                  {/* Service index tag — reinforces the "engineering spec sheet" identity */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '24px',
                      right: '28px',
                      fontSize: '.75rem',
                      fontWeight: 700,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      opacity: 0.6,
                      zIndex: 1,
                    }}
                  >
                    Service {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                  </span>

                  <div
                    className="service-panel-image-wrap"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      height: '380px',
                      position: 'relative',
                      zIndex: 1,
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
                        transition: 'transform var(--transition-med)',
                      }}
                      className="service-panel-image"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0, 96, 48, 0.2) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  <div className="service-panel-info" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, var(--color-primary-glow), rgba(0, 96, 48, 0.03))',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                      }}
                    >
                      {iconMap[s.id] || <FiCpu size={32} />}
                    </motion.div>

                    <h3 style={{ fontSize: 'clamp(1.8rem,2vw,2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '18px', lineHeight: 1.3 }}>
                      {s.title}
                    </h3>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '28px' }}>
                      {s.text}
                    </p>

                    {s.bullets && (
                      <ScrollStagger
                        variant="fade-right"
                        stagger={0.06}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}
                      >
                        {s.bullets.map((bullet, bi) => (
                          <div key={bullet} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: bi % 2 === 0 ? 'var(--color-primary-glow)' : 'rgba(255,153,51,.14)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <FiCheck style={{ color: bi % 2 === 0 ? 'var(--color-primary)' : '#E08018', fontSize: '0.8rem' }} />
                            </div>
                            <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--color-text-body)' }}>{bullet}</span>
                          </div>
                        ))}
                      </ScrollStagger>
                    )}
                  </div>
                  </div>
                </TiltPanel>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Overall read progress of the services list — small, honest, and ties to the rail dots above */}
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '3px',
            width: '100%',
            transformOrigin: 'left',
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            zIndex: 50,
          }}
        />
      </section>

      {/* CALL TO ACTION */}
      <ContactCTA />
    </>
  );
}