"use client";

/**
 * Products Page (/products)
 *
 * Design: "Minimalist Grandeur" — bg-section-bg blueprint grid throughout.
 * Sidebar filters: technical tab panel with engineering annotation style.
 * Grid: AnimatePresence popLayout with stagger.
 */

import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  PUMP_CATALOG,
  PUMP_CATEGORIES,
  type PumpCategory,
} from "@/lib/pump-data";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import PumpCard from "@/components/ui/PumpCard";
import SectionTag from "@/components/ui/SectionTag";

// ── Category meta ─────────────────────────────────────────────────────────

type CategoryMeta = {
  accent: "blue" | "green";
  shortLabel: string;
  icon: string;
};

const CATEGORY_META: Record<PumpCategory, CategoryMeta> = {
  "Vertical Multistage":   { accent: "blue",  shortLabel: "CDL / CDLF / CDH",  icon: "↑" },
  "Horizontal Multistage": { accent: "blue",  shortLabel: "CHL / CHM",          icon: "→" },
  "Sewage & Submersible":  { accent: "green", shortLabel: "WQ / STP",           icon: "↓" },
  "Hydro & Booster":       { accent: "green", shortLabel: "HYDRO / BT / MINI",  icon: "⟳" },
  "Self-Priming":          { accent: "blue",  shortLabel: "QY(B) / SZ",         icon: "◎" },
  "Pipeline & Industrial": { accent: "blue",  shortLabel: "ZS / NISO / LD",     icon: "⌖" },
};

const PRECISION_EASE = [0.25, 0, 0, 1] as const;
const GRID_BG = `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`;

// ── Sidebar filter tab ────────────────────────────────────────────────────

function FilterTab({
  label,
  count,
  meta,
  active,
  onClick,
}: {
  label: string;
  count: number;
  meta: CategoryMeta;
  active: boolean;
  onClick: () => void;
}) {
  const activeBg = "#1e5bb8";

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-1 rounded-lg"
    >
      <div
        className="relative flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150"
        style={{
          backgroundColor: active ? activeBg : "transparent",
          borderColor: active ? activeBg : "transparent",
        }}
      >
        {/* Icon monogram */}
        <span
          className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-sm font-black transition-colors duration-150"
          style={{
            backgroundColor: active ? "rgba(255,255,255,0.2)" : "#0f172a08",
            color: active ? "#ffffff" : "#64748b",
          }}
        >
          {meta.icon}
        </span>

        {/* Label */}
        <span
          className="flex-1 text-[13px] font-bold leading-tight transition-colors duration-150"
          style={{ color: active ? "#ffffff" : "#64748b" }}
        >
          {label}
        </span>

        {/* Count badge */}
        <span
          className="shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded-md tabular-nums transition-colors duration-150"
          style={{
            backgroundColor: active ? "rgba(255,255,255,0.2)" : "#0f172a08",
            color: active ? "#ffffff" : "#94a3b8",
          }}
        >
          {count}
        </span>
      </div>
    </button>
  );
}

// ── All Products tab ──────────────────────────────────────────────────────

