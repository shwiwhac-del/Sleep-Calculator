import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>About Us | Sleep Calculator</title>
        <meta name="description" content="Learn about Sleep Calculator, our mission to help you wake up refreshed, and why we built this free tool for better sleep health." />
        <meta name="keywords" content="about sleep calculator, sleep cycle tool, mission, sleep health" />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/about" />}
      </Helmet>
      
      <div className="mb-8 text-left">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight font-serif">About This Sleep Calculator</h1>
        
        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
            This Sleep Calculator is designed to help you find the best time to sleep and wake up based on natural sleep cycles.
          </p>
          <p>
            Instead of guessing your sleep schedule, this tool gives you optimized times so you can wake up feeling refreshed and more energized.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">How This Tool Helps You</h2>
            <p className="mb-4">
              Many people sleep for 7–8 hours but still wake up feeling tired. The problem is not just the duration — it’s the timing.
            </p>
            <p className="mb-4">This sleep calculator helps you:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Plan your bedtime more effectively</li>
              <li>Wake up at the end of a sleep cycle</li>
              <li>Avoid waking up during deep sleep</li>
              <li>Improve your daily energy and focus</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">How It Works</h2>
            <p className="mb-4">
              Sleep is divided into cycles, and each cycle lasts approximately 90 minutes.
            </p>
            <p className="mb-4">This tool calculates:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Multiple ideal sleep times</li>
              <li>Based on your selected wake-up time</li>
              <li>With an estimated 15-minute fall-asleep window</li>
            </ul>
            <p>
              By aligning your sleep with these cycles, you can wake up more naturally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Why Use This Sleep Calculator</h2>
            <p className="mb-4">
              Most online tools are either too basic or overloaded with unnecessary features.
            </p>
            <p className="mb-4">This calculator is built to be:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Simple and fast</li>
              <li>Easy to use</li>
              <li>Based on real sleep cycle logic</li>
              <li>Clean and distraction-free</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Who Is This For?</h2>
            <p className="mb-4">This tool is useful for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Students</li>
              <li>Professionals</li>
              <li>Anyone struggling with sleep timing</li>
              <li>People who want better daily productivity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Important Note</h2>
            <p className="mb-4">
              This tool provides general estimates based on average sleep cycles. Individual sleep needs may vary depending on health, lifestyle, and habits.
            </p>
            <p>
              For serious sleep issues, it’s always best to consult a medical professional.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Continuous Improvement</h2>
            <p>
              This is an evolving tool, and improvements are being made regularly to enhance accuracy and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Try It Yourself</h2>
            <p className="mb-4">
              Ready to improve your sleep schedule?
            </p>
            <p className="mb-4">
              👉 <Link to="/#tools" className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors">Use the Sleep Calculator</Link> and find your ideal sleep time now.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[14px] mt-8 pt-8 border-t border-gray-100 dark:border-[#222]">
              Built to keep things simple, fast, and actually useful.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
