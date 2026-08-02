import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { navLinks, contactInfo } from '../data/navigation';
import MagneticButton from './animations/MagneticButton';


const solutions = [['Fire Safety', '/solutions/fire-safety'], ['Security & Surveillance', '/solutions/security'], ['Data Centre Services', '/solutions/data-centre'], ['Smart Building / IBMS', '/solutions/ibms']];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const subscribe = (event) => { event.preventDefault(); if (email) setSubmitted(true); };
  return (
    <>
    <section className="footer-cta"><div className="footer-cta__grid" aria-hidden="true" /><div className="container footer-cta__inner"><div><p>THE NEXT SYSTEM STARTS HERE</p><h2>Let's engineer the<br /><em>future</em> together.</h2></div><MagneticButton className="footer-cta__button"><Link to="/contact">Start a conversation <FiArrowRight /></Link></MagneticButton></div></section>
    <footer className="footer">
      <div className="footer-line" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/images/logo.png" alt="Prudent EPC" className="footer-logo" />
          <p>Engineered systems for safer, smarter and more resilient spaces—from first design to long-term performance.</p>
          <div className="footer-status"><span><i /> Systems online</span><b><FiClock /> IST · 09:00—18:00</b></div>
          <div className="footer-socials" aria-label="Follow Prudent EPC">
            <a href={contactInfo.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={contactInfo.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={contactInfo.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href={contactInfo.whatsappLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            {navLinks.filter((link) => !link.children).slice(0, 6).map((link) => (
              <li key={link.path}><NavLink to={link.path}>{link.label}</NavLink></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Systems</h4>
          <ul>{solutions.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul>
          <Link className="footer-all-services" to="/services">View all services <FiArrowRight /></Link>
        </div>

        <div className="footer-col footer-contact-col">
          <h4>Stay in the loop</h4>
          <p>Thoughtful project insights, straight to your inbox.</p>
          {submitted ? <div className="footer-submitted"><FiCheck /> You are on the list.</div> : <form className="footer-newsletter" onSubmit={subscribe}><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Work email address" aria-label="Email address" /><button aria-label="Subscribe"><FiSend /></button></form>}
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
    </>
  );
}
