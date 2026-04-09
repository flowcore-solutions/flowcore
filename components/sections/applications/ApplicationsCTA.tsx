"use client";

import PrecisionReveal from "@/components/ui/PrecisionReveal";
import GreenCTAButton from "@/components/ui/GreenCTAButton";
import Link from "next/link";

export default function ApplicationsCTA() {
  return (
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
  );
}
