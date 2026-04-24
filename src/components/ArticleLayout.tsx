import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, Moon, Clock, ArrowRight, User } from 'lucide-react';
import { motion } from 'motion/react';

interface ArticleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  readingTime: string;
  date: string;
  author?: string;
  backLink?: string;
  backLabel?: string;
  relatedPosts?: { title: string; url: string; description: string }[];
}

export function ArticleLayout({ 
  title, 
  description, 
  children, 
  readingTime, 
  date, 
  author = "Sleep Expert Team",
  backLink = "/", 
  backLabel = "Back to Calculator",
  relatedPosts = []
}: ArticleLayoutProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 py-12 sm:py-20">
      <Helmet>
        <title>{title} | Sleep Calculator</title>
        <meta name="description" content={description} />
      </Helmet>

      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="mb-8">
          <Link to={backLink} className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-[#00d2ff] transition-colors focus-visible:outline-none focus-visible:text-[#00d2ff]">
            <ChevronLeft size={16} />
            {backLabel}
          </Link>
        </nav>
        
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-[#130f2e]/60 border border-white/5 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-[#00d2ff]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 p-32 bg-[#a855f7]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm font-semibold uppercase tracking-widest mb-6">
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5"><User size={14} /> {author}</span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">{date}</span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">{readingTime} min read</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 mb-6 leading-[1.15]">{title}</h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">{description}</p>
          </div>
        </header>

        <div className="prose prose-invert max-w-[75ch] mx-auto 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
          prose-h2:text-3xl md:prose-h2:text-[32px] prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-white/95
          prose-h3:text-2xl md:prose-h3:text-[24px] prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-[#00d2ff]
          prose-p:text-white/80 prose-p:leading-[1.8] md:prose-p:leading-[1.9] prose-p:mb-8 text-[17px] md:text-[19px] tracking-wide
          prose-a:text-[#00d2ff] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors
          prose-strong:text-white/95 prose-strong:font-semibold
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8 prose-li:text-white/80 prose-li:mb-3 prose-li:leading-[1.8]
          pb-16 mt-8">
          {children}
        </div>

        {/* Global Article CTA */}
        <div className="mt-8 mb-16 max-w-[75ch] mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a153a] to-[#0d0a26] border border-[#00d2ff]/30 p-8 sm:p-12 text-center shadow-[0_0_40px_rgba(0,210,255,0.1)]">
          <div className="absolute shrink-0 top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-[#00d2ff]/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Moon className="text-[#00d2ff] mb-6" size={40} />
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to fix your sleep?</h3>
            <p className="text-lg text-white/70 max-w-lg mb-8">Stop waking up tired. Use our free calculator to find the exact time you should go to bed tonight based on your natural 90-minute sleep cycles.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#0088ff] hover:from-[#40c9ff] hover:to-[#00d2ff] text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
              <Clock size={20} />
              Calculate My Bedtime
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-[75ch] mx-auto border-t border-white/10 pt-12 mb-24">
            <h3 className="text-2xl font-bold text-white mb-8">Keep Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((post, idx) => (
                <Link key={idx} to={post.url} className="group bg-white/5 border border-white/5 hover:border-[#00d2ff]/30 rounded-2xl p-6 transition-all hover:bg-white/10 flex flex-col h-full">
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#00d2ff] transition-colors">{post.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed max-w-full flex-grow">{post.description}</p>
                  <span className="inline-flex items-center gap-2 text-white/50 group-hover:text-[#00d2ff] text-sm mt-4 font-semibold transition-colors">
                    Read guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
}
