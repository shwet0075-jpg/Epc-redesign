import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight, FiCheckCircle, FiShield, FiCpu, FiServer, FiTrendingUp } from 'react-icons/fi';
import { clients } from '../data/clients';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import '../styles/clients.css';

// Dynamic categorization helper
const getCategory = (client) => {
  const name = (client.name + ' ' + (client.desc || '')).toLowerCase();

  if (name.includes('rail') || name.includes('metro') || name.includes('coach') || name.includes('port') || name.includes('jnpt') || name.includes('railtel')) {
    return 'transport';
  }
  if (
    name.includes('parliament') ||
    name.includes('pwd') ||
    name.includes('bis') ||
    name.includes('aiims') ||
    name.includes('army') ||
    name.includes('barc') ||
    name.includes('mcgm') ||
    name.includes('neigrihms') ||
    name.includes('cpwd') ||
    name.includes('bureau') ||
    name.includes('iucaa')
  ) {
    return 'government';
  }
  if (
    name.includes('bank') ||
    name.includes('fund') ||
    name.includes('lic') ||
    name.includes('edelweiss') ||
    name.includes('saraswat') ||
    name.includes('boi') ||
    name.includes('idbi')
  ) {
    return 'banking';
  }
  return 'corporate';
};

const getCategoryLabel = (catId) => {
  switch (catId) {
    case 'transport':
      return 'Infrastructure & Transport';
    case 'government':
      return 'Government & Defence';
    case 'banking':
      return 'Banking & Finance';
    default:
      return 'Data Centres & Corporate';
  }
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

    const totalMilliseconds = duration;
    const incrementTime = Math.abs(Math.floor(totalMilliseconds / endNum));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endNum) clearInterval(timer);
    }, Math.max(incrementTime, 30));

    return () => clearInterval(timer);
  }, [end, duration, started]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      onViewportLeave={() => { setStarted(false); setCount(0); }}
      viewport={{ once: false }}
    >
      {count}
      {end.toString().includes('+') ? '+' : ''}
    </motion.span>
  );
}

