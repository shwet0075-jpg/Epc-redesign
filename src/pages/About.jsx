import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FiCheckCircle,
  FiAward,
  FiUsers,
  FiCpu,
  FiTrendingUp,
  FiMapPin,
  FiBriefcase,
  FiShield,
  FiTarget,
  FiZap,
  FiFileText,
} from 'react-icons/fi';
import { Scale } from 'lucide-react';
import { solutionsOverview } from '../data/solutions';
import ScrollReveal from '../components/ScrollReveal';
import ScrollStagger from '../components/ScrollStagger';
import ScrollText from '../components/ScrollText';
import SectionTitle from '../components/SectionTitle';
import MagneticButton from '../components/animations/MagneticButton';

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
  {
    year: '2019',
    title: 'Company Incorporation',
    category: 'FOUNDATION',
    text: 'Prudent EPC Pvt. Ltd. was incorporated as a strategic subsidiary of Prudent Controls Pvt. Ltd. to lead major engineering and electro-mechanical projects across India.',
    chips: ['🚀 Prudent Subsidiary', '⚡ Electro-Mechanical Core', '🏢 HQ Mumbai'],
    badge: 'Phase 01'
  },
  {
    year: '2020',
    title: 'Regulatory Licensing & Accreditation',
    category: 'REGULATORY MILESTONE',
    text: 'Acquired Central Public Works Department Class II registry and Class A licensing from Maharashtra Fire Services for comprehensive fire safety & building systems.',
    chips: ['📜 CPWD Class II', '🔥 MFS Class A License', '🛡️ Safety Compliance'],
    badge: 'Phase 02'
  },
  {
    year: '2021',
    title: 'UTC Gold Partnership Achieved',
    category: 'GLOBAL PARTNERSHIP',
    text: 'Achieved prestigious UTC Gold Partner status for Clean Agent Suppression Systems, accelerating high-hazard facility safety delivery for national infrastructure.',
    chips: ['⭐ UTC Gold Partner', '🧪 Clean Agent Suppression', '🔒 High-Hazard Safety'],
    badge: 'Phase 03'
  },
  {
    year: '2022',
    title: 'TIER-III Data Centre Commissioning',
    category: 'ENTERPRISE DATA CENTRE',
    text: 'Successfully designed, built, and commissioned complete TIER-III Data Centre packages for Mumbai City Surveillance DC & DR Sites with 99.999% uptime compliance.',
    chips: ['💻 TIER-III Standards', '🌆 City Surveillance DC & DR', '🔌 24/7 Redundancy'],
    badge: 'Phase 04'
  },
  {
    year: '2023',
    title: 'BMS & IBMS Automation Milestone',
    category: 'AUTOMATION INNOVATION',
    text: 'Reached the landmark milestone of completing 60+ complex automation projects in Intelligent Building Management Systems (IBMS) nationwide.',
    chips: ['⚡ 60+ IBMS Installations', '🤖 Smart Automation', '🌐 Pan-India Reach'],
    badge: 'Phase 05'
  },
  {
    year: '2024',
    title: 'Mega Strategic Infrastructure Projects',
    category: 'NATIONAL DEFENCE & GRID',
    text: 'Commissioned massive critical grid surveillance for JNPT Port, Mahatransco, and Colaba Depot under the Southern Army Command.',
    chips: ['⚓ JNPT Port Surveillance', '🏛️ Southern Army Command', '⚡ Mahatransco Grid'],
    badge: 'Phase 06'
  }
];

// Director's credentials with distinct domain specializations
const directorCredentials = [
  { icon: FiCpu, degree: 'BE — Production', domain: 'Engineering & Industrial Operations' },
  { icon: FiTrendingUp, degree: 'MBA — Marketing', domain: 'Strategic Growth & Enterprise Alliances' },
  { icon: Scale, degree: 'LLB — Law', domain: 'Corporate, Contract & Constitutional Law' },
];

const directorPartners = [
  'Valrack',
  'Emerson',
  'Xerox',
  'JNPT Port',
  'MAHATRANSCO',
  'MIDC',
  'CPWD',
  'Indian Railways',
];

// Icons cycle through the timeline nodes for visual variety — no new
// data needed, just reusing the icon set already imported for the
// stats strip below.
const timelineIcons = [FiAward, FiCpu, FiUsers, FiTrendingUp, FiCheckCircle];

