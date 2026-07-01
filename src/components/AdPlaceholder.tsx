import { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  id?: string;
  slotName?: string;
}

export function AdPlaceholder({ id = "ad-slot-header" }: AdPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous contents to ensure clean load
    containerRef.current.innerHTML = "";

    // 1. Create the container element with the exact ID required by the CPM network
    const adContainer = document.createElement("div");
    adContainer.id = "container-ed42546200e697774ad177b3584cd7b1";
    adContainer.className = "w-full min-h-[50px] inline-flex items-center justify-center transition-all duration-300";

    // 2. Append the container to the DOM FIRST so it is guaranteed to be in the active DOM tree
    containerRef.current.appendChild(adContainer);

    // 3. Create the script element with a cache-buster timestamp to force execution on mount/transition
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `https://pl30159174.effectivecpmnetwork.com/ed42546200e697774ad177b3584cd7b1/invoke.js?t=${Date.now()}`;

    // 4. Append script inside the active container so it executes relative to the already-mounted DOM node
    adContainer.appendChild(script);

    return () => {
      // Clean up on unmount to prevent memory leaks and duplicate execution in SPA
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id={id}
      className="w-full max-w-[42rem] mx-auto my-2 px-2 sm:px-0 text-center"
    >
      {/* Super clean and minimal Advertisement label */}
      <span className="text-[9px] uppercase tracking-widest text-[#9ca3af] dark:text-gray-500 block mb-1 font-sans font-medium">
        Advertisement
      </span>
      
      {/* Target Mount Node */}
      <div ref={containerRef} className="w-full min-h-[50px]"></div>
    </div>
  );
}
