import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  FiMapPin, FiPhone, FiMail, FiSend, FiDownload, FiCheck,
  FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMessageCircle, FiUser,
  FiAlertCircle, FiRefreshCw, FiCopy, FiExternalLink, FiX,
} from 'react-icons/fi';

import ScrollReveal from '../components/ScrollReveal';
import ScrollStagger from '../components/ScrollStagger';
import ScrollText from '../components/ScrollText';

/* ------------------------------------------------------------------ */
/*  Real office data — pulled from the live site, not placeholders     */
/* ------------------------------------------------------------------ */
const offices = [
  {
    id: 'corporate',
    label: 'Corporate Office',
    address: '305, Eastern Court, V N Purav Marg, Chembur, Mumbai - 400 071',
    phones: ['022 3162 0157', '+91 91378 57107'],
    email: 'ashok.g@prudentepc.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2292934100674!2d72.8900389!3d19.053653699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9579a4279d5%3A0xc2e03868ed96a766!2sPrudent%20EPC%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1696835856926!5m2!1sen!2sin',
  },
  {
    id: 'service',
    label: 'Service Office',
    address: '91/B, S G Barve Marg, Kamgar Nagar, Kurla (East), Mumbai - 400 024',
    phones: ['+91 85910 75003'],
    email: 'support.mgr@prudentepc.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.029308032762!2d72.88476231469724!3d19.062448987095724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae0039125%3A0xabf58c326cd3a87!2sPrudent%20EPC%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1674650221742!5m2!1sen!2sin',
  },
  {
    id: 'registered',
    label: 'Registered Office',
    address: 'B-509, Golf Scape, Behind Sunny Estate, Sion Trombay Road, Chembur, Mumbai - 400 071',
    phones: [],
    email: '',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471.40885046812235!2d72.89682127203027!3d19.05182760000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8a812e7105b%3A0x4075fcc77f49f150!2sGolf%20Scappe%20Apartments!5e0!3m2!1sen!2sin!4v1686567166227!5m2!1sen!2sin',
  },
];

const RECIPIENT_EMAIL = 'shwet0075@gmail.com';
const SALES_EMAIL = 'sales@prudentepc.com';
const MAIN_PHONE = '+91 22 3162 0157';
const WHATSAPP_URL = 'https://wa.me/8369640531';
const COMPANY_PROFILE_URL = 'https://www.prudentepc.com/assets/images/company/cp.pdf';

const socials = [
  { icon: <FiFacebook size={16} />, url: 'https://www.facebook.com/profile.php?id=100090938186393', label: 'Facebook' },
  { icon: <FiTwitter size={16} />, url: 'https://twitter.com/PrudentEPC', label: 'Twitter' },
  { icon: <FiInstagram size={16} />, url: 'https://www.instagram.com/prudentepc/', label: 'Instagram' },
  { icon: <FiYoutube size={16} />, url: 'https://youtube.com/@prudentepc', label: 'YouTube' },
];