// Pulled from solutions data — reuses whichever solution entry carries
// the certificate (e.g. UTC Gold Partner / Fire licensing) so we don't
// duplicate the data, just relocate where it's displayed (moved here
// from Solutions.jsx, now shown below the Director's Profile).
const certSolution = solutionsOverview.find((s) => s.certificate);

/* ------------------------------------------------------------------ */
/*  Local keyframes — kept scoped to this page, no new dependencies    */
/* ------------------------------------------------------------------ */
function AboutStyles() {
  return (
    <style>{`
      @keyframes floatOrb {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        50% { transform: translateY(-22px) translateX(10px); }
      }
      @keyframes gridDrift {
        from { background-position: 0px 0px, 0px 0px; }
        to { background-position: 48px 48px, 48px 48px; }
      }
      @keyframes pulseRing {
        0% { box-shadow: 0 0 0 0 rgba(0,96,48,.35); }
        70% { box-shadow: 0 0 0 14px rgba(0,96,48,0); }
        100% { box-shadow: 0 0 0 0 rgba(0,96,48,0); }
      }
      @keyframes shimmerLine {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes ringRotateSlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .about-blueprint-bg {
        background-image:
          linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
        background-size: 48px 48px, 48px 48px;
        animation: gridDrift 14s linear infinite;
      }
      .about-tilt-card {
        transform-style: preserve-3d;
        transition: transform .18s ease-out, box-shadow .3s ease;
        will-change: transform;
      }
      .about-tilt-card:hover {
        box-shadow: 0 25px 60px rgba(0,96,48,.16);
      }
      .timeline-card-creative {
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
      }
      .timeline-card-creative:hover {
        transform: translateY(-6px) scale(1.015) !important;
        border-color: rgba(0, 96, 48, 0.3) !important;
        box-shadow: 0 24px 60px rgba(0, 40, 20, 0.14) !important;
      }
      .timeline-year-watermark {
        font-size: 5.5rem;
        font-weight: 900;
        position: absolute;
        right: 16px;
        bottom: 4px;
        color: rgba(0, 96, 48, 0.05);
        line-height: 1;
        pointer-events: none;
        user-select: none;
        transition: all 0.4s ease;
        letter-spacing: -0.04em;
      }
      .timeline-card-creative:hover .timeline-year-watermark {
        transform: scale(1.08) translateY(-4px);
        color: rgba(240, 128, 32, 0.12);
      }
      .timeline-chip-pill {
        background: rgba(0, 96, 48, 0.06);
        border: 1px solid rgba(0, 96, 48, 0.15);
        color: #006030;
        font-size: 0.76rem;
        font-weight: 600;
        padding: 5px 12px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.25s ease;
      }
      .timeline-chip-pill:hover {
        background: rgba(240, 128, 32, 0.12);
        border-color: rgba(240, 128, 32, 0.35);
        color: #d97706;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(240, 128, 32, 0.15);
      }
      .timeline-node-creative {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #ffffff;
        border: 3px solid var(--color-primary);
        box-shadow: 0 0 0 6px rgba(0, 96, 48, 0.12), 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 4;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        flex-shrink: 0;
      }
      .timeline-item-wrapper:hover .timeline-node-creative {
        transform: scale(1.18);
        border-color: var(--color-secondary);
        color: var(--color-secondary) !important;
        box-shadow: 0 0 0 10px rgba(240, 128, 32, 0.2), 0 12px 30px rgba(240, 128, 32, 0.25);
      }
      .about-shimmer-badge {
        background: linear-gradient(90deg, var(--color-secondary) 0%, #ffd8a8 25%, var(--color-secondary) 50%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: shimmerLine 3.5s linear infinite;
      }
      .about-dot-active {
        animation: pulseRing 2.4s ease-out infinite;
      }
      .director-ring-motif {
        animation: ringRotateSlow 60s linear infinite;
      }
      .timeline-dot-icon {
        transition: transform .35s ease;
      }
      .timeline-content:hover .timeline-dot-icon {
        transform: scale(1.15) rotate(5deg);
      }
      .cert-card-pro {
        transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease, border-color .4s ease;
      }
      .cert-card-pro:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 55px rgba(0, 0, 0, .14);
        border-color: rgba(0, 96, 48, .25) !important;
      }
      .cert-card-pro:hover .cert-hover-overlay {
        opacity: 1;
      }
      .cert-card-pro .cert-card-image img {
        transition: transform .5s ease;
      }
      .cert-card-pro:hover .cert-card-image img {
        transform: scale(1.05);
      }
      .cert-cards-row {
        grid-template-columns: 1fr 1fr;
      }
      .director-executive-wrapper {
        position: relative;
        background: linear-gradient(145deg, #ffffff 0%, #f6faf7 100%);
        border: 1px solid rgba(0, 96, 48, 0.12);
        border-radius: 32px;
        padding: 48px;
        box-shadow: 0 25px 70px -20px rgba(0, 40, 20, 0.08);
        overflow: hidden;
      }
      .director-portrait-stage {
        position: relative;
        border-radius: 26px;
        overflow: hidden;
        background: #08170f;
        border: 1px solid rgba(0, 96, 48, 0.2);
        box-shadow: 0 30px 60px rgba(0, 20, 10, 0.18);
      }
      .director-floating-stat-badge {
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 24px;
        background: rgba(5, 20, 13, 0.88);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid rgba(240, 128, 32, 0.35);
        border-radius: 18px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 3;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
      }
      .director-pillar-card {
        background: #ffffff;
        border: 1px solid rgba(0, 96, 48, 0.1);
        border-radius: 18px;
        padding: 22px 24px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .director-pillar-card:hover {
        transform: translateY(-4px);
        border-color: rgba(240, 128, 32, 0.4);
        box-shadow: 0 16px 36px rgba(0, 40, 20, 0.09);
      }
      .director-cred-chip {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 18px;
        background: #ffffff;
        border: 1px solid rgba(0, 96, 48, 0.12);
        border-radius: 16px;
        transition: all 0.25s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      }
      .director-cred-chip:hover {
        transform: translateY(-2px);
        border-color: var(--color-primary);
        box-shadow: 0 8px 20px rgba(0, 96, 48, 0.1);
      }
      .director-partner-pill {
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(0, 96, 48, 0.06);
        border: 1px solid rgba(0, 96, 48, 0.14);
        color: #006030;
        font-size: 0.82rem;
        font-weight: 700;
        transition: all 0.2s ease;
      }
      .director-partner-pill:hover {
        background: var(--color-primary);
        color: #ffffff;
        transform: translateY(-2px);
      }
      @media (max-width: 992px) {
        .director-executive-wrapper { padding: 32px 24px; border-radius: 24px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .about-blueprint-bg, .about-shimmer-badge, .about-dot-active, .director-ring-motif { animation: none !important; }
        .about-tilt-card { transition: none !important; }
        .cert-card-pro, .cert-card-pro .cert-card-image img { transition: none !important; }
        .director-pillar-card, .director-cred-chip, .director-partner-pill { transition: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse-tracked 3D tilt wrapper — used across stat/skill/timeline    */
/*  cards to give every surface a sense of physical depth              */
/* ------------------------------------------------------------------ */
function TiltCard({ children, style, className = '', maxTilt = 7, ...rest }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)');

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`);
  };

  const handleLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`about-tilt-card ${className}`}
      style={{ transform, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

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

/* ------------------------------------------------------------------ */
/*  Modular highlight tile — used for the director's 2x2 credential   */
/*  grid. Same visual language as the stats-strip tiles, now with an  */
/*  icon so each stat reads instantly instead of as a bare number.     */
/* ------------------------------------------------------------------ */
function HighlightTile({ icon, value, label }) {
  return (
    <TiltCard
      maxTilt={5}
      style={{
        padding: '22px',
        borderRadius: '18px',
        background: '#fff',
        border: '1px solid rgba(0,96,48,.08)',
        boxShadow: '0 15px 35px rgba(0,0,0,.08)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'rgba(0,96,48,.08)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: value === 'Pan India' ? '1.15rem' : '1.7rem',
            fontWeight: 800,
            color: 'var(--color-primary)',
            marginBottom: '4px',
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '.76rem',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: '#6b7280',
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      </div>
    </TiltCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Modular timeline entry — redesigned with watermark typography,    */
/*  category tags, achievement chips, and dynamic hover effects.       */
/* ------------------------------------------------------------------ */
function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const Icon = timelineIcons[index % timelineIcons.length];
  const accent = isLeft ? 'var(--color-primary)' : 'var(--color-secondary)';

  return (
    <ScrollReveal
      variant={isLeft ? 'swing-right-3d' : 'swing-left-3d'}
      className={`timeline-item-wrapper ${isLeft ? 'left' : 'right'}`}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: isLeft ? 'row' : 'row-reverse',
        }}
        className="timeline-item"
      >
        <TiltCard
          maxTilt={4}
          style={{
            width: '46%',
            background: '#ffffff',
            border: '1px solid rgba(0,96,48,.12)',
            boxShadow: '0 18px 45px rgba(0,40,20,.07)',
            borderRadius: '24px',
            padding: '32px 28px',
            position: 'relative',
            textAlign: 'left',
            overflow: 'hidden',
          }}
          className="timeline-content timeline-card-creative"
        >
          {/* Top animated shimmer border accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: isLeft
                ? 'linear-gradient(90deg, #006030 0%, #f08020 100%)'
                : 'linear-gradient(90deg, #f08020 0%, #006030 100%)',
            }}
          />

          {/* Background giant watermark year */}
          <div className="timeline-year-watermark">
            {item.year}
          </div>

          {/* Header Row: Category Tag & Phase Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontSize: '.72rem',
                fontWeight: 800,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: isLeft ? '#006030' : '#f08020',
                background: isLeft ? 'rgba(0,96,48,.08)' : 'rgba(240,128,32,.1)',
                padding: '4px 12px',
                borderRadius: '999px',
                border: `1px solid ${isLeft ? 'rgba(0,96,48,.2)' : 'rgba(240,128,32,.25)'}`,
              }}
            >
              {item.category}
            </span>

            <span
              style={{
                fontSize: '.72rem',
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '.08em',
              }}
            >
              {item.badge || `Milestone ${String(index + 1).padStart(2, '0')}`}
            </span>
          </div>

          {/* Main Title & Year Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-secondary)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {item.year}
            </span>
            <h4
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                margin: 0,
                color: 'var(--color-text-dark)',
                lineHeight: 1.35,
              }}
            >
              {item.title}
            </h4>
          </div>

          {/* Description */}
          <p
            style={{
              color: '#475569',
              fontSize: '0.92rem',
              margin: '0 0 18px',
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {item.text}
          </p>

          {/* Achievement Chips Row */}
          {item.chips && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {item.chips.map((chip, idx) => (
                <span key={idx} className="timeline-chip-pill">
                  {chip}
                </span>
              ))}
            </div>
          )}
        </TiltCard>

        {/* Timeline Center Node */}
        <div
          className="timeline-node-creative about-dot-active"
          style={{
            borderColor: accent,
            color: accent,
          }}
        >
          <Icon className="timeline-dot-icon" size={20} />
        </div>

        {/* Empty Spacer */}
        <div style={{ width: '46%' }} className="timeline-spacer" />
      </div>
    </ScrollReveal>
  );
}

export default function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 40%'],
  });
  const lineScale = useTransform(timelineProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      <AboutStyles />

      {/* PAGE HEADER */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', padding: '140px 0 80px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* Blueprint grid motif — signature engineering texture, drifts subtly */}
        <div className="about-blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

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
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-120px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.05))',
            boxShadow: '0 12px 30px rgba(0,0,0,.12)',
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
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(3rem, 5vw,4.6rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}
          >
            Our <span className="about-shimmer-badge">Company</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '720px', margin: '0' }}
          >
            Engineering trust into fire safety, security, and critical infrastructure since 2019.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gap: '28px',
              marginTop: '48px',
              maxWidth: '760px',
            }}
            className="about-hero-stats"
          >
            {[
              { value: '22+', label: 'Years Leadership' },
              { value: '49+', label: 'Projects' },
              { value: '40+', label: 'Professionals' },
              { value: 'Pan India', label: 'Presence' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <TiltCard
                  maxTilt={5}
                  style={{
                    padding: '22px 18px',
                    borderRadius: '18px',
                    background: 'rgba(255,255,255,.08)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,.14)',
                  }}
                >
                  <div
                    style={{
                      fontSize: item.value === 'Pan India' ? '1.25rem' : '2rem',
                      fontWeight: 800,
                      color: '#fff',
                      lineHeight: 1.1,
                      marginBottom: '8px',
                    }}
                  >
                    {item.value === 'Pan India' ? item.value : <Counter end={item.value} />}
                  </div>

                  <div
                    style={{
                      fontSize: '.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '.12em',
                      color: '#d3ded9',
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
<div className="about-grid">
              <ScrollReveal variant="fade-right">
              <div className="about-text-content">
                <span className="eyebrow" style={{ color: 'var(--color-primary)' }}>Incorporated in 2019</span>
                <ScrollText
                  as="h2"
                  text="A Legacy of Engineering Precision"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', fontWeight: 800, color: 'var(--color-text-dark)', margin: '8px 0 20px' }}
                  amount={0.4}
                />
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.9, margin: '0 0 24px', maxWidth: '640px' }}>
                  Prudent EPC Pvt. Ltd. is a wholly owned subsidiary of Prudent Controls Pvt. Ltd.,
                  a technology services company with deep experience in fire safety and security
                  systems for industrial and commercial projects. We provide end-to-end design, supply, installation, commissioning, and maintenance of high-hazard facilities.
                </p>
                <ScrollStagger
                  variant="fade-right"
                  stagger={0.06}
                  style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}
                >
                  {skills.slice(0, 7).map((skill) => (
                    <div key={skill} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '4px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.98rem', color: 'var(--color-text-body)' }}>{skill}</span>
                    </div>
                  ))}
                </ScrollStagger>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale-in" className="about-image-wrapper">
              <TiltCard
                maxTilt={4}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,96,48,.08)',
                  boxShadow: '0 30px 70px rgba(0,0,0,.12)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    background: 'rgba(255,255,255,.95)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '18px',
                    padding: '18px 22px',
                    boxShadow: '0 15px 40px rgba(0,0,0,.15)',
                    border: '1px solid rgba(255,255,255,.4)',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: '.75rem',
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: '#777',
                      fontWeight: 600,
                    }}
                  >
                    Established
                  </div>

                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                      lineHeight: 1,
                      margin: '6px 0',
                    }}
                  >
                    2019
                  </div>

                  <div
                    style={{
                      fontSize: '.9rem',
                      color: '#555',
                      fontWeight: 600,
                    }}
                  >
                    Engineering Excellence
                  </div>
                </div>

             <img
  src="/assets/images/company-img.png"
  alt="Prudent EPC office and company overview"
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
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-section" style={{ padding: '80px 0', background: 'linear-gradient(180deg,#f8fbf9 0%,#ffffff 100%)', borderTop: '1px solid var(--color-gray-100)', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container">
          <ScrollStagger
            variant="rise-blur-3d"
            stagger={0.1}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}
          >
            {[
              { icon: <FiAward size={36} />, label: 'Projects Completed', value: '49+' },
              { icon: <FiUsers size={36} />, label: 'Direct Employees', value: '40+' },
              { icon: <FiCpu size={36} />, label: 'IBMS Installations', value: '60+' },
              { icon: <FiTrendingUp size={36} />, label: 'Leadership Experience', value: '22+' },
            ].map((stat) => (
              <TiltCard
                key={stat.label}
                style={{
                  background: '#fff',
                  borderRadius: '22px',
                  padding: '38px 24px',
                  border: '1px solid rgba(0,96,48,.08)',
                  boxShadow: '0 15px 40px rgba(0,0,0,.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    width: '78px',
                    height: '78px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,96,48,.08)',
                    color: 'var(--color-primary)',
                    marginBottom: '24px',
                  }}
                >
                  {stat.icon}
                </motion.div>
                <h3 style={{ fontSize: '3.2rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--color-text-dark)', letterSpacing: '-0.02em' }}>
                  <Counter end={stat.value} />
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase' }}>{stat.label}</span>
              </TiltCard>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* TIMELINE SECTION — a self-drawing engineering schematic line,
          built from the modular <TimelineItem> component above so
          each milestone carries an icon and index tag instead of a
          bare card. */}
      <section className="section timeline-section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <ScrollReveal variant="fade-up">
            <SectionTitle
              eyebrow="Milestones"
              title="Our Growth Journey"
              align="center"
            />
          </ScrollReveal>

          <div ref={timelineRef} style={{ position: 'relative', maxWidth: '1000px', margin: '60px auto 0' }}>
            {/* Track (faint, always visible) */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '4px',
                background: 'rgba(0,96,48,.12)',
                transform: 'translateX(-50%)',
              }}
              className="timeline-line"
            />
            {/* Fill (draws in as user scrolls through the timeline — reads as a live schematic being traced) */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: '4px',
                height: '100%',
                background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))',
                transform: 'translateX(-50%)',
                transformOrigin: 'top',
                scaleY: lineScale,
                borderRadius: '4px',
              }}
            />
            {/* Traveling marker */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: dotTop,
                width: '14px',
                height: '14px',
                marginLeft: '-7px',
                marginTop: '-7px',
                borderRadius: '50%',
                background: 'var(--color-secondary)',
                boxShadow: '0 0 0 6px rgba(240,128,32,.18)',
                zIndex: 3,
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {timelineData.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mr. Avinash Patil Profile — Modern Executive Leadership Showcase */}
      <section className="section director-section" style={{ background: 'var(--color-light)', padding: '100px 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="director-executive-wrapper">
            {/* Ambient Background Blueprint Motif */}
            <div
              className="about-blueprint-bg"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.28,
                pointerEvents: 'none',
              }}
            />

            <div
              className="director-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '60px',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Left Column: Architectural Executive Portrait Frame */}
              <ScrollReveal variant="fade-right">
                <div style={{ position: 'relative' }}>
                  {/* Glowing Laser Border Underlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '-12px',
                      borderRadius: '32px',
                      background: 'radial-gradient(circle at 80% 20%, rgba(240, 128, 32, 0.25) 0%, rgba(0, 96, 48, 0.15) 50%, transparent 80%)',
                      filter: 'blur(16px)',
                      zIndex: 0,
                    }}
                  />

                  <TiltCard
                    maxTilt={4}
                    className="director-portrait-stage"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {/* Top Floating Badge: Founder & Managing Director */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 3,
                        padding: '8px 18px',
                        borderRadius: '999px',
                        background: 'rgba(5, 20, 13, 0.75)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(240, 128, 32, 0.4)',
                        fontSize: '.75rem',
                        fontWeight: 700,
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: '#f08020',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      }}
                    >
                      <FiZap size={13} style={{ color: '#f08020' }} />
                      <span>Founder & Director</span>
                    </div>

                    {/* Portrait Image */}
                    <img
                      src="/assets/images/director.jpg"
                      alt="Mr. Avinash Patil, Director"
                      style={{
                        width: '100%',
                        height: '560px',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        display: 'block',
                        transition: 'transform .6s ease',
                      }}
                      className="director-profile-img"
                    />

                    {/* Gradient Vignette */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(3, 15, 9, 0.85) 0%, rgba(3, 15, 9, 0.1) 40%, transparent 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Floating Bottom Glass Stat Badge */}
                    <div className="director-floating-stat-badge">
                      <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                          22<span style={{ color: '#f08020' }}>+</span> Years
                        </div>
                        <div style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9ec3ae', marginTop: '3px' }}>
                          Visionary Industry Leadership
                        </div>
                      </div>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(240, 128, 32, 0.18)',
                          border: '1px solid #f08020',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#f08020',
                        }}
                      >
                        <FiTrendingUp size={16} />
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </ScrollReveal>

              {/* Right Column: Executive Narrative, Credentials & Highlights */}
              <ScrollReveal variant="fade-left">
                <div className="director-text">
                  <span
                    className="eyebrow"
                    style={{
                      color: 'var(--color-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ width: '22px', height: '2px', background: 'var(--color-secondary)' }} />
                    Executive Leadership
                  </span>

                  <ScrollText
                    as="h2"
                    text="Mr. Avinash Patil"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                      fontWeight: 800,
                      margin: '6px 0 6px',
                      color: 'var(--color-text-dark)',
                      letterSpacing: '-0.02em',
                    }}
                    amount={0.4}
                  />

                  <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', margin: '0 0 24px', lineHeight: 1.4 }}>
                    Director — Prudent Controls Pvt. Ltd. & Prudent EPC Pvt. Ltd.
                  </p>

                  {/* Academic & Legal Credentials Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '12px',
                      marginBottom: '26px',
                    }}
                  >
                    {directorCredentials.map((cred, idx) => {
                      const Icon = cred.icon;
                      return (
                        <div key={idx} className="director-cred-chip">
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              background: 'rgba(0, 96, 48, 0.08)',
                              color: 'var(--color-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={18} />
                          </div>
                          <div>
                            <div style={{ fontSize: '.88rem', fontWeight: 800, color: 'var(--color-text-dark)', lineHeight: 1.2 }}>
                              {cred.degree}
                            </div>
                            <div style={{ fontSize: '.72rem', color: '#64748b', marginTop: '2px', lineHeight: 1.2 }}>
                              {cred.domain}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 2 Strategic Leadership Dimension Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '26px' }}>
                    <div className="director-pillar-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <FiBriefcase style={{ color: 'var(--color-secondary)' }} size={17} />
                        <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                          Career Foundations & National Infrastructure Alliances
                        </h4>
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                        With 22 years of hands-on electro-mechanical leadership, Mr. Avinash Patil has spearheaded
                        mission-critical projects and strategic partnerships with esteemed industry leaders including{' '}
                        <strong>Valrack, Emerson, Xerox, JNPT Port, MAHATRANSCO, MIDC, CPWD, and Indian Railways</strong>.
                      </p>
                    </div>

                    <div className="director-pillar-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <FiTarget style={{ color: 'var(--color-primary)' }} size={17} />
                        <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                          Enterprise Scale & Multi-City Governance
                        </h4>
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                        He currently directs national operations in high-hazard fire protection, TIER-III data centres,
                        and building automation across <strong>Mumbai, Pune, and Delhi</strong>, leading an active workforce
                        of <strong>40+ direct professionals</strong> with deep mastery in business development, EPC financial governance,
                        and commercial contract law.
                      </p>
                    </div>
                  </div>

                  {/* Trusted Enterprise Partners & Bodies */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '10px' }}>
                      Key Engagements & Strategic Infrastructure Partners
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {directorPartners.map((partner, idx) => (
                        <span key={idx} className="director-partner-pill">
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 4 Impact Metric Highlights */}
                  <ScrollStagger
                    variant="rise-blur-3d"
                    stagger={0.08}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '16px',
                    }}
                    className="director-highlights"
                  >
                    <HighlightTile icon={<FiTrendingUp size={20} />} value="22+" label="Years Industry Leadership" />
                    <HighlightTile icon={<FiUsers size={20} />} value="40+" label="Direct Professionals" />
                    <HighlightTile icon={<FiCpu size={20} />} value="60+" label="IBMS Projects Delivered" />
                    <HighlightTile icon={<FiMapPin size={20} />} value="Pan India" label="Multi-City Operations" />
                  </ScrollStagger>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Certificate Cards — Certified Licensee (moved from Solutions.jsx)
              + Certificate of Registration, side by side below the
              Director's Profile grid */}
          {(certSolution?.certificate || true) && (
            <ScrollStagger
              variant="scale-in"
              stagger={0.15}
              style={{
                marginTop: '64px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                alignItems: 'stretch',
              }}
              className="cert-cards-row"
            >
              {/* Certified Licensee */}
              {certSolution?.certificate && (
                <div
                  className="cert-card cert-card-pro"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '28px',
                    padding: '28px',
                    height: '100%',
                    background: '#ffffff',
                    border: '1px solid var(--color-gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div
                    className="cert-card-image"
                    style={{
                      flexShrink: 0,
                      width: '150px',
                      height: '200px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: '1px solid var(--color-gray-300)',
                      position: 'relative',
                    }}
                  >
                    <a href={certSolution.certificate.image} target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                      <img
                        src={certSolution.certificate.image}
                        alt={certSolution.certificate.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 96, 48, 0.75)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          opacity: 0,
                          transition: 'opacity var(--transition-fast)',
                          textAlign: 'center',
                          padding: '0 10px',
                        }}
                        className="cert-hover-overlay"
                      >
                        View Certificate
                      </div>
                    </a>
                  </div>
                  <div className="cert-card-body">
                    <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Certified Licensee</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '8px' }}>{certSolution.certificate.label}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{certSolution.certificate.caption}</p>
                  </div>
                </div>
              )}

              {/* Certificate of Registration */}
              <div
                className="cert-card cert-card-pro"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '28px',
                  padding: '28px',
                  height: '100%',
                  background: '#ffffff',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  className="cert-card-image"
                  style={{
                    flexShrink: 0,
                    width: '150px',
                    height: '200px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-gray-300)',
                    position: 'relative',
                  }}
                >
                  <a href="/assets/images/registration-img.png" target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                    <img
                      src="/assets/images/registration-img.png"
                      alt="Certificate of Registration"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 96, 48, 0.75)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        opacity: 0,
                        transition: 'opacity var(--transition-fast)',
                        textAlign: 'center',
                        padding: '0 10px',
                      }}
                      className="cert-hover-overlay"
                    >
                      View Certificate
                    </div>
                  </a>
                </div>
                <div className="cert-card-body">
                  <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Registered Entity</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '8px' }}>Certificate of Registration</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    Officially registered entity, recognized for compliance with statutory and regulatory requirements.
                  </p>
                </div>
              </div>
            </ScrollStagger>
          )}
        </div>
      </section>

      {/* ADDITIONAL SKILLS & CREDENTIALS DETAILS */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <ScrollReveal variant="fade-up">
            <SectionTitle
              eyebrow="Certifications & Recognition"
              title="Trusted by Government, Enterprise & Critical Infrastructure"
              align="center"
            />
          </ScrollReveal>
          <ScrollStagger
            variant="rise-blur-3d"
            stagger={0.06}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginTop: '48px' }}
          >
            {skills.slice(7).map((skill, index) => (
              <TiltCard
                key={skill}
                maxTilt={5}
                style={{
                  background: '#fff',
                  borderRadius: '22px',
                  padding: '30px',
                  border: '1px solid rgba(0,96,48,.08)',
                  boxShadow: '0 18px 45px rgba(0,0,0,.08)',
                  display: 'flex',
                  gap: '16px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg,var(--color-primary),var(--color-secondary))',
                  }}
                />

                <div
                  style={{
                    minWidth: '58px',
                    height: '58px',
                    borderRadius: '16px',
                    background: 'rgba(0,96,48,.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '1rem', color: 'var(--color-text-body)', lineHeight: 1.75 }}>{skill}</span>
              </TiltCard>
            ))}
          </ScrollStagger>
        </div>
      </section>

      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg,var(--color-primary-dark) 0%,var(--color-primary) 100%)',
          padding: '110px 0',
        }}
      >
        {/* Blueprint grid motif ties this closing CTA back to the hero — signature continuity element */}
        <div className="about-blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />

        {/* Background Glow */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-180px',
            right: '-180px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240,128,32,.15) 0%, transparent 70%)',
          }}
        />

        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '-180px',
            left: '-180px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,.08) 0%, transparent 70%)',
          }}
        />

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          <span
            style={{
              color: 'var(--color-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '.18em',
              fontWeight: 700,
            }}
          >
            Let's Build Together
          </span>

          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(2.8rem,5vw,4.5rem)',
              fontWeight: 800,
              margin: '18px 0',
              lineHeight: 1.1,
            }}
          >
            Engineering Tomorrow's
            <br />
            Critical Infrastructure
          </h2>

          <p
            style={{
              color: '#dbe5df',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              maxWidth: '720px',
              margin: '0 auto 40px',
            }}
          >
            From fire safety systems to intelligent building automation,
            Prudent EPC delivers end-to-end engineering solutions trusted
            by industries, government organisations and enterprises across India.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
            }}
          >
            <MagneticButton style={{ display: 'inline-block' }}>
              <motion.a
                href="/contact"
                className="btn btn-primary"
                whileHover={{ y: -3, boxShadow: '0 14px 30px rgba(0,0,0,.25)' }}
                whileTap={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Discuss Your Project
              </motion.a>
            </MagneticButton>

            <motion.a
              href="/projects"
              className="btn btn-outline-light"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              View Our Projects
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
}