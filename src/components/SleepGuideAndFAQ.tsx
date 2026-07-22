import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronDown, Calendar, Clock, ArrowRight, Star, Quote } from "lucide-react";
import RecommendedSleepGuides from "./RecommendedSleepGuides";

export default function SleepGuideAndFAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why do I feel exhausted even after sleeping 8 full hours?",
      a: "It's one of the most frustrating feelings—you went to bed on time, slept 8 hours, but woke up feeling like a truck hit you. The reason is usually timing, not total hours. Human sleep occurs in 90-minute cycles. An 8-hour sleep forces your alarm to ring around 5.3 cycles, right in the middle of deep stage-3 slow-wave sleep. Waking up during deep sleep causes severe 'sleep inertia'—a heavy, groggy brain fog. Try aiming for 7.5 hours (5 cycles) or 9 hours (6 cycles) instead, and you'll likely notice an immediate jump in morning alertness."
    },
    {
      q: "What should I do if my mind starts racing as soon as my head hits the pillow?",
      a: "When you finally slow down at night, all the thoughts and worries you suppressed during the day come rushing in. Try a simple 'brain dump' 30 minutes before bed: write down everything on your mind or tomorrow's to-do list on paper. Getting it out of your head signals to your nervous system that it's safe to rest. Also, lower your bedroom temperature to around 65–68°F (18–20°C) and dim lights early to help your body naturally release melatonin."
    },
    {
      q: "Why do I keep waking up at 3 AM and struggle to fall back asleep?",
      a: "Waking up around 2 to 4 AM is very common because your body naturally spends more time in lighter sleep during the second half of the night. If a minor noise, temperature shift, or stress spike wakes you up, looking at the clock often causes immediate anxiety ('Oh no, I only have 3 hours left!'). If you're wide awake after 20 minutes, don't force it—get out of bed, sit in dim light, read a book, and only return to bed when your eyelids feel heavy."
    },
    {
      q: "Is hitting the snooze button actually hurting my energy levels?",
      a: "Yes, even though those extra 9 minutes feel comforting, snoozing actually harms your morning energy. When you hit snooze and drift back off, your brain starts a brand-new sleep cycle that it can't finish. When the alarm rings again 9 minutes later, you are yanked out of fragmented sleep, leaving you feeling groggier than getting up on the first alarm. Setting your alarm for the actual time you need to get up and placing your phone across the room can break the habit."
    },
    {
      q: "How can I fix my sleep schedule after staying up late on weekends?",
      a: "Shift your routine gradually rather than trying to force sleep 2 hours earlier in a single night. The most effective anchor is keeping your wake-up time strict, even on weekends. When you wake up at the same time every morning and get immediate natural daylight exposure, your body builds healthy sleep pressure, making you naturally tired at the right time that evening."
    },
    {
      q: "How long is a good power nap, and when is the best time to take one?",
      a: "The golden rule for power naps is either 20 minutes or a full 90 minutes. A 20-minute nap gives your brain a quick reset without entering deep sleep, avoiding post-nap grogginess. A 90-minute nap lets you complete one full sleep cycle for deeper mental recovery. Try to take your nap before 3:00 PM so it doesn't steal away your nighttime sleepiness."
    },
    {
      q: "How many sleep cycles do I actually need every night?",
      a: "Most healthy adults feel best with 5 to 6 completed cycles per night (7.5 to 9 hours of total sleep). However, quality matters just as much as quantity. Five uninterrupted cycles will leave you feeling much more energized than 8 hours of restless, fragmented sleep."
    },
    {
      q: "What is sleep latency and how long should it take me to fall asleep?",
      a: "Sleep latency is simply the time it takes you to drift off from full wakefulness. For a healthy person, taking 15 to 20 minutes to fall asleep is completely normal and healthy. Falling asleep instantly (under 5 minutes) usually means you are severely sleep-deprived, while taking over 30 to 45 minutes suggests your circadian rhythm might be shifted or your mind is overly stimulated."
    }
  ];

  return (
    <article className="w-full max-w-[42rem] mx-auto mt-6 mb-2 px-0 text-[#374151] select-none font-sans text-left space-y-4 content-visible-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
        Sleep Calculator – Find the Perfect Time to Sleep and Wake Up
      </h2>
      
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Sleep affects everything—from your energy and focus to your mood and <a href="https://www.health.harvard.edu/newsletter_article/sleep-and-mental-health" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline font-semibold">overall health</a>. Yet millions of people struggle with poor sleep, inconsistent routines, and waking up tired even after spending enough hours in bed.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Our Sleep Calculator helps you find the best time to go to bed and the ideal wake up time based on natural sleep cycles. Whether you're looking for a Sleep Cycle Calculator, REM Sleep Calculator, Nap Calculator, or Sleep Calculator by Age, this tool helps you build a healthier sleep schedule and improve sleep quality.
      </p>

      {/* Specialized Calculators Block */}
      <div className="my-10" id="specialized-calculators-links">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight mb-3 flex items-center gap-2 font-sans">
          <span className="p-1.5 bg-[#7C3AED]/10 rounded-lg inline-flex items-center justify-center">
            <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
          </span>
          Specialized Sleep Planners & Calculators
        </h3>
        <p className="text-[#374151] mb-6 text-sm sm:text-base leading-relaxed">
          Select one of our highly customized biological planners below to manage unique life schedules and circadian targets directly:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="links-grid">
          <Link
            to="/student-sleep-calculator"
            className="group flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC] hover:border-[#7C3AED] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#7C3AED] transition-colors">Student & Exam Planner</span>
              <span className="text-xs text-[#6B7280]">For teenagers, kids, and study routines</span>
            </div>
            <span className="p-1 bg-[#7C3AED]/5 group-hover:bg-[#7C3AED] rounded-lg transition-colors duration-200">
              <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
            </span>
          </Link>
          <Link
            to="/shift-work-sleep-calculator"
            className="group flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC] hover:border-[#7C3AED] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#7C3AED] transition-colors">Night Shift Work Planner</span>
              <span className="text-xs text-[#6B7280]">For doctors, security, and split shifts</span>
            </div>
            <span className="p-1 bg-[#7C3AED]/5 group-hover:bg-[#7C3AED] rounded-lg transition-colors duration-200">
              <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
            </span>
          </Link>
          <Link
            to="/sleep-cycle-calculator-90-minutes"
            className="group flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC] hover:border-[#7C3AED] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#7C3AED] transition-colors">90-Min Cycle Customizer</span>
              <span className="text-xs text-[#6B7280]">Adjust latency & custom cycle durations</span>
            </div>
            <span className="p-1 bg-[#7C3AED]/5 group-hover:bg-[#7C3AED] rounded-lg transition-colors duration-200">
              <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
            </span>
          </Link>
          <Link
            to="/wake-up-between-sleep-cycles"
            className="group flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC] hover:border-[#7C3AED] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#7C3AED] transition-colors">Refresh Fatigue Planner</span>
              <span className="text-xs text-[#6B7280]">Avoid waking up in deep slow-wave stages</span>
            </div>
            <span className="p-1 bg-[#7C3AED]/5 group-hover:bg-[#7C3AED] rounded-lg transition-colors duration-200">
              <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
            </span>
          </Link>
          <Link
            to="/ideal-bedtime-based-on-wake-up-time"
            className="sm:col-span-2 group flex items-center justify-between p-4 bg-[#FAF6F0] rounded-2xl border border-[#E1D8CC] hover:border-[#7C3AED] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#7C3AED] transition-colors">Ideal Bedtime Calculator (All Ages)</span>
              <span className="text-xs text-[#6B7280]">Toddlers, teenagers, adults, and seniors schedules</span>
            </div>
            <span className="p-1 bg-[#7C3AED]/5 group-hover:bg-[#7C3AED] rounded-lg transition-colors duration-200">
              <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
            </span>
          </Link>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        What Is a Sleep Calculator?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        A Sleep Calculator estimates the best sleep time and wake-up time using complete sleep cycles. Instead of simply counting hours, it helps you plan your sleep around how your body naturally rests and recovers during the night. Waking up at the right time is easier when you calculate the <strong>ideal bedtime based on wake up time</strong>.
      </p>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text my-4 space-y-4">
        <p>
          Circadian requirements shift heavily across different stages of life. Here is how sleep cycles can be optimized for specific ages:
        </p>
        <ul className="list-disc pl-5 space-y-3 text-base">
          <li>
            <strong>Students & Exam Preparation</strong>: Late-night studying increases cognitive fatigue and builds heavy adenosine pressure. Timing sleep so study sessions end at complete 90-minute cycle boundaries protects REM sleep, which is critical for long-term memory consolidation and recall during morning exams.
          </li>
          <li>
            <strong>Night Shift Workers</strong>: Daytime sleep conflicts with your master circadian pacemaker (the suprachiasmatic nucleus) and natural sunlight exposure. Structuring split sleep schedules or multi-cycle day resting blocks helps anchor internal rhythms and reduce cumulative sleep debt.
          </li>
          <li>
            <strong>Teenagers & Adolescents</strong>: During puberty, the brain undergoes a natural delayed circadian phase preference—melatonin releases up to two hours later at night. Planning bedtimes around 5 to 6 full cycles ensures teens get the 8 to 10 hours required for hormonal growth and emotional balance.
          </li>
          <li>
            <strong>Infants & Toddlers</strong>: Developing brains require 11 to 14 total hours of daily sleep, divided into nighttime sleep and daytime naps. Syncing nap durations with natural sleep stage transitions prevents toddlers from waking up cranky or overly stimulated.
          </li>
        </ul>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        How Many Sleep Cycles Do I Need?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        If you have ever asked yourself, <strong>how many sleep cycles do i need</strong>, the scientific answer is that most healthy adults benefit from <strong>5 to 6 completed sleep cycles</strong> per night. This translates to approximately 7.5 to 9 hours of total sleep. Each complete human sleep cycle lasts approximately 90 minutes.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Using the <strong>best bedtime calculator</strong> to sync your sleep schedules makes it easy to set consistent, healthy standards.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        How to Wake Up Feeling Refreshed
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        To understand exactly <strong>how to wake up feeling refreshed</strong>, the secret lies in avoiding waking up during the middle of deep slow-wave sleep. If your alarm sounds while your brain is in deep deep sleep, you will suffer from severe morning sleep inertia, leaving you feeling weary and sluggish for hours.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        By matching your bedtime to complete sleep cycles, you can learn to <strong>wake up between sleep cycles</strong> naturally, keeping your mornings bright, energetic, and fully restored.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Sleep Cycle Calculator 90 Minutes Standard
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Every standard <strong>sleep cycle calculator 90 minutes</strong> algorithm coordinates bedtime plans based on the natural human sleep loop. Each sleep loop flows through light sleep, deep sleep, and REM stages. Using the standard 90 minutes sleep cycle calculator pattern makes determining the <strong>ideal bedtime based on wake up time</strong> clean and reliable.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text font-semibold">
        You're not alone.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text font-normal">
        The best bedtime depends on your desired wake-up time and the number of sleep cycles you want to complete. A Bed Time Calculator can help determine a bedtime that aligns with your natural sleep patterns.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Understanding Sleep Cycles
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Your body moves through several <a href="https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline font-semibold">sleep stages</a> every night, including light sleep, deep sleep, and REM sleep.
      </p>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        <p className="font-semibold text-[#111827] mb-1">REM sleep plays an important role in:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
          <li>Memory</li>
          <li>Learning</li>
          <li>Mental recovery</li>
          <li>Emotional health</li>
        </ul>
      </div>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        A REM Sleep Calculator or REM Calculator can help you understand how sleep cycles affect the quality of your rest.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Why Do I Wake Up Tired?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Many people feel sleepy even after a full night's sleep.
      </p>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        <p className="font-semibold text-[#111827] mb-1">Common questions include:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
          <li>I am sleepy all day</li>
          <li>Why am I sleepy?</li>
          <li>Why do I wake up tired?</li>
        </ul>
      </div>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Possible reasons include poor sleep quality, inconsistent sleep schedules, stress, and interrupted sleep cycles.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Using a Sleep Schedule and maintaining a consistent bedtime can help improve sleep quality over time.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Nap Calculator for Better Daytime Rest
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Short naps can improve focus and energy when used correctly.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        A Nap Calculator helps you determine the ideal nap length so you can wake up feeling refreshed instead of groggy.
      </p>

      <div className="bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 my-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-serif">
          Common Real-World Sleep Questions
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <h4 className="text-base sm:text-lg font-bold text-[#7C3AED] dark:text-violet-400">
              "If I have to wake up at 6:00 AM, what time should I actually turn off the light?"
            </h4>
            <p className="text-sm sm:text-base text-[#374151] dark:text-slate-300 leading-relaxed">
              To wake up at 6:00 AM feeling naturally energized, target going to sleep at <strong>10:15 PM</strong> (for 5 full cycles / 7.5 hours) or <strong>8:45 PM</strong> (for 6 full cycles / 9 hours). Remember to give yourself an extra 15 minutes in bed to wind down so you aren't stressing about the clock.
            </p>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-[#E1D8CC]/60 dark:border-[#1E293B]">
            <h4 className="text-base sm:text-lg font-bold text-[#7C3AED] dark:text-violet-400">
              "Why do I hit a massive wall of exhaustion around 2:00 PM every day?"
            </h4>
            <p className="text-sm sm:text-base text-[#374151] dark:text-slate-300 leading-relaxed">
              That afternoon slump isn't a sign that you're lazy—it's a biological dip in your body's core temperature controlled by your internal clock. Instead of grabbing a third cup of coffee (which disrupts your sleep tonight), try taking a 10-minute walk outside in sunlight, drinking a tall glass of cold water, or taking a quick 20-minute power nap before 3:00 PM.
            </p>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-[#E1D8CC]/60 dark:border-[#1E293B]">
            <h4 className="text-base sm:text-lg font-bold text-[#7C3AED] dark:text-violet-400">
              "What time should teenagers go to bed to handle early school schedules?"
            </h4>
            <p className="text-sm sm:text-base text-[#374151] dark:text-slate-300 leading-relaxed">
              Teenagers biologically experience a natural shift that delays melatonin release by up to two hours, making them alert later at night. However, developing brains still require 8 to 10 hours of sleep. If school starts early and requires a 6:30 AM wake-up, teenagers should aim to be in bed around <strong>9:30 PM to 10:00 PM</strong>, with screens put away an hour earlier to help melatonin kick in.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Benefits of Following a Healthy Sleep Schedule
      </h3>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        <p className="font-semibold text-[#111827] mb-1">A consistent sleep schedule may help:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
          <li>Improve energy levels</li>
          <li>Increase productivity</li>
          <li>Support mental performance</li>
          <li>Improve mood</li>
          <li>Reduce daytime sleepiness</li>
          <li>Support overall health and well-being</li>
        </ul>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Find Your Ideal Sleep Time Today
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Aligning your sleep and wake schedule with your body's natural 90-minute circadian loops transforms how you feel every morning. By giving your brain time to complete deep slow-wave repair and REM memory cycles, you wake up naturally with sharp focus, stable mood, and sustained energy.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] pb-2 select-text">
        Calculate your personalized sleep windows above, adjust for your individual sleep latency, and start building a consistent bedtime routine today.
      </p>

      {/* Recommended Sleep Guides & Science Cards */}
      <RecommendedSleepGuides />

      {/* Trust Signals & Testimonials section */}
      <div className="w-full pt-8 pb-4 border-t border-[#E5E7EB] mt-8 flex flex-col items-center select-text">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="flex items-center gap-0.5 text-amber-500 mb-1.5">
            <Star className="w-4 h-4 fill-current text-amber-500" />
            <Star className="w-4 h-4 fill-current text-amber-500" />
            <Star className="w-4 h-4 fill-current text-amber-500" />
            <Star className="w-4 h-4 fill-current text-amber-500" />
            <Star className="w-4 h-4 fill-current text-amber-500" />
          </div>
          <h3 className="text-lg font-extrabold text-[#111827] dark:text-gray-100 tracking-tight leading-snug">
            Loved by 100,000+ Smart Sleepers
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 max-w-sm">
            94% of active users report waking up refreshed with zero grogginess when utilizing our 90-minute sleep cycle calculations.
          </p>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] pt-8 text-center w-full">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div
              key={index}
              className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-2xl overflow-hidden shadow-xs transition-all duration-300 hover:border-[#7C3AED]"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-[#111827] hover:bg-[#FCFAF7] transition-colors focus:outline-none cursor-pointer"
              >
                <span className="text-base sm:text-lg pr-4 font-bold text-[#111827]">{faq.q}</span>
                <ChevronDown className={`w-5.5 h-5.5 text-[#7C3AED] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden border-t border-[#E1D8CC]"
                  >
                    <p className="p-5 text-sm sm:text-base text-[#374151] leading-relaxed bg-[#FAF6F0] select-text">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>



      {/* Contact & Support Section (EEAT Signal) */}
      <div className="w-full pt-8 pb-4 border-t border-[#E5E7EB] mt-8 flex flex-col items-center text-center select-text">
        <h3 className="text-xl font-extrabold text-[#111827] mb-2 tracking-tight">
          Need Support or Have Feedback?
        </h3>
        <p className="text-sm sm:text-base text-[#374151] max-w-lg leading-relaxed mb-1">
          For questions, bug reports, feature requests, or scientific inquiries, please reach out to our team at{" "}
          <a
            href="mailto:support@sleepcalculater.online"
            className="text-[#7C3AED] hover:underline font-semibold"
          >
            support@sleepcalculater.online
          </a>{" "}
          or use our structured{" "}
          <Link
            to="/contact"
            className="text-[#7C3AED] hover:underline font-semibold"
          >
            Contact Form
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
