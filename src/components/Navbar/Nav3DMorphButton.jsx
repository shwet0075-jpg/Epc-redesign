import React, { useState, useEffect, useRef } from 'react';
import { contactInfo } from '../../data/navigation';
import '../../styles/nav3dButton.css';

/**
 * 3D Morphing Button for Navbar (Beside Contact)
 * Matches reference images:
 * - Closed: 3 green dots in porcelain dome with polished copper rim and 3D dark extrusion
 * - Open: 3 dots morph into green X, 6 satellite amber buttons fan out in cascading arc
 */
export default function Nav3DMorphButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 6 Satellite contact channels deploying straight down in a clean vertical column
  const satellites = [
    {
      label: 'WhatsApp',
      href: contactInfo.whatsappLink,
      x: 0,
      y: 52,
      isBlank: true,
      path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    },
    {
      label: 'Call',
      href: contactInfo.phoneLink,
      x: 0,
      y: 100,
      isBlank: false,
      path: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    },
    {
      label: 'Facebook',
      href: contactInfo.social.facebook,
      x: 0,
      y: 148,
      isBlank: true,
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    {
      label: 'X',
      href: contactInfo.social.twitter,
      x: 0,
      y: 196,
      isBlank: true,
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    },
    {
      label: 'Instagram',
      href: contactInfo.social.instagram,
      x: 0,
      y: 244,
      isBlank: true,
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    },
    {
      label: 'YouTube',
      href: contactInfo.social.youtube,
      x: 0,
      y: 292,
      isBlank: true,
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    },
  ];

  return (
    <div className={`nav-3d-morph-hub ${isOpen ? 'is-open' : ''}`} ref={containerRef}>
      {/* Soft ground shadow beneath button */}
      <div className="nav-cast-shadow" aria-hidden="true" />

      {/* 6 Satellite Buttons */}
      <nav className="nav-satellites-layer" aria-label="Contact Channels">
        {satellites.map((sat, index) => (
          <a
            key={sat.label}
            href={sat.href}
            target={sat.isBlank ? '_blank' : undefined}
            rel={sat.isBlank ? 'noopener noreferrer' : undefined}
            className="nav-satellite-btn"
            style={{
              '--slot': index,
              '--tx': `${sat.x}px`,
              '--ty': `${sat.y}px`,
            }}
            tabIndex={isOpen ? 0 : -1}
            aria-label={sat.label}
          >
            <div className="nav-sat-white-rim">
              <div className="nav-sat-amber-dome">
                <svg className="nav-sat-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={sat.path} />
                </svg>
              </div>
            </div>
            <span className="nav-sat-tooltip">{sat.label}</span>
          </a>
        ))}
      </nav>

      {/* Central 3D Morph Button */}
      <button
        type="button"
        className="nav-trigger-btn"
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle contact channels"
      >
        <div className="nav-extrusion-cylinder">
          <div className="nav-copper-ring">
            <div className="nav-porcelain-dome">
              <div className="nav-glyph-stage" aria-hidden="true">
                {/* 3 Green Dots */}
                <div className="nav-dots-wrap">
                  <span className="nav-dot" />
                  <span className="nav-dot" />
                  <span className="nav-dot" />
                </div>
                {/* Green X */}
                <span className="nav-x-bar nav-diag-1" />
                <span className="nav-x-bar nav-diag-2" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
