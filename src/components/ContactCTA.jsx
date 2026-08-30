import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';

export default function ContactCTA({
  tagline = "Build With Us",
  title = "Have a project in mind? Let's engineer it together.",
  description = "From high-capacity fire safety networks and IP-CCTV security grids to robust TIER-III data centres, we bring engineering trust to every critical system.",
  primaryButtonText = "Get In Touch",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Write Email",
  secondaryButtonLink = "mailto:info@prudentepc.com",
}) {
  return (
    <section className="cta-section" style={{ padding: '24px 0 42px', background: 'var(--color-light)' }}>
      <div className="container">
        <ScrollReveal variant="scale-in">
          <div
            className="cta-card"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '44px 44px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-gray-100)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '32px',
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

            <div style={{ flex: '1 1 480px', position: 'relative', zIndex: 2 }}>
              <span className="eyebrow" style={{ marginBottom: '8px', display: 'inline-block' }}>{tagline}</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text-dark)', lineHeight: 1.2 }}>
                {title}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', margin: 0, maxWidth: '580px', lineHeight: 1.55 }}>
                {description}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {primaryButtonLink.startsWith('mailto:') ? (
                <a href={primaryButtonLink} className="btn btn-primary">
                  {primaryButtonText} <FiArrowRight />
                </a>
              ) : (
                <Link to={primaryButtonLink} className="btn btn-primary">
                  {primaryButtonText} <FiArrowRight />
                </Link>
              )}
              {secondaryButtonLink.startsWith('mailto:') ? (
                <a
                  href={secondaryButtonLink}
                  className="btn btn-outline"
                  style={{ background: '#fff' }}
                >
                  <FiMail /> {secondaryButtonText}
                </a>
              ) : (
                <Link
                  to={secondaryButtonLink}
                  className="btn btn-outline"
                  style={{ background: '#fff' }}
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
