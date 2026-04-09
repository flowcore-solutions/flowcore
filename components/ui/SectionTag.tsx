/**
 * SectionTag — Industrial section label.
 *
 * Used above every major section heading throughout the site.
 * Renders a small, all-caps, tracked label with the FlowCore green left-border
 * motif — an engineering annotation, not a generic web badge.
 *
 * This is a Server Component. No "use client" needed.
 *
 * Usage:
 *   <SectionTag>WATER TREATMENT</SectionTag>
 *   <SectionTag accent="blue">BERLINGTON RANGE</SectionTag>
 */

import type { ReactNode } from "react";

export interface SectionTagProps {
  children: ReactNode;
  /**
   * Color accent — green (default) for fluid/action context,
   * blue for hardware/structure context.
   */
  accent?: "green" | "blue";
  /** Additional Tailwind classes on the outer element */
  className?: string;
}

export default function SectionTag({
  children,
  accent = "green",
  className = "",
}: SectionTagProps) {
  const borderColor =
    accent === "green" ? "border-primary-green" : "border-primary-blue";

  const textColor =
    accent === "green" ? "text-primary-green" : "text-primary-blue";

  return (
    <span
      className={[
        // Layout
        "inline-flex items-center",
        // Spacing
        "pl-3 pr-1 py-0.5",
        // Left border — the industrial annotation motif
        "border-l-2",
        borderColor,
        // Typography
        "text-xs font-semibold tracking-widest uppercase",
        textColor,
        // No background — tags are transparent by design
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
