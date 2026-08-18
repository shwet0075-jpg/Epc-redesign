import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Phone, ChevronDown, Menu, X, ArrowUpRight, Flame, ShieldCheck, Server, Building2 } from 'lucide-react';
import { navLinks, contactInfo } from '../data/navigation';
import '../styles/navbar.css';
import { FaFacebookF, FaWhatsapp, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';

const solutionIcons = [Flame, ShieldCheck, Server, Building2];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 35, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contacts">
            <a href={contactInfo.whatsappLink} className="topbar-contact-link" target="_blank" rel="noopener noreferrer">
              <span className="contact-icon-wrapper whatsapp-icon"><FaWhatsapp size={14} /></span>
              <span>{contactInfo.whatsapp}</span>
            </a>
            <span className="topbar-contact-divider" aria-hidden="true" />
            <a href={contactInfo.phoneLink} className="topbar-contact-link">
              <span className="contact-icon-wrapper phone-icon"><Phone size={13} /></span>
              <span>{contactInfo.phone}</span>
            </a>
          </div>
          <div className="topbar-socials">
            <a href={contactInfo.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={12} />
            </a>
            <a href={contactInfo.social.twitter} aria-label="X" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={12} />
            </a>
            <a href={contactInfo.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={13} />
            </a>
            <a href={contactInfo.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={13} />
            </a>
          </div>
        </div>
      </div>

      <motion.header
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        variants={{
          visible: { y: 0 },
          hidden: { y: '-140%' },
        }}
        animate={hidden && !mobileOpen ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container navbar-inner">
          <NavLink to="/" className="navbar-logo" aria-label="Prudent EPC home">
            <img src="/assets/images/logo.png" alt="Prudent EPC" />
          </NavLink>

          <nav className="navbar-links">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="nav-item"
                onMouseEnter={() => link.children && setOpenDropdown(link.path)}
                onMouseLeave={() => link.children && setOpenDropdown(null)}
                onFocus={() => link.children && setOpenDropdown(link.path)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null);
                }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  aria-haspopup={link.children ? 'true' : undefined}
                  aria-expanded={link.children ? openDropdown === link.path : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          className="navbar-active-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="nav-label-text">{link.label}</span>
                      {link.children && <ChevronDown className="chevron" size={14} />}
                    </>
                  )}
                </NavLink>
                {link.children && (
                  <AnimatePresence>
                    {openDropdown === link.path && (
                      <motion.div
                        className="dropdown"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{
                          duration: 0.90,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <span className="mega-menu__eyebrow">Integrated building systems</span>
                        <div className="mega-menu__grid">
                          {link.children.map((child, index) => {
                            const Icon = solutionIcons[index];
                            return (
                              <motion.div
                                key={child.path}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: index * 0.05 }}
                              >
                                <NavLink className="mega-menu__item" to={child.path}>
                                  <span className="mega-menu__icon"><Icon size={18} /></span>
                                  <span>{child.label}<small>Explore solution <ArrowUpRight size={11} /></small></span>
                                </NavLink>
                              </motion.div>
                            );
                          })}
                        </div>
                        <NavLink className="mega-menu__all" to="/solutions">Explore all Prudent EPC solutions <ArrowUpRight size={14} /></NavLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {<Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark blur backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(14, 20, 17, 0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 1099,
              }}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 1100 }}
            >
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
              <nav id="mobile-navigation" style={{ marginTop: '16px' }} aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    className="mobile-nav-item"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </NavLink>
                    {link.children && (
                      <div className="mobile-submenu">
                        {link.children.map((child) => (
                          <NavLink key={child.path} to={child.path} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileOpen(false)}>
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}