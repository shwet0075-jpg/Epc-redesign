import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FiMaximize2,
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiMapPin,
  FiShield,
  FiCpu,
  FiServer,
  FiVideo,
  FiCheckCircle,
  FiLayers,
  FiActivity,
  FiSearch,
  FiZap,
} from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import ScrollText from '../components/ScrollText';
import ContactCTA from '../components/ContactCTA';
import MotionCarouselAutoplay from '../components/Gallery/MotionCarouselAutoplay';

const categories = [
  { id: 'all', label: 'All Projects', icon: FiLayers },
  { id: 'infrastructure', label: 'Infrastructure & Railways', icon: FiShield },
  { id: 'government', label: 'Government & Defence', icon: FiVideo },
  { id: 'banking', label: 'Banking & Finance', icon: FiCpu },
  { id: 'corporate', label: 'Data Centres & Corporate', icon: FiServer },
];

const galleryProjects = [
  {
    id: 'PRJ-01',
    code: 'INFRA-01',
    name: 'JNPT Port Container Terminal Fire Network',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Railways',
    location: 'Navi Mumbai, Maharashtra',
    desc: 'Turnkey deluge, fire hydrant ring, and clean agent gas suppression system deployed across maritime logistics berths.',
    scope: 'Gas Suppression, Deluge Valves, Hydrant Ring Mains, Flame Detectors',
    compliance: 'MFS Class A • CPWD Class II • NBC 2016',
    status: 'Commissioned & Active',
    image: '/assets/images/work-img/w1.png',
    tags: ['Maritime Logistics', 'Gas Suppression', 'Deluge Network'],
    featured: true,
  },
  {
    id: 'PRJ-02',
    code: 'GOVT-02',
    name: 'Southern Army Command Depot Surveillance',
    category: 'government',
    categoryLabel: 'Government & Defence',
    location: 'Colaba, Mumbai, Maharashtra',
    desc: 'High-security IP CCTV perimeter surveillance grid and biometric access control for military logistics depot.',
    scope: 'Thermal IP PTZ Cameras, Perimeter Radar Mesh, Biometric Access, 24/7 Command Console',
    compliance: 'Ministry of Defence Tier-1 Security Protocol',
    status: 'Operational & Live',
    image: '/assets/images/work-img/w2.png',
    tags: ['Defence Grid', 'Perimeter Radar', 'Thermal CCTV'],
    featured: true,
  },
  {
    id: 'PRJ-03',
    code: 'DC-03',
    name: 'Mumbai City Surveillance TIER-III DC Facility',
    category: 'corporate',
    categoryLabel: 'Data Centres & Corporate',
    location: 'Mumbai, Maharashtra',
    desc: 'Complete TIER-III Data Centre package including precision PAC cooling, redundant UPS power, and clean agent fire suppression.',
    scope: 'TIER-III DC Buildout, Precision Air Conditioning (PAC), N+1 UPS, FM-200 Suppression',
    compliance: 'TIA-942 TIER III • Uptime Institute Standard',
    status: '99.999% Uptime Certified',
    image: '/assets/images/work-img/w3.png',
    tags: ['TIER-III DC', 'Precision Cooling', 'Clean Agent'],
    featured: true,
  },
  {
    id: 'PRJ-04',
    code: 'BANK-04',
    name: 'National Banking Headquarters IBMS Automation',
    category: 'banking',
    categoryLabel: 'Banking & Finance',
    location: 'Bandra-Kurla Complex (BKC), Mumbai',
    desc: 'Integrated Building Management System (IBMS) managing HVAC, smart lighting, energy telemetry, and access security.',
    scope: 'BMS Automation, Energy Analytics, HVAC VAV Control, Smart Access Integration',
    compliance: 'IGBC Green Building Certified Protocol',
    status: 'Live Operation',
    image: '/assets/images/work-img/w4.png',
    tags: ['IBMS Automation', 'Energy Telemetry', 'Smart HVAC'],
    featured: true,
  },
  {
    id: 'PRJ-05',
    code: 'GRID-05',
    name: 'MAHATRANSCO 400kV Substation Fire Barrier',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Railways',
    location: 'Kalwa & Kharghar, Maharashtra',
    desc: 'High-velocity water spray (HVWS) systems and transformer nitrogen injection fire prevention for high-voltage grid substations.',
    scope: 'HVWS Deluge, Nitrogen Injection Fire Protection (NIFPS), Smoke Detection Mesh',
    compliance: 'Central Electricity Authority (CEA) Safety Standard',
    status: 'Grid Operational',
    image: '/assets/images/work-img/w5.png',
    tags: ['400kV Grid', 'HVWS Deluge', 'NIFPS Fire Barrier'],
    featured: true,
  },
  {
    id: 'PRJ-06',
    code: 'GOVT-06',
    name: 'State Police Headquarters Integrated Command Centre',
    category: 'government',
    categoryLabel: 'Government & Defence',
    location: 'Pune, Maharashtra',
    desc: 'Turnkey control room display video wall, server rack infrastructure, and critical electrical busway distribution.',
    scope: 'Video Wall Integration, Server Enclosures, Fire Alarm & PA System, Access Control',
    compliance: 'Smart City Mission Security Standard',
    status: 'Handed Over & Live',
    image: '/assets/images/work-img/w6.png',
    tags: ['Command Centre', 'Server Racks', 'Smart City'],
  },
  {
    id: 'PRJ-07',
    code: 'BANK-07',
    name: 'Reserve Bank Sector Treasury Fire Detection',
    category: 'banking',
    categoryLabel: 'Banking & Finance',
    location: 'Fort, Mumbai, Maharashtra',
    desc: 'Very Early Smoke Detection Apparatus (VESDA) and localized clean agent flooding for currency and vault storage.',
    scope: 'VESDA Laser Aspirating Detection, Inergen Clean Agent, Vault Intrusion Sensors',
    compliance: 'RBI Treasury & Vault Fire Safety Standard',
    status: 'Active Security',
    image: '/assets/images/work-img/w7.png',
    tags: ['VESDA Laser', 'Vault Security', 'Inergen Flooding'],
  },
  {
    id: 'PRJ-08',
    code: 'CORP-08',
    name: 'Enterprise IT Campus Dual Redundant Data Centre',
    category: 'corporate',
    categoryLabel: 'Data Centres & Corporate',
    location: 'Hinjawadi IT Park, Pune',
    desc: 'Mission-critical server hall infrastructure with environmental telemetry, server cold aisle containment, and fire suppression.',
    scope: 'Cold Aisle Containment, Rack Access Monitoring, NOVEC 1230 Clean Agent, IBMS',
    compliance: 'ASHRAE TC 9.9 Thermal Guidelines',
    status: 'Fully Commissioned',
    image: '/assets/images/work-img/w8.png',
    tags: ['Cold Aisle Containment', 'NOVEC 1230', 'IT Campus'],
  },
  {
    id: 'PRJ-09',
    code: 'INFRA-09',
    name: 'Western Railway Traction Substation CCTV Grid',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Railways',
    location: 'Mumbai Suburban Division',
    desc: 'Ruggedized optical fibre IP surveillance and remote SCADA integration along electrified suburban rail corridors.',
    scope: 'Fibre Optic Transmission, Industrial Grade POE Switches, Anti-Vandal IP Cameras',
    compliance: 'RDSO Railway Electro-Mechanical Specifications',
    status: 'Continuous Monitoring',
    image: '/assets/images/work-img/w9.png',
    tags: ['Railway SCADA', 'Industrial POE', 'Suburban Rail'],
  },
  {
    id: 'PRJ-10',
    code: 'GOVT-10',
    name: 'Municipal Corporation Disaster Operations Centre',
    category: 'government',
    categoryLabel: 'Government & Defence',
    location: 'Thane, Maharashtra',
    desc: 'Centralized emergency response command centre with automated environmental monitoring and resilient electrical distribution.',
    scope: 'Emergency Telemetry, Clean Agent Suppression, Video Management Servers, UPS',
    compliance: 'National Disaster Management Guidelines',
    status: 'Active Emergency Ops',
    image: '/assets/images/work-img/w10.png',
    tags: ['Emergency Ops', 'VMS Servers', 'Resilient Power'],
  },
  {
    id: 'PRJ-11',
    code: 'BANK-11',
    name: 'State Bank Regional Cash Processing Centre',
    category: 'banking',
    categoryLabel: 'Banking & Finance',
    location: 'Nagpur, Maharashtra',
    desc: 'High-density addressable fire alarm, automatic gas suppression, and multi-tier access interlocks for currency sorting halls.',
    scope: 'Addressable Fire Alarm, Electromagnetic Door Interlocks, CO2 Total Flooding System',
    compliance: 'Bank Security Grade-1 Standard',
    status: 'Commissioned',
    image: '/assets/images/work-img/w11.png',
    tags: ['Door Interlocks', 'Cash Processing', 'Addressable Alarm'],
  },
  {
    id: 'PRJ-12',
    code: 'CORP-12',
    name: 'Hyperscale Edge Data Hub & DR Node',
    category: 'corporate',
    categoryLabel: 'Data Centres & Corporate',
    location: 'New Delhi NCR',
    desc: 'Turnkey edge modular data centre with smart rack PDU telemetry, dry pipe pre-action fire protection, and IBMS dashboard.',
    scope: 'Modular Edge Containers, Pre-Action Sprinkler, Smart Rack PDUs, Thermal Imaging',
    compliance: 'ISO/IEC 27001 Infrastructure Standard',
    status: 'Live Disaster Recovery',
    image: '/assets/images/work-img/w12.png',
    tags: ['Edge Data Hub', 'Pre-Action Sprinkler', 'Smart PDUs'],
  },
  {
    id: 'PRJ-13',
    code: 'INFRA-13',
    name: 'MIDC Petrochemical Corridor Deluge Fire Network',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Railways',
    location: 'Taloja Industrial Area, Maharashtra',
    desc: 'Heavy-duty industrial water foam deluge systems, hydrocarbon gas leak sensors, and diesel fire pump houses.',
    scope: 'Foam Proportioning Skid, Diesel Booster Pumps, Gas Leak Detectors, Deluge Monitors',
    compliance: 'OISD 117 Industrial Safety Standard',
    status: 'Industrial Operational',
    image: '/assets/images/work-img/w13.png',
    tags: ['Petrochem Safety', 'Foam Deluge', 'OISD Standard'],
    featured: true,
  },
  {
    id: 'PRJ-14',
    code: 'GOVT-14',
    name: 'State Legislative Assembly Complex Safety Grid',
    category: 'government',
    categoryLabel: 'Government & Defence',
    location: 'Mumbai, Maharashtra',
    desc: 'Comprehensive heritage building fire detection, voice evacuation public address, and centralized security control.',
    scope: 'Wireless/Wired Smoke Detectors, Voice Evacuation PA, Hydrant Risers, Fire Doors',
    compliance: 'NBC 2016 Heritage Complex Protocol',
    status: 'Fully Operational',
    image: '/assets/images/work-img/w14.png',
    tags: ['Heritage Complex', 'Voice Evac PA', 'Hydrant Risers'],
  },
  {
    id: 'PRJ-15',
    code: 'BANK-15',
    name: 'Financial Tech Park High-Density Server Floor',
    category: 'banking',
    categoryLabel: 'Banking & Finance',
    location: 'GIFT City / Gandhinagar',
    desc: 'Clean agent fire suppression, leak detection cable networks, and synchronized precision cooling for financial algorithmic servers.',
    scope: 'Water Leak Sensing Rope, FM-200 Cylinders, Intelligent BMS Controller, Precision CRAC',
    compliance: 'FinTech High Availability Protocol',
    status: '24/7 Active Server Grid',
    image: '/assets/images/work-img/w15.png',
    tags: ['FinTech Park', 'Water Leak Sensing', 'CRAC Cooling'],
  },
  {
    id: 'PRJ-16',
    code: 'CORP-16',
    name: 'Multinational Tech Tower IBMS & Safety Matrix',
    category: 'corporate',
    categoryLabel: 'Data Centres & Corporate',
    location: 'Electronic City, Bengaluru / Pune',
    desc: 'Unified intelligent automation platform aggregating 4,000+ I/O points across lighting, fire, HVAC, and energy monitoring.',
    scope: 'BACnet / Modbus IBMS Gateway, Fire Alarm Graphic Workstation, Smart Metering',
    compliance: 'LEED Platinum Automation Specs',
    status: 'Enterprise Certified',
    image: '/assets/images/work-img/w16.png',
    tags: ['BACnet IBMS', 'LEED Platinum', 'Smart Metering'],
  },
  {
    id: 'PRJ-17',
    code: 'INFRA-17',
    name: 'National Highway Tunnel Ventilation & Safety Grid',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Railways',
    location: 'Western Ghats Corridor, Maharashtra',
    desc: 'Linear heat detection cable networks, tunnel jet fan ventilation control, and emergency SOS call stations.',
    scope: 'Linear Heat Detection (LHDC), Jet Fan Automation, Emergency SOS Intercom, Fire Hydrant',
    compliance: 'IRC Special Tunnel Safety Code',
    status: 'Public Highway Active',
    image: '/assets/images/work-img/w17.png',
    tags: ['Tunnel Safety', 'LHDC Sensing', 'Ventilation Fan'],
  },
  {
    id: 'PRJ-18',
    code: 'GOVT-18',
    name: 'Defence Research Facility Clean Room Suppression',
    category: 'government',
    categoryLabel: 'Government & Defence',
    location: 'Pune / Hyderabad Facility',
    desc: 'Zero-residue clean agent flooding, ultra-sensitive particle detection, and clean room interlock systems.',
    scope: 'NOVEC 1230 Clean Agent, Airlock Interlocks, Class 1000 Clean Room Fire Protection',
    compliance: 'DRDO / ISRO Compatible Clean Room Specs',
    status: 'High Security Handover',
    image: '/assets/images/work-img/w18.png',
    tags: ['Clean Room', 'Zero Residue', 'Airlock Security'],
  },
];