/* ------------------------------------------------------------------ */
/*  Local styles — scoped to this page, same technique as Services.jsx */
/* ------------------------------------------------------------------ */
function ContactStyles() {
  return (
    <style>{`
      @keyframes contactGridDrift {
        from { background-position: 0px 0px, 0px 0px; }
        to { background-position: 48px 48px, 48px 48px; }
      }
      @keyframes contactFloatOrb {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        50% { transform: translateY(-22px) translateX(10px); }
      }
      .contact-blueprint-bg {
        background-image:
          linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
        background-size: 48px 48px, 48px 48px;
        animation: contactGridDrift 14s linear infinite;
      }
      .contact-tilt {
        transform-style: preserve-3d;
        transition: transform .18s ease-out, box-shadow .35s ease, border-color .35s ease;
        will-change: transform;
      }
      .contact-tilt:hover {
        box-shadow: 0 30px 70px rgba(0,96,48,.16);
      }
      .contact-office-card {
        position: relative;
        overflow: hidden;
        background: var(--color-white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        height: 100%;
      }
      .contact-office-accent {
        height: 4px;
        width: 100%;
        background: linear-gradient(90deg, #FF9933 0%, var(--color-white) 45%, #128807 100%);
      }
      .contact-input {
        width: 100%;
        padding: 14px 16px 14px 44px;
        border-radius: var(--radius-md);
        border: 1.5px solid rgba(0,96,48,.14);
        background: var(--color-white);
        font-size: .95rem;
        color: var(--color-text-dark);
        transition: border-color .25s ease, box-shadow .25s ease;
        font-family: inherit;
      }
      .contact-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 4px rgba(0,96,48,.08);
      }
      .contact-input-wrap {
        position: relative;
      }
      .contact-input-icon {
        position: absolute;
        left: 14px;
        top: 16px;
        color: var(--color-text-muted);
        pointer-events: none;
      }
      .contact-side-rail {
        position: fixed;
        right: 28px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 40;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      @media (max-width: 1100px) {
        .contact-side-rail { display: none; }
      }
      .contact-rail-btn {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-white);
        color: var(--color-primary);
        box-shadow: var(--shadow-sm);
        transition: transform .25s ease, box-shadow .25s ease, color .25s ease, background .25s ease;
      }
      .contact-rail-btn:hover {
        transform: scale(1.1);
        color: #fff;
        background: var(--color-secondary);
        box-shadow: 0 10px 24px rgba(240,128,32,.3);
      }

      @media (max-width: 900px) {
        .contact-form-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
        }
      }

      @media (max-width: 768px) {
        .contact-form-section {
          padding-top: 20px !important;
          padding-bottom: 6px !important;
        }
        .contact-form-section > .container {
          padding-bottom: 0 !important;
        }
        .contact-form-grid {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
          margin-bottom: 0 !important;
        }
        .contact-download-profile-link {
          margin-bottom: 0 !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .contact-blueprint-bg { animation: none !important; }
        .contact-tilt { transition: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse-tracked 3D tilt wrapper — same pattern as Services.jsx        */
/* ------------------------------------------------------------------ */
function TiltPanel({ children, style, className = '', maxTilt = 3, ...rest }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)');

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);
    setTransform(`perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`);
  };

  const handleLeave = () => {
    setTransform('perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`contact-tilt ${className}`}
      style={{ transform, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick-action rail — call / WhatsApp / email, one tap away           */
/* ------------------------------------------------------------------ */
function QuickContactRail({ onEmailClick }) {
  const actions = [
    { icon: <FiPhone size={18} />, href: `tel:${MAIN_PHONE.replace(/\s/g, '')}`, label: 'Call us' },
    { icon: <FiMessageCircle size={18} />, href: WHATSAPP_URL, label: 'WhatsApp us' },
    {
      icon: <FiMail size={18} />,
      label: 'Email us',
      onClick: (e) => {
        e.preventDefault();
        onEmailClick?.();
      },
    },
  ];
  return (
    <div className="contact-side-rail">
      {actions.map((a) => {
        if (a.onClick) {
          return (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              className="contact-rail-btn"
              aria-label="Email us / Send message"
              title="Email us (Open Gmail / Mail app / Form)"
              style={{ cursor: 'pointer', border: 'none', background: 'var(--color-white)' }}
            >
              {a.icon}
            </button>
          );
        }
        return (
          <a
            key={a.label}
            href={a.href}
            target={a.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="contact-rail-btn"
            aria-label={a.label}
            title={a.label}
          >
            {a.icon}
          </a>
        );
      })}
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  Contact form — sends directly to shwet0075@gmail.com via AJAX     */
/* ------------------------------------------------------------------ */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');
  const [isActivated, setIsActivated] = useState(true);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject || 'Website Inquiry',
          message: form.message,
          _subject: `[Prudent EPC Contact] ${form.subject || 'New Inquiry'} from ${form.name}`,
          _replyto: form.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('sent');
        setIsActivated(true);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else if (data.message && data.message.includes('Activate Form')) {
        // FormSubmit one-time activation notice sent to email
        setStatus('sent');
        setIsActivated(false);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to submit form.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Unable to send message right now. Please check your connection or contact us directly.'
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div
          key="sent-success"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', padding: '40px 20px' }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(0, 96, 48, 0.1)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: '2px solid rgba(0, 96, 48, 0.25)',
            }}
          >
            <FiCheck size={30} />
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '10px' }}>
            Message Sent Successfully!
          </h3>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6, fontSize: '0.95rem' }}>
            {isActivated
              ? `Thank you for reaching out! Your inquiry has been sent to ${RECIPIENT_EMAIL} and our engineering team will get back to you shortly.`
              : `Thank you! Your message was submitted. FormSubmit has sent a one-time activation email to ${RECIPIENT_EMAIL} — click 'Activate Form' in your inbox to verify.`}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '999px',
              border: '1.5px solid rgba(0, 96, 48, 0.25)',
              background: 'transparent',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gap: '18px' }}
        >
          {status === 'error' && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#b91c1c',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiAlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
              <a
                href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(form.subject || 'Website Inquiry')}&body=${encodeURIComponent(form.message)}`}
                style={{
                  color: '#b91c1c',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  fontSize: '0.85rem',
                }}
              >
                Email directly
              </a>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            <div className="contact-input-wrap">
              <FiUser className="contact-input-icon" size={16} />
              <input
                className="contact-input"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
            <div className="contact-input-wrap">
              <FiMail className="contact-input-icon" size={16} />
              <input
                className="contact-input"
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            <div className="contact-input-wrap">
              <FiPhone className="contact-input-icon" size={16} />
              <input
                className="contact-input"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                disabled={status === 'sending'}
              />
            </div>
            <div className="contact-input-wrap">
              <FiMessageCircle className="contact-input-icon" size={16} />
              <input
                className="contact-input"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <textarea
            className="contact-input"
            name="message"
            placeholder="Tell us about your project"
            rows={5}
            value={form.message}
            onChange={handleChange}
            style={{ paddingLeft: '16px', resize: 'vertical' }}
            required
            disabled={status === 'sending'}
          />

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={status === 'sending' ? {} : { scale: 1.02 }}
            whileTap={status === 'sending' ? {} : { scale: 0.98 }}
            style={{
              justifySelf: 'start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '999px',
              border: 'none',
              background: 'var(--color-secondary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              opacity: status === 'sending' ? 0.75 : 1,
              boxShadow: '0 14px 30px rgba(240,128,32,.28)',
            }}
          >
            {status === 'sending' ? (
              <>
                <span>Sending message…</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  style={{ display: 'inline-flex' }}
                >
                  <FiRefreshCw size={16} />
                </motion.div>
              </>
            ) : (
              <>
                <span>Send message</span>
                <FiSend size={16} />
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const location = useLocation();
  const [emailToast, setEmailToast] = useState({
    visible: false,
    email: SALES_EMAIL,
    copied: false,
  });

  useEffect(() => {
    if (location.hash === '#contact-message-form' || location.hash === '#send-message') {
      const timer = setTimeout(() => {
        const formEl = document.getElementById('contact-message-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const inputEl = formEl.querySelector('input[name="name"]');
          if (inputEl) inputEl.focus();
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const openEmailAction = (email = SALES_EMAIL, options = {}) => {

    // 1. Copy email to clipboard
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(email).catch(() => {});
      } else {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
    } catch (err) {
      console.error('Clipboard copy error:', err);
    }

    // 2. Set toast state
    setEmailToast({
      visible: true,
      email,
      copied: true,
    });

    // 3. Optional scroll to form
    if (options.scrollToForm) {
      const formEl = document.getElementById('contact-message-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // 4. Try opening mailto safely
    const mailtoUrl = `mailto:${email}?cc=${encodeURIComponent(RECIPIENT_EMAIL)}&subject=${encodeURIComponent('Inquiry: Prudent EPC')}`;
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      // Ignore mailto launch errors
    }
  };

  return (
    <>
      <ContactStyles />
      <QuickContactRail onEmailClick={() => openEmailAction(SALES_EMAIL, { scrollToForm: true })} />

      {/* PAGE HEADER */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', padding: 'clamp(104px, 9.5vw, 124px) 0 clamp(40px, 4.5vw, 54px)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="contact-blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <motion.div
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 128, 32, 0.14) 0%, transparent 70%)',
            top: '-20%', right: '-10%', pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
            style={{ color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <span style={{ width: '28px', height: '2px', background: 'var(--color-secondary)', display: 'inline-block' }} />
            Get In Touch
          </motion.span>

          <ScrollText
            as="h1"
            text="Contact"
            style={{ fontSize: 'clamp(3rem,5vw,4.8rem)', fontWeight: 800, margin: '6px 0 16px', color: '#fff' }}
            amount={0}
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#d3ded9', maxWidth: '700px', margin: 0 }}
          >
            Whether it's a fire safety audit, a surveillance rollout, or a full data-center
            build — tell us what you're planning and our team will get back to you directly.
          </motion.p>
        </div>
      </section>

      {/* OFFICES */}
      <section className="section" style={{ background: '#fbfdfc' }}>
        <div className="container">
          <ScrollStagger
            variant="rise-blur-3d"
            stagger={0.08}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}
          >
            {offices.map((office) => (
              <TiltPanel key={office.id} maxTilt={3}>
                <div className="contact-office-card">
                  <div className="contact-office-accent" />
                  <div style={{ padding: '32px' }}>
                    <div
                      style={{
                        width: '52px', height: '52px', borderRadius: '14px',
                        background: 'var(--color-primary-glow)', color: 'var(--color-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px',
                      }}
                    >
                      <FiMapPin size={22} />
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '10px' }}>
                      {office.label}
                    </h3>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {office.address}
                    </p>

                    {office.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-body)', fontSize: '.92rem', fontWeight: 600, marginBottom: '6px', textDecoration: 'none' }}>
                        <FiPhone size={14} style={{ color: 'var(--color-secondary)' }} /> {p}
                      </a>
                    ))}

                    {office.email && (
                      <a
                        href={`mailto:${office.email}`}
                        onClick={(e) => {
                          e.preventDefault();
                          openEmailAction(office.email);
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-body)', fontSize: '.92rem', fontWeight: 600, marginBottom: '18px', textDecoration: 'none', cursor: 'pointer' }}
                        title="Click to email or copy address"
                      >
                        <FiMail size={14} style={{ color: 'var(--color-secondary)' }} /> {office.email}
                      </a>
                    )}

                    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '180px', marginTop: office.email || office.phones.length ? 0 : '18px' }}>
                      <iframe
                        title={`${office.label} map`}
                        src={office.mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </TiltPanel>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* FORM + QUICK INFO */}
      <section className="section contact-form-section">
        <div className="container">
          <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 1fr)', gap: 'clamp(28px, 3.5vw, 42px)', alignItems: 'start' }}>

            <ScrollReveal variant="fade-right">
              <TiltPanel maxTilt={1}>
                <div id="contact-message-form" style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'clamp(28px, 3vw, 42px)' }}>
                  <h2 style={{ fontSize: 'clamp(1.6rem,2vw,2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '8px' }}>
                    Send us a message
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '22px' }}>
                    We typically reply within one business day.
                  </p>
                  <ContactForm />
                </div>
              </TiltPanel>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', borderRadius: 'var(--radius-lg)', padding: '32px', color: '#fff' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px' }}>Prefer to talk directly?</h3>

                  <a href={`tel:${MAIN_PHONE.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', marginBottom: '14px' }}>
                    <FiPhone size={16} style={{ color: 'var(--color-secondary)' }} /> {MAIN_PHONE}
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', marginBottom: '14px' }}>
                    <FiMessageCircle size={16} style={{ color: 'var(--color-secondary)' }} /> WhatsApp us
                  </a>
                  <a
                    href={`mailto:${SALES_EMAIL}?cc=${encodeURIComponent(RECIPIENT_EMAIL)}&subject=${encodeURIComponent('Inquiry: Prudent EPC')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openEmailAction(SALES_EMAIL);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#fff',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      margin: '-6px -12px',
                      borderRadius: '8px',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    title="Click to email or copy address"
                  >
                    <FiMail size={16} style={{ color: 'var(--color-secondary)' }} />
                    <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{SALES_EMAIL}</span>
                    <FiCopy size={12} style={{ opacity: 0.75, marginLeft: '2px' }} />
                  </a>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '26px' }}>
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        style={{
                          width: '38px', height: '38px', borderRadius: '50%',
                          background: 'rgba(255,255,255,.12)', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href={COMPANY_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-download-profile-link"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fbfdfc', border: '1.5px solid rgba(0,96,48,.14)',
                    borderRadius: 'var(--radius-lg)', padding: '22px 24px', textDecoration: 'none',
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--color-text-dark)', fontSize: '.95rem' }}>
                    Download company profile
                  </span>
                  <FiDownload size={18} style={{ color: 'var(--color-secondary)' }} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Email Action Toast */}
      <AnimatePresence>
        {emailToast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              width: 'calc(100% - 32px)',
              maxWidth: '540px',
              background: 'linear-gradient(135deg, #031c0e 0%, #062f18 100%)',
              border: '1.5px solid rgba(240, 128, 32, 0.45)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(0, 96, 48, 0.35)',
              borderRadius: '18px',
              padding: '20px 24px',
              color: '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <FiCheck size={18} />
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '0.01em' }}>
                    {emailToast.email}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6ee7b7', fontWeight: 600 }}>
                    Copied to clipboard! Choose where to open:
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailToast((prev) => ({ ...prev, visible: false }))}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailToast.email)}&cc=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent('Inquiry: Prudent EPC')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: '1 1 auto',
                  minWidth: '140px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: 'var(--color-secondary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(240, 128, 32, 0.4)',
                }}
              >
                <FiExternalLink size={15} /> Open in Gmail
              </a>

              <a
                href={`mailto:${emailToast.email}?cc=${encodeURIComponent(RECIPIENT_EMAIL)}&subject=${encodeURIComponent('Inquiry: Prudent EPC')}`}
                style={{
                  flex: '1 1 auto',
                  minWidth: '140px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <FiMail size={15} /> Default Mail App
              </a>

              <button
                type="button"
                onClick={() => {
                  setEmailToast((prev) => ({ ...prev, visible: false }));
                  const formEl = document.getElementById('contact-message-form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const inputEl = formEl.querySelector('input[name="name"]');
                    if (inputEl) inputEl.focus();
                  }
                }}
                style={{
                  flex: '1 1 100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.75)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Or fill the message form on this page ↓
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

