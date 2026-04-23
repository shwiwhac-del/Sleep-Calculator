import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, Moon, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ArticleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  readingTime: string;
  date: string;
  backLink?: string;
  backLabel?: string;
}

export function ArticleLayout({ title, description, children, readingTime, date, backLink = "/blog", backLabel = "Back to Guides" }: ArticleLayoutProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <Helmet>
        <title>{title} | Sleep Calculator</title>
        <meta name="description" content={description} />
      </Helmet>

      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to={backLink} className="inline-flex items-center text-white/50 hover:text-[#00d2ff] mb-8 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] rounded-lg px-2 py-1 -ml-2 text-sm uppercase tracking-wider">
          <ChevronLeft size={16} className="mr-1" /> {backLabel}
        </Link>
        
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-[#130f2e]/60 border border-white/5 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-[#00d2ff]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 p-32 bg-[#a855f7]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 text-white/60 text-sm font-semibold uppercase tracking-widest mb-6">
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">{date}</span>
              <span>•</span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">{readingTime} min read</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 mb-6 leading-[1.15]">{title}</h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">{description}</p>
          </div>
        </header>

        <div className="prose prose-invert prose-lg md:prose-xl max-w-[75ch] mx-auto 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
          prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
          prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-[#00d2ff] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors
          prose-strong:text-white prose-strong:font-semibold
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8 prose-li:text-white/80 prose-li:mb-2
          pb-16">
          {children}
        </div>

        {/* Global Article CTA */}
        <div className="mt-8 mb-20 max-w-[75ch] mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a153a] to-[#0d0a26] border border-[#00d2ff]/30 p-8 sm:p-12 text-center shadow-[0_0_40px_rgba(0,210,255,0.1)]">
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
      </motion.article>
    </div>
  );
}
