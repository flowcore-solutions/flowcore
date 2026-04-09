"use client";

/**
 * PumpCard — Shared dual-zone interaction card.
 *
 * Used by:
 *   - components/sections/home/FeaturedPumpsGrid.tsx  (home page, 8 cards)
 *   - app/products/page.tsx                            (full catalogue, all cards)
 *
 * Interaction (jitter-free):
 *   ALL pointer events sit on the OUTER STATIC wrapper — never the rotating element.
 *   Flip is Y-position based (> 58% of card height) not enter/leave based,
 *   so the rotating bounding box cannot cause spurious state changes.
 *
 *   Zone 1 — Image (top ~58%): 3D perspective tilt, no flip.
 *   Zone 2 — Info (bottom ~42%): card flips to deep-blue spec back.
 *   Leave outer wrapper → both tilt and flip reset.
 *
 
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, type MouseEvent } from "react";
import { motion } from "framer-motion";
import type { PumpModel, PumpCategory } from "@/lib/pump-data";
import SectionTag from "@/components/ui/SectionTag";
import type { StaticImageData } from "next/image";

// ── Static image map ──────────────────────────────────────────────────────
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

export const PUMP_IMAGES: Record<string, StaticImageData> = {
  "cdl-cdlf": cdlCdlf,
  "cdlf-cdh": cdlfCdh,
  "cdlk-cdlkf": cdlkCdlkf,
  chl, chlf, chm, wq, stp,
  "qy-b": qyB,
  hydro, bt, sz, zs, ld, niso, mini,
};

// ── Types & constants ─────────────────────────────────────────────────────

type AccentKey = "blue" | "green";

const CATEGORY_ACCENT: Record<PumpCategory, AccentKey> = {
  "Vertical Multistage":   "blue",
  "Horizontal Multistage": "blue",
  "Sewage & Submersible":  "green",
  "Hydro & Booster":       "green",
  "Self-Priming":          "blue",
  "Pipeline & Industrial": "blue",
};

const FLIP_EASE = [0.4, 0, 0.2, 1] as const;

const MONO: React.CSSProperties = {
  fontFamily:
    "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
  fontVariantNumeric: "tabular-nums",
};

interface ImageTilt {
  rotateX: number;
  rotateY: number;
  active: boolean;
}

// ── Unified pointer hook ──────────────────────────────────────────────────
//
// Single onMouseMove on the static outer wrapper drives everything:
//   - Flip state (Y threshold)
//   - Image tilt (cursor within imageRef bounds)
//
// Refs guard setFlipped/setTilt to avoid renders when value hasn't changed.

function useCardInteraction() {
  const outerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const flippedRef = useRef(false);
  const tiltActiveRef = useRef(false);

  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState<ImageTilt>({ rotateX: 0, rotateY: 0, active: false });

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const outer = outerRef.current;
    if (!outer) return;

    const outerRect = outer.getBoundingClientRect();
    const relY = e.clientY - outerRect.top;

    // Flip zone: bottom 42% of card height
    const shouldFlip = relY > outerRect.height * 0.58;
    if (shouldFlip !== flippedRef.current) {
      flippedRef.current = shouldFlip;
      setFlipped(shouldFlip);
    }

    // Tilt zone: top zone AND cursor within image element bounds
    const imgEl = imageRef.current;
    let shouldTilt = false;

    if (!shouldFlip && imgEl) {
      const imgRect = imgEl.getBoundingClientRect();
      const inImage =
        e.clientX >= imgRect.left &&
        e.clientX <= imgRect.right &&
        e.clientY >= imgRect.top &&
        e.clientY <= imgRect.bottom;

      if (inImage) {
        shouldTilt = true;
        const nx = (e.clientX - imgRect.left - imgRect.width / 2) / (imgRect.width / 2);
        const ny = (e.clientY - imgRect.top - imgRect.height / 2) / (imgRect.height / 2);
        setTilt({ rotateX: -ny * 14, rotateY: nx * 14, active: true });
      }
    }

    if (!shouldTilt && tiltActiveRef.current) {
      setTilt({ rotateX: 0, rotateY: 0, active: false });
    }
    tiltActiveRef.current = shouldTilt;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (flippedRef.current) {
      flippedRef.current = false;
      setFlipped(false);
    }
    if (tiltActiveRef.current) {
      tiltActiveRef.current = false;
      setTilt({ rotateX: 0, rotateY: 0, active: false });
    }
  }, []);

  return { outerRef, imageRef, flipped, tilt, handlers: { onMouseMove, onMouseLeave } };
}

// ── Card Front ────────────────────────────────────────────────────────────

interface CardFrontProps {
  pump: PumpModel;
  accent: AccentKey;
  imageRef: React.RefObject<HTMLDivElement | null>;
  tilt: ImageTilt;
}

function CardFront({ pump, accent, imageRef, tilt }: CardFrontProps) {
  const image = PUMP_IMAGES[pump.id];

  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-border bg-white overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Header row */}
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

      {/* Image zone — ref enables bounds-checking in the hook */}
      <div
        ref={imageRef}
        className="relative mx-4 aspect-4/3 rounded-xl overflow-hidden shrink-0"
        style={{
          background: accent === "green"
            ? "linear-gradient(to bottom right, #f4fbfc, #ebf5ee)"
            : "linear-gradient(to bottom right, #f4f6fc, #e8effc)",
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
            style={{
              // Inline perspective — separate 3D context, does not affect outer flip
              transform: tilt.active
                ? `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(20px) scale(1.06)`
                : "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
              transition: tilt.active
                ? "transform 80ms linear"
                : "transform 380ms cubic-bezier(0.25,0,0,1)",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-3xl font-bold opacity-20"
              style={{ color: accent === "green" ? "#2fa84f" : "#1e5bb8" }}
            >
              {pump.seriesCode}
            </span>
          </div>
        )}

        {tilt.active && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: accent === "green"
                ? "linear-gradient(90deg, transparent, #6cc24a 50%, transparent)"
                : "linear-gradient(90deg, transparent, #4da3ff 50%, transparent)",
              opacity: 0.8,
            }}
          />
        )}
      </div>

      {/* Info zone — pointer-events-none: outer wrapper owns all events */}
      <div className="flex-1 flex flex-col px-4 pt-2.5 pb-3 pointer-events-none">
        <h3 className="text-base font-bold text-text-dark leading-snug">
          {pump.fullName}
        </h3>

        <div className="mt-2.5">
          <span
            className="text-[9px] font-semibold uppercase tracking-widest block mb-1.5"
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
                  backgroundColor: accent === "green" ? "rgba(108,194,74,0.08)" : "rgba(30,91,184,0.05)",
                  color: accent === "green" ? "#2fa84f" : "#1e5bb8",
                  borderColor: accent === "green" ? "rgba(108,194,74,0.2)" : "rgba(30,91,184,0.15)",
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>

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
  const specs: Array<{ label: string; value: string }> = [
    { label: "Flow Rate", value: pump.flowRate },
    { label: "Max Head",  value: pump.maxHead },
    { label: "Temp",      value: pump.temperature },
    { label: "Voltage",   value: pump.voltage },
    { label: "Material",  value: pump.material },
  ];

  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
      style={{ transform: "rotateY(180deg)", backgroundColor: "#0f3d91" }}
    >
      {/* Engineering grid */}
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

      {/* Watermark */}
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

      {/* Spec rows */}
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
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#a6e46b" }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-4 pb-3 shrink-0">
        <Link
          href={`/contact?product=${encodeURIComponent(pump.fullName)}`}
          id={`pump-card-cta-${pump.id}`}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-lg py-2.5",
            "text-sm font-semibold text-white",
            "bg-primary-green hover:bg-dark-green transition-colors duration-150",
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

// ── Exported component ────────────────────────────────────────────────────

export interface PumpCardProps {
  pump: PumpModel;
}

export default function PumpCard({ pump }: PumpCardProps) {
  const { outerRef, imageRef, flipped, tilt, handlers } = useCardInteraction();
  const accent = CATEGORY_ACCENT[pump.category] ?? "blue";

  return (
    <div
      ref={outerRef}
      id={`pump-card-${pump.id}`}
      className="relative w-full cursor-pointer"
      style={{
        perspective: "1000px",
        minHeight: "380px",
        height: "100%",
      }}
      {...handlers}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          minHeight: "380px",
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "tween", duration: 0.55, ease: FLIP_EASE }}
        role="group"
        aria-label={
          flipped
            ? `${pump.fullName} — showing technical specifications`
            : `${pump.fullName} — hover image for 3D view, hover lower section for specs`
        }
      >
        <CardFront pump={pump} accent={accent} imageRef={imageRef} tilt={tilt} />
        <CardBack pump={pump} />
      </motion.div>
    </div>
  );
}
