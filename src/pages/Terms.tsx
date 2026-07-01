import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MAIN_PAGES_META } from '../blogMetadata';
import { getCanonicalUrl } from '../lib/seo';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function Terms() {
  const navigate = useNavigate();
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  const handleBack = () => {
    navigate('/');
  };

  const meta = MAIN_PAGES_META["/terms"];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <OpenGraphTags
        title={meta.title}
        description={meta.description}
        url={canonicalUrl}
      />
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="terms of service, terms and conditions, sleep calculator terms" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>
      
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">Terms & Conditions</h1>
        <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-6 md:mb-8">Last Updated: May 2026</p>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <p>
              By accessing and using sleepcalculater.online, you agree to the following Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Website Usage</h2>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">No Professional Advice</h2>
            <p>
              The sleep calculations and recommendations provided on this website are general informational estimates and should not be considered professional medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Accuracy of Information</h2>
            <p className="mb-4">We try to provide accurate information and calculations, but we do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Complete accuracy</li>
              <li>Continuous availability</li>
              <li>Error-free operation</li>
            </ul>
            <p>Users use the website at their own risk.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Intellectual Property</h2>
            <p>
              All website content, branding, logos, design elements, and tools are protected by copyright and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Third-Party Links</h2>
            <p>
              We may include links to third-party websites. We are not responsible for their content, services, or policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Limitation of Liability</h2>
            <p className="mb-4">sleepcalculater.online shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any direct or indirect damages</li>
              <li>Health-related decisions</li>
              <li>Sleep issues or medical consequences</li>
              <li>Loss of data or service interruptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Modifications</h2>
            <p>
              We reserve the right to modify or discontinue any part of the website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Termination</h2>
            <p>
              We may restrict or block access to users who violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Governing Terms & Questions</h2>
            <p className="mb-4">
              By continuing to browse, calculate, or read guides on this website, you explicitly agree to these Terms and Conditions.
            </p>
            <p>
              If you have any questions or require clarifications about our acceptable service guidelines, please head to our <Link to="/contact" className="text-[#7C3AED] font-bold hover:underline">Contact form page</Link> or send direct email coordinates to <a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] font-mono font-bold hover:underline">support@sleepcalculater.online</a>.
            </p>
          </section>

          <section className="pt-6 border-t border-[#E5E7EB] dark:border-gray-800">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Circadian Rhythm & Bedtime Resources</h2>
            <p className="mb-4 text-sm sm:text-base">We highly recommend digesting our peer-reviewed sleep optimization guides to develop wholesome resting calendars:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link to="/blog/sleep-cycles-explained" className="text-[#7C3AED] hover:underline">
                  Sleep Cycles Explained: Science of Rest
                </Link>
              </li>
              <li>
                <Link to="/blog/what-is-rem-sleep" className="text-[#7C3AED] hover:underline">
                  What Is REM Sleep and Why It Matters
                </Link>
              </li>
              <li>
                <Link to="/blog/how-much-sleep-do-you-need" className="text-[#7C3AED] hover:underline">
                  Recommended Sleep Hours by Age
                </Link>
              </li>
              <li>
                <Link to="/blog/best-time-to-sleep-and-wake-up" className="text-[#7C3AED] hover:underline">
                  Best Time to Sleep and Wake Up
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
