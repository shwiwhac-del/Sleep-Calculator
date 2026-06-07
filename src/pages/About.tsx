import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>About Sleep Calculator – Sleep Cycle & Bedtime Tool</title>
        <meta name="description" content="Learn about Sleep Calculator and how our tool helps users calculate the best sleep and wake-up times using sleep cycles." />
        <meta name="keywords" content="about sleep calculator, sleep cycle tool, mission, sleep health" />
        <link rel="canonical" href="https://sleepcalculater.online/about" />
        <meta property="og:title" content="About Sleep Calculator – Sleep Cycle & Bedtime Tool" />
        <meta property="og:description" content="Learn about Sleep Calculator and how our tool helps users calculate the best sleep and wake-up times using sleep cycles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sleepcalculater.online/about" />
      </Helmet>
      
      <div className="mb-8 text-left">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight font-serif">About This Sleep Calculator</h1>
        
        <div className="space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
            We built this tool because waking up shouldn't feel like a chore. Our mission is to help people optimize their energy naturally by understanding their biological rhythms.
          </p>
          <p>
            Whether you are struggling with a disrupted internal clock, shift work, or just daily grogginess, we wanted to build a simple, privacy-focused tool that gives you optimized sleep times without requiring you to download an app or sign up for an account. 
          </p>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Why We Created This</h2>
            <p className="mb-4">
              Many people sleep for a full 8 hours but still drag themselves out of bed feeling exhausted. The problem usually isn't how <em>long</em> they slept, but <em>when</em> their alarm went off.
            </p>
            <p className="mb-4">
              Waking up in the middle of a "deep sleep" phase causes sleep inertia—that heavy, foggy feeling that takes hours to shake off. We created this calculator to do the math for you, allowing you to time your alarms perfectly so you wake up at the end of a 90-minute sleep cycle when your body is naturally ready to rise.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">How It Works</h2>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Why Use This Sleep Calculator</h2>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Who Is This For?</h2>
            <p className="mb-4">This tool is useful for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Students</li>
              <li>Professionals</li>
              <li>Anyone struggling with sleep timing</li>
              <li>People who want better daily productivity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Important Note</h2>
            <p className="mb-4">
              This tool provides general estimates based on average sleep cycles. Individual sleep needs may vary depending on health, lifestyle, and habits.
            </p>
            <p>
              For serious sleep issues, it’s always best to consult a medical professional.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Continuous Improvement</h2>
            <p>
              This is an evolving tool, and improvements are being made regularly to enhance accuracy and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Try It Yourself</h2>
            <p className="mb-4">
              Ready to improve your sleep schedule?
            </p>
            <p className="mb-4">
              👉 <Link to="/" className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors">Use the Sleep Calculator</Link> and find your ideal sleep time now.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[14px] mt-8 pt-8 border-t border-gray-100 dark:border-[#1e293b]">
              Built to keep things simple, fast, and actually useful.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Build By <a href="https://shafiqbuilds.site/" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] transition-colors underline underline-offset-2">ShafiqBuild</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
