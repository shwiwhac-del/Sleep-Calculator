export function StarryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Immersive night sky with deep colors as requested by the user: dark blue celestial starry night sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07102e] via-[#060c20] via-[#080f29] to-[#1a0c32] opacity-100" />
    </div>
  );
}

