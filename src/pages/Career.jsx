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
  // --- URGENT HIRINGS ---
  {
    id: 'urg-1',
    title: 'Estimation Engineer – MEP (Electrical/ELV)',
    department: 'Pre-Sales & Estimation',
    location: 'Mumbai',
    experience: '3–7 years',
    type: 'Full-time',
    isUrgent: true,
    teaser: 'Lead pre-sales MEP and ELV estimation, bill of quantities (BOQ) preparation, costing analysis, and technical proposal formulation for commercial and industrial EPC bids.',
    responsibilities: [
      'Prepare comprehensive MEP, Electrical, ELV, and Fire Safety cost estimations and tender submissions.',
      'Review technical drawings, specifications, scope matrices, and contract requirements.',
      'Liaise with equipment OEMs, component suppliers, and sub-contractors for competitive pricing.',
      'Perform rate analysis, value engineering evaluations, and pre-bid risk assessments.',
      'Participate in pre-bid technical meetings and client negotiations alongside senior leadership.'
    ],
    requirements: [
      'B.E. / B.Tech / Diploma in Electrical or Mechanical Engineering.',
      '3–7 years hands-on experience in MEP / ELV estimation within contracting or EPC organizations.',
      'Deep knowledge of electrical switchgear, ELV systems, fire alarms, and HVAC cabling standards.',
      'Advanced proficiency in AutoCAD, MS Excel, and estimation workflows.'
    ]
  },
  {
    id: 'urg-2',
    title: 'Project Engineer',
    department: 'Projects',
    location: 'Mumbai',
    experience: '3–6 years',
    type: 'Full-time',
    isUrgent: true,
    teaser: 'Drive end-to-end site engineering execution, contractor coordination, quality benchmarking, and statutory compliance for mission-critical turnkey projects.',
    responsibilities: [
      'Supervise on-site installation, testing, and commissioning of turnkey electrical and life-safety systems.',
      'Coordinate site progress with clients, architects, MEP consultants, and subcontracted workforce.',
      'Ensure strict adherence to statutory safety codes, QA/QC checklists, and NBC/NFPA norms.',
      'Track project milestones against delivery schedules and resolve on-site engineering clashes.',
      'Maintain daily site logs, material consumption audits, and measurement sheets.'
    ],
    requirements: [
      'B.E. / B.Tech / Diploma in Electrical, Mechanical, or Fire & Safety Engineering.',
      '3–6 years proven site execution experience across commercial, data center, or industrial facilities.',
      'Hands-on expertise in reviewing shop drawings and directing technical labor teams.',
      'Excellent leadership, communication, and milestone-tracking aptitude.'
    ]
  },
  {
    id: 'urg-3',
    title: 'Recruiter Administrator',
    department: 'HR',
    location: 'Mumbai',
    experience: '0 years',
    type: 'Full-time',
    isUrgent: true,
    teaser: 'Drive talent sourcing, candidate coordination, interview pipelines, onboarding administration, and employee record management for our growing team.',
    responsibilities: [
      'Source and screen prospective engineering and corporate profiles across hiring portals and networks.',
      'Schedule and coordinate multi-stage technical and behavioral interviews with department heads.',
      'Manage candidate communications, pre-employment documentation, and onboarding packs.',
      'Maintain up-to-date applicant tracking records, employee databases, and attendance logs.',
      'Support HR leadership in employee engagement initiatives, training calendars, and HR operations.'
    ],
    requirements: [
      'Bachelor’s / Master’s Degree in HR, Business Administration, or related discipline (BBA, MBA, MSW).',
      '0–1 year experience (Enthusiastic freshers with excellent communication skills are strongly encouraged).',
      'Strong organizational, telephone etiquette, and interpersonal abilities.',
      'Proficiency in MS Office (Excel, Word, PowerPoint) and Google Workspace.'
    ]
  },

  // --- NORMAL HIRINGS ---
  {
    id: 'norm-1',
    title: 'Tender Executive',
    department: 'Sales & Business Development',
    location: 'Mumbai',
    experience: '3–5 years',
    type: 'Full-time',
    isUrgent: false,
    teaser: 'Identify high-value public and private sector tenders, prepare compliant tender submissions, manage EMDs, and drive competitive bidding opportunities.',
    responsibilities: [
      'Monitor and evaluate e-procurement portals, government tenders (GeM, state EPC), and private RFPs.',
      'Prepare pre-qualification dossiers, compliance checklists, bank guarantees, and tender fee instruments.',
      'Coordinate with engineering and estimation teams to compile complete technical and financial bids.',
      'Attend pre-bid meetings, track tender amendments/corrigenda, and manage post-bid clarification replies.',
      'Maintain tender logbooks, win-loss analytics, and market competitor intelligence.'
    ],
    requirements: [
      'Graduate / Diploma holder with specialized experience in tendering and contracting.',
      '3–5 years experience managing e-tenders and formal RFP/RFQ responses in EPC/industrial sectors.',
      'Thorough familiarity with e-procurement portals, GeM bidding, and statutory documentation.',
      'Exceptional attention to detail, timeline vigilance, and organizational rigor.'
    ]
  },
  {
    id: 'norm-2',
    title: 'Purchase Co-Ordinator',
    department: 'Procurement & Supply Chain',
    location: 'Mumbai',
    experience: '2–4 years',
    type: 'Full-time (Onsite)',
    isUrgent: false,
    teaser: 'Orchestrate material procurement, vendor negotiations, purchase order lifecycles, and on-time site dispatch logistics for ongoing project sites.',
    responsibilities: [
      'Review site material requisitions and float inquiries to approved vendors for competitive quotation.',
      'Negotiate favorable pricing, credit terms, warranty coverage, and committed delivery schedules.',
      'Generate and release Purchase Orders (POs) and track order fabrication and transit status.',
      'Coordinate with logistics partners and site engineers for receipt inspection and inventory reconciliation.',
      'Maintain vendor performance scorecards, price benchmarks, and invoice processing support.'
    ],
    requirements: [
      'Degree / Diploma in Commerce, Supply Chain, Logistics, or Engineering.',
      '2–4 years procurement experience in EPC, electrical, HVAC, or construction contracting.',
      'Solid command over procurement ERP tools, purchase orders, and MS Excel analysis.',
      'Effective vendor negotiation and collaborative problem-solving skills.'
    ]
  },
  {
    id: 'norm-3',
    title: 'Commissioning Engineer',
    department: 'Service & Projects',
    location: 'Mumbai',
    experience: '2–5 years',
    type: 'Full-time',
    isUrgent: false,
    teaser: 'Conduct rigorous pre-commissioning validations, integrated system testing, parameter calibration, and client handover for life-safety and automation systems.',
    responsibilities: [
      'Perform systematic pre-commissioning inspections, loop checks, and insulation resistance measurements.',
      'Conduct functional testing and cause-and-effect matrix integration for fire protection and IBMS.',
      'Interface with MEP consultants and client audit teams during formal witness testing.',
      'Troubleshoot instrumentation, control panel faults, and communication bus discrepancies on site.',
      'Generate comprehensive commissioning sign-off reports, snag closures, and O&M handover dossiers.'
    ],
    requirements: [
      'B.E. / B.Tech / Diploma in Electrical, Electronics, or Instrumentation Engineering.',
      '2–5 years hands-on testing & commissioning experience with MEP / life-safety systems.',
      'Strong diagnostic capability across control panels, addressable networks, and field sensors.',
      'Willingness to conduct site testing across high-profile facilities.'
    ]
  },
  {
    id: 'norm-4',
    title: 'Technical Office Manager (Post Sales)',
    department: 'Technical & Project Support',
    location: 'Mumbai',
    experience: '5–10 years',
    type: 'Full-time',
    isUrgent: false,
    teaser: 'Lead post-sales engineering support, contractual compliance, variation billing approvals, as-built technical sign-offs, and client relationship management.',
    responsibilities: [
      'Lead technical office operations post-contract award, ensuring all technical deliverables are met.',
      'Coordinate drawing approvals, technical submittals, and material inspection clearances.',
      'Oversee commercial variation claims, extra item rate analysis, and monthly work certifications.',
      'Supervise final project closeouts: as-built drawings, statutory approvals, warranty documentation.',
      'Act as key bridge between site delivery teams, accounts, and client project management consultants.'
    ],
    requirements: [
      'B.E. / B.Tech in Engineering with 5–10 years experience in post-sales technical project management.',
      'Demonstrated background in EPC contracting, client billing, and technical office administration.',
      'Strong contractual acumen, drawing review capabilities, and client-facing negotiation skills.',
      'Exceptional leadership and multi-stakeholder communication aptitude.'
    ]
  }
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
    const counts = { all: jobsData.length, urgent: jobsData.filter((j) => j.isUrgent).length };
    const deptList = [];
    jobsData.forEach((j) => {
      counts[j.department] = (counts[j.department] || 0) + 1;
      if (!deptList.includes(j.department)) {
        deptList.push(j.department);
      }
    });
    return [
      { id: 'all', label: 'All Openings', count: counts.all },
      { id: 'urgent', label: '★ Urgent Hiring', count: counts.urgent },
      ...deptList.map((d) => ({ id: d, label: d, count: counts[d] || 0 })),
    ];
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesDept =
        selectedDept === 'all'
          ? true
          : selectedDept === 'urgent'
          ? job.isUrgent
          : job.department === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.experience.toLowerCase().includes(q) ||
        job.teaser.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchQuery]);

  const urgentJobs = useMemo(() => filteredJobs.filter((j) => j.isUrgent), [filteredJobs]);
  const normalJobs = useMemo(() => filteredJobs.filter((j) => !j.isUrgent), [filteredJobs]);

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
              Discover active career opportunities across Estimation, Site Projects, Human Resources, Procurement, and Technical Support.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="careers-filter-controls">
            <div className="careers-search-wrap">
              <FiSearch className="careers-search-icon" />
              <input
                type="text"
                className="careers-search-input"
                placeholder="Search by role, team, or experience..."
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
                  className={`careers-tab-btn ${selectedDept === dept.id ? 'is-active' : ''} ${dept.id === 'urgent' ? 'tab-urgent-highlight' : ''}`}
                  onClick={() => setSelectedDept(dept.id)}
                >
                  <span>{dept.label}</span>
                  <span className="careers-tab-count">{dept.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION A: URGENT HIRINGS (Special Design) */}
          {urgentJobs.length > 0 && (
            <div className="careers-urgent-tier">
              <div className="careers-tier-header urgent-tier-header">
                <div className="urgent-badge-pill">
                  <span className="urgent-pulse-dot" />
                  <span>URGENT REQUIREMENTS • IMMEDIATE JOINING</span>
                </div>
                <h3 className="urgent-tier-title">Priority Openings</h3>
                <p className="urgent-tier-desc">
                  These positions have fast-tracked interview schedules and immediate placement priorities.
                </p>
              </div>

              <div className="careers-jobs-grid urgent-grid">
                <AnimatePresence mode="popLayout">
                  {urgentJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      className="prudent-job-card prudent-job-card--urgent"
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.28 }}
                    >
                      {/* Top Ribbon Badge */}
                      <div className="urgent-ribbon-badge">
                        <span className="urgent-star">★</span> Urgent Hiring
                      </div>

                      <div className="prudent-card-inner">
                        {/* Top Row: Category + Employment Type */}
                        <div className="prudent-card-top">
                          <span className="prudent-job-dept-badge">{job.department}</span>
                          <span className="prudent-job-type">{job.type}</span>
                        </div>

                        {/* Job Title */}
                        <h4 className="prudent-job-title">{job.title}</h4>

                        {/* Location & Experience Meta */}
                        <div className="prudent-job-meta">
                          <span className="meta-loc">{job.location}</span>
                          <span className="meta-dot">•</span>
                          <span className="meta-exp">{job.experience}</span>
                        </div>

                        {/* Teaser summary */}
                        <p className="prudent-job-teaser">{job.teaser}</p>

                        {/* Actions matching reference: View role (outline) + Apply (blue solid) */}
                        <div className="prudent-job-actions">
                          <button
                            className="prudent-btn-view"
                            onClick={() => setActiveModalJob(job)}
                          >
                            View role
                          </button>
                          <a
                            className="prudent-btn-apply"
                            href={`mailto:careers@prudentepc.com?subject=${encodeURIComponent(`Urgent Application: ${job.title}`)}`}
                          >
                            Apply
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* SECTION B: NORMAL HIRINGS */}
          {normalJobs.length > 0 && (
            <div className="careers-normal-tier">
              <div className="careers-tier-header normal-tier-header">
                <span className="normal-tier-kicker">ADDITIONAL OPENINGS</span>
                <h3 className="normal-tier-title">Open Positions</h3>
                <p className="normal-tier-desc">
                  Explore specialized career opportunities across our project and corporate departments.
                </p>
              </div>

              <div className="careers-jobs-grid normal-grid">
                <AnimatePresence mode="popLayout">
                  {normalJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      className="prudent-job-card prudent-job-card--normal"
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="prudent-card-inner">
                        {/* Top Row: Category + Employment Type */}
                        <div className="prudent-card-top">
                          <span className="prudent-job-dept-badge">{job.department}</span>
                          <span className="prudent-job-type">{job.type}</span>
                        </div>

                        {/* Job Title */}
                        <h4 className="prudent-job-title">{job.title}</h4>

                        {/* Location & Experience Meta */}
                        <div className="prudent-job-meta">
                          <span className="meta-loc">{job.location}</span>
                          <span className="meta-dot">•</span>
                          <span className="meta-exp">{job.experience}</span>
                        </div>

                        {/* Teaser summary */}
                        <p className="prudent-job-teaser">{job.teaser}</p>

                        {/* Actions: View role (outline) + Apply (blue solid) */}
                        <div className="prudent-job-actions">
                          <button
                            className="prudent-btn-view"
                            onClick={() => setActiveModalJob(job)}
                          >
                            View role
                          </button>
                          <a
                            className="prudent-btn-apply"
                            href={`mailto:careers@prudentepc.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                          >
                            Apply
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="careers-empty-state">
              <FiBriefcase className="careers-empty-icon" />
              <h3>No matching roles found</h3>
              <p>Try clearing your search query or selecting another department filter.</p>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span className="prudent-job-dept-badge">{activeModalJob.department}</span>
                  {activeModalJob.isUrgent && (
                    <span className="urgent-ribbon-badge-modal">
                      ★ Urgent Hiring • Immediate Placement
                    </span>
                  )}
                </div>
                <h3 className="careers-job-title" style={{ marginTop: 14, marginBottom: 8, fontSize: '1.45rem' }}>
                  {activeModalJob.title}
                </h3>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.88rem', color: '#475569', fontWeight: 600, flexWrap: 'wrap' }}>
                  <span><FiMapPin style={{ color: '#f08020' }} /> {activeModalJob.location}</span>
                  <span><FiBriefcase style={{ color: '#006030' }} /> {activeModalJob.experience}</span>
                  <span><FiClock style={{ color: '#2563eb' }} /> {activeModalJob.type}</span>
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