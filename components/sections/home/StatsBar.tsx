"use client";

/**
 * StatsBar — Industrial Data Plate.
 *
 * Design language: a deep-blue "data plate" mounted between Hero and the pump grid.
 * Each stat cell mimics an industrial specification panel:
 *  - Thin Primary Green top-border (status/active signal)
 *  - White value in Poppins bold (maximum legibility)
 *  - Light Blue label (secondary identifier)
 *  - Gray sublabel (fine-print spec)
 *
 * Animation: cells fade + rise on scroll entry via IntersectionObserver.
 * Server-side safe: all animation is CSS class-toggled, not Framer Motion,
 * so there's no hydration mismatch.
 */

import { useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────

type Stat = {
  value: string;
  label: string;
  sublabel: string;
  /** Optional decoration: an inline SVG icon identifier */
  icon: "series" | "network" | "grade" | "applications";
};

const STATS: readonly Stat[] = [
  {
    value: "16+",
    label: "Pump Series",
    sublabel: "Vertical · Horizontal · Submersible",
    icon: "series",
  },
  {
    value: "Pan-India",
    label: "Distribution Network",
    sublabel: "Direct supply to project sites",
    icon: "network",
  },
  {
    value: "ISO-Grade",
    label: "Manufacturing Standard",
    sublabel: "Berlington quality certified",
    icon: "grade",
  },
  {
    value: "WTP · HVAC",
    label: "Core Applications",
    sublabel: "Industrial · Municipal · Commercial",
    icon: "applications",
  },
] as const;

// ── Minimal inline SVG icons — no icon library ────────────────────────────

function StatIcon({ icon }: { icon: Stat["icon"] }) {
  const paths: Record<Stat["icon"], React.ReactNode> = {
    series: (
      <path
        d="M3 17V7a2 2 0 012-2h10a2 2 0 012 2v10M7 17v-4h10v4M12 8v3"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
    network: (
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    ),
    grade: (
      <>
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    applications: (
      <path
        d="M4 6h16M4 10h16M4 14h8m0 4H4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    ),
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="opacity-60"
    >
      {paths[icon]}
    </svg>
  );
}

// ── Stat Cell ─────────────────────────────────────────────────────────────

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay per column
          setTimeout(() => setVisible(true), index * 90);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={[
        // Layout
        "relative flex flex-col gap-2 px-8 py-10",
        // Reveal transition
        "transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      {/* Green top accent line — the "active" indicator */}
      <div
        className={[
          "absolute top-0 left-8 right-8 h-[2px] rounded-full bg-primary-green",
          "transition-all duration-700",
          visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
        ].join(" ")}
        style={{ transformOrigin: "left", transitionDelay: `${index * 90 + 200}ms` }}
        aria-hidden="true"
      />

      {/* Icon + label row */}
      <div className="flex items-center gap-2 text-primary-green">
        <StatIcon icon={stat.icon} />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
          {stat.label}
        </span>
      </div>

      {/* Primary value — Poppins bold, white, display scale */}
      <dt
        className="font-bold text-white leading-none"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
      >
        {stat.value}
      </dt>

      {/* Sublabel — fine-print spec text */}
      <dd className="text-xs text-white/40 leading-snug font-medium">
        {stat.sublabel}
      </dd>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────

export default function StatsBar() {
  return (
    <section
      id="stats"
      aria-label="FlowCore — Engineering Standards"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0f3d91" }}
    >
      {/* Engineering grid texture — same as hero left panel */}
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

      {/* Subtle gradient fade at left & right edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,61,145,0.6) 0%, transparent 15%, transparent 85%, rgba(15,61,145,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </dl>
      </div>

      {/* Bottom edge: thin green line matching the section tag accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #6cc24a 30%, #6cc24a 70%, transparent)",
          opacity: 0.4,
        }}
      />
    </section>
  );
}
