import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Loader2 } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));

// Home Guides

const SleepCycleGuide = lazy(() => import('./pages/SleepCycleGuide'));
const SleepByAge = lazy(() => import('./pages/SleepByAge'));
const FixSleepSchedule = lazy(() => import('./pages/FixSleepSchedule'));
const BlueLightSleep = lazy(() => import('./pages/BlueLightSleep'));
const WhatIsASleepCalculator = lazy(() => import('./pages/WhatIsASleepCalculator'));
const BestSleepCalculatorGuide = lazy(() => import('./pages/BestSleepCalculatorGuide'));
const HowSleepCycleWorks = lazy(() => import('./pages/HowSleepCycleWorks'));
const BenefitsOfSleepCalculator = lazy(() => import('./pages/BenefitsOfSleepCalculator'));
const SleepCycleCalculatorBlog = lazy(() => import('./pages/SleepCycleCalculatorBlog'));
const SmartSleepHabits = lazy(() => import('./pages/SmartSleepHabits'));
const WhyYouWakeUpMiddleNight = lazy(() => import('./pages/WhyYouWakeUpMiddleNight'));
const SleepDebtRecoveryGuide = lazy(() => import('./pages/SleepDebtRecoveryGuide'));
const BestSleepScheduleForStudents = lazy(() => import('./pages/BestSleepScheduleForStudents'));
const HowSleepAffectsBrainPerformance = lazy(() => import('./pages/HowSleepAffectsBrainPerformance'));
const BestBedtimeRoutine = lazy(() => import('./pages/BestBedtimeRoutine'));
const WhySleepCyclesMatter = lazy(() => import('./pages/WhySleepCyclesMatter'));
const BestBedtimeHabits = lazy(() => import('./pages/BestBedtimeHabits'));

const WakeUpAt6Am = lazy(() => import('./pages/WakeUpAt6Am'));
const WakeUpAt5Am = lazy(() => import('./pages/WakeUpAt5Am'));
const WakeUpAt7Am = lazy(() => import('./pages/WakeUpAt7Am'));
const BestBedtimeForStudents = lazy(() => import('./pages/BestBedtimeForStudents'));
const NapCalculatorTiming = lazy(() => import('./pages/NapCalculatorTiming'));
const NapCalculatorForEnergy = lazy(() => import('./pages/NapCalculatorForEnergy'));
const SleepCycleTiming = lazy(() => import('./pages/SleepCycleTiming'));
const RemSleepCalculatorPage = lazy(() => import('./pages/RemSleepCalculatorPage'));
const HowManySleepCyclesDoINeed = lazy(() => import('./pages/HowManySleepCyclesDoINeed'));
const WhyAmITiredAfterSleeping = lazy(() => import('./pages/WhyAmITiredAfterSleeping'));

function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-gray-200 dark:border-[#1e293b] bg-white dark:bg-[#0f172a] z-20 relative flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400 px-4 mb-4">
        <Link to="/about" className="hover:text-[#2563EB] transition-colors">About</Link>
        <Link to="/contact" className="hover:text-[#2563EB] transition-colors">Contact</Link>
        <Link to="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-[#2563EB] transition-colors">Terms & Conditions</Link>
        <Link to="/disclaimer" className="hover:text-[#2563EB] transition-colors">Medical Disclaimer</Link>
      </div>
      <div className="text-gray-400 dark:text-gray-600 text-xs flex flex-col items-center gap-1.5">
        <span>&copy; {new Date().getFullYear()} Sleep Calculator. All rights reserved.</span>
      </div>
    </footer>
  );
}

