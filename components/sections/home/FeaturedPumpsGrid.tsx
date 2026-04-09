"use client";

/**
 * FeaturedPumpsGrid — Redesigned to flow from StatsBar → cards.
 *
 * Flow fix rationale:
 *  - StatsBar ends on deep-blue (#0f3d91) with a faint green bottom line.
 *  - Old version jumped straight to bg-white — harsh contrast break.
 *  - New version uses a "bridge zone": the section opens on deep-blue,
 *    then the header text is white (matching StatsBar), and the grid
 *    sits on bg-section-bg (#f8fafc) inside a rounded container that
 *    "floats" out of the deep-blue — mimicking the Navbar island pattern
 *    already used in this codebase.
 *  - Cards keep the same flat + 3D-image-only hover behaviour.
 *  - Typography now uses the same industrial uppercase tracking as StatsBar
 *    section labels, and the SectionTag accent matches HeroSection's
 *    border-left treatment.
 *
 * 3D behaviour: unchanged — ONLY the pump image tilts on hover.
 */

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, type MouseEvent } from "react";
import { PUMP_CATALOG, type PumpModel } from "@/lib/pump-data";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

// ── Static image imports ──────────────────────────────────────────────────
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

const PUMP_IMAGES: Record<string, StaticImageData> = {
  "cdl-cdlf": cdlCdlf,
  "cdlf-cdh": cdlfCdh,
  "cdlk-cdlkf": cdlkCdlkf,
  chl, chlf, chm, wq, stp,
  "qy-b": qyB,
  hydro, bt, sz, zs, ld, niso, mini,
};

const FEATURED_PUMPS = PUMP_CATALOG.slice(0, 8) as readonly PumpModel[];

// ── Image-only 3D tilt hook — unchanged ──────────────────────────────────

interface ImageTilt {
  rotateX: number;
  rotateY: number;
  isActive: boolean;
}

function useImageTilt() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<ImageTilt>({ rotateX: 0, rotateY: 0, isActive: false });

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ rotateX: -normY * 14, rotateY: normX * 14, isActive: true });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, isActive: false });
    if (imageRef.current) imageRef.current.style.willChange = "auto";
  }, []);

  const onMouseEnter = useCallback(() => {
    if (imageRef.current) imageRef.current.style.willChange = "transform";
  }, []);

  return { imageRef, tilt, handlers: { onMouseMove, onMouseEnter, onMouseLeave } };
}

// ── Category accent — unchanged ───────────────────────────────────────────

function getCategoryAccent(category: PumpModel["category"]): "green" | "blue" {
  return category === "Sewage & Submersible" || category === "Hydro & Booster"
    ? "green"
    : "blue";
}

// ── PumpCard — design updated, 3D behaviour unchanged ────────────────────

