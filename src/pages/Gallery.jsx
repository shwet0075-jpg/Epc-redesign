import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2, FiX } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import ScrollText from '../components/ScrollText';

// Gallery now sources the on-site work photos (w1.png – w18.png) instead of client logos.
// Categories are assigned round-robin across the 4 sectors below so the existing filter
// bar keeps working exactly as before — update `category`/`name`/`desc` per image once
// you know which project each photo belongs to.
const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'infrastructure', label: 'Infrastructure & Railways' },
  { id: 'government', label: 'Government & Defence' },
  { id: 'banking', label: 'Banking & Finance' },
  { id: 'corporate', label: 'Data Centres & Corporate' },
];

const galleryItems = Array.from({ length: 18 }, (_, i) => {
  const num = i + 1;
  const sectorCycle = ['infrastructure', 'government', 'banking', 'corporate'];
  return {
    logo: `/assets/images/work-img/w${num}.png`,
    name: `Project ${String(num).padStart(2, '0')}`,
    desc: 'On-site engineering, installation, testing, and commissioning work delivered by Prudent EPC.',
    category: sectorCycle[i % sectorCycle.length],
  };
});

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

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
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Project Gallery</span>
          <ScrollText
            as="h1"
            text="Our Work in Action"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}
            amount={0}
          />
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '640px', margin: '0' }}>
            Explore site images of high-stakes fire fighting, security grids, building automation, and data centres successfully delivered across India.
          </p>
        </div>
      </section>

      {/* GALLERY SECTOR */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          {/* Sector Filters */}
          <ScrollReveal variant="fade-up">
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  className="filter-button"
                  onClick={() => setFilter(cat.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: 'relative',
                    padding: '10px 24px',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    background: filter === cat.id ? 'transparent' : 'var(--color-gray-100)',
                    color: filter === cat.id ? 'var(--color-white)' : 'var(--color-text-muted)',
                    transition: 'color 0.3s ease',
                    overflow: 'hidden',
                  }}
                >
                  {filter === cat.id && (
                    <motion.span
                      layoutId="gallery-active-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: 'var(--color-primary)',
                        boxShadow: '0 4px 12px rgba(0, 96, 48, 0.2)',
                        zIndex: 0,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Masonry Layout Grid — kept on plain AnimatePresence/layout, not
              wrapped in ScrollStagger/ScrollReveal, since it already
              animates on filter change; stacking scroll-triggered variants
              on top of filter-driven layout animation causes flicker on
              re-filter. */}
          <motion.div 
            layout
            className="gallery-grid"
            style={{
              columns: '4 280px',
              columnGap: '24px',
              width: '100%',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.logo}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: '24px',
                    position: 'relative',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: '#ffffff',
                    border: '1px solid var(--color-gray-300)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'zoom-in',
                  }}
                  className="gallery-item-card"
                  onClick={() => setLightbox(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setLightbox(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.name} project details`}
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform var(--transition-med)',
                    }}
                    className="gallery-item-image"
                  />
                  
                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 96, 48, 0.85) 0%, rgba(18, 24, 21, 0.2) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '24px',
                      opacity: 0,
                      transition: 'opacity var(--transition-fast)',
                    }}
                    className="gallery-hover-overlay"
                  >
                    <div style={{ color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ marginRight: '16px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {item.category}
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '4px 0 0', color: '#fff', lineHeight: 1.3 }}>{item.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#d3ded9', margin: '4px 0 0', lineHeight: 1.4 }}>{item.desc}</p>
                      </div>
                      <div style={{ background: 'var(--color-secondary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiMaximize2 size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX POPUP MODAL — unchanged, its own AnimatePresence transition
          is already the right tool here */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(18, 24, 21, 0.95)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setLightbox(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--color-primary)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <FiX size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                maxWidth: '900px',
                width: '100%',
                boxShadow: 'var(--shadow-lg)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ height: '100%', maxHeight: '480px', overflow: 'hidden' }}>
                <img src={lightbox.logo} alt={lightbox.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="eyebrow" style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {lightbox.category} Project
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '16px', lineHeight: 1.3 }}>{lightbox.name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Successfully executed design, procurement, supply, installation, testing, and commissioning services matching NBC, state, and regulatory specifications.
                </p>
                <div style={{ background: 'var(--color-light)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-gray-100)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--color-primary)', textTransform: 'uppercase' }}>Scope of Delivery</h4>
                  <p style={{ color: 'var(--color-text-body)', fontSize: '0.92rem', margin: 0, fontWeight: 500 }}>{lightbox.desc}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}