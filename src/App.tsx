import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Moon } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

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
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4 max-w-4xl mx-auto px-4">
    <div className="w-full max-w-2xl h-12 bg-white/5 animate-pulse rounded-full mb-8"></div>
    <div className="w-full h-64 bg-white/5 animate-pulse rounded-3xl mb-12"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      <div className="w-full h-32 bg-white/5 animate-pulse rounded-2xl"></div>
      <div className="w-full h-32 bg-white/5 animate-pulse rounded-2xl"></div>
      <div className="w-full h-32 bg-white/5 animate-pulse rounded-2xl"></div>
    </div>
  </div>
);

const StarryBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff05] via-transparent to-transparent">
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,1) 1.5px, transparent 1.5px)',
          backgroundSize: '150px 150px',
          backgroundPosition: '50px 50px',
        }}
      />
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 2px, transparent 2px)',
          backgroundSize: '250px 250px',
          backgroundPosition: '100px 100px',
        }}
      />
    </div>
  );
};

function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-white/10 bg-[#130f2e] z-20 relative flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/60 px-4 mb-3">
        <Link to="/" className="hover:text-[#00d2ff] transition-colors">Home</Link>
        <Link to="/privacy" className="hover:text-[#00d2ff] transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-[#00d2ff] transition-colors">Terms of Service</Link>
        <Link to="/contact" className="hover:text-[#00d2ff] transition-colors">Contact</Link>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d2ff] transition-colors">Sitemap</a>
      </div>
      <div className="text-white/40 text-xs">
        &copy; 2026 Sleep Calculator. All rights reserved.
      </div>
      <div className="text-white/40 text-xs mt-1">
        Built by <a href="https://shafiqbuilds.site" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00d2ff] transition-colors">shafiqbuilds</a>
      </div>
    </footer>
  );
}

function Header() {
  return (
    <header className="w-full py-4 border-b border-white/5 bg-[#130f2e] z-50 sticky top-0 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 text-white hover:text-[#00d2ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] rounded-lg">
          <Moon className="text-[#00d2ff]" size={26} strokeWidth={2} fill="#00d2ff" />
          <span className="text-xl font-extrabold tracking-tight">Sleep Calculator</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-white/70">
          <Link to="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">Home</Link>
          <Link to="/blog" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">Blog</Link>
          <Link to="/about" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">About</Link>
          <Link to="/contact" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline decoration-2 underline-offset-4">Contact</Link>
        </nav>
      </div>
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
          <main className="relative z-10 flex-grow flex flex-col items-center justify-start container mx-auto">
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

                {/* Catch-all 404 route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
