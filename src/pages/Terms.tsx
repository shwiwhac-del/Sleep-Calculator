import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function Terms() {
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight font-serif">Terms & Conditions</h1>

        <div onContextMenu={(e) => e.stopPropagation()} className="select-text space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p>
            Welcome to SleepCalculater.online. By accessing or using our website, you agree to these Terms & Conditions. Please read them carefully before using our calculators, guides, or other resources.
          </p>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Use of the Website</h2>
            <p className="mb-3">
              SleepCalculater.online is provided for educational and informational purposes. By using this website, you agree to use it responsibly and lawfully.
            </p>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Attempt unauthorized access to the website or its systems.</li>
              <li>Copy, reproduce, or distribute our content without permission.</li>
              <li>Use automated tools or activities that may overload or disrupt the website.</li>
              <li>Engage in any activity that could harm the website or other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Educational Purpose Only</h2>
            <p>
              Our sleep calculators, recommendations, and articles are designed to provide general educational information. They should not be considered medical advice, diagnosis, or treatment. If you have concerns about your sleep or health, please consult a qualified healthcare professional.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Accuracy of Information</h2>
            <p>
              We work hard to keep our calculators and content accurate, reliable, and up to date. However, we cannot guarantee that every calculation, article, or feature will always be completely accurate, uninterrupted, or error-free. Your use of this website is at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Intellectual Property</h2>
            <p>
              All content on SleepCalculater.online—including text, calculators, graphics, branding, logos, design elements, and original materials—is protected by applicable copyright and intellectual property laws. Unauthorized use or reproduction is prohibited without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites for additional information or resources. We do not control or endorse the content, services, or privacy practices of those websites and are not responsible for them.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Limitation of Liability</h2>
            <p>
              SleepCalculater.online is not responsible for any direct, indirect, incidental, or consequential loss or damage resulting from the use of this website, including reliance on sleep calculations, educational content, or temporary service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Changes to These Terms</h2>
            <p>
              We may update these Terms & Conditions from time to time to reflect changes to our website, services, or legal requirements. Any updates will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">Contact Us</h2>
            <p>
              If you have any questions about these Terms & Conditions, please visit our <Link to="/contact" className="text-[#7C3AED] font-bold hover:underline">Contact page</Link> or email us at <a href="mailto:support@sleepcalculater.online" className="text-[#7C3AED] font-mono font-bold hover:underline">support@sleepcalculater.online</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
