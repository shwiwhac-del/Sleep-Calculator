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

      {/* Sleep Calculator: A Smarter Way to Plan Your Sleep - New Article */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Sleep Calculator: A Smarter Way to Plan Your Sleep
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Getting enough sleep is important, but getting the right sleep at the right time is what really matters. Many people spend 8 hours in bed and still wake up feeling tired, while others sleep less and feel surprisingly refreshed. The difference often comes down to sleep cycles.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A Sleep Calculator helps you find the best bedtime and wake-up time based on natural sleep cycles. Instead of guessing when to sleep, you can use science-backed sleep timing to improve the quality of your rest.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        What Is a Sleep Calculator?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A Sleep Calculator is a simple tool that estimates the best time to go to bed or wake up. It works by calculating complete sleep cycles, which typically last around 90 minutes.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        During the night, your body moves through several stages of sleep:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Light Sleep</li>
        <li>Deep Sleep</li>
        <li>REM Sleep</li>
      </ul>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Completing these cycles before waking up can help you feel more alert and less groggy in the morning.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Why Sleep Cycles Matter
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Your body doesn't stay in the same sleep stage all night. Instead, it moves through multiple cycles. Waking up during deep sleep can leave you feeling exhausted, even if you've technically slept long enough.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        That's why many people use a:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Sleep Calculator</li>
        <li>REM Sleep Calculator</li>
        <li>Sleep Cycle Calculator</li>
        <li>Bedtime Calculator</li>
        <li>Wake-Up Time Calculator</li>
      </ul>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        These tools help align your sleep schedule with your body's natural rhythm.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Benefits of Using a Sleep Calculator
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A well-planned sleep schedule can provide several benefits:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Better morning energy</li>
        <li>Improved focus and concentration</li>
        <li>More consistent sleep habits</li>
        <li>Reduced daytime fatigue</li>
        <li>Better recovery and performance</li>
        <li>Improved productivity</li>
      </ul>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Whether you're a student, professional, parent, or athlete, sleep quality directly affects daily performance.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        How Much Sleep Do You Really Need?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Most sleep experts recommend:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Adults: 7–9 hours</li>
        <li>Teenagers: 8–10 hours</li>
        <li>Children: 9–12 hours</li>
      </ul>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        However, sleep quality is just as important as sleep quantity.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A person who completes full sleep cycles often feels better than someone who gets interrupted sleep throughout the night.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Common Sleep Mistakes
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Many people unknowingly damage their sleep quality by:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Using phones before bed</li>
        <li>Drinking caffeine late in the day</li>
        <li>Sleeping at different times every night</li>
        <li>Ignoring consistent wake-up times</li>
        <li>Spending too much time in bed awake</li>
      </ul>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Small improvements in these habits can significantly improve sleep quality.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Final Thoughts
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A Sleep Calculator makes it easier to plan your bedtime and wake-up time around natural sleep cycles. While no calculator can guarantee perfect sleep, using one can help you create a more consistent routine and wake up feeling refreshed more often.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        If you're trying to improve your sleep, increase productivity, or simply feel better in the morning, understanding sleep cycles is one of the easiest places to start.
      </p>

      {/* Article 2: Sleep Calculator: Find the Best Time to Sleep and Wake Up */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Sleep Calculator: Find the Best Time to Sleep and Wake Up
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Have you ever slept for 8 hours but still felt exhausted in the morning? You're not alone. Many people focus only on the number of hours they sleep, but sleep timing is often just as important as sleep duration.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A Sleep Calculator helps you plan your bedtime and wake-up time based on natural sleep cycles. Instead of guessing when to sleep, you can calculate the best sleep schedule and wake up feeling more refreshed.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Why Do Sleep Cycles Matter?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Sleep is not a single state. Throughout the night, your body moves through multiple sleep stages, including light sleep, deep sleep, and REM sleep. Together, these stages form a sleep cycle that typically lasts around 90 minutes.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        When you wake up in the middle of deep sleep, you may feel tired, sluggish, and unfocused. Waking up at the end of a complete sleep cycle can make mornings easier and help you feel more alert.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        This is why many people use a Sleep Cycle Calculator or REM Sleep Calculator to improve their sleep routine.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        How a Sleep Calculator Works
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A Sleep Calculator estimates the ideal bedtime or wake-up time by counting complete sleep cycles.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Instead of simply aiming for 8 hours of sleep, the calculator helps you align your sleep schedule with your body's natural rhythm.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Benefits include:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Better sleep quality</li>
        <li>Easier mornings</li>
        <li>Improved concentration</li>
        <li>Reduced sleep inertia</li>
        <li>More consistent sleep habits</li>
        <li>Better overall well-being</li>
      </ul>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Common Reasons You Wake Up Tired
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Many people assume they need more sleep when they wake up tired. In reality, several factors can affect sleep quality.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Common causes include:
      </p>

      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-base sm:text-lg md:text-[1.125rem] select-text">
        <li>Irregular sleep schedules</li>
        <li>Waking up during deep sleep</li>
        <li>Excessive screen time before bed</li>
        <li>Stress and anxiety</li>
        <li>Poor sleep environment</li>
        <li>Late-night caffeine consumption</li>
        <li>Interrupted sleep cycles</li>
      </ul>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A Bedtime Calculator can help create a more consistent routine and reduce some of these issues.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Best Sleep Tips for Better Rest
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        If you want to improve your sleep naturally, consider these proven habits:
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100 mt-2 select-text">
        Follow a Consistent Schedule
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Try to sleep and wake up at the same time every day, including weekends.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100 mt-2 select-text">
        Avoid Screens Before Bed
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Blue light from phones, tablets, and laptops can interfere with melatonin production and make it harder to fall asleep.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100 mt-2 select-text">
        Create a Comfortable Sleep Environment
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        A cool, dark, and quiet room often supports better sleep quality.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100 mt-2 select-text">
        Limit Caffeine Late in the Day
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Coffee, tea, and energy drinks can stay in your system for several hours.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100 mt-2 select-text">
        Use a Sleep Calculator
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Planning your bedtime around complete sleep cycles may help reduce morning grogginess and improve overall sleep consistency.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        How Much Sleep Do Adults Need?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        According to general sleep recommendations, most adults should aim for 7 to 9 hours of sleep each night.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        However, individual needs vary. Some people function well with slightly less sleep, while others require more rest to feel their best.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        The goal is not only getting enough sleep but also maintaining good sleep quality and healthy sleep habits.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4 select-text">
        <div>
          <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100">
            What is a Sleep Calculator?
          </p>
          <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300">
            A Sleep Calculator is a tool that helps estimate the best bedtime or wake-up time based on natural sleep cycles.
          </p>
        </div>

        <div>
          <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100">
            What is a REM Sleep Calculator?
          </p>
          <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300">
            A REM Sleep Calculator focuses on sleep cycle timing, helping users align their sleep schedule with REM and other important sleep stages.
          </p>
        </div>

        <div>
          <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100">
            Is a 90-Minute Sleep Cycle Accurate?
          </p>
          <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300">
            Sleep cycles vary between individuals, but 90 minutes is commonly used as an average estimate.
          </p>
        </div>

        <div>
          <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-gray-100">
            What Is the Best Time to Go to Bed?
          </p>
          <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300">
            The best bedtime depends on when you need to wake up and how much sleep your body requires. A Sleep Calculator can help determine suitable options.
          </p>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 pt-3">
        Improve Your Sleep Schedule Today
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 select-text">
        Good sleep is one of the most important foundations of physical health, mental performance, productivity, and recovery. Whether you're looking for the best bedtime, ideal wake-up time, or a smarter way to manage your sleep routine, a Sleep Calculator can help you make informed decisions.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-slate-300 pb-1 select-text">
        By understanding sleep cycles and maintaining consistent sleep habits, you can improve sleep quality, wake up feeling more refreshed, and build a healthier daily routine.
      </p>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-100 pt-4 text-center w-full">
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
