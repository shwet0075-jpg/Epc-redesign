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

import CurtainTransition from "./components/animations/CurtainTransition";

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

const routeCurtainMap = {
  '/': 'doors',
  '/about': 'stagger',
  '/services': 'shutter',
  '/clients': 'iris',
  '/gallery': 'mixed',
  '/career': 'stagger',
  '/contact': 'wipe',
};

function getCurtainMode(pathname) {
  if (pathname.startsWith('/solutions')) return 'wipe';
  return routeCurtainMap[pathname] || 'doors';
}

function AppRoutes() {
  const location = useLocation();
  const mode = getCurtainMode(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <CurtainTransition key={location.pathname} mode={mode}>
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
      </CurtainTransition>
    </AnimatePresence>
  );
}

function Website() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <Navbar />
      <ContinuityThread />

      <main style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}>
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
      <CustomCursor />
      {loading ? (
        <PremiumLoader onComplete={() => setLoading(false)} />
      ) : (
        <Website />
      )}
    </BrowserRouter>
  );
}
