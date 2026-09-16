import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ArrowUpRight, Copy, Check, ShieldAlert, Sparkles } from 'lucide-react';
import { FaWhatsapp, FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { contactInfo } from '../../data/navigation';

export default function TopbarActionDock({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="topbar-action-dock-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="topbar-action-dock"
            initial={{ opacity: 0, y: -18, scale: 0.94, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -14, scale: 0.95, rotateX: 12 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 28,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ transformOrigin: 'top right' }}
          >
            {/* Ambient Interior Glows */}
            <div className="dock-glow dock-glow-emerald" aria-hidden="true" />
            <div className="dock-glow dock-glow-orange" aria-hidden="true" />

            {/* Header / Telemetry Strip */}
            <div className="dock-header">
              <div className="dock-title-group">
                <span className="dock-beacon" />
                <span className="dock-title">Direct Operations Desk</span>
              </div>
              <span className="dock-badge">Live Support</span>
            </div>

            {/* Staggered 3D Action Cards Grid */}
            <div className="dock-actions-grid">
              {/* Card 1: WhatsApp Instant Desk */}
              <motion.a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="dock-card dock-card--whatsapp"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              >
                <div className="dock-card-sheen" />
                <div className="dock-card-icon-wrap icon-whatsapp">
                  <FaWhatsapp size={18} />
                </div>
                <div className="dock-card-body">
                  <div className="dock-card-label-row">
                    <span className="dock-card-tag tag-online">Instant Chat</span>
                    <ArrowUpRight size={13} className="dock-arrow" />
                  </div>
                  <div className="dock-card-name">WhatsApp Support</div>
                  <div className="dock-card-value">{contactInfo.whatsapp}</div>
                </div>
              </motion.a>

              {/* Card 2: Corporate Phone Hotline */}
              <motion.a
                href={contactInfo.phoneLink}
                className="dock-card dock-card--phone"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              >
                <div className="dock-card-sheen" />
                <div className="dock-card-icon-wrap icon-phone">
                  <Phone size={17} />
                </div>
                <div className="dock-card-body">
                  <div className="dock-card-label-row">
                    <span className="dock-card-tag">Mon–Sat 9AM–7PM</span>
                    <ArrowUpRight size={13} className="dock-arrow" />
                  </div>
                  <div className="dock-card-name">HQ Direct Line</div>
                  <div className="dock-card-value">{contactInfo.phone}</div>
                </div>
              </motion.a>

              {/* Card 3: Executive Email Desk */}
              <motion.div
                className="dock-card dock-card--email"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              >
                <div className="dock-card-sheen" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="dock-card-email-link"
                >
                  <div className="dock-card-icon-wrap icon-email">
                    <Mail size={17} />
                  </div>
                  <div className="dock-card-body">
                    <div className="dock-card-label-row">
                      <span className="dock-card-tag">Corporate Inquiries</span>
                      <ArrowUpRight size={13} className="dock-arrow" />
                    </div>
                    <div className="dock-card-name">Email Desk</div>
                    <div className="dock-card-value">{contactInfo.email}</div>
                  </div>
                </a>
                <button
                  type="button"
                  className="dock-card-copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </motion.div>
            </div>

            {/* Card 4: 3D Micro-Socials Strip */}
            <div className="dock-social-strip">
              <span className="dock-social-label">Follow Official Channels</span>
              <div className="dock-social-tiles">
                <motion.a
                  href={contactInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-social-tile tile-fb"
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Facebook"
                >
                  <FaFacebookF size={13} />
                </motion.a>
                <motion.a
                  href={contactInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-social-tile tile-x"
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="X Twitter"
                >
                  <FaXTwitter size={13} />
                </motion.a>
                <motion.a
                  href={contactInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-social-tile tile-ig"
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Instagram"
                >
                  <FaInstagram size={14} />
                </motion.a>
                <motion.a
                  href={contactInfo.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-social-tile tile-yt"
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="YouTube"
                >
                  <FaYoutube size={14} />
                </motion.a>
              </div>
            </div>

            {/* Emergency & Certification Banner Footer */}
            <div className="dock-footer">
              <div className="dock-footer-item">
                <ShieldAlert size={14} className="text-orange-400" />
                <span>24/7 Rapid Fire & Safety Incident Support</span>
              </div>
              <span className="dock-footer-sep">•</span>
              <span className="dock-footer-cert">ISO 9001:2015</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
