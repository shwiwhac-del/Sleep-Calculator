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

  // 1. Detect screen size changes to toggle between mobile and desktop
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 2. Handle scaling calculation based on active mode
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      
      if (isMobile) {
        // Mobile ad is 320px wide. Scale it up so it fills the width of mobile screens nicely
        // (e.g. on a 390px wide screen, scale is around 1.1x to 1.2x so it's larger and highly visible)
        const computedScale = Math.min(1.3, Math.max(1.0, (parentWidth / 320) * 0.92));
        setScale(computedScale);
      } else {
        // Desktop ad is 728px wide. Downscale only if parent width is less than 728px
        const computedScale = Math.min(1, parentWidth / 728);
        setScale(computedScale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const timer1 = setTimeout(handleResize, 50);
    const timer2 = setTimeout(handleResize, 200);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
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

    // Set global atOptions dynamically based on resolution
    (window as any).atOptions = {
      'key' : activeKey,
      'format' : 'iframe',
      'height' : activeHeight,
      'width' : activeWidth,
      'params' : {}
    };

    // Create wrapper box
    const adContainer = document.createElement("div");
    adContainer.className = `ad-wrapper-box flex items-center justify-center transition-all duration-300`;
    adContainer.style.width = "100%";
    adContainer.style.maxWidth = `${activeWidth}px`;
    adContainer.style.height = `${activeHeight}px`;

    containerRef.current.appendChild(adContainer);

    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.highperformanceformat.com/${activeKey}/invoke.js`;

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
          height: `${baseHeight * scale}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          transition: "transform 0.1s ease, height 0.1s ease"
        }}
      ></div>
    </div>
  );
}

