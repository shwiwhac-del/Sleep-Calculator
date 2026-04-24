import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Moon } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));
const GenericPage = lazy(() => import('./pages/GenericPage'));
const Contact = lazy(() => import('./pages/Contact'));
const SleepFAQ = lazy(() => import('./pages/SleepFAQ'));

const BestTimeToSleep = lazy(() => import('./pages/BestTimeToSleep'));
const SleepCycleGuide = lazy(() => import('./pages/SleepCycleGuide'));
const SleepByAge = lazy(() => import('./pages/SleepByAge'));
const WhyYouFeelTired = lazy(() => import('./pages/WhyYouFeelTired'));
const PowerNapGuide = lazy(() => import('./pages/PowerNapGuide'));
const WhatIsASleepCalculator = lazy(() => import('./pages/WhatIsASleepCalculator'));
const SleepCalculatorTool = lazy(() => import('./pages/SleepCalculatorTool'));
const SleepGuides = lazy(() => import('./pages/SleepGuides'));
const HowSleepCycleWorks = lazy(() => import('./pages/HowSleepCycleWorks'));
const BenefitsOfSleepCalculator = lazy(() => import('./pages/BenefitsOfSleepCalculator'));
const BestSleepTimes = lazy(() => import('./pages/BestSleepTimes'));

