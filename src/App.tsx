import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import { StarryBackground } from './components/StarryBackground';

import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { OpenGraphTags } from './components/OpenGraphTags';


// Home Guides


function Footer() {
  return (
    <footer className="w-full py-4 mt-auto border-t border-[#E5E7EB] bg-transparent z-20 relative flex flex-col items-center gap-y-2">
      <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 text-xs sm:text-sm px-4">
        <Link 
          to="/about" 
          onMouseEnter={() => import('./pages/About')}
          onFocus={() => import('./pages/About')}
          className="text-[#1F2937] hover:text-[#4C1D95] hover:underline transition-colors font-bold"
        >
          About
        </Link>
        <Link 
          to="/contact" 
          onMouseEnter={() => import('./pages/Contact')}
          onFocus={() => import('./pages/Contact')}
          className="text-[#1F2937] hover:text-[#4C1D95] hover:underline transition-colors font-bold"
        >
          Contact
        </Link>
        <Link 
          to="/privacy" 
          onMouseEnter={() => import('./pages/Privacy')}
          onFocus={() => import('./pages/Privacy')}
          className="text-[#1F2937] hover:text-[#4C1D95] hover:underline transition-colors font-bold"
        >
          Privacy Policy
        </Link>
        <Link 
          to="/terms" 
          onMouseEnter={() => import('./pages/Terms')}
          onFocus={() => import('./pages/Terms')}
          className="text-[#1F2937] hover:text-[#4C1D95] hover:underline transition-colors font-bold"
        >
          Terms & Conditions
        </Link>
      </div>
      <div className="text-[#1F2937] text-xs flex flex-col items-center font-bold">
        <span>&copy; {new Date().getFullYear()} Sleep Calculator. All rights reserved.</span>
      </div>
    </footer>
  );
}

function Header() {
  return (
    <header className="w-full pt-6 sm:pt-8 pb-1 sm:pb-2 flex justify-center items-center bg-transparent z-50 relative">
      <Link 
        to="/" 
        onContextMenu={(e) => e.preventDefault()} 
        className="font-display text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 rounded-2xl p-2 text-center"
      >
        Sleep Calculator
      </Link>
    </header>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

function PageBlogRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
}

function AppContent() {
  const [isDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-[#374151] font-sans relative overflow-x-hidden bg-[#F3ECE3]">
      <StarryBackground />
      <OpenGraphTags />
      <Header />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start w-full pt-0 pb-4 sm:pb-8">
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<Home />} />

                {/* Direct Root Paths for all articles */}
                <Route path="/sleep-cycles-explained" element={<Blog />} />
                <Route path="/what-is-rem-sleep" element={<Blog />} />
                <Route path="/how-much-sleep-do-you-need" element={<Blog />} />
                <Route path="/best-time-to-sleep-and-wake-up" element={<Blog />} />
                <Route path="/sleep-cycle-calculator-guide" element={<Blog />} />
                <Route path="/why-90-minute-sleep-cycles-matter" element={<Blog />} />
                <Route path="/how-to-wake-up-refreshed" element={<Blog />} />
                <Route path="/ideal-bedtime-for-adults" element={<Blog />} />
                <Route path="/sleep-schedule-for-productivity" element={<Blog />} />
                <Route path="/how-many-hours-of-sleep-is-healthy" element={<Blog />} />
                <Route path="/power-nap-vs-full-sleep-cycle" element={<Blog />} />
                <Route path="/circadian-rhythm-explained" element={<Blog />} />
                <Route path="/tired-after-8-hours-of-sleep" element={<Blog />} />
                <Route path="/best-bedtime-for-students" element={<Blog />} />
                <Route path="/sleep-and-memory" element={<Blog />} />
                <Route path="/sleep-debt-explained" element={<Blog />} />
                <Route path="/best-wake-up-time" element={<Blog />} />
                <Route path="/improve-sleep-quality" element={<Blog />} />
                <Route path="/sleep-hygiene-tips" element={<Blog />} />
                <Route path="/common-sleep-mistakes" element={<Blog />} />
                <Route path="/fix-irregular-sleep-schedule" element={<Blog />} />
                <Route path="/consistent-sleep-schedule-benefits" element={<Blog />} />
                <Route path="/best-temperature-for-sleep" element={<Blog />} />
                <Route path="/what-is-deep-sleep" element={<Blog />} />
                
                {/* 10 New Blog Articles - Merged same-topic duplicates redirect cleanly */}
                <Route path="/how-much-sleep-do-you-need-by-age" element={<Navigate to="/how-much-sleep-do-you-need" replace />} />
                <Route path="/wake-up-tired-after-8-hours" element={<Navigate to="/tired-after-8-hours-of-sleep" replace />} />
                <Route path="/best-bedtime-for-adults" element={<Navigate to="/ideal-bedtime-for-adults" replace />} />
                <Route path="/how-long-does-it-take-to-fall-asleep" element={<Blog />} />
                <Route path="/what-is-sleep-debt" element={<Navigate to="/sleep-debt-explained" replace />} />
                <Route path="/why-do-we-dream" element={<Blog />} />
                <Route path="/sleep-and-memory-learning" element={<Navigate to="/sleep-and-memory" replace />} />
                <Route path="/why-do-people-snore" element={<Blog />} />
                <Route path="/sleep-calculator-by-age" element={<Navigate to="/how-much-sleep-do-you-need" replace />} />
                <Route path="/90-minute-sleep-calculator" element={<Blog />} />
                <Route path="/best-sleep-schedule-for-productivity" element={<Navigate to="/sleep-schedule-for-productivity" replace />} />
                <Route path="/sleep-calculator-for-students" element={<Navigate to="/best-bedtime-for-students" replace />} />
                <Route path="/why-am-i-tired-after-sleeping" element={<Blog />} />

                {/* Legacy /blog and /page/blog Prefixes redirected back to clean root paths */}
                <Route path="/blog/:slug" element={<PageBlogRedirect />} />
                <Route path="/page/blog/:slug" element={<PageBlogRedirect />} />

                <Route path="/about" element={<About />} />
                
                {/* Utility Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="/contact" element={<Contact />} />
                


                {/* Catch-all 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
          <Footer />
    </div>
  );
}
