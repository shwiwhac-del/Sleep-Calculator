import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const articles = [
    {
      title: "Best Bedtime Habits for Better Sleep Quality",
      description: "Discover the best bedtime habits to improve sleep quality, fall asleep faster, and wake up feeling refreshed every morning.",
      url: "/blog/best-bedtime-habits-for-better-sleep-quality",
      topic: "Health",
    },
    {
      title: "Why Sleep Cycles Matter More Than Sleeping Longer",
      description: "Learn why sleep cycles are more important than simply sleeping longer and how proper REM timing can improve energy, focus, and recovery.",
      url: "/blog/why-sleep-cycles-matter-more-than-sleeping-longer",
      topic: "Science",
    },
    {
      title: "Best Bedtime Routine for Better Sleep",
      description: "Learn the best bedtime routine for improving sleep quality naturally. Discover simple nighttime habits that help you fall asleep faster and wake up refreshed.",
      url: "/blog/best-bedtime-routine-for-better-sleep",
      topic: "Habits",
    },
    {
      title: "How Sleep Affects Your Brain Performance",
      description: "Discover how sleep impacts brain performance, focus, memory, and mental clarity. Learn why proper sleep is essential for productivity and daily energy.",
      url: "/blog/how-sleep-affects-your-brain-performance",
      topic: "Health",
    },
    {
      title: "Best Sleep Schedule for Students",
      description: "Discover the best sleep schedule for students to improve concentration, memory, productivity, and daily energy. Learn healthy sleeping habits for better academic performance.",
      url: "/blog/best-sleep-schedule-for-students",
      topic: "Students",
    },
    {
      title: "Sleep Debt: What Happens When You Don’t Get Enough Sleep?",
      description: "Learn what sleep debt is, how it affects your body, and the best ways to recover lost sleep naturally. Use healthy sleep habits to improve energy, focus, and recovery.",
      url: "/blog/sleep-debt-recovery-guide",
      topic: "Health",
    },
    {
      title: "Sleep Cycle Calculator: How to Calculate Your Best Time to Sleep",
      description: "Learn how a Sleep Cycle Calculator helps you wake up refreshed. Use a bedtime calculator to optimize your REM sleep cycles and stop waking up tired.",
      url: "/blog/sleep-cycle-calculator",
      topic: "Tool Guide",
    },
    {
      title: "Best Sleep Calculator for Better Sleep Cycles and Healthy Rest",
      description: "Use our free Sleep Calculator to find the best time to sleep or wake up based on natural sleep cycles. Improve sleep quality, energy, focus, and daily performance.",
      url: "/blog/best-sleep-calculator",
      topic: "Tool Guide",
    },
    {
      title: "What is a Sleep Calculator?",
      description: "Learn how a sleep calculator uses human biology and 90-minute sleep cycles to calculate your perfect wake-up time.",
      url: "/blog/sleep-calculator",
      topic: "Tool Guide",
    },
    {
      title: "The Ultimate Sleep Cycle Guide: What Happens When You Sleep?",
      description: "Learn about the 4 stages of sleep, REM, deep sleep, and how the 90-minute sleep cycle works. Stop waking up tired by mastering your biology.",
      url: "/blog/sleep-cycle-stages",
      topic: "Sleep Science",
    },
    {
      title: "How Much Sleep Do You Need? A Sleep by Age Guide",
      description: "Find out exactly how many hours of sleep you need based on your age. From newborns to seniors, learn how sleep requirements change over time.",
      url: "/blog/sleep-age",
      topic: "Health",
    },
    {
      title: "90-Minute Sleep Cycles Explained",
      description: "Understand the 90-minute phases of sleep, deep sleep, and REM, and why waking up mid-cycle makes you groggy.",
      url: "/blog/sleep-cycle",
      topic: "Sleep Science",
    },
    {
      title: "Benefits of Using a Sleep Calculator",
      description: "From waking up refreshed to stopping morning grogginess, discover the life-changing benefits of utilizing a sleep calculator daily.",
      url: "/blog/sleep-calculator-benefits",
      topic: "Productivity",
    },
    {
      title: "How to Fix Your Sleep Schedule",
      description: "Learn scientifically-proven methods to reset your circadian rhythm and fix your sleep schedule fast.",
      url: "/blog/fix-sleep-schedule",
      topic: "Sleep Habits",
    },
    {
      title: "How Blue Light from Screens Steals Your Sleep",
      description: "Learn the science behind blue light, how it tricks your brain into thinking it's daytime, and actionable steps to protect your sleep quality.",
      url: "/blog/blue-light-sleep",
      topic: "Health",
    },
    {
      title: "Smart Sleep Habits for Better Energy",
      description: "Learn simple sleep habits that improve energy, focus, and sleep quality. Discover how sleep cycles and bedtime timing affect your daily performance.",
      url: "/blog/smart-sleep-habits-better-energy",
      topic: "Sleep Habits",
    },
    {
      title: "Why You Wake Up in the Middle of the Night",
      description: "Waking up during the night can affect sleep quality and daily energy. Learn common reasons for interrupted sleep and simple ways to sleep better naturally.",
      url: "/blog/why-you-wake-up-in-the-middle-of-the-night",
      topic: "Sleep Guide",
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>Sleep Calculator Blog: Guides on Sleep Cycles, Bedtime & Wake up Time</title>
        <meta name="description" content="Discover how to use a sleep cycle calculator, find the best time to sleep, and optimize your REM sleep. Become an expert on healthy sleep calculators." />
        <meta name="keywords" content="sleep calculator blog, bedtime calculator, sleep cycle time, best time to sleep, healthy sleep calculator, REM sleep calculator, wake up calculator" />
        <link rel="canonical" href="https://sleepcalculater.online/blog" />
        <meta property="og:title" content="Sleep Calculator Blog: Guides on Sleep Cycles, Bedtime & Wake up Time" />
        <meta property="og:description" content="Discover how to use a sleep cycle calculator, find the best time to sleep, and optimize your REM sleep. Become an expert on healthy sleep calculators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sleepcalculater.online/blog" />
      </Helmet>

      <div className="mb-4 text-left">
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"
        >
          <ArrowLeft size={16} /> Home
        </button>
      </div>

      <div className="mb-12 text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-gray-900 dark:text-gray-100 leading-tight font-serif">Sleep Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl">
          Learn how to optimize your rest, understand your REM cycles, and wake up feeling refreshed every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link 
            key={index}
            to={article.url}
            className="group bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] rounded-[24px] p-6 sm:p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 mb-3 block">
              {article.topic}
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif group-hover:text-[#2563EB] transition-colors line-clamp-2">
              {article.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
              {article.description}
            </p>
            <div className="mt-auto flex items-center gap-2 text-[#2563EB] font-medium text-sm group-hover:-translate-y-0.5 transition-transform">
              Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
