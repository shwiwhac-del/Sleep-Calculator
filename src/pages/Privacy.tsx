import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function Privacy() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <OpenGraphTags />
      
      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight font-serif">Privacy Policy</h1>
        <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-6 md:mb-8">Last Updated: May 2026</p>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <p>
              Welcome to sleepcalculater.online. Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Information We Collect</h2>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">How We Use Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve website performance</li>
              <li>Analyze traffic and usage behavior</li>
              <li>Fix bugs and optimize user experience</li>
              <li>Protect against spam and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Cookies</h2>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Third-Party Services</h2>
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Data Security</h2>
            <p>
              We take reasonable measures to protect user data, but no internet transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">External Links</h2>
            <p>
              Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Children's Privacy</h2>
            <p>
              This website is not intended for children under 13 years of age.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Consent</h2>
            <p>
              By using this website, you consent to this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Contact Information</h2>
            <p>
              If you have questions regarding this Privacy Policy, cookie settings, analytics, or wish to request contact data deletion, please utilize our <Link to="/contact" className="text-[#7C3AED] font-bold hover:underline">Contact details page</Link> or email us at <a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] font-mono font-bold hover:underline">support@sleepcalculater.online</a>.
            </p>
          </section>

          <section className="pt-6 border-t border-[#E5E7EB] dark:border-gray-800">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Sleep Health Guides</h2>
            <p className="mb-4 text-sm sm:text-base">To learn more about optimizing your sleep environment and bedtime schedules, read our popular science guides:</p>
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
