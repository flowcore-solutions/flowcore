
/**
 * SynergyBridge — The strategic partnership architecture diagram.
 *
 * Visual centrepiece: shows how FlowCore acts as the engineering
 * bridge between Berlington (pumps / hardware) and Flowchar (chemistry).
 * The connector SVG in the middle rotates on hover, echoing PartnerSynergy.
 */

import Image from "next/image";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";
import berlingtonLogo from "@/app/assets/logos/berlington-logo.png";
import flowcharLogo from "@/app/assets/logos/flowchar-logo.png";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo-horizontal.png";

// ── Data ──────────────────────────────────────────────────────────────────

const BERLINGTON_CAPABILITIES = [
  "16+ Pump Series (Vertical, Horizontal, Submersible)",
  "AISI 304 / 316 Stainless Steel Construction",
  "ISO-Certified Manufacturing & Hydrostatic Testing",
  "Full Flow & Head Range — WTP to High-Rise",
  "Precision MEP Specification Support",
];

const FLOWCHAR_CAPABILITIES = [
  "Scale & Corrosion Inhibitors (RO / Cooling Tower)",
  "Coagulants & Flocculants for WTP Pre-treatment",
  "Bio-fouling Prevention — Biocide Programmes",
  "Chemical Synergy Audits — Extended Equipment Life",
  "ISO-Certified Treatment Formulations",
];

// ── Capability list component ─────────────────────────────────────────────

function CapabilitiesList({
  items,
  accent,
}: {
  items: readonly string[];
  accent: "blue" | "green";
}) {
  const dotColor = accent === "blue" ? "#4da3ff" : "#6cc24a";
  const itemTextClass = accent === "blue" ? "text-white/82" : "text-text-light";
  return (
    <ul className="space-y-3" role="list">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 text-sm leading-snug ${itemTextClass}`}
        >
          <span
            className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor:
                accent === "blue" ? "rgba(77, 163, 255, 0.22)" : `${dotColor}18`,
              boxShadow:
                accent === "blue" ? "0 0 0 1px rgba(77, 163, 255, 0.14)" : "none",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path
                d="M1.5 4l2 2 3-3"
                stroke={dotColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function SynergyBridge() {
  return (
    <section
      id="about-synergy"
      aria-labelledby="synergy-heading"
      className="relative bg-section-bg py-12 lg:py-20 overflow-hidden"
    >
      {/* Background grid — same as hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Section header */}
        <PrecisionReveal variant="fadeSlideLeft" className="mb-3">
          <SectionTag>Strategic Partnership Architecture</SectionTag>
        </PrecisionReveal>

        <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
          <h2
            id="synergy-heading"
            className="mb-4 font-black text-deep-blue leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            One Engineering Mandate,
            <br />
            <span className="text-primary-blue">Two Specialist Partners</span>
          </h2>
        </PrecisionReveal>

        <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
          <p className="mb-14 max-w-xl text-base leading-relaxed text-text-light font-medium">
            FlowCore Solutions is not a reseller — it is an engineering
            integrator. By synchronising Berlington&apos;s hardware precision
            with Flowchar&apos;s chemical intelligence, we deliver complete
            fluid infrastructure health.
          </p>
        </PrecisionReveal>

        {/* The three-panel bridge layout */}
        <PrecisionReveal variant="riseUp" delay={0.21}>
          <div className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl shadow-[0_14px_34px_-24px_rgba(15,61,145,0.12)] lg:flex-row lg:shadow-[0_20px_80px_-15px_rgba(15,61,145,0.18)]">

            {/* ── Panel 1: Berlington (Deep Blue) ── */}
            <div
              className="relative flex-1 p-8 lg:p-10 flex flex-col"
              style={{ backgroundColor: "#0F3D91" }}
            >
              {/* Tech grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-7 h-7 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold text-[10px]">
                    01
                  </span>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-light-blue">
                    Industrial Pump Partner
                  </span>
                </div>

                <div className="relative h-12 w-52 mb-6 brightness-0 invert">
                  <Image
                    src={berlingtonLogo}
                    alt="Berlington Industrial Pumps"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">
                  Precision Hardware
                </h3>
                <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/78">
                  ISO-certified vertical multistage, horizontal split-case,
                  submersible, and self-priming pump systems engineered for
                  continuous industrial duty.
                </p>

                <CapabilitiesList items={BERLINGTON_CAPABILITIES} accent="blue" />

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-8 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-3xl font-black text-white">16+</div>
                    <div className="text-[10px] uppercase tracking-widest text-light-blue font-bold mt-1">
                      Pump Series
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">ISO</div>
                    <div className="text-[10px] uppercase tracking-widest text-light-blue font-bold mt-1">
                      Grade Certified
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel 2: FlowCore Bridge (White centre) ── */}
            <div className="relative z-10 flex shrink-0 flex-col items-center justify-center bg-white px-6 py-10 lg:w-48 lg:py-0 lg:shadow-[0_0_40px_rgba(15,61,145,0.12)]">
              <div className="relative mb-6 h-16 w-36 lg:w-28 xl:w-36">
                <Image
                  src={flowcoreLogo}
                  alt="FlowCore Solutions"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Rotating connector icon */}
              <div className="relative w-16 h-16 bg-section-bg rounded-full flex items-center justify-center border border-border group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
                <div className="absolute inset-2 rounded-full border-[2.5px] border-deep-blue border-r-primary-green border-b-primary-green" />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F3D91"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-45"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>

              <p className="mt-5 text-center text-[10px] font-black uppercase leading-relaxed tracking-[0.2em] text-deep-blue/75">
                The Engineering
                <br />
                Bridge
              </p>

              {/* Connector arrows — desktop only */}
              <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-10 border-r-border" />
              </div>
              <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-10 border-l-border" />
              </div>
            </div>

            {/* ── Panel 3: Flowchar (White / Green accent) ── */}
            <div className="relative flex-1 p-8 lg:p-10 flex flex-col bg-white">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-7 h-7 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-[10px]">
                    02
                  </span>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-green">
                    Water Treatment Chemical Partner
                  </span>
                </div>

                <div className="relative h-12 w-36 mb-6">
                  <Image
                    src={flowcharLogo}
                    alt="Flowchar Water Treatment"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <h3 className="text-xl font-black text-deep-blue mb-3 uppercase tracking-tight">
                  Chemical Intelligence
                </h3>
                <p className="text-text-light text-sm leading-relaxed mb-8 max-w-xs">
                  ISO-certified water treatment programmes engineered to
                  eliminate scale, prevent corrosion, and extend the operational
                  life of every installed pump system.
                </p>

                <CapabilitiesList items={FLOWCHAR_CAPABILITIES} accent="green" />

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-8 border-t border-border pt-6">
                  <div>
                    <div className="text-3xl font-black text-primary-green">Zero</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-light font-bold mt-1">
                      Scale Buildup
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary-green">+40%</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-light font-bold mt-1">
                      Life Extension
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrecisionReveal>
      </div>
    </section>
  );
}
