import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { FAQAccordion } from '../components/FAQAccordion';

export default function SleepFAQ() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Sleep FAQs & Knowledge Base | Sleep Calculator</title>
        <meta name="description" content="Frequently asked questions about sleep cycles, how to use a sleep calculator, falling asleep faster, and waking up with more energy." />
      </Helmet>

      <div
        className="animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <Link to="/" className="inline-flex items-center text-white/50 hover:text-[#00d2ff] mb-8 font-medium transition-colors focus-visible:outline-none focus-visible:text-[#00d2ff]">
          <ChevronLeft size={16} className="mr-1" /> Back
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 mb-4">FAQs</h1>
          <p className="text-xl text-white/60">Everything you need to know about optimizing your rest.</p>
        </header>

        <section className="bg-[#130f2e] border border-white/5 rounded-3xl p-6 md:p-10 shadow-lg mb-12">
          <FAQAccordion />
        </section>

        <div className="text-center p-8 bg-gradient-to-r from-[#00d2ff]/10 to-[#a855f7]/10 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Have more questions?</h2>
          <p className="text-white/70 mb-6">Check out our comprehensive guides to learn the science behind perfect sleep.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-colors border border-white/10">
            Read Sleep Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
