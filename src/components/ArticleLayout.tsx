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
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <Helmet>
        <title>{title} | Sleep Calculator</title>
        <meta name="description" content={description} />
        {typeof window !== 'undefined' && (
          <link rel="canonical" href={`https://sleepcalculater.online${window.location.pathname}`} />
        )}
      </Helmet>

      <article className="animate-in fade-in slide-in-from-top-4 duration-500">
        <nav className="mb-8">
          <Link to={backUrl} className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-white transition-colors focus-visible:outline-none">
            <ChevronLeft size={16} />
            {backLabel || (backUrl === "/" ? "Back to Home" : "Back to Blog")}
          </Link>
        </nav>
        
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 text-white/50 text-xs font-semibold mb-6 uppercase tracking-widest">
            <span>{author}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">{title}</h1>
          <p className="text-lg text-white/60 leading-relaxed font-medium m-0 border-l-2 border-[#00d2ff] pl-4">{description}</p>
        </header>

        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-a:text-[#00d2ff] prose-a:no-underline hover:prose-a:underline prose-li:text-white/70 prose-headings:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3">
          {children}
        </div>

        <div className="mt-16 mb-8 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Common Questions</h2>
          <FAQAccordion />
        </div>

        <div className="mt-16 mb-8 bg-white/5 border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center">
          <h3 className="text-xl font-bold text-white mb-3">Ready to fix your sleep?</h3>
          <p className="text-sm text-white/60 max-w-sm mb-6">Use our free calculator to find the exact time you should go to bed tonight based on your natural 90-minute sleep cycles.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors focus-visible:outline-none text-sm">
            Calculate My Bedtime
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <div className="border-t border-white/10 pt-12 mb-12">
            <h3 className="text-xl font-bold text-white mb-6">Keep Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((post, idx) => (
                <Link key={idx} to={post.url} className="group bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all flex flex-col h-full">
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#00d2ff] transition-colors">{post.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed max-w-full flex-grow">{post.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-white/40 group-hover:text-white text-xs mt-4 font-semibold transition-colors">
                    Read <ArrowRight size={12} />
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
