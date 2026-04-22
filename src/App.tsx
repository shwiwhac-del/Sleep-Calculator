import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';

const StarryBackground = () => {
  // Generate static stars to avoid hydration mismatches or re-renders
  const stars = Array.from({ length: 250 }).map((_, i) => ({
    id: i,
    cx: `${Math.random() * 100}%`,
    cy: `${Math.random() * 100}%`,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    glow: Math.random() > 0.8,
  }));

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
      <div className="flex justify-center gap-8 text-sm text-white/60">
        <Link to="/blog" className="hover:text-[#00d2ff] transition-colors">Blog</Link>
        <Link to="/terms" className="hover:text-[#00d2ff] transition-colors">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-[#00d2ff] transition-colors">Privacy Policy</Link>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
