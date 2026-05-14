import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>Privacy Policy – Sleep Calculator</title>
        <meta name="description" content="Read the privacy policy of Sleep Calculator to understand how user data and privacy are protected on our website." />
        <meta name="keywords" content="privacy policy, data privacy, sleep calculator privacy" />
        <link rel="canonical" href="https://sleepcalculater.online/privacy" />
        <meta property="og:title" content="Privacy Policy – Sleep Calculator" />
        <meta property="og:description" content="Read the privacy policy of Sleep Calculator to understand how user data and privacy are protected on our website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sleepcalculater.online/privacy" />
      </Helmet>
      
      <div className="mb-8 text-left">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2 leading-tight font-serif">Privacy Policy</h1>
        <p className="text-gray-400 dark:text-gray-500 text-base mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">01. Local Processing (Calculator Data)</h2>
            <p>
              The core Sleep Calculator operates entirely on your device. We do not collect, store, or transmit your calculated sleep times or age group preferences to our servers. Any preferences you save (like time format or age group) are stored locally in your browser using standard built-in storage (localStorage) and never leave your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">02. Contact & Feedback Data</h2>
            <p>
              When you voluntarily use our Contact or Feedback forms, we securely store the information you provide (such as your name, email address, and message) in our encrypted database (hosted by Google Firebase). We use this information strictly to respond to your inquiries or improve the application based on your feedback. We will never sell, rent, or share your contact information with third parties.
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
