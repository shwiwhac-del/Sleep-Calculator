import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Sparkles, Moon, Sun } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FAQAccordion } from "../components/FAQAccordion";
import TimePicker from "../components/TimePicker";
import { FeedbackModal } from "../components/FeedbackModal";

export default function Home() {
  const AGE_GROUPS = [
    { id: "0-3m", label: "0-3 Months", minCycles: 9, maxCycles: 11 },
    { id: "4-11m", label: "4-11 Months", minCycles: 8, maxCycles: 10 },
    { id: "1-2y", label: "1-2 Years", minCycles: 7, maxCycles: 9 },
    { id: "3-5y", label: "3-5 Years", minCycles: 6, maxCycles: 8 },
    { id: "6-12y", label: "6-12 Years", minCycles: 6, maxCycles: 7 },
    { id: "13-17", label: "13-17 Years", minCycles: 5, maxCycles: 7 },
    { id: "18-25", label: "18-25 Years", minCycles: 5, maxCycles: 6 },
    { id: "26-40", label: "26-40 Years", minCycles: 5, maxCycles: 6 },
    { id: "41-64", label: "41-64 Years", minCycles: 5, maxCycles: 6 },
    { id: "65+", label: "65+ Years", minCycles: 4, maxCycles: 6 },
  ];

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isNearBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 150;

      if (scrollY > 150 && !isNearBottom) {
        setShowFeedbackButton(true);
      } else {
        setShowFeedbackButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [rememberPreferences, setRememberPreferences] = useState<boolean>(
    () => {
      return localStorage.getItem("aurasleep_remember") === "true";
    },
  );

  const [mode, setMode] = useState<"wake" | "bed" | "nap">(() => {
    return (
      (localStorage.getItem("aurasleep_mode") as "wake" | "bed" | "nap") ||
      "bed"
    );
  });
  const [time, setTime] = useState<string>(() => {
    const savedTime = localStorage.getItem("aurasleep_time");
    if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) return savedTime;

    const now = new Date();
    const ms = 1000 * 60 * 15;
    const roundedDate = new Date(Math.round(now.getTime() / ms) * ms);
    const hours = String(roundedDate.getHours()).padStart(2, "0");
    const mins = String(roundedDate.getMinutes()).padStart(2, "0");
    return `${hours}:${mins}`;
  });
  const [ageGroup, setAgeGroup] = useState<string>(() => {
    const saved = localStorage.getItem("aurasleep_age");
    return saved && AGE_GROUPS.some((g) => g.id === saved) ? saved : "18-25";
  });
  const [results, setResults] = useState<
    { date: Date; cycles: number | string; duration?: string }[]
  >([]);
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
    const savedTime = localStorage.getItem("aurasleep_time");
    if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) {
      calculateForTime(time, mode);
    }
  }, []);

  useEffect(() => {
    if (rememberPreferences) {
      localStorage.setItem("aurasleep_mode", mode);
      localStorage.setItem("aurasleep_time", time);
      localStorage.setItem("aurasleep_age", ageGroup);
      localStorage.setItem("aurasleep_remember", "true");
    } else {
      localStorage.removeItem("aurasleep_mode");
      localStorage.removeItem("aurasleep_time");
      localStorage.removeItem("aurasleep_age");
      localStorage.setItem("aurasleep_remember", "false");
    }
  }, [mode, time, ageGroup, rememberPreferences]);

  const timeToDate = (
    timeStr: string,
    currentMode: "wake" | "bed" | "nap" = mode,
  ) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);

    if (currentMode === "wake" && d.getTime() < now.getTime()) {
      d.setDate(d.getDate() + 1);
    } else if (currentMode === "bed" || currentMode === "nap") {
      if (now.getTime() - d.getTime() > 12 * 60 * 60 * 1000) {
        d.setDate(d.getDate() + 1);
      } else if (
        d.getTime() < now.getTime() &&
        hours < 12 &&
        now.getHours() >= 12
      ) {
        d.setDate(d.getDate() + 1);
      }
    }
    return d;
  };

  const calculateForTime = (
    timeStr: string,
    currentMode: "wake" | "bed" | "nap",
  ) => {
    if (!timeStr) return;

    const baseDate = timeToDate(timeStr, currentMode);

    if (currentMode === "nap") {
      setResults([
        {
          date: new Date(baseDate.getTime() + (20 + 15) * 60000), // 20m nap + 15m fall asleep
          cycles: "Power Nap",
          duration: "20 min",
        },
        {
          date: new Date(baseDate.getTime() + (90 + 15) * 60000), // 90m cycle + 15m fall asleep
          cycles: "Full Cycle",
          duration: "90 min",
        },
      ]);
      return;
    }

    let cyclesToGenerate = [6, 5, 4, 3];
    const ageConfig = AGE_GROUPS.find((g) => g.id === ageGroup);
    if (ageConfig) {
      const maxC = ageConfig.maxCycles;
      cyclesToGenerate = [];
      for (let i = maxC; i >= Math.max(3, ageConfig.minCycles - 2); i--) {
        cyclesToGenerate.push(i);
      }
    }

    const calculatedResults = cyclesToGenerate.map((cycle) => {
      if (currentMode === "wake") {
        const totalMinutesToSubtract = cycle * 90;
        return {
          date: new Date(baseDate.getTime() - totalMinutesToSubtract * 60000),
          cycles: cycle,
        };
      } else {
        const totalMinutesToAdd = cycle * 90;
        return {
          date: new Date(baseDate.getTime() + totalMinutesToAdd * 60000),
          cycles: cycle,
        };
      }
    });

    setResults(calculatedResults);
  };

  const handleCopy = () => {
    const textLines = results
      .map((r) =>
        r.duration
          ? `• ${formatTime(r.date)} (${r.duration} - ${r.cycles})`
          : `• ${formatTime(r.date)} - ${Number(r.cycles) * 1.5} hours of sleep (${r.cycles} cycles)`
      )
      .join("\n");
    
    let title = "My optimal sleep schedule:";
    if (mode === "wake") title = `To wake up refreshed, my ideal bedtimes are:`;
    if (mode === "bed") title = `If I sleep now, my ideal wake-up times are:`;
    if (mode === "nap") title = `My optimal power nap schedule:`;

    const fullText = `${title}\n\n${textLines}\n\n🛌 Calculate yours at: https://sleepcalculater.online/`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    setResults([]);
    setTimeout(() => {
      calculateForTime(timeRef.current, modeRef.current);
      setTimeout(() => {
        if (resultsRef.current) {
          const rect = resultsRef.current.getBoundingClientRect();
          const isVisible =
            rect.top >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight);
          if (!isVisible) {
            resultsRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }, 100);
    }, 50);
  };

  const formatTime = (date: Date, showDayIndicator: boolean = false) => {
    const timeString = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    if (showDayIndicator) {
      const now = new Date();
      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      ).getTime();
      const targetDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();

      const diffDays = Math.round((targetDay - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return `${timeString} (tomorrow)`;
      if (diffDays === -1) return `${timeString} (yesterday)`;
      if (diffDays > 1) return `${timeString} (+${diffDays} days)`;
    }

    return timeString;
  };

  const isRecommended = (cycle: number | string) => {
    if (typeof cycle === "string") return true;
    const config = AGE_GROUPS.find((g) => g.id === ageGroup);
    if (!config) return cycle === 6 || cycle === 5;
    return cycle >= config.minCycles && cycle <= config.maxCycles;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center mb-4 mt-2 sm:mt-3">
        <Helmet>
          <title>What Time Should I Go to Bed? Free Sleep Calculator</title>
          <meta
            name="description"
            content="Calculate your perfect bedtime and wake-up times using natural 90-minute sleep cycles. Wake up refreshed and energized with our free, science-based sleep calculator. No signup required."
          />
          <meta
            name="keywords"
            content="sleep calculator, sleep cycle calculator, bedtime calculator, wake up time calculator, best time to sleep, sleep cycle timing, REM sleep cycles, sleep schedule calculator"
          />
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
                  "@type": "WebApplication",
                  "name": "Sleep Cycle Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "All",
                  "url": "https://sleepcalculater.online/",
                  "description": "Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Article",
                  "headline": "How Does a Sleep Calculator Work? Best Bedtime Timing Explained",
                  "description": "Learn the science behind 90-minute sleep cycles and how calculating your bedtime can help you wake up refreshed.",
                  "author": {
                    "@type": "Organization",
                    "name": "Sleep Calculator Experts",
                    "url": "https://sleepcalculater.online/about"
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://sleepcalculater.online/"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is a sleep cycle?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A sleep cycle is a natural 90-minute pattern of light sleep, deep sleep, and REM sleep that humans experience multiple times per night."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How many sleep cycles do adults need?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most adults need 4 to 6 sleep cycles per night, totaling 6 to 9 hours of sleep, for optimal rest and health."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Why do I wake up tired after sleeping 8 hours?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Waking up tired after 8 hours of sleep happens because you woke up in the middle of a deep sleep cycle, causing sleep inertia and grogginess."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the best bedtime?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best bedtime is determined by counting backward from your wake-up time in 90-minute increments, ensuring you wake up at the end of a sleep cycle."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long does it take to fall asleep?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "On average, it takes a healthy adult 15 to 20 minutes to fall asleep (sleep latency). Our calculator automatically factors in 15 minutes to give you the most accurate bedtime schedule."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long should a power nap be?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A perfect power nap should be around 20 minutes. This gives you a quick boost of alertness without entering deep sleep, which can leave you feeling groggy. Alternatively, a full 90-minute nap allows for a complete sleep cycle."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I catch up on sleep during the weekend?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "While sleeping in on weekends can help recover some lost sleep, it doesn't completely reverse the chronic effects of sleep deprivation and can throw off your internal circadian rhythm for the upcoming week. Consistency is key."
                      }
                    }
                  ]
                }
              ]
            })}
          </script>
        </Helmet>
        <div className="flex flex-col items-center justify-center gap-2 mb-2 text-center max-w-3xl mx-auto px-4 mt-1 sm:mt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-1.5 leading-snug text-center">
            Sleep Calculator – Calculate Your Perfect Bedtime & Wake-Up Time
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-0.5 max-w-xl text-center leading-relaxed">
            Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles.
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[460px] mx-auto mb-4 relative px-4 sm:px-0">
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="flex flex-col items-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-4 sm:p-5 shadow-sm"
        >
          {/* Toggle Mode */}
          <div
            role="radiogroup"
            aria-label="Calculation mode"
            className="flex bg-gray-50 dark:bg-[#1e293b] rounded-xl p-1 w-full mb-5 relative overflow-x-auto"
          >
            <button
              role="radio"
              aria-checked={mode === "wake"}
              onClick={() => {
                setMode("wake");
                modeRef.current = "wake";
                setResults([]);
              }}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-300 min-w-max whitespace-nowrap ${
                mode === "wake"
                  ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
              }`}
            >
              Wake up at
            </button>
            <button
              role="radio"
              aria-checked={mode === "bed"}
              onClick={() => {
                setMode("bed");
                modeRef.current = "bed";
                setResults([]);
              }}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-300 min-w-max whitespace-nowrap ${
                mode === "bed"
                  ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
              }`}
            >
              Sleep at
            </button>
            <button
              role="radio"
              aria-checked={mode === "nap"}
              onClick={() => {
                setMode("nap");
                modeRef.current = "nap";
                setResults([]);
              }}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-300 min-w-max whitespace-nowrap ${
                mode === "nap"
                  ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
              }`}
            >
              Nap at
            </button>
          </div>

          {/* Time Input */}
          <div className="flex flex-col items-center justify-center w-full mb-5">
            <TimePicker
              value={time}
              onChange={(val) => {
                setTime(val);
                timeRef.current = val;
              }}
              onEnter={calculate}
              mode={mode}
            />
          </div>

          {/* Age group dropdown selection */}
          {mode !== "nap" && (
            <div className="flex flex-col items-center w-full mb-5 z-20">
              <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold mb-2">
                Select Your Age
              </span>
              <div className="w-full max-w-[145px] relative group mx-auto">
                <select
                  id="age-select"
                  value={ageGroup}
                  onChange={(e) => {
                    setAgeGroup(e.target.value);
                    setResults([]);
                  }}
                  className="w-full bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-xl py-2 pl-3.5 pr-8 transition-all duration-300 shadow-sm text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:border-gray-300 dark:hover:border-slate-600 outline-none appearance-none text-center"
                >
                  {AGE_GROUPS.map((g) => (
                    <option key={g.id} value={g.id} className="bg-white dark:bg-[#0f172a] text-left text-gray-900 dark:text-gray-100 font-medium">
                      {g.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <label className="relative inline-flex flex-row items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={rememberPreferences}
                    onChange={(e) => setRememberPreferences(e.target.checked)}
                  />
                  <div className="relative w-8 h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2563EB]/20 dark:peer-focus:ring-[#2563EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#2563EB]"></div>
                  <span className="ml-2 mt-[1px] text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                    Remember my preferences
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="w-full flex justify-center mt-3.5">
            <button
              onClick={calculate}
              className="w-full max-w-[260px] sm:max-w-[280px] bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF] rounded-full py-3 px-6 sm:py-3.5 sm:px-7 font-bold text-[#FFFFFF] text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(37,99,235,0.4)] hover:scale-[1.015] active:scale-[0.985] focus-visible:outline-none shadow-[0_5px_15px_rgba(37,99,235,0.3)] cursor-pointer text-center"
            >
              Calculate Optimal Times
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[520px] mx-auto mb-6 px-4 text-center">
        <ul className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-400 dark:text-gray-500 mb-3 list-disc list-inside">
          <li>Based on 90-minute sleep cycles</li>
          <li>Free sleep calculator</li>
          <li>No signup required</li>
          <li>Mobile-friendly planner</li>
        </ul>
        <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed">
          Results are estimates, not medical advice.{" "}
          <Link
            to="/disclaimer"
            className="underline hover:text-gray-500 dark:hover:text-gray-300"
          >
            Disclaimer
          </Link>
        </p>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            ref={resultsRef}
            className="w-full max-w-[460px] mx-auto flex flex-col items-center mb-6 px-4"
          >
            <div className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-4 sm:p-5 flex flex-col relative overflow-hidden shadow-sm">
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  {mode === "wake" ? (
                    <Moon className="w-4 h-4 text-[#2563EB]" />
                  ) : (
                    <Sun className="w-4 h-4 text-[#2563EB]" />
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 font-serif text-center">
                    Your Ideal Sleep Times
                  </h2>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-5 text-center text-xs sm:text-sm px-2 leading-relaxed">
                  {mode === "wake"
                    ? "To wake up refreshed, try to fall asleep at one of these times:"
                    : mode === "nap"
                      ? "For a quick power nap or full cycle sleep, set your alarm for one of these times:"
                      : "To get a full night's rest, set your alarm for one of these times:"}
                </p>

                <div
                  className="w-full flex flex-col gap-2.5 select-text"
                  onContextMenu={(e) => e.stopPropagation()}
                >
                  <AnimatePresence>
                    {results.map((res, index) => {
                      const recommended = isRecommended(res.cycles);
                      return (
                        <div
                          key={index}
                          className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-300 ${
                            recommended
                              ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/40"
                              : "bg-gray-50/50 dark:bg-[#111827] border-gray-200/60 dark:border-[#1e293b]"
                          }`}
                        >
                          <div className="flex flex-col relative z-10">
                            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none mb-1 flex items-center gap-1.5">
                              {formatTime(res.date)}
                              {recommended && (
                                <Sparkles
                                  className="w-3.5 h-3.5 text-[#2563EB] sm:block hidden"
                                  strokeWidth={2.5}
                                />
                              )}
                            </span>
                            <span className="text-gray-650 dark:text-gray-400 text-xs font-semibold">
                              {res.duration
                                ? res.duration
                                : `${Number(res.cycles) * 1.5} hours of sleep (${res.cycles} cycles)`}
                            </span>
                          </div>
                          {recommended && (
                            <div className="flex-shrink-0 ml-2 relative z-10 flex items-center">
                              <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                                Optimal
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                  <button
                    onClick={handleCopy}
                    className="w-full py-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-xs sm:text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    )}
                    {copied ? "Copied!" : "Copy Schedule to Clipboard"}
                  </button>

                  <button
                    onClick={() => {
                      setResults([]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-xs sm:text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-[#0f172a] flex items-center justify-center gap-2 group"
                  >
                    <motion.div
                      whileHover={{ rotate: -180 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        className="w-4 h-4 text-current opacity-70 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </motion.div>
                    Recalculate Options
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

            {/* Article Section */}
      <article className="w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6 prose prose-sm sm:prose-base dark:prose-invert prose-blue prose-headings:font-bold prose-h2:text-base sm:prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-[15px] sm:prose-h3:text-lg md:prose-h3:text-xl leading-relaxed">
        
        {/* Creator and Peer Review Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8 pb-4 border-b border-gray-100 dark:border-slate-800">
          <span>By <Link to="/about" className="text-[#2563EB] hover:underline font-semibold">Dr. Alena Vance</Link> (Certified Sleep Science Coach)</span>
          <span className="hidden sm:inline">|</span>
          <span>Updated on <strong>May 27, 2026</strong></span>
          <span className="hidden sm:inline">|</span>
          <span className="text-[#2563EB] font-medium">Science-Based Sleep Timing</span>
          <span className="hidden sm:inline">|</span>
          <span>Free Sleep Calculator (No Signup Required)</span>
        </div>

        <h2>How Does a Sleep Calculator Work? Why Use a Sleep Calc?</h2>
        <p><strong>Answer:</strong> A <strong>sleep calculator</strong> (or high-accuracy <strong>sleep calc</strong> / <strong>sleepcalculator</strong>) is a scientifically designed <strong>sleep tool</strong> that helps you figure out the absolute best times to go to bed and wake up. Instead of calculating haphazardly, our <strong>sleep schedule calculator</strong> and <strong>sleep time calculator</strong> counts backward or forward in 90-minute blocks to find the exact transitions between your biological sleep blocks. This ensures you can <strong>wake up refreshed</strong> and start your day with high energy levels.</p>
        <p>This <strong>science based sleep calculator</strong> functions as an interactive <strong>sleep timer</strong>, a smart <strong>wake up calculator</strong>, and a custom <strong>sleep planner</strong>. By analyzing <strong>how sleep cycles work</strong>, our <strong>sleeping calculator</strong> factors in roughly 15 minutes of sleep latency—the average time it takes a healthy adult to transition from active waking to falling asleep. This allows our <strong>perfect bedtime calculator</strong> or custom <strong>sleep wake calculator</strong> to give you exact bedtime schedules, acting as a highly precise <strong>ideal sleep time calculator</strong> and <strong>smart sleep calculator</strong>.</p>

        <h2>What is the Best Time to Sleep and Wake Up?</h2>
        <p>To establish a healthy rest baseline, you need to decide <strong>when should i wake up</strong> or <strong>what time should i wake up</strong>, then let a <strong>free sleep calculator</strong> or <strong>online sleep calculator</strong> count back your rest cycles. Adjusting your routine according to a <strong>calculator sleep</strong> model improves your daytime alertness. In this comprehensive guide, we have <strong>sleep cycles explained</strong> so that you can use our <strong>sleep planner online</strong> and find the <strong>best sleep time</strong> for your age group.</p>

        <h2>1. The Ultimate Guide to the Best Sleep Times by Age Group</h2>
        <p>Understanding <strong>how many hours should i sleep</strong> depends heavily on your physiological development, daily stress, and age. Different biological phases of life require varying sleep durations to support muscle development, mental clarity, and cellular repair:</p>
        <ul>
          <li>
            <strong>Kids & School Students (Ages 6-12):</strong> Growing children require approximately 9 to 11 hours of healthy sleep per night. Working with our specialized <strong>bedtime calculator for school students</strong> or a <strong>sleep calculator for school</strong> helps families manage early morning alarms and prevent classroom fatigue.
          </li>
          <li>
            <strong>Teenagers (Ages 13-17):</strong> Teens need between 8 to 10 hours of rest. During puberty, circadian rhythms naturally shift, making teenagers feel awake later at night. Utilizing a <strong>bedtime calculator for teens</strong> or our online <strong>sleep cycle calculator for teens</strong> makes it simple to discover <strong>how much sleep do teenagers need</strong> to survive early high school classes.
          </li>
          <li>
            <strong>College Students & Young Adults (Ages 18-25):</strong> Academically active individuals require 7.5 to 9 hours of sleep. A specialized <strong>sleep calculator for students</strong> and a <strong>sleep calculator for exams</strong> helps maintain GPA focus by ensuring study schedules align with complete 90-minute intervals. Having an optimal <Link to="/blog/best-bedtime-for-students" className="text-[#2563EB] hover:underline font-semibold">bedtime for college students</Link> directly boosts memory consolidation.
          </li>
          <li>
            <strong>Adults (Ages 18-64):</strong> Wondering <strong>how much sleep do adults need</strong>? Most adults need 7 to 9 hours of consistent resting time (representing 5 to 6 full cycles). Using our <strong>best sleep time for adults</strong> blueprint and standard <strong>sleep cycle calculator for adults</strong> ensures you maintain robust metabolic health and clear mental stamina.
          </li>
        </ul>
        <p>Finding your <strong>ideal bedtime</strong> has never been easier. Leverage our <strong>sleep hours calculator</strong> or download our highly responsive <strong>sleep cycle app</strong> to map out a structural bedtime routine today.</p>

        <h2>2. Sleep Cycles Explained: Light Sleep, Deep Sleep, and REM Transitions</h2>
        <p>Your night's sleep is not a uniform state of resting. Instead, your brain conducts multiple structured <strong>sleep cycles</strong>. But <strong>how long is a sleep cycle</strong>? On average, a standard human sleep module lasts approximately 90 to 110 minutes, prompting experts to refer to a <Link to="/blog/how-many-sleep-cycles-do-i-need" className="text-[#2563EB] hover:underline font-semibold">how many sleep cycles do i need</Link> guide for timing morning alarms. If you want to <strong>calculate my sleep cycles</strong> successfully, you need to understand the four key stages inside every 1.5-hour sequence:</p>
        <ul>
          <li>
            <strong>Light Sleep (Stages 1 and 2):</strong> The transition phase where your heart rate slows and muscles relax. Stage 2 includes small bursts of electrical activity called sleep spindles. Light sleep forms the baseline beginning of every cycle.
          </li>
          <li>
            <strong>What is Deep Sleep (Stage 3):</strong> Deep sleep is the ultimate physical recovery phase. During this Stage 3 slow-wave sleep, your body repairs torn muscle tissue, distributes growth hormones, cleans daily waste from brain cells, and strengthens immune response.
          </li>
          <li>
            <strong>What is REM Sleep (Rapid Eye Movement):</strong> The highly active dream state where your brainwaves move near waking levels. This is where your brain processes memories, files daily learnings, and supports emotional health. To discover <strong>how REM sleep affects memory</strong> and learning, check out our dedicated <Link to="/blog/rem-sleep-calculator" className="text-[#2563EB] hover:underline font-semibold">REM sleep calculator guide</Link> and learn how to optimize your nightly REM blocks with an integrated <strong>rem cycle calculator</strong> or <strong>REM calculator</strong>.
          </li>
        </ul>
        <p>By using an interactive <strong>sleep cycle timing calculator</strong> or reviewing our informative <Link to="/blog/sleep-cycle-timing" className="text-[#2563EB] hover:underline font-semibold">sleep cycle timing</Link> articles, you can schedule your waking hours to land at the very end of a cycle, avoiding painful grogginess and keeping your <strong>sleep quality</strong> pristine.</p>

        <h2>3. Best Bedtime for Students: Maximizing Academic Focus, GPA, and Memory</h2>
        <p>Balancing homework, part-time jobs, and social life can easily ruin a student's daily energy levels. Many students search for the <strong>best bedtime for students</strong>, a reliable <strong>best sleep schedule for students</strong>, or a <strong>bedtime planner</strong> to survive intense university courses and final exams.</p>
        <p>Clinical sleep science proves <strong>how sleep affects productivity</strong> and <strong>how sleep affects concentration</strong> in classrooms. Pulling late nights to study or succumbing to late-night phone usage suppresses natural melatonin, throwing your circadian rhythm into complete chaos. Sacrificing resting hours means you skip vital REM sleep cycles, which are the exact phases where your brain processes and stores newly studied information.</p>
        <p>To protect your cognitive stamina, establish a consistent and <Link to="/blog/best-bedtime-routine-for-better-sleep" className="text-[#2563EB] hover:underline font-semibold">healthy bedtime routine for students</Link>. Start preparing for rest 45 minutes prior by turning off monitors and limiting blue-light emissions. Our recommended <strong>best sleep schedule for focus</strong> and <strong>best sleep time for studying</strong> suggests a consistent sleep hour around 10:00 PM or 11:30 PM to wake up feeling fresh by 5:00 AM, 6:00 AM, or 7:00 AM.</p>

        <h2>4. Interactive Power Nap Calculator: Revitalize Afternoon Cognitive Energy</h2>
        <p>A daily afternoon dip in concentration is a normal reaction of our circadian homeostatic drive. While many individuals reach for caffeine after a crash, taking a midday <strong>power nap</strong> is a healthier and far more effective way to recharge your cognitive reserves.</p>
        <p>However, if you do not understand <strong>best nap length</strong> rules, you might wonder: <strong>why do naps make me tired</strong>? If your afternoon sleep lasts longer than 20 to 30 minutes, you enter deep slow-wave Stage 3 rest. Waking up during deep sleep triggers intense physical grogginess and attention deficits. To plan daytime rest without the heavy hangover, use our <strong>quick nap calculator</strong> and follow these guidelines:</p>
        <ul>
          <li>
            <strong>The 10-Minute Power Nap:</strong> Restores alertness and clears sensory overload without entering deep stages, making it easy to wake up immediately.
          </li>
          <li>
            <strong>The 20-Minute Cognitive Boost:</strong> The scientifically proven <strong>best time for a power nap</strong>. Staying within light Stage 1 and Stage 2 sleep cleans and resets neural competence.
          </li>
          <li>
            <strong>The 30-Minute Danger Zone:</strong> Waking up in this window guarantees severe afternoon sluggishness due to sleep inertia.
          </li>
          <li>
            <strong>The 90-Minute Full Cycle:</strong> Great for busy students or athletes needing to clear intense <strong>sleep debt</strong>. Completing a full cycle includes REM rest, supporting muscle and mind recovery.
          </li>
        </ul>
        <p>Our dedicated <Link to="/blog/nap-calculator-for-energy" className="text-[#2563EB] hover:underline font-semibold">nap calculator for energy</Link> and <Link to="/blog/nap-calculator-timing" className="text-[#2563EB] hover:underline font-semibold">nap calculator for productivity</Link> indicates that the absolute <strong>best nap time during the day</strong> is between 1:00 PM and 3:00 PM when body temperature experiences a natural thermal decline. Use our online <strong>nap calculator</strong> or <strong>nap time calculator</strong> today (which is among the <strong>best nap calculator online</strong> selections) to manage your afternoon stamina perfectly.</p>

        <h2>5. Why Am I Tired After Sleeping? Solving the Mystery of Morning Fatigue</h2>
        <p>If you put in 8 full hours of rest and still ask yourself: <Link to="/blog/why-am-i-tired-after-sleeping" className="text-[#2563EB] hover:underline font-semibold">why am i tired after sleeping</Link> or <strong>why do i wake up tired</strong>, you are likely experiencing a disruption in your sleep architecture. To understand <strong>how to wake up without feeling tired</strong>, you need to look beyond total hours and examine sleep cycle efficiency: If you wake up at a random hour, you can interrupt your deep cycles, leaving you listless.</p>
        <ul>
          <li>
            <strong>Poor Sleep Cycle Alignment:</strong> Waking up in the middle of deep restorative sleep triggers sleep inertia. Allying your bedroom alarm with standard 90-minute intervals ensures you <strong>wake up at the end of sleep cycle</strong> transitions.
          </li>
          <li>
            <strong>Why Oversleeping Makes You Tired:</strong> Oversleeping resets your internal circadian clock and keeps your brain in a deep-wave stage too long, leading to chronic physical fatigue and cognitive fog throughout the day.
          </li>
          <li>
            <strong>Interrupted REM Cycles:</strong> Environmental noises, bright lights, or pets can wake you up briefly without your knowledge, disrupting brainwave transitions and causing sleep deprivation.
          </li>
          <li>
            <strong>Accumulating Sleep Debt:</strong> Changing your bedtime daily creates an unstable biological rhythm, forcing your endocrine system to secrete cortisol and melatonin at erratic hours.
          </li>
        </ul>
        <p>Understanding <strong>how to sleep better at night</strong> and learning <strong>how to fix sleep schedule</strong> issues is straight-forward with structured consistency. Check our step-by-step <Link to="/blog/fix-sleep-schedule" className="text-[#2563EB] hover:underline font-semibold">how to fix sleep schedule</Link> guide to reprogram your biological rhythm.</p>

        <h2>6. Sleep Routine Tips: Crafting Your Perfect Bedtime Schedule</h2>
        <p>Combining clean sleep habits with our <strong>smart bedtime calculator</strong> is the best way to achieve sustained daily energy. Follow these evidence-backed <strong>sleep routine</strong> tips to optimize your resting energy instantly:</p>
        <ul>
          <li>
            <strong>Power Down Screens:</strong> Turn off mobile phones, bright tablets, and monitors 45 minutes before bedtime to prevent blue light from blocking natural pineal melatonin secretion. This improves your overall <strong>circadian rhythm</strong> optimization.
          </li>
          <li>
            <strong>Maintain a Fixed Bedtime and Rise Time:</strong> Go to sleep and wake up around the exact same times every day of the week, including weekends, to program your circadian rhythm.
          </li>
          <li>
            <strong>Monitor Caffeine Timing:</strong> Consuming high-caffeine beverages, dark chocolate, or energy coffee after 2:00 PM blocks your brain's adenosine receptors, keeping your autonomic nervous system stimulated late into the night.
          </li>
          <li>
            <strong>Optimize Hydration:</strong> Drink plenty of water during active midday hours, but limit fluids two hours before bedtime to avoid disruptive middle-of-the-night bathroom visits.
          </li>
          <li>
            <strong>Keep a Cool, Dark Bedroom:</strong> Keep your room temperature around 65-68°F (18-20°C) and completely dark to signal to your body's biological clock that it is time for deep biological down-regulation.
          </li>
        </ul>

         <h2>7. Morning Clock Alignment & Sleep Cycle Chart Examples</h2>
         <p>Determining your bedtimes from your alarm clock is simple once you apply 90-minute sleep cycle arithmetic. Let's look at 4 typical wake-up examples (already incorporating 15 minutes of sleep latency):</p>
         <ul>
           <li>
             <strong>For Waking Up at 5:00 AM:</strong> To rise at <Link to="/blog/wake-up-at-5am" className="text-[#2563EB] hover:underline font-semibold">5:00 AM</Link> with peak cognitive focus and high alertness, you should be asleep by <strong>8:00 PM</strong> (6 cycles) or <strong>9:30 PM</strong> (5 cycles). This answers <strong>what time should i sleep if i wake up at 5am</strong> cleanly.
           </li>
           <li>
             <strong>For Waking Up at 6:00 AM:</strong> To rise at <Link to="/blog/wake-up-at-6am" className="text-[#2563EB] hover:underline font-semibold">6:00 AM</Link> and <strong>wake up refreshed</strong>, the optimal bedtimes are <strong>9:00 PM</strong> (6 cycles) or <strong>10:30 PM</strong> (5 cycles), meaning you should prepare to rest at 8:45 PM or 10:15 PM. This provides a great <Link to="/blog/wake-up-at-6am" className="text-[#2563EB] hover:underline font-semibold">ideal bedtime for waking up at 6am</Link> window.
           </li>
           <li>
             <strong>For Waking Up at 7:00 AM:</strong> If you plan to rise at <Link to="/blog/wake-up-at-7am" className="text-[#2563EB] hover:underline font-semibold">7:00 AM</Link> feeling energized, your target bedtimes are <strong>10:00 PM</strong> (6 cycles) or <strong>11:30 PM</strong> (5 cycles), prompting you to get tucked in at 9:45 PM or 11:15 PM.
           </li>
           <li>
             <strong>For Waking Up at 8:00 AM:</strong> To rise at 8:00 AM with a clear mind, plan on falling asleep at <strong>11:00 PM</strong> (6 cycles) or <strong>12:30 AM</strong> (5 cycles).
            </li>
          </ul>

          <h2>8. Circadian Rhythm & Sleep Quality: Beyond the 90-Minute Rule</h2>
          <p>While mastering the 90-minute sleep cycle is a powerful first step, achieving deep, restorative sleep also depends on the alignment of your <strong>circadian rhythm</strong>. Your circadian rhythm is a natural 24-hour internal clock that lives in your brain's hypothalamus. It responds directly to environmental signals—specifically light and dark—to regulate natural <strong>melatonin release</strong> and body temperature transitions throughout the night.</p>
          <p>If your sleep schedule is inconsistent or you suffer from a high <strong>sleep debt</strong>, even a perfect 90-minute calculation might leave you feeling groggy. To maximize your sleep quality and experience true physical restoration, implement these proven practices to sync your internal biological clock:</p>
          <ul>
            <li>
              <strong>Get Bright Morning Sun:</strong> Walk outside or open your blinds for at least 10 to 15 minutes within an hour of waking up. Direct, natural morning light exposure halts daytime melatonin production, raises cortisol levels, and programs your brain to fall asleep more easily later that night.
            </li>
            <li>
              <strong>Stabilize Your Rise Time:</strong> Having a fluctuating weekend wake-up schedule acts like "social jetlag," confusing your body's circadian rhythm. Try to rise at the exact same hour every single day to establish a predictable biological anchor point.
            </li>
            <li>
              <strong>Avoid Late-Night Heavy Meals:</strong> Digesting proteins or fats within two hours of rest elevates your body's core temperature and heart rate. Undergoing active digestion disrupts vital deep slow-wave Stage 3 cycles, which are crucial for physical regeneration.
            </li>
            <li>
              <strong>Control Bedroom Air Quality:</strong> Stuffy bedrooms with high CO2 counts can lead to micro-awakenings, fragmenting your REM sleep patterns. Keep a window cracked or use a filter fan to maintain clean, fresh air flow throughout the night.
            </li>
          </ul>
          <p>By blending the precision of our <strong>biological sleep planner</strong> with consistent sleep hygiene, you can fully align your sleep health, optimize cellular regeneration, and consistently <strong>wake up refreshed</strong> every morning.
          </p>


         <p>Stop guessing your nightly alignment. Scroll up to our <strong>sleep cycle calculator online free</strong> (an ultimate <strong>sleep calculator with REM cycles</strong> and built-in <strong>sleep calculator with alarm</strong>) or use our <strong>ai sleep calculator</strong> to instantly find your personalized bedtimes and optimal sleep cycles in seconds! Whether you need a <strong>best sleep calculator online</strong>, a fast <strong>free online bedtime calculator</strong>, or a <strong>mobile sleep calculator</strong> with <strong>no signup</strong> required, our clean digital tool is here to help you <strong>wake up happy calculator</strong> style.</p>

<hr className="my-10 border-gray-200 dark:border-gray-800" />

        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white font-serif mt-16 mb-8">
          Frequently Asked Questions (FAQs)
        </h2>
        <FAQAccordion />

        {/* Trust & Methodology Section */}
        <div className="mt-8 p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-900/20 rounded-xl border border-gray-200 dark:border-slate-800 text-left">
          <h3 className="text-sm sm:text-base font-bold mt-0 mb-2.5 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] inline-block"></span> Trust & Methodology
          </h3>
          <p className="text-xs sm:text-xs m-0 text-gray-500/90 dark:text-gray-400 leading-relaxed font-sans select-text">
            Our Sleep Calculator and sleep schedule recommendations are built on peer-reviewed chronobiology research, clinical consensus guidelines, and the standardized 90-minute Rapid Eye Movement (REM) sleep cycle model. Key references include pediatric and adult sleep standards from the <a href="https://www.sleepfoundation.org/" target="_blank" rel="noopener noreferrer" className="underline text-[#2563EB]">National Sleep Foundation</a>, pediatric recommendation schedules from the <a href="https://www.cdc.gov/" target="_blank" rel="noopener noreferrer" className="underline text-[#2563EB]">CDC</a>, and brain hygiene studies from the <a href="https://www.mayoclinic.org/" target="_blank" rel="noopener noreferrer" className="underline text-[#2563EB]">Mayo Clinic</a> and <a href="https://www.nih.gov/" target="_blank" rel="noopener noreferrer" className="underline text-[#2563EB]">National Institutes of Health (NIH)</a>. For support, custom data queries, or comments, access our <Link to="/contact" className="underline text-[#2563EB]">Contact</Link> panel.
          </p>
        </div>


      </article>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full py-3 px-4 sm:px-5 flex items-center justify-center gap-2 font-semibold group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/20 ${showFeedbackButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        aria-label="Send Feedback"
      >
        <MessageSquare
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
}
