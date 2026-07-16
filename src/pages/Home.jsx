import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShield, FiServer, FiVideo, FiCpu } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import ContactCTA from '../components/ContactCTA';

const slides = [
  {
    title: 'Design and build solutions for Fire Detection & Suppression System',
    cta: 'Read More',
    path: '/solutions/fire-safety',
    image: '/assets/images/fire-safety.jpg',
  },
  {
    title: 'We help create smart city solutions and get you more connected.',
    cta: 'Read More',
    path: '/solutions/ibms',
    image: '/assets/images/Integrated Building Management System.jpg',
  },
  {
    title: 'Intelligent Security System',
    cta: 'Read More',
    path: '/solutions/security',
    image: '/assets/images/security.jpg',
  },
  {
    title: 'Help to build energy efficient Data Centers',
    cta: 'Read More',
    path: '/solutions/data-centre',
    image: '/assets/images/data-centre.jpg',
  },
];

export default function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" style={{ position: 'relative', height: '90vh', minHeight: '650px', overflow: 'hidden', background: '#050a08' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="hero-slide"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slides[active].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        
        {/* Sleek brand gradient overlay */}
        <div
          className="hero-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0, 96, 48, 0.85) 0%, rgba(18, 24, 21, 0.6) 50%, rgba(240, 128, 32, 0.4) 100%)',
            zIndex: 1
          }}
        />

        {/* Ambient glow blobs */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 96, 48, 0.25) 0%, transparent 75%)',
            top: '10%',
            left: '5%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.2) 0%, transparent 75%)',
            bottom: '15%',
            right: '10%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div className="container hero-content" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
            <motion.p
              className="eyebrow"
              style={{ color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Prudent EPC Pvt. Ltd.
            </motion.p>
            
            <AnimatePresence mode="wait">
              <motion.h1
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                className="hero-title"
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: '32px',
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {slides[active].title}
              </motion.h1>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to={slides[active].path} className="btn btn-primary" style={{ padding: '16px 36px', boxShadow: '0 8px 30px rgba(0, 96, 48, 0.3)' }}>
                {slides[active].cta} <FiArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="hero-dots" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '14px', zIndex: 10 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === active ? 'is-active' : ''}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === active ? '36px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                background: i === active ? 'var(--color-secondary)' : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-us" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.03) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
            pointerEvents: 'none'
          }}
        />

        <div className="container">
          <SectionTitle
            eyebrow="Why Choose Prudent EPC"
            title="Engineering trust into every critical system"
            subtitle="We deliver fire detection, fire fighting, gas suppression, systems audit and maintenance of fire safety systems for commercial, industrial, hospital and public utility infrastructure. Our expertise spans IP-CCTV, premises surveillance over fibre networks, command & control centres, and building/maintaining critical infrastructure such as data centres, power control rooms and signal rooms."
          />

          <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginTop: '64px' }}>
            {[
              { icon: <FiShield />, label: 'Fire & Life Safety', desc: 'SITC, suppression networks, early warnings & audits.' },
              { icon: <FiVideo />, label: 'Security & Surveillance', desc: 'IP-based CCTV networks, command grids & biometrics.' },
              { icon: <FiServer />, label: 'Data Centre Infrastructure', desc: 'High-availability power, precision cooling & systems monitoring.' },
              { icon: <FiCpu />, label: 'Integrated Building Management', desc: 'Intelligent automation & control networks for facility efficiency.' },
            ].map((f, i) => (
              <ScrollReveal
                key={f.label}
                variant="fade-up"
                delay={i * 0.1}
                className="feature-card-wrapper"
              >
                <div
                  className="feature-card"
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    padding: '40px 32px',
                    textAlign: 'left',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-gray-100)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    }}
                  />
                  
                  <div
                    className="feature-icon"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, var(--color-primary-glow), rgba(0, 96, 48, 0.03))',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      marginBottom: '24px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {f.icon}
                  </div>
                  
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--color-text-dark)' }}>{f.label}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISION / MISSION / VALUES */}
      <section className="section vmv" style={{ background: 'var(--color-light)', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 96, 48, 0.03) 0%, transparent 70%)',
            bottom: '-20%',
            left: '-10%',
            pointerEvents: 'none'
          }}
        />

        <div className="container">
          <SectionTitle
            eyebrow="Our Core Foundations"
            title="The pillars of our operations"
            align="center"
          />

          <div className="vmv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              {
                img: '/assets/images/about.jpg',
                title: 'Vision',
                text: 'Build a world-class project management and services organization in the engineering domain by empowering common and undiscovered youth through systems and management tools.',
              },
              {
                img: '/assets/images/company-img.png',
                title: 'Mission',
                text: 'To contribute to the Indian economy by delivering innovative and state-of-the-art projects in the electro-mechanical engineering domain.',
              },
              {
                img: '/assets/images/hero.png',
                title: 'Values',
                text: 'Transparency with stakeholders, work-first approach, delivering expected quality, leadership by empowerment.',
              },
            ].map((v, i) => (
              <ScrollReveal
                key={v.title}
                variant="fade-up"
                delay={i * 0.15}
                className="vmv-card-wrapper"
              >
                <div
                  className="vmv-card"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    background: '#ffffff',
                    border: '1px solid var(--color-gray-100)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="vmv-image"
                    style={{
                      height: '240px',
                      backgroundImage: `url(${v.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(18, 24, 21, 0.4) 0%, transparent 60%)',
                      }}
                    />
                  </div>
                  <div style={{ padding: '36px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-secondary)' }}></span>
                      {v.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', margin: 0, lineHeight: 1.7, flexGrow: 1 }}>{v.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <ContactCTA />
    </>
  );
}
