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
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">Medical Disclaimer</h1>
        <p className="text-gray-400 dark:text-gray-500 text-base mb-12">Last Updated: May 2026</p>
        
        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <p>
            The information provided on SleepCalculator.online is for general informational and educational purposes only.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Not Medical Advice</h2>
            <p className="mb-4">This website does NOT provide:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Medical diagnosis</li>
              <li>Treatment plans</li>
              <li>Professional healthcare advice</li>
            </ul>
            <p>
              The sleep calculations and recommendations are based on general sleep cycle estimates and may not be accurate for every individual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Consult a Professional</h2>
            <p className="mb-4">Always consult a qualified healthcare provider or medical professional regarding:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Sleep disorders</li>
              <li>Chronic fatigue</li>
              <li>Insomnia</li>
              <li>Medical conditions</li>
              <li>Health concerns</li>
            </ul>
            <p>
              Do not ignore professional medical advice because of information found on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">No Guarantees</h2>
            <p className="mb-4">We make no guarantees regarding:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Sleep quality improvements</li>
              <li>Health outcomes</li>
              <li>Accuracy for all users</li>
            </ul>
            <p>
              Every individual's sleep needs and health conditions are different.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Use at Your Own Risk</h2>
            <p>
              Your use of this website and reliance on any information provided is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Emergency Situations</h2>
            <p>
              If you believe you have a medical emergency, contact a licensed healthcare professional or emergency services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Contact</h2>
            <p>
              If you have questions regarding this disclaimer, please use the Contact page on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
