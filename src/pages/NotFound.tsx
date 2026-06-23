import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Moon, Home, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { getCanonicalUrl } from '../lib/seo';
import { OpenGraphTags } from '../components/OpenGraphTags';

export default function NotFound() {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-2 sm:px-4 py-12 text-center relative z-10 w-full max-w-xl mx-auto">
      <OpenGraphTags
        title="404 Page Not Found – Sleep Calculator"
        description="The requested sleep calculator guide, resource, or article could not be located."
        url={canonicalUrl}
      />
      <Helmet>
        <title>Page Not Found | Sleep Calculator</title>
        <meta name="description" content="This page does not exist. Let's redirect you back to our Sleep Cycle Calculator." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Floating Animated Illustration */}
      <div className="relative mb-8 text-center" id="not-found-illustration">
        {/* Soft, warm ambient violet radial glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#7C3AED]/10 rounded-full blur-3xl animate-pulse duration-[4000ms]" />

        <div className="relative flex items-center justify-center">
          {/* Main Moon Container */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 rounded-full border border-[#7C3AED]/15 shadow-xl shadow-[#7C3AED]/5 z-10"
          >
            <Moon className="w-14 h-14 sm:w-16 sm:h-16 text-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]" />
          </motion.div>
        </div>
      </div>

      {/* Main Announcement Headers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 max-w-md mx-auto"
        id="not-found-text"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/8 border border-[#7C3AED]/15">
          <HelpCircle className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] uppercase">
            Error 404
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
          Page Not Found
        </h1>
        
        <p className="text-sm sm:text-base text-[#374151] dark:text-gray-300 leading-relaxed">
          The requested page could not be located. It might have been moved, renamed, or temporarily rested.
        </p>

        <p className="text-xs sm:text-sm text-[#7C3AED] dark:text-violet-400 font-semibold font-mono tracking-wide pb-1">
          Let’s get you back to calculate your ideal sleep cycle!
        </p>
      </motion.div>

      {/* Action CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 w-full max-w-xs mx-auto"
        id="not-found-actions"
      >
        <Link 
          to="/" 
          className="w-full inline-flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-md shadow-[#7C3AED]/15 active:scale-[0.98] cursor-pointer text-sm sm:text-base uppercase tracking-wider"
          id="not-found-home-btn"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-100" />
          Back to Home Page
        </Link>
      </motion.div>
    </div>
  );
}
