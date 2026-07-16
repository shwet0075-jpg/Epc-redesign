import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiMessageCircle, FiSend } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, phone: false, subject: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', padding: '140px 0 80px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.1) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" style={{ color: 'var(--color-secondary)' }}>Get In Touch</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '8px 0 20px', color: '#fff' }}>Contact Our Team</h1>
          <p style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '640px', margin: '0' }}>
            Ready to design, build, or audit your next critical safety or infrastructure project? Let's connect.
          </p>
        </div>
      </section>

      {/* CONTACT INFO & FORM SECTION */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start' }}>
          
          {/* Left Side: Contact Details */}
          <ScrollReveal variant="fade-right">
            <div>
              <SectionTitle
                eyebrow="Corporate Channels"
                title="Reach Us Directly"
              />
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
                For tenders, engineering consultations, project audits, or operational contracts, reach our project offices in Chembur, Mumbai.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <a
                  href="https://wa.me/8369640531"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'var(--color-light)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-gray-100)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  className="contact-card-link"
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                    <FiMessageCircle size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>WhatsApp Chat</h4>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>+91 83696 40531</span>
                  </div>
                </a>

                <a
                  href="tel:+912231620157"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'var(--color-light)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-gray-100)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  className="contact-card-link"
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                    <FiPhone size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Call Office</h4>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>+91 22 3162 0157</span>
                  </div>
                </a>

                <a
                  href="mailto:info@prudentepc.com"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'var(--color-light)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-gray-100)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  className="contact-card-link"
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-secondary-glow)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                    <FiMail size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</h4>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>info@prudentepc.com</span>
                  </div>
                </a>

                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'var(--color-light)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-gray-100)',
                  }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                    <FiMapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Head Office</h4>
                    <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-text-dark)', lineHeight: 1.4, display: 'block' }}>
                      305, Eastern Court, V N Purav Marg, Chembur, Mumbai - 400071
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Interactive Form */}
          <ScrollReveal variant="fade-left">
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-gray-300)',
                boxShadow: 'var(--shadow-lg)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                position: 'relative',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '8px' }}>Send Enquiries</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>Fill out the form below and our operations desk will reach back to you within 24 hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                  }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 20px' }}>
                    <FiSend size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '8px' }}>Enquiry Sent!</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0 }}>Thank you for reaching out. A representative will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[
                    { id: 'name', type: 'text', label: 'Full Name' },
                    { id: 'email', type: 'email', label: 'Email Address' },
                    { id: 'phone', type: 'tel', label: 'Phone Number' },
                    { id: 'subject', type: 'text', label: 'Subject' },
                  ].map((field) => (
                    <div key={field.id} style={{ position: 'relative' }}>
                      <label
                        htmlFor={field.id}
                        style={{
                          position: 'absolute',
                          left: '16px',
                          top: (focused[field.id] || form[field.id]) ? '-10px' : '16px',
                          fontSize: (focused[field.id] || form[field.id]) ? '0.78rem' : '0.95rem',
                          background: '#ffffff',
                          padding: '0 6px',
                          color: focused[field.id] ? 'var(--color-primary)' : 'var(--color-text-muted)',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          pointerEvents: 'none',
                          zIndex: 2,
                          fontWeight: (focused[field.id] || form[field.id]) ? 600 : 400,
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={form[field.id]}
                        required
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        onFocus={() => setFocused({ ...focused, [field.id]: true })}
                        onBlur={() => setFocused({ ...focused, [field.id]: false })}
                        style={{
                          width: '100%',
                          padding: '16px',
                          borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${focused[field.id] ? 'var(--color-primary)' : 'var(--color-gray-300)'}`,
                          fontSize: '0.96rem',
                          color: 'var(--color-text-dark)',
                          background: 'transparent',
                          outline: 'none',
                          boxShadow: focused[field.id] ? '0 0 0 3px var(--color-primary-glow)' : 'none',
                          transition: 'all 0.3s ease',
                          zIndex: 1,
                        }}
                      />
                    </div>
                  ))}

                  <div style={{ position: 'relative' }}>
                    <label
                      htmlFor="message"
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: (focused.message || form.message) ? '-10px' : '16px',
                        fontSize: (focused.message || form.message) ? '0.78rem' : '0.95rem',
                        background: '#ffffff',
                        padding: '0 6px',
                        color: focused.message ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: 'none',
                        zIndex: 2,
                        fontWeight: (focused.message || form.message) ? 600 : 400,
                      }}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      required
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused({ ...focused, message: true })}
                      onBlur={() => setFocused({ ...focused, message: false })}
                      style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${focused.message ? 'var(--color-primary)' : 'var(--color-gray-300)'}`,
                        fontSize: '0.96rem',
                        color: 'var(--color-text-dark)',
                        background: 'transparent',
                        outline: 'none',
                        boxShadow: focused.message ? '0 0 0 3px var(--color-primary-glow)' : 'none',
                        transition: 'all 0.3s ease',
                        resize: 'none',
                        zIndex: 1,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 700,
                      width: '100%',
                    }}
                  >
                    Submit Enquiry <FiSend style={{ marginLeft: '6px' }} />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INTERACTIVE MAP SECTION */}
      <section className="map-section" style={{ height: '480px', width: '100%', position: 'relative', overflow: 'hidden', background: 'var(--color-light)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5540321287957!2d72.8988636!3d19.0405022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8ac2ef73887%3A0x7d028ef78dc830c2!2sEastern%20Court!5e0!3m2!1sen!2sin!4v1689531580211!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Prudent EPC Office Location Map"
        />
      </section>
    </>
  );
}
