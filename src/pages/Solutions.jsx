import { Routes, Route, useLocation } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { solutionsOverview } from '../data/solutions';
import ScrollReveal from '../components/ScrollReveal';
import ScrollStagger from '../components/ScrollStagger';
import ScrollText from '../components/ScrollText';
import SolutionCard from '../components/SolutionCard';
import ContactCTA from '../components/ContactCTA';

/* ------------------------------------------------------------------ */
/*  Local styles — scoped to this page, no new dependencies. Same     */
/*  elevation/hover language already used on home.css / Services.jsx  */
/*  (layered shadows, gradient accent bar, subtle 3D lift on hover).  */
/* ------------------------------------------------------------------ */
function SolutionsStyles() {
  return (
    <style>{`
      .solution-stat-tile {
        transition: transform .35s cubic-bezier(.22,1,.36,1), border-color .35s ease, box-shadow .35s ease;
      }
      .solution-stat-tile:hover {
        transform: translateY(-4px);
        border-color: rgba(240, 128, 32, .45) !important;
        box-shadow: 0 16px 34px rgba(0, 0, 0, .18);
      }

      .solution-feature-card {
        position: relative;
        overflow: hidden;
        transition:
          transform .45s cubic-bezier(.22,1,.36,1),
          box-shadow .45s ease,
          border-color .45s ease;
      }
      .solution-feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
        transition: width .45s ease;
        z-index: 1;
      }
      .solution-feature-card:hover::before {
        width: 100%;
      }
      .solution-feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 26px 60px rgba(0, 0, 0, .12);
        border-color: rgba(0, 96, 48, .18) !important;
      }
      .solution-feature-image-frame {
        overflow: hidden;
      }
      .solution-feature-image-frame img {
        transition: transform .7s cubic-bezier(.22,1,.36,1);
      }
      .solution-feature-card:hover .solution-feature-image-frame img {
        transform: scale(1.06);
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

      @media (prefers-reduced-motion: reduce) {
        .solution-stat-tile,
        .solution-feature-card,
        .solution-feature-card::before,
        .solution-feature-image-frame img,
        .cert-card-pro,
        .cert-card-pro .cert-card-image img {
          transition: none !important;
        }
      }
    `}</style>
  );
}

function SolutionsOverview() {
  return (
    <>
      <SolutionsStyles />

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
          <ScrollText
            as="h1"
            text="What We Do"
            style={{ fontSize: 'clamp(3rem,5vw,4.8rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}
            amount={0}
          />
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '760px', margin: '0' }}>
            Our services cover the full spectrum — from conceptualization to testing &amp;
            commissioning — across Building Automation, Fire Detection &amp; Alarm, Public
            Address, and Security &amp; Surveillance Systems.
          </p>
          <ScrollStagger
            variant="rise-blur-3d"
            stagger={0.08}
            className="solutions-hero-stats"
            style={{
              display: 'grid',
              gap: '24px',
              marginTop: '46px',
              maxWidth: '760px',
            }}
          >
            {[
              ['22+', 'Years'],
              ['49+', 'Projects'],
              ['Pan India', 'Presence'],
              ['24×7', 'Support'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="solution-stat-tile"
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.05))',
                  border: '1px solid rgba(255,255,255,.12)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  style={{
                    fontSize: value === 'Pan India' ? '1.3rem' : '2rem',
                    fontWeight: 800,
                    color: '#fff',
                  }}
                >
                  {value}
                </div>

                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.12em',
                    color: '#dbe5df',
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </ScrollStagger>
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
      <SolutionsStyles />

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
          <ScrollText
            as="h1"
            text={sol.title}
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, margin: '8px 0 0', color: '#fff' }}
            amount={0}
          />
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
                      <ScrollStagger
                        variant="fade-left"
                        stagger={0.05}
                        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                      >
                        {group.items.map((item) => (
                          <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0, marginTop: '2px' }}>
                              <FiCheck style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }} />
                            </div>
                            <span style={{ fontSize: '0.96rem', color: 'var(--color-text-body)' }}>{item}</span>
                          </div>
                        ))}
                      </ScrollStagger>
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
                variant={i % 2 === 0 ? 'swing-right-3d' : 'swing-left-3d'}
                className="solution-feature-reveal"
              >
                <div
                  className={`solution-feature solution-feature-card ${i % 2 === 1 ? 'reverse' : ''}`}
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
                  <ScrollReveal variant="rise-blur-3d" delay={0.1} className="solution-feature-image solution-feature-image-frame" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: '280px' }}>
                    <img
                      src={d.image}
                      alt={d.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </ScrollReveal>
                  <div className="solution-feature-text">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '14px' }}>{d.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>{d.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
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