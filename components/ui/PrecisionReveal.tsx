"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

export type PrecisionVariant =
  | "fadeSlideLeft"
  | "riseUp"
  | "fadeSlideRight"
  | "precisionScale";

export interface PrecisionRevealProps {
  children: React.ReactNode;
  variant?: PrecisionVariant;
  delay?: number;
  className?: string;
  /** 
   * How far BEFORE the element enters the viewport to trigger.
   * Positive value = triggers earlier (recommended: "80px" to "120px").
   * This is the key fix — element starts animating before it's visible,
   * so by the time the user sees it, it's already mid-animation or done.
   */
  margin?: string;
  once?: boolean;
}

const VARIANT_MAP: Record<PrecisionVariant, string> = {
  fadeSlideLeft:  "animate-reveal-left",
  riseUp:         "animate-reveal-up",
  fadeSlideRight: "animate-reveal-right",
  precisionScale: "animate-reveal-scale",
};

export default function PrecisionReveal({
  children,
  variant = "riseUp",
  delay = 0,
  className = "",
  // Reactive trigger: reveals when 40px of the element is visible.
  margin = "0px 0px -40px 0px",
  once = true,
}: PrecisionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // The hook already manages stickiness if once=true.
  // This avoids the "cascading render" error by using the hook state directly.
  const revealed = useInView(ref, { 
    once, 
    rootMargin: margin,
    threshold: 0.05 // Trigger when 5% is visible for stability
  });

  const animationClass = VARIANT_MAP[variant] ?? "animate-reveal-up";

  return (
    <div
      ref={ref}
      className={`${className} ${revealed ? animationClass : "reveal-initial"}`.trim()}
      style={{
        animationDelay: revealed ? `${delay}s` : undefined,
        willChange: !revealed ? "transform, opacity" : "auto",
      }}
    >
      {children}
    </div>
  );
}