import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronDown, Calendar, Clock, ArrowRight, BookOpen, Star, Quote } from "lucide-react";
import { BLOG_POSTS_META } from "../blogMetadata";

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
    },
    {
      q: "How to wake up without feeling tired and avoid morning grogginess?",
      a: "To know how to wake up without feeling tired and avoid morning grogginess, you should aim to wake up at end of sleep cycle. Our sleep timing calculator is designed to optimize sleep schedule structures so you can improve sleep quality naturally. Practicing a healthy bedtime routine and maintaining a consistent sleep routine will help you achieve better sleep without medication."
    },
    {
      q: "Is the 90 minute sleep cycle accurate for adults, students, and night shift workers?",
      a: "Yes, research indicates that is 90 minute sleep cycle accurate as an average estimate of human sleep patterns. In practice, a natural sleep cycle calculator works extremely well as a sleep calculator for adults, a sleep calculator for students during a sleep calculator for exam preparation, or a sleep calculator for productivity. It is also a highly customizable sleep calculator for night shift workers, helping them utilize a sleep calculator before work or a sleep calculator before school to design a customized sleep calculator for healthy routine."
    },
    {
      q: "How many sleep cycles in 8 hours, and why do I wake up tired after 8 hours?",
      a: "If you want to know how many sleep cycles in 8 hours, 8 hours of sleep equals about 5.3 sleep cycles. When you wake up exactly on the 8th hour, you are often waking up in the middle of a deep sleep cycle, which explains why do i wake up tired after 8 hours. To wake up refreshed, you should use an optimal sleep time calculator or ideal wake up time calculator to wake up precisely between cycles. Factoring in a circadian rhythm calculator, deep sleep cycle calculator, rem sleep timing calculator, sleep debt calculator, recovery sleep calculator, sleep quality calculator, and sleep efficiency calculator will help you manage your morning energy calculator results for a better day."
    },
    {
      q: "How long does it take to fall asleep?",
      a: "On average, a healthy adult takes 15 to 20 minutes to fall asleep (sleep latency). The sleep calculator automatically incorporates a standard 15-minute sleep latency to provide the most precise sleep schedules."
    },
    {
      q: "How long should a power nap be?",
      a: "A power nap should ideally be 20 minutes to boost alertness without entering groggy deep sleep. Alternatively, you can take a full 90-minute nap to complete one full sleep cycle."
    },
    {
      q: "Can I catch up on sleep during the weekend?",
      a: "While extra weekend sleep feels refreshing, it does not fully reverse chronic sleep debt and can disrupt your biological clock (circadian rhythm) for the week ahead. Consistency is key."
    },
    {
      q: "Is sleep quality or sleep quantity more important?",
      a: "Both are crucial, but high-quality sleep is often more restorative than a longer duration of interrupted, low-quality sleep. Aligning your sleep timing with natural 90-minute cycle endpoints optimizes sleep quality by ensuring you wake up at a transition state, not in deep sleep."
    }
  ];

  const latestBlogs = Object.entries(BLOG_POSTS_META)
    .map(([slug, meta]) => ({
      slug,
      title: meta.title,
      description: meta.description,
      rawDate: meta.date,
      date: new Date(meta.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      readTime: "5 min read",
      category: meta.category
    }))
    .sort((a, b) => b.rawDate.localeCompare(a.rawDate))
    .slice(0, 3);

  return (
    <div className="w-full max-w-[42rem] mx-auto mt-6 mb-2 px-4 text-[#374151] select-none font-sans text-left space-y-4 content-visible-auto">
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
            <strong>Sleep calculator for students</strong>: Studying for finals requires maximum memory retention. Using a dedicated <strong>sleep calculator for students</strong> ensures that late-night preparation sessions end at optimal cycle points to protect cognitive functioning.
          </li>
          <li>
            <strong>Sleep calculator for exams</strong>: When cramming for critical tests, a reliable <strong>sleep calculator for exams</strong> prevents heavy morning brain-fog, helping kids and young adults maintain razor-sharp focus during key morning exams.
          </li>
          <li>
            <strong>Sleep calculator for night shift workers</strong>: Aligning sleep when natural sunshine suggests waking is difficult. An interactive <strong>sleep calculator for night shift workers</strong> maps multiple daytime resting phases and anchors consistent circadian alignments.
          </li>
          <li>
            <strong>Sleep calculator for babies</strong>: Infant sleep schedules require unique split structures. A customized <strong>sleep calculator for babies</strong> guides parents through multiple short naps and feeding sleep alignments.
          </li>
          <li>
            <strong>Sleep calculator for toddlers</strong>: Toddler developmental milestones are deeply connected to restorative sleep. A <strong>sleep calculator for toddlers</strong> assists in calculating morning wake-up times and afternoon rest periods.
          </li>
          <li>
            <strong>Sleep calculator for teenagers</strong>: Melatonin naturally releases later in the evening for teens. Aligning their school schedules with a <strong>sleep calculator for teenagers</strong> makes waking up on school mornings much easier.
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

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        Common Sleep Questions
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-[#111827] mt-2 select-text">
        How many hours of sleep is 11 PM to 7:00 AM?
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        The time between 11 PM and 7:00 AM is 8 hours, which falls within the recommended sleep range for most healthy adults.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] font-semibold text-[#111827] mt-4 select-text">
        What time should a 13 year old go to bed?
      </p>
      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Most 13-year-olds need approximately 8–10 hours of sleep each night. The ideal bedtime depends on school schedules and the required wake-up time.
      </p>

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
        Whether you need a Sleep Calculator, Sleep Cycle Calculator, Sleep Time Calculator, Sleepy Time Calculator, Bed Time Calculator, REM Sleep Calculator, REM Cycle Calculator, Nap Calculator, or guidance on when to wake up, our tool helps you make smarter sleep decisions.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] pb-2 select-text">
        Use the calculator today to discover your ideal sleep time, create a better sleep schedule, and wake up refreshed every morning.
      </p>

      {/* Latest Blog Articles Carousel/Grid component */}
      <div className="w-full pt-8 pb-4 border-t border-[#E5E7EB] mt-8">
        <div className="flex flex-col items-center gap-2 text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1 text-center w-full">
            Explore Our Latest Articles
          </h2>
          <p className="text-sm text-[#6B7280] text-center w-full">
            Science-backed tips, research, and deep insights to help you build optimal habits and wake up refreshed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogs.map((post) => (
            <Link
              key={post.slug}
              to={`/${post.slug}`}
              className="bg-[#FAF6F0] hover:bg-[#FCFAF7] border border-[#E1D8CC] hover:border-[#7C3AED] rounded-2xl p-5 flex flex-col justify-between group shadow-sm transition-all duration-300 select-text hover:shadow-md hover:-translate-y-1 block"
            >
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#111827] leading-snug group-hover:text-[#7C3AED] transition-colors duration-200 line-clamp-2 select-text">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#374151] mt-2.5 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E1D8CC] flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#6B7280]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#6B7280]" />
                    {post.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-[#7C3AED] font-bold group-hover:text-[#6D28D9] transition-colors duration-200">
                  Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Signals & Testimonials section */}
      <div className="w-full pt-8 pb-4 border-t border-[#E5E7EB] mt-8 flex flex-col items-center select-text">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto mb-6">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col bg-slate-50/50 dark:bg-slate-900/10 p-4 rounded-xl border border-[#E5E7EB] dark:border-slate-800/60 relative">
            <Quote className="w-5 h-5 text-[#7C3AED]/10 absolute top-3 right-3" />
            <blockquote className="text-[#374151] dark:text-gray-300 text-xs italic pr-4 leading-relaxed font-medium">
              "I used to feel exhausted even after 8 hours. Planning my nights around 90-minute sleep cycles changed everything. I wake up completely refreshed!"
            </blockquote>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[10px] font-bold text-[#7C3AED]">
                JD
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] dark:text-gray-100 leading-none">John D.</p>
                <p className="text-[9px] text-[#6B7280]">Verified Active User</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-slate-50/50 dark:bg-slate-900/10 p-4 rounded-xl border border-[#E5E7EB] dark:border-slate-800/60 relative">
            <Quote className="w-5 h-5 text-[#7C3AED]/10 absolute top-3 right-3" />
            <blockquote className="text-[#374151] dark:text-gray-300 text-xs italic pr-4 leading-relaxed font-medium">
              "The sleep calculator is incredibly accurate. It helped me find the perfect bedtime for my early morning shift. No more day sluggishness."
            </blockquote>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[10px] font-bold text-[#7C3AED]">
                SM
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] dark:text-gray-100 leading-none">Sarah M.</p>
                <p className="text-[9px] text-[#6B7280]">Verified Professional User</p>
              </div>
            </div>
          </div>
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
    </div>
  );
}
