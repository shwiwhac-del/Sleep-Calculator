import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import { StarryBackground } from './components/StarryBackground';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';

import Home from './pages/Home';
import { OpenGraphTags } from './components/OpenGraphTags';

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


// Home Guides


function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-[#E5E7EB] bg-[#FAF6F0]/80 backdrop-blur-md py-12 z-20 relative text-[#4B5563] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 pb-10 border-b border-[#E5E7EB]">
          {/* Column 1: Sleep Tools & Calculators */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#7C3AED] border-b border-[#E1D8CC]/80 pb-2.5">
              Sleep Calculators
            </h3>
            <ul className="flex flex-col gap-y-3 text-[15px] sm:text-base">
              <li>
                <Link to="/student-sleep-calculator" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Student Sleep Calculator
                </Link>
              </li>
              <li>
                <Link to="/shift-work-sleep-calculator" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Shift Work Sleep Calculator
                </Link>
              </li>
              <li>
                <Link to="/sleep-cycle-calculator-90-minutes" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  90-Min Sleep Cycle Calculator
                </Link>
              </li>
              <li>
                <Link to="/wake-up-between-sleep-cycles" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Wake Up Cycle Calculator
                </Link>
              </li>
              <li>
                <Link to="/ideal-bedtime-based-on-wake-up-time" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Ideal Bedtime Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Popular Sleep Guides */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#7C3AED] border-b border-[#E1D8CC]/80 pb-2.5">
              Sleep Guides & Science
            </h3>
            <ul className="flex flex-col gap-y-3 text-[15px] sm:text-base">
              <li>
                <Link to="/sleep-cycles-explained" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Sleep Cycles Explained
                </Link>
              </li>
              <li>
                <Link to="/what-is-rem-sleep" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  What is REM Sleep?
                </Link>
              </li>
              <li>
                <Link to="/how-much-sleep-do-you-need" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  How Much Sleep Do I Need?
                </Link>
              </li>
              <li>
                <Link to="/best-time-to-sleep-and-wake-up" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Best Sleeping & Wake Times
                </Link>
              </li>
              <li>
                <Link to="/sleep-cycle-calculator-guide" className="hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] hover:underline">
                  Sleep Calculator User Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Pages with larger text & copyright centered at the very bottom */}
        <div className="pt-10 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] sm:text-base font-black text-[#374151]">
            <Link to="/about" className="hover:text-[#7C3AED] hover:underline transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#7C3AED] hover:underline transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-[#7C3AED] hover:underline transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#7C3AED] hover:underline transition-colors">Terms & Conditions</Link>
            <Link to="/blog" className="hover:text-[#7C3AED] hover:underline transition-colors">Blog</Link>
          </div>
          
          <span className="text-xs sm:text-sm text-[#6B7280] font-semibold tracking-wide text-center">
            &copy; {new Date().getFullYear()} Sleep Calculator. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

function Header() {
  return (
    <header className="w-full pt-5 sm:pt-6 pb-2 flex justify-center items-center bg-transparent z-50 relative">
      <Link 
        to="/" 
        onContextMenu={(e) => e.preventDefault()} 
        className="font-display text-4xl sm:text-5xl lg:text-[2.75rem] font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 rounded-2xl p-2 text-center leading-tight"
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
  usePerformanceMonitoring();
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
          <Suspense fallback={<div className="min-h-[60vh] w-full opacity-0 transition-opacity duration-300" />}>
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />

                {/* Direct Root Paths for all articles */}
                <Route path="/sleep-cycles-explained" element={<Blog />} />
                <Route path="/what-is-rem-sleep" element={<Blog />} />
                <Route path="/how-much-sleep-do-you-need" element={<Blog />} />
                <Route path="/best-time-to-sleep-and-wake-up" element={<Blog />} />
                <Route path="/sleep-cycle-calculator-guide" element={<Blog />} />
                <Route path="/why-90-minute-sleep-cycles-matter" element={<Blog />} />
                <Route path="/how-to-wake-up-refreshed" element={<Navigate to="/wake-up-between-sleep-cycles" replace />} />
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
                <Route path="/90-minute-sleep-calculator" element={<Navigate to="/sleep-cycle-calculator-90-minutes" replace />} />
                <Route path="/best-sleep-schedule-for-productivity" element={<Navigate to="/sleep-schedule-for-productivity" replace />} />
                <Route path="/sleep-calculator-for-students" element={<Blog />} />
                <Route path="/sleep-calculator-for-exams" element={<Blog />} />
                <Route path="/student-sleep-calculator" element={<StudentCalc />} />
                <Route path="/why-am-i-tired-after-sleeping" element={<Blog />} />
                <Route path="/rem-sleep-calculator-bedtime-cycles" element={<Blog />} />
                <Route path="/sleep-deprivation-calculator-recovery-guide" element={<Blog />} />
                <Route path="/bedtime-calculator-by-age" element={<Navigate to="/ideal-bedtime-based-on-wake-up-time" replace />} />
                <Route path="/shift-work-sleep-calculator-guide" element={<Navigate to="/sleep-calculator-for-night-shift-workers" replace />} />
                <Route path="/adhd-sleep-schedule-calculator-tips" element={<Blog />} />
                <Route path="/what-time-should-i-sleep-if-i-wake-up-at-6-am" element={<Blog />} />
                <Route path="/best-bedtime-calculator-for-students" element={<Blog />} />
                <Route path="/nap-calculator-20-30-60-90-minutes" element={<Blog />} />

                {/* The 5 Dedicated Interactive Calculator Landing Pages */}
                <Route path="/sleep-calculator-for-night-shift-workers" element={<Blog />} />
                <Route path="/shift-work-sleep-calculator" element={<ShiftWorkCalc />} />
                <Route path="/sleep-cycle-calculator-90-minutes" element={<NinetyMinCalc />} />
                <Route path="/wake-up-between-sleep-cycles" element={<WakeUpCalc />} />
                <Route path="/ideal-bedtime-based-on-wake-up-time" element={<IdealBedtimeCalc />} />

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
            </Suspense>
          </main>
          <Footer />
    </div>
  );
}
