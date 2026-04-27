import { Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d2ff] mb-6 transition-colors focus-visible:outline-none focus-visible:text-[#00d2ff]">
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="bg-[#1d1842] border border-white/10 rounded-[2rem] p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40c9ff] to-[#0088ff]" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#00d2ff]/10 rounded-2xl border border-[#00d2ff]/20">
            <Lock className="text-[#00d2ff]" size={32} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">Privacy Policy</h1>
            <p className="text-white/60 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#00d2ff]">01.</span> Local Processing
            </h2>
            <p className="bg-[#130f2e]/50 p-5 rounded-2xl border border-white/5">
              Sleep Calculator is a strictly client-side application. We do not collect, store, or transmit any personal data, sleep times, or usage information to our servers. All calculations are performed entirely locally within your web browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#00d2ff]">02.</span> Zero Tracking
            </h2>
            <p className="bg-[#130f2e]/50 p-5 rounded-2xl border border-white/5">
              We respect your digital privacy. This application does not use cookies, analytics trackers, or any third-party surveillance mechanisms. What you do on this site stays on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#00d2ff]">03.</span> Policy Updates
            </h2>
            <p className="bg-[#130f2e]/50 p-5 rounded-2xl border border-white/5">
              We may update our Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Any changes will be immediately posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
