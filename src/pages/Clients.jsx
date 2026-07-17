import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clients } from '../data/clients';

// Dynamic categorization helper
const getCategory = (client) => {
  const name = client.name.toLowerCase();
  
  if (name.includes('rail') || name.includes('metro') || name.includes('coach') || name.includes('port') || name.includes('jnpt')) {
    return 'transport';
  }
  if (name.includes('parliament') || name.includes('pwd') || name.includes('bis') || name.includes('aiims') || name.includes('army') || name.includes('barc') || name.includes('mcgm') || name.includes('neigrihms') || name.includes('cpwd') || name.includes('bureau')) {
    return 'government';
  }
  if (name.includes('bank') || name.includes('fund') || name.includes('lic') || name.includes('edelweiss') || name.includes('saraswat')) {
    return 'banking';
  }
  return 'corporate';
};

const categories = [
  { id: 'all', label: 'All Sectors' },
  { id: 'transport', label: 'Infrastructure & Transport' },
  { id: 'government', label: 'Government & Defence' },
  { id: 'banking', label: 'Banking & Finance' },
  { id: 'corporate', label: 'Data Centres & Corporate' },
];

function Counter({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const endNum = parseInt(end.toString().replace(/\D/g, ''), 10);
    if (start === endNum) return;
    
    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / endNum));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endNum) clearInterval(timer);
    }, Math.max(incrementTime, 30));
    
    return () => clearInterval(timer);
  }, [end, duration, started]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {count}{end.toString().includes('+') ? '+' : ''}
    </motion.span>
  );
}

export default function Clients() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredClients = activeFilter === 'all' 
    ? clients 
    : clients.filter(c => getCategory(c) === activeFilter);

  // Marquee clients (select 12 notable logos for marquee)
  const marqueeClients = clients.slice(0, 12);

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
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Our Clients</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}>Trusted by Industry Leaders</h1>
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '640px', margin: '0' }}>
            From national railways and defence establishments to banks and data-driven
            enterprises — 49+ projects delivered across India.
          </p>
        </div>
      </section>

      {/* CONTINUOUS LOGO MARQUEE */}
      <section className="marquee-section" style={{ padding: '40px 0', background: '#ffffff', borderBottom: '1px solid var(--color-gray-100)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', textAlign: 'center' }}>
            Featured Partnerships
          </span>
        </div>
        <div className="logo-marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', position: 'relative' }}>
          <div className="logo-marquee-track" style={{ display: 'inline-flex', gap: '48px', animation: 'marquee 30s linear infinite' }}>
            {marqueeClients.map((client, idx) => (
              <div key={`m1-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '64px', background: 'var(--color-light)', borderRadius: '12px', padding: '10px' }}>
                <img src={client.logo} alt={client.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%) opacity(70%)' }} />
              </div>
            ))}
            {marqueeClients.map((client, idx) => (
              <div key={`m2-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '64px', background: 'var(--color-light)', borderRadius: '12px', padding: '10px' }}>
                <img src={client.logo} alt={client.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%) opacity(70%)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="section stats-strip" style={{ background: 'var(--color-light)', padding: '60px 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { label: 'Total Projects', value: '49+' },
              { label: 'Railways Divisions', value: '8+' },
              { label: 'Major Data Centres', value: '12+' },
              { label: 'State & Central Govt', value: '15+' },
            ].map((stat) => (
              <div key={stat.label}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', margin: '0 0 4px' }}>
                  <Counter end={stat.value} />
                </h3>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERABLE LISTING */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          {/* Sector Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="filter-button"
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeFilter === cat.id ? 'var(--color-primary)' : 'var(--color-gray-100)',
                  color: activeFilter === cat.id ? 'var(--color-white)' : 'var(--color-text-muted)',
                  transition: 'all 0.3s ease',
                  boxShadow: activeFilter === cat.id ? '0 4px 12px rgba(0, 96, 48, 0.15)' : 'none',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Client Grid */}
          <motion.div 
            layout
            className="client-grid" 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="client-card"
                  key={client.name}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px 28px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-gray-300)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    }}
                  />

                  <div>
                    <div
                      className="client-card-logo"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '20px',
                        background: 'var(--color-gray-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '16px',
                        marginBottom: '24px',
                        transition: 'transform var(--transition-fast)',
                      }}
                    >
                      <img src={client.logo} alt={client.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} loading="lazy" />
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '8px', lineHeight: 1.3 }}>
                      {client.name}
                    </h4>
                  </div>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5, marginTop: '8px' }}>
                    {client.desc}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
