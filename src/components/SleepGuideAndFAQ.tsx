import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function SleepGuideAndFAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What time should I go to bed?",
      a: "The best bedtime depends on when you need to wake up. Our Sleep Calculator uses 90-minute sleep cycles to suggest optimal bedtimes that may help you wake up feeling more refreshed."
    },
    {
      q: "What time should I wake up?",
      a: "Most adults benefit from 7–9 hours of sleep. The ideal wake-up time should align with your daily schedule while allowing enough time for complete sleep cycles."
    },
    {
      q: "How does a sleep cycle calculator work?",
      a: "A sleep cycle calculator estimates bedtime and wake-up times based on average 90-minute sleep cycles, including light sleep, deep sleep, and REM sleep."
    },
    {
      q: "Why am I tired after sleeping?",
      a: "You may feel tired after sleeping if you wake up during deep sleep, have an inconsistent sleep schedule, experience poor sleep quality, or do not get enough restorative sleep."
    },
    {
      q: "How many sleep cycles do I need?",
      a: "Most adults complete 5–6 sleep cycles per night, which typically equals around 7.5–9 hours of sleep."
    }
  ];

  return (
    <div className="w-full max-w-[42rem] mx-auto mt-6 mb-2 px-4 text-slate-300 select-none font-sans text-left space-y-4 content-visible-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-100 tracking-tight leading-tight">
        Sleep Calculator – Find the Best Time to Sleep and Wake Up
      </h2>
      
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Getting enough sleep is important, but sleep timing matters just as much. Our free Sleep Calculator helps you find the best bedtime and wake-up time based on natural 90-minute sleep cycles. Instead of waking up in the middle of deep sleep, you can plan your rest around complete sleep cycles and wake up feeling more refreshed.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Whether you're wondering "what time should I go to bed?", "what time should I wake up?", or looking for a reliable sleep cycle calculator, this tool provides personalized sleep schedules in seconds.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-1">
        How Does the Sleep Calculator Work?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A typical sleep cycle lasts about 90 minutes and includes light sleep, deep sleep, and REM sleep. Most adults complete 4–6 sleep cycles each night. By calculating bedtime and wake-up times around these cycles, a sleep calculator can help reduce morning grogginess and improve sleep quality.
      </p>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        <p className="font-semibold text-gray-100 mb-1">Simply enter:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>The time you want to wake up, or</li>
          <li>The time you plan to go to bed</li>
        </ul>
      </div>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 pb-1 select-text">
        The calculator will suggest the best sleep times based on complete sleep cycles.
      </p>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-100 pt-2 text-center w-full">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div
              key={index}
              className="bg-[#0f172a]/40 dark:bg-[#1e293b]/20 border border-gray-250/20 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all duration-305 hover:border-[#2563EB]/45 dark:hover:border-[#2563EB]/45"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-gray-100 dark:text-gray-100 hover:bg-gray-50/5 dark:hover:bg-slate-800/10 transition-colors focus:outline-none cursor-pointer"
              >
                <span className="text-base sm:text-lg pr-4 font-bold text-gray-100">{faq.q}</span>
                <ChevronDown className={`w-5.5 h-5.5 text-[#2563EB] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-gray-200/10 dark:border-slate-800/60"
                  >
                    <p className="p-5 text-sm sm:text-base text-slate-300 dark:text-slate-300 leading-relaxed bg-white/[0.01] dark:bg-slate-900/[0.04] select-text">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
