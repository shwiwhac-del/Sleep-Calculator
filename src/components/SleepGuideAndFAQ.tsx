import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronDown, Calendar, Clock, ArrowRight, BookOpen, Star, Quote } from "lucide-react";
import { BLOG_POSTS } from "../pages/Blog";

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
    }
  ];

  const getBlogTimestamp = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) return d.getTime();
    } catch (e) {
      // Fallback
    }
    return 0;
  };

  const latestBlogs = [...BLOG_POSTS]
    .sort((a, b) => getBlogTimestamp(b.date) - getBlogTimestamp(a.date))
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

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        What Is a Sleep Calculator?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        A Sleep Calculator estimates the best sleep time and wake-up time using complete sleep cycles. Instead of simply counting hours, it helps you plan your sleep around how your body naturally rests and recovers during the night.
      </p>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        <p className="font-semibold text-[#111827] mb-1">Many people search for:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
          <li>Calculator Sleep</li>
          <li>Sleep Time Calculator</li>
          <li>Sleepy Time Calculator</li>
          <li>Bed Time Calculator</li>
          <li>REM Calculator</li>
          <li>REM Cycle Calculator</li>
          <li>Sleep Timer</li>
        </ul>
      </div>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        These tools all have one goal: helping you wake up feeling more refreshed and less groggy.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        How Much Sleep Do I Need?
      </h3>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        One of the most common sleep questions is: How much sleep do I need?
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        The answer depends on age, lifestyle, activity level, and overall health. Most adults need between <a href="https://www.cdc.gov/sleep/about/index.html" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline font-semibold">7 and 9 hours of sleep each night</a>, while children and teenagers usually need more.
      </p>

      <p className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        Our Sleep Calculator by Age provides guidance based on different age groups, making it easier to create a healthy sleep routine.
      </p>

      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] pt-3">
        What Time Should I Go to Bed?
      </h3>

      <div className="text-base sm:text-lg md:text-[1.125rem] leading-relaxed text-[#374151] select-text">
        <p className="font-semibold text-[#111827] mb-1">If you've ever asked:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#374151]">
          <li>What time should I go to bed?</li>
          <li>What time should I wake up?</li>
          <li>When to wake up?</li>
          <li>What time to wake?</li>
          <li>Time to wake up?</li>
        </ul>
      </div>

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
              className="bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-[#7C3AED]/50 rounded-2xl p-5 flex flex-col justify-between group shadow-md transition-all duration-300 select-text hover:shadow-premium hover:-translate-y-1 block"
            >
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-[#111827] leading-snug group-hover:text-[#7C3AED] transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#374151] mt-2.5 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
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
          <h4 className="text-lg font-extrabold text-[#111827] dark:text-gray-100 tracking-tight leading-snug">
            Loved by 100,000+ Smart Sleepers
          </h4>
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

      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] pt-8 text-center w-full">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm transition-all duration-305 hover:border-[#7C3AED]/45"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-[#111827] hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
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
                    className="overflow-hidden border-t border-[#E5E7EB]"
                  >
                    <p className="p-5 text-sm sm:text-base text-[#374151] leading-relaxed bg-[#F8FAFC] select-text">
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
        <h4 className="text-xl font-extrabold text-[#111827] mb-2 tracking-tight">
          Need Support or Have Feedback?
        </h4>
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
