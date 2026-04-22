"use client";

import Link from "next/link";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb — Standardized industrial navigation trace.
 * Following the site-wide "Industrial Grandeur" aesthetic.
 */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <PrecisionReveal variant="fadeSlideLeft">
      <nav className={`flex items-center gap-2 ${className}`} aria-label="Breadcrumb">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            {index > 0 && <span className="text-[10px] text-border">/</span>}
            {item.active ? (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue">
                  {item.label}
                </span>
              </div>
            ) : (
              <Link
                href={item.href || "#"}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light hover:text-primary-blue transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </PrecisionReveal>
  );
}
