import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SolutionCard({ title, blurb, image, path, index }) {
  return (
    <motion.div
      className="solution-card-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -8 }}
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-gray-100)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow var(--transition-fast), border-color var(--transition-fast)',
      }}
    >
      <div
        className="solution-card-image-wrap"
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
          objectFit: 'contain',
          background: 'var(--color-light)',
            transition: 'transform var(--transition-med)',
          }}
          className="solution-card-img"
        />
        <div
          className="solution-card-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0, 96, 48, 0.4) 0%, transparent 80%)',
            opacity: 0,
            transition: 'opacity var(--transition-fast)',
          }}
        />
      </div>

      <div
        className="solution-card-content"
        style={{
          padding: '32px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '12px',
              color: 'var(--color-text-dark)',
              transition: 'color var(--transition-fast)',
            }}
            className="solution-card-title"
          >
            {title}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            {blurb}
          </p>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Link
            to={path}
            className="link-arrow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-primary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color var(--transition-fast), gap var(--transition-fast)',
            }}
          >
            Read More <FiArrowRight className="arrow-icon" style={{ transition: 'transform var(--transition-fast)' }} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
