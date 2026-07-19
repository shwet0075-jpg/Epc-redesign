import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiCpu, FiServer, FiShield, FiVideo } from 'react-icons/fi';

const solutionIcons = [FiShield, FiVideo, FiServer, FiCpu];

export default function SolutionCard({ title, blurb, image, path, index }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = solutionIcons[index] || FiCpu;
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className="solution-card-item"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.52, delay: shouldReduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
    >
      <div className="solution-card-image-wrap">
        <img src={image} alt={title} className="solution-card-img" />
        <div className="solution-card-overlay" aria-hidden="true" />
        <span className="solution-card-number" aria-hidden="true">{number}</span>
      </div>

      <div className="solution-card-content">
        <div className="solution-card-heading">
          <span className="solution-card-icon" aria-hidden="true"><Icon /></span>
          <span className="solution-card-kicker">Solution {number}</span>
        </div>
        <h3 className="solution-card-title">{title}</h3>
        <p>{blurb}</p>
        <Link to={path} className="solution-card-link">
          Explore solution <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
