import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import SmoothScroll from "./components/SmoothScroll";
import ContinuityThread from "./components/ContinuityThread";

import PremiumLoader from "./components/Loading/PremiumLoader";
import CustomCursor from "./components/CustomCursor";
import CurtainTransition from "./components/animations/CurtainTransition";

// Critical landing page: Direct import for instant FCP / LCP
import Home from "./pages/Home";

// Route Code-Splitting: Lazy-load non-critical pages on demand
const About = lazy(() => import("./pages/About"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));

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
  const isFirstRender = useRef(true);

  useEffect(() => {
    // After the initial page mounts, allow curtain transitions for subsequent route changes
    isFirstRender.current = false;
  }, []);

  const routeTree = (
    <Suspense fallback={null}>
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
    </Suspense>
  );

  // On first mount (initial page load / hot reload), render directly without double-curtain overlay
  if (isFirstRender.current) {
    return routeTree;
  }

  return (
    <AnimatePresence mode="wait">
      <CurtainTransition key={location.pathname} mode={mode}>
        {routeTree}
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
  // On hot-reload or subsequent opens in the same session, load immediately with zero freeze
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('prudent_session_loaded');
    } catch {
      return true;
    }
  });

  const handleComplete = () => {
    try {
      sessionStorage.setItem('prudent_session_loaded', 'true');
    } catch {}
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <PremiumLoader key="loader" onComplete={handleComplete} />
        ) : (
          <Website key="website" />
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
