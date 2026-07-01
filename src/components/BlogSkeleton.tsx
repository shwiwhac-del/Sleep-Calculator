import React from "react";
import { Skeleton } from "./Skeleton";
import { AdPlaceholder } from "./AdPlaceholder";

interface BlogSkeletonProps {
  isPost?: boolean;
}

export const BlogSkeleton: React.FC<BlogSkeletonProps> = ({ isPost = false }) => {
  if (isPost) {
    return (
      <div className="w-full max-w-3xl mx-auto py-4 sm:py-6 px-2 sm:px-4 space-y-8 text-left">
        {/* Back navigation & Breadcrumb Skeletons */}
        <div className="space-y-2">
          <Skeleton variant="rectangular" className="h-4 w-48 rounded" />
          <Skeleton variant="rectangular" className="h-5 w-36 rounded" />
        </div>

        {/* Title & Meta Data */}
        <div className="space-y-3">
          <Skeleton variant="rectangular" className="h-10 sm:h-12 w-full rounded-lg" />
          <Skeleton variant="rectangular" className="h-10 sm:h-12 w-3/4 rounded-lg" />
          <div className="flex gap-4 pt-2">
            <Skeleton variant="pill" className="h-5 w-24" />
            <Skeleton variant="pill" className="h-5 w-32" />
          </div>
        </div>

        {/* Global In-Article / Under Heading Banner Ad Spot during skeleton */}
        <AdPlaceholder id="skeleton-blog-article-ad" slotName="Skeleton In-Article Top Banner" />

        {/* Text Paragraph Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3].map((paragraph) => (
            <div key={paragraph} className="space-y-2">
              <Skeleton variant="rectangular" className="h-6 w-1/3 rounded mb-3" />
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
      <Skeleton variant="rectangular" className="h-5 w-44 rounded-md" />

      {/* Header Info */}
      <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
        <div className="flex justify-center">
          <Skeleton variant="rectangular" className="h-10 sm:h-12 w-80 rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-5/6 mx-auto" />
        </div>
      </div>

      {/* Banner Ad Spot below main blog heading during skeleton */}
      <AdPlaceholder id="skeleton-blog-index-ad" slotName="Skeleton Blog Home Banner" />

      {/* Blog Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-white dark:bg-[#1e293b] border border-gray-150 dark:border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden h-full min-h-[16rem]"
          >
            {/* Read Time info top right */}
            <div className="flex justify-end">
              <Skeleton variant="rectangular" className="h-4.5 w-16 rounded" />
            </div>

            {/* Post Title (2 lines) */}
            <div className="space-y-2">
              <Skeleton variant="rectangular" className="h-6 w-full rounded" />
              <Skeleton variant="rectangular" className="h-6 w-4/5 rounded" />
            </div>

            {/* Description (3 lines) */}
            <div className="space-y-2 flex-grow">
              <Skeleton variant="text" className="h-3.5 w-full" />
              <Skeleton variant="text" className="h-3.5 w-11/12" />
              <Skeleton variant="text" className="h-3.5 w-5/6" />
            </div>

            {/* Read Link */}
            <div className="flex items-center pt-2">
              <Skeleton variant="rectangular" className="h-5 w-28 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
