"use client";

/**
 * Products Page (/products)
 *
 * Layout: Sidebar filter (desktop) + horizontal chip row (mobile) + AnimatePresence grid.
 */

import { useState, useMemo, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PUMP_CATALOG,
  PUMP_CATEGORIES,
  type PumpCategory,
} from "@/lib/pump-data";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import PumpCard from "@/components/ui/PumpCard";

// ── Category meta for sidebar chips ──────────────────────────────────────

type CategoryMeta = { accent: "blue" | "green"; shortLabel: string };

const CATEGORY_META: Record<PumpCategory, CategoryMeta> = {
  "Vertical Multistage":   { accent: "blue",  shortLabel: "CDL/CDLF/CDH" },
  "Horizontal Multistage": { accent: "blue",  shortLabel: "CHL/CHM" },
  "Sewage & Submersible":  { accent: "green", shortLabel: "WQ/STP/QY-B" },
  "Hydro & Booster":       { accent: "green", shortLabel: "Hydro/BT" },
  "Self-Priming":          { accent: "blue",  shortLabel: "SZ/ZS" },
  "Pipeline & Industrial": { accent: "blue",  shortLabel: "LD/NISO/Mini" },
};

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

// ── Sidebar filter chip ───────────────────────────────────────────────────

function FilterChip({
  label,
  count,
  accent,
  active,
  onClick,
}: {
  label: string;
  count: number;
  accent: "blue" | "green";
  active: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  const activeClasses =
    accent === "blue"
      ? "bg-primary-blue text-white border-primary-blue"
      : "bg-primary-green text-white border-primary-green";

  const inactiveClasses =
    "bg-white text-text-dark border-border hover:border-primary-blue hover:text-primary-blue";

  return (
    <button
      onClick={onClick}
      className={[
        "w-full flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-1",
        active ? activeClasses : inactiveClasses,
      ].join(" ")}
    >
      <span className="leading-snug">{label}</span>
      <span
        className={[
          "shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded",
          active ? "bg-white/20 text-white" : "bg-section-bg text-text-light",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<PumpCategory | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === null
        ? PUMP_CATALOG
        : PUMP_CATALOG.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const countForCategory = (cat: PumpCategory) =>
    PUMP_CATALOG.filter((p) => p.category === cat).length;

  return (
    <div className="bg-white">
      {/* ── Page Header ── */}
      <header className="bg-section-bg border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <PrecisionReveal variant="fadeSlideLeft">
            <SectionTag>Product Catalogue</SectionTag>
          </PrecisionReveal>
          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h1
              className="mt-4 font-bold text-deep-blue"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              The Berlington Range
            </h1>
          </PrecisionReveal>
          <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-light">
              {PUMP_CATALOG.length} pump series engineered for reliability across
              water treatment, HVAC, and heavy industrial applications. Hover any
              card to view full technical specifications.
            </p>
          </PrecisionReveal>
        </div>
      </header>

      {/* ── Body: Sidebar + Grid ── */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* ── Sidebar (desktop) / Chip row (mobile) ── */}
          <aside
            aria-label="Filter by pump category"
            className="lg:w-64 lg:shrink-0"
          >
            {/* Desktop sidebar — sticky */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-text-light">
                Filter by Category
              </p>
              <div className="flex flex-col gap-2">
                <FilterChip
                  label="All Products"
                  count={PUMP_CATALOG.length}
                  accent="blue"
                  active={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                />
                {PUMP_CATEGORIES.map((cat) => (
                  <FilterChip
                    key={cat}
                    label={cat}
                    count={countForCategory(cat)}
                    accent={CATEGORY_META[cat].accent}
                    active={activeCategory === cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                  />
                ))}
              </div>

              {/* Series codes legend */}
              <div className="mt-6 rounded-xl border border-border bg-section-bg p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-text-light">
                  Series Quick Ref
                </p>
                {PUMP_CATEGORIES.map((cat) => (
                  <div key={cat} className="mb-2 last:mb-0">
                    <span
                      className="text-[10px] font-semibold"
                      style={{
                        color:
                          CATEGORY_META[cat].accent === "green"
                            ? "#2fa84f"
                            : "#1e5bb8",
                      }}
                    >
                      {CATEGORY_META[cat].shortLabel}
                    </span>
                    <span className="ml-1.5 text-[10px] text-text-light">
                      — {cat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile horizontal chip scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
              <button
                onClick={() => setActiveCategory(null)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150",
                  activeCategory === null
                    ? "bg-primary-blue text-white border-primary-blue"
                    : "bg-white text-text-dark border-border",
                ].join(" ")}
              >
                All ({PUMP_CATALOG.length})
              </button>
              {PUMP_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const activeC =
                  CATEGORY_META[cat].accent === "blue"
                    ? "bg-primary-blue text-white border-primary-blue"
                    : "bg-primary-green text-white border-primary-green";
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(isActive ? null : cat)
                    }
                    className={[
                      "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150",
                      isActive ? activeC : "bg-white text-text-dark border-border",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <main id="products-grid" className="flex-1 min-w-0">
            {/* Result count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-text-light">
                <span className="font-semibold text-text-dark">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "product" : "products"}
                {activeCategory ? ` in ${activeCategory}` : " across all categories"}
              </p>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-xs text-text-light underline underline-offset-2 hover:text-text-dark transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* AnimatePresence grid — popLayout ensures exit animations don't block layout */}
            <motion.div
              layout
              className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((pump) => (
                  <motion.div
                    key={pump.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.25, ease: PRECISION_EASE }}
                  >
                    <PumpCard pump={pump} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="text-lg font-semibold text-text-dark">
                  No products found
                </p>
                <p className="mt-2 text-sm text-text-light">
                  Try a different category or{" "}
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-primary-blue underline underline-offset-2"
                  >
                    view all products
                  </button>
                  .
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
