import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { navLinks, contactInfo } from '../data/navigation';
import '../styles/navbar.css';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contacts">
            <a href={contactInfo.whatsappLink}><FiMessageCircle /> {contactInfo.whatsapp}</a>
            <a href={contactInfo.phoneLink}><FiPhone /> {contactInfo.phone}</a>
          </div>
          <div className="topbar-socials">
            <a href={contactInfo.social.facebook} aria-label="Facebook">f</a>
            <a href={contactInfo.social.twitter} aria-label="Twitter">x</a>
            <a href={contactInfo.social.instagram} aria-label="Instagram">ig</a>
            <a href={contactInfo.social.youtube} aria-label="YouTube">yt</a>
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
              >
                <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
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
                        transition={{ duration: 0.2 }}
                      >
                        {link.children.map((child) => (
                          <NavLink key={child.path} to={child.path}>{child.label}</NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <button className="navbar-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen}>
            <FiMenu size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <FiX size={28} />
            </button>
            <nav>
              {navLinks.map((link) => (
                <div key={link.path} className="mobile-nav-item">
                  <NavLink to={link.path} onClick={() => setMobileOpen(false)}>{link.label}</NavLink>
                  {link.children && (
                    <div className="mobile-submenu">
                      {link.children.map((child) => (
                        <NavLink key={child.path} to={child.path} onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
