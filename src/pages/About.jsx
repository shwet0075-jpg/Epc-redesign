import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAward, FiUsers, FiCpu, FiTrendingUp } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

const skills = [
  'Design engineering',
  'Delivering non-standard projects',
  'Comprehensive services in the domain we operate',
  'Contract management',
  'Project management',
  'Critical infrastructure maintenance',
  'Consulting and auditing services',
  'Business offerings of Fire Detection, Gas Suppression Systems, IP CCTV & Access Control System',
  'Class II registered contractor with Central Public Works Department and Class A with Public Works Department',
  'Licensed agency by Maharashtra Fire Services for Fire Alarm and Fire Fighting works',
  'UTC Gold Partner for Clean Agent Suppression System',
  'Completed TIER-III Data Centre package for Mumbai City Surveillance DC and DR Sites',
  'Completed 60+ projects in Intelligent Building Management Systems',
  'Delivered mega projects: Port Surveillance for JNPT, Fire Safety for Mahatransco, Colaba Depot Surveillance for Southern Army Command',
];

const timelineData = [
  { year: '2019', title: 'Company Incorporation', text: 'Prudent EPC Pvt. Ltd. was incorporated as a subsidiary of Prudent Controls Pvt. Ltd. to focus on major engineering and electro-mechanical projects.' },
  { year: '2020', title: 'Regulatory Licensing', text: 'Acquired Central Public Works Department Class II registry and class A licensing from Maharashtra Fire Services for safety installations.' },
  { year: '2021', title: 'UTC Gold Partnership', text: 'Achieved prestigious UTC Gold Partner status for Clean Agent Suppression Systems, accelerating high-hazard facility safety delivery.' },
  { year: '2022', title: 'TIER-III Data Centre', text: 'Successfully designed, built, and commissioned complete TIER-III Data Centre packages for Mumbai City Surveillance DC & DR Sites.' },
  { year: '2023', title: 'BMS Innovation', text: 'Reached milestone of completing 60+ complex automation projects in Intelligent Building Management Systems (IBMS) nationwide.' },
  { year: '2024', title: 'Mega Infrastructure Projects', text: 'Commissioned massive critical grid surveillance for JNPT Port, Mahatransco, and Colaba Depot under the Southern Army Command.' }
];

function Counter({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const endNum = parseInt(end.toString().replace(/\D/g, ''), 10);
    if (start === endNum) return;
    
    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / endNum));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endNum) clearInterval(timer);
    }, Math.max(incrementTime, 30));
    
    return () => clearInterval(timer);
  }, [end, duration, started]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {count}{end.toString().includes('+') ? '+' : ''}
    </motion.span>
  );
}

