"use client";

/**
 * PumpCard — Fixed version.
 *
 * Fixes applied vs original:
 *
 * 1. FLIP STAYS LOCKED while on card back.
 *    Once the user enters the flip zone (>58% Y), the card stays flipped
 *    until they leave the OUTER wrapper entirely. This means the
 *    "Request Quote" CTA is always reachable.
 *
 * 2. CONSISTENT CARD HEIGHT.
 *    The outer wrapper uses a fixed height (440px) instead of minHeight,
 *    so application-tag wrapping never causes height jitter in the grid.
 *    CardFront uses overflow-hidden to prevent content escape.
 *
 * 3. MOBILE TAP SUPPORT.
 *    On touch devices the zone-detection approach is unreliable.
 *    We detect touch via a ref and toggle flip state on tap instead,
 *    giving clean tap-to-flip / tap-again-to-unflip on mobile.
 *
 * 4. CLEANER "HOVER FOR SPECS" HINT.
 *    The hint now pulses on first appearance and uses a slightly larger
 *    text + chevron icon so it's harder to miss.
 *
 * 5. IMAGE BACKGROUND NORMALISED.
 *    The image wrapper always uses a solid white inner background so
 *    transparent or white-bg pump images look identical.
 *
 * Interaction model (desktop):
 *   Zone 1 — Image (top ~58%): 3D perspective tilt.
 *   Zone 2 — Info (bottom ~42%): card flips to spec back.
 *   Once flipped → card stays flipped until cursor leaves outer wrapper.
 *   Leave outer wrapper → tilt and flip reset.
 *
 * Interaction model (mobile):
 *   Tap anywhere on front → flip to spec back.
 *   Tap anywhere on back  → flip to front.
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect, type MouseEvent } from "react";
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
// FIX 1: flippedRef acts as a latch.
//   - Once true, it stays true until onMouseLeave fires.
//   - This ensures "Request Quote" CTA is always clickable.
//
// FIX 3: isTouchDevice ref disables mouse-zone logic on touch screens.

function useCardInteraction() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const flippedRef  = useRef(false);       // latch — stays true once tripped
  const tiltActiveRef = useRef(false);
  const isTouchRef  = useRef(false);       // set on first touchstart

  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt]       = useState<ImageTilt>({ rotateX: 0, rotateY: 0, active: false });

  // Detect touch device on first touch event
  useEffect(() => {
    const mark = () => { isTouchRef.current = true; };
    window.addEventListener("touchstart", mark, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", mark);
  }, []);

  // ── Desktop: mouse-move drives both tilt and flip (with latch) ──────────
  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return;

    const outer = outerRef.current;
    if (!outer) return;

    const outerRect = outer.getBoundingClientRect();
    const relY = e.clientY - outerRect.top;

    // FIX 1: latch — once flipped, never flip back on mousemove.
    //         Only onMouseLeave resets the latch.
    if (!flippedRef.current) {
      const shouldFlip = relY > outerRect.height * 0.58;
      if (shouldFlip) {
        flippedRef.current = true;
        setFlipped(true);
      }
    }

    // Tilt only applies while card is NOT flipped
    if (!flippedRef.current) {
      const imgEl = imageRef.current;
      let shouldTilt = false;

      if (imgEl) {
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
    } else {
      // Card is flipped — kill any residual tilt immediately
      if (tiltActiveRef.current) {
        tiltActiveRef.current = false;
        setTilt({ rotateX: 0, rotateY: 0, active: false });
      }
    }
  }, []);

  // ── Desktop: leaving the card resets everything ──────────────────────────
  const onMouseLeave = useCallback(() => {
    if (isTouchRef.current) return;

    if (flippedRef.current) {
      flippedRef.current = false;
      setFlipped(false);
    }
    if (tiltActiveRef.current) {
      tiltActiveRef.current = false;
      setTilt({ rotateX: 0, rotateY: 0, active: false });
    }
  }, []);

  // ── Mobile: tap toggles flip ─────────────────────────────────────────────
  const onTouchEnd = useCallback(() => {
    setFlipped((prev) => {
      const next = !prev;
      flippedRef.current = next;
      return next;
    });
    // Reset tilt on any tap
    if (tiltActiveRef.current) {
      tiltActiveRef.current = false;
      setTilt({ rotateX: 0, rotateY: 0, active: false });
    }
  }, []);

  return {
    outerRef,
    imageRef,
    flipped,
    tilt,
    handlers: { onMouseMove, onMouseLeave, onTouchEnd },
  };
}

// ── Card Front ────────────────────────────────────────────────────────────

interface CardFrontProps {
  pump:     PumpModel;
  imageRef: React.RefObject<HTMLDivElement | null>;
  tilt:     ImageTilt;
}

function CardFront({ pump, imageRef, tilt }: CardFrontProps) {
  const image = PUMP_IMAGES[pump.id];

  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-border bg-white overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 shrink-0">
        <SectionTag accent="blue" className="text-[11px] leading-none tracking-wide">
          {pump.category}
        </SectionTag>
        <span
          className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold tracking-[0.1em] uppercase"
          style={{
            backgroundColor: "#1e5bb814",
            color: "#1e5bb8",
          }}
        >
          {pump.seriesCode}
        </span>
      </div>

      {/* ── FIX 5: Image zone — solid white bg so all images look uniform ── */}
      <div
        ref={imageRef}
        className="relative mx-5 aspect-4/3 rounded-xl overflow-hidden shrink-0"
        style={{ background: "#ffffff" }}
      >
        {/* Subtle tinted inner gradient sits BEHIND the image */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom right, #f4f6fc, #e8effc)",
            opacity: 0.6,
          }}
        />

        {image ? (
          <Image
            src={image}
            alt={`${pump.fullName} — Berlington`}
            fill
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-3 relative z-10"
            style={{
              transform: tilt.active
                ? `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(20px) scale(1.06)`
                : "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
              transition: tilt.active
                ? "transform 80ms linear"
                : "transform 380ms cubic-bezier(0.25,0,0,1)",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span
              className="text-3xl font-bold opacity-20"
              style={{ color: "#1e5bb8" }}
            >
              {pump.seriesCode}
            </span>
          </div>
        )}

        {tilt.active && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
            style={{
              background: "linear-gradient(90deg, transparent, #4da3ff 50%, transparent)",
              opacity: 0.8,
            }}
          />
        )}
      </div>

      {/* Info zone — pointer-events-none so outer wrapper owns all events */}
      <div className="flex-1 flex flex-col px-5 pt-4 pb-4 pointer-events-none min-h-0">
        <h3 className="text-lg font-bold text-[#0f3d91] leading-tight tracking-tight shrink-0">
          {pump.fullName}
        </h3>

        <div className="mt-3 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] block mb-2 text-slate-500">
            Applications
          </span>
          {/* Allow tags to wrap naturally without artificially slicing height */}
          <div className="flex flex-wrap gap-1.5">
            {pump.applications.map((app) => (
              <span
                key={app}
                className="rounded-md px-2.5 py-1 text-[10px] font-bold border whitespace-nowrap"
                style={{
                  backgroundColor: "rgba(108,194,74,0.08)",
                  color: "#2fa84f",
                  borderColor: "rgba(108,194,74,0.2)",
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* FIX 4: More visible hint with chevron + pulse animation */}
        <div className="mt-auto pt-3 flex items-center gap-2 border-t border-slate-100">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse bg-[#1e5bb8]" aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-wide flex items-center gap-1 text-[#1e5bb8]/80">
            {/* Desktop hint */}
            <span className="hidden sm:inline">Hover below · </span>
            {/* Mobile hint */}
            <span className="sm:hidden">Tap · </span>
            View specs
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              style={{ opacity: 0.7 }}
            >
              <path
                d="M2 4l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
      <div className="relative z-10 px-6 pt-6 pb-4 border-b border-white/10 shrink-0">
        <span
          className="block text-[11px] font-semibold uppercase tracking-[0.15em] mb-1.5"
          style={{ color: "#4da3ff" }}
        >
          Berlington · {pump.seriesCode}
        </span>
        <h3 className="text-xl font-bold text-white leading-tight tracking-tight">
          Technical Specs
        </h3>
      </div>

      {/* Spec rows */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-4 min-h-0">
        {specs.map(({ label, value }) => (
          <div
            key={label}
            className="grid items-start py-2 border-b border-white/10 last:border-0"
            style={{ gridTemplateColumns: "1fr 1.5fr" }}
          >
            <span
              className="text-[10.5px] font-semibold uppercase tracking-[0.1em] pt-0.5 opacity-80"
              style={{ color: "#4da3ff" }}
            >
              {label}
            </span>
            <span
              className="text-xs font-semibold text-white text-right leading-relaxed"
              style={MONO}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 px-6 pb-6 shrink-0">
        <Link
          href={`?quote=${pump.id}`}
          scroll={false}
          id={`pump-card-cta-${pump.id}`}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-lg py-3",
            "text-sm font-bold text-white tracking-wide",
            "bg-primary-green transition-all duration-200 shadow-sm hover:brightness-110 hover:-translate-y-px hover:shadow-md active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f3d91]",
          ].join(" ")}
        >
          Request Quote
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

  return (
    // Fixed height (460px) provides enough inner space for 2-line titles and tags without clipping.
    <div
      ref={outerRef}
      id={`pump-card-${pump.id}`}
      className="relative w-full cursor-pointer"
      style={{
        perspective: "1000px",
        height: "460px",
      }}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      onTouchEnd={handlers.onTouchEnd}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "tween", duration: 0.55, ease: FLIP_EASE }}
        role="group"
        aria-label={
          flipped
            ? `${pump.fullName} — showing technical specifications`
            : `${pump.fullName} — hover image for 3D view, hover lower section for specs`
        }
      >
        <CardFront pump={pump} imageRef={imageRef} tilt={tilt} />
        <CardBack pump={pump} />
      </motion.div>
    </div>
  );
}