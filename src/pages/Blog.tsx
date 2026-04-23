import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Moon, BookOpen, Clock, Activity, Battery, ArrowLeft, ArrowRight, BedDouble, Check, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  const articles = [
    {
      title: "What is a Sleep Calculator?",
      description: "Learn how a sleep calculator uses human biology and 90-minute sleep cycles to calculate your perfect wake-up time.",
      url: "/what-is-a-sleep-calculator",
      icon: <Search size={20} />,
      topic: "Tool Guide",
      color: "text-[#00d2ff]"
    },
    {
      title: "How Does Your Sleep Cycle Work?",
      description: "Understand the 90-minute phases of sleep, deep sleep, and REM, and why waking up mid-cycle makes you groggy.",
      url: "/how-does-your-sleep-cycle-work",
      icon: <Activity size={20} />,
      topic: "Sleep Science",
      color: "text-[#fcd34d]"
    },
    {
      title: "Benefits of Using a Sleep Calculator",
      description: "Discover how tracking your cycles can eliminate morning grogginess entirely, improve daytime focus, and fix your routine.",
      url: "/benefits-of-using-a-sleep-calculator",
      icon: <Check size={20} />,
      topic: "Benefits",
      color: "text-[#10b981]"
    },
    {
      title: "Best Sleep Times Based on 90-Minute Cycles",
      description: "Find out if you should be aiming for 4, 5, or 6 complete cycles tonight for optimal morning energy.",
      url: "/best-sleep-times-based-on-90-minute-cycles",
      icon: <BedDouble size={20} />,
      topic: "Sleep Timing",
      color: "text-[#ec4899]"
    },
    {
      title: "The Best Time to Sleep: Finding Your Perfect Bedtime",
      description: "Discover the absolute best time to sleep and wake up based on biology and 90-minute sleep cycles. Learn how a sleep calculator can fix your routine.",
      url: "/best-time-to-sleep",
      icon: <Clock size={20} />,
      topic: "Sleep Timing",
      color: "text-[#00d2ff]"
    },
    {
      title: "The Ultimate Sleep Cycle Guide: What Happens When You Sleep?",
      description: "Learn about the 4 stages of sleep, REM, deep sleep, and how the 90-minute sleep cycle works. Stop waking up tired by mastering your biology.",
      url: "/sleep-cycle-guide",
      icon: <Activity size={20} />,
      topic: "Sleep Science",
      color: "text-[#fcd34d]"
    },
    {
      title: "How Much Sleep Do You Need? A Sleep by Age Guide",
      description: "Find out exactly how many hours of sleep you need based on your age. From newborns to seniors, learn how sleep requirements change over time.",
      url: "/sleep-by-age",
      icon: <BedDouble size={20} />,
      topic: "Health",
      color: "text-[#ec4899]"
    },
    {
      title: "Why You Feel Tired Even After 8 Hours of Sleep",
      description: "Constantly exhausted despite getting enough sleep? Discover the hidden causes of daily fatigue, from sleep inertia to poor sleep hygiene.",
      url: "/why-you-feel-tired",
      icon: <Battery size={20} />,
      topic: "Energy",
      color: "text-[#10b981]"
    },
    {
      title: "The Ultimate Power Nap Guide: How to Sleep During the Day",
      description: "Stop waking up from naps feeling worse. Learn the optimal power nap lengths, from the 20-minute energy boost to the full 90-minute cycle.",
      url: "/power-nap-guide",
      icon: <Moon size={20} />,
      topic: "Napping",
      color: "text-[#a855f7]"
    }
  ];

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 py-12">
      <Helmet>
        <title>Sleep Blog & Resources | Sleep Calculator</title>
        <meta name="description" content="Read our latest guides on the best time to sleep, understanding sleep cycles, and how to stop feeling tired throughout the day." />
      </Helmet>

      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d2ff] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#00d2ff] focus-visible:outline-none rounded-lg px-2 py-1 -ml-2">
          <ArrowLeft size={20} />
          Back to Calculator
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center mb-16 text-center"
      >
        <BookOpen className="text-[#00d2ff] mb-4" size={48} />
        <h1 className="text-4xl font-bold tracking-wide mb-4 text-white">Sleep Better Blog</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Learn how to optimize your rest, understand your REM cycles, and wake up feeling refreshed every single day.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article, index) => {
          const isFeatured = index === 0;
          return (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`group bg-[#130f2e]/60 border border-white/5 rounded-3xl backdrop-blur-md shadow-xl hover:bg-[#1a153a]/80 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden relative ${isFeatured ? 'md:col-span-2 lg:col-span-3 lg:flex-row' : ''}`}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            
            <div className={`p-8 sm:p-10 flex flex-col justify-between w-full h-full ${isFeatured ? 'lg:w-2/3 lg:pr-12' : ''}`}>
              <div>
                <div className={`flex items-center gap-3 ${article.color} mb-5 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/5 shadow-inner`}>
                  {article.icon}
                  <span className="text-xs font-bold tracking-wider uppercase">{article.topic}</span>
                </div>
                <h2 className={`${isFeatured ? 'text-3xl sm:text-4xl lg:text-5xl lg:leading-tight mb-6' : 'text-2xl mb-4'} font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[${article.color.replace('text-[', '').replace(']', '')}] transition-all duration-300`}>
                  <Link to={article.url} className="before:absolute before:inset-0 focus-visible:outline-none">{article.title}</Link>
                </h2>
                <p className={`text-white/70 leading-relaxed ${isFeatured ? 'text-lg sm:text-xl mb-8 max-w-3xl' : 'text-base mb-8'} flex-grow`}>
                  {article.description}
                </p>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                <span className="inline-flex items-center gap-2 text-white/90 font-semibold group-hover:text-[#00d2ff] transition-colors text-sm">
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            
            {isFeatured && (
              <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-[#00d2ff]/10 to-[#a855f7]/10 border-l border-white/5 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00d2ff]/20 via-transparent to-transparent opacity-50 blur-2xl"></div>
                {article.icon && (
                  <div className="text-white/20 transform scale-[5] drop-shadow-2xl">
                    {article.icon}
                  </div>
                )}
              </div>
            )}
          </motion.article>
        )})}
      </div>
    </div>
  );
}
