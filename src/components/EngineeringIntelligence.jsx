import { motion } from "framer-motion";
import { FiCpu, FiShield, FiActivity, FiDatabase } from "react-icons/fi";
import { GiProcessor } from "react-icons/gi";
import SplitHeading from "./animations/SplitHeading";



export default function EngineeringIntelligence() {
  return (
    <section className="engineering-intelligence">
      <div className="container">

        <motion.div
          className="ei-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
        >

  <motion.span
  className="section-label"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Engineering Intelligence
</motion.span>

<SplitHeading
  text={`Building Intelligent Infrastructure,
Not Just Installing Systems.`}
  className="engineering-title"
  delay={0.15}
/>

         <motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.4 }}
>
   Prudent EPC integrates fire protection, security, building
            automation, networking and mission-critical engineering into one
            unified ecosystem that delivers long-term operational excellence.
</motion.p>

        </motion.div>

       <motion.div
  className="ei-ecosystem"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>   

 {/* SVG Network */}

<svg
    className="ei-network"
    viewBox="0 0 1200 700"
    preserveAspectRatio="none"
>

    <defs>

        <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>

    </defs>

    <path
        id="path-top"
        className="ei-path"
        d="M600 350 C600 260 600 220 600 160"
    />

    <path
        id="path-left"
        className="ei-path"
        d="M600 350 C500 350 420 350 280 350"
    />

    <path
        id="path-right"
        className="ei-path"
        d="M600 350 C700 350 780 350 920 350"
    />

    <path
        id="path-bottom"
        className="ei-path"
        d="M600 350 C600 440 600 500 600 560"
    />

    {/* Top */}
    <circle r="4" className="ei-pulse" filter="url(#pulseGlow)">
        <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            rotate="auto">
            <mpath href="#path-top"/>
        </animateMotion>
    </circle>

    {/* Left */}
    <circle r="4" className="ei-pulse" filter="url(#pulseGlow)">
        <animateMotion
            dur="2.4s"
            begin=".4s"
            repeatCount="indefinite"
            rotate="auto">
            <mpath href="#path-left"/>
        </animateMotion>
    </circle>

    {/* Right */}
    <circle r="4" className="ei-pulse" filter="url(#pulseGlow)">
        <animateMotion
            dur="2.4s"
            begin=".8s"
            repeatCount="indefinite"
            rotate="auto">
            <mpath href="#path-right"/>
        </animateMotion>
    </circle>

    {/* Bottom */}
    <circle r="4" className="ei-pulse" filter="url(#pulseGlow)">
        <animateMotion
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
            rotate="auto">
            <mpath href="#path-bottom"/>
        </animateMotion>
    </circle>

</svg>

{/* TOP */}

<motion.article
  className="ei-card ei-top"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  whileHover={{
    x: 20,
    rotate: 2,
    transition: { duration: 0.3 }
  }}
>

    <FiCpu className="ei-card-icon"/>

    <h3>Smart Automation</h3>

    <p>
        IBMS, Building Automation,
        IoT Integration &
        Analytics.
    </p>

</motion.article>

{/* LEFT */}

<motion.article
    className="ei-card ei-left"
   whileHover={{
  y: -8,
  rotate: -2,
  transition: { duration: 0.3 }
}}
>

    <FiActivity className="ei-card-icon"/>

    <h3>Fire Protection</h3>

    <p>
        Detection,
        Suppression,
        Life Safety Systems.
    </p>

</motion.article>

{/* HUB */}

<div className="ei-hub">

    <div className="ei-hub-ring"></div>

    <div className="ei-hub-ring ei-hub-ring-2"></div>

    <div className="ei-chip">
        <GiProcessor className="ei-hub-icon" />
    </div>

</div>

{/* RIGHT */}

<motion.article
    className="ei-card ei-right"
   whileHover={{
  y: 20,
  rotate: 2,
  transition: { duration: 0.3 }
}}
>

    <FiShield className="ei-card-icon"/>

    <h3>Security Infrastructure</h3>

    <p>
        CCTV,
        Access Control,
        Command Centre.
    </p>

</motion.article>

{/* BOTTOM */}

<motion.article
    className="ei-card ei-bottom"
    whileHover={{
  x: -8,
  rotate: -2,
  transition: { duration: 0.3 }
}}
>

    <FiDatabase className="ei-card-icon"/>

    <h3>Digital Infrastructure</h3>

    <p>
        Structured Cabling,
        Networking,
        Data Centres.
    </p>

</motion.article>


</motion.div>

      </div>
    </section>
  );
}