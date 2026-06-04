export function StarryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Premium Luxury Warm Ivory and Gold ambient light overlays */}
      <div className="absolute inset-0 bg-[#F3ECE3]" />
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-[#8B5CF6]/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#D4AF37]/5 blur-[160px] pointer-events-none" />
    </div>
  );
}

