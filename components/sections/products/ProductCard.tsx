"use client";

/**
 * ProductCard — True 3D Perspective Flip Card.
 *
 * Mechanism (CSS 3D — not the fake translate trick):
 *  1. Outer div: `perspective: 1000px` — establishes the 3D viewing cone.
 *  2. motion.div: `transform-style: preserve-3d` — children live in shared 3D space.
 *     Animates `rotateY` via Framer Motion state (handles desktop hover + mobile tap).
 *  3. Front face: `backface-visibility: hidden` — disappears when facing away.
 *  4. Back face: `backface-visibility: hidden` + static `rotateY(180deg)` — starts
 *     facing backward, flips into view when parent reaches 180°.
 *
 * Framer Motion approach:
 *  - State `flipped` drives `animate={{ rotateY: flipped ? 180 : 0 }}`.
 *  - `onHoverStart/End` for desktop. `onTap` toggles for mobile.
 *  - Single source of truth: no separate `whileHover` that could fight state.
 *
 * Colors:
 *  - Front accent: Blue (structural hardware identity).
 *  - Back: Deep Blue (#0F3D91) + Light Blue labels — high contrast spec sheet.
 *  - CTA: Primary Green — the only green on the card (action signal).
 */

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { PumpModel, PumpCategory } from "@/lib/pump-data";
import SectionTag from "@/components/ui/SectionTag";

// ── Static image map — all 16 pumps ───────────────────────────────────────
import cdlCdlf from "@/app/assets/pumps/cdl-cdlf.png";
import cdlfCdh from "@/app/assets/pumps/cdlf-cdh.png";
import cdlkCdlkf from "@/app/assets/pumps/cdlk-cdlkf.png";
import chl from "@/app/assets/pumps/chl.png";
import chlf from "@/app/assets/pumps/chlf-chlf-t.png";
import chm from "@/app/assets/pumps/chm.png";
import wq from "@/app/assets/pumps/wq.png";
import stp from "@/app/assets/pumps/stp.png";
import qyB from "@/app/assets/pumps/qy-b.png";
import hydro from "@/app/assets/pumps/hydro.png";
import bt from "@/app/assets/pumps/bt.png";
import sz from "@/app/assets/pumps/sz.png";
import zs from "@/app/assets/pumps/zs.png";
import ld from "@/app/assets/pumps/ld.png";
import niso from "@/app/assets/pumps/niso.png";
import mini from "@/app/assets/pumps/mini.png";
import type { StaticImageData } from "next/image";

export const PUMP_IMAGES: Record<string, StaticImageData> = {
  "cdl-cdlf": cdlCdlf,
  "cdlf-cdh": cdlfCdh,
  "cdlk-cdlkf": cdlkCdlkf,
  chl, chlf, chm, wq, stp,
  "qy-b": qyB,
  hydro, bt, sz, zs, ld, niso, mini,
};

// ── Category accent: Blue = hardware structure, Green = fluid/submersible ─

type AccentKey = "blue" | "green";

const CATEGORY_ACCENT: Record<PumpCategory, AccentKey> = {
  "Vertical Multistage":   "blue",
  "Horizontal Multistage": "blue",
  "Sewage & Submersible":  "green",
  "Hydro & Booster":       "green",
  "Self-Priming":          "blue",
  "Pipeline & Industrial": "blue",
};

// ── Constants ─────────────────────────────────────────────────────────────

// Symmetric ease — smooth for both the forward and reverse flip
const FLIP_EASE = [0.4, 0, 0.2, 1] as const;

const MONO: React.CSSProperties = {
  fontFamily:
    "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
  fontVariantNumeric: "tabular-nums",
};

// ── Card Front ────────────────────────────────────────────────────────────

