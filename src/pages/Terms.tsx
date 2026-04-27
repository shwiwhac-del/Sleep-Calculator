import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Terms() {
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
            <ShieldCheck className="text-[#00d2ff]" size={32} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">Terms of Service</h1>
            <p className="text-white/60 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#00d2ff]">01.</span> Acceptance of Terms
            </h2>
            <p className="bg-[#130f2e]/50 p-5 rounded-2xl border border-white/5">
              By accessing and using Sleep Calculator, you accept and agree to be bound by the terms and provision of this agreement. Our service is designed to help you calculate optimal sleep cycles based on standard scientific averages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#00d2ff]">02.</span> Use License
            </h2>
            <p className="bg-[#130f2e]/50 p-5 rounded-2xl border border-white/5">
              Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only. You may not modify or copy the materials, use them for any commercial purpose, or attempt to decompile or reverse engineer any software contained on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-[#00d2ff]">03.</span> Medical Disclaimer
            </h2>
            <div className="bg-[#00d2ff]/10 border border-[#00d2ff]/20 p-5 rounded-2xl">
              <p className="text-[#a5f3fc]">
                <strong>Important:</strong> The materials on Sleep Calculator are provided for general informational purposes only. This tool is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or sleep disorder.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
