import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiPhone, FiActivity, FiCamera, FiCpu, FiSliders, FiArrowUpRight } from 'react-icons/fi';
import { navLinks, contactInfo } from '../data/navigation';
import '../styles/navbar.css';
import { FaFacebookF,FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const solutionIcons = [FiActivity, FiCamera, FiCpu, FiSliders];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
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
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contacts">
            <a href={contactInfo.whatsappLink}><FaWhatsapp/> {contactInfo.whatsapp}</a>
            <a href={contactInfo.phoneLink}><FiPhone /> {contactInfo.phone}</a>
          </div>
          <div className="topbar-socials">
         <a href={contactInfo.social.facebook} aria-label="Facebook"
         target="_blank"
  rel="noopener noreferrer"
>
  <FaFacebookF />
</a>

<a href={contactInfo.social.twitter} aria-label="X"
target="_blank"
  rel="noopener noreferrer"
>
  <FaXTwitter />
</a>

<a
 href={contactInfo.social.instagram} aria-label="Instagram"
target="_blank"
  rel="noopener noreferrer"
>
  <FaInstagram />
</a>

<a href={contactInfo.social.youtube} aria-label="YouTube"
target="_blank"
  rel="noopener noreferrer"
>
  <FaYoutube />
</a>
          </div>
        </div>
      </div>

      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
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
                  {link.label}
                  {link.children && <FiChevronDown className="chevron" />}
                </NavLink>
                {link.children && (
                  <AnimatePresence>
                    {openDropdown === link.path && (
                      <motion.div
                        className="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
    type: "spring",
    stiffness: 260,
    damping: 22
}}
                      >
                        <span className="mega-menu__eyebrow">Integrated building systems</span>
                        <div className="mega-menu__grid">
                          {link.children.map((child, index) => {
                            const Icon = solutionIcons[index];
                            return <NavLink className="mega-menu__item" key={child.path} to={child.path}>
                              <span className="mega-menu__icon"><Icon /></span>
                              <span>{child.label}<small>Explore solution <FiArrowUpRight /></small></span>
                            </NavLink>;
                          })}
                        </div>
                        <NavLink className="mega-menu__all" to="/solutions">Explore all Prudent EPC solutions <FiArrowUpRight /></NavLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>



          <button className="navbar-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation">
            <FiMenu size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark blur backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(14, 20, 17, 0.5)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                zIndex: 199,
              }}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: 200 }}
            >
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <FiX size={26} />
              </button>
              <nav id="mobile-navigation" style={{ marginTop: '16px' }} aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <div key={link.path} className="mobile-nav-item">
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
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