function Header({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean, toggleDarkMode: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full h-[60px] pb-1 border-b border-gray-100 dark:border-[#1e293b] bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md z-50 sticky top-0 transition-colors">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 md:px-8 tracking-tight relative">
        <Link to="/" onContextMenu={(e) => e.preventDefault()} className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded">
          <Moon className="text-[#2563EB]" size={20} strokeWidth={2.5} />
          <span className="text-base sm:text-lg font-bold tracking-tight">Sleep Calculator</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center text-[15px] font-medium text-gray-600 dark:text-gray-300">
          <Link to="/blog" className="hover:text-[#2563EB] transition-colors focus-visible:outline-none">Blog</Link>
        </nav>

        <div className="flex items-center gap-4 sm:gap-8">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-400 hover:text-[#2563EB] transition-colors p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1 focus-visible:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md flex flex-col pt-8 px-6 gap-4 z-40 overflow-y-auto shadow-sm">
          <div className="flex flex-col space-y-2">
            <Link to="/blog" className="text-gray-900 dark:text-gray-100 hover:text-[#2563EB] font-semibold text-2xl py-3 border-b border-gray-100 dark:border-[#1e293b] transition-colors" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          </div>
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
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-200 font-sans relative overflow-x-hidden bg-[#F5F7FA] dark:bg-[#0f172a]">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start w-full py-4 sm:py-8">
            <Suspense fallback={
              <div className="flex justify-center items-center h-[50vh] w-full">
                <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
              </div>
            }>
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                
                {/* Utility Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Blog Posts under proper /blog hierarchy */}
                <Route path="/blog/best-sleep-calculator" element={<BestSleepCalculatorGuide />} />
                <Route path="/blog/sleep-calculator" element={<WhatIsASleepCalculator />} />
                <Route path="/blog/sleep-cycle-stages" element={<SleepCycleGuide />} />
                <Route path="/blog/sleep-age" element={<SleepByAge />} />
                <Route path="/blog/sleep-cycle" element={<HowSleepCycleWorks />} />
                <Route path="/blog/sleep-calculator-benefits" element={<BenefitsOfSleepCalculator />} />
                <Route path="/blog/fix-sleep-schedule" element={<FixSleepSchedule />} />
                <Route path="/blog/blue-light-sleep" element={<BlueLightSleep />} />
                <Route path="/blog/sleep-cycle-calculator" element={<SleepCycleCalculatorBlog />} />
                <Route path="/blog/smart-sleep-habits-better-energy" element={<SmartSleepHabits />} />
                <Route path="/blog/why-you-wake-up-in-the-middle-of-the-night" element={<WhyYouWakeUpMiddleNight />} />
                <Route path="/blog/sleep-debt-recovery-guide" element={<SleepDebtRecoveryGuide />} />
                <Route path="/blog/best-sleep-schedule-for-students" element={<BestSleepScheduleForStudents />} />
                <Route path="/blog/how-sleep-affects-your-brain-performance" element={<HowSleepAffectsBrainPerformance />} />
                <Route path="/blog/best-bedtime-routine-for-better-sleep" element={<BestBedtimeRoutine />} />
                <Route path="/blog/why-sleep-cycles-matter-more-than-sleeping-longer" element={<WhySleepCyclesMatter />} />
                <Route path="/blog/best-bedtime-habits-for-better-sleep-quality" element={<BestBedtimeHabits />} />

                {/* Programmatic SEO Landing Pages */}
                <Route path="/blog/wake-up-at-6am" element={<WakeUpAt6Am />} />
                <Route path="/blog/wake-up-at-5am" element={<WakeUpAt5Am />} />
                <Route path="/blog/wake-up-at-7am" element={<WakeUpAt7Am />} />
                <Route path="/blog/best-bedtime-for-students" element={<BestBedtimeForStudents />} />
                <Route path="/blog/nap-calculator-timing" element={<NapCalculatorTiming />} />
                <Route path="/blog/nap-calculator-for-energy" element={<NapCalculatorForEnergy />} />
                <Route path="/blog/sleep-cycle-timing" element={<SleepCycleTiming />} />
                <Route path="/blog/rem-sleep-calculator" element={<RemSleepCalculatorPage />} />
                <Route path="/blog/how-many-sleep-cycles-do-i-need" element={<HowManySleepCyclesDoINeed />} />
                <Route path="/blog/why-am-i-tired-after-sleeping" element={<WhyAmITiredAfterSleeping />} />

                {/* Redirects for old URLs to new structure */}
                <Route path="/blog/what-is-a-sleep-calculator" element={<Navigate to="/blog/sleep-calculator" replace />} />
                <Route path="/what-is-a-sleep-calculator" element={<Navigate to="/blog/sleep-calculator" replace />} />

                <Route path="/blog/best-sleep-time" element={<Navigate to="/" replace />} />
                <Route path="/blog/best-time-to-sleep" element={<Navigate to="/" replace />} />
                <Route path="/best-time-to-sleep" element={<Navigate to="/" replace />} />

                <Route path="/blog/power-nap" element={<Navigate to="/blog/smart-sleep-habits-better-energy" replace />} />
                <Route path="/blog/power-nap-guide" element={<Navigate to="/blog/smart-sleep-habits-better-energy" replace />} />
                <Route path="/power-nap-guide" element={<Navigate to="/blog/smart-sleep-habits-better-energy" replace />} />

                <Route path="/blog/sleep-cycle-guide" element={<Navigate to="/blog/sleep-cycle-stages" replace />} />
                <Route path="/sleep-cycle-guide" element={<Navigate to="/blog/sleep-cycle-stages" replace />} />

                <Route path="/blog/tired" element={<Navigate to="/blog/why-sleep-cycles-matter-more-than-sleeping-longer" replace />} />
                <Route path="/blog/why-you-feel-tired" element={<Navigate to="/blog/why-sleep-cycles-matter-more-than-sleeping-longer" replace />} />
                <Route path="/why-you-feel-tired" element={<Navigate to="/blog/why-sleep-cycles-matter-more-than-sleeping-longer" replace />} />

                <Route path="/blog/sleep-by-age" element={<Navigate to="/blog/sleep-age" replace />} />
                <Route path="/sleep-by-age" element={<Navigate to="/blog/sleep-age" replace />} />

                <Route path="/blog/how-does-your-sleep-cycle-work" element={<Navigate to="/blog/sleep-cycle" replace />} />
                <Route path="/how-does-your-sleep-cycle-work" element={<Navigate to="/blog/sleep-cycle" replace />} />

                <Route path="/blog/benefits-of-using-a-sleep-calculator" element={<Navigate to="/blog/sleep-calculator-benefits" replace />} />

                {/* Catch-all 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
    </div>
  );
}
