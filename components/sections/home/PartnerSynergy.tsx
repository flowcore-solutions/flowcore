"use client";

import Image from "next/image";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

import berlingtonLogo from "@/app/assets/logos/berlington-logo.svg";
import flowcharLogo from "@/app/assets/logos/flowchar-logo.svg";

export default function PartnerSynergy() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-section-bg">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-8">

        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <PrecisionReveal variant="riseUp">
            <SectionTag>The FlowCore Advantage</SectionTag>
            <h2
              className="mt-4 font-black text-deep-blue uppercase leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Hardware <span className="text-border mx-2 font-light">+</span> Chemistry
            </h2>
            <p className="mt-6 text-text-light text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              We don&apos;t just supply pumps; we deliver complete fluid intelligence. By
              synchronizing heavy-duty engineering with advanced chemical treatments, we
              guarantee maximum efficiency and an uncompromising lifespan.
            </p>
          </PrecisionReveal>
        </div>

        {/* Synergy Block */}
        <div className="relative rounded-4xl overflow-hidden lg:min-h-[480px] flex flex-col lg:flex-row lg:items-stretch shadow-[0_20px_80px_-15px_rgba(15,61,145,0.15)] group">

          {/* ── Berlington Side ── */}
          {/* FIX: PrecisionReveal now wraps only the CONTENT div, not the full-height
              layout container. This way the observer fires based on where the content
              actually is, not the top edge of a 480px-tall panel. */}
          <div
            className="relative w-full lg:w-1/2 p-10 sm:p-14 lg:p-16 flex flex-col justify-between transition-transform duration-700 ease-out lg:group-hover:scale-[1.01] z-10"
            style={{ backgroundColor: "#0F3D91" }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }} />

            {/* Wrap only the inner content, not the full panel */}
            <PrecisionReveal variant="fadeSlideLeft" className="relative z-10 flex flex-col h-full">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <span className="w-8 h-8 rounded-full bg-[#1E5BB8] flex items-center justify-center text-white font-bold text-xs">01</span>
                  <span className="text-[#4DA3FF] text-[10px] font-black tracking-[0.2em] uppercase">
                    Industrial Pump Partner
                  </span>
                </div>
                <div className="relative h-28 w-80 xl:h-32 xl:w-96 mb-8 brightness-0 invert">
                  <Image
                    src={berlingtonLogo}
                    alt="Berlington Pumps — ISO-certified industrial pump manufacturer"
                    fill
                    sizes="384px"
                    className="object-contain object-left"
                  />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Precision Engineering</h3>
                <p className="text-[#4DA3FF] font-medium leading-relaxed max-w-[90%]">
                  High-pressure centrifugal and stainless steel pumps built for the most
                  demanding municipal and industrial environments.
                </p>
              </div>

              <div className="relative z-10 mt-16 grid grid-cols-2 gap-8 auto-mt">
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <div className="text-3xl lg:text-4xl font-black text-white">16</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#4DA3FF] font-bold">Pump Series</div>
                </div>
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <div className="text-3xl lg:text-4xl font-black text-white">ISO</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#4DA3FF] font-bold">Grade Certified</div>
                </div>
              </div>
            </PrecisionReveal>
          </div>

          {/* ── Flowchar Side ── */}
          <div className="relative w-full lg:w-1/2 p-10 sm:p-14 lg:p-16 flex flex-col justify-between bg-white lg:rounded-r-4xl transition-transform duration-700 ease-out lg:group-hover:scale-[1.01] z-0 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
            <PrecisionReveal variant="fadeSlideRight" delay={0.08} className="relative z-10 flex flex-col h-full">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <span className="w-8 h-8 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-xs">02</span>
                  <span className="text-primary-green text-[10px] font-black tracking-[0.2em] uppercase">
                    Water Treatment Chemical Partner
                  </span>
                </div>
                <div className="relative h-28 w-80 xl:h-32 xl:w-96 mb-8">
                  <Image
                    src={flowcharLogo}
                    alt="Flowchar — ISO-certified water treatment chemicals"
                    fill
                    sizes="384px"
                    className="object-contain object-left"
                  />
                </div>
                <h3 className="text-3xl font-black text-deep-blue mb-4 uppercase tracking-tight">Lifespan Optimization</h3>
                <p className="text-text-light font-medium leading-relaxed max-w-[90%]">
                  Engineered water treatments that eliminate scale, prevent bio-fouling,
                  and protect your pump infrastructure from the inside out.
                </p>
              </div>

              <div className="relative z-10 mt-16 grid grid-cols-2 gap-8 auto-mt">
                <div className="space-y-1 border-t border-border pt-4">
                  <div className="text-3xl lg:text-4xl font-black text-primary-green">Zero</div>
                  <div className="text-[10px] uppercase tracking-widest text-text-light font-bold">Scale Buildup</div>
                </div>
                <div className="space-y-1 border-t border-border pt-4">
                  <div className="text-3xl lg:text-4xl font-black text-primary-green">+40%</div>
                  <div className="text-[10px] uppercase tracking-widest text-text-light font-bold">Life Extension</div>
                </div>
              </div>
            </PrecisionReveal>
          </div>

          {/* Center connector */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-2xl z-20 items-center justify-center group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
            <div className="absolute inset-2 rounded-full border-[3px] border-deep-blue border-r-primary-green border-b-primary-green" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F3D91" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}