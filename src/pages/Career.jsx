import { FiArrowUpRight, FiMail, FiMapPin, FiSettings, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

const benefits = [
  { icon: <FiShield size={28} />, title: 'Health & Security', desc: 'Comprehensive medical benefits and premium health coverage for all team members.' },
  { icon: <FiTrendingUp size={28} />, title: 'Growth & Learning', desc: 'Structured professional development plans, management seminars, and technical training.' },
  { icon: <FiSettings size={28} />, title: 'Innovative Systems', desc: 'Work with state-of-the-art building automation, early detection systems, and clean suppression technology.' },
  { icon: <FiUsers size={28} />, title: 'Empowering Culture', desc: 'Transparency-first approach, leadership mentoring, and an equal opportunity workforce.' },
];

const processSteps = [
  { step: '01', title: 'Resume Submission', desc: 'Send your updated resume and cover letter detailing your engineering, operations, or administrative expertise.' },
  { step: '02', title: 'Technical Interview', desc: 'A rigorous conversation with our project management and senior engineering leads regarding core system methodologies.' },
  { step: '03', title: 'Leadership Alignment', desc: 'A final interaction focusing on organizational culture, stakeholder standards, and empowering values.' },
  { step: '04', title: 'Offer & Onboarding', desc: 'Receive your formal proposal and begin an exhaustive systems training program at one of our core operational centers.' },
];

const departments = [
  { name: 'Project Management & Execution', positions: 'Site Engineers, Project Leads, Operations Specialists' },
  { name: 'Design Engineering', positions: 'CAD Draftsmen, BMS Estimators, Fire Safety Consultants' },
  { name: 'Critical Infrastructure Maintenance', positions: 'Annual Maintenance Engineers, Monitoring Technicians' },
  { name: 'Finance & Administration', positions: 'Contract Managers, Accounts Executives, Legal Advisors' },
];

export default function Career() {
  return (
    <>
      <section className="page-header career-header" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', padding: '140px 0 80px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Careers</span>
          <h1>Build Your Future With Us</h1>
          <p>Empowering youth through state-of-the-art tools and systems. Join our team of over 40+ direct employees.</p>
        </div>
      </section>

      <section className="section opportunities-section">
        <div className="container">
          <ScrollReveal variant="fade-up">
            <SectionTitle
              eyebrow="Opportunities"
              title="Build What Matters"
              subtitle="We are constantly searching for energetic, design-focused, and operations-minded professionals who align with our values of transparency and a work-first approach."
              align="center"
            />
          </ScrollReveal>

          <div className="opportunities-grid">
            {departments.map((department, index) => (
              <ScrollReveal key={department.name} variant="fade-up" delay={index * 0.07}>
                <article className="opportunity-card">
                  <span className="opportunity-number" aria-hidden="true">0{index + 1}</span>
                  <span className="opportunity-tag">{department.name}</span>
                  <h3>{department.positions}</h3>
                  <div className="opportunity-meta">
                    <FiMapPin aria-hidden="true" />
                    <span>Mumbai, Pune, and Delhi HQ</span>
                  </div>
                  <a className="opportunity-apply" href={`mailto:careers@prudentepc.com?subject=${encodeURIComponent(`Application: ${department.name}`)}`}>
                    Apply now <FiArrowUpRight aria-hidden="true" />
                  </a>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="opportunities-contact">
            <FiMail aria-hidden="true" />
            <span>Share your profile with</span>
            <a href="mailto:careers@prudentepc.com">careers@prudentepc.com</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <SectionTitle eyebrow="Why Work Here" title="Empowering Professional Growth" align="center" />
          <div className="career-benefits-grid">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} variant="fade-up" delay={index * 0.07}>
                <article className="benefit-card career-benefit-card">
                  <div className="career-benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section career-process-section">
        <div className="container">
          <SectionTitle eyebrow="Our Process" title="How We Select Talent" align="center" />
          <div className="career-process-grid">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.step} variant="fade-up" delay={index * 0.07}>
                <article className="career-process-card">
                  <span>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
