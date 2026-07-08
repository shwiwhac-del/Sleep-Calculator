import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollToTop from './components/ScrollToTop';
import { StarryBackground } from './components/StarryBackground';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';

const Home = lazy(() => import('./pages/Home'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const NotFound = lazy(() => import('./pages/NotFound'));
const StudentCalc = lazy(() => import('./pages/StudentCalc'));
const ShiftWorkCalc = lazy(() => import('./pages/ShiftWorkCalc'));
const NinetyMinCalc = lazy(() => import('./pages/NinetyMinCalc'));
const WakeUpCalc = lazy(() => import('./pages/WakeUpCalc'));
const IdealBedtimeCalc = lazy(() => import('./pages/IdealBedtimeCalc'));

import BlogSkeleton from './components/BlogSkeleton';
import HomeSkeleton from './components/HomeSkeleton';
import Skeleton from './components/Skeleton';
import { OpenGraphTags } from './components/OpenGraphTags';


// Home Guides


function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#FAF6F0]/80 dark:bg-[#0F172A]/80 backdrop-blur-md py-12 z-20 relative text-[#4B5563] dark:text-slate-300 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 pb-10 border-b border-[#E5E7EB] dark:border-[#1E293B]">
          {/* Column 1: Sleep Tools & Calculators */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#7C3AED] dark:text-violet-400 border-b border-[#E1D8CC]/80 dark:border-slate-800 pb-2.5">
              Sleep Calculators
            </h3>
            <ul className="flex flex-col gap-y-3 text-[15px] sm:text-base">
              <li>
                <Link to="/student-sleep-calculator" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Student Sleep Calculator
                </Link>
              </li>
              <li>
                <Link to="/shift-work-sleep-calculator" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Shift Work Sleep Calculator
                </Link>
              </li>
              <li>
                <Link to="/sleep-cycle-calculator-90-minutes" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  90-Min Sleep Cycle Calculator
                </Link>
              </li>
              <li>
                <Link to="/wake-up-between-sleep-cycles" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Wake Up Cycle Calculator
                </Link>
              </li>
              <li>
                <Link to="/ideal-bedtime-based-on-wake-up-time" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Ideal Bedtime Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Popular Sleep Guides */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#7C3AED] dark:text-violet-400 border-b border-[#E1D8CC]/80 dark:border-slate-800 pb-2.5">
              Sleep Guides & Science
            </h3>
            <ul className="flex flex-col gap-y-3 text-[15px] sm:text-base">
              <li>
                <Link to="/blog/sleep-cycles-explained" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Sleep Cycles Explained
                </Link>
              </li>
              <li>
                <Link to="/blog/what-is-rem-sleep" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  What is REM Sleep?
                </Link>
              </li>
              <li>
                <Link to="/blog/how-much-sleep-do-you-need" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  How Much Sleep Do I Need?
                </Link>
              </li>
              <li>
                <Link to="/blog/best-time-to-sleep-and-wake-up" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Best Sleeping & Wake Times
                </Link>
              </li>
              <li>
                <Link to="/blog/sleep-cycle-calculator-guide" className="underline decoration-black dark:decoration-slate-500 hover:text-[#7C3AED] dark:hover:text-violet-400 hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] dark:text-slate-200 underline-offset-4">
                  Sleep Calculator User Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Pages with larger text & copyright centered at the very bottom */}
        <div className="pt-10 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] sm:text-base font-black text-[#374151] dark:text-slate-200">
            <Link to="/about" className="hover:text-[#7C3AED] dark:hover:text-violet-400 hover:underline transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#7C3AED] dark:hover:text-violet-400 hover:underline transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-[#7C3AED] dark:hover:text-violet-400 hover:underline transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#7C3AED] dark:hover:text-violet-400 hover:underline transition-colors">Terms & Conditions</Link>
            <Link to="/blog" className="hover:text-[#7C3AED] dark:hover:text-violet-400 hover:underline transition-colors">Blog</Link>
          </div>
          
          <span className="text-xs sm:text-sm text-[#6B7280] dark:text-slate-400 font-semibold tracking-wide text-center">
            &copy; {new Date().getFullYear()} Sleep Calculator. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

const CALCULATORS = [
  { name: "90-Min Sleep Calculator", path: "/sleep-cycle-calculator-90-minutes" },
  { name: "Wake Up Calculator", path: "/wake-up-between-sleep-cycles" },
  { name: "Ideal Bedtime Calculator", path: "/ideal-bedtime-based-on-wake-up-time" },
  { name: "Student Sleep Calculator", path: "/student-sleep-calculator" },
  { name: "Shift Work Sleep Calculator", path: "/shift-work-sleep-calculator" },
];

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isCalcActive = () => {
    return CALCULATORS.some(calc => location.pathname === calc.path);
  };

  return (
    <header className="w-full bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E5E7EB]/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              onContextMenu={(e) => e.preventDefault()} 
              className="font-display text-2xl sm:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 rounded-xl leading-tight"
            >
              Sleep Calculator
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                  : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5'
              }`}
            >
              Home
            </Link>

            {/* Calculators Dropdown Container */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 focus-visible:outline-none ${
                  isCalcActive() 
                    ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                    : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5'
                }`}
              >
                Calculators
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-1 z-50 border border-[#E5E7EB]"
                  >
                    {CALCULATORS.map((calc) => (
                      <Link
                        key={calc.path}
                        to={calc.path}
                        className={`block px-4 py-2.5 text-xs font-bold transition-colors duration-150 ${
                          location.pathname === calc.path
                            ? 'text-[#7C3AED] bg-[#7C3AED]/5'
                            : 'text-[#374151] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5'
                        }`}
                      >
                        {calc.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/blog" 
              className={`px-3 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 ${
                isActive('/blog') 
                  ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                  : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5'
              }`}
            >
              Blog
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                  : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5'
              }`}
            >
              About
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                  : 'text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5'
              }`}
            >
              Contact
            </Link>

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all duration-200 ml-1 flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-[#D4AF37]" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>

          {/* Mobile Actions Container */}
          <div className="flex md:hidden items-center space-x-1">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5.5 h-5.5 text-[#D4AF37]" />
              ) : (
                <Moon className="w-5.5 h-5.5" />
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#4B5563] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#FAF6F0] border-t border-[#E5E7EB]/50"
          >
            <div className="px-3 pt-2 pb-4 space-y-1 sm:px-4 flex flex-col">
              <Link
                to="/"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                  isActive('/') 
                    ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                    : 'text-[#4B5563]'
                }`}
              >
                Home
              </Link>
              
              {/* Mobile Calculators Section */}
              <div className="py-1">
                <div className="px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#7C3AED]">
                  Sleep Calculators
                </div>
                <div className="mt-1 ml-2 pl-2 border-l border-[#E5E7EB] space-y-0.5">
                  {CALCULATORS.map((calc) => (
                    <Link
                      key={calc.path}
                      to={calc.path}
                      className={`block px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        location.pathname === calc.path
                          ? 'text-[#7C3AED] bg-[#7C3AED]/5'
                          : 'text-[#4B5563]'
                      }`}
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/blog"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                  isActive('/blog') 
                    ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                    : 'text-[#4B5563]'
                }`}
              >
                Blog
              </Link>

              <Link
                to="/about"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                  isActive('/about') 
                    ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                    : 'text-[#4B5563]'
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                  isActive('/contact') 
                    ? 'text-[#7C3AED] bg-[#7C3AED]/5' 
                    : 'text-[#4B5563]'
                }`}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

function RootSlugRedirect() {
  const { slug } = useParams();
  const blogSlugs = [
    "sleep-cycles-explained",
    "what-is-rem-sleep",
    "how-much-sleep-do-you-need",
    "best-time-to-sleep-and-wake-up",
    "sleep-cycle-calculator-guide",
    "why-90-minute-sleep-cycles-matter",
    "ideal-bedtime-for-adults",
    "sleep-schedule-for-productivity",
    "how-many-hours-of-sleep-is-healthy",
    "power-nap-vs-full-sleep-cycle",
    "circadian-rhythm-explained",
    "tired-after-8-hours-of-sleep",
    "best-bedtime-for-students",
    "sleep-and-memory",
    "sleep-debt-explained",
    "best-wake-up-time",
    "improve-sleep-quality",
    "sleep-hygiene-tips",
    "common-sleep-mistakes",
    "fix-irregular-sleep-schedule",
    "consistent-sleep-schedule-benefits",
    "best-temperature-for-sleep",
    "what-is-deep-sleep",
    "how-long-does-it-take-to-fall-asleep",
    "why-do-we-dream",
    "why-do-people-snore",
    "sleep-calculator-for-students",
    "sleep-calculator-for-exams",
    "why-am-i-tired-after-sleeping",
    "rem-sleep-calculator-bedtime-cycles",
    "sleep-deprivation-calculator-recovery-guide",
    "adhd-sleep-schedule-calculator-tips",
    "what-time-should-i-sleep-if-i-wake-up-at-6-am",
    "best-bedtime-calculator-for-students",
    "nap-calculator-20-30-60-90-minutes",
    "sleep-calculator-for-night-shift-workers"
  ];

  if (slug && blogSlugs.includes(slug.toLowerCase())) {
    return <Navigate to={`/blog/${slug}`} replace />;
  }

  // Exact duplicate merges
  const redirects: Record<string, string> = {
    "how-to-wake-up-refreshed": "wake-up-between-sleep-cycles",
    "how-much-sleep-do-you-need-by-age": "blog/how-much-sleep-do-you-need",
    "wake-up-tired-after-8-hours": "blog/tired-after-8-hours-of-sleep",
    "best-bedtime-for-adults": "blog/ideal-bedtime-for-adults",
    "what-is-sleep-debt": "blog/sleep-debt-explained",
    "sleep-and-memory-learning": "blog/sleep-and-memory",
    "sleep-calculator-by-age": "blog/how-much-sleep-do-you-need",
    "90-minute-sleep-calculator": "sleep-cycle-calculator-90-minutes",
    "best-sleep-schedule-for-productivity": "blog/sleep-schedule-for-productivity",
    "bedtime-calculator-by-age": "ideal-bedtime-based-on-wake-up-time",
    "shift-work-sleep-calculator-guide": "blog/sleep-calculator-for-night-shift-workers"
  };

  if (slug && redirects[slug.toLowerCase()]) {
    const target = redirects[slug.toLowerCase()];
    const dest = target.startsWith('blog/') ? `/${target}` : `/${target}`;
    return <Navigate to={dest} replace />;
  }

  return <NotFound />;
}

function PageFallback() {
  const location = useLocation();
  const path = location.pathname;

  const isBlogDetail = path.startsWith('/blog/') || [
    "sleep-cycles-explained",
    "what-is-rem-sleep",
    "how-much-sleep-do-you-need",
    "best-time-to-sleep-and-wake-up",
    "sleep-cycle-calculator-guide",
    "why-90-minute-sleep-cycles-matter",
    "ideal-bedtime-for-adults",
    "sleep-schedule-for-productivity",
    "how-many-hours-of-sleep-is-healthy",
    "power-nap-vs-full-sleep-cycle",
    "circadian-rhythm-explained",
    "tired-after-8-hours-of-sleep",
    "best-bedtime-for-students",
    "sleep-and-memory",
    "sleep-debt-explained",
    "best-wake-up-time",
    "improve-sleep-quality",
    "sleep-hygiene-tips",
    "common-sleep-mistakes",
    "fix-irregular-sleep-schedule",
    "consistent-sleep-schedule-benefits",
    "best-temperature-for-sleep",
    "what-is-deep-sleep",
    "how-long-does-it-take-to-fall-asleep",
    "why-do-we-dream",
    "why-do-people-snore",
    "sleep-calculator-for-students",
    "sleep-calculator-for-exams",
    "why-am-i-tired-after-sleeping",
    "rem-sleep-calculator-bedtime-cycles",
    "sleep-deprivation-calculator-recovery-guide",
    "adhd-sleep-schedule-calculator-tips",
    "what-time-should-i-sleep-if-i-wake-up-at-6-am",
    "best-bedtime-calculator-for-students",
    "nap-calculator-20-30-60-90-minutes",
    "sleep-calculator-for-night-shift-workers"
  ].some(slug => path.endsWith(slug));

  const isBlogIndex = path === '/blog' || path === '/blog/';

  if (isBlogDetail) {
    return (
      <div className="w-full mx-auto px-2 sm:px-4 max-w-3xl py-4 sm:py-6 relative z-10">
        <BlogSkeleton isPost={true} />
      </div>
    );
  }

  if (isBlogIndex) {
    return (
      <div className="w-full mx-auto px-2 sm:px-4 max-w-6xl py-8 relative z-10">
        <BlogSkeleton isPost={false} />
      </div>
    );
  }

  const isCalculator = path === '/' || [
    '/student-sleep-calculator',
    '/shift-work-sleep-calculator',
    '/sleep-cycle-calculator-90-minutes',
    '/wake-up-between-sleep-cycles',
    '/ideal-bedtime-based-on-wake-up-time'
  ].includes(path);

  if (isCalculator) {
    return (
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-8 relative z-10">
        <HomeSkeleton />
      </div>
    );
  }

  // Fallback for generic text pages (About, Privacy, Terms, Contact)
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-left relative z-10">
      <Skeleton variant="rectangular" className="h-10 w-2/3 rounded-lg" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-11/12" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <div className="space-y-4 pt-4">
        <Skeleton variant="rectangular" className="h-8 w-1/3 rounded-md mb-2" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-4/5" />
      </div>
    </div>
  );
}

function AppContent() {
  usePerformanceMonitoring();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("sleep_calculator_theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sleep_calculator_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sleep_calculator_theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col text-[#374151] dark:text-[#E2E8F0] font-sans relative overflow-x-hidden bg-[#F3ECE3] dark:bg-[#0B0F19] transition-colors duration-300">
      <StarryBackground />
      <OpenGraphTags />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start w-full pt-5 sm:pt-8 md:pt-10 pb-4 sm:pb-8">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />

            {/* The 5 Dedicated Interactive Calculator Landing Pages */}
            <Route path="/student-sleep-calculator" element={<StudentCalc />} />
            <Route path="/shift-work-sleep-calculator" element={<ShiftWorkCalc />} />
            <Route path="/sleep-cycle-calculator-90-minutes" element={<NinetyMinCalc />} />
            <Route path="/wake-up-between-sleep-cycles" element={<WakeUpCalc />} />
            <Route path="/ideal-bedtime-based-on-wake-up-time" element={<IdealBedtimeCalc />} />

            {/* Utility Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

            {/* Legacy page/blog Prefixes redirected back to clean paths */}
            <Route path="/page/blog/:slug" element={<Navigate replace to="/blog/:slug" />} />

            {/* Dynamic redirect for root-level blog slugs to /blog/:slug */}
            <Route path="/:slug" element={<RootSlugRedirect />} />

            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
