import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Loader2, Home as HomeIcon, BookOpen, User, HelpCircle, Mail, ShieldAlert } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import { StarryBackground } from './components/StarryBackground';

const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));


// Home Guides


function Footer() {
  return (
    <footer className="w-full py-6 sm:py-8 mt-auto border-t border-white/5 bg-transparent z-20 relative flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-450 px-4 mb-3">
        <Link 
          to="/about" 
          onMouseEnter={() => import('./pages/About')}
          onFocus={() => import('./pages/About')}
          className="hover:text-[#2563EB] transition-colors font-medium"
        >
          About
        </Link>
        <Link 
          to="/contact" 
          onMouseEnter={() => import('./pages/Contact')}
          onFocus={() => import('./pages/Contact')}
          className="hover:text-[#2563EB] transition-colors font-medium"
        >
          Contact
        </Link>
        <Link 
          to="/privacy" 
          onMouseEnter={() => import('./pages/Privacy')}
          onFocus={() => import('./pages/Privacy')}
          className="hover:text-[#2563EB] transition-colors font-medium"
        >
          Privacy Policy
        </Link>
        <Link 
          to="/terms" 
          onMouseEnter={() => import('./pages/Terms')}
          onFocus={() => import('./pages/Terms')}
          className="hover:text-[#2563EB] transition-colors font-medium"
        >
          Terms & Conditions
        </Link>
      </div>
      <div className="text-gray-400 dark:text-gray-550 text-[10px] sm:text-xs flex flex-col items-center gap-1">
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
        className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-indigo-200 to-blue-300 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 rounded-2xl p-2 text-center"
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

function AppContent() {
  const [isDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-gray-155 dark:text-slate-100 font-sans relative overflow-x-hidden bg-[#07102e]">
      <StarryBackground />
      <Header />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start w-full pt-0 pb-4 sm:pb-8">
            <Suspense fallback={
              <div className="flex justify-center items-center h-[50vh] w-full">
                <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
              </div>
            }>
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
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
                <Route path="/about" element={<About />} />
                
                {/* Utility Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="/contact" element={<Contact />} />
                


                {/* Catch-all 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
    </div>
  );
}
