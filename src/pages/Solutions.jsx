import { Routes, Route, useLocation } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { solutionsOverview } from '../data/solutions';
import ScrollReveal from '../components/ScrollReveal';
import SolutionCard from '../components/SolutionCard';
import ContactCTA from '../components/ContactCTA';

function SolutionsOverview() {
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
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Solutions</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}>What We Do</h1>
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '640px', margin: '0' }}>
            Our services cover the full spectrum — from conceptualization to testing &amp;
            commissioning — across Building Automation, Fire Detection &amp; Alarm, Public
            Address, and Security &amp; Surveillance Systems.
          </p>
        </div>
      </section>

      {/* SOLUTIONS LIST */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="solutions-overview-grid">
            {solutionsOverview.map((sol, i) => (
              <SolutionCard
                key={sol.id}
                id={sol.id}
                title={sol.title}
                blurb={sol.blurb}
                image={sol.image}
                path={sol.path}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SolutionDetail() {
  const { pathname } = useLocation();
  const slug = pathname.split('/').pop();
  const sol = solutionsOverview.find((s) => s.path.endsWith(slug)) || solutionsOverview[0];

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
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Solutions</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, margin: '8px 0 0', color: '#fff' }}>{sol.title}</h1>
        </div>
      </section>

      {/* SOLUTION CONTENT */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <ScrollReveal variant="fade-up">
            <p
              className="solution-intro"
              style={{
                fontSize: '1.2rem',
                color: 'var(--color-text-body)',
                lineHeight: 1.7,
                maxWidth: '960px',
                margin: '0 auto 60px',
                textAlign: 'center',
              }}
            >
              {sol.intro}
            </p>
          </ScrollReveal>
        </div>

        {/* Layout A: image + side-by-side bullet groups (Data Centre / IBMS) */}
        {sol.bulletGroups && (
          <div className="container">
            <div className="dc-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start' }}>
              <ScrollReveal variant="fade-right">
                <div
                  className="dc-image-wrap"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-gray-100)',
                    height: '400px',
                  }}
                >
                  <img
                    src={sol.image}
                    alt={sol.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              </ScrollReveal>
              
              <ScrollReveal variant="fade-left">
                <div className="dc-bullets" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {sol.bulletGroups.map((group) => (
                    <div className="dc-bullet-group" key={group.heading}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-secondary)' }}></span>
                        {group.heading}
                      </h3>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {group.items.map((item) => (
                          <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0, marginTop: '2px' }}>
                              <FiCheck style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }} />
                            </div>
                            <span style={{ fontSize: '0.96rem', color: 'var(--color-text-body)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        )}

        {/* Layout B: repeating feature cards (Fire Safety, Security, etc.) */}
        {sol.details && (
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '64px', marginTop: '24px' }}>
            {sol.details.map((d, i) => (
              <ScrollReveal
                key={d.title}
                variant={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                className="solution-feature-reveal"
              >
                <div
                  className={`solution-feature ${i % 2 === 1 ? 'reverse' : ''}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '64px',
                    alignItems: 'center',
                    background: 'var(--color-white)',
                    padding: '32px',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-gray-100)',
                  }}
                >
                  <div
                    className="solution-feature-image"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      height: '280px',
                    }}
                  >
                    <img
                      src={d.image}
                      alt={d.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="solution-feature-text">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '14px' }}>{d.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>{d.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Certificate Card */}
        {sol.certificate && (
          <div className="container" style={{ marginTop: '64px' }}>
            <ScrollReveal variant="scale-in">
              <div
                className="cert-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                  margin: '0 auto',
                  padding: '32px',
                  maxWidth: '780px',
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
                    width: '180px',
                    height: '240px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-gray-300)',
                    position: 'relative',
                  }}
                >
                  <a href={sol.certificate.image} target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                    <img
                      src={sol.certificate.image}
                      alt={sol.certificate.label}
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
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        opacity: 0,
                        transition: 'opacity var(--transition-fast)',
                      }}
                      className="cert-hover-overlay"
                    >
                      View Certificate
                    </div>
                  </a>
                </div>
                <div className="cert-card-body">
                  <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Certified Licensee</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '10px' }}>{sol.certificate.label}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{sol.certificate.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <ContactCTA />
    </>
  );
}

export default function Solutions() {
  return (
    <Routes>
      <Route index element={<SolutionsOverview />} />
      <Route path="fire-safety" element={<SolutionDetail />} />
      <Route path="security" element={<SolutionDetail />} />
      <Route path="data-centre" element={<SolutionDetail />} />
      <Route path="ibms" element={<SolutionDetail />} />
    </Routes>
  );
}
