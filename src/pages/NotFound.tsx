import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Moon, Home, HelpCircle, Clock, Compass, BookOpen, Sparkles, ArrowRight, Sunrise } from 'lucide-react';
import { motion } from 'motion/react';
import { getCanonicalUrl } from '../lib/seo';
import { OpenGraphTags } from '../components/OpenGraphTags';

export default function NotFound() {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const quickLinks = [
    {
      to: "/",
      icon: Clock,
      title: "Core Sleep Calculator",
      description: "Find the absolute best times to fall asleep or wake up based on your customized 90-minute sleep cycles.",
      badge: "Popular"
    },
    {
      to: "/90-minute-sleep-calculator",
      icon: Sparkles,
      title: "90-Minute REM Guide",
      description: "Discover the science behind natural sleep intervals and how to eliminate morning grogginess completely.",
    },
    {
      to: "/bedtime-calculator-by-age",
      icon: Sunrise,
      title: "Bedtime by Age Calculator",
      description: "Personalized circadian timing recommendations tailored for toddlers, children, teens, and seniors.",
    },
    {
      to: "/shift-work-sleep-calculator-guide",
      icon: Compass,
      title: "Shift Worker rest patterns",
      description: "Schedules designed specifically for irregular routines, rotating slots, and optimized nap strategies.",
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-16 text-center relative z-10 w-full max-w-4xl mx-auto">
      <OpenGraphTags
        title="404 Page Not Found – Sleep Calculator"
        description="The requested sleep calculator guide, resource, or article could not be located."
        url={canonicalUrl}
      />
      <Helmet>
        <title>Page Rest Area | Sleep Calculator</title>
        <meta name="description" content="This page is resting. Let's direct you to our optimized Sleep Cycle Calculators." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Floating Animated Illustration */}
      <div className="relative mb-8" id="not-found-illustration">
        {/* Soft, warm ambient violet radial glow backdrops */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-3xl animate-pulse duration-[5000ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl" />

        <div className="relative flex items-center justify-center">
          {/* Main Moon Container */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative bg-white/95 backdrop-blur-md p-7 sm:p-8 rounded-[2.5rem] border border-[#7C3AED]/15 shadow-xl shadow-[#7C3AED]/5 z-10"
          >
            {/* Soft inner gold highlight circle */}
            <div className="absolute top-3 right-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/20" />
              </motion.div>
            </div>
            
            <Moon className="w-16 h-16 sm:w-20 sm:h-20 text-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]" />
          </motion.div>

          {/* Little Floating Celestial Accent Icons */}
          <motion.div
            animate={{ 
              y: [-6, 6, -6],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -top-4 -left-6 z-20 bg-white/95 rounded-2xl p-2.5 border border-[#7C3AED]/10 shadow-md"
          >
            <Clock className="w-5 h-5 text-[#7C3AED]/70" />
          </motion.div>

          <motion.div
            animate={{ 
              y: [4, -4, 4],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-2 -right-6 z-20 bg-white/95 rounded-2xl p-2.5 border border-[#D4AF37]/20 shadow-md"
          >
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>
        </div>
      </div>

      {/* Main Announcement Headers */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4 max-w-xl mx-auto"
        id="not-found-text"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7C3AED]/8 border border-[#7C3AED]/15">
          <HelpCircle className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] uppercase">
            Error 404 • Sleep interruption
          </span>
        </div>

        <h1 className="text-3xl sm:text-4.5xl font-serif font-extrabold tracking-tight text-[#111827] leading-tight">
          This sleep path was not found
        </h1>
        
        <p className="text-sm sm:text-base text-[#374151] leading-relaxed max-w-lg mx-auto">
          The requested page appears to be resting or has drifted out of your circadian rhythm. Don't worry, waking up feeling fully recharged is just a quick tap away.
        </p>

        <p className="text-xs sm:text-sm text-[#7C3AED] font-semibold font-mono tracking-wide pb-1">
          Let’s realign your sleep cycle using our top tools below:
        </p>
      </motion.div>

      {/* Primary Call to Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 sm:px-0 max-w-md mx-auto"
        id="not-found-actions"
      >
        <Link 
          to="/" 
          className="w-full inline-flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-md shadow-[#7C3AED]/15 active:scale-[0.98] cursor-pointer text-sm sm:text-base uppercase tracking-wider"
          id="not-found-home-btn"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-100" />
          Calculate My Cycle
        </Link>
      </motion.div>

      {/* Quick Navigation grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 sm:mt-16 w-full text-left"
        id="not-found-quicklinks"
      >
        <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start border-b border-gray-200 pb-3">
          <Compass className="w-5 h-5 text-[#7C3AED]" />
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#374151]">
            Alternative Sleep Calculators & Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={index}
                to={link.to}
                className="group relative bg-white/70 hover:bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-[#7C3AED]/30 transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl duration-300" />
                
                <div className="bg-[#7C3AED]/5 group-hover:bg-[#7C3AED]/10 p-3 rounded-xl transition-colors">
                  <LinkIcon className="w-5 h-5 text-[#7C3AED]" />
                </div>

                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold text-gray-900 group-hover:text-[#7C3AED] transition-colors leading-snug">
                      {link.title}
                    </h3>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 font-bold rounded-full bg-[#D4AF37]/10 text-[#7C3AED] border border-[#D4AF37]/20 uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-xs text-gray-500 leading-relaxed font-sans line-clamp-2">
                    {link.description}
                  </p>
                </div>

                <div className="self-center">
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
