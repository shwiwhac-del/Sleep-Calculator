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
    { id: "13-17", label: "Teenagers", minCycles: 5, maxCycles: 7 },
    { id: "18-25", label: "Adults", minCycles: 5, maxCycles: 6 },
    { id: "student", label: "Student Mode", minCycles: 4, maxCycles: 6 },
    { id: "adhd", label: "ADHD Mode", minCycles: 5, maxCycles: 6 },
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
      "wake"
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
      <div className="flex flex-col items-center justify-center mb-6 mt-2 sm:mt-4">
        <Helmet>
          <title>Sleep Calculator – Best Sleep Cycle & Bedtime Calculator</title>
          <meta
            name="description"
            content="Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles. Wake up refreshed and improve your sleep quality."
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
        <div className="flex flex-col items-center justify-center gap-2 mb-2 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2 leading-tight">
            Sleep Calculator – Calculate Your Perfect Bedtime & Wake-Up Time
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Calculate the best bedtime and wake-up time using natural 90-minute sleep cycles.
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[440px] mx-auto mb-4 relative px-4 sm:px-0">
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="flex flex-col items-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-3xl p-5"
        >
          {/* Toggle Mode */}
          <div
            role="radiogroup"
            aria-label="Calculation mode"
            className="flex bg-gray-50 dark:bg-[#1e293b] rounded-[16px] p-1.5 w-full mb-6 relative overflow-x-auto"
          >
            <button
              role="radio"
              aria-checked={mode === "wake"}
              onClick={() => {
                setMode("wake");
                modeRef.current = "wake";
                setResults([]);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-300 min-w-max whitespace-nowrap ${
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-300 min-w-max whitespace-nowrap ${
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-300 min-w-max whitespace-nowrap ${
                mode === "nap"
                  ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
              }`}
            >
              Nap at
            </button>
          </div>

          {/* Time Input */}
          <div className="flex flex-col items-center justify-center w-full mb-6">
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

          {/* Age group pill selection */}
          {mode !== "nap" && (
            <div className="flex flex-col items-center w-full mb-6">
              <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold mb-3">
                Sleep Profile
              </span>
              <div className="flex flex-wrap justify-center gap-2 w-full max-w-[400px]">
                {AGE_GROUPS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setAgeGroup(g.id);
                      setResults([]);
                    }}
                    className={`py-1.5 px-3 sm:py-2 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-semibold transition-all duration-300 border ${
                      ageGroup === g.id
                        ? "bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-sm"
                        : "bg-transparent border-gray-200 dark:border-slate-700/60 text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-slate-800/50 dark:hover:text-gray-100"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-center gap-2">
                <label className="relative inline-flex flex-row items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={rememberPreferences}
                    onChange={(e) => setRememberPreferences(e.target.checked)}
                  />
                  <div className="relative w-8 h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2563EB]/20 dark:peer-focus:ring-[#2563EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#2563EB]"></div>
                  <span className="ml-2 mt-[1px] text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                    Remember my preferences
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="w-full flex justify-center mt-2">
            <button
              onClick={calculate}
              className="w-full max-w-[280px] bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-2xl px-6 py-3 font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] active:translate-y-0"
            >
              Calculate Optimal Times
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[520px] mx-auto mb-10 px-4 text-center">
        <ul className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-[13px] text-gray-500 mb-4 list-disc list-inside">
          <li>Based on 90-minute sleep cycles</li>
          <li>Free sleep calculator</li>
          <li>No signup required</li>
          <li>Mobile-friendly planner</li>
        </ul>
        <p className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed">
          Results are estimates, not medical advice.{" "}
          <Link
            to="/disclaimer"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
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
            className="w-full max-w-[580px] mx-auto flex flex-col items-center mb-8 px-4"
          >
            <div className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-[28px] p-5 sm:p-6 flex flex-col relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {mode === "wake" ? (
                    <Moon className="w-5 h-5 text-[#2563EB]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#2563EB]" />
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 font-serif text-center">
                    Your Ideal Sleep Times
                  </h2>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-center text-sm sm:text-base px-2">
                  {mode === "wake"
                    ? "To wake up refreshed, try to fall asleep at one of these times:"
                    : mode === "nap"
                      ? "For a quick power nap or full cycle sleep, set your alarm for one of these times:"
                      : "To get a full night's rest, set your alarm for one of these times:"}
                </p>

                <div
                  className="w-full flex flex-col gap-3 sm:gap-4 select-text"
                  onContextMenu={(e) => e.stopPropagation()}
                >
                  <AnimatePresence>
                    {results.map((res, index) => {
                      const recommended = isRecommended(res.cycles);
                      return (
                        <div
                          key={index}
                          className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                            recommended
                              ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/40"
                              : "bg-gray-50/50 dark:bg-[#111827] border-gray-200/60 dark:border-[#1e293b]"
                          }`}
                        >
                          <div className="flex flex-col relative z-10">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                              {formatTime(res.date)}
                              {recommended && (
                                <Sparkles
                                  className="w-4 h-4 text-[#2563EB] sm:block hidden"
                                  strokeWidth={2.5}
                                />
                              )}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                              {res.duration
                                ? res.duration
                                : `${Number(res.cycles) * 1.5} hours of sleep (${res.cycles} cycles)`}
                            </span>
                          </div>
                          {recommended && (
                            <div className="flex-shrink-0 ml-3 relative z-10 flex items-center">
                              <span className="inline-flex items-center text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg">
                                Optimal
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
                  <button
                    onClick={handleCopy}
                    className="w-full py-3.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-sm sm:text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
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
                    className="w-full py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm sm:text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-[#0f172a] flex items-center justify-center gap-2 group"
                  >
                    <motion.div
                      whileHover={{ rotate: -180 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        className="w-5 h-5 text-current opacity-70 group-hover:opacity-100 transition-opacity"
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
      <article className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 prose dark:prose-invert prose-blue prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl">
        <h2>How Does a Sleep Calculator Work?</h2>
        <p><strong>Answer:</strong> A sleep calculator works by counting backward or forward in 90-minute increments to find the exact moment your body transitions between sleep cycles. Waking up between cycles prevents grogginess and ensures you wake up feeling refreshed.</p>
        <p>Human sleep consists of <strong>90-minute REM sleep cycles</strong>. If you wake up in the middle of a deep sleep cycle, you will experience "sleep inertia" (feeling tired and sluggish). Because it takes the average person about 15 minutes to fall asleep, a high-quality bedtime calculator factors in this latency time to give you a highly accurate sleep schedule.</p>

        <h2>What is the Best Time to Sleep and Wake Up?</h2>
        <p><strong>Answer:</strong> The best time to sleep depends on your desired wake-up time, adjusting for 4 to 6 full 90-minute sleep cycles. Consistency in your sleep schedule is the most important factor in sleep quality.</p>
        <p>The ideal sleep hours vary by age:</p>
        <ul className="list-disc pl-5 my-4">
          <li><strong>Adults (18-64):</strong> 7 to 9 hours (5-6 cycles)</li>
          <li><strong>Teenagers (13-17):</strong> 8 to 10 hours (5-7 cycles)</li>
          <li><strong>Children (6-12):</strong> 9 to 12 hours (6-8 cycles)</li>
        </ul>
        <p>Getting the right amount of sleep improves cognitive performance, stress resilience, and overall metabolic health. For more detailed insights, visit our <Link to="/blog">Sleep Blog</Link>.</p>

        <h2>Tips for Better Sleep Quality</h2>
        <h3>1. Avoid Screens Before Bed</h3>
        <p>Blue light suppresses the production of melatonin, making it harder to fall asleep naturally. Stop using screens at least 30 minutes before your calculated bedtime.</p>
        
        <h3>2. Caffeine Timing</h3>
        <p>Caffeine has a half-life of roughly 5 hours. Avoid coffee or energy drinks in the late afternoon to protect the quality of your deep sleep stages.</p>

        <h3>3. Keep a Dark and Cool Room</h3>
        <p>Sleeping in completely dark and cool environments helps your core body temperature drop properly, which encourages unbroken, restful sleep.</p>

        <h3>4. Manage Stress</h3>
        <p>Establish a relaxing bedtime routine to calm your nervous system. Reading or light stretching works far better than scrolling social media.</p>

        
        <h2>Why Am I Tired After Sleeping?</h2>
        <p><strong>Answer:</strong> Waking up tired after a full night of sleep is usually caused by waking up during the deep sleep phase of your sleep cycle. Using a sleep calculator helps you time your waking moment to the end of a cycle, preventing sleep inertia and grogginess.</p>
        <p>Many people constantly ask themselves, "<em>Why am I tired after sleeping?</em>" The answer lies in how our bodies rest. Sleep isn't just a flat line of unconsciousness; it involves multiple intricate stages that loop throughout the night. When you use a <strong>sleep cycle calculator</strong> or a <strong>rem cycle calculator</strong>, you are actively aligning your alarms with your body's natural 90-minute rhythms, rather than guessing based on total hours.</p>

        <h3>What causes sleep inertia?</h3>
        <p>Sleep inertia is that heavy, groggy, disoriented feeling you experience when you wake up directly from Stage 3 deep sleep or <strong>REM sleep</strong>. If your alarm goes off during these critical restorative stages, your brain hasn't properly finished its repair cycles. This is exactly why you might feel noticeably worse after getting 8.5 hours of sleep than you do after 7.5 hours. To avoid this unpleasant start to your day, a <strong>sleepcalculator</strong> counts backward from your wake-up time in 90-minute chunks to find the exact moments when you naturally transition back to light sleep.</p>

        <h3>Does sleeping longer always help?</h3>
        <p>Not necessarily. Oversleeping can actually disrupt your circadian rhythm, leading to increased fatigue, headaches, and a feeling of lethargy. If you often wonder, "<strong>what time should i wake up?</strong>", remember that the core goal is consistency rather than simply maximizing time spent in bed. Aiming for consistent <strong>best sleep time</strong> blocks using a reliable <strong>sleep time calculator</strong> is much more physically effective than trying to catch up by sleeping in on weekends. Your brain needs to complete full cycles to feel genuinely rejuvenated.</p>

        <h3>How sleep cycles affect energy</h3>
        <p>Every time you complete a full sleep cycle, your resting body goes through light sleep, deep sleep, and finally REM. Waking up exactly at the end of these cycles ensures you wake up alert, positive, and energetic. Whether you use a <strong>sleep calc</strong>, type in "<strong>calculator sleep</strong>" online, or just use a simple offline mathematical method, aligning your morning schedule prevents REM disruption and keeps your daytime energy stable and predictable.</p>

        <h2>Sleep Cycles Explained</h2>
        <p><strong>Answer:</strong> A sleep cycle is a 90 to 110-minute progression through different stages of sleep: light sleep, deep sleep, and Rapid Eye Movement (REM) sleep. Most healthy adults need about 4 to 6 full cycles per night to feel properly rested.</p>
        <p>To truly understand how to optimize your rest, we need to have <strong>sleep cycles explained</strong>. When determining <strong>what time should i go to bed</strong>, it's not simply about getting exactly eight hours and calling it a night. Your brain journeys through multiple necessary stages of electrical and chemical activity multiple times before morning.</p>
        
        <h3>What is REM sleep?</h3>
        <p>REM stands for Rapid Eye Movement. It is the final, active stage of a standard sleep cycle where most vivid dreaming occurs, and your brain actively consolidates memories, processes emotions, and clears out cognitive waste. A <strong>rem calculator</strong> (frequently also known as one of the many <strong>sleep cycle calculators</strong> available) ensures you don't abruptly end this crucial phase. Interrupting REM sleep can lead to mood swings, anxiety, and poor concentration during the day.</p>
        
        <h3>How many sleep cycles do adults need?</h3>
        <p>Most practicing adults thrive on five 90-minute sleep cycles, which equals roughly 7.5 hours of total sleep time. If you have an exceptionally early morning, you might aim for four cycles (6 hours), though five to six is generally considered optimal for long-term health. Using a <strong>sleeping calculator</strong> or <strong>sleep.calculator</strong> allows you to quickly calculate the exact math based on the 15-minute average it takes to originally fall asleep. If a friend asks you "<strong>when should i wake up?</strong>", you should always advise them to base their alarm on multiples of 90 minutes.</p>
        
        <h3>Best time to wake up</h3>
        <p>The absolute best time to wake up is at the very end of a sleep cycle, which feels like a smooth, natural awakening. If you're currently trying to figure out exactly <strong>when to wake up</strong>, work backward from your morning commitments using a dedicated <strong>sleep calculator time</strong>. Finding your personal <strong>best sleep time</strong> empowers you to get up effortlessly without relying on the snooze button and sets a distinctly positive tone for your entire day ahead.</p>

        <h2>Best Bedtime for Students and Productivity</h2>
        <p><strong>Answer:</strong> The best bedtime for students is one that realistically allows for 5 to 6 full sleep cycles (7.5 to 9 hours) while keeping a strictly consistent wake-up time. Using a student sleep mode or <strong>nap calculator</strong> helps actively manage study stress and daily memory retention.</p>
        <p>Balancing rigorous academics, social life responsibilities, and physical health is notoriously difficult. A standard internet search query among teens and college students is "<strong>bedtime for students</strong>" or "<strong>what time should i go to bed</strong>." Chronic sleep deprivation profoundly and negatively affects focus in lectures, memory consolidation during exams, and overall daytime productivity.</p>

        <h3>What time should students sleep?</h3>
        <p>Students should aim to go to sleep at a consistent time every single night, typically falling somewhere between 10:30 PM and 11:30 PM, depending entirely on their morning class schedule. Consistency strictly normalizes their internal biological clock. A digital <strong>sleep cal</strong> can consistently help students thoroughly plan their night by simply inputting their first class time into the interface. Also, avoiding late-night cramming and successfully reducing screen time an hour before bed drastically improves the speed at which students fall into deep sleep stages.</p>

        <h3>Are naps helpful for studying?</h3>
        <p>Yes, midday power naps are incredibly beneficial for memory consolidation and an instantaneous cognitive refresh. However, nap timing is the most crucial element. If a daytime nap extends beyond 20 to 30 minutes, you risk entering deep sleep and waking up with debilitating sleep inertia. This is exactly why using a dedicated <strong>nap calculator</strong> is vital for modern students. It explicitly helps you time a quick 20-minute power nap or a full 90-minute cycle nap safely between intensive study sessions without accidentally ruining your nighttime resting potential.</p>

        <h3>How much sleep do teenagers need?</h3>
        <p>Teenagers naturally and biologically need more sleep than fully grown adults—often legally requiring between 8 to 10 hours per night (amounting to about 5 to 7 full sleep cycles). Their biological clocks (also known as circadian rhythms) are also naturally delayed by hormonal shifts, meaning they often biologically feel tired much later in the night. By adjusting realistic expectations and using a reliable <strong>sleep calculator</strong>, students and parents can find a healthy temporal balance that consistently maximizes their academic productivity while carefully protecting their long-term mental and physical health.</p>

<hr className="my-10 border-gray-200 dark:border-gray-800" />

        <h2 className="text-center text-3xl sm:text-4xl mt-12 mb-8">FAQs</h2>
        <FAQAccordion />

        {/* Trust Signals / Author Section */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700">
          <h3 className="text-base font-bold mt-0 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Trust & Methodology
          </h3>
          <p className="text-sm m-0 text-gray-600 dark:text-gray-400">
            Our calculator is based on peer-reviewed chronological research and the widely accepted 90-minute standard REM sleep cycle model. References include guidelines from the National Sleep Foundation and the CDC. For questions or support, visit our <Link to="/contact" className="underline hover:text-blue-600">Contact</Link> page. This tool provides estimates and does not substitute medical advice.
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