export default function About() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', padding: '140px 0 80px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.1) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>About Us</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}>Our Company</h1>
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '640px', margin: '0' }}>
            Engineering trust into fire safety, security, and critical infrastructure since 2019.
          </p>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <ScrollReveal variant="fade-right">
              <div className="about-text-content">
                <SectionTitle
                  eyebrow="Incorporated in 2019"
                  title="A Legacy of Engineering Precision"
                />
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Prudent EPC Pvt. Ltd. is a wholly owned subsidiary of Prudent Controls Pvt. Ltd.,
                  a technology services company with deep experience in fire safety and security
                  systems for industrial and commercial projects. We provide end-to-end design, supply, installation, commissioning, and maintenance of high-hazard facilities.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  {skills.slice(0, 7).map((skill) => (
                    <div key={skill} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '4px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.98rem', color: 'var(--color-text-body)' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale-in" className="about-image-wrapper">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-gray-100)',
                }}
              >
                <img
                  src="/assets/images/company-img.png"
                  alt="Prudent EPC office and company overview"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform var(--transition-med)',
                  }}
                  className="about-company-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0, 96, 48, 0.3) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-section" style={{ padding: '80px 0', background: 'var(--color-light)', borderTop: '1px solid var(--color-gray-100)', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            {[
              { icon: <FiAward size={36} />, label: 'Projects Completed', value: '49+' },
              { icon: <FiUsers size={36} />, label: 'Direct Employees', value: '40+' },
              { icon: <FiCpu size={36} />, label: 'IBMS Installations', value: '60+' },
              { icon: <FiTrendingUp size={36} />, label: 'Leadership Experience', value: '22+' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} variant="fade-up" delay={i * 0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>{stat.icon}</div>
                  <h3 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--color-text-dark)', letterSpacing: '-0.02em' }}>
                    <Counter end={stat.value} />
                  </h3>
                  <span style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', fontWeight: 600, uppercase: 'true' }}>{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="section timeline-section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Milestones"
            title="Our Growth Journey"
            align="center"
          />

          <div style={{ position: 'relative', maxWidth: '1000px', margin: '60px auto 0' }}>
            {/* Center line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '4px',
                background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))',
                transform: 'translateX(-50%)',
                opacity: 0.15,
              }}
              className="timeline-line"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {timelineData.map((item, i) => (
                <ScrollReveal
                  key={item.year}
                  variant={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                  className={`timeline-item-wrapper ${i % 2 === 0 ? 'left' : 'right'}`}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                    }}
                    className="timeline-item"
                  >
                    <div
                      style={{
                        width: '45%',
                        background: '#ffffff',
                        border: '1px solid var(--color-gray-100)',
                        boxShadow: 'var(--shadow-sm)',
                        borderRadius: 'var(--radius-md)',
                        padding: '30px',
                        position: 'relative',
                        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                        textAlign: i % 2 === 0 ? 'right' : 'left',
                      }}
                      className="timeline-content"
                    >
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-secondary)', display: 'block', marginBottom: '8px' }}>{item.year}</span>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 10px', color: 'var(--color-text-dark)' }}>{item.title}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
                    </div>

                    {/* Timeline Dot */}
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: `4px solid ${i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}`,
                        boxShadow: '0 0 0 8px rgba(0, 96, 48, 0.05)',
                        zIndex: 2,
                        position: 'relative',
                      }}
                    />

                    {/* Empty spacer for grid alignment */}
                    <div style={{ width: '45%' }} className="timeline-spacer" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mr. Avinash Patil Profile */}
      <section className="section director-section" style={{ background: 'var(--color-light)', overflow: 'hidden' }}>
        <div className="container">
          <div className="director-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <ScrollReveal variant="fade-right">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-gray-100)',
                }}
              >
                <img
                  src="/assets/images/director.jpg"
                  alt="Mr. Avinash Patil, Director"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform var(--transition-med)',
                  }}
                  className="director-profile-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(18, 24, 21, 0.4) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
              <div className="director-text">
                <span className="eyebrow" style={{ color: 'var(--color-primary)' }}>Leadership</span>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, margin: '8px 0 4px', color: 'var(--color-text-dark)' }}>Director's Profile</h2>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-secondary)', margin: '0 0 24px' }}>Mr. Avinash Patil</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                  Director of Prudent Controls Pvt. Ltd. and Prudent EPC Pvt. Ltd. With a
                  qualification of BE in Production, MBA (Marketing) and LLB, Mr. Avinash Patil has
                  worked with well-acclaimed firms including Valrack, Emerson, Xerox, JNPT,
                  MAHATRANSCO, MIDC, CPWD, and Indian Railways for 22 years.
                </p>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                  He currently leads business in the data centre and fire safety industry across
                  Pune, Mumbai and Delhi, with the business directly employing 40+ people. He
                  specializes in business development, finance management, and efficient business
                  set-up, with keen interest in contract, business and constitutional law.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SKILLS & CREDENTIALS DETAILS */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Our Credentials"
            title="Recognised for Quality & Trust"
            align="center"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '48px' }}>
            {skills.slice(7).map((skill, index) => (
              <ScrollReveal key={skill} variant="fade-up" delay={index * 0.05}>
                <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--color-gray-100)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '16px', height: '100%' }}>
                  <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.94rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>{skill}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
