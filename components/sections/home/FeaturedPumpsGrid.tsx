"use client";

/**
 * FeaturedPumpsGrid — Home page preview: 8 pumps + catalogue CTA.
 *
 * Flow rationale:
 *  - StatsBar ends on deep-blue (#0f3d91) with a faint green bottom line.
 *  - This section opens on deep-blue to bridge that transition, then cards
 *    sit on bg-section-bg (#f8fafc) via a scalloped SVG edge.
 *
 * Card interaction (delegated to PumpCard):
 *  - Image zone → 3D perspective tilt.
 *  - Info zone  → rotateY card flip to spec back face.
 */

import Link from "next/link";
import { PUMP_CATALOG, type PumpModel } from "@/lib/pump-data";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import PumpCard from "@/components/ui/PumpCard";

const FEATURED_PUMPS = PUMP_CATALOG.slice(0, 8) as readonly PumpModel[];

// ── Section ───────────────────────────────────────────────────────────────

export default function FeaturedPumpsGrid() {
  return (
    <section
      id="featured-pumps"
      aria-labelledby="featured-pumps-heading"
      className="relative"
    >
      {/* ── BRIDGE ZONE — deep-blue cap that continues from StatsBar ── */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0f3d91" }}
      >
        {/* Engineering grid texture (matches StatsBar) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Removed redundant green accent line for cleaner transition */}


        <div className="relative mx-auto max-w-7xl px-8 pt-12 pb-16 lg:pb-20">
          {/* Section label — border-left eyebrow matching HeroSection */}
          <PrecisionReveal variant="fadeSlideLeft" className="mb-5">
            <span className="inline-flex items-center gap-2 border-l-2 border-primary-green pl-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-green">
              Berlington Range
            </span>
          </PrecisionReveal>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
              <h2
                id="featured-pumps-heading"
                className="font-bold text-white leading-tight uppercase"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Berlington Industrial Models
              </h2>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideRight" delay={0.14}>
              <p className="max-w-md text-sm leading-relaxed text-white/50 md:text-right">
                16 series engineered for reliability across municipal water
                treatment, HVAC, and heavy industrial applications.
              </p>
            </PrecisionReveal>
          </div>
        </div>

        {/* Scalloped bottom edge — cards float up into the deep-blue zone */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ height: "48px" }}
        >
          <svg
            viewBox="0 0 1440 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </div>

      {/* ── CARDS ZONE ── */}
      <div className="relative bg-section-bg pb-12 lg:pb-16">
        {/* Subtle background industrial industrial diagonal lines — fixed to viewport for perfect continuity */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
            backgroundAttachment: "fixed" 
          }} 
        />
        
        <div className="relative mx-auto max-w-7xl px-8 z-10">
          {/* Mobile: 2-row independently swipeable snap carousels */}
          <div className="flex flex-col gap-4 sm:hidden pt-4">
            {[0, 1].map((rowIndex) => {
              const rowItems = FEATURED_PUMPS.filter((_, i) => i % 2 === rowIndex);
              if (rowItems.length === 0) return null;
              return (
                <div
                  key={`mobile-row-${rowIndex}`}
                  className="flex gap-4 overflow-x-auto overscroll-x-contain"
                  style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    paddingLeft: "2rem",
                    paddingRight: "3rem",
                    paddingBottom: "1rem",
                    marginLeft: "-2rem",
                    marginRight: "-2rem",
                  }}
                >
                  {rowItems.map((pump) => (
                    <div
                      key={pump.id}
                      className="shrink-0"
                      style={{ width: "72vw", scrollSnapAlign: "start" }}
                    >
                      <PumpCard pump={pump} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Desktop: staggered reveal grid */}
          <div className="hidden sm:grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 pt-8">
            {FEATURED_PUMPS.map((pump, i) => (
              <PrecisionReveal
                key={pump.id}
                variant="riseUp"
                delay={(i % 4) * 0.07}
              >
                <PumpCard pump={pump} priority={i < 4} />
              </PrecisionReveal>
            ))}
          </div>

          {/* ── CTA Buttons ── */}
          <PrecisionReveal variant="riseUp" delay={0.2} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              id="featured-pumps-catalogue-cta"
              className={[
                "inline-flex items-center gap-2 rounded-lg px-6 py-2.5",
                "bg-primary-green text-white text-sm font-semibold tracking-wide",
                "hover:bg-primary-green/90 transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2",
              ].join(" ")}
            >
              See Full Catalogue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <a
              href="/catalog.pdf"
              download
              className={[
                "inline-flex items-center gap-2 rounded-lg px-6 py-2.5",
                "bg-white text-deep-blue text-sm font-semibold tracking-wide",
                "border border-border hover:border-deep-blue hover:text-primary-blue transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue focus-visible:ring-offset-2",
              ].join(" ")}
            >
              Download PDF Catalogue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </PrecisionReveal>
        </div>
      </div>
    </section>
  );
}