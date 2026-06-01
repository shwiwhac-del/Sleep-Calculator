import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Moon, Home, ArrowLeft, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center relative z-10 w-full max-w-2xl mx-auto">
      <Helmet>
        <title>The page does not exist | Sleep Calculator</title>
        <meta name="description" content="This page does not exist. Back to Sleep Calculator." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Floating Glowing Moon / Celestial Icon */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative mb-8 sm:mb-10"
        id="not-found-illustration"
      >
        {/* Glowing planetary backdrop glow */}
        <div className="absolute inset-0 bg-[#3b82f6]/20 rounded-full blur-2xl scale-[1.8] animate-pulse duration-4000" />
        
        <div className="relative flex items-center justify-center bg-slate-900/60 p-6 rounded-full border border-white/10 shadow-xl shadow-blue-500/5">
          <Moon className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-400 drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]" />
        </div>
      </motion.div>

      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4 max-w-md"
        id="not-found-text"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-sans uppercase">
          The page does not exist
        </h1>
        
        <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans px-2">
          It looks like you've wandered off the track or this sleep cycle route has drifted into deep space. The link you entered might be broken, or this specific page has been removed.
        </p>

        <p className="text-xs sm:text-sm text-indigo-300 font-medium font-mono pb-2">
          Let’s get you back to calculate your ideal sleep cycle!
        </p>
      </motion.div>

      {/* Action CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 sm:px-0"
        id="not-found-actions"
      >
        <Link 
          to="/" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-650 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/10 active:scale-[0.98] cursor-pointer text-sm sm:text-base uppercase tracking-wider"
          id="not-found-home-btn"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-200" />
          Back to Home Page
        </Link>

        <Link 
          to="/about" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/40 hover:bg-slate-900/60 text-slate-300 hover:text-white font-semibold py-3.5 px-8 rounded-2xl transition-all duration-300 border border-white/5 hover:border-white/15 cursor-pointer text-sm sm:text-base"
          id="not-found-guides-btn"
        >
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
          Read Sleep Guides
        </Link>
      </motion.div>
    </div>
  );
}
