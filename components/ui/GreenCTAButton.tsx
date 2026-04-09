"use client";

/**
 * GreenCTAButton — The primary conversion button.
 *
 * This is the ONLY green button in the design system.
 * Green = fluid / action / conversion. Never use this for navigation.
 *
 * Hover: scale(1.03) + green shadow glow (150ms precision ease).
 * Active: scale(0.98) — tactile press feedback.
 *
 * Variants:
 *   "solid"   — filled green (default, for primary CTAs)
 *   "outline" — green border + green text (for secondary CTAs on dark backgrounds)
 */

import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface GreenCTAButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  /** Render as a next/link anchor — pass href and the component wraps correctly */
  href?: string;
  fullWidth?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<GreenCTAButtonProps["size"]>, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

const VARIANT_CLASSES: Record<
  NonNullable<GreenCTAButtonProps["variant"]>,
  string
> = {
  solid: [
    "bg-primary-green text-white",
    // Hover: darker green background + green shadow glow
    "hover:bg-dark-green",
    // Shadow via inline style not allowed — use Tailwind custom shadow
    // shadow-green is defined in @theme: 0 4px 20px 0 rgba(108,194,74,0.25)
    "hover:[box-shadow:var(--shadow-green)]",
  ].join(" "),
  outline: [
    "bg-transparent text-primary-green border-2 border-primary-green",
    "hover:bg-primary-green hover:text-white",
  ].join(" "),
};

// Shared base classes — same across all variants
const BASE_CLASSES = [
  // Typography
  "font-semibold font-sans",
  // Shape
  "rounded-lg",
  // Interaction
  "cursor-pointer select-none",
  // Scale hover — plan's rule: CTA buttons scale, cards translate (never both)
  "hover:scale-[1.03]",
  "active:scale-[0.98]",
  // Transition — 150ms precision, matching the plan spec
  "transition-all duration-150",
  // Accessibility
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2",
  // Disabled
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  // Flex for icon support
  "inline-flex items-center justify-center gap-2",
].join(" ");

export default function GreenCTAButton({
  children,
  variant = "solid",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}: GreenCTAButtonProps) {
  return (
    <button
      {...rest}
      className={[
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {/* Arrow indicator — the "→" motif used throughout the site */}
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
