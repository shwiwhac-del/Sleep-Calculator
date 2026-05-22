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
        <p><strong>Answer:</strong> A <strong>sleep calculator</strong> or high-accuracy <strong>sleep calc</strong> works by counting backward or forward in 90-minute increments to find the exact moment your body transitions between sleep cycles. This helpful <strong>sleep tool</strong> assists you to <strong>wake up refreshed</strong>. Using a science-backed <strong>sleep schedule calculator</strong> prevents morning grogginess and ensures you wake up at a optimal point.</p>
        <p>Human rest consists of repeating <strong>90-minute REM sleep cycles</strong>. If you wake up in the middle of a deep sleep cycle, you will experience "sleep inertia" (feeling tired and sluggish). Because it takes the average person about 15 minutes to fall asleep, a high-quality <strong>bedtime calculator</strong> and <strong>wake up calculator</strong> factors in this latency time to give you a highly accurate sleep schedule. This <strong>science based sleep calculator</strong> serves as an interactive <strong>sleep timer</strong> and <strong>sleep planner</strong> to help you <strong>calculate my sleep cycles</strong> safely.</p>

        <h2>What is the Best Time to Sleep and Wake Up?</h2>
        <p><strong>Answer:</strong> The best time to sleep depends on what your desired <strong>wake up time</strong> is, adjusting for 4 to 6 full 90-minute sleep cycles. Consistent sleep quality is a foundation of overall body energy. When people ask, <em>"how sleep cycles work?"</em> or want <strong>sleep cycles explained</strong>, they discover that regular sleep routines are much better than hitting snooze.</p>
        <p>This <strong>ideal sleep time calculator</strong> and <strong>sleep planner online</strong> presents the <strong>best sleep time for adults</strong> and teenagers based on medical parameters:</p>
        <ul className="list-disc pl-5 my-4">
          <li><strong>Adults (18-64):</strong> 7 to 9 hours of sleep (5-6 cycles) - use our <strong>sleep cycle calculator for adults</strong> to find your <strong>ideal bedtime</strong>.</li>
          <li><strong>Teenagers (13-17):</strong> 8 to 10 hours of sleep (5-7 cycles) - see our <strong>sleep cycle calculator for teens</strong> or <strong>bedtime calculator for teens</strong>.</li>
          <li><strong>Children & Students:</strong> 9 to 11 hours of sleep (6-8 cycles) - use the <strong>bedtime calculator for school students</strong>.</li>
        </ul>
        <p>Finding the <strong>best bedtime</strong> and learning <strong>how many sleep cycles do i need</strong> is key to daily focus. For deeper insights, visit our highly detailed <Link to="/blog" className="underline font-semibold hover:text-[#2563EB]">Sleep Blog</Link>.</p>

        <h2>Tips for Better Sleep Quality & Sleep Optimization</h2>
        <p>To achieve <strong>healthy sleep</strong> and improve your regular <strong>sleep routine</strong>, follow these clean, evidence-backed rules of <strong>sleep science</strong>:</p>
        
        <h3>1. Establish a Consistent Bedtime Routine</h3>
        <p>Maintaining a restorative <strong>bedtime routine</strong> and stable <strong>sleep schedule</strong> programs your brain's clock. Going to bed at your <strong>best sleep time</strong> helps you fall asleep faster and naturally optimizes your <strong>circadian rhythm</strong>.</p>

        <h3>2. Avoid Screens Before Bed</h3>
        <p>Blue light emissions from phones disrupt our natural pineal melatonin production. Turn off devices 30 minutes before your calculated <strong>ideal bedtime</strong> to maintain high <strong>sleep quality</strong>.</p>
        
        <h3>3. Factor in Sleep Latency</h3>
        <p>Since people rarely fall asleep instantly, our <strong>smart sleep calculator</strong> and <strong>sleep wake calculator</strong> accounts for an average 15-minute sleep latency. If you ask yourself <em>"what time should i sleep if i wake up at 5am?"</em>, a <strong>smart bedtime calculator</strong> provides the exact times to get in bed.</p>

        <h3>4. Manage Your Sleep Debt</h3>
        <p>If you've had late nights, you've accumulated <strong>sleep debt</strong>. Instead of oversleeping on the weekend, use our <strong>sleep hours calculator</strong> and <strong>90 minute sleep cycle tool</strong> to gradually recover without throwing off your normal cycle.</p>


        <h2>Why Am I Tired After Sleeping? Why Do I Wake Up Tired?</h2>
        <p><strong>Answer:</strong> Waking up tired (also known as <em>why do i wake up tired</em>) after a full night of rest is usually caused by waking up during Stage 3 deep sleep. Utilizing a <strong>free sleep calculator</strong> or <strong>online sleep calculator</strong> helps you time your waking moment to the end of a cycle, avoiding sleep inertia and feeling groggy.</p>
        <p>Many people ask, <strong>"why am i tired after sleeping?"</strong> or search for <strong>how to wake up refreshed</strong>. The reason is that sleep is not a flat state of rest. When you use a <strong>sleep cycle calculator</strong> or a <strong>rem cycle calculator</strong>, you are aligning your morning alarms with your body's natural 90-minute rhythm instead of guessing based on total hours. This <strong>ideal wake up time tool</strong> and <strong>sleep cycle timing calculator</strong> enables you to <strong>wake up fresh</strong> every single morning.</p>

        <h3>What is deep sleep and what is REM sleep?</h3>
        <p>To achieve <strong>sleep optimization</strong>, we must differentiate between stages. <strong>What is deep sleep?</strong> It is the stage where your physical body repairs tissues, builds muscle, and cleans waste from brain cells. <strong>What is REM sleep?</strong> Rapid Eye Movement sleep is the mental stage where memories are consolidated, emotions are processed, and dreams occur. Our <strong>REM sleep calculator</strong> and <strong>REM calculator</strong> helps ensure your <strong>sleep alarm</strong> doesn't ring right in the middle of these deep phases, helping you learn <strong>how to wake up without feeling tired</strong>.</p>

        <h3>Why oversleeping makes you tired</h3>
        <p>If you wonder <strong>why oversleeping makes you tired</strong>, it's because staying in bed too long disrupts your body's <strong>circadian rhythm</strong>, resetting your biological clock and causing you to wake up in a deep wave stage. Instead of oversleeping, find your <strong>best wake up time calculator</strong> sweet spots and understand <strong>how long is a sleep cycle</strong> (usually about 90 to 110 minutes).</p>

        <h3>How to improve sleep quality</h3>
        <p>Learning <strong>how to improve sleep quality</strong> and <strong>how to sleep better at night</strong> is simple with a <strong>science based sleep calculator</strong>. Ensure your bedroom is completely dark and quiet, avoid late-afternoon caffeine, and let our <strong>perfect bedtime calculator</strong> map out your night. This <strong>sleep calculator online free</strong> ensures you <strong>wake up happy calculator</strong> status every single morning.</p>


        <h2>Sleep Cycles Explained: Your Guide to Sleep Cycle Timing</h2>
        <p><strong>Answer:</strong> A complete sleep cycle is a 90 to 110-minute progression through light sleep, deep sleep, and Rapid Eye Movement (REM) sleep. Successful transition between these stages is what determines daily brain performance.</p>
        <p>Our <strong>sleep cycle timing</strong> section explains that when deciding <strong>what time should i go to bed</strong> or <strong>when should i wake up</strong>, you should always count in multiples of 90 minutes. A reliable <strong>bedtime sleep calculator</strong> or <strong>sleeping calculator</strong> helps you <strong>calculate my sleep cycles</strong> so you can wake up at the precise transition point.</p>
        
        <h3>How REM sleep affects memory and learning</h3>
        <p>Studies in sleep research prove <strong>how REM sleep affects memory</strong> and cognitive performance. When REM stages are interrupted, your brain struggles to store new information. Using a <strong>sleep calculator with REM cycles</strong> and <strong>sleep tracker</strong> safeguards these dream periods. Whether using a <strong>mobile sleep calculator</strong> or a standard laptop, our <strong>sleep calculator no signup</strong> tool has you covered.</p>
        
        <h3>How many hours should i sleep?</h3>
        <p>When asking <strong>how many hours should i sleep</strong> or <strong>what time should i wake up</strong>, remember that completing five full cycles (7.5 hours) or six cycles (9 hours) is optimal for adults. Use our <strong>sleep calculator with alarm</strong> parameters to align your bedroom alarm clock with these natural biology blocks.</p>


        <h2>Best Bedtime for Students: Student Sleep Calculator for Exams</h2>
        <p><strong>Answer:</strong> The <strong>best bedtime for students</strong> is one that allows for 5 to 6 full sleep cycles (7.5 to 9 hours) while keeping a strictly consistent wake-up schedule. Using a specialized <strong>sleep calculator for students</strong> or <strong>sleep calculator for school</strong> helps manage academic fatigue and improves studying memory retention.</p>
        <p>Balancing high school or university studies, part-time jobs, and homework is incredibly hard. Many search for the <strong>best sleep schedule for students</strong>, <strong>bedtime for college students</strong>, or a <strong>bedtime planner</strong> to survive exam periods. Chronic fatigue directly impairs your brain's performance.</p>

        <h3>How sleep affects productivity, concentration, and focus</h3>
        <p>Science shows <strong>how sleep affects productivity</strong> and <strong>how sleep affects concentration</strong>. Even one night of poor sleep blocks your prefrontal cortex from making clear analytical decisions. Using a <strong>best sleep schedule for focus</strong> and a <strong>sleep calculator for exams</strong> helps you score higher on tests by ensuring your brain processes everything you read the night before.</p>

        <h3>Using a Nap Calculator for Productivity & Power Naps</h3>
        <p>If you have tight schedules, a <strong>quick nap calculator</strong> can keep you going. But <strong>why do naps make me tired?</strong> If your nap goes over 20-30 minutes, you enter deep sleep and wake up groggy. To prevent this, use our <strong>nap calculator for productivity</strong> or <strong>nap time calculator</strong> to time a perfect 20-minute <strong>power nap</strong> or a full 90-minute cycles. Waking up from the <strong>best time for a power nap</strong> clears out brain blockages, acts as an energy booster, and supports a <strong>healthy bedtime routine for students</strong>.</p>

        <h3>Establishing a Sleep Schedule</h3>
        <p>If you're looking for the <strong>best bedtime based on wake up time</strong>, such as the <strong>ideal bedtime for waking up at 6am</strong> or <strong>what time should i sleep if i wake up at 5am</strong>, simply input those values into our <strong>ai sleep calculator</strong> or <strong>sleep cycle calculator online free</strong>. In seconds, this <strong>sleep calculator for productivity</strong> gives you your optimal schedules. Follow your customized <strong>best bedtime for productivity</strong> and learn <strong>how to fix sleep schedule</strong> issues once and for all.</p>

        <h2>Circadian Rhythm Syncing: Harnessing Your Biological Clock with a Sleep Planner</h2>
        <p>Your body has an internal 24-hour clock known as the <strong>circadian rhythm</strong> that works in tandem with natural sunlight and temperature changes to control alertness and sleepiness. If your daily schedule is out of alignment with this internal clock, waking up can feel incredibly painful, even if you spent eight or nine hours in bed. To solve this, a modern <strong>sleep tracker</strong> and digital <strong>sleep planner</strong> helps you organize consistent resting patterns.</p>
        
        <h3>The connection between light, temperature, and circadian health</h3>
        <p>Your brain releases cortisol in the morning to wake you up and begins producing melatonin as the sun goes down to ease you into a <strong>healthy sleep</strong> state. If you disrupt this cycle with blue-light exposure or inconsistent sleeping habits, you risk severe fatigue. Using an <strong>ideal sleep time calculator</strong> or a web-based <strong>sleep cycle app</strong> to map out consistent sleep-wake targets supports your cognitive health, hormonal balance, and metabolic speed.</p>
        
        <h3>Steps for circadian optimization and matching your best sleep time</h3>
        <p>To align your body's rhythm and ensure you always <strong>wake up fresh</strong>, implement these simple, high-impact strategies:</p>
        <ul className="list-disc pl-5 my-4">
          <li><strong>Sunlight Exposure:</strong> Get 10–15 minutes of natural sunlight first thing in the morning to halt melatonin production and reset your daily timer.</li>
          <li><strong>Consistent Awakenings:</strong> Wake up at the same hour every single day—even on weekends—to maintain a predictable <strong>sleep routine</strong>.</li>
          <li><strong>Dim Light Environments:</strong> Lower the lights in your home two hours before your calculated <strong>ideal bedtime</strong>.</li>
          <li><strong>Smart Alarm Scheduling:</strong> Use a precise <strong>sleep alarm</strong> aligned with standard 90-minute intervals to prevent grogginess.</li>
        </ul>
        <p>By using our <strong>circadian rhythm sleep calculator</strong>, you can design a custom timetable that synchronizes your work obligations with your body's natural preferences, promoting sustained daily energy and lasting mental focus.</p>

        <h2>How to Fix Sleep Schedule Shifts: Overcoming Accumulated Sleep Debt</h2>
        <p>Whether you've just returned from international travel, pulled an all-nighter for university exams, or simply let your hours drift on the weekend, a disrupted <strong>sleep schedule</strong> can leave you feeling chronically exhausted. When people experience this fatigue, they immediately ask <strong>how to fix sleep schedule</strong> patterns before Monday morning arrives. The key is structural consistency rather than sleeping in or attempting to compensate with massive chunks of daytime sleep.</p>
        
        <h3>Understanding sleep debt and how your body recovers</h3>
        <p>If you consistently sleep less than your body requires, you accumulate <strong>sleep debt</strong>. You cannot erase five hours of sleep debt in a single weekend afternoon; trying to do so by sleeping in until noon will merely push back your next night's sleep drive, initiating a cycle of Sunday-night insomnia. Instead, calculate your target hours using a trustworthy <strong>sleep hours calculator</strong> and rely on your body's homeostatic sleep drive to naturally restore internal chemistry over two to three light, aligned nights.</p>

        <h3>Actionable tips to rebuild a healthy bedtime routine and wake up refreshed</h3>
        <p>If you've been searching for <strong>how to sleep better at night</strong> or <strong>how to wake up without feeling tired</strong>, you can use these guidelines to retrain your internal system step-by-step:</p>
        <ul className="list-disc pl-5 my-4">
          <li><strong>Shift Your Windows Incrementally:</strong> If your sleeping cycle is thrown off by hours, do not try to fix it instantly. Move your target bedtimes and awakenings in gentle 15-minute increments per day.</li>
          <li><strong>Plan Around Standard Multiples:</strong> Always use a <strong>sleep calculator based on 90 minute cycles</strong> to make sure that no matter when you fall asleep, you'll still <strong>wake up at the end of sleep cycle</strong> transitions.</li>
          <li><strong>Integrate a Relaxing Wind-Down:</strong> Spend 30 minutes reading, practicing deep breathing, or journaling. A predictable <strong>bedtime routine</strong> signals to the autonomic nervous system that it is safe to down-regulate.</li>
          <li><strong>Trust the Math:</strong> Let our <strong>bedtime sleep calculator</strong> find your <strong>best bedtime based on wake up time</strong> parameters, and stick to that window to rebuild circadian baseline strength.</li>
        </ul>
        <p>Reclaiming a healthy, responsive biological clock is straightforward with the right tools. Applying mathematical principles to your daily sleep timings is the most sustainable way to optimize cognitive stamina and feel completely recharged every morning.</p>

<hr className="my-10 border-gray-200 dark:border-gray-800" />

        <h2 className="text-center text-3xl sm:text-4xl mt-12 mb-8">FAQs</h2>
        <FAQAccordion />

        {/* Trust & Methodology Section */}
        <div className="mt-12 p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-900/20 rounded-[24px] border border-gray-200 dark:border-slate-800 text-left">
          <h3 className="text-xl font-bold mt-0 mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] inline-block"></span> Trust & Methodology
          </h3>
          <p className="text-base m-0 text-gray-600 dark:text-gray-300 leading-relaxed font-sans select-text">
            Our calculator is based on peer-reviewed chronological research and the widely accepted 90-minute standard REM sleep cycle model. References include guidelines from the National Sleep Foundation and the CDC. For questions or support, visit our <Link to="/contact" className="underline text-[#2563EB] hover:underline font-semibold">Contact</Link> page. This tool provides estimates and does not substitute medical advice.
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