function PumpCard({ pump }: { pump: PumpModel }) {
  const { imageRef, tilt, handlers } = useImageTilt();
  const accent = getCategoryAccent(pump.category);
  const image = PUMP_IMAGES[pump.id];
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <article
      id={`pump-card-${pump.id}`}
      className={[
        "flex flex-col rounded-2xl bg-white overflow-hidden",
        "border transition-all duration-200",
        cardHovered
          ? "border-primary-green [box-shadow:var(--shadow-card-hover)] -translate-y-1"
          : "border-border [box-shadow:var(--shadow-card)]",
      ].join(" ")}
      style={{ transition: "border-color 200ms, box-shadow 200ms, transform 200ms" }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <SectionTag accent={accent} className="text-[10px]">
          {pump.category}
        </SectionTag>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-sm tracking-wide"
          style={{
            color: accent === "green" ? "#2fa84f" : "#1e5bb8",
            backgroundColor: accent === "green" ? "#6cc24a12" : "#1e5bb810",
          }}
        >
          {pump.seriesCode}
        </span>
      </div>

      {/* Image well — perspective container, 3D tilt isolated here */}
      <div
        ref={imageRef}
        className="relative mx-4 rounded-xl overflow-hidden bg-section-bg cursor-pointer"
        style={{ perspective: "600px" }}
        {...handlers}
      >
        <div className="relative w-full" style={{ paddingBottom: "85%" }}>
          {image ? (
            <Image
              src={image}
              alt={`${pump.fullName} — ${pump.category} by Berlington`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain p-4"
              style={{
                transform: tilt.isActive
                  ? `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(20px) scale(1.06)`
                  : "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
                transition: tilt.isActive
                  ? "transform 80ms linear"
                  : "transform 380ms cubic-bezier(0.25,0,0,1)",
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-border">{pump.seriesCode}</span>
            </div>
          )}

          {tilt.isActive && (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #6cc24a 50%, transparent)",
                opacity: 0.7,
              }}
            />
          )}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(15,61,145,0.06)" }}
        />
      </div>

      {/* Card body — flat, no 3D */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <h3 className="text-sm font-bold text-text-dark leading-snug">
          {pump.fullName}
        </h3>
        <p className="text-xs text-text-light mt-0.5 mb-3">{pump.category}</p>

        <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 mt-auto">
          {[
            { label: "Flow", value: pump.flowRate },
            { label: "Head", value: pump.maxHead },
            { label: "Voltage", value: pump.voltage },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider text-text-light font-medium">
                {label}
              </span>
              <span
                className="text-[11px] font-semibold text-primary-blue leading-snug break-all"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={`/contact?product=${encodeURIComponent(pump.fullName)}`}
          id={`pump-card-cta-${pump.id}`}
          className={[
            "mt-4 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-all duration-150",
            "bg-primary-green/10 text-dark-green",
            "hover:bg-primary-green hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-1",
          ].join(" ")}
        >
          Enquire Now
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────

export default function FeaturedPumpsGrid() {
  return (
    <section
      id="featured-pumps"
      aria-labelledby="featured-pumps-heading"
      className="relative"
    >
      {/*
       * BRIDGE ZONE — deep-blue continuation of StatsBar.
       * This "cap" keeps the deep-blue colour flowing down from StatsBar
       * before transitioning to the light section-bg for the cards.
       * Height is generous so the heading reads cleanly against dark.
       */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0f3d91" }}
      >
        {/* Same engineering grid texture used in StatsBar */}
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

        {/* Green accent — mirrors StatsBar's bottom line but flipped to top */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #6cc24a 30%, #6cc24a 70%, transparent)",
            opacity: 0.35,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-8 pt-16 pb-24">
          {/* Section label — border-left style matching HeroSection eyebrow */}
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
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Featured Products
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

        {/*
         * Scalloped bottom edge — this is what makes the transition feel
         * intentional instead of abrupt. The white/section-bg grid floats
         * up into the deep-blue zone with a soft rounded cut.
         */}
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

      {/* ── Cards zone — bg-section-bg, pulled up under the scallop ── */}
      <div className="bg-section-bg pb-24">
        <div className="mx-auto max-w-7xl px-8">
          {/* -mt-8 pulls the grid into the scallop for a layered feel */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mt-8">
            {FEATURED_PUMPS.map((pump, i) => (
              <PrecisionReveal
                key={pump.id}
                variant="riseUp"
                delay={(i % 4) * 0.07}
              >
                <PumpCard pump={pump} />
              </PrecisionReveal>
            ))}
          </div>

          {/* ── See Full Catalogue CTA ── */}
          <PrecisionReveal variant="riseUp" delay={0.2} className="mt-16 flex flex-col items-center gap-3">
            <p className="text-sm text-text-light">
              Showing 8 of {PUMP_CATALOG.length} series
            </p>
            <Link
              href="/products"
              id="featured-pumps-catalogue-cta"
              className={[
                "inline-flex items-center gap-3 rounded-xl px-12 py-5",
                "bg-primary-green text-white text-base font-bold tracking-wide",
                "hover:bg-dark-green transition-colors duration-150",
                "[box-shadow:var(--shadow-green)]",
                "hover:[box-shadow:0_8px_40px_0_rgba(108,194,74,0.45)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2",
              ].join(" ")}
            >
              See Full Catalogue
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </PrecisionReveal>
        </div>
      </div>
    </section>
  );
}