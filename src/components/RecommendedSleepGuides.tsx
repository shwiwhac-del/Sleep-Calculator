import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS_META } from "../blogMetadata";

interface RecommendedSleepGuidesProps {
  currentSlug?: string;
  category?: string;
  preferredSlugs?: string[];
  title?: string;
  description?: string;
  limit?: number;
}

export default function RecommendedSleepGuides({
  currentSlug,
  category,
  preferredSlugs,
  title = "Recommended Sleep Guides & Science",
  description = "Explore our expert sleep science articles and comprehensive cycle calculators to optimize your circadian health, maximize cognitive retention, and improve sleep hygiene naturally.",
  limit = 3
}: RecommendedSleepGuidesProps) {
  const allBlogs = Object.entries(BLOG_POSTS_META)
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, meta]) => ({
      slug,
      title: meta.title,
      description: meta.description,
      rawDate: meta.date,
      date: new Date(meta.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      readTime: "5 min read",
      category: meta.category
    }));

  // Prioritize preferred slugs, then category matches, then latest posts
  let recommended = allBlogs;
  if (preferredSlugs && preferredSlugs.length > 0) {
    const preferred = allBlogs.filter((post) => preferredSlugs.includes(post.slug));
    const others = allBlogs.filter((post) => !preferredSlugs.includes(post.slug));
    recommended = [...preferred, ...others];
  } else if (category) {
    const sameCat = allBlogs.filter((post) => post.category?.toLowerCase() === category.toLowerCase());
    const diffCat = allBlogs.filter((post) => post.category?.toLowerCase() !== category.toLowerCase());
    recommended = [...sameCat, ...diffCat];
  } else {
    recommended.sort((a, b) => b.rawDate.localeCompare(a.rawDate));
  }

  const finalBlogs = recommended.slice(0, limit);

  return (
    <section className="w-full pt-8 pb-4 border-t border-[#E5E7EB] dark:border-[#1E293B] mt-8" id="recommended-guides-section">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-gray-100 tracking-tight mb-3 font-sans">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#374151] dark:text-slate-300 leading-relaxed select-text">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="recommended-guides-grid">
        {finalBlogs.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex flex-col justify-between p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] hover:border-[#7C3AED] dark:hover:border-violet-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-left !no-underline hover:!no-underline"
          >
            <div className="space-y-2 !no-underline">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-violet-400 font-mono">
                  {post.category || 'Sleep Guide'}
                </span>
                <span className="text-xs font-semibold !text-[#6B7280] dark:!text-slate-400 !no-underline">
                  {post.readTime}
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base !text-[#111827] dark:!text-slate-100 group-hover:!text-[#7C3AED] dark:group-hover:!text-violet-400 transition-colors line-clamp-2 leading-snug !no-underline">
                {post.title}
              </h4>
              <p className="text-xs !text-[#6B7280] dark:!text-slate-400 line-clamp-3 leading-relaxed !no-underline">
                {post.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F3F4F6] dark:border-[#1E293B] flex items-center justify-between text-xs font-semibold !text-[#7C3AED] dark:!text-violet-400 !no-underline">
              <span>Read Article</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
