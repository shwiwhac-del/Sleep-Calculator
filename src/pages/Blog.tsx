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
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>Sleep Blog – Sleep Tips, Sleep Cycles & Better Sleep Guides</title>
        <meta name="description" content="Explore sleep guides, bedtime tips, sleep cycle explanations, and expert advice to improve your sleep quality naturally." />
        <meta name="keywords" content="sleep blog, sleep tips, sleep cycle, circadian rhythm, better sleep" />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/blog" />}
      </Helmet>

      <div className="mb-4 text-left">
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <div className="mb-12 text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-gray-900 dark:text-white leading-tight font-serif">Sleep Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl">
          Learn how to optimize your rest, understand your REM cycles, and wake up feeling refreshed every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {articles.map((article, index) => (
          <Link 
            key={index}
            to={article.url}
            className="group bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start h-full"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 mb-3 block">
              {article.topic}
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif group-hover:text-[#2563EB] transition-colors line-clamp-2">
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
