import { FiCpu, FiServer, FiAward, FiShield, FiCheck } from 'react-icons/fi';
import { services } from '../data/services';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';

const iconMap = {
  epc: <FiCpu size={32} />,
  'remote-monitoring': <FiServer size={32} />,
  'project-works': <FiAward size={32} />,
  amc: <FiShield size={32} />,
};

export default function Services() {
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
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Engineering Services</span>
          <h1 style={{ fontSize:'clamp(3rem,5vw,4.8rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}>Services</h1>
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '760px', margin: '0' }}>
           Our engineering services extend beyond project delivery, providing complete lifecycle support—from engineering, procurement, commissioning, remote monitoring, modernization, and preventive maintenance to ensure reliable, efficient, and future-ready infrastructure.
          </p>
          <div
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
    <div
      key={label}
      style={{
        padding: '22px',
        borderRadius: '18px',
        background:
          'linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.05))',
        border: '1px solid rgba(255,255,255,.12)',
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
    </div>
  ))}
</div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {services.map((s, i) => (
            <ScrollReveal
              key={s.id}
              variant={i % 2 === 0 ? 'fade-right' : 'fade-left'}
              className="service-panel-reveal"
            >
              <div
                className={`service-panel ${i % 2 === 1 ? 'reverse' : ''}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '80px',
                  alignItems: 'center',
                  background: 'var(--color-white)',
                  padding: '48px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-gray-100)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Border accent indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '6px',
                    background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                  }}
                />

                <div
                  className="service-panel-image-wrap"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    height: '380px',
                    position: 'relative',
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

                <div className="service-panel-info">
                  <div
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
                  </div>

                  <h3 style={{ fontSize: 'clamp(1.8rem,2vw,2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '18px', lineHeight: 1.3 }}>
                    {s.title}
                  </h3>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '28px' }}>
                    {s.text}
                  </p>

                  {s.bullets && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {s.bullets.map((bullet) => (
                        <div key={bullet} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                            <FiCheck style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }} />
                          </div>
                          <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--color-text-body)' }}>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <ContactCTA />
    </>
  );
}
