import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Helmet>
        <title>Privacy Policy | Sleep Calculator</title>
        <meta name="description" content="Review the Privacy Policy for Sleep Calculator. We believe in complete anonymity and do not track or store your personal sleep data." />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/privacy" />}
      </Helmet>
      
      <div className="mb-8 text-left">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-white transition-colors focus-visible:outline-none">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-white/50 text-sm mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-white/70 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">01. Local Processing</h2>
            <p>
              Sleep Calculator is a strictly client-side application. We do not collect, store, or transmit any personal data, sleep times, or usage information to our servers. All calculations are performed entirely locally within your web browser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">02. Zero Tracking</h2>
            <p>
              We respect your digital privacy. This application does not use cookies, analytics trackers, or any third-party surveillance mechanisms. What you do on this site stays on your device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">03. Policy Updates</h2>
            <p>
              We may update our Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Any changes will be immediately posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
