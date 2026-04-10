"use client";

/**
 * VerticalExpertise — Five-vertical matrix displayed as a spec-sheet grid.
 *
 * Each card is styled like a technical schematic node — numbered, tagged,
 * and annotated. The pump icon dominates with a 65% visual weight bias,
 * aligning with the company's pump-first mandate.
 */

import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";

// ── Inline SVG icons ──────────────────────────────────────────────────────

function WTPIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="30" height="30" rx="4" stroke="#1e5bb8" strokeWidth="1.5" />
      <path d="M10 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#4da3ff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="13" r="3" stroke="#6cc24a" strokeWidth="1.5" />
      <path d="M18 16v5" stroke="#6cc24a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HVACIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="30" height="30" rx="4" stroke="#1e5bb8" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="7" stroke="#4da3ff" strokeWidth="1.5" />
      <path d="M18 11v4M18 21v4M11 18h4M21 18h4" stroke="#6cc24a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MunicipalIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="30" height="30" rx="4" stroke="#1e5bb8" strokeWidth="1.5" />
      <path d="M8 28v-8l10-9 10 9v8H8z" stroke="#4da3ff" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="14" y="20" width="8" height="8" rx="1" stroke="#6cc24a" strokeWidth="1.5" />
    </svg>
  );
}

function IndustrialIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="30" height="30" rx="4" stroke="#1e5bb8" strokeWidth="1.5" />
      <path d="M7 28V18l7-6v6l7-6v14H7z" stroke="#4da3ff" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="26" cy="12" r="4" stroke="#6cc24a" strokeWidth="1.5" />
      <path d="M26 9v6M23 12h6" stroke="#6cc24a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="30" height="30" rx="4" stroke="#1e5bb8" strokeWidth="1.5" />
      <path d="M18 28c-5 0-8-3.5-8-8 0-3 2-5.5 4-7 0 3 1.5 4 3 4 0-3 3-6 3-9 3 2 5 5.5 5 10 0 5.5-3.5 10-7 10z" stroke="#4da3ff" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="18" cy="22" r="2" stroke="#6cc24a" strokeWidth="1.5" />
    </svg>
  );
}

// ── Data — Five key verticals ──────────────────────────────────────────────

const VERTICALS = [
  {
    id: "wtp",
    number: "01",
    icon: <WTPIcon />,
    sector: "Water Treatment",
    heading: "Municipal WTP & RO Systems",
    body: "Vertical multistage and horizontal split-case pumps for raw water intake, pressure boosting, and RO membrane feed. Flowchar coagulants and scale inhibitors maintain permeate quality and protect membrane integrity.",
    pumps: ["CDL / CDLF Series", "CHM Horizontal", "Vertical Multistage"],
    chemistry: "RO Scale Inhibitor · Coagulant · Antiscalant",
    accent: "blue" as const,
  },
  {
    id: "hvac",
    number: "02",
    icon: <HVACIcon />,
    sector: "Commercial HVAC",
    heading: "Cooling Towers & HVAC Circuits",
    body: "Close-coupled and inline circulation pumps for chilled water loops, condenser circuits, and cooling tower applications. Biocide and corrosion inhibitor programmes prevent Legionella and protect heat-exchanger surfaces.",
    pumps: ["CHL Inline Series", "CHLF-T Circulation", "CM Close-Coupled"],
    chemistry: "Biocide Programme · Corrosion Inhibitor · Scale Control",
    accent: "blue" as const,
  },
  {
    id: "municipal",
    number: "03",
    icon: <MunicipalIcon />,
    sector: "Municipal Infrastructure",
    heading: "Sewage & Drainage Systems",
    body: "Submersible sewage and drainage pumps with non-clogging impellers for municipal lift stations, stormwater management, and wastewater transfer — engineered for continuous duty in aggressive media.",
    pumps: ["WQ Submersible Sewage", "QY-B Submersible", "WQK Drainage"],
    chemistry: "Odour Control · Bio-Treatment Compounds",
    accent: "green" as const,
  },
  {
    id: "industrial",
    number: "04",
    icon: <IndustrialIcon />,
    sector: "Process Engineering",
    heading: "Heavy Industrial Processing",
    body: "Self-priming, end-suction, and pipeline pumps for chemical dosing, fluid transfer, and process circulation in manufacturing, power generation, and mining — constructed in AISI 316 for corrosive media.",
    pumps: ["ZS Self-Priming", "NF End-Suction", "SZ Pipeline Series"],
    chemistry: "Process Fluid Conditioning · Anti-Scaling",
    accent: "green" as const,
  },
  {
    id: "fire",
    number: "05",
    icon: <FireIcon />,
    sector: "Fire Protection",
    heading: "Fire Fighting Systems",
    body: "High-pressure vertical multistage and horizontal split-case pumps compliant with fire-fighting standards. Precise flow-pressure performance for sprinkler systems, hydrant networks, and suppression rigs.",
    pumps: ["BT Horizontal Split-Case", "CDH Multistage", "Jockey Pumps"],
    chemistry: "Corrosion Inhibitor (System Preservation)",
    accent: "blue" as const,
  },
] as const;

