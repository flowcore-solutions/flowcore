"use client";

/**
 * TotalSystemHealth — Life-cycle support mandate section.
 *
 * The "after-sale" narrative — pump-first (65%+ visual weight),
 * showing the 4 pillars of ongoing system health.
 * 
 * Layout: Left = dark blue hero block (pump focus) / Right = 4 pillars grid
 */

import Image from "next/image";
import Link from "next/link";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import GreenCTAButton from "@/components/ui/GreenCTAButton";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";

// ── Inline SVG icons ──────────────────────────────────────────────────────

function MonitorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#4da3ff" strokeWidth="1.5"/>
      <path d="M8 21h8M12 17v4" stroke="#4da3ff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 10l3-3 3 3 3-3 3 3" stroke="#6cc24a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChemIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3v8l-5 9h16l-5-9V3" stroke="#4da3ff" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 3h6" stroke="#4da3ff" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="2" fill="#6cc24a" opacity="0.8"/>
    </svg>
  );
}

function RepairIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a6 6 0 0 1-7.5 7.5l-5.7 5.7a2 2 0 0 1-2.8-2.8l5.7-5.7a6 6 0 0 1 7.5-7.5z" stroke="#4da3ff" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="7" cy="17" r="1" fill="#6cc24a"/>
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#4da3ff" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="#6cc24a" strokeWidth="1.5"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#4da3ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

// ── Pillars data ──────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: "monitoring",
    icon: <MonitorIcon />,
    number: "01",
    heading: "System Health Monitoring",
    body: "Proactive performance tracking of installed pump systems — vibration, flow deviation, pressure variance — before failure occurs.",
  },
  {
    id: "chemistry",
    icon: <ChemIcon />,
    number: "02",
    heading: "Chemical Synergy Audits",
    body: "Scheduled Flowchar treatment audits prevent scale accumulation, corrosion, and bio-fouling — extending pump and heat-exchanger life significantly.",
  },
  {
    id: "repair",
    icon: <RepairIcon />,
    number: "03",
    heading: "Rapid Repair & Overhaul",
    body: "On-site technical support and fast-turnaround repair services eliminate unplanned downtime. Genuine Berlington spare parts stocked for immediate dispatch.",
  },
  {
    id: "support",
    icon: <SupportIcon />,
    number: "04",
    heading: "On-Site Technical Support",
    body: "FlowCore engineers are available for installation commissioning, performance validation, and long-term operational consultation across all project verticals.",
  },
] as const;

// ── Main Component ────────────────────────────────────────────────────────

export default function TotalSystemHealth() {
  return (
    <section
      id="about-system-health"
      aria-labelledby="system-health-heading"
      className="relative bg-section-bg py-12 lg:py-20 overflow-hidden"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14">
          <PrecisionReveal variant="fadeSlideLeft" className="mb-3">
            <span className="inline-flex items-center pl-3 border-l-2 border-primary-green text-[10px] font-black uppercase tracking-[0.2em] text-primary-green">
              Life-Cycle Support Mandate
            </span>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h2
              id="system-health-heading"
              className="font-black text-deep-blue leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Our Partnership Doesn&apos;t End
              <br />
              <span className="text-primary-green">at Delivery.</span>
            </h2>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
            <p className="max-w-2xl text-base leading-relaxed text-text-light font-medium">
              FlowCore maintains a{" "}
              <strong className="text-text-dark font-bold">
                &quot;Total System Health&quot;
              </strong>{" "}
              mandate. Every installed Berlington system is backed by ongoing maintenance,
              chemical programme audits, and rapid-response repair services — ensuring
              maximum uptime and infrastructure longevity.
            </p>
          </PrecisionReveal>
        </div>

        {/* Two-column layout: Hero visual | Pillars grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── Left: pump visual hero block ── */}
          <PrecisionReveal variant="fadeSlideLeft" delay={0.2}>
            <div
              className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col justify-end group/hero"
              style={{ backgroundColor: "#0F3D91" }}
            >
              {/* Tech grid */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Pump silhouette */}
              <div className="absolute inset-0">
                <Image
                  src={berlingtonPumpsSet}
                  alt="Berlington industrial pump systems"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover/hero:scale-105"
                  style={{ opacity: 0.22, mixBlendMode: "luminosity" }}
                />
              </div>

              {/* Pump-focus label */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#4da3ff" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-light-blue animate-pulse" />
                  Pump Systems — Core Focus
                </span>
              </div>

              {/* Percentage indicator — FIXED: Now using PrecisionReveal properly */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                <PrecisionReveal variant="precisionScale" delay={0.4}>
                  <div
                    className="font-black text-white text-center"
                    style={{ fontSize: "clamp(3.5rem, 8vw, 5.2rem)", lineHeight: 1 }}
                  >
                    65%
                  </div>
                </PrecisionReveal>
                <PrecisionReveal variant="riseUp" delay={0.5}>
                  <div className="text-[11px] font-black uppercase tracking-[0.25em] text-light-blue text-center">
                    Solution Focus on
                    <br />
                    Pump Infrastructure
                  </div>
                </PrecisionReveal>
              </div>

              {/* Bottom content */}
              <div className="relative z-10 p-8 pt-0">
                <div className="border-t border-white/10 pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-2xl font-black text-white">24/7</div>
                      <div className="text-[10px] uppercase tracking-widest text-light-blue font-bold mt-1">
                        Duty Capability
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-primary-green">Zero</div>
                      <div className="text-[10px] uppercase tracking-widest text-light-blue font-bold mt-1">
                        Planned Downtime
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PrecisionReveal>

          {/* ── Right: 4 pillars ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map((pillar, i) => (
              <PrecisionReveal key={pillar.id} variant="riseUp" delay={0.25 + i * 0.06}>
                <article
                  id={`pillar-${pillar.id}`}
                  className="rounded-xl border border-border p-6 bg-white [box-shadow:var(--shadow-card)] transition-all duration-300 hover:border-primary-blue hover:[box-shadow:var(--shadow-card-hover)] h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    {pillar.icon}
                    <span
                      className="text-[10px] font-black uppercase tracking-widest"
                      style={{ color: "#b0bec5" }}
                    >
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-text-dark text-sm mb-2 leading-snug">
                    {pillar.heading}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-light flex-1">
                    {pillar.body}
                  </p>
                </article>
              </PrecisionReveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA inline */}
        <PrecisionReveal variant="riseUp" delay={0.5}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-border bg-white p-8 [box-shadow:var(--shadow-card)]">
            <div>
              <p className="font-bold text-deep-blue text-base mb-1">
                Establish a Total System Health Partnership
              </p>
              <p className="text-xs text-text-light font-medium">
                Assess current infrastructure lifecycle metrics and establish a tailored maintenance mandate.
              </p>
            </div>
            <Link href="/contact#inquiry-form" id="system-health-cta-link" className="shrink-0 w-full sm:w-auto">
              <GreenCTAButton size="md" className="w-full">Get Engineering Consultation</GreenCTAButton>
            </Link>
          </div>
        </PrecisionReveal>
      </div>
    </section>
  );
}
