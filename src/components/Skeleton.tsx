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
  const baseClasses = "relative overflow-hidden bg-gradient-to-r from-[#E5E5E5] via-[#F1F1F1] to-[#E5E5E5] dark:from-[#334155] dark:via-[#475569] dark:to-[#334155] animate-shimmer";

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
