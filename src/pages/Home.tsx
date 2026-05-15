import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Moon, Sun } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FAQAccordion } from '../components/FAQAccordion';
import TimePicker from '../components/TimePicker';
import { FeedbackModal } from '../components/FeedbackModal';

export default function Home() {
  const AGE_GROUPS = [
    { id: '6-12', label: '6–12 years', minCycles: 6, maxCycles: 8 },
    { id: '13-17', label: '13–17 years', minCycles: 5, maxCycles: 7 },
    { id: '18-25', label: '18–25 years', minCycles: 5, maxCycles: 6 },
    { id: '26-40', label: '26–40 years', minCycles: 5, maxCycles: 6 },
    { id: '41-60', label: '41–60 years', minCycles: 5, maxCycles: 6 },
    { id: '60+', label: '60+ years', minCycles: 4, maxCycles: 5 }
  ];

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isNearBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 150;
      
      if (scrollY > 150 && !isNearBottom) {
        setShowFeedbackButton(true);
      } else {
        setShowFeedbackButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [rememberPreferences, setRememberPreferences] = useState<boolean>(() => {
    return localStorage.getItem('aurasleep_remember') === 'true';
  });

  const [mode, setMode] = useState<'wake' | 'bed'>(() => {
    return (localStorage.getItem('aurasleep_mode') as 'wake' | 'bed') || 'wake';
  });
  const [time, setTime] = useState<string>(() => {
    const savedTime = localStorage.getItem('aurasleep_time');
    if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) return savedTime;

    const now = new Date();
    const ms = 1000 * 60 * 15;
    const roundedDate = new Date(Math.round(now.getTime() / ms) * ms);
    const hours = String(roundedDate.getHours()).padStart(2, '0');
    const mins = String(roundedDate.getMinutes()).padStart(2, '0');
    return `${hours}:${mins}`;
  });
  const [ageGroup, setAgeGroup] = useState<string>(() => {
    const saved = localStorage.getItem('aurasleep_age');
    return (saved && AGE_GROUPS.some(g => g.id === saved)) ? saved : '18-25';
  });
  const [results, setResults] = useState<{ date: Date; cycles: number }[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const timeRef = useRef(time);
  const modeRef = useRef(mode);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const savedTime = localStorage.getItem('aurasleep_time');
    if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) {
      calculateForTime(time, mode);
    }
  }, []);

  useEffect(() => {
    if (rememberPreferences) {
      localStorage.setItem('aurasleep_mode', mode);
      localStorage.setItem('aurasleep_time', time);
      localStorage.setItem('aurasleep_age', ageGroup);
      localStorage.setItem('aurasleep_remember', 'true');
    } else {
      localStorage.removeItem('aurasleep_mode');
      localStorage.removeItem('aurasleep_time');
      localStorage.removeItem('aurasleep_age');
      localStorage.setItem('aurasleep_remember', 'false');
    }
  }, [mode, time, ageGroup, rememberPreferences]);

  const timeToDate = (timeStr: string, currentMode: 'wake' | 'bed' = mode) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    
    if (currentMode === 'wake' && d.getTime() < now.getTime()) {
      d.setDate(d.getDate() + 1);
    } else if (currentMode === 'bed') {
      if (now.getTime() - d.getTime() > 12 * 60 * 60 * 1000) {
        d.setDate(d.getDate() + 1);
      } else if (d.getTime() < now.getTime() && hours < 12 && now.getHours() >= 12) {
        d.setDate(d.getDate() + 1);
      }
    }
    return d;
  };

  const calculateForTime = (timeStr: string, currentMode: 'wake' | 'bed') => {
    if (!timeStr) return;
    
    const baseDate = timeToDate(timeStr, currentMode);
    
    let cyclesToGenerate = [6, 5, 4, 3];
    const ageConfig = AGE_GROUPS.find(g => g.id === ageGroup);
    if (ageConfig) {
      const maxC = ageConfig.maxCycles;
      cyclesToGenerate = [];
      for (let i = maxC; i >= Math.max(3, ageConfig.minCycles - 2); i--) {
        cyclesToGenerate.push(i);
      }
    }

    const calculatedResults = cyclesToGenerate.map(cycle => {
      if (currentMode === 'wake') {
        const totalMinutesToSubtract = (cycle * 90) + 15;
        return {
          date: new Date(baseDate.getTime() - totalMinutesToSubtract * 60000),
          cycles: cycle
        };
      } else {
        const totalMinutesToAdd = (cycle * 90) + 15;
        return {
          date: new Date(baseDate.getTime() + totalMinutesToAdd * 60000),
          cycles: cycle
        };
      }
    });

    setResults(calculatedResults);
  };

  const calculate = () => {
    setResults([]);
    setTimeout(() => {
      calculateForTime(timeRef.current, modeRef.current);
      setTimeout(() => {
        if (resultsRef.current) {
          const rect = resultsRef.current.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
          if (!isVisible) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
    }, 50);
  };

  const formatTime = (date: Date, showDayIndicator: boolean = false) => {
    const timeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);

    if (showDayIndicator) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      
      const diffDays = Math.round((targetDay - today) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return `${timeString} (+1d)`;
      if (diffDays === -1) return `${timeString} (-1d)`;
      if (diffDays > 1) return `${timeString} (+${diffDays}d)`;
    }
    
    return timeString;
  };

  const isRecommended = (cycle: number) => {
    const config = AGE_GROUPS.find(g => g.id === ageGroup);
    if (!config) return cycle === 6 || cycle === 5;
    return cycle >= config.minCycles && cycle <= config.maxCycles;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center mb-6 mt-2 sm:mt-4">
        <Helmet>
          <title>Sleep Calculator: Exact Bedtime & Wake Up Time Calculator</title>
          <meta name="description" content="Use our free sleep calculator to find the exact bedtime and wake up time based on 90-minute sleep cycles. Calculate your REM sleep for a healthy sleep cycle." />
          <meta name="keywords" content="sleep calculator, bedtime calculator, sleep cycle calculator, sleep time calculator, wake up calculator, best time to sleep, healthy sleep calculator" />
          <link rel="canonical" href="https://sleepcalculater.online/" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/"
                },
                {
                  "@type": "Organization",
                  "name": "Sleep Calculator",
                  "url": "https://sleepcalculater.online/",
                  "logo": "https://sleepcalculater.online/icon.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@sleepcalculater.online",
                    "contactType": "customer support"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Sleep Cycle Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Any",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                }
              ]
            })}
          </script>
        </Helmet>
        <div className="flex flex-col items-center justify-center gap-2 mb-2 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">
            Free Sleep Cycle Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Calculate your exact bedtime and wake up time using natural 90-minute REM sleep cycles. 
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[580px] mx-auto mb-10 relative px-4 sm:px-0">
        <div onContextMenu={(e) => e.preventDefault()} className="flex flex-col items-center bg-white dark:bg-[#111827]/80 dark:backdrop-blur-md border border-gray-200 dark:border-[#1e293b] rounded-[24px] p-6 sm:p-8 shadow-md dark:shadow-none relative overflow-hidden">
          
          {/* Toggle Mode */}
          <div 
            role="radiogroup" 
            aria-label="Calculation mode"
            className="flex bg-gray-50 dark:bg-[#1e293b] rounded-2xl p-1.5 w-full mb-6"
          >
            <button
              role="radio"
              aria-checked={mode === 'wake'}
              onClick={() => { setMode('wake'); modeRef.current = 'wake'; setResults([]); }}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === 'wake'
                  ? 'bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent'
              }`}
            >
              I want to wake up at
            </button>
            <button
              role="radio"
              aria-checked={mode === 'bed'}
              onClick={() => { setMode('bed'); modeRef.current = 'bed'; setResults([]); }}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === 'bed'
                  ? 'bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent'
              }`}
            >
              I want to sleep at
            </button>
          </div>

          {/* Time Input */}
          <div className="flex flex-col items-center justify-center w-full mb-6">
            <TimePicker 
              value={time} 
              onChange={(val) => { setTime(val); timeRef.current = val; }} 
              onEnter={calculate} 
              mode={mode} 
            />
          </div>

          {/* Age group pill selection */}
          <div className="flex flex-col items-center w-full mb-6">
            <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-xs font-bold mb-3">Age Group</span>
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-[480px]">
              {AGE_GROUPS.map(g => (
                <button
                  key={g.id}
                  onClick={() => { setAgeGroup(g.id); setResults([]); }}
                  className={`py-1.5 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                    ageGroup === g.id
                      ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-sm'
                      : 'bg-transparent border-gray-200 dark:border-slate-700/60 text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-slate-800/50 dark:hover:text-gray-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2">
              <label className="relative inline-flex flex-row items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={rememberPreferences}
                  onChange={(e) => setRememberPreferences(e.target.checked)}
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2563EB]/20 dark:peer-focus:ring-[#2563EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#2563EB]"></div>
                <span className="ml-2 mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">Remember my preferences</span>
              </label>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="w-full flex justify-center mt-2">
            <button
              onClick={calculate}
              className="w-full max-w-[280px] bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-2xl px-6 py-3 font-semibold text-base transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none shadow-md"
            >
              Calculate Optimal Times
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            ref={resultsRef} 
            className="w-full max-w-[700px] mx-auto flex flex-col items-center mb-8 px-4"
          >
            <div className="w-full bg-white dark:bg-[#0f172a] border border-gray-200/80 dark:border-[#1e293b] rounded-[28px] p-6 sm:p-8 flex flex-col shadow-md dark:shadow-none relative overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-12 -right-12 text-[#2563EB]/5 w-40 h-40 pointer-events-none"
              >
                {mode === 'wake' ? <Moon className="w-full h-full" /> : <Sun className="w-full h-full" />}
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {mode === 'wake' ? (
                    <Moon className="w-5 h-5 text-[#2563EB]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#2563EB]" />
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 font-serif text-center">
                    Your Ideal Sleep Times
                  </h2>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-center text-sm sm:text-base px-2">
                  {mode === 'wake' ? 'To wake up refreshed, try to fall asleep at one of these times:' : 'To get a full night\'s rest, set your alarm for one of these times:'}
                </p>

                <div className="w-full flex flex-col gap-3 sm:gap-4 select-text" onContextMenu={(e) => e.stopPropagation()}>
                  <AnimatePresence>
                    {results.map((res, index) => {
                      const recommended = isRecommended(res.cycles);
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (index * 0.08), ease: "easeOut" }}
                          className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                            recommended 
                              ? 'bg-gradient-to-r from-blue-50/80 to-blue-50/30 dark:from-blue-900/10 dark:to-transparent border-blue-200/80 dark:border-blue-800/40 relative overflow-hidden' 
                              : 'bg-gray-50/50 dark:bg-[#111827] border-gray-200/60 dark:border-[#1e293b] hover:bg-white dark:hover:bg-slate-800/80 hover:border-gray-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {recommended && (
                            <motion.div 
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-12"
                            />
                          )}
                          <div className="flex flex-col relative z-10">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                              {formatTime(res.date, true)}
                              {recommended && <Sparkles className="w-4 h-4 text-[#2563EB] sm:hidden" strokeWidth={2.5} />}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                              {res.cycles} cycles &bull; {res.cycles * 1.5} hours
                            </span>
                          </div>
                          {recommended && (
                            <div className="flex-shrink-0 ml-3 relative z-10 flex items-center">
                              <span className="inline-flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 px-2 sm:px-3 py-1 rounded-full shadow-sm">
                                Recommended
                              </span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
                
                <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm text-center mt-8 px-4 leading-relaxed">
                  We've added 15 minutes to these times to account for how long it takes to fall asleep.
                </p>

                <button
                  onClick={() => {
                    setResults([]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-6 w-full py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm sm:text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-[#0f172a] flex items-center justify-center gap-2 group"
                >
                  <motion.div whileHover={{ rotate: -180 }} transition={{ duration: 0.4 }}>
                    <svg className="w-5 h-5 text-current opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </motion.div>
                  Recalculate Options
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleep Guides & Tools Section */}
      <div className="w-full max-w-5xl mx-auto text-left py-8 px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Tools & Guides</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl text-sm sm:text-base">Master your sleep with our collection of science-backed calculators and guides.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Smart Bedtime Calculator</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">Calculate exact sleep cycles to wake up feeling completely refreshed and energized.</p>
            <Link to="/article/smart-bedtime-calculator" className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Use Feature
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Best Time to Sleep</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">Discover the optimal window for hitting the pillow according to sleep scientists.</p>
            <Link to="/article/best-sleep-time" className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Read Guide
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Power Nap Optimizer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">Learn the exact length a nap should be to wake up energized instead of groggy.</p>
            <Link to="/article/power-nap-optimizer" className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Read Guide
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Deep Sleep Fixer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">Waking up in deep sleep is the #1 cause of morning grogginess. Fix it today.</p>
            <Link to="/article/deep-sleep-fixer" className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Use Guide
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center flex justify-center">
          <Link to="/blog" className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#1D4ED8] transition-colors shadow-sm focus-visible:outline-none">
            View All Sleep Guides
          </Link>
        </div>
      </div>

      {/* SEO Optimized Content Block with Interlinks */}
      <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6">
        <div onContextMenu={(e) => e.stopPropagation()} className="prose dark:prose-invert prose-sm sm:prose-base text-gray-600 dark:text-gray-300 mx-auto select-text">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Why Use Our Free Sleep Time Calculator?</h2>
          <p className="mb-4">
            Understanding your body's natural <Link to="/blog/sleep-cycle" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">90-minute sleep cycle</Link> is the key to waking up feeling energized. By using our <strong>sleep cycle calculator</strong> to time your alarms to sync with the end of a REM cycle, you avoid sleep inertia and start your day without grogginess.
          </p>
          <p className="mb-4">
            Whether you are struggling with a disrupted internal clock and need to <Link to="/blog/fix-sleep-schedule" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">fix your sleep schedule</Link>, or wondering about the <Link to="/article/best-sleep-time" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">best time to sleep</Link>, our <strong>bedtime calculator</strong> provides precise calculations. We automatically factor in the 15 minutes it usually takes to fall asleep. If you only have time for a quick rest during the day, check out our <strong>nap calculator</strong> guide on <Link to="/article/power-nap" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">how long a power nap should be</Link>.
          </p>
          <p className="mb-4">
            Age also plays a massive role in your rest requirements. Learn more about <Link to="/blog/sleep-age" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">how much sleep you need by age</Link>, and why you might still <Link to="/article/deep-sleep-fixer" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">feel tired after 8 hours of sleep</Link>. Keep your screen exposure in check to prevent <Link to="/blog/blue-light-sleep" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">blue light from disrupting your healthy sleep cycle</Link>.
          </p>
          <p className="mb-4">
            If you struggle with waking up frequently, you can read our guide on <Link to="/blog/why-you-wake-up-in-the-middle-of-the-night" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">why you wake up in the middle of the night</Link>, and build <Link to="/blog/smart-sleep-habits-better-energy" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">smart sleep habits for better energy</Link> to boost your daily performance naturally.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6">
        <section className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#1e293b] shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none rounded-[24px] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-serif text-center">FAQs</h2>
          <FAQAccordion />
        </section>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-3 px-4 sm:px-5 flex items-center justify-center gap-2 font-semibold group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/20 ${showFeedbackButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Send Feedback"
      >
        <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
}