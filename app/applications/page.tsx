/**
 * Applications Page (/applications)
 *
 * Three full-section industrial environments — each with an interactive
 * SVG schematic showing how specific Berlington pump models fit into
 * real infrastructure circuits.
 *
 * Layout alternates: text-left/diagram-right → diagram-left/text-right
 * to prevent monotony while keeping visual weight balanced.
 */

import type { Metadata } from "next";
import { APPLICATION_ENVIRONMENTS } from "@/lib/application-data";
import ApplicationDiagram from "@/components/sections/applications/ApplicationDiagram";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import GreenCTAButton from "@/components/ui/GreenCTAButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Applications — Industrial Pump System Solutions",
  description:
    "See how Berlington pump systems are engineered into Water Treatment Plants, HVAC systems, and industrial processing circuits. Interactive technical diagrams with pump specifications.",
};

// ── Page header constants ─────────────────────────────────────────────────

const PAGE_HEADER = {
  tag: "Applications",
  heading: "Pumps Built\nfor Real Systems",
  sub: "Hover the diagram nodes to discover the exact Berlington pump series engineered for each stage — from raw water intake to high-rise pressure supply.",
} as const;

// ── Page ──────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  return (
    <div className="bg-white">
      {/* ── Page Header ── */}
      <header className="bg-section-bg border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <PrecisionReveal variant="fadeSlideLeft">
            <SectionTag>In Action</SectionTag>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h1
              className="mt-4 font-bold text-deep-blue whitespace-pre-line leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              {PAGE_HEADER.heading}
            </h1>
          </PrecisionReveal>

          <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-light">
              {PAGE_HEADER.sub}
            </p>
          </PrecisionReveal>

          {/* How-to hint */}
          <PrecisionReveal variant="riseUp" delay={0.21}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white border border-border px-4 py-2.5">
              {/* Cursor icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 2l8 6-4 1-2 4-2-11z"
                  fill="#6cc24a"
                  fillOpacity="0.85"
                />
              </svg>
              <span className="text-xs font-medium text-text-light">
                Hover over diagram nodes to reveal pump specifications
              </span>
            </div>
          </PrecisionReveal>
        </div>
      </header>

      {/* ── Environment Sections ── */}
      <main id="main-environments">
        {APPLICATION_ENVIRONMENTS.map((env, i) => (
          <section
            key={env.id}
            id={`env-${env.id}`}
            aria-labelledby={`env-heading-${env.id}`}
            className={i % 2 === 0 ? "bg-white" : "bg-section-bg"}
          >
            <div className="mx-auto max-w-6xl px-6 py-20">
              {/* Hidden heading for screen readers / SEO */}
              <h2 id={`env-heading-${env.id}`} className="sr-only">
                {env.name}
              </h2>

              <PrecisionReveal
                variant={i % 2 === 0 ? "fadeSlideLeft" : "fadeSlideRight"}
              >
                <ApplicationDiagram env={env} reversed={i % 2 !== 0} />
              </PrecisionReveal>
            </div>

            {/* Section divider */}
            {i < APPLICATION_ENVIRONMENTS.length - 1 && (
              <div className="mx-auto max-w-6xl px-6">
                <div className="border-t border-border" />
              </div>
            )}
          </section>
        ))}
      </main>

      {/* ── Bottom CTA ── */}
      <section
        id="applications-cta"
        aria-label="Get an engineering consultation"
        className="bg-deep-blue py-20"
      >
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center text-center gap-6">
          <PrecisionReveal variant="riseUp">
            <span className="inline-flex items-center pl-3 border-l-2 border-primary-green text-xs font-semibold uppercase tracking-widest text-primary-green">
              Ready to Specify?
            </span>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.07}>
            <h2
              className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Match the Right Pump to
              <br />
              Your Application
            </h2>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.14}>
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              Our engineering team will help you select the correct series,
              flow rate, and head specification for your exact system requirements.
            </p>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.21}>
            <Link href="/contact" id="applications-cta-link">
              <GreenCTAButton size="lg">Request Engineering Consultation</GreenCTAButton>
            </Link>
          </PrecisionReveal>
        </div>
      </section>
    </div>
  );
}
