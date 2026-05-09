import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Privacy() {
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
        <title>Privacy Policy | Sleep Calculator</title>
        <meta name="description" content="Review the Privacy Policy for Sleep Calculator. We believe in complete anonymity and do not track or store your personal sleep data." />
        <meta name="keywords" content="privacy policy, data privacy, sleep calculator privacy" />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/privacy" />}
      </Helmet>
      
      <div className="mb-8 text-left">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2 leading-tight font-serif">Privacy Policy</h1>
        <p className="text-gray-400 dark:text-gray-500 text-base mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">01. Local Processing</h2>
            <p>
              Sleep Calculator is a strictly client-side application. We do not collect, store, or transmit any personal data, sleep times, or usage information to our servers. All calculations are performed entirely locally within your web browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">02. Zero Tracking</h2>
            <p>
              We respect your digital privacy. This application does not use cookies, analytics trackers, or any third-party surveillance mechanisms. What you do on this site stays on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">03. Policy Updates</h2>
            <p>
              We may update our Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Any changes will be immediately posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
