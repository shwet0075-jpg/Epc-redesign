import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import SmoothScroll from "./components/SmoothScroll";
import ContinuityThread from "./components/ContinuityThread";

import PremiumLoader from "./components/Loading/PremiumLoader";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Gallery from "./pages/Gallery";
import Career from "./pages/Career";
import Contact from "./pages/Contact";

import "./App.css";
import "./styles/loader.css";

function AppRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions/*" element={<Solutions />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function Website() {
  return (
    <SmoothScroll>
      <ScrollToTop />
   <CustomCursor />
      <Navbar />
      <ContinuityThread />

      <main>
        <AppRoutes />
      </main>

      <BackToTop />

      <Footer />
    </SmoothScroll>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading ? (
        <PremiumLoader onComplete={() => setLoading(false)} />
      ) : (
        <Website />
      )}
    </BrowserRouter>
  );
}
