import React from "react";
import { ShimmerLoadingEffect } from "./ShimmerLoadingEffect";

interface BlogSkeletonProps {
  isPost?: boolean;
  postTitle?: string;
  postCategory?: string;
  postDate?: string;
  postReadTime?: string;
}

export const BlogSkeleton: React.FC<BlogSkeletonProps> = () => {
  return <ShimmerLoadingEffect />;
};

export default BlogSkeleton;
