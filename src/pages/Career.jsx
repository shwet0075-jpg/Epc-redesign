import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiX,
  FiArrowUpRight,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiShield,
  FiCpu,
  FiUsers,
  FiZap,
  FiTrendingUp,
  FiCheckCircle,
  FiSend,
  FiSliders,
} from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import '../styles/careers.css';

const jobsData = [
  {
    id: 1,
    title: 'Project Engineer — Fire & Life Safety',
    department: 'Project Delivery',
    location: 'Mumbai / Pan India',
    type: 'Full-time',
    level: 'Mid to Senior (3-6 Yrs)',
    teaser: 'Lead on-site project execution, technical coordination, and statutory compliance for critical fire detection & suppression systems.',
    featured: true,
    responsibilities: [
      'Supervise installation, testing, and commissioning of turnkey fire alarm and gas suppression systems.',
      'Liaise with clients, architects, MEP consultants, and site contractors to ensure on-time delivery.',
      'Enforce strict quality assurance and safety standards across mission-critical project sites.',
    ],
    requirements: [
      'B.E. / B.Tech in Fire & Safety, Mechanical, or Electrical Engineering.',
      '3+ years hands-on experience in fire protection / EPC projects.',
      'Proficiency in AutoCAD, site documentation, and project schedules.',
    ],
  },
  {
    id: 2,
    title: 'Design Engineer — ELV & IBMS Systems',
    department: 'Design Engineering',
    location: 'Pune / Mumbai',
    type: 'Full-time',
    level: 'Mid (2-5 Yrs)',
    teaser: 'Design intelligent building management, integrated security, CCTV, and smart automation systems for modern enterprise facilities.',
    featured: false,
    responsibilities: [
      'Prepare technical drawings, schematics, cable schedules, and BOQs for ELV and automation packages.',
      'Conduct vendor evaluations and select compliant equipment for data centers and commercial towers.',
      'Collaborate with site teams to resolve design discrepancies during installation phases.',
    ],
    requirements: [
      'Degree / Diploma in Electrical, Electronics, or Instrumentation Engineering.',
      'Experience in IBMS, Access Control, CCTV, and Public Address systems.',
      'Proficient in AutoCAD and Revit / BIM tools is a plus.',
    ],
  },
  {
    id: 3,
    title: 'Senior Project Manager — Critical Infrastructure',
    department: 'Project Delivery',
    location: 'Mumbai / Delhi NCR',
    type: 'Full-time',
    level: 'Senior (7-12 Yrs)',
    teaser: 'Own end-to-end turnkey project lifecycle from initial engineering and procurement to successful final testing & handover.',
    featured: true,
    responsibilities: [
      'Direct cross-functional engineering teams across multi-location high-stakes EPC projects.',
      'Manage project budget, procurement timelines, client invoicing, and resource allocation.',
      'Lead high-level stakeholder reviews and assure adherence to NFPA, NBC, and ISO standards.',
    ],
    requirements: [
      'B.Tech / M.Tech in Engineering with strong project management track record.',
      '7+ years experience managing complex infrastructure or industrial EPC projects.',
      'PMP / PRINCE2 certification is an added advantage.',
    ],
  },
  {
    id: 4,
    title: 'Service & Maintenance Engineer',
    department: 'Operations',
    location: 'Pan India Sites',
    type: 'Full-time',
    level: 'Entry to Mid (1-3 Yrs)',
    teaser: 'Ensure 24/7 uptime and peak operational performance for installed fire protection, security, and IBMS systems.',
    featured: false,
    responsibilities: [
      'Execute preventive maintenance schedules and rapid breakdown support for client facilities.',
      'Perform system health checks, battery replacements, calibration, and sensor audits.',
      'Provide technical training and operation guidance to client facility managers.',
    ],
    requirements: [
      'Diploma / Degree in Electrical or Electronics Engineering.',
      'Hands-on troubleshooting aptitude for life-safety systems.',
      'Willingness to travel across regional project locations.',
    ],
  },
  {
    id: 5,
    title: 'BIM / CAD Coordination Specialist',
    department: 'Design Engineering',
    location: 'Pune (Hybrid)',
    type: 'Full-time / Contract',
    level: 'Mid (2-4 Yrs)',
    teaser: 'Build clash-free 3D building models and detailed shop drawings to empower smooth on-site construction execution.',
    featured: false,
    responsibilities: [
      'Develop coordinated 3D BIM models for fire fighting, ELV, and containment systems.',
      'Perform clash detection and coordination runs with architectural and MEP trades.',
      'Generate accurate as-built drawings and material take-offs.',
    ],
    requirements: [
      'Expertise in Autodesk Revit, Navisworks, and AutoCAD MEP.',
      '2+ years experience in MEP / EPC BIM coordination.',
      'Strong eye for detail and spatial coordination.',
    ],
  },
];

