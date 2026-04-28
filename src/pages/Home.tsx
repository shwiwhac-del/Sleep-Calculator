import { useState, useEffect } from 'react';
import { Moon, Check, Bed, Bell, Share2, Clock, Info, HelpCircle, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FAQAccordion } from '../components/FAQAccordion';

export default function Home() {
  const [mode, setMode] = useState<'wake' | 'bed'>(() => {
    return (localStorage.getItem('aurasleep_mode') as 'wake' | 'bed') || 'wake';
  });
  const [time, setTime] = useState<string>(() => {
    const savedTime = localStorage.getItem('aurasleep_time');
    if (savedTime) return savedTime;

    // Calculate current time rounded to nearest 15 minutes
    const now = new Date();
    const ms = 1000 * 60 * 15; // 15 minutes in milliseconds
    const roundedDate = new Date(Math.round(now.getTime() / ms) * ms);
    const hours = String(roundedDate.getHours()).padStart(2, '0');
    const mins = String(roundedDate.getMinutes()).padStart(2, '0');
    return `${hours}:${mins}`;
  });
  const [ageGroup, setAgeGroup] = useState<string>(() => localStorage.getItem('aurasleep_age') || '');
  const [results, setResults] = useState<{ date: Date; cycles: number }[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const AGE_GROUPS = [
    { id: '6-12', label: '6–12 years', minCycles: 6, maxCycles: 8, recText: '9–12 hours', suggestion: 'At this age, consistent sleep improves focus, growth, and daily energy.' },
    { id: '13-17', label: '13–17 years', minCycles: 5, maxCycles: 7, recText: '8–10 hours', suggestion: 'Adequate sleep is crucial for cognitive development, memory, and mood regulation.' },
    { id: '18-25', label: '18–25 years', minCycles: 5, maxCycles: 6, recText: '7–9 hours', suggestion: 'Optimal rest helps young adults manage studies, work stress, and social life.' },
    { id: '26-40', label: '26–40 years', minCycles: 5, maxCycles: 6, recText: '7–9 hours', suggestion: 'Vital for daily recovery, immune health, and maintaining daytime productivity.' },
    { id: '41-60', label: '41–60 years', minCycles: 5, maxCycles: 6, recText: '7–9 hours', suggestion: 'Prioritize sleep quality to support metabolic and heart health as your body changes.' },
    { id: '60+', label: '60+ years', minCycles: 4, maxCycles: 5, recText: '7–8 hours', suggestion: 'Maintains brain health. Shorter nighttime sleep is normal; afternoon naps can help.' }
  ];

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedTime = localStorage.getItem('aurasleep_time');
    const savedAge = localStorage.getItem('aurasleep_age');
    if (savedTime && savedAge) {
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
    
    // Smart rollover: if the time has already passed today, assume tomorrow
    if (currentMode === 'wake' && d.getTime() < now.getTime()) {
      d.setDate(d.getDate() + 1);
    } else if (currentMode === 'bed') {
      // For bedtime, if it's early morning (e.g. 1 AM) and it's currently evening, it's tomorrow.
      if (now.getTime() - d.getTime() > 12 * 60 * 60 * 1000) {
        d.setDate(d.getDate() + 1);
      } else if (d.getTime() < now.getTime() && hours < 12 && now.getHours() >= 12) {
        d.setDate(d.getDate() + 1);
      }
    }
    return d;
  };

  const calculateForTime = (timeStr: string, currentMode: 'wake' | 'bed') => {
    if (!timeStr || !ageGroup) return;
    
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
    if (!ageGroup) {
      showToast("Please select your age group before calculating.");
      return;
    }
    setResults([]);
    setTimeout(() => {
      calculateForTime(time, mode);
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
      
      if (diffDays === 1) return `${timeString} (Tomorrow)`;
      if (diffDays === -1) return `${timeString} (Yesterday)`;
      if (diffDays > 1) return `${timeString} (+${diffDays} days)`;
    }
    
    return timeString;
  };

  const formatDuration = (cycles: number) => {
    const totalMinutes = cycles * 90;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (mins === 0) return `${hours} hours`;
    return `${hours} hours ${mins} mins`;
  };

  const handleShare = (res: { date: Date; cycles: number }) => {
    const actionText = mode === 'wake' ? 'wake up at' : 'go to sleep at';
    const resultActionText = mode === 'wake' ? 'sleep at' : 'wake up at';
    const text = `If I want to ${actionText} ${formatTime(timeToDate(time, mode), true)}, I should ${resultActionText} ${formatTime(res.date, true)} for ${res.cycles} sleep cycles! 🌙 Calculate your optimal sleep time at ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Optimal Sleep Time',
        text: text,
      }).catch(console.error);
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleSleepNow = () => {
    if (!ageGroup) {
      showToast("Please select your age group before calculating.");
      return;
    }
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    setTime(timeStr);
    setMode('bed');
    calculateForTime(timeStr, 'bed');
    showToast("Calculated optimal wake times for sleeping right now.");
  };

  const isRecommended = (cycle: number) => {
    const config = AGE_GROUPS.find(g => g.id === ageGroup);
    if (!config) return cycle === 6 || cycle === 5;
    return cycle >= config.minCycles && cycle <= config.maxCycles;
  };

  const handleSetAlarm = (specificTime?: Date, isWakeAlarm: boolean = true) => {
    const alarmTime = specificTime || (mode === 'wake' ? timeToDate(time, mode) : results.find(r => isRecommended(r.cycles))?.date);
    if (!alarmTime) return;

    const timeStr = formatTime(alarmTime, true);
    const actionText = isWakeAlarm ? 'wake up' : 'sleep';

    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showToast(`Web alarm scheduled for ${timeStr}`);
          
          let delay = alarmTime.getTime() - Date.now();
          if (delay < 0) delay += 24 * 60 * 60 * 1000; // Next day
          
          if (delay < 24 * 60 * 60 * 1000) {
            setTimeout(() => {
              new Notification('AuraSleep Alarm', {
                body: `Time to ${actionText}!`,
                icon: '/favicon.ico'
              });
            }, delay);
          }
        } else {
          showToast(`Alarm set for ${timeStr} (Notifications blocked)`);
        }
      });
    } else {
      showToast(`Alarm set for ${timeStr}`);
    }
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <Helmet>
          <title>Sleep Calculator: Find the Best Time to Sleep and Wake Up</title>
          <meta name="description" content="Use our free sleep calculator to find the best time to sleep, wake up refreshed, and understand your 90-minute sleep cycles." />
        </Helmet>
        <div className="flex flex-col items-center justify-center gap-2 mb-6 text-center px-4 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-snug text-white/95">
            Calculate your perfect sleep schedule
          </h1>
          <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed mt-2">
            Find the best time to sleep or wake up based on your natural 90-minute sleep cycles, so you can start your day feeling refreshed.
          </p>
        </div>
        
        <div 
          className="flex items-center gap-2 text-[#00d2ff] font-medium tracking-wide bg-[#00d2ff]/10 px-4 py-1.5 rounded-full border border-[#00d2ff]/20 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both"
        >
          <Clock size={16} />
          <span className="font-mono text-sm">{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}</span>
        </div>
      </div>

      {/* Top Space Instead of Divider */}
      <div className="w-full mb-8 sm:mb-12" />

      {/* Container for input section with subtle card look */}
      <div className="bg-[#1a153a] border border-white/5 rounded-[2rem] p-6 sm:p-10 md:p-12 w-full max-w-2xl mx-auto mb-16 flex flex-col items-center">
        
        {/* Age Selection */}
        <div className="w-full mb-10">
          <label className="text-white/70 font-medium mb-4 block uppercase tracking-wider text-sm text-center">
            Select Your Age Group
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {AGE_GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => { setAgeGroup(group.id); setResults([]); }}
                aria-pressed={ageGroup === group.id}
                className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none border ${
                  ageGroup === group.id
                    ? 'bg-gradient-to-r from-[#1a2a5c] to-[#25397a] border-[#00d2ff]/40 text-white shadow-[0_0_15px_rgba(37,57,122,0.4)]'
                    : 'bg-[#130f2e]/80 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div 
          role="radiogroup" 
          aria-label="Calculation mode"
          className="flex flex-col sm:flex-row bg-[#130f2e] rounded-2xl sm:rounded-full p-1.5 border border-white/10 w-full mb-10 gap-1.5 sm:gap-0 shadow-sm"
        >
          <button
            role="radio"
            aria-checked={mode === 'wake'}
            onClick={() => { setMode('wake'); setResults([]); }}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 sm:py-3 px-4 rounded-xl sm:rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none ${
              mode === 'wake'
                ? 'bg-gradient-to-r from-[#1a2a5c] to-[#25397a] border-[#00d2ff]/40 text-white shadow-[0_0_15px_rgba(37,57,122,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {mode === 'wake' ? (
              <Check size={16} strokeWidth={3} />
            ) : (
              <Check size={16} className="opacity-0 hidden sm:block" />
            )}
            I want to wake up at
          </button>
          <button
            role="radio"
            aria-checked={mode === 'bed'}
            onClick={() => { setMode('bed'); setResults([]); }}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 sm:py-3 px-4 rounded-xl sm:rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none ${
              mode === 'bed'
                ? 'bg-gradient-to-r from-[#1a2a5c] to-[#25397a] border-[#00d2ff]/40 text-white shadow-[0_0_15px_rgba(37,57,122,0.4)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {mode === 'bed' ? (
              <Check size={16} strokeWidth={3} />
            ) : (
              <Moon size={16} fill="currentColor" className="hidden sm:block" />
            )}
            I want to go to sleep at
          </button>
        </div>

        {/* Time Input */}
        <div className="flex flex-col items-center mb-10 relative group w-full">
          <label htmlFor="time-input" className="text-white/70 font-medium mb-4 uppercase tracking-wider text-sm">
            {mode === 'wake' ? 'Select Wake Up Time' : 'Select Sleep Time'}
          </label>
          <div className="relative w-full max-w-[280px]">
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
              className="w-full bg-[#130f2e] border border-white/20 hover:border-[#00d2ff]/50 rounded-2xl px-6 py-4 text-4xl sm:text-5xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:border-transparent transition-all cursor-pointer appearance-none text-center tracking-wider"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          aria-label="Calculate optimal sleep times"
          className="bg-gradient-to-r from-[#1a2a5c] to-[#25397a] hover:brightness-110 rounded-full px-12 sm:px-16 py-4 sm:py-5 text-white font-bold text-lg tracking-wide shadow-lg border border-[#00d2ff]/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none w-full sm:w-auto mt-2"
        >
          Calculate sleep schedule
        </button>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div 
          className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-6">
            <Moon className="text-[#00d2ff]" size={20} fill="#00d2ff" />
            <span className="text-white/90">
              If you want to {mode === 'wake' ? 'wake up' : 'sleep'} at <span className="font-bold">{formatTime(timeToDate(time, mode), true)}</span>, you should {mode === 'wake' ? 'sleep' : 'wake up'} at:
            </span>
          </div>

          {/* Recommended Cards */}
          {results.filter(r => isRecommended(r.cycles)).map((res, index) => (
            <div 
              key={`${res.cycles}-${res.date.getTime()}`} 
              className={`w-full border-2 border-[#00d2ff] hover:border-[#40c9ff] rounded-xl bg-gradient-to-b from-[#1a2a5c]/80 to-[#121b3d]/80 p-5 shadow-lg mb-4 transition-all duration-300 ease-out hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Bed className="text-white/70" size={24} />
                  <span className="text-2xl sm:text-3xl font-bold">{formatTime(res.date, true)}</span>
                  <span className="text-white/70 text-base sm:text-lg">({res.cycles} cycles)</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pl-8 sm:pl-0">
                  <div className="flex gap-2">
                    <button onClick={() => handleSetAlarm(res.date, mode === 'bed')} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none" title={`Set alarm for ${formatTime(res.date, true)}`} aria-label={`Set alarm for ${formatTime(res.date, true)}`}>
                      <Bell size={16} />
                    </button>
                    <button onClick={() => handleShare(res)} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none" title="Share to X/Twitter" aria-label={`Share ${formatTime(res.date, true)} time`}>
                      <Share2 size={16} />
                    </button>
                  </div>
                  <span className="bg-[#3a9e4c] text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-wider">Recommended</span>
                </div>
              </div>
              <div className="text-white/80 text-sm pl-0 sm:pl-9 border-t border-white/10 pt-3">
                <div className="mb-2 text-center sm:text-left">Sleep for {formatDuration(res.cycles)}</div>
                <div className="flex gap-1.5 w-full max-w-xs mx-auto sm:mx-0" aria-label={`${res.cycles} sleep cycles`}>
                  {Array.from({ length: res.cycles }).map((_, i) => (
                    <div key={i} className="h-1.5 flex-1 bg-[#00d2ff] rounded-full shadow-[0_0_5px_rgba(0,210,255,0.5)]"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Other Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
            {results.filter(r => !isRecommended(r.cycles)).map((res, index) => (
              <div 
                key={`${res.cycles}-${res.date.getTime()}`} 
                className="border border-white/10 hover:border-[#00d2ff]/50 rounded-xl bg-[#1d1842]/80 hover:bg-[#251f54]/90 p-5 transition-all duration-300 ease-out hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationFillMode: 'both', animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Bed className="text-white/70 hidden sm:block" size={20} />
                    <span className="text-xl sm:text-2xl font-bold">{formatTime(res.date, true)}</span>
                    <span className="text-white/70 text-sm sm:text-base">({res.cycles} cycles)</span>
                  </div>
                  <div className="self-end sm:self-auto -mt-8 sm:mt-0">
                    <button onClick={() => handleShare(res)} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none" title="Share to X/Twitter" aria-label={`Share ${formatTime(res.date, true)} time`}>
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-white/80 text-sm border-t border-white/10 pt-3 text-center flex flex-col items-center">
                  <div className="mb-2">Sleep for {formatDuration(res.cycles)}</div>
                  <div className="flex gap-1 w-full max-w-[150px]" aria-label={`${res.cycles} sleep cycles`}>
                    {Array.from({ length: res.cycles }).map((_, i) => (
                      <div key={i} className="h-1 flex-1 bg-white/40 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:px-0">
            <button onClick={handleSleepNow} aria-label="Calculate times for sleeping right now" className="flex items-center justify-center gap-2 bg-[#130f2e] border border-white/10 rounded-full px-8 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none w-full sm:w-auto">
              <Moon size={18} fill="currentColor" /> Sleep Now
            </button>
            <button onClick={() => handleSetAlarm()} aria-label="Set web alarm for the recommended time" className="flex items-center justify-center gap-2 bg-[#130f2e] border border-white/10 rounded-full px-8 py-3.5 text-sm sm:text-base font-medium hover:bg-white/10 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none w-full sm:w-auto">
              <Bell size={18} /> Set Alarm
            </button>
          </div>

          {/* Health Insights */}
          {AGE_GROUPS.find(g => g.id === ageGroup) && (
            <div 
              className="bg-[#1a153a]/60 border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center text-left animate-in fade-in duration-500 delay-200 fill-mode-both"
            >
              <div className="bg-[#00d2ff]/20 p-3 rounded-full shrink-0">
                <Info size={24} className="text-[#00d2ff]" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Health insight for {AGE_GROUPS.find(g => g.id === ageGroup)?.label}
                </h3>
                <p className="text-white/70 text-sm">
                  Recommended sleep: <span className="text-[#00d2ff] font-medium">{AGE_GROUPS.find(g => g.id === ageGroup)?.recText}</span>. 
                  {' '}{AGE_GROUPS.find(g => g.id === ageGroup)?.suggestion}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Space before content */}
      <div className="w-full mb-8 sm:mb-16" />

      {/* Comprehensive SEO Content Section */}
      <article className="w-full pb-20 px-4 md:px-0 text-left space-y-20">
        
        {/* Section 1: What is a Sleep Calculator? */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Moon className="text-[#00d2ff]" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white/95"><Link to="/blog/what-is-a-sleep-calculator" className="hover:text-[#00d2ff] transition-colors">What is a Sleep Calculator?</Link></h2>
          </div>
          <div className="space-y-4 text-white/70 leading-relaxed sm:text-lg">
            <p>
              A <strong>sleep calculator</strong> is a free digital tool designed to help you figure out the absolute <Link to="/blog/best-time-to-sleep" className="text-[#00d2ff] hover:underline font-medium">best time to sleep</Link> and wake up. Instead of just guessing when to set your alarm, this tool uses the science of human sleep to calculate exact bedtimes or wake-up times.
            </p>
            <p>
              If you have ever woken up feeling incredibly exhausted—even after getting a full eight hours of rest—you likely woke up in the middle of a deep sleep phase. Our advanced <strong>sleep cycle calculator</strong> counts backward or forwards in specific intervals to ensure you wake up at the end of a cycle, leaving you feeling naturally refreshed, alert, and ready to tackle the day.
            </p>
            <Link to="/blog/what-is-a-sleep-calculator" className="inline-block mt-4 text-[#00d2ff] hover:underline font-medium text-sm">Read full guide →</Link>
          </div>
        </section>

        {/* Section 2: How Does Sleep Cycle Work? */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#00d2ff]" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white/95"><Link to="/blog/how-does-your-sleep-cycle-work" className="hover:text-[#00d2ff] transition-colors">How Does Your Sleep Cycle Work?</Link></h2>
          </div>
          <div className="space-y-4 text-white/70 leading-relaxed sm:text-lg">
            <p>
              Human sleep isn't just a single block of unconsciousness. As you rest, your brain cycles through multiple stages of sleep: light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. You can read more about this in our <Link to="/blog/sleep-cycle-guide" className="text-[#00d2ff] hover:underline font-medium">sleep cycle guide</Link>.
            </p>
            <p>
              On average, one complete sleep cycle lasts for about <strong>90 minutes</strong>. During a normal night, a healthy adult will go through five to six of these cycles. If your alarm clock goes off while you are in the deepest stage of a sleep cycle, you will experience what scientists call "sleep inertia"—that heavy, groggy feeling that makes it nearly impossible to get out of bed.
            </p>
            <p>
              By utilizing a <strong>sleep time calculator</strong>, you can align your wake-up time with the natural end of a 90-minute cycle. 
            </p>
            <Link to="/blog/how-does-your-sleep-cycle-work" className="inline-block mt-4 text-[#00d2ff] hover:underline font-medium text-sm">Read full guide →</Link>
          </div>
        </section>

        {/* Section 3: Benefits */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Check className="text-[#00d2ff]" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white/95"><Link to="/blog/benefits-of-using-a-sleep-calculator" className="hover:text-[#00d2ff] transition-colors">Benefits of Using a Sleep Calculator</Link></h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70 sm:text-lg">
            <li className="flex items-start gap-3">
              <span className="text-[#00d2ff] mt-1 flex-shrink-0">✦</span>
              <span><strong>Wake up instantly refreshed:</strong> Avoid sleep inertia and grogginess by waking up during light sleep.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00d2ff] mt-1 flex-shrink-0">✦</span>
              <span><strong>Improve daily focus:</strong> Optimize your deep sleep to boost brain function and memory recall. If you struggle with focus, find out <Link to="/blog/why-you-feel-tired" className="text-[#00d2ff] hover:underline font-medium">why you feel tired</Link>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00d2ff] mt-1 flex-shrink-0">✦</span>
              <span><strong>Establish a healthy routine:</strong> Consistently sleeping in 90-minute intervals builds an effortless circadian rhythm.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00d2ff] mt-1 flex-shrink-0">✦</span>
              <span><strong>Stop oversleeping:</strong> Sometime 6 hours (4 cycles) feels better than 8 hours, which wakes you up mid-cycle.</span>
            </li>
          </ul>
          <Link to="/blog/benefits-of-using-a-sleep-calculator" className="inline-block mt-6 text-[#00d2ff] hover:underline font-medium text-sm">Read full guide →</Link>
        </section>

        {/* Section 4: Best Times / Age */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Bed className="text-[#00d2ff]" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white/95"><Link to="/blog/best-sleep-times-based-on-90-minute-cycles" className="hover:text-[#00d2ff] transition-colors">Best Sleep Times Based on 90-Minute Cycles</Link></h2>
          </div>
          <div className="space-y-4 text-white/70 leading-relaxed sm:text-lg mb-6">
            <p>
              To wake up perfectly refreshed, you should aim for either <strong>5 or 6 full cycles</strong>. Our tool automatically factors in the average 15 minutes it takes a human to fall asleep.
            </p>
            <p>
              If you only have a short amount of time during the day, you don't need a full night's rest. Read our <Link to="/blog/power-nap-guide" className="text-[#00d2ff] hover:underline font-medium">power nap guide</Link> to learn how a 20-minute nap can save your day.
            </p>
            <Link to="/blog/best-sleep-times-based-on-90-minute-cycles" className="inline-block mt-4 text-[#00d2ff] hover:underline font-medium text-sm">Read full guide →</Link>
          </div>
        </section>

        {/* Section 5: Recommended Sleep by Age */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-[#00d2ff]" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white/95"><Link to="/blog/sleep-by-age" className="hover:text-[#00d2ff] transition-colors">Recommended Sleep Duration by Age</Link></h2>
          </div>
          <div className="space-y-4 text-white/70 leading-relaxed sm:text-lg mb-6">
            <p>
              Ideal sleep duration changes throughout your life. Our age-based sleep calculator helps personalize your schedule for maximum recovery. Here are the general recommendations:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>6–12 years:</strong> 9 to 12 hours</li>
              <li><strong>13–17 years:</strong> 8 to 10 hours</li>
              <li><strong>18–60 years:</strong> 7 to 9 hours</li>
              <li><strong>60+ years:</strong> 7 to 8 hours</li>
            </ul>
            <p>
              If you struggle to meet these targets or consistently feel tired despite hitting them, it might be a sign to re-evaluate your sleep schedule.
            </p>
            <Link to="/blog/sleep-by-age" className="inline-block mt-4 text-[#00d2ff] hover:underline font-medium text-sm">Read full chart & guide →</Link>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-[#00d2ff]" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold text-white/95">FAQs</h2>
          </div>
          <FAQAccordion />
        </section>

      </article>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#1a2a5c]/90 border border-[#00d2ff]/50 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-3 whitespace-nowrap animate-in fade-in slide-in-from-bottom-10 duration-300"
        >
          <Bell size={18} className="text-[#00d2ff]" />
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