// Featured items for the top Saisei-style cinematic slideshow
const featuredSlides = galleryProjects.filter((p) => p.featured);

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = galleryProjects.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const activeProject = lightboxIndex !== null ? galleryProjects[lightboxIndex] : null;

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % galleryProjects.length));
  }, []);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + galleryProjects.length) % galleryProjects.length));
  }, []);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, handleClose, handleNext, handlePrev]);

  return (
    <div className="gallery-page-wrapper">
      {/* CINEMATIC PAGE HEADER */}
      <section className="gallery-hero" aria-label="Prudent EPC Project Gallery">
        <div className="gallery-blueprint-grid" />
        <div className="gallery-glow-orb gallery-glow-orange" />
        <div className="gallery-glow-orb gallery-glow-green" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
            style={{
              color: 'var(--color-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ width: '28px', height: '2px', background: 'var(--color-secondary)' }} />
            Visual Reconnaissance
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 800,
              margin: '8px 0 20px',
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            Our Work in <span style={{ color: '#f08020' }}>Action</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.15rem',
              color: '#d3ded9',
              maxWidth: '720px',
              margin: '0',
              lineHeight: 1.7,
            }}
          >
            Authentic on-site captures of high-stakes Fire Protection, TIER-III Data Centre builds,
            Intelligent Building Automation, and Security Grids engineered and commissioned across India.
          </motion.p>

          {/* Live Telemetry Stats Strip */}
          <div className="gallery-stats-strip">
            {[
              { icon: FiLayers, label: 'Visual Project Logs', val: '18+' },
              { icon: FiShield, label: 'Strategic Sectors', val: '4 Key' },
              { icon: FiCheckCircle, label: 'Commissioning Rate', val: '100%' },
              { icon: FiMapPin, label: 'On-Ground Footprint', val: 'Pan India' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="gallery-stat-pill"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <div className="gallery-stat-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                      {stat.val}
                    </div>
                    <div style={{ fontSize: '.72rem', color: '#a2c2b3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '2px' }}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOTION.DEV INSPIRED AUTOPLAY CAROUSEL WITH PROGRESS BAR INDICATOR */}
      <section className="motion-carousel-section">
        <div className="container">
          <MotionCarouselAutoplay
            slides={featuredSlides}
            onSelectProject={(project) => {
              const origIdx = galleryProjects.findIndex((p) => p.id === project.id);
              setLightboxIndex(origIdx !== -1 ? origIdx : 0);
            }}
          />
        </div>
      </section>

      {/* GALLERY SECTOR MATRIX (ALL NORMAL CARDS BELOW) */}
      <section className="section" style={{ background: '#f8fbf9', padding: '60px 0 100px' }}>
        <div className="container">
          {/* Controls Bar: Glowing Sector Filters & Live Search */}
          <ScrollReveal variant="fade-up">
            <div className="gallery-controls-bar">
              <div className="gallery-filters-group">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const count =
                    cat.id === 'all'
                      ? galleryProjects.length
                      : galleryProjects.filter((p) => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`gallery-filter-btn ${filter === cat.id ? 'is-active' : ''}`}
                      onClick={() => setFilter(cat.id)}
                    >
                      {filter === cat.id && (
                        <motion.span
                          layoutId="gallery-active-pill"
                          className="gallery-filter-active-indicator"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                      <Icon size={15} />
                      <span>{cat.label}</span>
                      <span className="gallery-count-badge">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Search */}
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <FiSearch
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                    pointerEvents: 'none',
                  }}
                  size={15}
                />
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 14px 8px 36px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0,96,48,0.15)',
                    background: '#f1f5f3',
                    fontSize: '0.84rem',
                    color: '#121a16',
                    outline: 'none',
                    transition: 'all .25s ease',
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Creative Gallery Grid */}
          <motion.div layout className="gallery-interactive-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const originalIndex = galleryProjects.findIndex((p) => p.id === item.id);

                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35 }}
                    className="gallery-card-creative"
                    onClick={() => setLightboxIndex(originalIndex)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${item.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(originalIndex);
                      }
                    }}
                  >
                    {/* Laser Scanline Beam Animation */}
                    <div className="gallery-card-scanline" />

                    {/* HUD Architectural Corner Brackets */}
                    <span className="gallery-corner-bracket corner-tl" aria-hidden="true" />
                    <span className="gallery-corner-bracket corner-tr" aria-hidden="true" />
                    <span className="gallery-corner-bracket corner-bl" aria-hidden="true" />
                    <span className="gallery-corner-bracket corner-br" aria-hidden="true" />

                    {/* Top Telemetry Badge */}
                    <div className="gallery-card-top-tag">
                      <span className="gallery-live-pulse-dot" />
                      <span>{item.code}</span>
                    </div>

                    {/* Zoom Inspection Trigger Button */}
                    <div className="gallery-zoom-trigger" title="Inspect Project Details">
                      <FiMaximize2 size={16} />
                    </div>

                    {/* Media Container */}
                    <div className="gallery-card-media-wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="gallery-card-img"
                      />
                    </div>

                    {/* Glassmorphic Info Drawer Overlay */}
                    <div className="gallery-card-bottom-info">
                      <div className="gallery-card-sector-label">
                        <FiShield size={12} />
                        <span>{item.categoryLabel}</span>
                      </div>

                      <h3 className="gallery-card-title">{item.name}</h3>

                      <p className="gallery-card-desc">{item.desc}</p>

                      <div className="gallery-card-tag-row">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="gallery-micro-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
              <FiSearch size={42} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text-dark)', margin: '0 0 8px' }}>
                No Matching Project Records
              </h3>
              <p style={{ margin: 0 }}>Try clearing your search query or selecting another sector.</p>
            </div>
          )}
        </div>
      </section>

      {/* FULL-SCREEN CINEMATIC INSPECTION LIGHTBOX THEATER */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery-lightbox-overlay"
            onClick={handleClose}
            data-lenis-prevent="true"
          >
            {/* Close Button */}
            <button
              type="button"
              className="gallery-lightbox-close-btn"
              onClick={handleClose}
              aria-label="Close Project Viewer"
            >
              <FiX size={22} />
            </button>

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="gallery-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: High-Res Image Presentation Stage */}
              <div className="gallery-lightbox-image-stage">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="gallery-lightbox-main-img"
                />

                {/* Laser Corner HUD */}
                <span className="gallery-corner-bracket corner-tl" style={{ top: 20, left: 20, width: 20, height: 20 }} />
                <span className="gallery-corner-bracket corner-tr" style={{ top: 20, right: 20, width: 20, height: 20 }} />
                <span className="gallery-corner-bracket corner-bl" style={{ bottom: 20, left: 20, width: 20, height: 20 }} />
                <span className="gallery-corner-bracket corner-br" style={{ bottom: 20, right: 20, width: 20, height: 20 }} />
              </div>

              {/* Right Side: Engineering Project Telemetry & HUD Panel */}
              <div className="gallery-lightbox-hud-panel">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '.74rem',
                        fontWeight: 700,
                        letterSpacing: '.12em',
                        textTransform: 'uppercase',
                        color: '#f08020',
                        background: 'rgba(240, 128, 32, 0.14)',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        border: '1px solid rgba(240, 128, 32, 0.3)',
                      }}
                    >
                      <span className="gallery-live-pulse-dot" />
                      {activeProject.code} // {activeProject.categoryLabel}
                    </span>

                    <span style={{ fontSize: '.78rem', color: '#9ec3ae', fontWeight: 600 }}>
                      {String((lightboxIndex ?? 0) + 1).padStart(2, '0')} / {String(galleryProjects.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                    {activeProject.name}
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ec3ae', fontSize: '.84rem', marginBottom: '18px' }}>
                    <FiMapPin size={15} style={{ color: '#f08020' }} />
                    <span>{activeProject.location}</span>
                  </div>

                  <p style={{ color: '#c2dcd0', fontSize: '.92rem', lineHeight: 1.6, margin: '0 0 18px' }}>
                    {activeProject.desc}
                  </p>

                  {/* Specification Grid */}
                  <div className="gallery-lightbox-spec-grid">
                    <div className="gallery-lightbox-spec-item">
                      <span className="gallery-lightbox-spec-label">Project Status</span>
                      <span className="gallery-lightbox-spec-value" style={{ color: '#22c55e' }}>
                        {activeProject.status}
                      </span>
                    </div>

                    <div className="gallery-lightbox-spec-item">
                      <span className="gallery-lightbox-spec-label">Sector Domain</span>
                      <span className="gallery-lightbox-spec-value">
                        {activeProject.categoryLabel}
                      </span>
                    </div>

                    <div className="gallery-lightbox-spec-item" style={{ gridColumn: 'span 2' }}>
                      <span className="gallery-lightbox-spec-label">Scope Deliverables</span>
                      <span className="gallery-lightbox-spec-value" style={{ fontSize: '.82rem', fontWeight: 500, color: '#e2f0e8' }}>
                        {activeProject.scope}
                      </span>
                    </div>

                    <div className="gallery-lightbox-spec-item" style={{ gridColumn: 'span 2' }}>
                      <span className="gallery-lightbox-spec-label">Compliance Code</span>
                      <span className="gallery-lightbox-spec-value" style={{ fontSize: '.78rem', color: '#f08020' }}>
                        {activeProject.compliance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Navigation Carousel Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      className="gallery-lightbox-nav-btn"
                      onClick={handlePrev}
                      title="Previous Project (Left Arrow)"
                      aria-label="Previous Project"
                    >
                      <FiArrowLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="gallery-lightbox-nav-btn"
                      onClick={handleNext}
                      title="Next Project (Right Arrow)"
                      aria-label="Next Project"
                    >
                      <FiArrowRight size={18} />
                    </button>
                  </div>

                  <span style={{ fontSize: '.76rem', color: '#688c7b', fontWeight: 600 }}>
                    Use keyboard ← / → arrows to navigate
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactCTA />
    </div>
  );
}