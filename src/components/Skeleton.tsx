import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "pill";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rectangular",
  width,
  height,
}) => {
  const baseClasses = "relative overflow-hidden bg-gradient-to-r from-[#7C3AED]/[0.05] via-[#7C3AED]/[0.12] to-[#7C3AED]/[0.05] dark:from-[#D4AF37]/[0.05] dark:via-[#D4AF37]/[0.12] dark:to-[#D4AF37]/[0.05] animate-shimmer";

  const variantClasses = {
    text: "rounded-lg h-4 w-full",
    circular: "rounded-full shrink-0",
    rectangular: "rounded-2xl",
    pill: "rounded-full",
  };

  const style: React.CSSProperties = {
    backgroundSize: "200% 100%",
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
