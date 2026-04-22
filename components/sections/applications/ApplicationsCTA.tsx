"use client";

import PrecisionReveal from "@/components/ui/PrecisionReveal";
import GreenCTAButton from "@/components/ui/GreenCTAButton";
import Link from "next/link";

export default function ApplicationsCTA() {
  return (
    <section
      id="applications-cta"
      aria-label="Get an engineering consultation"
      className="relative bg-deep-blue py-20 overflow-hidden"
    >
      {/* Tech grid overlay — Industrial depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/30 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* Background Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20px] left-10 font-black select-none leading-none text-white/5 tracking-tighter text-[120px] lg:text-[200px]"
      >
        FLOWCORE
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col items-center text-center gap-6">
        <PrecisionReveal variant="riseUp" delay={0.07}>
          <h2
            className="font-black text-white leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Match the Right Pump to
            <br />
            <span className="text-primary-green">Your Application</span>
          </h2>
        </PrecisionReveal>

        <PrecisionReveal variant="riseUp" delay={0.14}>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-white/70 font-medium">
            Our engineering team will help you select the correct series,
            flow rate, and head specification for your exact system requirements.
          </p>
        </PrecisionReveal>

        <PrecisionReveal variant="riseUp" delay={0.21}>
          <div className="mt-4">
            <Link href="/contact#inquiry-form" id="applications-cta-link">
              <GreenCTAButton>Request Engineering Consultation</GreenCTAButton>
            </Link>
          </div>
        </PrecisionReveal>
      </div>
    </section>
  );
}
