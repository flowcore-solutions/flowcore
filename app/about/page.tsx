/**
 * About Us Page (/about)
 *
 * Structure:
 *  1. SplitScreen — "The Engineering" (Berlington) vs "The Solution" (FlowCore)
 *  2. ExpertiseTimeline — Industrial vertical-line partnership story
 *  3. ValuesGrid — Quality, Durability, Engineering — three-column card grid
 *
 * This is a Server Component. ExpertiseTimeline is "use client" for animations.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ExpertiseTimeline from "@/components/sections/about/ExpertiseTimeline";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import GreenCTAButton from "@/components/ui/GreenCTAButton";

// ── Static image imports ──────────────────────────────────────────────────
import berlingtonLogo from "@/app/assets/logos/berlington-logo.png";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo.png";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";

export const metadata: Metadata = {
  title: "About FlowCore Solutions — Engineering Partners for Fluid Systems",
  description:
    "FlowCore Solutions is the authorised distributor for Berlington industrial pump systems and Flowchar water treatment chemicals. Discover our engineering heritage, distribution network, and commitment to quality.",
};

// ── Inline SVG Icons (no library) ─────────────────────────────────────────

function QualityIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="3"
        stroke="#1e5bb8"
        strokeWidth="1.5"
      />
      <path
        d="M9 16l5 5 9-9"
        stroke="#6cc24a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DurabilityIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" stroke="#1e5bb8" strokeWidth="1.5" />
      <path
        d="M16 8v8l5 3"
        stroke="#6cc24a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EngineeringIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 28L14 10l4 8 4-4 6 14H4z"
        stroke="#1e5bb8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="7" r="3" stroke="#6cc24a" strokeWidth="1.5" />
    </svg>
  );
}

// ── Values data ───────────────────────────────────────────────────────────

const VALUES = [
  {
    id: "quality",
    icon: <QualityIcon />,
    heading: "Quality",
    body: "ISO-certified materials and multi-stage quality control in every Berlington pump. Each unit is hydrostatically tested before leaving the factory.",
  },
  {
    id: "durability",
    icon: <DurabilityIcon />,
    heading: "Durability",
    body: "Engineered to outlast operational demands. Berlington pumps are designed for 24/7 continuous duty in the harshest industrial environments.",
  },
  {
    id: "engineering",
    icon: <EngineeringIcon />,
    heading: "Engineering",
    body: "Precision-matched to your application. FlowCore's technical team provides selection, sizing, and after-sales support for every installed system.",
  },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ══════════════════════════════════════════════════════════════════
          1. SPLIT-SCREEN OPENING
          Left  → Deep Blue / Berlington / "The Engineering"
          Right → White     / FlowCore   / "The Solution"
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="about-split"
        aria-label="About FlowCore Solutions"
        className="min-h-[90vh] flex flex-col lg:flex-row"
      >
        {/* ── LEFT: Berlington / The Engineering ── */}
        <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-deep-blue px-8 py-20 lg:px-16">
          {/* Background: pump silhouette watermark */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={berlingtonPumpsSet}
              alt=""
              fill
              className="object-cover object-center"
              style={{ opacity: 0.08, mixBlendMode: "luminosity" }}
            />
            {/* Blueprint grid overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-lg">
            <PrecisionReveal variant="fadeSlideLeft">
              <SectionTag accent="blue">
                <span style={{ color: "#4da3ff" }}>The Engineering</span>
              </SectionTag>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
              <div className="mt-8 mb-6">
                <Image
                  src={berlingtonLogo}
                  alt="Berlington Industrial Pumps"
                  width={180}
                  height={60}
                  className="h-14 w-auto object-contain brightness-0 invert"
                />
              </div>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
              <h1
                className="mb-6 font-bold text-white leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Built for
                <br />
                Industrial
                <br />
                Demands
              </h1>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.21}>
              <p className="mb-8 text-sm leading-relaxed text-white/70">
                Berlington Industrial Pumps engineers vertical multistage,
                horizontal, submersible, and self-priming systems to ISO
                standards — purpose-built for water treatment, HVAC, and
                heavy industrial duty cycles.
              </p>
            </PrecisionReveal>

            {/* Berlington spec highlights */}
            <PrecisionReveal variant="fadeSlideLeft" delay={0.28}>
              <dl className="grid grid-cols-2 gap-4">
                {[
                  ["ISO-Grade", "Manufacturing"],
                  ["16+", "Pump Series"],
                  ["Full Range", "Flow & Head"],
                  ["Tested", "Every Unit"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 px-4 py-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <dt className="text-lg font-bold text-white leading-none">
                      {value}
                    </dt>
                    <dd className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </PrecisionReveal>
          </div>
        </div>

        {/* Vertical divider — visible on desktop only */}
        <div
          aria-hidden="true"
          className="hidden lg:block w-px bg-border shrink-0"
        />
        {/* Horizontal rule — visible on mobile */}
        <div
          aria-hidden="true"
          className="lg:hidden h-px w-full bg-border"
        />

        {/* ── RIGHT: FlowCore / The Solution ── */}
        <div className="flex flex-1 flex-col justify-center bg-white px-8 py-20 lg:px-16">
          <div className="max-w-lg">
            <PrecisionReveal variant="fadeSlideRight">
              <SectionTag accent="green">The Solution</SectionTag>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideRight" delay={0.07}>
              <div className="mt-8 mb-6">
                <Image
                  src={flowcoreLogo}
                  alt="FlowCore Solutions"
                  width={160}
                  height={52}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideRight" delay={0.14}>
              <h2
                className="mb-6 font-bold text-deep-blue leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Your
                <br />
                Engineering
                <br />
                Partner
              </h2>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideRight" delay={0.21}>
              <p className="mb-4 text-sm leading-relaxed text-text-light">
                FlowCore Solutions bridges the gap between manufacturer and
                project — providing pan-India distribution of Berlington pump
                systems with direct project-site supply, technical selection
                support, and after-sales service.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-text-light">
                The Flowchar range extends that partnership into water chemistry
                — offering ISO-certified treatment chemicals that protect
                infrastructure and extend the service life of every installed
                pump system.
              </p>
            </PrecisionReveal>

            {/* Capability bullets */}
            <PrecisionReveal variant="fadeSlideRight" delay={0.28}>
              <ul className="mb-10 space-y-3" role="list">
                {[
                  "Authorised Berlington distributor — pan-India",
                  "Engineering selection & sizing support",
                  "Flowchar water treatment chemicals",
                  "After-sales technical service",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-dark">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#6cc24a20" }}
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 4l2 2 3-3"
                          stroke="#6cc24a"
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
            </PrecisionReveal>

            <PrecisionReveal variant="riseUp" delay={0.35}>
              <Link href="/contact" id="about-cta-contact">
                <GreenCTAButton size="md">
                  Partner with FlowCore
                </GreenCTAButton>
              </Link>
            </PrecisionReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. EXPERTISE TIMELINE
          ══════════════════════════════════════════════════════════════════ */}
      <ExpertiseTimeline />

      {/* ══════════════════════════════════════════════════════════════════
          3. VALUES GRID — Quality · Durability · Engineering
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="about-values"
        aria-labelledby="values-heading"
        className="bg-section-bg border-t border-border py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <PrecisionReveal variant="fadeSlideLeft" className="mb-3">
            <SectionTag>Our Commitments</SectionTag>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h2
              id="values-heading"
              className="mb-14 font-bold text-deep-blue"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Quality. Durability.
              <br />
              Engineering.
            </h2>
          </PrecisionReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <PrecisionReveal key={v.id} variant="riseUp" delay={i * 0.07}>
                <article
                  id={`value-${v.id}`}
                  className={[
                    "group rounded-xl border border-border bg-white p-8",
                    "transition-all duration-200",
                    "hover:border-primary-green",
                    // Shadow swap: default → green glow on hover — pure CSS, no JS handler
                    "[box-shadow:var(--shadow-card)]",
                    "hover:[box-shadow:var(--shadow-green)]",
                  ].join(" ")}
                >
                  <div className="mb-5">{v.icon}</div>
                  <h3 className="mb-3 text-lg font-bold text-text-dark">
                    {v.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-light">
                    {v.body}
                  </p>
                </article>
              </PrecisionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
