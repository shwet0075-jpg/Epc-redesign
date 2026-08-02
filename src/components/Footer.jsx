import { NavLink } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { navLinks, contactInfo } from '../data/navigation';
import VisitorCounter from './VisitorCounter';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/images/logo.png" alt="Prudent EPC" className="footer-logo" />
          <p>
            Design and build solutions for Fire Detection & Suppression, Security & Surveillance,
            Data Centres, and Integrated Building Management Systems.
          </p>
          <div className="footer-socials" aria-label="Follow Prudent EPC">
            <a href={contactInfo.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={contactInfo.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={contactInfo.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href={contactInfo.whatsappLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
          <VisitorCounter />
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}><NavLink to={link.path}>{link.label}</NavLink></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><FiMapPin /> 305, Eastern Court, V N Purav Marg, Chembur, Mumbai - 400071</li>
            <li><FiPhone /> <a href={contactInfo.phoneLink}>{contactInfo.phone}</a></li>
            <li><FiMail /> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
  <div className="container footer-bottom-inner">

    <span>
      © {new Date().getFullYear()} Prudent EPC Pvt. Ltd.
      All Rights Reserved.
    </span>

    <span className="footer-credit">
      Crafted by <strong>~Shwet</strong>
    </span>

  </div>
</div>
    </footer>
  );
}
