import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Moon, Clock, ArrowRight, User, Calendar, ShieldCheck, Check } from 'lucide-react';
import { FAQAccordion } from './FAQAccordion';

interface ArticleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  readingTime: string;
  date: string;
  author?: string;
  relatedPosts?: { title: string; url: string; description: string }[];
  backUrl?: string;
}

export function ArticleLayout({ 
  title, 
  description, 
  children, 
  readingTime, 
  date, 
  author = "Sleep Expert Team",
  relatedPosts = [],
  backUrl = "/blog"
}: ArticleLayoutProps) {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-6 py-12 sm:py-20">
      <Helmet>
        <title>{title} | Sleep Calculator</title>
        <meta name="description" content={description} />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "author": {
              "@type": "Person",
              "name": author
            },
            "datePublished": new Date().toISOString(),
            "publisher": {
              "@type": "Organization",
              "name": "Sleep Calculator",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ais-pre-cc6uo5h5yd6pa5c23uljkb-733785498368.asia-southeast1.run.app/favicon.ico"
              }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ais-pre-cc6uo5h5yd6pa5c23uljkb-733785498368.asia-southeast1.run.app/"
              },
              ...(backUrl === "/blog" ? [{
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://ais-pre-cc6uo5h5yd6pa5c23uljkb-733785498368.asia-southeast1.run.app/blog"
              }] : []),
              {
                "@type": "ListItem",
                "position": backUrl === "/blog" ? 3 : 2,
                "name": title
              }
            ]
          })}
        </script>
      </Helmet>

      <article className="animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
        <nav className="mb-8">
          <Link to={backUrl} className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-[#00d2ff] transition-colors focus-visible:outline-none focus-visible:text-[#00d2ff]">
            <ChevronLeft size={16} />
            Back
          </Link>
        </nav>
        
        <header className="mb-12 relative overflow-hidden rounded-3xl bg-[#130f2e]/60 border border-white/5 p-8 sm:p-12 shadow-xl">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm font-semibold mb-8">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 pr-5 pl-2 py-2 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00d2ff] to-[#3a7bd5] rounded-full flex items-center justify-center text-white font-bold">
                  {author.charAt(0)}
                </div>
                <div className="flex flex-col">
                   <span className="text-white block leading-none mb-1">{author}</span>
                   <span className="text-[10px] font-normal text-white/50 tracking-wider uppercase">Certified Sleep Expert</span>
                </div>
              </div>
              <span className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-full flex items-center gap-2">
                 <Calendar size={14} className="text-white/40" /> {date}
              </span>
              <span className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-full flex items-center gap-2">
                 <Clock size={14} className="text-white/40" /> {readingTime} min read
              </span>
              <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 px-4 py-2.5 rounded-full flex items-center gap-2">
                 <ShieldCheck size={14} /> Fact Checked
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-8 leading-snug">{title}</h1>
            <div className="bg-[#00d2ff]/10 border border-[#00d2ff]/20 rounded-2xl p-6 sm:p-8">
               <h3 className="text-[#00d2ff] font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2"><Check size={18}/> Quick Summary</h3>
               <p className="text-lg text-white/90 leading-relaxed font-medium m-0">{description}</p>
            </div>
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

        <div className="max-w-[75ch] mx-auto mt-16 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Common Questions About This Topic</h2>
          <FAQAccordion />
        </div>

        {/* Global Article CTA */}
        <div className="mt-8 mb-16 max-w-[75ch] mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a153a] to-[#0d0a26] border border-[#00d2ff]/30 p-8 sm:p-12 text-center shadow-[0_0_40px_rgba(0,210,255,0.1)]">
          <div className="absolute shrink-0 top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-[#00d2ff]/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Moon className="text-[#00d2ff] mb-6" size={40} />
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to fix your sleep?</h3>
            <p className="text-lg text-white/70 max-w-lg mb-8">Stop waking up tired. Use our free calculator to find the exact time you should go to bed tonight based on your natural 90-minute sleep cycles.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg border border-blue-400/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
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
      </article>
    </div>
  );
}
