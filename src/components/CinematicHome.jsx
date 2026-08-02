import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiActivity, FiArrowRight, FiCheck, FiCpu, FiCrosshair, FiLayers, FiMonitor, FiShield, FiSliders, FiUsers, FiZap } from 'react-icons/fi';
import CountUp from './animations/CountUp';
import EngineeringIntelligence from './EngineeringIntelligence';
import EngineeringImpact from './EngineeringImpact';
import FeaturedProjects from './FeaturedProjects/FeaturedProjects';
import { clients } from '../data/clients';

const HeroInfrastructureScene = lazy(() => import('./HeroInfrastructureScene'));
gsap.registerPlugin(ScrollTrigger);

const solutions = [
  { number: '01', title: 'Fire Safety', label: 'DETECTION & SUPPRESSION', copy: 'Early detection, clean-agent suppression and life-safety systems engineered around your building.', icon: FiActivity, path: '/solutions/fire-safety', tone: 'fire' },
  { number: '02', title: 'Security', label: 'SURVEILLANCE & ACCESS', copy: 'One intelligent view across IP-CCTV, access control and your perimeter.', icon: FiCrosshair, path: '/solutions/security', tone: 'security' },
  { number: '03', title: 'Data Centre', label: 'CRITICAL INFRASTRUCTURE', copy: 'Resilient power, cooling and monitoring for environments that cannot pause.', icon: FiCpu, path: '/solutions/data-centre', tone: 'data' },
  { number: '04', title: 'Smart Buildings', label: 'IBMS & AUTOMATION', copy: 'A connected operating layer that turns building data into confident decisions.', icon: FiSliders, path: '/solutions/ibms', tone: 'building' },
];
const differentiators = [
  { icon: FiLayers, title: 'One integrated partner', text: 'Design, supply, install and maintain every critical system under one accountable team.' },
  { icon: FiShield, title: 'Built for criticality', text: 'Safety-first engineering for hospitals, data centres, public infrastructure and enterprise.' },
  { icon: FiZap, title: 'Smarter by design', text: 'Connected systems that detect early, respond fast and make operations visible.' },
  { icon: FiUsers, title: 'Execution, nationwide', text: 'Experienced project teams and reliable support across the country.' },
];
const principles = [
  { name: 'Vision', tag: 'THE HORIZON', copy: 'To set the standard for safe, intelligent infrastructure across India—where every building protects the people and operations inside it.' },
  { name: 'Mission', tag: 'THE COMMITMENT', copy: 'To deliver engineered systems with precision, transparency and lifecycle accountability from first drawing to long-term support.' },
  { name: 'Values', tag: 'THE WAY WE WORK', copy: 'Safety before shortcuts. Clarity before complexity. Ownership from site survey through successful handover.' },
];

function CssBuildingFallback() {
  return <div className="building-model" aria-hidden="true"><div className="model-halo" /><div className="model-floor model-floor--roof"><span /><span /><span /><span /></div><div className="model-floor model-floor--upper"><span /><span /><span /><span /></div><div className="model-floor model-floor--mid"><span /><span /><span /><span /></div><div className="model-floor model-floor--ground"><span /><span /><span /><span /></div><div className="model-side" /><i className="model-line model-line--one" /><i className="model-line model-line--two" /><i className="model-line model-line--three" /><div className="model-label model-label--safety"><FiActivity /> FIRE SAFE</div><div className="model-label model-label--secure"><FiMonitor /> SECURE</div><div className="model-label model-label--smart"><FiCpu /> CONNECTED</div><div className="model-orbit model-orbit--one" /><div className="model-orbit model-orbit--two" /></div>;
}

