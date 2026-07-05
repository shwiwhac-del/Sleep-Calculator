import React from "react";
import { Skeleton } from "./Skeleton";
import { AdPlaceholder } from "./AdPlaceholder";

interface BlogSkeletonProps {
  isPost?: boolean;
  postTitle?: string;
  postCategory?: string;
  postDate?: string;
  postReadTime?: string;
}

export const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ 
  isPost = false,
  postTitle,
  postCategory,
  postDate,
  postReadTime
}) => {
  if (isPost) {
    return (
      <div className="w-full max-w-3xl mx-auto py-4 sm:py-6 px-2 sm:px-4 space-y-8 text-left">
        {/* Back navigation & Breadcrumb Skeletons */}
        <div className="space-y-2">
          <Skeleton variant="rectangular" className="h-4 w-48 rounded opacity-50" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span className="hover:underline cursor-pointer">Home</span>
            <span>&gt;</span>
            <span className="hover:underline cursor-pointer">Blog</span>
            {postCategory && (
              <>
                <span>&gt;</span>
                <span className="text-gray-700 dark:text-gray-300">{postCategory}</span>
              </>
            )}
          </div>
        </div>

        {/* Title & Meta Data - Render real text to avoid shift/flicker */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-tight font-serif">
            {postTitle || "Loading Sleep Article..."}
          </h1>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-[#4B5563] dark:text-slate-400 font-semibold">
            {postCategory && (
              <span className="text-[#7C3AED] dark:text-[#D4AF37] font-bold uppercase tracking-wider">
                {postCategory}
              </span>
            )}
            {postDate && <span>• {postDate}</span>}
            {postReadTime && <span>• {postReadTime}</span>}
          </div>
        </div>

        {/* Global In-Article / Under Heading Banner Ad Spot during skeleton */}
        <AdPlaceholder id="blog-article-header-ad" slotName="In-Article Top Banner" />

        {/* Text Paragraph Skeletons */}
        <div className="space-y-6 pt-2">
          {[1, 2, 3].map((paragraph) => (
            <div key={paragraph} className="space-y-3">
              <Skeleton variant="rectangular" className="h-6.5 w-1/3 rounded mb-3 bg-[#EAE2D5] dark:bg-slate-700" />
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-11/12" />
              <Skeleton variant="text" className="h-4 w-5/6" />
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Blog Index List Skeletons
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-2 sm:px-4 text-left space-y-8">
      {/* Back Button */}
      <Skeleton variant="rectangular" className="h-5 w-44 rounded-md opacity-40" />

      {/* Header Info - Render real text to eliminate layout shift */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-tight font-serif">
          Sleep Science <span className="bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] bg-clip-text text-transparent">Blog &amp; Guides</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed font-medium">
          Expert knowledge, physiological research, and actionable tips to help you calculate your optimal sleep windows, reset your internal clock, and wake up energized.
        </p>
      </div>

      {/* Banner Ad Spot below main blog heading during skeleton */}
      <AdPlaceholder id="blog-index-header-ad" slotName="Blog Home Banner" />

      {/* Blog Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-[#FAF6F0] dark:bg-[#151C2C] border border-[#E1D8CC] dark:border-[#1E293B] rounded-2xl p-6 space-y-4 relative overflow-hidden h-full min-h-[16rem] shadow-xs"
          >
            {/* Read Time info top right */}
            <div className="flex justify-end">
              <Skeleton variant="rectangular" className="h-4 w-14 rounded opacity-50" />
            </div>

            {/* Post Title (2 lines) */}
            <div className="space-y-2">
              <Skeleton variant="rectangular" className="h-5 w-full rounded" />
              <Skeleton variant="rectangular" className="h-5 w-4/5 rounded" />
            </div>

            {/* Description (3 lines) */}
            <div className="space-y-2 flex-grow">
              <Skeleton variant="text" className="h-3.5 w-full" />
              <Skeleton variant="text" className="h-3.5 w-11/12" />
              <Skeleton variant="text" className="h-3.5 w-5/6" />
            </div>

            {/* Read Link */}
            <div className="flex items-center pt-2">
              <Skeleton variant="rectangular" className="h-4.5 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