function AllProductsTab({
  count,
  active,
  onClick,
}: {
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-1 rounded-lg"
    >
      <div
        className="relative flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150"
        style={{
          backgroundColor: active ? "#1e5bb8" : "transparent",
          borderColor: active ? "#1e5bb8" : "transparent",
        }}
      >
        <span
          className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-sm transition-colors"
          style={{
            backgroundColor: active ? "rgba(255,255,255,0.2)" : "#0f172a08",
            color: active ? "#ffffff" : "#64748b",
          }}
        >
          ⊞
        </span>
        <span
          className="flex-1 text-[13px] font-black leading-tight transition-colors"
          style={{ color: active ? "#ffffff" : "#64748b" }}
        >
          All Products
        </span>
        <span
          className="shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded-md tabular-nums"
          style={{
            backgroundColor: active ? "rgba(255,255,255,0.2)" : "#0f172a08",
            color: active ? "#ffffff" : "#94a3b8",
          }}
        >
          {count}
        </span>
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<PumpCategory | null>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileCarouselRef.current) {
      const rows = mobileCarouselRef.current.children;
      for (let i = 0; i < rows.length; i++) {
        rows[i].scrollLeft = 0;
      }
    }
  }, [activeCategory]);

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
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Global blueprint grid — spans entire page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: GRID_BG, opacity: 0.025 }}
      />

      {/* ── Page Header ── */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

          {/* Breadcrumb */}
          <PrecisionReveal variant="fadeSlideLeft">
            <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
              <Link
                href="/"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light hover:text-primary-blue transition-colors"
              >
                Home
              </Link>
              <span className="text-[10px] text-border">/</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue">
                  Products
                </span>
              </div>
            </nav>
          </PrecisionReveal>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
                <SectionTag>Product Catalogue</SectionTag>
              </PrecisionReveal>

              <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
                <h1
                  className="mt-4 font-black text-deep-blue leading-[1.05] tracking-tight"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                >
                  The Berlington
                  <br />
                  <span className="text-primary-blue">Engineering Range</span>
                </h1>
              </PrecisionReveal>

              <PrecisionReveal variant="fadeSlideLeft" delay={0.21}>
                <p className="mt-6 text-base leading-relaxed text-text-light font-medium max-w-lg">
                  {PUMP_CATALOG.length} pump series engineered for reliability across
                  water treatment, HVAC, and heavy industrial applications.
                  Hover any card to reveal full technical specifications.
                </p>
              </PrecisionReveal>
            </div>

            {/* Authority metric strip */}
            <PrecisionReveal variant="fadeSlideRight" delay={0.28}>
              <div className="grid grid-cols-3 gap-3 lg:min-w-[260px]">
                {[
                  { value: `${PUMP_CATALOG.length}`, label: "Pump Series", accent: "blue" },
                  { value: "ISO",   label: "Certified",   accent: "blue" },
                  { value: "6",     label: "Categories",  accent: "green" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-white p-4 text-center"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="text-2xl font-black leading-none mb-1"
                      style={{ color: stat.accent === "blue" ? "#0f3d91" : "#6cc24a" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[9.5px] font-bold uppercase tracking-widest text-text-light">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </PrecisionReveal>
          </div>


        </div>
      </header>

      {/* ── Body: Sidebar + Grid ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">

          {/* ── Sidebar ── */}
          <aside aria-label="Filter by pump category" className="lg:w-60 lg:shrink-0">

            {/* Desktop sticky sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-text-light">
                Filter by Category
              </p>

              {/* Filter panel */}
              <div
                className="rounded-2xl border border-border/70 p-2 space-y-0.5"
                style={{ backgroundColor: "#f0f4fa" }}
              >
                <AllProductsTab
                  count={PUMP_CATALOG.length}
                  active={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                />
                {PUMP_CATEGORIES.map((cat) => (
                  <FilterTab
                    key={cat}
                    label={cat}
                    count={countForCategory(cat)}
                    meta={CATEGORY_META[cat]}
                    active={activeCategory === cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                  />
                ))}
              </div>


            </div>

            {/* Mobile horizontal chip scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
              <button
                onClick={() => setActiveCategory(null)}
                className={[
                  "shrink-0 rounded-full border px-4 py-1.5 text-xs font-black whitespace-nowrap transition-colors duration-150",
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
                    onClick={() => setActiveCategory(isActive ? null : cat)}
                    className={[
                      "shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-colors duration-150",
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

            {/* Result bar */}
            <motion.div
              layout
              className="mb-6 flex items-center justify-between"
              transition={{ duration: 0.2, ease: PRECISION_EASE }}
            >
              <p className="text-[13px] text-text-light font-medium">
                Showing{" "}
                <span className="font-black text-text-dark">{filtered.length}</span>
                {" "}
                {filtered.length === 1 ? "product" : "products"}
                {activeCategory ? (
                  <> in <span className="font-bold text-primary-blue">{activeCategory}</span></>
                ) : (
                  " across all categories"
                )}
              </p>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-[11px] font-bold text-text-light hover:text-primary-blue transition-colors flex items-center gap-1"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Clear filter
                </button>
              )}
            </motion.div>

            {/* Mobile: 2-row independently swipeable snap carousels */}
            <div ref={mobileCarouselRef} className="flex flex-col gap-4 sm:hidden">
              {[0, 1].map((rowIndex) => {
                const rowItems = filtered.filter((_, i) => i % 2 === rowIndex);
                if (rowItems.length === 0) return null;
                return (
                  <div
                    key={`mobile-row-${rowIndex}`}
                    className="flex gap-4 overflow-x-auto overscroll-x-contain"
                    style={{
                      scrollSnapType: "x mandatory",
                      WebkitOverflowScrolling: "touch",
                      scrollbarWidth: "none",
                      paddingLeft: "1.5rem",
                      paddingRight: "2.5rem",
                      paddingBottom: "0.5rem",
                      marginLeft: "-1.5rem",
                      marginRight: "-1.5rem",
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

            {/* Desktop: animated grid */}
            <motion.div
              layout
              className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((pump, i) => (
                  <motion.div
                    key={pump.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{
                      duration: 0.28,
                      delay: i * 0.03,
                      ease: PRECISION_EASE,
                    }}
                  >
                    <PumpCard pump={pump} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-24 text-center">
                <div
                  className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#f0f4fa" }}
                >
                  <span className="text-2xl opacity-40">⌖</span>
                </div>
                <p className="text-lg font-black text-text-dark">No products found</p>
                <p className="mt-2 text-sm text-text-light max-w-xs">
                  Try a different category or{" "}
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-primary-blue font-bold underline underline-offset-2"
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
