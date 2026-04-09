"use client";

import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";

const PAGE_HEADER = {
  tag: "Applications",
  heading: "Pumps Built\nfor Real Systems",
  sub: "Hover the diagram nodes to discover the exact Berlington pump series engineered for each stage — from raw water intake to high-rise pressure supply.",
} as const;

export default function ApplicationsHeader() {
  return (
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
  );
}
