import { useState, useEffect, useRef } from 'react';
import { Info, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FAQAccordion } from '../components/FAQAccordion';
import TimePicker from '../components/TimePicker';

export default function Home() {
  const AGE_GROUPS = [
    { id: '6-12', label: '6–12 years', minCycles: 6, maxCycles: 8 },
    { id: '13-17', label: '13–17 years', minCycles: 5, maxCycles: 7 },
    { id: '18-25', label: '18–25 years', minCycles: 5, maxCycles: 6 },
    { id: '26-40', label: '26–40 years', minCycles: 5, maxCycles: 6 },
    { id: '41-60', label: '41–60 years', minCycles: 5, maxCycles: 6 },
    { id: '60+', label: '60+ years', minCycles: 4, maxCycles: 5 }
  ];

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
    localStorage.setItem('aurasleep_mode', mode);
    localStorage.setItem('aurasleep_time', time);
    localStorage.setItem('aurasleep_age', ageGroup);
  }, [mode, time, ageGroup]);

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
      <div className="flex flex-col items-center justify-center mb-8 mt-6 sm:mt-10">
        <Helmet>
          <title>Sleep Calculator: Find the Best Time to Sleep and Wake Up</title>
          <meta name="description" content="Use our free sleep calculator to find the best time to sleep, wake up refreshed, and understand your 90-minute sleep cycles." />
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
        <div className="flex flex-col items-center justify-center gap-2 mb-2 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 leading-tight font-serif">
            Calculate your sleep schedule
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Find the perfect time to sleep or wake up based on natural 90-minute cycles.
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[640px] mx-auto mb-12 relative px-4 sm:px-0">
        <div className="flex flex-col items-center bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-[24px] p-6 sm:p-8 shadow-sm relative overflow-hidden">
          
          {/* Toggle Mode */}
          <div 
            role="radiogroup" 
            aria-label="Calculation mode"
            className="flex bg-gray-50 dark:bg-[#1A1A1A] rounded-2xl p-1.5 w-full mb-8"
          >
            <button
              role="radio"
              aria-checked={mode === 'wake'}
              onClick={() => { setMode('wake'); modeRef.current = 'wake'; setResults([]); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
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
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                mode === 'bed'
                  ? 'bg-white dark:bg-[#111] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#333]/60'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent'
              }`}
            >
              I want to sleep at
            </button>
          </div>

          {/* Time Input */}
          <div className="flex flex-col items-center justify-center w-full mb-8">
            <TimePicker 
              value={time} 
              onChange={(val) => { setTime(val); timeRef.current = val; }} 
              onEnter={calculate} 
              mode={mode} 
            />
          </div>

          {/* Age group pill selection */}
          <div className="flex flex-col items-center w-full mb-8">
            <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-xs font-bold mb-3">Age Group</span>
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-[480px]">
              {AGE_GROUPS.map(g => (
                <button
                  key={g.id}
                  onClick={() => { setAgeGroup(g.id); setResults([]); }}
                  className={`py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    ageGroup === g.id
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculate}
            className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-2xl px-6 py-4 font-semibold text-lg transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none shadow-md mt-2"
          >
            Calculate Optimal Times
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div ref={resultsRef} className="w-full max-w-[640px] mx-auto flex flex-col items-center mb-12 animate-fade-in px-4">
          <div className="w-full bg-[#f0fdf4] dark:bg-[#111] border border-green-200 dark:border-green-900/30 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 font-serif text-center">
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
                    className={`flex flex-row items-center justify-between p-4 sm:p-5 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      recommended ? 'bg-[#2563EB]/5 border-[#2563EB]/20 shadow-sm' : 'bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333] shadow-sm hover:border-gray-300 dark:hover:border-[#444]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{formatTime(res.date, true)}</span>
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
      <div className="w-full max-w-5xl mx-auto text-left py-10 px-4 sm:px-6">
        <div className="flex flex-col items-center mb-10 text-center">
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

      {/* FAQ Section */}
      <div className="w-full max-w-4xl mx-auto pb-10 px-4 sm:px-6">
        <section className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#222] shadow-sm rounded-3xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 font-serif text-center">Frequently Asked Questions</h2>
          <FAQAccordion />
        </section>
      </div>
    </div>
  );
}