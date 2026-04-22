import { motion } from 'framer-motion';
import { Network, Home, BookOpen, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sitemap() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d2ff] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none rounded-lg px-2 py-1 -ml-2">
          Back to Calculator
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center mb-12 text-center"
      >
        <Network className="text-[#00d2ff] mb-4" size={48} />
        <h1 className="text-4xl font-bold tracking-wide mb-4">Sitemap</h1>
        <p className="text-white/70 text-lg">
          Navigate through all the pages available on our Sleep Calculator website.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#130f2e]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-lg"
      >
        <ul className="space-y-6">
          <li>
            <Link to="/" className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none">
              <div className="bg-[#00d2ff]/10 p-3 rounded-lg group-hover:bg-[#00d2ff]/20 transition-colors">
                <Home className="text-[#00d2ff]" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-[#00d2ff] transition-colors">Sleep Calculator (Home)</h2>
                <p className="text-white/60 text-sm">Calculate your optimal wake-up and bedtime based on sleep cycles.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/blog" className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none">
              <div className="bg-[#fcd34d]/10 p-3 rounded-lg group-hover:bg-[#fcd34d]/20 transition-colors">
                <BookOpen className="text-[#fcd34d]" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-[#fcd34d] transition-colors">Sleep Better Blog</h2>
                <p className="text-white/60 text-sm">Read articles about sleep science, REM cycles, and tips for better rest.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none">
              <div className="bg-[#40c9ff]/10 p-3 rounded-lg group-hover:bg-[#40c9ff]/20 transition-colors">
                <Shield className="text-[#40c9ff]" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-[#40c9ff] transition-colors">Privacy Policy</h2>
                <p className="text-white/60 text-sm">Learn how we handle and protect your information.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/terms" className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none">
              <div className="bg-[#a855f7]/10 p-3 rounded-lg group-hover:bg-[#a855f7]/20 transition-colors">
                <FileText className="text-[#a855f7]" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-[#a855f7] transition-colors">Terms of Service</h2>
                <p className="text-white/60 text-sm">Review the rules, terms, and guidelines for using our application.</p>
              </div>
            </Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
