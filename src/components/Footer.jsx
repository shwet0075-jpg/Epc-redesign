import { NavLink } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { navLinks, contactInfo } from '../data/navigation';


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
          <span>© {new Date().getFullYear()} Prudent EPC Pvt. Ltd. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}