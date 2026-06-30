import React, { useEffect, useState, useRef } from "react";
import { List, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TOCItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

export function TableOfContents({ activeSlug }: { activeSlug?: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We add a tiny delay to ensure the DOM is fully rendered before querying headings
    const timer = setTimeout(() => {
      const article = document.querySelector("article");
      if (!article) return;

      // Get all H2 and H3 elements inside the article
      const headingElements = Array.from(article.querySelectorAll("h2, h3"));
      
      // Assign IDs if they don't have them
      const items: TOCItem[] = headingElements.map((el, index) => {
        let id = el.id;
        if (!id) {
          // Generate a clean slug-like ID
          const textContent = el.textContent || "";
          id = textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          
          // Ensure uniqueness
          if (!id || document.getElementById(id)) {
            id = `heading-${index}-${id || "section"}`;
          }
          el.id = id;
        }
        return {
          id,
          text: el.textContent || "",
          level: el.tagName.toLowerCase() as "h2" | "h3",
        };
      });

      setHeadings(items);

      // Dynamic Intersection Observer to highlight active section on scroll
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const sorted = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      };

      const observerOptions = {
        root: null,
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      headingElements.forEach((el) => observer.observe(el));

      const handleScroll = () => {
        if (window.scrollY < 200 && items.length > 0) {
          setActiveId(items[0].id);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSlug]);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for a potential sticky header
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="bg-[#FAF6F0] border border-[#E1D8CC] rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 max-w-2xl mx-auto my-6 select-none"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 text-[#111827] font-black text-sm uppercase tracking-wider hover:text-[#7C3AED] transition-colors focus:outline-none cursor-pointer w-full text-left"
        >
          <BookOpen className="w-4 h-4 text-[#7C3AED] shrink-0" />
          <span>Table of Contents</span>
          <span className="text-[11px] font-mono font-bold text-[#6B7280] bg-[#F3ECE3] px-2 py-0.5 rounded-lg border border-[#E1D8CC] ml-2">
            {headings.length} sections
          </span>
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-[#6B7280] hover:text-[#7C3AED] hover:bg-[#F3ECE3] rounded-lg transition-colors focus:outline-none cursor-pointer"
          aria-label={isExpanded ? "Collapse Table of Contents" : "Expand Table of Contents"}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <nav className="mt-4 pt-4 border-t border-dashed border-[#E1D8CC] space-y-2">
              <ul className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                {headings.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li
                      key={item.id}
                      className={`transition-all duration-200 ${
                        item.level === "h3" ? "pl-5" : "pl-0"
                      }`}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleScrollTo(e, item.id)}
                        className={`inline-flex items-start gap-2 py-1 text-sm transition-all duration-200 hover:translate-x-1 ${
                          isActive
                            ? "text-[#7C3AED] font-extrabold"
                            : "text-[#4B5563] hover:text-[#7C3AED] font-semibold"
                        }`}
                      >
                        <span
                          className={`mt-2 shrink-0 rounded-full transition-all duration-200 ${
                            isActive
                              ? "w-2 h-2 bg-[#7C3AED] shadow-xs"
                              : "w-1.5 h-1.5 bg-[#6B7280]/40"
                          } ${item.level === "h3" ? "rounded-square scale-90" : ""}`}
                        />
                        <span className="leading-tight select-text text-left">
                          {item.text}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TableOfContents;
