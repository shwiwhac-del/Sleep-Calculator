import { useEffect, useRef, useState } from "react";

interface AdPlaceholderProps {
  id?: string;
  slotName?: string;
}

export function AdPlaceholder({ id = "ad-slot-header" }: AdPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAd, setHasAd] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      const baseScale = parentWidth / 728;
      // Boost the scale on mobile devices (at least 0.8 scale to make it clearly readable and large)
      const newScale = Math.max(0.8, Math.min(1, baseScale * 1.45));
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial delay checks to make sure we measure after rendering layout finishes
    const timer1 = setTimeout(handleResize, 100);
    const timer2 = setTimeout(handleResize, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous contents to ensure clean load
    containerRef.current.innerHTML = "";

    // Set the global atOptions object on window as requested by the script
    (window as any).atOptions = {
      'key' : '3c9e8bf6fc3080714d7d5b6af3ab0af3',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };

    // Create wrapper container element
    const adContainer = document.createElement("div");
    adContainer.className = "ad-wrapper-box flex items-center justify-center transition-all duration-300";

    // Append the container to the DOM FIRST
    containerRef.current.appendChild(adContainer);

    // Create the invoke.js script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.highperformanceformat.com/3c9e8bf6fc3080714d7d5b6af3ab0af3/invoke.js";

    // Append script inside the active container so it executes relative to the already-mounted DOM node
    adContainer.appendChild(script);

    // Setup MutationObserver to watch for injected ad elements (like iframes) anywhere in the tree
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
  }, []);

  return (
    <div
      id={id}
      className="w-full max-w-[52rem] mx-auto my-0.5 sm:my-1.5 px-1 sm:px-0 text-center flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic override styles to enforce small, thin, responsive banner layout */}
      <style>{`
        .ad-wrapper-box {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          max-width: 728px !important;
          height: 90px !important;
          min-height: 90px !important;
          max-height: 90px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: transparent !important;
          border-radius: 8px !important;
        }

        /* Enforce iframe constraints so they do not overflow on mobile screen sizes */
        .ad-wrapper-box iframe {
          max-width: 100% !important;
          height: 90px !important;
          border: none !important;
          display: block !important;
          margin: 0 auto !important;
        }
      `}</style>

      {/* Hide "ADVERTISEMENT" text once the script populates actual advertisement items */}
      {!hasAd && (
        <span className="text-[9px] uppercase tracking-widest text-[#9ca3af] dark:text-gray-500 block mb-0.5 font-sans font-medium">
          Advertisement
        </span>
      )}
      
      {/* Target Mount Node with exact calculated height and scale to eliminate any empty gaps */}
      <div 
        ref={containerRef} 
        className="w-full flex justify-center items-center overflow-visible"
        style={{
          height: `${90 * scale}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          transition: "transform 0.1s ease, height 0.1s ease"
        }}
      ></div>
    </div>
  );
}