function CardFront({ pump }: { pump: PumpModel }) {
  const image = PUMP_IMAGES[pump.id];
  const accent = CATEGORY_ACCENT[pump.category];

  return (
    /*
     * position: absolute + inset-0 is mandatory for the flip to work.
     * Both faces must occupy exactly the same space so the container
     * height is set by the outer wrapper, not by either face independently.
     */
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-border bg-white overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Top row: category tag (left) + series code badge (right) */}
      <div className="flex items-start justify-between gap-2 px-4 pt-4 pb-2 shrink-0">
        <SectionTag accent={accent} className="text-[10px] leading-none">
          {pump.category}
        </SectionTag>
        <span
          className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide"
          style={{
            backgroundColor: accent === "green" ? "#6cc24a14" : "#1e5bb810",
            color: accent === "green" ? "#2fa84f" : "#1e5bb8",
          }}
        >
          {pump.seriesCode}
        </span>
      </div>

      {/* Pump image — fixed aspect ratio with subtle accent gradient */}
      <div 
        className="relative mx-4 aspect-[4/3] rounded-xl overflow-hidden"
        style={{
          background: accent === "green" 
            ? "linear-gradient(to bottom right, #f4fbfc, #ebf5ee)" 
            : "linear-gradient(to bottom right, #f4f6fc, #e8effc)"
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={`${pump.fullName} — Berlington`}
            fill
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-3"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold opacity-20" style={{ color: accent === "green" ? "#2fa84f" : "#1e5bb8" }}>
              {pump.seriesCode}
            </span>
          </div>
        )}
      </div>

      {/* Footer: pump name + applications + hover cue */}
      <div className="flex-1 flex flex-col px-4 pt-2.5 pb-3">
        <h3 className="text-base font-bold text-text-dark leading-snug">
          {pump.fullName}
        </h3>
        
        {/* Applications */}
        <div className="mt-2.5">
          <span 
            className="text-[9px] font-semibold uppercase tracking-[0.1em] block mb-1.5"
            style={{ color: accent === "green" ? "#6cc24a" : "#4da3ff" }}
          >
            Applications
          </span>
          <div className="flex flex-wrap gap-1">
            {pump.applications.map((app) => (
              <span
                key={app}
                className="rounded px-1.5 py-0.5 text-[9px] font-semibold border"
                style={{
                  backgroundColor: accent === "green" ? "rgba(108, 194, 74, 0.08)" : "rgba(30, 91, 184, 0.05)",
                  color: accent === "green" ? "#2fa84f" : "#1e5bb8",
                  borderColor: accent === "green" ? "rgba(108, 194, 74, 0.2)" : "rgba(30, 91, 184, 0.15)"
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Hover cue — disappears on flip */}
        <div className="mt-auto pt-3 flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
            style={{ backgroundColor: accent === "green" ? "#6cc24a" : "#1e5bb8" }}
            aria-hidden="true"
          />
          <span 
            className="text-[10px] font-medium"
            style={{ color: accent === "green" ? "#2fa84f" : "#1e5bb8" }}
          >
            Hover · Tap for specs
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Card Back ─────────────────────────────────────────────────────────────

function CardBack({ pump }: { pump: PumpModel }) {
  // 5 key specs — Connection omitted; its value is short but Material
  // ("Stainless steel / Cast iron") is the longest and needs the full row width.
  const specs: Array<{ label: string; value: string }> = [
    { label: "Flow Rate",   value: pump.flowRate },
    { label: "Max Head",    value: pump.maxHead },
    { label: "Temp",        value: pump.temperature },
    { label: "Voltage",     value: pump.voltage },
    { label: "Material",    value: pump.material },
  ];

  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        transform: "rotateY(180deg)",
        backgroundColor: "#0f3d91",
      }}
    >
      {/* Engineering grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Series code watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-14 right-3 text-[56px] font-black leading-none select-none"
        style={{ color: "rgba(255,255,255,0.04)", letterSpacing: "-0.04em" }}
      >
        {pump.seriesCode}
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-4 pb-3 border-b border-white/10 shrink-0">
        <span
          className="block text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#4da3ff" }}
        >
          Berlington · {pump.seriesCode}
        </span>
        <h3 className="mt-1 text-sm font-semibold text-white leading-snug">
          Technical Specifications
        </h3>
      </div>

      {/*
       * Spec rows — 2-column CSS grid.
       *
       * Using grid instead of flex justify-between eliminates all wrapping:
       *  - Left col (5rem): label, fixed width, never grows
       *  - Right col (1fr): value, takes remaining space, right-aligned
       *
       * Values that are long ("Stainless steel / Cast iron") will wrap within
       * their column cleanly instead of pushing the label off-screen.
       */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-2 min-h-0">
        {specs.map(({ label, value }) => (
          <div
            key={label}
            className="grid items-start py-[6px] border-b border-white/8 last:border-0"
            style={{ gridTemplateColumns: "5rem 1fr" }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.08em] leading-tight pt-px"
              style={{ color: "#4da3ff" }}
            >
              {label}
            </span>
            <span
              className="text-[11px] font-semibold text-white text-right leading-snug"
              style={MONO}
            >
              {value}
            </span>
          </div>
        ))}

        {/* Application tags */}
        <div className="mt-2 pt-1.5 border-t border-white/10">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
            style={{ color: "#4da3ff" }}
          >
            Applications
          </span>
          <div className="flex flex-wrap gap-1">
            {pump.applications.map((app) => (
              <span
                key={app}
                className="rounded px-1.5 py-0.5 text-[9px] font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#a6e46b",
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Request Quote CTA */}
      <div className="relative z-10 px-4 pb-3 shrink-0">
        <Link
          href={`/contact?product=${encodeURIComponent(pump.fullName)}`}
          id={`product-card-back-cta-${pump.id}`}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-lg py-2.5",
            "text-sm font-semibold text-white",
            "bg-primary-green hover:bg-dark-green",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 focus-visible:ring-offset-deep-blue",
          ].join(" ")}
        >
          Request Quote
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Main Exported Component ───────────────────────────────────────────────

interface ProductCardProps {
  pump: PumpModel;
}

export default function ProductCard({ pump }: ProductCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    /*
     * Hover is detected on the OUTER static div — NOT the rotating motion.div.
     *
     * Why: if onHoverStart/End sits on the element that rotates, the flip
     * moves the element boundary under the cursor, triggering spurious
     * onHoverEnd → onHoverStart cycles that cause the jitter seen in the UI.
     *
     * Outer div never moves, so its hover zone is always stable.
     */
    <div
      id={`product-card-${pump.id}`}
      className="perspective-1000 w-full cursor-pointer min-h-[380px]"
      style={{ height: "100%", minHeight: "380px" }}
      onMouseEnter={() => setFlipped(true)}

      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: FLIP_EASE,
        }}
        onTap={() => setFlipped((f) => !f)}
        aria-label={`${pump.fullName} — ${flipped ? "showing specifications" : "hover for specs"}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
      >
        <CardFront pump={pump} />
        <CardBack pump={pump} />
      </motion.div>
    </div>
  );
}

