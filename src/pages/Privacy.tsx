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
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">Privacy Policy</h1>
        <p className="text-gray-400 dark:text-gray-500 text-base mb-12">Last Updated: May 2026</p>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <section>
            <p>
              Welcome to SleepCalculator.online. Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Information We Collect</h2>
            <p className="mb-4">We may collect:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Basic device and browser information</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar technologies</li>
              <li>Voluntarily submitted contact information</li>
            </ul>
            <p>
              We do NOT collect sensitive personal health records or medical history.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">How We Use Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve website performance</li>
              <li>Analyze traffic and usage behavior</li>
              <li>Fix bugs and optimize user experience</li>
              <li>Protect against spam and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Cookies</h2>
            <p className="mb-4">Our website may use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Remember user preferences</li>
              <li>Improve performance</li>
              <li>Analyze visitor behavior</li>
            </ul>
            <p>
              You can disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Third-Party Services</h2>
            <p className="mb-4">We may use third-party services such as:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Analytics providers</li>
              <li>Advertising networks</li>
              <li>Hosting providers</li>
            </ul>
            <p>
              These services may collect limited technical data according to their own privacy policies.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Data Security</h2>
            <p>
              We take reasonable measures to protect user data, but no internet transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">External Links</h2>
            <p>
              Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Children's Privacy</h2>
            <p>
              This website is not intended for children under 13 years of age.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Consent</h2>
            <p>
              By using this website, you consent to this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">Contact</h2>
            <p>
              If you have questions regarding this Privacy Policy, please use the Contact page on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
