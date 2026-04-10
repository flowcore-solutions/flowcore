"use client";

/**
 * PumpCard — Redesigned for "Minimalist Grandeur" industrial design system.
 *
 * Interaction model (desktop):
 *   Zone 1 — Image (top ~60%): 3D perspective tilt. Image pops with
 *             translateZ(32px), drop-shadow amplification, and scale(1.08).
 *   Zone 2 — Footer (bottom ~40%): card flips to spec back.
 *   Once flipped → stays flipped until cursor leaves outer wrapper.
 *
 * Interaction model (mobile):
 *   Tap → toggle flip.
 *
 * Card height: 380px fixed. No dead zones.
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect, type MouseEvent } from "react";
import { motion } from "framer-motion";
import type { PumpModel } from "@/lib/pump-data";
import type { StaticImageData } from "next/image";

// ── Static image map ──────────────────────────────────────────────────────
import cdlCdlf    from "@/app/assets/pumps/cdl-cdlf.png";
import cdlfCdh    from "@/app/assets/pumps/cdlf-cdh.png";
import cdlkCdlkf  from "@/app/assets/pumps/cdlk-cdlkf.png";
import chl        from "@/app/assets/pumps/chl.png";
import chlf       from "@/app/assets/pumps/chlf-chlf-t.png";
import chm        from "@/app/assets/pumps/chm.png";
import wq         from "@/app/assets/pumps/wq.png";
import stp        from "@/app/assets/pumps/stp.png";
import qyB        from "@/app/assets/pumps/qy-b.png";
import hydro      from "@/app/assets/pumps/hydro.png";
import bt         from "@/app/assets/pumps/bt.png";
import sz         from "@/app/assets/pumps/sz.png";
import zs         from "@/app/assets/pumps/zs.png";
import ld         from "@/app/assets/pumps/ld.png";
import niso       from "@/app/assets/pumps/niso.png";
import mini       from "@/app/assets/pumps/mini.png";

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
  fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
  fontVariantNumeric: "tabular-nums",
};

interface ImageTilt {
  rotateX: number;
  rotateY: number;
  active: boolean;
}

// ── Unified pointer hook ──────────────────────────────────────────────────

function useCardInteraction() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const flippedRef    = useRef(false);
  const tiltActiveRef = useRef(false);
  const isTouchRef    = useRef(false);

  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt]       = useState<ImageTilt>({ rotateX: 0, rotateY: 0, active: false });

  useEffect(() => {
    const mark = () => { isTouchRef.current = true; };
    window.addEventListener("touchstart", mark, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", mark);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return;
    const outer = outerRef.current;
    if (!outer) return;

    const outerRect = outer.getBoundingClientRect();
    const relY = e.clientY - outerRect.top;

    if (!flippedRef.current) {
      if (relY > outerRect.height * 0.6) {
        flippedRef.current = true;
        setFlipped(true);
      }
    }

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
          const nx = (e.clientX - imgRect.left - imgRect.width / 2)  / (imgRect.width / 2);
          const ny = (e.clientY - imgRect.top  - imgRect.height / 2) / (imgRect.height / 2);
          // Amplified tilt: ±16deg for strong pop effect
          setTilt({ rotateX: -ny * 16, rotateY: nx * 16, active: true });
        }
      }
      if (!shouldTilt && tiltActiveRef.current) {
        setTilt({ rotateX: 0, rotateY: 0, active: false });
      }
      tiltActiveRef.current = shouldTilt;
    } else {
      if (tiltActiveRef.current) {
        tiltActiveRef.current = false;
        setTilt({ rotateX: 0, rotateY: 0, active: false });
      }
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (isTouchRef.current) return;
    if (flippedRef.current) { flippedRef.current = false; setFlipped(false); }
    if (tiltActiveRef.current) { tiltActiveRef.current = false; setTilt({ rotateX: 0, rotateY: 0, active: false }); }
  }, []);

  const onTouchEnd = useCallback(() => {
    setFlipped((prev) => {
      const next = !prev;
      flippedRef.current = next;
      return next;
    });
    if (tiltActiveRef.current) {
      tiltActiveRef.current = false;
      setTilt({ rotateX: 0, rotateY: 0, active: false });
    }
  }, []);

  return { outerRef, imageRef, flipped, tilt, handlers: { onMouseMove, onMouseLeave, onTouchEnd } };
}

// ── Card Front ────────────────────────────────────────────────────────────

interface CardFrontProps {
  pump:     PumpModel;
  imageRef: React.RefObject<HTMLDivElement | null>;
  tilt:     ImageTilt;
}

function CardFront({ pump, imageRef, tilt }: CardFrontProps) {
  const image = PUMP_IMAGES[pump.id];

  const imageTransform = tilt.active
    ? `perspective(700px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(32px) scale(1.08)`
    : "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";

  const imageTransition = tilt.active
    ? "transform 70ms linear, filter 70ms linear"
    : "transform 400ms cubic-bezier(0.25,0,0,1), filter 400ms cubic-bezier(0.25,0,0,1)";

  const imageFilter = tilt.active
    ? "drop-shadow(0 20px 28px rgba(30,91,184,0.35)) drop-shadow(0 8px 12px rgba(0,0,0,0.18))"
    : "drop-shadow(0 2px 6px rgba(0,0,0,0.08))";

  return (
    <div
      className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-border bg-white overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)" }}
    >
      {/* ── Top: category tag + series code ── */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2 shrink-0 min-w-0">
        <span
          className="inline-flex items-center rounded-md px-2 py-0.5 text-[9.5px] font-black uppercase tracking-widest border truncate min-w-0"
          style={{ backgroundColor: "#1e5bb810", color: "#1e5bb8", borderColor: "#1e5bb820" }}
        >
          {pump.category}
        </span>
        <span
          className="shrink-0 ml-auto rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase whitespace-nowrap"
          style={{ backgroundColor: "#0f172a08", color: "#0f172a60" }}
        >
          {pump.seriesCode}
        </span>
      </div>

      {/* ── Image zone: blueprint gradient bg → pump pops off it ── */}
      <div
        ref={imageRef}
        className="relative mx-4 rounded-xl overflow-hidden shrink-0"
        style={{
          aspectRatio: "4/3",
          background: "linear-gradient(135deg, #eef3fb 0%, #dde8f8 100%)",
        }}
      >
        {/* Diagonal grid behind image for blueprint feel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 16px)`,
            opacity: 0.04,
          }}
        />

        {/* Radial light vignette centred on image */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 75%)",
          }}
        />

        {image ? (
          <Image
            src={image}
            alt={`${pump.fullName} — Berlington`}
            fill
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-4 relative z-10"
            style={{
              transform:  imageTransform,
              filter:     imageFilter,
              transition: imageTransition,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-4xl font-black opacity-15" style={{ color: "#1e5bb8" }}>
              {pump.seriesCode}
            </span>
          </div>
        )}

        {/* Active tilt — blue scan line glow at bottom edge */}
        {tilt.active && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none z-20"
            style={{
              background: "linear-gradient(90deg, transparent, #4da3ff 40%, #1e5bb8 50%, #4da3ff 60%, transparent)",
              boxShadow: "0 0 12px 2px rgba(77,163,255,0.5)",
            }}
          />
        )}
      </div>

      {/* ── Footer: pump name + hover cue ── */}
      <div className="flex-1 flex flex-col justify-between px-4 pt-3 pb-4 min-h-0 pointer-events-none">
        <div>
          <h3 className="text-[15px] font-black text-deep-blue leading-tight tracking-tight">
            {pump.fullName}
          </h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {pump.applications.slice(0, 3).map((app) => (
              <span
                key={app}
                className="rounded px-2 py-0.5 text-[9px] font-bold border whitespace-nowrap"
                style={{
                  backgroundColor: "rgba(108,194,74,0.07)",
                  color: "#2fa84f",
                  borderColor: "rgba(108,194,74,0.18)",
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Interaction cue */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100 mt-auto">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse bg-light-blue" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-wide text-light-blue/70">
            <span className="hidden sm:inline">Hover below · </span>
            <span className="sm:hidden">Tap · </span>
            View specs
          </span>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="ml-auto opacity-40">
            <path d="M2 4l3 3 3-3" stroke="#4da3ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
      {/* Engineering grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      {/* Diagonal accent lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 24px)`,
        }}
      />

      {/* Large watermark series code */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-3 font-black leading-none select-none"
        style={{ color: "rgba(255,255,255,0.04)", fontSize: "64px", letterSpacing: "-0.04em" }}
      >
        {pump.seriesCode}
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-3 border-b border-white/10 shrink-0 min-w-0">
        <span
          className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1 truncate"
          style={{ color: "#4da3ff" }}
        >
          Berlington · {pump.seriesCode}
        </span>
        <h3 className="text-[15px] font-black text-white leading-tight tracking-tight">
          Technical Specs
        </h3>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-1 min-h-0">
        {specs.map(({ label, value }) => (
          <div
            key={label}
            className="grid items-center py-[5px] border-b border-white/10 last:border-0"
            style={{ gridTemplateColumns: "1fr 1.5fr" }}
          >
            <span
              className="text-[9px] font-bold uppercase tracking-widest opacity-75"
              style={{ color: "#4da3ff" }}
            >
              {label}
            </span>
            <span
              className="text-[10px] font-bold text-white text-right leading-snug"
              style={MONO}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 px-4 pb-4 shrink-0">
        <Link
          href={`?quote=${pump.id}`}
          scroll={false}
          id={`pump-card-cta-${pump.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-black text-white tracking-wide bg-primary-green transition-all duration-200 hover:brightness-110 hover:-translate-y-px hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 focus-visible:ring-offset-deep-blue active:scale-[0.98]"
        >
          Request Quote
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    <div
      ref={outerRef}
      id={`pump-card-${pump.id}`}
      className="relative w-full cursor-pointer"
      style={{ perspective: "1000px", height: "clamp(360px, 50vw, 400px)" }}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      onTouchEnd={handlers.onTouchEnd}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "tween", duration: 0.5, ease: FLIP_EASE }}
        role="group"
        aria-label={
          flipped
            ? `${pump.fullName} — technical specifications`
            : `${pump.fullName} — hover for specs`
        }
      >
        <CardFront pump={pump} imageRef={imageRef} tilt={tilt} />
        <CardBack pump={pump} />
      </motion.div>
    </div>
  );
}