const SleepTipsForBetterHealth = lazy(() => import('./pages/SleepTipsForBetterHealth'));
const FixYourSleepSchedule = lazy(() => import('./pages/FixYourSleepSchedule'));
const BestSleepRoutineForProductivity = lazy(() => import('./pages/BestSleepRoutineForProductivity'));
const SleepAndWeightLoss = lazy(() => import('./pages/SleepAndWeightLoss'));
const DeepSleepTips = lazy(() => import('./pages/DeepSleepTips'));
const EffectsOfOversleeping = lazy(() => import('./pages/EffectsOfOversleeping'));
const SleepForStudents = lazy(() => import('./pages/SleepForStudents'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[#00d2ff]/20 blur-xl rounded-full animate-pulse"></div>
      <Moon className="text-[#00d2ff] animate-bounce z-10" size={48} fill="currentColor" />
      <div className="absolute w-24 h-24 border-t-2 border-r-2 border-[#00d2ff]/30 rounded-full animate-spin"></div>
      <div className="absolute w-32 h-32 border-b-2 border-l-2 border-[#fcd34d]/30 rounded-full animate-[spin_2s_linear_reverse]"></div>
    </div>
    <div className="flex items-center gap-1 mt-4">
      <span className="text-[#00d2ff] font-medium tracking-widest uppercase text-sm">Loading</span>
      <span className="text-[#00d2ff] animate-[bounce_1s_infinite_0ms] font-bold">.</span>
      <span className="text-[#00d2ff] animate-[bounce_1s_infinite_200ms] font-bold">.</span>
      <span className="text-[#00d2ff] animate-[bounce_1s_infinite_400ms] font-bold">.</span>
    </div>
  </div>
);

const StarryBackground = () => {
  // Generate static stars in useMemo to avoid recalculating random layouts and causing CPU/CLS issues
  const stars = useMemo(() => Array.from({ length: 250 }).map((_, i) => ({
    id: i,
    cx: `${Math.random() * 100}%`,
    cy: `${Math.random() * 100}%`,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    glow: Math.random() > 0.8,
  })), []);

  return (
    <svg className="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-90" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {stars.map((star) => (
        <circle
          key={star.id}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="white"
          opacity={star.opacity}
          filter={star.glow ? "url(#glow)" : undefined}
        />
      ))}
    </svg>
  );
};

function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-white/10 bg-[#130f2e]/50 backdrop-blur-md z-20 relative text-center">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm text-white/60 px-4">
        <Link to="/sleep-guides" className="hover:text-[#00d2ff] transition-colors">Sleep Guides</Link>
        <Link to="/sleep-calculator-tool" className="hover:text-[#00d2ff] transition-colors">Tool Info</Link>
        <Link to="/blog" className="hover:text-[#00d2ff] transition-colors">Blog</Link>
        <Link to="/about" className="hover:text-[#00d2ff] transition-colors">About Us</Link>
        <Link to="/contact" className="hover:text-[#00d2ff] transition-colors">Contact Us</Link>
        <Link to="/terms" className="hover:text-[#00d2ff] transition-colors">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-[#00d2ff] transition-colors">Privacy Policy</Link>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d2ff] transition-colors">Sitemap</a>
      </div>
    </footer>
  );
}

function Header() {
  return (
    <header className="w-full py-4 px-6 sm:px-8 border-b border-white/5 bg-[#130f2e]/70 backdrop-blur-xl z-50 sticky top-0 flex items-center justify-between shadow-sm">
      <Link to="/" className="flex items-center gap-2.5 text-white hover:text-[#00d2ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] rounded-lg">
        <Moon className="text-[#a5b4fc]" size={26} strokeWidth={2} fill="#a5b4fc" />
        <span className="text-xl font-extrabold tracking-tight">Sleep Calculator</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-white/70">
        <Link to="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">Home</Link>
        <Link to="/sleep-guides" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">Guides</Link>
        <Link to="/blog" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">Blog</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col text-white font-sans relative overflow-x-hidden bg-gradient-to-b from-[#1c1445] via-[#15103a] to-[#0d0a26]">
          <StarryBackground />
          <Header />
          <main className="relative z-10 flex-grow flex flex-col items-center justify-start p-4 sm:p-8">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                
                {/* Utility Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<GenericPage title="About Us" />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sleep-faq" element={<SleepFAQ />} />
                <Route path="/sleep-guides" element={<SleepGuides />} />
                <Route path="/sleep-calculator-tool" element={<SleepCalculatorTool />} />

                {/* Blog Posts under proper /blog hierarchy */}
                <Route path="/blog/best-time-to-sleep" element={<BestTimeToSleep />} />
                <Route path="/blog/sleep-cycle-guide" element={<SleepCycleGuide />} />
                <Route path="/blog/sleep-by-age" element={<SleepByAge />} />
                <Route path="/blog/why-you-feel-tired" element={<WhyYouFeelTired />} />
                <Route path="/blog/power-nap-guide" element={<PowerNapGuide />} />
                <Route path="/blog/what-is-a-sleep-calculator" element={<WhatIsASleepCalculator />} />
                <Route path="/blog/how-does-your-sleep-cycle-work" element={<HowSleepCycleWorks />} />
                <Route path="/blog/benefits-of-using-a-sleep-calculator" element={<BenefitsOfSleepCalculator />} />
                <Route path="/blog/best-sleep-times-based-on-90-minute-cycles" element={<BestSleepTimes />} />
                
                {/* New 10 Blog Posts */}
                <Route path="/blog/sleep-tips-for-better-health" element={<SleepTipsForBetterHealth />} />
                <Route path="/blog/fix-your-sleep-schedule" element={<FixYourSleepSchedule />} />
                <Route path="/blog/best-sleep-routine-for-productivity" element={<BestSleepRoutineForProductivity />} />
                <Route path="/blog/sleep-and-weight-loss" element={<SleepAndWeightLoss />} />
                <Route path="/blog/deep-sleep-tips-that-actually-work" element={<DeepSleepTips />} />
                <Route path="/blog/effects-of-oversleeping" element={<EffectsOfOversleeping />} />
                <Route path="/blog/sleep-for-students" element={<SleepForStudents />} />

                {/* Redirects for old URLs to new structure */}
                <Route path="/best-time-to-sleep" element={<Navigate to="/blog/best-time-to-sleep" replace />} />
                <Route path="/sleep-cycle-guide" element={<Navigate to="/blog/sleep-cycle-guide" replace />} />
                <Route path="/sleep-by-age" element={<Navigate to="/blog/sleep-by-age" replace />} />
                <Route path="/why-you-feel-tired" element={<Navigate to="/blog/why-you-feel-tired" replace />} />
                <Route path="/power-nap-guide" element={<Navigate to="/blog/power-nap-guide" replace />} />
                <Route path="/what-is-a-sleep-calculator" element={<Navigate to="/blog/what-is-a-sleep-calculator" replace />} />
                <Route path="/how-does-your-sleep-cycle-work" element={<Navigate to="/blog/how-does-your-sleep-cycle-work" replace />} />
                <Route path="/benefits-of-using-a-sleep-calculator" element={<Navigate to="/blog/benefits-of-using-a-sleep-calculator" replace />} />
                <Route path="/best-sleep-times-based-on-90-minute-cycles" element={<Navigate to="/blog/best-sleep-times-based-on-90-minute-cycles" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
