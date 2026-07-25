import { useEffect, useRef, useState } from "react";

interface AdPlaceholderProps {
  id?: string;
  slotName?: string;
}

export function AdPlaceholder({ id = "ad-slot-header" }: AdPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAd, setHasAd] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // 1. Detect screen size changes to toggle between mobile and desktop asynchronously
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 2. Handle scaling calculation using ResizeObserver on the parent element
  // This avoids layout-thrashing and forced reflow warnings in PageSpeed Insights/Lighthouse
  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use contentRect.width directly from ResizeObserver callback which does not trigger forced reflows
        const parentWidth = entry.contentRect.width || parent.clientWidth || window.innerWidth;
        
        if (isMobile) {
          // Mobile ad is 320px wide. Scale it up so it fills the width of mobile screens nicely
          const computedScale = Math.min(1.3, Math.max(1.0, (parentWidth / 320) * 0.92));
          setScale(computedScale);
        } else {
          // Desktop ad is 728px wide. Downscale only if parent width is less than 728px
          const computedScale = Math.min(1, parentWidth / 728);
          setScale(computedScale);
        }
      }
    });

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  // 3. Mount placeholder slot when mode is determined (Ad network script removed, placement preserved)
  useEffect(() => {
    if (!containerRef.current) return;

    setHasAd(true);
    containerRef.current.innerHTML = "";

    const activeHeight = isMobile ? 50 : 90;
    const activeWidth = isMobile ? 320 : 728;

    // Create wrapper box (preserves placement slot dimensions)
    const adContainer = document.createElement("div");
    adContainer.className = `ad-wrapper-box flex items-center justify-center`;
    adContainer.style.width = "100%";
    adContainer.style.maxWidth = `${activeWidth}px`;
    adContainer.style.height = `${activeHeight}px`;

    const placeholderContent = document.createElement("div");
    placeholderContent.className = "text-[11px] font-mono text-[#9CA3AF] dark:text-slate-500 border border-dashed border-slate-300/80 dark:border-slate-800 rounded-xl flex items-center justify-center w-full h-full bg-slate-50/50 dark:bg-slate-900/30";
    placeholderContent.innerText = `Advertisement Space (${activeWidth}x${activeHeight})`;
    adContainer.appendChild(placeholderContent);

    containerRef.current.appendChild(adContainer);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isMobile]);

  const reservedHeight = isMobile ? 68 : 108;
  const activeHeight = isMobile ? 50 : 90;

  return (
    <div
      id={id}
      className="w-full max-w-[52rem] mx-auto my-0.5 sm:my-1.5 px-1 sm:px-0 text-center flex flex-col items-center justify-center overflow-hidden shrink-0"
      style={{ minHeight: `${reservedHeight}px`, height: `${reservedHeight}px` }}
    >
      {/* Dynamic override styles */}
      <style>{`
        .ad-wrapper-box {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          margin: 0 auto !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: transparent !important;
          border-radius: 6px !important;
        }

        .ad-wrapper-box iframe {
          max-width: 100% !important;
          border: none !important;
          display: block !important;
          margin: 0 auto !important;
        }
      `}</style>

      {/* "ADVERTISEMENT" text is permanently visible to guarantee zero cumulative layout shifts (CLS) when ad renders */}
      <span className="text-[10px] uppercase tracking-widest text-[#6B7280] dark:text-slate-400 block mb-0.5 font-sans font-medium h-[14px]">
        Advertisement
      </span>
      
      {/* Target Mount Node with exact calculated scale centered within reserved box */}
      <div 
        ref={containerRef} 
        className="w-full flex justify-center items-center overflow-hidden"
        style={{
          height: `${activeHeight}px`,
          maxHeight: `${activeHeight}px`,
        }}
      ></div>
    </div>
  );
}

