import React, { useState } from 'react';

interface BlogHeroImageProps {
  activeSlug: string;
  title: string;
}

export const BlogHeroImage: React.FC<BlogHeroImageProps> = ({ activeSlug, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Use unique, beautiful, high-quality, reproducible landscape images based on the active slug.
  const imageUrl = `https://picsum.photos/seed/${activeSlug}/1200/630`;

  return (
    <div 
      id="blog-hero-image-wrapper"
      className="relative w-full max-w-2xl mx-auto my-6 overflow-hidden border border-[#E1D8CC] rounded-3xl bg-[#FAF6F0] shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Sleek Skeleton state utilizing theme colors */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF6F0] animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-t-[#7C3AED] border-r-transparent border-b-[#D4AF37] border-l-transparent animate-spin mb-3" />
          <span className="text-xs font-semibold font-mono text-[#6B7280]">Loading illustration...</span>
        </div>
      )}

      <img
        src={imageUrl}
        alt={`Illustrative diagram: ${title}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`w-full aspect-[16/9] object-cover transition-all duration-500 hover:scale-103 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Decorative accent footer matching AGENTS.md guidelines */}
      <div className="p-3 bg-[#FCFAF7] border-t border-[#E1D8CC] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
        <span>Visual Reference: {title}</span>
        <span className="text-[#7C3AED] font-bold">Sleep Science Resource</span>
      </div>
    </div>
  );
};

export default BlogHeroImage;
