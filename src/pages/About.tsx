import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenGraphTags } from '../components/OpenGraphTags';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <OpenGraphTags />
      
      <div className="mb-8 text-left">
        <Breadcrumbs />
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide hover:text-gray-900 dark:text-gray-100 transition-colors focus-visible:outline-none"><ArrowLeft size={16} /> Back</button>
      </div>

      <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight font-serif">About Us</h1>
        
        <div className="space-y-5 md:space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
            Welcome to <strong>Sleep Calculator</strong>, where we translate complex clinical sleep science into simple, actionable tools. Our mission is to help people optimize their sleep quality, overcome morning fatigue, and align their alarms with natural biological rhythms.
          </p>

          <section className="bg-white dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 font-serif border-b border-gray-100 dark:border-[#1E293B] pb-2">Our Expert Editorial Team</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#7C3AED] dark:text-violet-400">Shafiq — Lead Sleep Researcher &amp; Founder</h3>
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  Shafiq is a sleep researcher and dedicated software developer. He translates peer-reviewed sleep physiology journals and sleep phase guidelines into easy-to-use digital interfaces that help you sleep smarter without unnecessary visual clutter.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Dr. Sarah Johnson, MBBS — Medical Reviewer</h3>
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  Dr. Sarah Johnson is a clinical sleep specialist and medical doctor. She medically reviews our calculators and guides to guarantee clinical accuracy and alignment with contemporary standards in sleep medicine.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 font-serif">Our Trusted Scientific Sources</h2>
            <p className="text-sm sm:text-base">
              All tools, articles, and findings shared on this site are derived from leading research repositories, sleep guidelines, and clinical frameworks, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li><strong>American Academy of Sleep Medicine (AASM):</strong> Clinical sleep hygiene standards and circadian guides.</li>
              <li><strong>National Sleep Foundation (NSF):</strong> Age-based duration recommendations.</li>
              <li><strong>PubMed &amp; MEDLINE:</strong> Peer-reviewed ultradian rhythm and sleep architecture research.</li>
              <li><strong>Matthew Walker, PhD:</strong> Breakthrough research from his clinical book <em>Why We Sleep</em>.</li>
            </ul>
          </section>

          <section className="bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-950/40 rounded-2xl p-5 text-sm text-red-900 dark:text-red-300">
            <h3 className="font-bold text-red-950 dark:text-red-200 mb-1 font-serif">Medical Disclaimer</h3>
            <p>
              The sleep calculators, sleep schedules, and informational guides provided on Sleep Calculator are exclusively for educational and informational purposes. They do not constitute, nor are they a substitute for, professional medical advice, clinical diagnosis, or therapeutic treatment. Always consult with a qualified medical specialist or healthcare provider regarding persistent insomnia, chronic sleep disorders, or severe daytime fatigue.
            </p>
          </section>

          <section className="pt-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-serif">Try It Yourself</h2>
            <p className="mb-4">
              Ready to calculate your perfect bedtime and wake up refreshed?
            </p>
            <p className="mb-4">
              <Link to="/" className="text-[#7C3AED] dark:text-violet-400 hover:text-[#6D28D9] dark:hover:text-violet-300 font-bold underline transition-colors">Use the Sleep Calculator</Link> and find your ideal sleep window now.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-[13px] mt-8 pt-6 border-t border-gray-100 dark:border-[#1E293B]">
              Built to keep sleep science simple, accessible, and highly accurate.
            </p>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Built by <a href="https://shafiqbuilds.site/" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] dark:hover:text-violet-300 hover:underline transition-colors font-semibold underline underline-offset-2">ShafiqBuilds</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
