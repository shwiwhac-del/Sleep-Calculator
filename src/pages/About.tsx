import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Helmet>
        <title>About Us | Sleep Calculator</title>
        <meta name="description" content="Learn about Sleep Calculator, our mission to help you wake up refreshed, and why we built this free tool for better sleep health." />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/about" />}
      </Helmet>
      
      <div className="mb-8 text-left">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-white transition-colors focus-visible:outline-none">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl font-bold text-white mb-6">About Sleep Calculator</h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed text-sm sm:text-base">
          <p className="text-lg text-white">
            We believe everyone deserves to wake up feeling rested, energized, and ready to take on the day. Our mission is to make sleep science accessible and easy to apply.
          </p>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Our Story</h2>
            <p className="mb-4">
              Millions of people struggle with morning grogginess, often wondering why they feel exhausted even after getting eight hours of sleep. The truth lies within our biology—specifically, our 90-minute sleep cycles.
            </p>
            <p>
              We built Sleep Calculator to solve this exact problem. By aligning your wake-up times with the natural end of a sleep cycle, you can avoid "sleep inertia" and start your day with natural energy. We combine proven sleep science with a simple, free tool anyone can use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Science-Backed</h2>
            <p>
              Our tool calculates exact times based on the universal average 90-minute sleep cycle, helping you naturally hack your REM and deep sleep stages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Privacy First</h2>
            <p>
              We don't sell your data, require accounts, or track your habits. The calculator runs entirely in your browser. Period.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