// ── Card component ────────────────────────────────────────────────────────

function VerticalCard({
  v,
  index,
}: {
  v: (typeof VERTICALS)[number];
  index: number;
}) {
  const accentBlue = v.accent === "blue";
  const sectorColor = accentBlue ? "#1e5bb8" : "#2fa84f";
  const sectorBg = accentBlue ? "#1e5bb808" : "#6cc24a08";
  const numberColor = accentBlue ? "#0f3d91" : "#2fa84f";

  return (
    <PrecisionReveal variant="riseUp" delay={index * 0.07}>
      <article
        id={`vertical-${v.id}`}
        className="group relative rounded-xl border border-border bg-white overflow-hidden transition-all duration-300 hover:border-primary-blue hover:[box-shadow:var(--shadow-card-hover)] [box-shadow:var(--shadow-card)] h-full flex flex-col"
      >
        {/* Engineering number — top-right watermark */}
        <div
          className="absolute top-4 right-5 font-black text-5xl leading-none select-none pointer-events-none"
          style={{ color: `${numberColor}08` }}
          aria-hidden="true"
        >
          {v.number}
        </div>

        <div className="p-7 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>{v.icon}</div>
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: sectorColor, backgroundColor: sectorBg }}
            >
              {v.sector}
            </span>
          </div>

          {/* Number badge */}
          <span
            className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 block"
            style={{ color: "#b0bec5" }}
          >
            {v.number}
          </span>

          <h3
            className="font-bold text-text-dark mb-3 leading-snug"
            style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)" }}
          >
            {v.heading}
          </h3>

          <p className="text-sm leading-relaxed text-text-light mb-5 flex-1">
            {v.body}
          </p>

          {/* Spec rows — blueprint annotation style */}
          <div className="space-y-2 border-t border-border/60 pt-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-blue block mb-1">
                Pump Solutions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {v.pumps.map((pump) => (
                  <span
                    key={pump}
                    className="text-[10px] font-medium rounded px-2 py-0.5"
                    style={{
                      backgroundColor: "#1e5bb810",
                      color: "#1e5bb8",
                    }}
                  >
                    {pump}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-green block mb-1">
                Chemical Programme
              </span>
              <span className="text-[10px] text-text-light font-medium">
                {v.chemistry}
              </span>
            </div>
          </div>
        </div>
      </article>
    </PrecisionReveal>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function VerticalExpertise() {
  return (
    <section
      id="about-verticals"
      aria-labelledby="verticals-heading"
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

        <PrecisionReveal variant="fadeSlideLeft" className="mb-3">
          <SectionTag>Specialised Vertical Expertise</SectionTag>
        </PrecisionReveal>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h2
              id="verticals-heading"
              className="font-black text-deep-blue leading-[1.05] tracking-tight max-w-xl"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Five Industries.
              <br />
              <span className="text-primary-green">One Engineering Partner.</span>
            </h2>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideRight" delay={0.14}>
            <p className="max-w-sm text-sm leading-relaxed text-text-light font-medium">
              Deep application expertise across municipal, commercial, and
              heavy industrial fluid systems — with pump-hardware at the core
              of every solution.
            </p>
          </PrecisionReveal>
        </div>

        {/* 5-card grid: 3 on large, then 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERTICALS.slice(0, 3).map((v, i) => (
            <VerticalCard key={v.id} v={v} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {VERTICALS.slice(3).map((v, i) => (
            <VerticalCard key={v.id} v={v} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
