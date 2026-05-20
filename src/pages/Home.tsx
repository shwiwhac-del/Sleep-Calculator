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
    { id: "6-12", label: "6–12 years", minCycles: 6, maxCycles: 8 },
    { id: "13-17", label: "13–17 years", minCycles: 5, maxCycles: 7 },
    { id: "18-25", label: "18–25 years", minCycles: 5, maxCycles: 6 },
    { id: "26-40", label: "26–40 years", minCycles: 5, maxCycles: 6 },
    { id: "41-60", label: "41–60 years", minCycles: 5, maxCycles: 6 },
    { id: "60+", label: "60+ years", minCycles: 4, maxCycles: 5 },
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

  const [mode, setMode] = useState<"wake" | "bed">(() => {
    return (localStorage.getItem("aurasleep_mode") as "wake" | "bed") || "wake";
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

  const timeToDate = (timeStr: string, currentMode: "wake" | "bed" = mode) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);

    if (currentMode === "wake" && d.getTime() < now.getTime()) {
      d.setDate(d.getDate() + 1);
    } else if (currentMode === "bed") {
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

  const calculateForTime = (timeStr: string, currentMode: "wake" | "bed") => {
    if (!timeStr) return;

    const baseDate = timeToDate(timeStr, currentMode);

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
      .map((r) => `${formatTime(r.date)} (${r.cycles} cycles)`)
      .join("\n");
    const fullText =
      mode === "wake"
        ? `My ideal bedtimes tonight to wake up refreshed:\n${textLines}\nCalculated via https://sleepcalculater.online`
        : `My ideal wake times to get a full night's rest:\n${textLines}\nCalculated via https://sleepcalculater.online`;

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

  const isRecommended = (cycle: number) => {
    const config = AGE_GROUPS.find((g) => g.id === ageGroup);
    if (!config) return cycle === 6 || cycle === 5;
    return cycle >= config.minCycles && cycle <= config.maxCycles;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Info */}
      <div className="flex flex-col items-center justify-center mb-6 mt-2 sm:mt-4">
        <Helmet>
          <title>
            Free Sleep Calculator | Wake Up Refreshed (90-Min REM Cycles)
          </title>
          <meta
            name="description"
            content="Struggle waking up? Use our free sleep cycle calculator to find the perfect bedtime based on natural 90-minute REM cycles. Wake up energized today."
          />
          <meta
            name="keywords"
            content="sleep calculator, bedtime calculator, sleep cycle calculator, sleep time calculator, wake up calculator, best time to sleep, healthy sleep calculator"
          />
          <link rel="canonical" href="https://sleepcalculater.online/" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Sleep Calculator",
                  url: "https://sleepcalculater.online/",
                },
                {
                  "@type": "Organization",
                  name: "Sleep Calculator",
                  url: "https://sleepcalculater.online/",
                  logo: "https://sleepcalculater.online/icon.svg",
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "support@sleepcalculater.online",
                    contactType: "customer support",
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "Sleep Cycle Calculator",
                  applicationCategory: "HealthApplication",
                  operatingSystem: "Any",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
            })}
          </script>
        </Helmet>
        <div className="flex flex-col items-center justify-center gap-2 mb-2 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">
            Free Sleep Cycle Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Calculate your exact bedtime and wake up time using natural
            90-minute REM sleep cycles.
          </p>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="w-full max-w-[580px] mx-auto mb-4 relative px-4 sm:px-0">
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="flex flex-col items-center bg-white dark:bg-[#111827]/80 dark:backdrop-blur-md border border-gray-200 dark:border-[#1e293b] rounded-[24px] p-6 sm:p-8 shadow-md dark:shadow-none relative overflow-hidden"
        >
          {/* Toggle Mode */}
          <div
            role="radiogroup"
            aria-label="Calculation mode"
            className="flex bg-gray-50 dark:bg-[#1e293b] rounded-2xl p-1.5 w-full mb-6"
          >
            <button
              role="radio"
              aria-checked={mode === "wake"}
              onClick={() => {
                setMode("wake");
                modeRef.current = "wake";
                setResults([]);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === "wake"
                  ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
              }`}
            >
              I want to wake up at
            </button>
            <button
              role="radio"
              aria-checked={mode === "bed"}
              onClick={() => {
                setMode("bed");
                modeRef.current = "bed";
                setResults([]);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === "bed"
                  ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-slate-700/60"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 border border-transparent"
              }`}
            >
              I want to sleep at
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
          <div className="flex flex-col items-center w-full mb-6">
            <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-xs font-bold mb-3">
              Age Group
            </span>
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-[480px]">
              {AGE_GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setAgeGroup(g.id);
                    setResults([]);
                  }}
                  className={`py-1.5 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                    ageGroup === g.id
                      ? "bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-sm"
                      : "bg-transparent border-gray-200 dark:border-slate-700/60 text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-slate-800/50 dark:hover:text-gray-100"
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
                <span className="ml-2 mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                  Remember my preferences
                </span>
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

      <div className="w-full max-w-[580px] mx-auto mb-10 px-4 text-center">
        <p className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed">
          Based on standard clinical 90-minute REM sleep cycle research. Results
          are estimates, not medical advice.{" "}
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
                {mode === "wake" ? (
                  <Moon className="w-full h-full" />
                ) : (
                  <Sun className="w-full h-full" />
                )}
              </motion.div>

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
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.06,
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                            recommended
                              ? "bg-gradient-to-r from-blue-50/80 to-blue-50/30 dark:from-blue-900/10 dark:to-transparent border-blue-200/80 dark:border-blue-800/40 relative overflow-hidden"
                              : "bg-gray-50/50 dark:bg-[#111827] border-gray-200/60 dark:border-[#1e293b] hover:bg-white dark:hover:bg-slate-800/80 hover:border-gray-300 dark:hover:border-slate-700"
                          }`}
                        >
                          {recommended && (
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: "200%" }}
                              transition={{
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-12"
                            />
                          )}
                          <div className="flex flex-col relative z-10">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none mb-1.5 flex items-center gap-2">
                              {formatTime(res.date)}
                              {recommended && (
                                <Sparkles
                                  className="w-4 h-4 text-[#2563EB] sm:hidden"
                                  strokeWidth={2.5}
                                />
                              )}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                              {res.cycles} cycles &bull; {res.cycles * 1.5}{" "}
                              hours
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

      {/* Sleep Guides & Tools Section */}
      <div className="w-full max-w-5xl mx-auto text-left py-8 px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">
            Tools & Guides
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl text-sm sm:text-base">
            Master your sleep with our collection of science-backed calculators
            and guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">
              Smart Bedtime Calculator
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
              Calculate exact sleep cycles to wake up feeling completely
              refreshed and energized.
            </p>
            <Link
              to="/article/smart-bedtime-calculator"
              className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm"
            >
              Use Feature
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">
              Best Time to Sleep
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
              Discover the optimal window for hitting the pillow according to
              sleep scientists.
            </p>
            <Link
              to="/article/best-sleep-time"
              className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm"
            >
              Read Guide
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">
              Power Nap Optimizer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
              Learn the exact length a nap should be to wake up energized
              instead of groggy.
            </p>
            <Link
              to="/article/power-nap-optimizer"
              className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm"
            >
              Read Guide
            </Link>
          </div>

          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">
              Deep Sleep Fixer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
              Waking up in deep sleep is the #1 cause of morning grogginess. Fix
              it today.
            </p>
            <Link
              to="/article/deep-sleep-fixer"
              className="bg-[#F8FAFC] dark:bg-[#1e293b] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 w-full text-center shadow-sm"
            >
              Use Guide
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#1D4ED8] transition-colors shadow-sm focus-visible:outline-none"
          >
            View All Sleep Guides
          </Link>
        </div>
      </div>

      {/* SEO Optimized Content Block with Interlinks */}
      <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6">
        <div
          onContextMenu={(e) => e.stopPropagation()}
          className="prose dark:prose-invert prose-sm sm:prose-base text-gray-600 dark:text-gray-300 mx-auto select-text"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-6 font-serif">
            How Does a Sleep Calculator Work?
          </h2>
          <p className="mb-4">
            If you've ever slept for eight hours but still woken up feeling
            exhausted, you might be wondering why. The answer lies in how our
            bodies process rest. A <strong>sleep calculator</strong> or{" "}
            <strong>sleep cycle calculator</strong> is a tool designed to find
            the perfect time for you to fall asleep or wake up based on your
            body's natural <strong>90-minute sleep cycles</strong>.
          </p>
          <p className="mb-4">
            Human sleep doesn't happen in one long, continuous block. Instead,
            as we rest, our brains move through multiple distinct stages of
            sleep, moving from light sleep to deep sleep, and eventually into
            REM (Rapid Eye Movement) sleep. Completing this entire sequence
            takes approximately 90 minutes. When you sleep, you repeat this
            90-minute cycle four to six times a night.
          </p>
          <p className="mb-4">
            The reason people often feel tired after oversleeping is due to
            sleep inertia. If your alarm clock wakes you up during the deepest
            part of your sleep cycle, your brain is abruptly pulled out of a
            restorative state. This creates grogginess, brain fog, and a heavy
            feeling that can take hours to shake off. Waking up <em>between</em>{" "}
            sleep cycles—when your sleep is naturally at its lightest—helps you
            start the day feeling completely energized and alert, even if your
            total sleep time is slightly shorter.
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            How Are Sleep Times Calculated?
          </h3>
          <p className="mb-4">
            A <strong>bedtime calculator</strong> works by counting backward
            from your desired wake-up time in 90-minute increments to find
            optimal bedtimes. Alternatively, if you want to go to sleep right
            now, a <strong>wake up time calculator</strong> counts forward in
            90-minute blocks to give you the best times to set your alarm.
          </p>
          <p className="mb-4">
            It's important to remember that you don't fall asleep the moment
            your head hits the pillow. On average, it takes a healthy adult
            about 15 minutes to transition from wakefulness to actual sleep. Our
            calculator automatically factors in this 15-minute buffer so that
            your <strong>sleep cycle timing</strong> is incredibly precise.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6 font-serif">
            Best Time to Sleep and Wake Up
          </h2>
          <p className="mb-4">
            Finding the <strong>best time to sleep</strong> is crucial for your
            long-term health and daily performance. While the exact hour can
            vary depending on your lifestyle and work requirements, the single
            most important factor is maintaining a consistent sleep schedule.
            Going to sleep and waking up at the same time every day—even on
            weekends—anchors your body's circadian rhythm, allowing your
            internal clock to naturally regulate your energy levels and hormone
            production.
          </p>
          <p className="mb-4">
            Health experts and sleep scientists typically recommend different
            sleep durations based on age. Adults between the ages of 18 and 64
            generally need 7 to 9 hours of total sleep per night, which equates
            to roughly five or six complete sleep cycles. Teenagers require 8 to
            10 hours, while young children and infants need significantly more.
            However, simply clocking hours in bed isn't the whole picture. Sleep
            quality fundamentally matters more than just the duration.
          </p>
          <p className="mb-4">
            Focusing on your sleep timing directly impacts how you feel the next
            day. When you string together multiple nights of high-quality,
            uninterrupted sleep cycles, the benefits are profound. Proper sleep
            timing enhances cognitive brain function, leading to sharper focus,
            better memory retention, and heightened productivity. Mentally,
            adequate rest regulates mood, reducing stress and anxiety levels.
            Physically, deep sleep is when the body repairs muscle tissue,
            strengthens the immune system, and manages cellular recovery.
            Prioritizing your bedtime habits is one of the biggest investments
            you can make in your overall health.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6 font-serif">
            Tips for Better Sleep Quality
          </h2>
          <p className="mb-4">
            Using a sleep calculator is just the first step in mastering your
            rest. If you want to fall asleep faster and stay asleep longer,
            building realistic and effective evening habits is entirely
            necessary.
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Avoid Blue Light Before Bed
          </h3>
          <p className="mb-4">
            One of the most common causes of delayed sleep is screen exposure.
            Phones, tablets, and bright televisions emit blue light, which
            tricks the brain into thinking it's still daytime. This suppresses
            the production of melatonin, your body's natural sleep hormone. Try
            explicitly avoiding screens for at least 30 to 60 minutes before
            your planned bedtime. Instead, opt for reading a book or listening
            to an audio track to wind down.
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Watch Your Caffeine Timing
          </h3>
          <p className="mb-4">
            Caffeine is a powerful stimulant with a half-life of roughly five
            hours. This means that half of the caffeine you consume at 4:00 PM
            is still actively circulating in your bloodstream at 9:00 PM. To
            protect your deep sleep phase, aim to avoid coffee, energy drinks,
            and strong teas during the late afternoon and evening hours.
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Optimize Your Bedroom Environment
          </h3>
          <p className="mb-4">
            A cool, dark, and quiet room heavily improves sleep continuity. Your
            core body temperature needs to drop slightly for optimal sleep, so
            setting the thermostat a few degrees lower is broadly recommended.
            Consider blackout curtains or a sleep mask to block ambient street
            lighting, and use a white noise machine or earplugs to drown out
            unpredictable sounds.
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Reduce Nighttime Stress
          </h3>
          <p className="mb-4">
            Racing thoughts keep people awake. Getting into the habit of
            reducing stress before sleeping is critical for high-quality rest.
            Journaling, light stretching, deep breathing exercises, or a short
            nighttime meditation can help switch your nervous system from an
            active, alert state into a relaxed, restful state. Establishing a
            consistent, calming bedtime routine tells your brain that the day is
            over, significantly improving your overall sleep efficiency and
            cycle consistency.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl mx-auto pb-12 px-4 sm:px-6">
        <section className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#1e293b] shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none rounded-[24px] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-serif text-center">
            FAQs
          </h2>
          <FAQAccordion />
        </section>
      </div>

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