const pillars = [
  {
    icon: FiTrendingUp,
    num: '01',
    title: 'High-Impact Projects',
    desc: 'Work on landmark data centers, rail infrastructure, defense facilities, and smart towers that safeguard lives every single day.',
  },
  {
    icon: FiZap,
    num: '02',
    title: 'Fast-Track Growth',
    desc: 'We promote from within based on merit and capability. Gain hands-on leadership ownership and direct mentorship from industry veterans.',
  },
  {
    icon: FiUsers,
    num: '03',
    title: 'Culture of Excellence',
    desc: 'Join a collaborative, transparent team that values precision engineering, continuous learning, and on-time project pride.',
  },
];

const hiringSteps = [
  { num: '01', title: 'Submit Profile', desc: 'Send your CV highlighting your technical projects and career aspirations.' },
  { num: '02', title: 'Technical Dialogue', desc: 'Engage in a practical discussion with our engineering leads on real challenges.' },
  { num: '03', title: 'Culture Alignment', desc: 'Meet our leadership team to ensure mutual values, vision, and role fit.' },
  { num: '04', title: 'Fast Onboarding', desc: 'Receive your offer and kick off with a structured site & project roadmap.' },
];

export default function Career() {
  const [selectedDept, setSelectedDept] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalJob, setActiveModalJob] = useState(null);

  const yearsExp = Math.max(1, new Date().getFullYear() - 2019);

  // Lock body scroll when modal is active so mouse wheel scrolls the modal
  useEffect(() => {
    if (activeModalJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalJob]);

  // Departments list with counts
  const departments = useMemo(() => {
    const counts = { all: jobsData.length };
    jobsData.forEach((j) => {
      counts[j.department] = (counts[j.department] || 0) + 1;
    });
    return [
      { id: 'all', label: 'All Teams', count: counts.all },
      { id: 'Project Delivery', label: 'Project Delivery', count: counts['Project Delivery'] || 0 },
      { id: 'Design Engineering', label: 'Design Engineering', count: counts['Design Engineering'] || 0 },
      { id: 'Operations', label: 'Operations & Maintenance', count: counts['Operations'] || 0 },
    ];
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesDept = selectedDept === 'all' || job.department === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.teaser.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchQuery]);

  return (
    <div className="careers-page">
      {/* 1. Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-grid" aria-hidden="true" />
        <div className="careers-hero-glow-1" aria-hidden="true" />
        <div className="careers-hero-glow-2" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="careers-eyebrow-badge">⚡ CAREERS AT PRUDENT EPC</span>

          <h1 className="careers-hero-title">
            Build <em>Mission-Critical</em> Infrastructure With Us.
          </h1>

          <p className="careers-hero-desc">
            Join the forward-thinking engineers and leaders shaping fire safety, building automation,
            and turnkey industrial infrastructure across India.
          </p>

          {/* Quick Stats Bar */}
          <div className="careers-stats-bar">
            <div className="careers-stat-item">
              <div className="careers-stat-num">
                {yearsExp}
                <span>+</span>
              </div>
              <div className="careers-stat-label">Years of Engineering</div>
            </div>

            <div className="careers-stat-item">
              <div className="careers-stat-num">
                250<span>+</span>
              </div>
              <div className="careers-stat-label">Turnkey Deliveries</div>
            </div>

            <div className="careers-stat-item">
              <div className="careers-stat-num">
                Pan <span>India</span>
              </div>
              <div className="careers-stat-label">Active Project Sites</div>
            </div>

            <div className="careers-stat-item">
              <div className="careers-stat-num">
                100<span>%</span>
              </div>
              <div className="careers-stat-label">On-Time Execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Open Roles Explorer (Current Opportunities) */}
      <section className="careers-roles-section" id="open-positions">
        <div className="container">
          <div className="careers-section-header">
            <span className="careers-section-kicker">CURRENT OPPORTUNITIES</span>
            <h2 className="careers-section-title">Explore Open Roles</h2>
            <p className="careers-section-subtitle">
              Discover opportunities across our Project Delivery, Design Engineering, and Operations teams.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="careers-filter-controls">
            <div className="careers-search-wrap">
              <FiSearch className="careers-search-icon" />
              <input
                type="text"
                className="careers-search-input"
                placeholder="Search by role, team, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="careers-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Department Pills */}
            <div className="careers-tabs">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  className={`careers-tab-btn ${selectedDept === dept.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedDept(dept.id)}
                >
                  <span>{dept.label}</span>
                  <span className="careers-tab-count">{dept.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="careers-jobs-grid">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  className={`careers-job-card ${job.featured ? 'is-featured' : ''}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <div className="careers-job-top">
                      <span className="careers-job-dept-badge">{job.department}</span>
                      {job.featured && (
                        <span className="careers-job-featured-badge">
                          <FiZap /> Featured Role
                        </span>
                      )}
                    </div>

                    <h3 className="careers-job-title">{job.title}</h3>
                    <p className="careers-job-desc">{job.teaser}</p>
                  </div>

                  <div>
                    <div className="careers-job-meta-row">
                      <div className="careers-job-meta-item">
                        <FiMapPin /> {job.location}
                      </div>
                      <div className="careers-job-meta-item">
                        <FiClock /> {job.type}
                      </div>
                      <div className="careers-job-meta-item">
                        <FiBriefcase /> {job.level}
                      </div>
                    </div>

                    <div className="careers-job-actions">
                      <button
                        className="careers-view-btn"
                        onClick={() => setActiveModalJob(job)}
                      >
                        View Details
                      </button>
                      <a
                        className="careers-apply-btn"
                        href={`mailto:careers@prudentepc.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                      >
                        Apply <FiArrowUpRight />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredJobs.length === 0 && (
              <div className="careers-empty-state">
                <FiBriefcase className="careers-empty-icon" />
                <h3>No matching roles found</h3>
                <p>Try clearing your search or selecting another team filter.</p>
                <button
                  className="careers-empty-btn"
                  onClick={() => {
                    setSelectedDept('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Core Pillars & Culture */}
      <section className="careers-culture-section">
        <div className="container">
          <div className="careers-section-header">
            <span className="careers-section-kicker">WHY WORK WITH US</span>
            <h2 className="careers-section-title">Where Engineering Ambition Meets Real Impact</h2>
            <p className="careers-section-subtitle">
              We empower capable professionals with the autonomy, resources, and trust needed to lead
              landmark national infrastructure.
            </p>
          </div>

          <div className="careers-pillars-grid">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.num} variant="fade-up" delay={idx * 0.1}>
                  <div className="careers-pillar-card">
                    <span className="careers-pillar-num">{pillar.num}</span>
                    <div className="careers-pillar-icon">
                      <Icon />
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Hiring Process Timeline */}
      <section className="careers-process-section">
        <div className="container">
          <div className="careers-section-header">
            <span className="careers-section-kicker" style={{ color: '#f08020' }}>
              HOW WE HIRE
            </span>
            <h2 className="careers-section-title" style={{ color: '#ffffff' }}>
              A Transparent, Respectful Process
            </h2>
            <p className="careers-section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              From initial connect to site onboarding, here is what you can expect when you apply.
            </p>
          </div>

          <div className="careers-process-grid">
            {hiringSteps.map((step) => (
              <div key={step.num} className="careers-process-step">
                <div className="careers-process-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Job Details Modal */}
      <AnimatePresence>
        {activeModalJob && (
          <div
            className="careers-modal-backdrop"
            onClick={() => setActiveModalJob(null)}
            data-lenis-prevent="true"
          >
            <motion.div
              className="careers-modal-box"
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="careers-modal-header">
                <button
                  className="careers-modal-close"
                  onClick={() => setActiveModalJob(null)}
                  aria-label="Close modal"
                >
                  <FiX />
                </button>
                <span className="careers-job-dept-badge">{activeModalJob.department}</span>
                <h3 className="careers-job-title" style={{ marginTop: 12, marginBottom: 8 }}>
                  {activeModalJob.title}
                </h3>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.86rem', color: '#64748b', fontWeight: 600 }}>
                  <span><FiMapPin style={{ color: '#f08020' }} /> {activeModalJob.location}</span>
                  <span><FiClock style={{ color: '#f08020' }} /> {activeModalJob.type}</span>
                  <span><FiBriefcase style={{ color: '#f08020' }} /> {activeModalJob.level}</span>
                </div>
              </div>

              <div className="careers-modal-body">
                <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: 1.6, marginBottom: 20 }}>
                  {activeModalJob.teaser}
                </p>

                <div className="careers-modal-section-title">Key Responsibilities</div>
                <ul className="careers-modal-list">
                  {activeModalJob.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <FiCheckCircle />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                <div className="careers-modal-section-title">Requirements & Qualifications</div>
                <ul className="careers-modal-list">
                  {activeModalJob.requirements.map((req, i) => (
                    <li key={i}>
                      <FiCheckCircle />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="careers-modal-footer">
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Ready to apply? Send us your resume.
                </span>
                <a
                  className="careers-apply-btn"
                  href={`mailto:careers@prudentepc.com?subject=${encodeURIComponent(`Application: ${activeModalJob.title}`)}`}
                >
                  Apply for this Role <FiArrowUpRight />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Unified Contact / General Application CTA */}
      <ContactCTA
        tagline="JOIN OUR TALENT NETWORK"
        title="Don't See The Exact Role For You?"
        description="We are constantly expanding our engineering and site leadership teams. Send us your profile and let's explore opportunities together."
        primaryButtonText="Submit General Application"
        primaryButtonLink="mailto:careers@prudentepc.com?subject=General%20Application%20-%20Prudent%20EPC"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
      />
    </div>
  );
}