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
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>
      
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">Terms and Conditions</h1>
        <p className="text-gray-400 dark:text-gray-500 text-base mb-12">Last Updated: May 2026</p>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <section>
            <p>
              By accessing and using SleepCalculator.online, you agree to the following Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Website Usage</h2>
            <p className="mb-4">This website is provided for informational and educational purposes only.</p>
            <p className="mb-4">Users agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Abuse or attack the website</li>
              <li>Attempt unauthorized access</li>
              <li>Copy or redistribute website content without permission</li>
              <li>Use automated systems to overload the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">No Professional Advice</h2>
            <p>
              The sleep calculations and recommendations provided on this website are general informational estimates and should not be considered professional medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Accuracy of Information</h2>
            <p className="mb-4">We try to provide accurate information and calculations, but we do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Complete accuracy</li>
              <li>Continuous availability</li>
              <li>Error-free operation</li>
            </ul>
            <p>Users use the website at their own risk.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Intellectual Property</h2>
            <p>
              All website content, branding, logos, design elements, and tools are protected by copyright and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Third-Party Links</h2>
            <p>
              We may include links to third-party websites. We are not responsible for their content, services, or policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Limitation of Liability</h2>
            <p className="mb-4">SleepCalculator.online shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any direct or indirect damages</li>
              <li>Health-related decisions</li>
              <li>Sleep issues or medical consequences</li>
              <li>Loss of data or service interruptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Modifications</h2>
            <p>
              We reserve the right to modify or discontinue any part of the website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Termination</h2>
            <p>
              We may restrict or block access to users who violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Governing Terms</h2>
            <p>
              By continuing to use this website, you agree to these Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
