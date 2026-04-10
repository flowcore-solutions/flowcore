"use client";

/**
 * EngineeringStandards — Displays ISO certs and material specs
 * in a structured blueprint-spec-sheet style.
 * 
 * Uses bg-section-bg + diagonal grid to maintain cohesion with
 * the hero and applications page.
 */

import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";

// ── Inline SVG icons ──────────────────────────────────────────────────────

function ISOIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="24" height="24" rx="3" stroke="#1e5bb8" strokeWidth="1.5" />
      <path d="M7 14l4 4 10-10" stroke="#6cc24a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MaterialIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" stroke="#1e5bb8" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="6" stroke="#4da3ff" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="14" cy="14" r="2" fill="#6cc24a" />
    </svg>
  );
}

function TestingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M8 4h12v8l4 12H4L8 12V4z" stroke="#1e5bb8" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12h12" stroke="#4da3ff" strokeWidth="1" />
      <circle cx="14" cy="20" r="2" fill="#6cc24a" />
    </svg>
  );
}

function MEPIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="24" height="14" rx="2" stroke="#1e5bb8" strokeWidth="1.5" />
      <path d="M7 14h2l2-4 3 8 2-4h5" stroke="#6cc24a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Standards data ────────────────────────────────────────────────────────

const STANDARDS = [
  {
    id: "iso",
    icon: <ISOIcon />,
    code: "ISO-9001",
    title: "ISO-Certified Manufacturing",
    description:
      "Every Berlington pump undergoes ISO-grade quality control from raw material sourcing through final assembly — with full traceability on critical components.",
    details: ["Full production traceability", "Multi-stage QC checkpoints", "Factory acceptance testing"],
    accent: "blue" as const,
  },
  {
    id: "material",
    icon: <MaterialIcon />,
    code: "AISI 304 / 316",
    title: "Stainless Steel Construction",
    description:
      "Wet-end components in AISI 304 (standard duty) or AISI 316 (aggressive media / chemical contact) — delivering corrosion resistance essential for WTP and industrial service.",
    details: ["Corrosion-resistant wet ends", "316 for chemical/saline service", "Precision casting tolerances"],
    accent: "blue" as const,
  },
  {
    id: "testing",
    icon: <TestingIcon />,
    code: "100% TESTED",
    title: "Hydrostatic & Performance Testing",
    description:
      "Every unit is hydrostatically pressure-tested and performance-verified against published H-Q curves before dispatch — zero units leave factory without a signed test certificate.",
    details: ["Hydrostatic pressure test", "H-Q curve verification", "Signed test certificate"],
    accent: "green" as const,
  },
  {
    id: "mep",
    icon: <MEPIcon />,
    code: "MEP SPEC",
    title: "Precision MEP Specification Support",
    description:
      "FlowCore's engineering team provides pump selection, sizing calculations, and full MEP specification documentation — from preliminary design through tender submission.",
    details: ["Pump selection & sizing", "Tender documentation", "System curve matching"],
    accent: "green" as const,
  },
] as const;

// ── Standard card component ───────────────────────────────────────────────

function StandardCard({
  std,
  index,
}: {
  std: (typeof STANDARDS)[number];
  index: number;
}) {
  const isBlue = std.accent === "blue";
  const codeColor = isBlue ? "#1e5bb8" : "#2fa84f";
  const codeBg = isBlue ? "#1e5bb810" : "#6cc24a10";

  return (
    <PrecisionReveal variant="riseUp" delay={index * 0.07}>
      <article
        id={`standard-${std.id}`}
        className="rounded-xl border border-border bg-white p-7 h-full flex flex-col [box-shadow:var(--shadow-card)] transition-all duration-300 hover:border-primary-blue hover:[box-shadow:var(--shadow-card-hover)]"
      >
        <div className="flex items-start justify-between mb-5">
          {std.icon}
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-widest"
            style={{ color: codeColor, backgroundColor: codeBg }}
          >
            {std.code}
          </span>
        </div>

        <h3 className="font-bold text-text-dark mb-3 text-base leading-snug">
          {std.title}
        </h3>

        <p className="text-sm leading-relaxed text-text-light mb-5 flex-1">
          {std.description}
        </p>

        <ul className="space-y-1.5" role="list">
          {std.details.map((d) => (
            <li key={d} className="flex items-center gap-2 text-xs text-text-light">
              <span
                className="h-1 w-1 rounded-full shrink-0"
                style={{ backgroundColor: codeColor }}
              />
              {d}
            </li>
          ))}
        </ul>
      </article>
    </PrecisionReveal>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function EngineeringStandards() {
  return (
    <section
      id="about-standards"
      aria-labelledby="standards-heading"
      className="relative bg-section-bg py-12 lg:py-20 overflow-hidden"
    >
      {/* Blueprint grid */}
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
          <SectionTag>Engineering Standards</SectionTag>
        </PrecisionReveal>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h2
              id="standards-heading"
              className="font-black text-deep-blue leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Engineering Durability.
              <br />
              <span className="text-primary-blue">Proven at Every Step.</span>
            </h2>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideRight" delay={0.14}>
            <p className="max-w-sm text-sm leading-relaxed text-text-light font-medium">
              From ISO-certified manufacturing through on-site installation
              support — every FlowCore commitment is backed by verifiable
              engineering standards.
            </p>
          </PrecisionReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STANDARDS.map((std, i) => (
            <StandardCard key={std.id} std={std} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
