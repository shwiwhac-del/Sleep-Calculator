import { useState, useEffect, useRef } from 'react';
import { Info, BookOpen, MessageSquare } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center mb-6 mt-4 sm:mt-6">
        <Helmet>
          <title>Sleep Calculator: Find the Best Time to Sleep and Wake Up</title>
          <meta name="description" content="Use our free sleep calculator to find the best time to sleep, wake up refreshed, and understand your 90-minute sleep cycles." />
          <meta name="keywords" content="sleep calculator, sleep cycle calculator, wake up time, bedtime calculator, REM sleep, 90 minute sleep cycle" />
          {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/" />}
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
                  "@type": "SoftwareApplication",
                  "name": "Sleep Calculator",
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 leading-tight font-serif">
            Calculate your sleep schedule
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Find the perfect time to sleep or wake up based on natural 90-minute cycles.
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[580px] mx-auto mb-8 relative px-4 sm:px-0">
        <div className="flex flex-col items-center bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-[24px] p-5 sm:p-6 shadow-sm relative overflow-hidden">
          
          {/* Toggle Mode */}
          <div 
            role="radiogroup" 
            aria-label="Calculation mode"
            className="flex bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl p-1.5 w-full mb-6"
          >
            <button
              role="radio"
              aria-checked={mode === 'wake'}
              onClick={() => { setMode('wake'); modeRef.current = 'wake'; setResults([]); }}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === 'wake'
                  ? 'bg-white dark:bg-[#111] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#333]/60'
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
                  ? 'bg-white dark:bg-[#111] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#333]/60'
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
                  className={`py-1.5 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    ageGroup === g.id
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:text-white'
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
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2563EB]/20 dark:peer-focus:ring-[#2563EB]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#2563EB]"></div>
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
      {results.length > 0 && (
        <div ref={resultsRef} className="w-full max-w-[580px] mx-auto flex flex-col items-center mb-8 animate-fade-in px-4">
          <div className="w-full bg-[#f0fdf4] dark:bg-[#111] border border-green-200 dark:border-green-900/30 rounded-3xl p-5 sm:p-6 flex flex-col items-center shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 font-serif text-center">
              Your Ideal Sleep Times
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center text-sm sm:text-base">
              {mode === 'wake' ? 'To wake up refreshed, try to fall asleep at one of these times:' : 'To get a full night\'s rest, set your alarm for one of these times:'}
            </p>

            <div className="w-full flex flex-col gap-3">
              {results.map((res, index) => {
                const recommended = isRecommended(res.cycles);
                return (
                  <div 
                    key={index}
                    className={`flex flex-row items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      recommended ? 'bg-[#2563EB]/5 border-[#2563EB]/20 shadow-sm' : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333] shadow-sm hover:border-gray-300 dark:hover:border-[#444]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{formatTime(res.date, true)}</span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 font-medium">
                        {res.cycles} cycles &bull; {res.cycles * 1.5} hours
                      </div>
                    </div>
                    {recommended && (
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#2563EB] bg-[#2563EB]/10 px-3 py-1.5 rounded-full">
                        Recommended
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center mt-6 max-w-sm">
              We've added 15 minutes to these times to account for how long it takes the average person to fall asleep.
            </p>

            <button
              onClick={() => {
                setResults([]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 px-6 py-2.5 rounded-full border border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] text-sm font-semibold transition-colors focus-visible:outline-none"
            >
              Recalculate
            </button>
          </div>
        </div>
      )}

      {/* Sleep Guides & Tools Section */}
      <div className="w-full max-w-5xl mx-auto text-left py-8 px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 font-serif">Tools & Guides</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl text-sm sm:text-base">Master your sleep with our collection of science-backed calculators and guides.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-serif">Best Time to Sleep</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-grow">Discover the optimal window for hitting the pillow according to sleep scientists.</p>
            <Link to="/article/best-sleep-time" className="bg-[#F8FAFC] dark:bg-[#1A1A1A] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Read Guide
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-serif">Power Nap Calculator</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-grow">Learn the exact length a nap should be to wake up energized instead of groggy.</p>
            <Link to="/article/power-nap" className="bg-[#F8FAFC] dark:bg-[#1A1A1A] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Read Guide
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-serif">Deep Sleep Fixer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-grow">Waking up in deep sleep is the #1 cause of morning grogginess. Fix it today.</p>
            <Link to="/guide/fix-your-sleep" className="bg-[#F8FAFC] dark:bg-[#1A1A1A] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm">
              Use Guide
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Optimized Content Block with Interlinks */}
      <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6">
        <div className="prose dark:prose-invert prose-sm sm:prose-base text-gray-600 dark:text-gray-300 mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Why Use Our Free Sleep Calculator?</h2>
          <p className="mb-4">
            Understanding your body's natural <Link to="/blog/sleep-cycle" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">90-minute sleep cycle</Link> is the key to waking up feeling energized. By timing your alarms to sync with the end of a REM cycle, you avoid sleep inertia and start your day without grogginess.
          </p>
          <p className="mb-4">
            Whether you are struggling with a disrupted internal clock and need to <Link to="/blog/fix-sleep-schedule" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">fix your sleep schedule</Link>, or wondering about the <Link to="/article/best-sleep-time" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">best time to sleep</Link>, our tool provides precise calculations. We take into account the 15 minutes it usually takes to fall asleep. If you only have time for a quick rest during the day, check out our guide on <Link to="/article/power-nap" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">how long a power nap should be</Link>.
          </p>
          <p className="mb-4">
            Age also plays a massive role in your rest requirements. Learn more about <Link to="/blog/sleep-age" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">how much sleep you need by age</Link>, and why you might still <Link to="/blog/tired" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">feel tired after 8 hours of sleep</Link>. Keep your screen exposure in check to prevent <Link to="/blog/blue-light-sleep" className="text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">blue light from disrupting your circadian rhythm</Link>.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl mx-auto pb-8 px-4 sm:px-6">
        <section className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#222] shadow-sm rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 font-serif text-center">FAQs</h2>
          <FAQAccordion />
        </section>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-3 px-5 flex items-center justify-center gap-2 font-semibold group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/50"
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