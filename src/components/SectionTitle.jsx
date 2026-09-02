import { motion, useReducedMotion } from 'framer-motion';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = ''
}) {
  const isCenter = align === 'center';
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`section-title-wrap ${isCenter ? 'text-center' : ''} ${className}`}
      style={{
        marginBottom: '48px',
        textAlign: align,
        maxWidth: isCenter ? '760px' : '100%',
        marginLeft: isCenter ? 'auto' : '0',
        marginRight: isCenter ? 'auto' : '0',
      }}
    >
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.42 }}
        >
          {eyebrow}
        </motion.span>
      )}
      
      <motion.h2
        className="section-main-title"
        style={{
          fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginTop: '8px',
          color: 'var(--color-text-dark)',
          position: 'relative',
          display: 'inline-block',
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.52, delay: shouldReduceMotion ? 0 : 0.06 }}
      >
        {title}
        <motion.span
          style={{
            display: 'block',
            height: '4px',
            width: '60px',
            backgroundColor: 'var(--color-secondary)',
            marginTop: '12px',
            borderRadius: '2px',
            marginLeft: isCenter ? 'auto' : '0',
            marginRight: isCenter ? 'auto' : '0',
            transformOrigin: isCenter ? 'center' : 'left',
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.2 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.38, delay: shouldReduceMotion ? 0 : 0.14 }}
        />
      </motion.h2>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          style={{
            fontSize: '1.1rem',
            color: 'var(--color-text-muted)',
            marginTop: '18px',
            lineHeight: 1.6,
            maxWidth: '680px',
            marginLeft: isCenter ? 'auto' : '0',
            marginRight: isCenter ? 'auto' : '0',
          }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.12 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
