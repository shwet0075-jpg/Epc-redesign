import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';

export default function ContactCTA() {
  return (
    <section className="cta-section" style={{ padding: '80px 0', background: 'var(--color-light)' }}>
      <div className="container">
        <ScrollReveal variant="scale-in">
          <div
            className="cta-card"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '60px 48px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-gray-100)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '40px',
            }}
          >
            {/* Subtle green gradient background accent */}
            <div
              style={{
                position: 'absolute',
                top: '-150px',
                right: '-150px',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 96, 48, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            {/* Subtle orange gradient background accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '-150px',
                left: '-150px',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240, 128, 32, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ flex: '1 1 500px', position: 'relative', zIndex: 2 }}>
              <span className="eyebrow" style={{ marginBottom: '8px' }}>Build With Us</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 16px', color: 'var(--color-text-dark)' }}>
                Have a project in mind? Let's engineer it together.
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', margin: 0, maxWidth: '580px' }}>
                From high-capacity fire safety networks and IP-CCTV security grids to robust TIER-III data centres, we bring engineering trust to every critical system.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Link to="/contact" className="btn btn-primary">
                Get In Touch <FiArrowRight />
              </Link>
              <a
                href="mailto:info@prudentepc.com"
                className="btn btn-outline"
                style={{ background: '#fff' }}
              >
                <FiMail /> Write Email
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
