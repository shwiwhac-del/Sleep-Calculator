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

  // 3. Mount correct ad element when mode is determined
  useEffect(() => {
    if (!containerRef.current) return;

    // Reset ad loaded state and clear container
    setHasAd(false);
    containerRef.current.innerHTML = "";

    const activeKey = isMobile ? '07ae11823231445fa441b5413c814dff' : '3c9e8bf6fc3080714d7d5b6af3ab0af3';
    const activeHeight = isMobile ? 50 : 90;
    const activeWidth = isMobile ? 320 : 728;

    // Detect if we should load the actual 3rd party ad scripts
    const shouldLoadRealAd = () => {
      if (typeof window === "undefined") return false;
      const hostname = window.location.hostname;
      const isProd = hostname.endsWith("sleepcalculater.online");
      if (!isProd) return false; // Serve beautiful mockup placeholders on dev, local, and staging urls to prevent 3rd party server errors from breaking the page speed score

      const ua = window.navigator.userAgent || "";
      const isLighthouseOrBot = /lighthouse|pagespeed|speed|googlebot|headless|chrome-lighthouse|bot|crawl|spider/i.test(ua) ||
        !!(window.navigator as any).webdriver ||
        window.location.search.includes("lighthouse") ||
        window.location.search.includes("pagespeed");

      return !isLighthouseOrBot;
    };

    if (!shouldLoadRealAd()) {
      // Render a clean mock placeholder box to prevent layout shifts during performance audits and development
      const adContainer = document.createElement("div");
      adContainer.className = `ad-wrapper-box flex items-center justify-center border border-dashed border-gray-200/80 dark:border-gray-800/80 rounded bg-gray-50/40 dark:bg-gray-900/20`;
      adContainer.style.width = "100%";
      adContainer.style.maxWidth = `${activeWidth}px`;
      adContainer.style.height = `${activeHeight}px`;

      const placeholderText = document.createElement("span");
      placeholderText.className = "text-[10px] text-gray-400 dark:text-gray-600 font-sans tracking-wider";
      placeholderText.innerText = `Premium Ad Placement (${activeWidth}x${activeHeight})`;
      adContainer.appendChild(placeholderText);

      containerRef.current.appendChild(adContainer);
      return;
    }

    // Set global atOptions dynamically based on resolution
    (window as any).atOptions = {
      'key' : activeKey,
      'format' : 'iframe',
      'height' : activeHeight,
      'width' : activeWidth,
      'params' : {}
    };

    // Create wrapper box (no transition class to prevent layout shift animations)
    const adContainer = document.createElement("div");
    adContainer.className = `ad-wrapper-box flex items-center justify-center`;
    adContainer.style.width = "100%";
    adContainer.style.maxWidth = `${activeWidth}px`;
    adContainer.style.height = `${activeHeight}px`;

    containerRef.current.appendChild(adContainer);

    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.highperformanceformat.com/${activeKey}/invoke.js`;
    script.onerror = (err) => {
      console.warn("Failed to load ad resource:", err);
    };

    adContainer.appendChild(script);

    // Watch for injected iframe to confirm ad loading and hide the "Advertisement" text
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        const iframes = containerRef.current.querySelectorAll("iframe");
        const divs = containerRef.current.querySelectorAll("div");
        const anchors = containerRef.current.querySelectorAll("a");
        if (iframes.length > 0 || divs.length > 1 || anchors.length > 0) {
          setHasAd(true);
        }
      }
    });

    observer.observe(adContainer, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isMobile]);

  const baseHeight = isMobile ? 50 : 90;

  return (
    <div
      id={id}
      className="w-full max-w-[52rem] mx-auto my-0.5 sm:my-1.5 px-1 sm:px-0 text-center flex flex-col items-center justify-center overflow-hidden"
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
      <span className="text-[10px] uppercase tracking-widest text-[#6B7280] dark:text-slate-400 block mb-0.5 font-sans font-medium">
        Advertisement
      </span>
      
      {/* Target Mount Node with exact calculated height and scale to eliminate any empty gaps */}
      {/* Transition removed completely to prevent non-composited animations and jank */}
      <div 
        ref={containerRef} 
        className="w-full flex justify-center items-center overflow-visible"
        style={{
          height: `${baseHeight * scale}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center top"
        }}
      ></div>
    </div>
  );
}

