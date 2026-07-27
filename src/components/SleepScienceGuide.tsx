import { Moon, Sun, Activity, Clock, ShieldAlert, CheckCircle2, HelpCircle, Lightbulb, AlertTriangle, BookOpen, User, Eye, Zap, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function SleepScienceGuide() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 mt-10 sm:mt-12 text-[#374151] dark:text-slate-300 font-sans pb-16">
      {/* Article Header & Intro */}
      <header className="space-y-3 text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight leading-tight">
          Sleep Calculator — Find Your Perfect Bedtime &amp; Wake-Up Time
        </h2>
        <p className="text-base sm:text-lg text-[#374151]/90 dark:text-slate-300/90 leading-relaxed text-left">
          Calculate the best time to sleep and wake up using science-backed 90-minute sleep cycles. Wake up refreshed, energized, and free from morning grogginess — every single day.
        </p>
      </header>

      {/* Section 1: What is a Sleep Calculator */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          What Is a Sleep Calculator?
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            A sleep calculator is a free tool that tells you the exact time to go to bed or wake up — not by counting random hours, but by working with your body's natural <strong>90-minute sleep cycles</strong>.
          </p>
          <p>
            Most people think 8 hours of sleep is the magic number. Science disagrees.
          </p>
          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#7C3AED]/20 dark:border-violet-500/20 rounded-2xl space-y-2 my-4">
            <p className="font-medium text-[#111827] dark:text-gray-100">The Core Sleep Secret:</p>
            <p className="text-sm">
              What actually matters is <em>when</em> your alarm goes off within a sleep cycle. Wake up at the end of a complete cycle and you feel alert within minutes. Wake up in the middle of deep sleep and you feel groggy, foggy, and exhausted — even after a full night in bed.
            </p>
          </div>
          <p>
            This calculator removes the guesswork. Enter your wake-up time or bedtime, and it instantly shows you the ideal times to sleep or rise based on complete sleep cycles.
          </p>
        </div>
      </section>

      {/* Section 2: How Does the Sleep Calculator Work */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          How Does the Sleep Calculator Work?
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          The calculator computes your ideal window using three primary scientific parameters:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
              <Clock size={20} />
            </div>
            <h4 className="font-bold text-[#111827] dark:text-gray-100">1. Core Anchor</h4>
            <p className="text-xs text-[#4B5563] dark:text-slate-300 font-medium">
              Your target wake-up time or the specific time you plan to fall asleep.
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
              <Activity size={20} />
            </div>
            <h4 className="font-bold text-[#111827] dark:text-gray-100">2. Sleep Cycles</h4>
            <p className="text-xs text-[#4B5563] dark:text-slate-300 font-medium">
              A standard adult sleep cycle averages roughly 90 minutes across four key stages.
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h4 className="font-bold text-[#111827] dark:text-gray-100">3. Sleep Latency</h4>
            <p className="text-xs text-[#4B5563] dark:text-slate-300 font-medium">
              The physiological buffer of 14-15 minutes most adults require to fall asleep.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm sm:text-base leading-relaxed">
            <strong>Example Breakdown:</strong> If you must wake up at <strong>6:00 AM</strong>, the calculator counts backward in 90-minute cycle blocks and incorporates a 15-minute sleep latency buffer to offer the following bedtime recommendations:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#E1D8CC] dark:border-[#1E293B]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#FAF6F0] dark:bg-[#151C2C] border-b border-[#E1D8CC] dark:border-[#1E293B]">
                  <th className="p-4 font-bold text-[#111827] dark:text-gray-100 font-serif">Bedtime (Include Latency)</th>
                  <th className="p-4 font-bold text-[#111827] dark:text-gray-100 font-serif">Sleep Cycles</th>
                  <th className="p-4 font-bold text-[#111827] dark:text-gray-100 font-serif">Total Sleep Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1D8CC] dark:divide-[#1E293B]">
                <tr>
                  <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-semibold">8:45 PM</td>
                  <td className="p-4">6 Cycles</td>
                  <td className="p-4">9 Hours</td>
                </tr>
                <tr className="bg-[#FAF6F0]/40 dark:bg-violet-950/5">
                  <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-semibold flex items-center gap-1.5">
                    10:15 PM <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 font-sans font-bold">★ Ideal</span>
                  </td>
                  <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">5 Cycles</td>
                  <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">7.5 Hours</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-semibold">11:45 PM</td>
                  <td className="p-4">4 Cycles</td>
                  <td className="p-4">6 Hours</td>
                </tr>
                <tr className="bg-[#FAF6F0]/40 dark:bg-violet-950/5">
                  <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-semibold">1:15 AM</td>
                  <td className="p-4">3 Cycles</td>
                  <td className="p-4">4.5 Hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#374151] dark:text-slate-300 italic font-medium">
            The 10:15 PM option is scientifically ideal for most adults — ensuring you wake up naturally at the end of your 5th complete cycle.
          </p>
        </div>
      </section>

      {/* Section 3: The 4 Stages of Sleep */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          The 4 Stages of Sleep — What Happens Each Night
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          Every 90 minutes, your brain progresses through a complete ultradian sleep cycle, traveling through distinct sleep architecture:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 sm:p-6 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2.5">
            <h4 className="font-serif font-semibold text-[#111827] dark:text-gray-100 text-lg">
              Stage 1: Light Sleep (N1)
            </h4>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Lasts 1 to 7 minutes. Your body transitions from wakefulness to sleep. Heart rate slows, muscles relax. This is the easiest stage to wake from — no grogginess, instant alertness.
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2.5">
            <h4 className="font-serif font-semibold text-[#111827] dark:text-gray-100 text-lg">
              Stage 2: True Sleep (N2)
            </h4>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Your body temperature drops and brain activity shifts into sleep spindles. This stage makes up roughly 50% of your total sleep time and plays a key role in memory and motor learning.
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2.5">
            <h4 className="font-serif font-semibold text-[#111827] dark:text-gray-100 text-lg">
              Stage 3: Deep Sleep (N3)
            </h4>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              The most physically restorative stage. Your body releases growth hormone, repairs tissue, strengthens the immune system, and consolidates physical memories. Waking from this stage causes severe grogginess that can last 30 to 60 minutes.
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2.5">
            <h4 className="font-serif font-semibold text-[#111827] dark:text-gray-100 text-lg">
              Stage 4: REM Sleep
            </h4>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Your brain becomes nearly as active as when you are awake. This is when dreams happen. REM sleep is responsible for emotional processing, creativity, problem-solving, and long-term memory formation. REM duration increases with each cycle — your last two cycles of the night contain the most REM, which is exactly why cutting sleep short is so damaging.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: How Much Sleep Do You Actually Need? */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          How Much Sleep Do You Actually Need?
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          Sleep needs evolve across your lifespan. Here are the age-based duration and cycle requirements backed by the <strong>American Academy of Sleep Medicine (AASM 2025)</strong> guidelines:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#E1D8CC] dark:border-[#1E293B]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#FAF6F0] dark:bg-[#151C2C] border-b border-[#E1D8CC] dark:border-[#1E293B]">
                <th className="p-4 font-bold text-[#111827] dark:text-gray-100 font-serif">Age Group</th>
                <th className="p-4 font-bold text-[#111827] dark:text-gray-100 font-serif">Recommended Sleep</th>
                <th className="p-4 font-bold text-[#111827] dark:text-gray-100 font-serif">Ideal Sleep Cycles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1D8CC] dark:divide-[#1E293B]">
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Newborns (0–3 months)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">14–17 hours</td>
                <td className="p-4">9–11 cycles</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Infants (4–11 months)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">12–15 hours</td>
                <td className="p-4">8–10 cycles</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Toddlers (1–2 years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">11–14 hours</td>
                <td className="p-4">7–9 cycles</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Preschoolers (3–5 years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">10–13 hours</td>
                <td className="p-4">6–8 cycles</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">School age (6–13 years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">9–11 hours</td>
                <td className="p-4">6–7 cycles</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Teenagers (14–17 years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">8–10 hours</td>
                <td className="p-4">5–6 cycles</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Young adults (18–25 years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">7–9 hours</td>
                <td className="p-4">5–6 cycles</td>
              </tr>
              <tr className="bg-violet-50/20 dark:bg-violet-950/10">
                <td className="p-4 font-bold text-[#111827] dark:text-gray-100">Adults (26–64 years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-bold">7–9 hours</td>
                <td className="p-4 font-bold text-[#111827] dark:text-gray-100">5–6 cycles <span className="text-amber-700 dark:text-amber-400 ml-1 font-bold">★</span></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#111827] dark:text-gray-100">Older adults (65+ years)</td>
                <td className="p-4 font-mono text-[#7C3AED] dark:text-violet-400 font-medium">7–8 hours</td>
                <td className="p-4">5 cycles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: What Time Should I Go to Bed? */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          What Time Should I Go to Bed?
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          The answer depends on your wake-up time. Here are the most common scenarios modeled with a standard 15-minute sleep latency buffer included:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Waking up at:</p>
              <p className="text-base font-bold text-[#111827] dark:text-gray-100">5:00 AM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Ideal Bedtimes:</p>
              <p className="text-sm font-mono font-semibold text-[#7C3AED] dark:text-violet-400">9:15 PM or 10:45 PM</p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Waking up at:</p>
              <p className="text-base font-bold text-[#111827] dark:text-gray-100">5:30 AM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Ideal Bedtimes:</p>
              <p className="text-sm font-mono font-semibold text-[#7C3AED] dark:text-violet-400">9:45 PM or 11:15 PM</p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Waking up at:</p>
              <p className="text-base font-bold text-[#111827] dark:text-gray-100">6:00 AM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Ideal Bedtimes:</p>
              <p className="text-sm font-mono font-semibold text-[#7C3AED] dark:text-violet-400">10:15 PM or 11:45 PM</p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Waking up at:</p>
              <p className="text-base font-bold text-[#111827] dark:text-gray-100">6:30 AM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Ideal Bedtimes:</p>
              <p className="text-sm font-mono font-semibold text-[#7C3AED] dark:text-violet-400">10:45 PM or 12:15 AM</p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Waking up at:</p>
              <p className="text-base font-bold text-[#111827] dark:text-gray-100">7:00 AM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Ideal Bedtimes:</p>
              <p className="text-sm font-mono font-semibold text-[#7C3AED] dark:text-violet-400">11:15 PM or 12:45 AM</p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Waking up at:</p>
              <p className="text-base font-bold text-[#111827] dark:text-gray-100">7:30 AM</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#4B5563] dark:text-slate-300 font-semibold">Ideal Bedtimes:</p>
              <p className="text-sm font-mono font-semibold text-[#7C3AED] dark:text-violet-400">11:45 PM or 1:15 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Why Do I Wake Up Tired After 8 Hours of Sleep? */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          Why Do I Wake Up Tired After 8 Hours of Sleep?
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          This is one of the most common and frustrating sleep problems. The answer lies in several critical scientific variables:
        </p>

        <div className="space-y-4">
          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-violet-500/20 dark:text-violet-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
              Sleep Cycle Mismatch
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              8 hours equals 5.33 sleep cycles. Your alarm fires mid-cycle every single morning — usually during deep sleep. Switch to 7.5 hours (exactly 5 complete cycles) and the problem often disappears immediately.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-violet-500/20 dark:text-violet-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
              Poor Sleep Quality
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              You can spend 8 hours in bed but only get 5 hours of restorative sleep. Common causes include undiagnosed sleep apnea (affects 1 in 4 adults), a bedroom that is too warm (ideal temperature is 65–68°F or 18–20°C), alcohol within 3 hours of bedtime (suppresses REM by up to 24%), and blue light from screens delaying melatonin by 30 to 90 minutes.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-violet-500/20 dark:text-violet-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
              Sleep Debt
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Losing even 30 minutes of sleep per night accumulates a debt that impairs cognitive performance for days. Research by Van Dongen et al. (2003) showed people sleeping 6 hours nightly for 14 days performed as poorly as someone awake for 24 hours straight — and felt fine the whole time.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-violet-500/20 dark:text-violet-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
              Social Jet Lag
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Sleeping different hours on weekdays versus weekends shifts your circadian clock by up to 2 hours — equivalent to flying to a different time zone every Friday and back every Sunday. A 2025 population study linked social jet lag directly to worse mood, impaired metabolism, and higher anxiety.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: REM Sleep */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          REM Sleep — Why Your Last Cycles Matter Most
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          REM sleep is the stage your brain actively prioritizes recovering when sleep is restricted. Here is why it matters so much:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base">Memory &amp; Learning</h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Your hippocampus replays information learned during the day, transferring it from short-term to long-term memory storage. REM sleep after studying is more valuable than the studying itself for retention.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base">Emotional Health</h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              The amygdala (your brain's emotional center) becomes hyperreactive when REM is cut short. People deprived of REM show significantly stronger responses to stress, fear, and negative emotions. Chronic REM loss is one of the strongest predictors of anxiety and depression.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base">Creativity &amp; Integration</h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Loose associative thinking during REM allows your brain to connect ideas across distant domains. Many creative breakthroughs happen after sleep for exactly this reason.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base">Physical Recovery</h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              REM deprivation has been linked to elevated blood pressure, endothelial dysfunction, and increased cortisol — all markers of cardiovascular risk.
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed bg-[#FAF6F0] dark:bg-[#151C2C] p-4 rounded-2xl border border-[#7C3AED]/20 dark:border-violet-500/20 font-semibold">
          REM sleep is concentrated in the final two cycles of the night. Every time you set an early alarm or stay up too late, you are cutting off your brain's primary window for cognitive recovery.
        </p>
      </section>

      {/* Section 8: Nap Calculator */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          Nap Calculator — The Right Way to Nap
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          Strategic napping is one of the most powerful performance tools available. NASA research confirmed a 26-minute nap improved alertness by 100% and performance by 34%. But nap length determines whether you wake refreshed or groggy:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center border-b border-[#E1D8CC]/60 dark:border-slate-800 pb-2">
              <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100">Power Nap</h4>
              <span className="font-mono text-xs font-bold text-[#7C3AED] dark:text-violet-400 bg-[#7C3AED]/10 px-2 py-0.5 rounded">20 Mins</span>
            </div>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Targets the end of N2 sleep. Avoids deep sleep entirely. Best for quick energy restoration during the workday. Zero grogginess on waking.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center border-b border-[#E1D8CC]/60 dark:border-slate-800 pb-2">
              <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100">Medium Nap</h4>
              <span className="font-mono text-xs font-bold text-[#7C3AED] dark:text-violet-400 bg-[#7C3AED]/10 px-2 py-0.5 rounded">30 Mins</span>
            </div>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Slightly enters deep sleep. Expect 10 to 15 minutes of grogginess on waking. Good for physical recovery.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center border-b border-[#E1D8CC]/60 dark:border-slate-800 pb-2">
              <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100">Cognitive Nap</h4>
              <span className="font-mono text-xs font-bold text-[#7C3AED] dark:text-violet-400 bg-[#7C3AED]/10 px-2 py-0.5 rounded">60 Mins</span>
            </div>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Full deep sleep cycle. Excellent for declarative memory (facts, names, dates) and physical recovery. Allow 20 minutes to fully clear grogginess.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center border-b border-[#E1D8CC]/60 dark:border-slate-800 pb-2">
              <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100">Full Cycle</h4>
              <span className="font-mono text-xs font-bold text-[#7C3AED] dark:text-violet-400 bg-[#7C3AED]/10 px-2 py-0.5 rounded">90 Mins</span>
            </div>
            <p className="text-sm text-[#374151]/95 dark:text-slate-300 leading-relaxed">
              Completes one entire sleep cycle including REM. Best for cognitive recovery, emotional processing, and creativity. Wakes during light sleep so grogginess is minimal.
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[#374151] dark:text-slate-300">
          <strong>Best Nap Window:</strong> 1:00 PM to 3:00 PM — perfectly aligned with your natural circadian alertness dip roughly 7 hours after waking. Napping after 3:00 PM is not recommended as it delays nighttime sleep onset by 30 to 45 minutes.
        </p>
      </section>

      {/* Section 9: Sleep Calculator by Age */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          Sleep Calculator by Age — Specific Bedtimes
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>What time should a 13-year-old go to bed?</strong><br />
            Teenagers need 8 to 10 hours of sleep. Waking at 7:00 AM for school means bedtime by 9:00 PM for 10 hours or 10:00 PM for 9 hours. Adolescent biology naturally shifts the circadian clock later — making early school start times biologically difficult.
          </p>
          <p>
            <strong>What time should a 16-year-old go to bed?</strong><br />
            Same 8 to 10 hour range. Waking at 6:30 AM means bedtime by 8:30 PM for 10 hours or 9:30 PM for 9 hours on school nights.
          </p>
          <p>
            <strong>What time should adults go to bed?</strong><br />
            Most adults aged 26 to 64 function optimally on 7.5 hours (5 cycles). Use our interactive sleep calculator above to map your bedtime based on your wake-up time.
          </p>
          <p>
            <strong>What time should older adults go to bed?</strong><br />
            Adults over 65 do well with 7 to 8 hours. Sleep cycles shorten slightly with age — the NSF 2025 guidelines note 82-minute average cycles for adults over 55.
          </p>
        </div>
      </section>

      {/* Section 10: Circadian Rhythm */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          Circadian Rhythm — Your Body's Internal Clock
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          Your circadian rhythm is a 24-hour biological cycle controlled by the suprachiasmatic nucleus (SCN) in your brain's hypothalamus. It regulates when you feel sleepy, when you feel alert, your body temperature, hormone release, and cell repair.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] rounded-2xl border border-[#E1D8CC] dark:border-[#1E293B] space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-sm">Melatonin Regulation</h4>
            <p className="text-xs leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Melatonin rises 2 hours before your habitual bedtime — signaling darkness. Blue light from phones and screens blocks melatonin production, delaying sleep onset by 30 to 90 minutes.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] rounded-2xl border border-[#E1D8CC] dark:border-[#1E293B] space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-sm">Morning Reset</h4>
            <p className="text-xs leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Morning sunlight within 30 minutes of waking suppresses melatonin, naturally raises cortisol, and resets your circadian clock — making it easier to feel sleepy at the right time that evening.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] rounded-2xl border border-[#E1D8CC] dark:border-[#1E293B] space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-sm">Fixed Wake Window</h4>
            <p className="text-xs leading-relaxed text-[#374151]/95 dark:text-slate-300">
              Consistent wake time is the single most effective habit for circadian health. Varying wake time by more than 30 minutes on weekends disrupts the circadian system.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11: 12 Science-Backed Sleep Hygiene Tips */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          12 Science-Backed Sleep Hygiene Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>1. Fix your wake time first</strong> — same time every day including weekends to anchor your rhythm.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>2. Use a sleep calculator</strong> — time bedtimes to land on cycle boundaries, not round numbers.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>3. Keep your bedroom at 65–68°F (18–20°C)</strong> — core body temperature must drop to sustain deep sleep.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>4. Make your bedroom dark</strong> — even small light sources disrupt melatonin production.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>5. Avoid screens 1 hour before bed</strong> — blue light delays melatonin by 30 to 90 minutes.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>6. Delay caffeine 90 minutes after waking</strong> — lets morning cortisol peak naturally first to avoid crashes.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>7. No alcohol within 3 hours of sleep</strong> — suppresses REM sleep and causes midnight wakefulness.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>8. Get morning sunlight in 30 minutes</strong> — resets melatonin timing for that evening.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>9. Exercise daily but not late</strong> — avoid strenuous workouts within 3 hours of sleep.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>10. Avoid heavy meals late</strong> — digesting raises core temperature and disrupts sleep onset.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>11. Write tomorrow's tasks down</strong> — offloads cognitive load and reduces nighttime racing thoughts.</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-[#7C3AED] shrink-0 mt-0.5" />
            <p><strong>12. Use the 20-minute rule</strong> — if you can't sleep, get up and read until sleepy. Avoid lying awake.</p>
          </div>
        </div>
      </section>

      {/* Section 12: Sleep Myths Debunked */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          Sleep Myths Debunked
        </h3>

        <div className="space-y-4">
          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5 text-base">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 uppercase tracking-wider">Myth</span>
              "You can catch up on sleep over the weekend."
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              <strong>The Science:</strong> A 2019 Current Biology study found that after three recovery nights, metabolic markers remained significantly impaired. Weekend oversleeping also shifts your circadian phase by up to 2 hours — linked to 29% higher cardiovascular risk markers.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5 text-base">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 uppercase tracking-wider">Myth</span>
              "Everyone needs exactly 8 hours."
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              <strong>The Science:</strong> Sleep needs vary by genetics. The NSF 2025 range of 7 to 9 hours is a range, not a prescription. Roughly 1 to 3% of people carry the DEC2 genetic variant and function optimally on 6 hours.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5 text-base">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 uppercase tracking-wider">Myth</span>
              "Alcohol helps you sleep better."
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              <strong>The Science:</strong> Alcohol accelerates sleep onset but suppresses REM sleep by up to 24% per drink consumed within 3 hours of bedtime. It causes rebound wakefulness in the second half of the night as your body metabolizes it.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0]/50 dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl space-y-2">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 flex items-center gap-2.5 text-base">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 uppercase tracking-wider">Myth</span>
              "8 hours is always better than 7.5 hours."
            </h4>
            <p className="text-sm leading-relaxed text-[#374151]/95 dark:text-slate-300">
              <strong>The Science:</strong> 8 hours equals 5.33 cycles — your alarm fires mid-cycle every morning. 7.5 hours equals exactly 5 complete cycles. A 2024 University of Michigan study tracking 18,400 adults confirmed 7.5 hours produces better next-morning alertness scores than 8 hours for the majority of people.
            </p>
          </div>
        </div>
      </section>

      {/* Section 13: Frequently Asked Questions */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] dark:text-gray-100 tracking-tight">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              What time should I go to bed if I wake up at 6 AM?
            </h4>
            <p className="text-sm leading-relaxed">
              Go to bed by 10:15 PM for 5 complete cycles (7.5 hours). Other options: 8:45 PM for 6 cycles or 11:45 PM for 4 cycles. All times include 15 minutes to fall asleep.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              Is 7.5 hours of sleep better than 8 hours?
            </h4>
            <p className="text-sm leading-relaxed">
              For most adults, yes. 7.5 hours equals exactly 5 complete 90-minute cycles, so you wake during light sleep. 8 hours equals 5.33 cycles — causing your alarm to fire mid-deep-sleep.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              What time should a 13-year-old go to bed?
            </h4>
            <p className="text-sm leading-relaxed">
              Waking at 7:00 AM, bedtime should be between 9:00 PM (10 hours) and 10:00 PM (9 hours) on school nights.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              How many hours of sleep is 11 PM to 7 AM?
            </h4>
            <p className="text-sm leading-relaxed">
              8 hours in bed. Minus 15 minutes to fall asleep equals 7 hours 45 minutes of actual sleep — covering 5 complete sleep cycles.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              What is sleep inertia?
            </h4>
            <p className="text-sm leading-relaxed">
              The grogginess and slowed thinking immediately after waking — caused by being woken during deep (N3) sleep. A sleep calculator eliminates it by timing your wake-up at the end of a complete cycle.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              What time should I sleep if I wake up at 5 AM?
            </h4>
            <p className="text-sm leading-relaxed">
              In bed by 9:15 PM for 5 cycles, 10:45 PM for 4 cycles, or 7:45 PM for 6 cycles.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              Why do I wake up tired after sleeping 8 hours?
            </h4>
            <p className="text-sm leading-relaxed">
              8 hours equals 5.33 cycles — your alarm fires mid-cycle. Try 7.5 hours. If the problem continues, causes include sleep apnea, warm bedroom, alcohol before bed, or sleep debt.
            </p>
          </div>

          <div className="p-5 bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl">
            <h4 className="font-serif font-bold text-[#111827] dark:text-gray-100 text-base mb-2 flex items-start gap-2">
              <HelpCircle size={18} className="text-[#7C3AED] shrink-0 mt-1" />
              How does a 90-minute sleep cycle work?
            </h4>
            <p className="text-sm leading-relaxed">
              Each cycle goes through N1 (light, 1–7 min), N2 (true sleep, ~25 min), N3 (deep sleep, ~25 min), and REM (dreaming, 20–25 min early in the night, longer later). Total approximately 90 minutes. Waking at the end of a cycle — during N1 or early N2 — feels natural and immediate.
            </p>
          </div>
        </div>
      </section>

      {/* Author box for Home E-E-A-T alignment */}
      <div 
        className="border border-[#7C3AED]/20 dark:border-violet-500/20 bg-[#FAF6F0] dark:bg-[#151C2C] p-6 rounded-2xl mt-12"
      >
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">
            Editorial &amp; Medical Integrity
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-[#111827] dark:text-gray-100">Written by:</span>
              <Link to="/about" className="text-[#7C3AED] hover:underline ml-1 font-semibold">Shafiq</Link> (Sleep Health Researcher)
            </div>
            <div>
              <span className="font-bold text-[#111827] dark:text-gray-100">Medically Reviewed by:</span>
              <span className="text-[#111827] dark:text-gray-100 ml-1 font-semibold">Dr. Sarah Johnson</span> (MBBS / Sleep Specialist)
            </div>
          </div>
          <div className="text-xs text-[#374151] dark:text-slate-300 font-medium">
            <span className="font-bold text-[#111827] dark:text-gray-100">Last Updated:</span> July 2026
          </div>
          <p className="text-[11px] text-[#374151] dark:text-slate-300 leading-normal mt-2">
            <strong>Fact-Checked:</strong> All calculations, stages, and sleep hygiene recommendations are derived from direct standards set by the <strong>American Academy of Sleep Medicine (AASM 2025)</strong>, the <strong>National Sleep Foundation (NSF 2025)</strong>, and peer-reviewed journals published in <strong>PubMed</strong>.
          </p>
        </div>
      </div>

      {/* Sources & Disclaimer Section */}
      <footer className="pt-8 border-t border-[#E1D8CC] dark:border-slate-800 space-y-4">
        <p className="text-xs text-[#374151] dark:text-slate-300 leading-relaxed font-medium">
          <strong>Sources &amp; References:</strong> American Academy of Sleep Medicine (AASM) 2025 · National Sleep Foundation (NSF) 2025 · Van Dongen et al., Sleep 2003 · Walker, M. Why We Sleep, 2017 · NASA Nap Study 1995 · University of Michigan Sleep Study 2024
        </p>
        <p className="text-xs text-[#374151] dark:text-slate-300 leading-relaxed italic bg-[#FAF6F0] dark:bg-[#151C2C] p-3.5 rounded-xl border border-[#E1D8CC] dark:border-slate-800 font-medium">
          This content is for informational purposes only and does not constitute professional medical advice, clinical diagnosis, or medical treatment plans. Always consult with a licensed healthcare specialist or general practitioner regarding chronic sleep disorders or persistent morning fatigue.
        </p>
      </footer>
    </div>
  );
}
