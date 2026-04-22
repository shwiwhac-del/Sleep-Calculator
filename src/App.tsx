import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Moon } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));

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
        <Link to="/blog" className="hover:text-[#00d2ff] transition-colors">Blog</Link>
        <Link to="/terms" className="hover:text-[#00d2ff] transition-colors">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-[#00d2ff] transition-colors">Privacy Policy</Link>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d2ff] transition-colors">Sitemap</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col text-white font-sans relative overflow-x-hidden bg-gradient-to-b from-[#1c1445] via-[#15103a] to-[#0d0a26]">
        <StarryBackground />
        <main className="relative z-10 flex-grow flex flex-col items-center justify-start p-4 sm:p-8">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