export default function CinematicHome() {
  const [principle, setPrinciple] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  useLayoutEffect(() => {
    if (shouldReduceMotion || window.matchMedia('(max-width: 760px)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '+=115%', scrub: .8, pin: true, anticipatePin: 1 } })
        .to('.next-hero__copy', { yPercent: -16, opacity: .24, ease: 'none' }, 0)
        .to('.next-hero__visual', { yPercent: 8, scale: 1.1, rotate: -2, ease: 'none' }, 0)
        .to('.hero-status', { opacity: 0, y: 18, ease: 'none' }, .35);

      gsap.utils.toArray('.solution-next-card').forEach((card, index) => {
        gsap.fromTo(card, { rotateX: 10, y: 58, opacity: .2 }, {
          rotateX: 0, y: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: servicesRef.current, start: `top+=${index * 80} 76%`, end: `top+=${370 + index * 80} 50%`, scrub: .65 },
        });
      });
    });
    return () => context.revert();
  }, [shouldReduceMotion]);

  return <>
    <section ref={heroRef} className="hero hero--next" aria-label="Prudent EPC smart infrastructure">
      <div className="hero-noise" aria-hidden="true" />
      <div className="container next-hero__grid">
        <motion.div className="next-hero__copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <p className="signal-label"><span /> SAFETY SYSTEMS, ENGINEERED AS ONE</p>
          <h1>Protection that <em>thinks</em> ahead.</h1>
          <p className="next-hero__lede">Prudent EPC designs the safety, security and intelligence layers that keep India’s most critical buildings protected, connected and ready.</p>
          <div className="next-hero__actions"><Link to="/contact" className="next-cta">Get a Free Consultation <FiArrowRight /></Link><Link to="/solutions" className="text-cta">Explore our expertise <FiArrowRight /></Link></div>
          <div className="hero-proof"><FiCheck /> <span>Single-point accountability from design to deployment.</span></div>
        </motion.div>
        <motion.div className="next-hero__visual" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .1 }}>
          <div className="hero-r3f-layer"><Suspense fallback={<CssBuildingFallback />}><HeroInfrastructureScene /></Suspense></div>
          <div className="hero-css-fallback"><CssBuildingFallback /></div>
        </motion.div>
      </div>
      <div className="container hero-status"><span><i /> SYSTEMS ONLINE</span><span>FIRE · SECURITY · DATA · IBMS</span><span className="status-scroll">SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section className="intro-section section"><div className="container intro-layout"><div><p className="section-kicker">ENGINEERING CONFIDENCE</p><h2>Critical systems demand more than a contractor.</h2></div><p className="intro-copy">We unite specialist engineering disciplines into a coordinated building ecosystem—so protection, insight and operations work together from day one.</p></div><div className="container differentiator-grid">{differentiators.map((item, index) => { const Icon = item.icon; return <motion.article className="differentiator-card" key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .08 }} whileHover={shouldReduceMotion ? undefined : { y: -8, rotateX: 3 }}><div className="card-icon"><Icon /></div><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></motion.article>; })}</div></section>

    <section ref={servicesRef} className="solutions-next section" id="solutions"><div className="container solutions-heading"><div><p className="section-kicker section-kicker--light">FOUR SYSTEMS. ONE STANDARD.</p><h2>Every layer of the building, in sync.</h2></div><Link className="text-cta text-cta--light" to="/solutions">View all solutions <FiArrowRight /></Link></div><div className="container solutions-next__grid">{solutions.map((solution) => { const Icon = solution.icon; return <Link key={solution.title} className={`solution-next-card solution-next-card--${solution.tone}`} to={solution.path}><span className="solution-next__number">{solution.number}</span><div className="solution-next__icon"><Icon /></div><div className="solution-next__content"><p>{solution.label}</p><h3>{solution.title}</h3><span>{solution.copy}</span></div><FiArrowRight className="solution-next__arrow" /></Link>; })}</div></section>

    <EngineeringIntelligence />
    <section className="proof-band"><div className="container proof-grid"><div className="proof-intro"><p className="section-kicker">TRUST, BUILT IN</p><h2>Measured in the environments we protect.</h2></div><div className="proof-stat"><strong><CountUp end={15} suffix="+" /></strong><span>years of engineering experience</span></div><div className="proof-stat"><strong><CountUp end={250} suffix="+" /></strong><span>critical projects delivered</span></div><div className="proof-stat"><strong>Pan India</strong><span>execution & lifecycle support</span></div></div></section>
    <EngineeringImpact />
    <FeaturedProjects />

    <section className="principles-section section"><div className="container principles-layout"><div className="principles-copy"><p className="section-kicker">HOW WE SHOW UP</p><h2>Progress is a system of principles.</h2><p>Reliable infrastructure starts with a reliable way of working. These commitments guide every survey, schematic and site handover.</p><div className="principle-tabs" role="tablist">{principles.map((item, index) => <button type="button" key={item.name} className={principle === index ? 'is-active' : ''} onClick={() => setPrinciple(index)} role="tab" aria-selected={principle === index}><span>0{index + 1}</span>{item.name}</button>)}</div></div><motion.article className="principle-panel" key={principles[principle].name} initial={{ opacity: 0, rotateY: 8, y: 12 }} animate={{ opacity: 1, rotateY: 0, y: 0 }} transition={{ duration: .36 }}><span className="principle-panel__orb" /><p>{principles[principle].tag}</p><h3>{principles[principle].name}</h3><blockquote>“{principles[principle].copy}”</blockquote><div className="principle-panel__index">0{principle + 1}<span>/ 03</span></div></motion.article></div></section>
    <section className="clients-next section"><div className="container clients-next__head"><div><p className="section-kicker">SELECT CLIENTS & INSTITUTIONS</p><h2>Trusted where reliability is non-negotiable.</h2></div><Link to="/clients" className="text-cta">Our client portfolio <FiArrowRight /></Link></div><div className="client-marquee" aria-label="Selected Prudent EPC clients"><div className="client-marquee__track">{[...clients.slice(0, 12), ...clients.slice(0, 12)].map((client, index) => <div className="client-name" key={`${client.name}-${index}`}>{client.name}</div>)}</div></div></section>
    <section className="closing-section"><div className="container closing-card"><div><p className="section-kicker section-kicker--light">START WITH A CLEARER PLAN</p><h2>Let’s make your next facility safer and smarter.</h2><p>Talk to an engineering specialist about your fire, security, data centre or IBMS requirements.</p></div><Link to="/contact" className="next-cta">Talk to our team <FiArrowRight /></Link><div className="closing-circuit" aria-hidden="true"><i /><i /><i /></div></div></section>
  </>;
}
