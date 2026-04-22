import { useState, useEffect } from 'react';
import { Moon, Check, Bed, Bell, Share2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [results, setResults] = useState<{ date: Date; cycles: number }[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

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
    
    if (!savedTime) {
      calculateForTime(time, mode);
    } else {
      calculateForTime(time, mode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aurasleep_mode', mode);
    localStorage.setItem('aurasleep_time', time);
  }, [mode, time]);

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
    if (!timeStr) return;
    
    const baseDate = timeToDate(timeStr, currentMode);

    const cycles = [6, 5, 4, 3];
    const calculatedResults = cycles.map(cycle => {
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
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    setTime(timeStr);
    setMode('bed');
    calculateForTime(timeStr, 'bed');
    showToast("Calculated optimal wake times for sleeping right now.");
  };

  const handleSetAlarm = (specificTime?: Date, isWakeAlarm: boolean = true) => {
    const alarmTime = specificTime || (mode === 'wake' ? timeToDate(time, mode) : results.find(r => r.cycles === 6)?.date);
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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Moon className="text-[#a5b4fc]" size={36} fill="#a5b4fc" />
          <h1 className="text-3xl font-bold tracking-wide">Sleep Calculator</h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-2 text-[#00d2ff] font-medium tracking-wider bg-[#00d2ff]/10 px-4 py-1.5 rounded-full border border-[#00d2ff]/20 shadow-[0_0_15px_rgba(0,210,255,0.15)] backdrop-blur-sm"
        >
          <Clock size={16} />
          <span className="font-mono text-sm">{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}</span>
        </motion.div>
      </div>

      {/* Top Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

      {/* Toggle */}
      <div 
        role="radiogroup" 
        aria-label="Calculation mode"
        className="flex bg-[#130f2e]/80 rounded-full p-1 border border-white/10 w-full max-w-md mx-auto mb-8 backdrop-blur-sm"
      >
        <button
          role="radio"
          aria-checked={mode === 'wake'}
          onClick={() => { setMode('wake'); setResults([]); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none ${
            mode === 'wake'
              ? 'bg-gradient-to-r from-[#20448a] to-[#1a3673] border border-[#4a72b8] shadow-lg'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {mode === 'wake' ? (
            <div className="bg-white rounded-full p-0.5"><Check size={12} className="text-[#1a3673]" strokeWidth={3} /></div>
          ) : (
            <Check size={16} className="opacity-0" />
          )}
          I want to wake up at
        </button>
        <button
          role="radio"
          aria-checked={mode === 'bed'}
          onClick={() => { setMode('bed'); setResults([]); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none ${
            mode === 'bed'
              ? 'bg-gradient-to-r from-[#20448a] to-[#1a3673] border border-[#4a72b8] shadow-lg'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {mode === 'bed' ? (
            <div className="bg-white rounded-full p-0.5"><Check size={12} className="text-[#1a3673]" strokeWidth={3} /></div>
          ) : (
            <Moon size={16} fill="currentColor" />
          )}
          I want to go to sleep at
        </button>
      </div>

      {/* Time Input */}
      <div className="flex flex-col items-center mb-8 relative group">
        <label htmlFor="time-input" className="text-white/90 font-medium mb-3">
          {mode === 'wake' ? 'Wake up time:' : 'Go to sleep time:'}
        </label>
        <div className="relative">
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
            className="bg-[#1a173a]/60 border border-white/20 hover:border-white/40 rounded-xl px-8 py-4 text-4xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:border-transparent backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all cursor-pointer appearance-none"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculate}
        aria-label="Calculate optimal sleep times"
        className="bg-gradient-to-b from-[#40c9ff] to-[#0088ff] rounded-full px-16 py-3 text-white font-bold text-lg shadow-[0_0_20px_rgba(0,136,255,0.6)] border border-[#40c9ff]/50 hover:scale-105 transition-transform mb-12 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        Calculate
      </button>

      {/* Middle Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

      {/* Results Section */}
      {results.length > 0 && (
        <div 
          className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-6">
            <Moon className="text-[#fcd34d]" size={20} fill="#fcd34d" />
            <span className="text-white/90">
              If you want to {mode === 'wake' ? 'wake up' : 'sleep'} at <span className="font-bold">{formatTime(timeToDate(time, mode), true)}</span>, you should {mode === 'wake' ? 'sleep' : 'wake up'} at:
            </span>
          </div>

          {/* Recommended Card (6 cycles) */}
          {results.filter(r => r.cycles === 6).map(res => (
            <motion.div 
              key={`${res.cycles}-${res.date.getTime()}`} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full border-2 border-[#00d2ff] hover:border-[#40c9ff] rounded-xl bg-gradient-to-b from-[#1a2a5c]/80 to-[#121b3d]/80 p-5 shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] backdrop-blur-md mb-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] cursor-default"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Bed className="text-white/70" size={24} />
                  <span className="text-3xl font-bold">{formatTime(res.date, true)}</span>
                  <span className="text-white/70 text-lg">({res.cycles} cycles)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleSetAlarm(res.date, mode === 'bed')} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none" title={`Set alarm for ${formatTime(res.date, true)}`} aria-label={`Set alarm for ${formatTime(res.date, true)}`}>
                    <Bell size={16} />
                  </button>
                  <button onClick={() => handleShare(res)} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none" title="Share to X/Twitter" aria-label={`Share ${formatTime(res.date, true)} time`}>
                    <Share2 size={16} />
                  </button>
                  <span className="bg-[#3a9e4c] text-white text-xs font-bold px-4 py-1.5 rounded-full">Recommended</span>
                </div>
              </div>
              <div className="text-white/80 text-sm ml-9 border-t border-white/10 pt-3">
                <div className="mb-2">Sleep for {formatDuration(res.cycles)}</div>
                <div className="flex gap-1.5 w-full max-w-xs" aria-label={`${res.cycles} sleep cycles`}>
                  {Array.from({ length: res.cycles }).map((_, i) => (
                    <div key={i} className="h-1.5 flex-1 bg-[#00d2ff] rounded-full shadow-[0_0_5px_rgba(0,210,255,0.5)]"></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Other Cards (5, 4, 3 cycles) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {results.filter(r => r.cycles < 6).map((res, index) => (
              <motion.div 
                key={`${res.cycles}-${res.date.getTime()}`} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 * (index + 1) }}
                className="border border-white/10 hover:border-[#00d2ff]/50 rounded-xl bg-[#1d1842]/80 hover:bg-[#251f54]/90 p-5 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] cursor-default"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <Bed className="text-white/70" size={20} />
                    <span className="text-2xl font-bold">{formatTime(res.date, true)}</span>
                    <span className="text-white/70">({res.cycles} cycles)</span>
                  </div>
                  <button onClick={() => handleShare(res)} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none" title="Share to X/Twitter" aria-label={`Share ${formatTime(res.date, true)} time`}>
                    <Share2 size={16} />
                  </button>
                </div>
                <div className="text-white/80 text-sm border-t border-white/10 pt-3 text-center flex flex-col items-center">
                  <div className="mb-2">Sleep for {formatDuration(res.cycles)}</div>
                  <div className="flex gap-1 w-full max-w-[150px]" aria-label={`${res.cycles} sleep cycles`}>
                    {Array.from({ length: res.cycles }).map((_, i) => (
                      <div key={i} className="h-1 flex-1 bg-white/40 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button onClick={handleSleepNow} aria-label="Calculate times for sleeping right now" className="flex items-center gap-2 bg-[#130f2e]/80 border border-white/20 rounded-full px-8 py-2.5 text-sm hover:bg-white/10 transition-colors backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none">
              <Moon size={16} fill="currentColor" /> Sleep Now
            </button>
            <button onClick={() => handleSetAlarm()} aria-label="Set web alarm for the recommended time" className="flex items-center gap-2 bg-[#130f2e]/80 border border-white/20 rounded-full px-8 py-2.5 text-sm hover:bg-white/10 transition-colors backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none">
              <Bell size={16} /> Set Alarm
            </button>
          </div>
        </div>
      )}

      {/* Bottom Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

      {/* Info Section */}
      <div className="w-full text-left pb-12">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">What is a Sleep Cycle Calculator?</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Whether you're wondering <strong>"what time should I wake up?"</strong> or <strong>"what time should I go to bed?"</strong>, our <strong>sleep calculator</strong> is here to help. By calculating backwards or forwards in 90-minute increments, this <strong>sleep time calculator</strong> ensures you wake up between REM sleep cycles, leaving you feeling refreshed instead of groggy.
          </p>
        </div>
        <div className="w-full h-px bg-white/10 mb-6" />
        <div>
          <h2 className="text-lg font-bold mb-3">How does the REM Sleep Calculator work?</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Your body moves through sleep stages in cycles of <span className="font-bold text-white">around 90 minutes</span>. We also factor in an average of <span className="font-bold text-white">15 minutes</span> to fall asleep. Using a <strong>sleeping calculator</strong> (or <em>sleep calc</em>) to find your optimal <strong>sleep calculator time</strong> means you avoid waking up mid-cycle. Next time you ask yourself <strong>"when should I wake up?"</strong> or <strong>"when to wake up?"</strong>, just use this <strong>calculator sleep</strong> tool!
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#1a2a5c]/90 border border-[#00d2ff]/50 text-white px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,210,255,0.3)] z-50 flex items-center gap-3 whitespace-nowrap"
          >
            <Bell size={18} className="text-[#00d2ff]" />
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
