import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiActivity } from 'react-icons/fi';

const visitorCountEndpoint = import.meta.env.VITE_VISITOR_COUNT_API;

function getCount(payload) {
  const value = typeof payload === 'number' ? payload : payload?.count;
  return Number.isFinite(value) && value >= 0 ? value : null;
}

function formatCount(count) {
  return new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(count);
}

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!visitorCountEndpoint) return undefined;

    const controller = new AbortController();
    fetch(visitorCountEndpoint, { signal: controller.signal, cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setCount(getCount(payload)))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const label = count === null ? '—' : `${formatCount(count)}+`;

  return (
    <aside className="visitor-counter" aria-label="Website visitor count">
      <span className="visitor-counter-icon" aria-hidden="true"><FiActivity /></span>
      <div>
        <span className="visitor-counter-label">Website visits</span>
        <motion.strong
          key={label}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
        >
          {label}
        </motion.strong>
        {count === null && <span className="visitor-counter-status">Live counter ready for API</span>}
      </div>
    </aside>
  );
}
