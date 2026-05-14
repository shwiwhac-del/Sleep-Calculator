import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Disclaimer() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>Medical Disclaimer – Sleep Calculator</title>
        <meta name="description" content="Important medical disclaimer regarding the use of the Sleep Calculator and its recommendations." />
        <link rel="canonical" href="https://sleepcalculater.online/disclaimer" />
      </Helmet>
      
      <div className="mb-8 text-left">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight font-serif">Medical Disclaimer</h1>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
            The Sleep Calculator website (sleepcalculater.online) and its associated tools are for informational and educational purposes only.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">Not Medical Advice</h2>
            <p>
              The information provided on this website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition, sleep disorder, or mental health issue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">No Doctor-Patient Relationship</h2>
            <p>
              Use of this website, including its calculators, recommendations, and articles, does not establish a doctor-patient relationship. Reliance on any information provided by Sleep Calculator, its authors, or others appearing on the site is solely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">Averages and Estimates</h2>
            <p>
              Our calculators use scientifically-backed averages (such as the typical 90-minute sleep cycle and a 15-minute sleep latency period). However, human biology varies significantly. Your personal sleep cycles, exact needs, and times required to fall asleep may be longer or shorter than the averages used by our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif">Emergencies</h2>
            <p>
              If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
