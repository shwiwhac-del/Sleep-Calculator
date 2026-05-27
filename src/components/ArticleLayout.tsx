import { ReactNode, MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { FAQAccordion } from './FAQAccordion';

interface ArticleLayoutProps {
  title: string;
  description: string;
  keywords?: string;
  children: ReactNode;
  readingTime?: string;
  date?: string;
  author?: string;
  relatedPosts?: { title: string; url: string; description: string }[];
  backUrl?: string;
  backLabel?: string;
}

const DEFAULT_RELATED_POSTS = [
  {
    title: "Why Sleep Cycles Matter More Than Sleeping Longer",
    url: "/blog/why-sleep-cycles-matter-more-than-sleeping-longer",
    description: "Learn why proper REM timing is far more essential to avoid waking up tired than simply getting more hours of sleep."
  },
  {
    title: "The Ultimate Sleep Cycle Guide: 4 Stages Of Sleep",
    url: "/blog/sleep-cycle-stages",
    description: "Discover the 4 stages of sleep, REM, deep sleep, and how the 90-minute sleep cycle works to restore your mind."
  },
  {
    title: "How to Fix Your Sleep Schedule",
    url: "/blog/fix-sleep-schedule",
    description: "Learn scientifically-proven methods to reset your circadian rhythm and fix your sleep schedule fast."
  },
  {
    title: "Sleep Cycle Calculator: Bedtime Logic Explained",
    url: "/blog/sleep-cycle-calculator",
    description: "Learn how a Sleep Cycle Calculator helps you wake up refreshed by optimizing your REM sleep cycles."
  },
  {
    title: "How Much Sleep Do You Need? A Sleep by Age Guide",
    url: "/blog/sleep-age",
    description: "Find out exactly how many hours of sleep you need based on your age. From newborns to seniors, learn how sleep changes."
  },
  {
    title: "Nap Calculator for Energy: Precise Timings",
    url: "/blog/nap-calculator-for-energy",
    description: "Discover the scientific sweet spots for midday naps to maximize cognitive energy without feeling groggy."
  }
];

export function ArticleLayout({ 
  title, 
  description, 
  keywords,
  children, 
  readingTime = "4", 
  date = "June 1, 2024", 
  author = "Sleep Expert Team",
  relatedPosts = [],
  backUrl = "/",
  backLabel = "Back to Calculator"
}: ArticleLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/blog');
  };

  const currentUrl = `https://sleepcalculater.online${location.pathname}`;

  // Fallback related posts for robust internal linking when specific ones aren't provided/empty
  const activeRelated = relatedPosts && relatedPosts.length > 0
    ? relatedPosts
    : DEFAULT_RELATED_POSTS.filter(post => post.url !== location.pathname).slice(0, 2);

  const authorProfile = {
    name: author,
    title: "Certified Sleep Science Coach",
    description: "An expert in sleep hygiene, chronobiology, and productivity. Dedicated to helping people optimize their sleep cycles for better health and daily energy.",
    img: `https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=e2e8f0`
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": authorProfile.name,
      "url": "https://sleepcalculater.online/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sleep Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sleepcalculater.online/icon.svg"
      }
    },
    "datePublished": new Date(date).toISOString(),
    "url": currentUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sleepcalculater.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": backLabel || (backUrl === "/" ? "Home" : "Blog"),
        "item": `https://sleepcalculater.online${backUrl === "/" ? "" : backUrl}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": currentUrl
      }
    ]
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Helmet>
        <title>{title} | Sleep Calculator</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`${title} | Sleep Calculator`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <script type="application/ld+json">
          {JSON.stringify([articleSchema, breadcrumbSchema])}
        </script>
      </Helmet>

      <article className="animate-in fade-in slide-in-from-top-4 duration-500">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-y-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#2563EB] dark:hover:text-[#3b82f6] transition-colors font-semibold">Calculator</Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <Link to="/blog" className="hover:text-[#2563EB] dark:hover:text-[#3b82f6] transition-colors font-semibold">Blog</Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-gray-400 dark:text-gray-500 font-medium truncate max-w-[180px] sm:max-w-[280px]" title={title}>{title}</span>
          </div>
          <button onClick={handleBack} className="inline-flex items-center gap-1.5 text-xs text-gray-450 dark:text-gray-500 font-semibold uppercase tracking-wider hover:text-[#2563EB] dark:hover:text-[#3b82f6] transition-colors focus-visible:outline-none cursor-pointer">
            <ChevronLeft size={14} /> Back to Blog
          </button>
        </nav>
        
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <img src={authorProfile.img} alt={authorProfile.name} className="w-12 h-12 rounded-full border-2 border-gray-100 dark:border-gray-800" />
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-bold text-sm">{authorProfile.name}</p>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">
                  <span>{date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
            {/* Social Share could go here */}
          </div>
          <h1 className="select-text text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-tight font-serif">{title}</h1>
          <p className="select-text text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium m-0 border-l-2 border-[#2563EB] pl-4">{description}</p>
        </header>

        <div onContextMenu={(e) => e.stopPropagation()} className="prose select-text dark:prose-invert prose-p:text-base md:prose-p:text-lg prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline prose-li:text-base md:prose-li:text-lg prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-headings:font-bold prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:font-serif prose-h3:mt-8 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-3">
          {children}
        </div>

        <div className="mt-16 mb-8 pt-8 border-t border-gray-100 dark:border-[#1e293b]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-serif">Common Questions</h2>
          <FAQAccordion />
        </div>

        <div className="mt-12 bg-white dark:bg-[#111827] border border-gray-100 dark:border-[#1e293b] rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-sm">
          <img src={authorProfile.img} alt={authorProfile.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gray-200 dark:border-gray-800 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{authorProfile.name}</h3>
            <p className="text-[#2563EB] font-medium text-sm mb-3">{authorProfile.title}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{authorProfile.description}</p>
            <Link to="/about" className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors">
              Learn more about our methodology <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="mt-12 mb-8 bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-[#1e293b] rounded-2xl p-8 text-center flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Ready to fix your sleep?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mb-6">Use our free calculator to find the exact time you should go to bed tonight based on your natural 90-minute sleep cycles.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#1D4ED8] transition-colors shadow-sm">
            Calculate My Bedtime
          </Link>
        </div>

        {activeRelated.length > 0 && (
          <div className="border-t border-gray-100 dark:border-[#1e293b] pt-12 mb-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-serif">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activeRelated.map((post, idx) => (
                <Link key={idx} to={post.url} className="group bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1e293b] hover:border-gray-300 dark:hover:border-gray-600 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 rounded-[24px] p-6 sm:p-7 transition-all duration-300 flex flex-col h-full">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#2563EB] dark:group-hover:text-[#2563EB] transition-colors font-serif">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-full flex-grow">{post.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#2563EB] font-semibold text-sm mt-4 transition-colors">
                    Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
