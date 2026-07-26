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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight font-serif">Privacy Policy</h1>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p>
            At SleepCalculater.online, we value your privacy and are committed to protecting your information. This Privacy Policy explains what data we collect, why we collect it, and how it is used when you visit our website.
          </p>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Information We Collect</h2>
            <p className="mb-3">
              When you use our website, we may automatically collect limited technical information, including your browser type, device information, pages visited, and general usage statistics. We may also use cookies to remember your preferences and improve your browsing experience.
            </p>
            <p className="mb-3">
              If you contact us, we may collect the information you voluntarily provide, such as your name and email address.
            </p>
            <p>
              We do not collect or store your personal medical records, sleep history, or other sensitive health information.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">How We Use Your Information</h2>
            <p className="mb-3">The information we collect helps us:</p>
            <ul className="list-disc pl-6 space-y-1.5 mb-3">
              <li>Improve our calculators and website performance.</li>
              <li>Understand how visitors use our website.</li>
              <li>Fix technical issues and enhance user experience.</li>
              <li>Protect the website from spam, abuse, and security threats.</li>
              <li>Respond to questions or support requests.</li>
            </ul>
            <p>We never sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Cookies</h2>
            <p>
              SleepCalculater.online uses cookies and similar technologies to improve functionality, analyze website traffic, and provide a better user experience. You can control or disable cookies through your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Third-Party Services</h2>
            <p>
              We may use trusted third-party services such as analytics providers, advertising partners, and website hosting services. These providers may collect limited technical information in accordance with their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Data Security</h2>
            <p>
              We use reasonable security measures to help protect the information we collect. While no online service can guarantee absolute security, we continuously work to keep our website and data protected.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">External Links</h2>
            <p>
              Our website may contain links to other websites for additional information. We are not responsible for the privacy practices or content of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Children's Privacy</h2>
            <p>
              SleepCalculater.online is not intended for children under the age of 13, and we do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes to our website, services, or legal requirements. Any updates will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to contact us regarding your data, please visit our <Link to="/contact" className="text-[#7C3AED] font-bold hover:underline">Contact page</Link> or email us at <a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] font-mono font-bold hover:underline">support@sleepcalculater.online</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

