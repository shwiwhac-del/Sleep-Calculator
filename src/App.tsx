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
                <Link to="/student-sleep-calculator" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  Student Sleep Calculator
                </Link>
              </li>
              <li>
                <Link to="/shift-work-sleep-calculator" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  Shift Work Sleep Calculator
                </Link>
              </li>
              <li>
                <Link to="/sleep-cycle-calculator-90-minutes" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  90-Min Sleep Cycle Calculator
                </Link>
              </li>
              <li>
                <Link to="/wake-up-between-sleep-cycles" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  Wake Up Cycle Calculator
                </Link>
              </li>
              <li>
                <Link to="/ideal-bedtime-based-on-wake-up-time" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
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
                <Link to="/blog/sleep-cycles-explained" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  Sleep Cycles Explained
                </Link>
              </li>
              <li>
                <Link to="/blog/what-is-rem-sleep" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  What is REM Sleep?
                </Link>
              </li>
              <li>
                <Link to="/blog/how-much-sleep-do-you-need" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  How Much Sleep Do I Need?
                </Link>
              </li>
              <li>
                <Link to="/blog/best-time-to-sleep-and-wake-up" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
                  Best Sleeping & Wake Times
                </Link>
              </li>
              <li>
                <Link to="/blog/sleep-cycle-calculator-guide" className="underline decoration-black hover:text-[#7C3AED] hover:translate-x-1.5 transition-all duration-200 block font-bold text-[#111827] underline-offset-4">
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
