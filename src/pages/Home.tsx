import { useState, useEffect, useRef } from 'react';
import { Info, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FAQAccordion } from '../components/FAQAccordion';

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
      calculateForTime(time, mode);
      if (resultsRef.current && window.innerWidth < 640) {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
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
      <div className="flex flex-col items-center justify-center mb-10 mt-6 sm:mt-12">
        <Helmet>
          <title>Sleep Calculator: Find the Best Time to Sleep and Wake Up</title>
          <meta name="description" content="Use our free sleep calculator to find the best time to sleep, wake up refreshed, and understand your 90-minute sleep cycles." />
          {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/" />}
        </Helmet>
        <div className="flex flex-col items-center justify-center gap-1 mb-4 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
            Calculate your sleep schedule
          </h1>
          <p className="text-sm sm:text-lg text-white/60 mt-2">
            Find the perfect time to sleep or wake up based on natural 90-minute cycles.
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[600px] mx-auto mb-16 flex flex-col items-center bg-[#130f2e] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {/* Toggle Mode */}
        <div 
          role="radiogroup" 
          aria-label="Calculation mode"
          className="flex bg-black/40 rounded-xl p-1 border border-white/5 w-full mb-6"
        >
          <button
            role="radio"
            aria-checked={mode === 'wake'}
            onClick={() => { setMode('wake'); setResults([]); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'wake'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            I want to wake up at
          </button>
          <button
            role="radio"
            aria-checked={mode === 'bed'}
            onClick={() => { setMode('bed'); setResults([]); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              mode === 'bed'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            I want to sleep at
          </button>
        </div>

        {/* Time Input */}
        <div className="flex flex-col items-center w-full mb-8">
          <input
            id="time-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                calculate();
              }
            }}
            aria-label={mode === 'wake' ? "Select wake up time" : "Select go to sleep time"}
            className="bg-transparent border-none px-2 py-4 text-[40px] leading-tight font-bold text-white focus:outline-none focus-visible:ring-0 cursor-pointer appearance-none text-center tracking-wider"
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Age group minimal select */}
        <div className="flex items-center gap-3 w-full mb-8 justify-center">
          <span className="text-white/50 text-[14px]">Age:</span>
          <select 
            value={ageGroup}
            onChange={(e) => { setAgeGroup(e.target.value); setResults([]); }}
            className="bg-black/30 border border-white/10 text-white text-[14px] rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#00d2ff]"
          >
            {AGE_GROUPS.map(g => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full bg-[#00d2ff] text-black hover:bg-white rounded-xl px-6 py-4 font-bold text-[16px] transition-all hover:-translate-y-0.5 focus-visible:outline-none shadow-[0_4px_20px_rgba(0,210,255,0.2)]"
        >
          Calculate Optimal Times
        </button>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div ref={resultsRef} className="w-full max-w-2xl mx-auto flex flex-col items-center mb-16 animate-fade-in px-4">
          <p className="text-white/70 mb-4 text-center">
            {mode === 'wake' ? 'You should try to fall asleep at one of these times:' : 'You should set your alarm for one of these times:'}
          </p>

          <div className="w-full flex flex-col gap-3">
            {results.map((res, index) => {
              const recommended = isRecommended(res.cycles);
              return (
                <div 
                  key={index}
                  className={`flex flex-row items-center justify-between p-4 sm:p-5 rounded-2xl border transition-colors ${
                    recommended ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30 shadow-sm' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-bold text-white">{formatTime(res.date, true)}</span>
                    </div>
                    <div className="text-white/50 text-sm mt-1">
                      {res.cycles} cycles &bull; {res.cycles * 1.5} hours
                    </div>
                  </div>
                  {recommended && (
                    <div className="text-xs font-semibold text-[#00d2ff] bg-[#00d2ff]/10 px-3 py-1 rounded-full border border-[#00d2ff]/20">
                      Recommended
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <p className="text-white/40 text-xs text-center mt-6 max-w-md">
            Built-in 15 minutes is factored in to allow you time to fall asleep.
          </p>
        </div>
      )}

      {/* Articles Section */}
      <div className="w-full max-w-4xl mx-auto text-left py-12 px-4 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is a Sleep Calculator?</h2>
          <p className="text-white/70 mb-4 max-w-none text-base sm:text-lg leading-relaxed">
            A sleep calculator ensures you wake up at the end of a 90-minute sleep cycle. Waking up in the middle of a sleep cycle (like deep sleep) causes sleep inertia, leaving you feeling groggy and tired regardless of how many hours you actually slept. By mapping out your sleep in 90-minute intervals, you can wake up naturally refreshed.
          </p>
          <Link to="/guide/sleep-calculator" className="text-[#00d2ff] text-base font-medium hover:underline inline-flex items-center gap-2">Read the full guide <BookOpen size={16}/></Link>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Do I Feel Tired After 8 Hours of Sleep?</h2>
          <ul className="text-white/70 space-y-3 mb-4 list-disc pl-5 text-base sm:text-lg leading-relaxed">
            <li><strong>Mid-Cycle Waking:</strong> Waking up in deep sleep is the #1 cause of morning grogginess.</li>
            <li><strong>Poor Quality Rest:</strong> Alcohol, caffeine, or large meals before bed can prevent deep REM sleep.</li>
            <li><strong>Blue Light:</strong> Staring at screens halts melatonin production.</li>
          </ul>
          <Link to="/guide/fix-your-sleep" className="text-[#00d2ff] text-base font-medium hover:underline inline-flex items-center gap-2">Discover how to fix your sleep <Info size={16} /></Link>
        </section>

        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-white">Latest from Our Blog</h2>
            <Link to="/blog" className="text-[#00d2ff] text-sm font-medium hover:underline inline-flex items-center gap-2">View all <BookOpen size={16}/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/blog/best-sleep-time" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">The Best Time to Sleep for Better Health</h3>
              <p className="text-white/60 text-sm">Discover the optimal window for hitting the pillow according to sleep scientists and natural circadian rhythms.</p>
            </Link>
            <Link to="/blog/power-nap" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">The Perfect Power Nap Guide</h3>
              <p className="text-white/60 text-sm">Learn the exact length a nap should be to wake up energized instead of groggy. Hint: it is shorter than you think.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <FAQAccordion />
        </section>
      </div>

    </div>
  );
}
