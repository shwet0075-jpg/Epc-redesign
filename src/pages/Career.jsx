import { FiShield, FiTrendingUp, FiSettings, FiUsers, FiMail, FiMapPin } from 'react-icons/fi';
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
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Careers</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}>Build Your Future With Us</h1>
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '640px', margin: '0' }}>
            Empowering youth through state-of-the-art tools and systems. Join our team of over 40+ direct employees.
          </p>
        </div>
      </section>

      {/* WHY PRUDENT SECTION (BENEFITS) */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Why Work Here"
            title="Empowering Professional Growth"
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginTop: '56px' }}>
            {benefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} variant="fade-up" delay={i * 0.1}>
                <div
                  className="benefit-card"
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-gray-100)',
                    boxShadow: 'var(--shadow-sm)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px',
                    height: '100%',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'var(--color-primary-glow)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '10px' }}>{benefit.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECRUITMENT PROCESS TIMELINE */}
      <section className="section" style={{ background: 'var(--color-light)', overflow: 'hidden' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Our Process"
            title="How We Select Talent"
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '56px' }}>
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} variant="fade-up" delay={i * 0.12}>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-gray-300)',
                    boxShadow: 'var(--shadow-sm)',
                    borderRadius: 'var(--radius-md)',
                    padding: '32px 24px',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: 'var(--color-secondary-glow)',
                      position: 'absolute',
                      top: '12px',
                      right: '20px',
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '10px', marginTop: '16px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS & APPLICATIONS */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <ScrollReveal variant="fade-right">
            <div>
              <SectionTitle
                eyebrow="Opportunities"
                title="Current Operational Domains"
              />
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                We are constantly searching for energetic, design-focused, and operations-minded professionals who align with our values of transparency and a work-first approach.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <FiMapPin style={{ color: 'var(--color-secondary)', fontSize: '1.25rem', marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>Primary Locations</h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Mumbai, Pune, and Delhi HQ</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <FiMail style={{ color: 'var(--color-secondary)', fontSize: '1.25rem', marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>Submit Application</h4>
                    <a href="mailto:careers@prudentepc.com" style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600 }}>careers@prudentepc.com</a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  style={{
                    background: 'var(--color-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px 30px',
                    border: '1px solid var(--color-gray-100)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s ease',
                  }}
                  className="dept-card"
                >
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '8px' }}>
                    {dept.name}
                  </h4>
                  <span style={{ fontSize: '0.86rem', color: 'var(--color-primary)', fontWeight: 600, display: 'block', uppercase: 'true' }}>
                    Key Roles:
                  </span>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: '4px 0 0', lineHeight: 1.5 }}>
                    {dept.positions}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
