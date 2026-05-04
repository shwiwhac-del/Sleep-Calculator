import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { FAQAccordion } from './FAQAccordion';

interface ArticleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  readingTime?: string;
  date?: string;
  author?: string;
  relatedPosts?: { title: string; url: string; description: string }[];
  backUrl?: string;
  backLabel?: string;
}

export function ArticleLayout({ 
  title, 
  description, 
  children, 
  readingTime = "4", 
  date = "June 1, 2024", 
  author = "Sleep Expert Team",
  relatedPosts = [],
  backUrl = "/blog",
  backLabel
}: ArticleLayoutProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Helmet>
        <title>{title} | Sleep Calculator</title>
        <meta name="description" content={description} />
        {typeof window !== 'undefined' && (
          <link rel="canonical" href={`https://sleepcalculater.online${window.location.pathname}`} />
        )}
      </Helmet>

      <article className="animate-in fade-in slide-in-from-top-4 duration-500">
        <nav className="mb-8">
          <Link to={backUrl} className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium tracking-wide hover:text-gray-900 transition-colors focus-visible:outline-none">
            <ChevronLeft size={16} />
            {backLabel || (backUrl === "/" ? "Back to Home" : "Back to Blog")}
          </Link>
        </nav>
        
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs font-semibold mb-6 uppercase tracking-widest">
            <span>{author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight font-serif">{title}</h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium m-0 border-l-2 border-[#2563EB] pl-4">{description}</p>
        </header>

        <div className="prose prose-p:text-base md:prose-p:text-lg prose-p:text-gray-600 prose-headings:text-gray-900 prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline prose-li:text-base md:prose-li:text-lg prose-li:text-gray-600 prose-headings:font-bold prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:font-serif prose-h3:mt-8 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-3">
          {children}
        </div>

        <div className="mt-16 mb-8 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Common Questions</h2>
          <FAQAccordion />
        </div>

        <div className="mt-16 mb-8 bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">Ready to fix your sleep?</h3>
          <p className="text-sm text-gray-600 max-w-sm mb-6">Use our free calculator to find the exact time you should go to bed tonight based on your natural 90-minute sleep cycles.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#1D4ED8] transition-colors shadow-sm">
            Calculate My Bedtime
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-100 pt-12 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Keep Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((post, idx) => (
                <Link key={idx} to={post.url} className="group bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md rounded-[24px] p-6 transition-all flex flex-col h-full">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2563EB] transition-colors font-serif">{post.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-full flex-grow">{post.description}</p>
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
