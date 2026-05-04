import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

// Home Guides
const GuideWhatIsASleepCalculator = lazy(() => import('./pages/GuideWhatIsASleepCalculator'));
const GuideWhyYouFeelTired = lazy(() => import('./pages/GuideWhyYouFeelTired'));

const BestTimeToSleep = lazy(() => import('./pages/BestTimeToSleep'));
const SleepCycleGuide = lazy(() => import('./pages/SleepCycleGuide'));
const SleepByAge = lazy(() => import('./pages/SleepByAge'));
const WhyYouFeelTired = lazy(() => import('./pages/WhyYouFeelTired'));
const PowerNapGuide = lazy(() => import('./pages/PowerNapGuide'));
const WhatIsASleepCalculator = lazy(() => import('./pages/WhatIsASleepCalculator'));
const HowSleepCycleWorks = lazy(() => import('./pages/HowSleepCycleWorks'));
const BenefitsOfSleepCalculator = lazy(() => import('./pages/BenefitsOfSleepCalculator'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4 max-w-[1100px] mx-auto px-4 sm:px-6">
    <div className="w-full max-w-2xl h-12 bg-gray-100 animate-pulse rounded-full mb-8"></div>
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-3xl mb-12"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      <div className="w-full h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
      <div className="w-full h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
      <div className="w-full h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
    </div>
  </div>
);

function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-gray-100 bg-white z-20 relative flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 px-4 mb-4">
        <Link to="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-[#2563EB] transition-colors">Disclaimer</Link>
        <Link to="/terms" className="hover:text-[#2563EB] transition-colors">Terms & Conditions</Link>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">Sitemap</a>
      </div>
      <div className="text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Sleep Calculator. All rights reserved.
      </div>
    </footer>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full h-[70px] border-b border-gray-100 bg-white z-50 sticky top-0">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 md:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-gray-900 hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded">
          <Moon className="text-[#2563EB]" size={22} strokeWidth={2.5} />
          <span className="text-base sm:text-lg font-bold tracking-tight font-serif">Sleep Calculator</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-8 text-[15px] font-medium text-gray-600">
          <Link to="/blog" className="hover:text-[#2563EB] transition-colors focus-visible:outline-none">Blog</Link>
          <Link to="/about" className="hover:text-[#2563EB] transition-colors focus-visible:outline-none">About</Link>
          <Link to="/contact" className="hover:text-[#2563EB] transition-colors focus-visible:outline-none">Contact</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-600 hover:text-gray-900 p-1 focus-visible:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col py-4 px-4 gap-2 z-50">
          <Link to="/blog" className="text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 font-medium text-base px-4 py-3 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link to="/about" className="text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 font-medium text-base px-4 py-3 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 font-medium text-base px-4 py-3 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col text-gray-900 font-sans relative overflow-x-hidden bg-white">
          <AppContent />
        </div>
      </Router>
    </HelmetProvider>
  );
}

function AppContent() {
  return (
    <>
      <Header />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start w-full py-6 sm:py-10">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                
                {/* Utility Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />

                {/* Home Guides */}
                <Route path="/guide/sleep-calculator" element={<GuideWhatIsASleepCalculator />} />
                <Route path="/guide/fix-your-sleep" element={<GuideWhyYouFeelTired />} />

                {/* Blog Posts under proper /blog hierarchy */}
                <Route path="/blog/sleep-calculator" element={<WhatIsASleepCalculator />} />
                <Route path="/blog/best-sleep-time" element={<BestTimeToSleep />} />
                <Route path="/blog/sleep-cycle-stages" element={<SleepCycleGuide />} />
                <Route path="/blog/tired" element={<WhyYouFeelTired />} />
                <Route path="/blog/power-nap" element={<PowerNapGuide />} />
                <Route path="/blog/sleep-age" element={<SleepByAge />} />
                <Route path="/blog/sleep-cycle" element={<HowSleepCycleWorks />} />
                <Route path="/blog/sleep-calculator-benefits" element={<BenefitsOfSleepCalculator />} />

                {/* Redirects for old URLs to new structure */}
                <Route path="/blog/what-is-a-sleep-calculator" element={<Navigate to="/blog/sleep-calculator" replace />} />
                <Route path="/what-is-a-sleep-calculator" element={<Navigate to="/blog/sleep-calculator" replace />} />

                <Route path="/blog/best-time-to-sleep" element={<Navigate to="/blog/best-sleep-time" replace />} />
                <Route path="/best-time-to-sleep" element={<Navigate to="/blog/best-sleep-time" replace />} />

                <Route path="/blog/sleep-cycle-guide" element={<Navigate to="/blog/sleep-cycle-stages" replace />} />
                <Route path="/sleep-cycle-guide" element={<Navigate to="/blog/sleep-cycle-stages" replace />} />

                <Route path="/blog/why-you-feel-tired" element={<Navigate to="/blog/tired" replace />} />
                <Route path="/why-you-feel-tired" element={<Navigate to="/blog/tired" replace />} />

                <Route path="/blog/power-nap-guide" element={<Navigate to="/blog/power-nap" replace />} />
                <Route path="/power-nap-guide" element={<Navigate to="/blog/power-nap" replace />} />

                <Route path="/blog/sleep-by-age" element={<Navigate to="/blog/sleep-age" replace />} />
                <Route path="/sleep-by-age" element={<Navigate to="/blog/sleep-age" replace />} />

                <Route path="/blog/how-does-your-sleep-cycle-work" element={<Navigate to="/blog/sleep-cycle" replace />} />
                <Route path="/how-does-your-sleep-cycle-work" element={<Navigate to="/blog/sleep-cycle" replace />} />

                <Route path="/blog/benefits-of-using-a-sleep-calculator" element={<Navigate to="/blog/sleep-calculator-benefits" replace />} />

                {/* Catch-all 404 route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
    </>
  );
}