export default function Clients() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  // Sector counts computation
  const categoryCounts = useMemo(() => {
    const counts = { all: clients.length, transport: 0, government: 0, banking: 0, corporate: 0 };
    clients.forEach((c) => {
      const cat = getCategory(c);
      if (counts[cat] !== undefined) counts[cat]++;
    });
    return counts;
  }, []);

  // Filter & Search combined
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesFilter = activeFilter === 'all' || getCategory(client) === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        client.name.toLowerCase().includes(q) ||
        (client.desc && client.desc.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Featured Marquee Clients
  const marqueeRow1 = clients.slice(0, 16);
  const marqueeRow2 = clients.slice(16, 32);

  return (
    <>
      {/* =========================================================
          1. MODERN ENTERPRISE HERO
      ========================================================= */}
      <section className="clients-hero">
        <div className="clients-hero-grid" />
        <div className="clients-hero-glow-1" />
        <div className="clients-hero-glow-2" />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="clients-eyebrow-badge">
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#f08020',
                display: 'inline-block',
                boxShadow: '0 0 8px #f08020',
              }}
            />
            CLIENT SHOWCASE & PARTNERSHIPS
          </div>

          <h1 className="clients-hero-title">
            Trusted by India’s Leading <span>Institutions & Enterprises</span>
          </h1>

          <p className="clients-hero-lead">
            From national railways, airports, and defence facilities to major banking headquarters and Tier-III/IV data centres across India.
          </p>

          {/* Interactive Search Box */}
          <div className="clients-search-wrapper">
            <div className="clients-search-box">
              <FiSearch style={{ color: '#006030', fontSize: '1.25rem', marginRight: '12px', flexShrink: 0 }} />
              <input
                type="text"
                className="clients-search-input"
                placeholder="Search by client name, project type, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clients-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CONTINUOUS DUAL-TRACK LOGO MARQUEE
      ========================================================= */}
      <section className="clients-marquee-section">
        <div className="clients-marquee-track-container">
          <div className="clients-marquee-row">
            {[...marqueeRow1, ...marqueeRow1].map((client, idx) => (
              <div
                key={`m1-${idx}`}
                className="clients-marquee-pill"
                onClick={() => setSelectedClient(client)}
                role="button"
                tabIndex={0}
              >
                <img src={client.logo} alt={client.name} loading="lazy" />
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="clients-marquee-track-container" style={{ marginTop: '12px' }}>
          <div className="clients-marquee-row" style={{ animationDirection: 'reverse' }}>
            {[...marqueeRow2, ...marqueeRow2].map((client, idx) => (
              <div
                key={`m2-${idx}`}
                className="clients-marquee-pill"
                onClick={() => setSelectedClient(client)}
                role="button"
                tabIndex={0}
              >
                <img src={client.logo} alt={client.name} loading="lazy" />
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          3. INSTITUTIONAL IMPACT METRICS
      ========================================================= */}
      <section className="client-stats-section">
        <div className="container">
          <div className="stats-grid-4">
            {[
              { label: 'Enterprise & PSU Clients', value: '50+' },
              { label: 'Indian Railways Divisions', value: '8+' },
              { label: 'Central & State Govt Bodies', value: '15+' },
              { label: 'Critical Facility Projects', value: '60+' },
            ].map((stat) => (
              <div key={stat.label} className="stat-box-card">
                <div className="stat-number-val">
                  <Counter end={stat.value} />
                </div>
                <div className="stat-label-txt">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. FILTERABLE CLIENT PORTFOLIO GRID
      ========================================================= */}
      <section className="client-listing-section">
        <div className="container">
          {/* Sector Category Filters */}
          <ScrollReveal variant="fade-up">
            <div className="filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-tab ${activeFilter === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat.id)}
                  type="button"
                >
                  <span>{cat.label}</span>
                  <span className="filter-tab-count">{categoryCounts[cat.id]}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Results Status Bar */}
          <div className="results-meta">
            <span className="results-count">
              Showing <strong>{filteredClients.length}</strong> of {clients.length} Clients
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            {(activeFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#006030',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Client Cards Grid */}
          {filteredClients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8faf9', borderRadius: '20px' }}>
              <FiSearch size={40} style={{ color: '#94a3b8', marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#1e293b', marginBottom: '8px' }}>No clients found</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>
                We couldn’t find any matches for &quot;{searchQuery}&quot;. Try adjusting your search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  background: '#006030',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Show All Clients
              </button>
            </div>
          ) : (
            <motion.div layout className="clients-grid">
              <AnimatePresence mode="popLayout">
                {filteredClients.map((client) => {
                  const catId = getCategory(client);
                  const catLabel = getCategoryLabel(catId);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={client.name}
                      className="client-card-creative"
                      onClick={() => setSelectedClient(client)}
                    >
                      {/* Top Bar with Category Badge */}
                      <div className="client-card-top">
                        <span className="client-category-tag">{catLabel}</span>
                        <FiCheckCircle style={{ color: '#006030', fontSize: '1.1rem' }} />
                      </div>

                      {/* Clean Logo Box */}
                      <div className="client-card-logo-wrap">
                        <img src={client.logo} alt={client.name} loading="lazy" />
                      </div>

                      {/* Client Name & Project Scope */}
                      <div>
                        <h3 className="client-card-name">{client.name}</h3>
                        <p className="client-card-desc">{client.desc}</p>
                      </div>

                      {/* Interactive Bottom Action */}
                      <div className="client-card-action">
                        <span>View Project Scope</span>
                        <FiArrowRight />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          5. INTERACTIVE CLIENT DETAILS MODAL
      ========================================================= */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedClient(null)}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              <div className="modal-logo-wrap">
                <img src={selectedClient.logo} alt={selectedClient.name} />
              </div>

              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <span className="client-category-tag">
                  {getCategoryLabel(getCategory(selectedClient))}
                </span>
              </div>

              <h3 className="modal-client-name">{selectedClient.name}</h3>
              <p className="modal-client-desc">{selectedClient.desc}</p>

              <div className="modal-details-grid">
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Service Type</span>
                  <span className="modal-detail-value">Turnkey EPC & Maintenance</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Execution Status</span>
                  <span className="modal-detail-value">Delivered & Operational</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Standards</span>
                  <span className="modal-detail-value">NBC / NFPA Compliant</span>
                </div>
                <div className="modal-detail-item">
                  <span className="modal-detail-label">Support Protocol</span>
                  <span className="modal-detail-value">24×7 Operations SLA</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#006030',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                Close Project Overview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          6. CALL TO ACTION
      ========================================================= */}
      <ContactCTA />
    </>
  );
}