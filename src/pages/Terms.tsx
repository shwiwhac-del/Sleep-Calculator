import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Helmet>
        <title>Terms of Service | Sleep Calculator</title>
        <meta name="description" content="Review the Terms of Service for Sleep Calculator. We provide free sleep cycle tools without any medical warranties." />
        {typeof window !== 'undefined' && <link rel="canonical" href="https://sleepcalculater.online/terms" />}
      </Helmet>
      
      <div className="mb-8 text-left">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 font-medium tracking-wide hover:text-white transition-colors focus-visible:outline-none">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>
      
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-white/50 text-sm mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-white/70 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">01. Acceptance of Terms</h2>
            <p>
              By accessing and using Sleep Calculator, you accept and agree to be bound by the terms and provision of this agreement. Our service is designed to help you calculate optimal sleep cycles based on standard scientific averages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">02. Use License</h2>
            <p>
              Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only. You may not modify or copy the materials, use them for any commercial purpose, or attempt to decompile or reverse engineer any software contained on the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">03. Medical Disclaimer</h2>
            <p>
              <strong>Important:</strong> The materials on Sleep Calculator are provided for general informational purposes only. This tool is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or sleep disorder.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
