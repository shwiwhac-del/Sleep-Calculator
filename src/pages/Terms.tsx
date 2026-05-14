import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Helmet>
        <title>Terms and Conditions – Sleep Calculator</title>
        <meta name="description" content="Review the terms and conditions for using the Sleep Calculator website and its online sleep tools." />
        <meta name="keywords" content="terms of service, terms and conditions, sleep calculator terms" />
        <link rel="canonical" href="https://sleepcalculater.online/terms" />
        <meta property="og:title" content="Terms and Conditions – Sleep Calculator" />
        <meta property="og:description" content="Review the terms and conditions for using the Sleep Calculator website and its online sleep tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sleepcalculater.online/terms" />
      </Helmet>
      
      <div className="mb-8 text-left">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-white transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>
      
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2 leading-tight font-serif">Terms of Service</h1>
        <p className="text-gray-400 dark:text-gray-500 text-base mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">01. Acceptance of Terms</h2>
            <p>
              By accessing and using Sleep Calculator, you accept and agree to be bound by the terms and provision of this agreement. Our service is designed to help you calculate optimal sleep cycles based on standard scientific averages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">02. Use License</h2>
            <p>
              Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only. You may not modify or copy the materials, use them for any commercial purpose, or attempt to decompile or reverse engineer any software contained on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">03. Medical Disclaimer</h2>
            <p>
              <strong>Important:</strong> The materials on Sleep Calculator are provided for general informational purposes only. This tool is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or sleep disorder.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
