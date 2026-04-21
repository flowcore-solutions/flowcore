"use client";

import Image from "next/image";
import Link from "next/link";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

const BlueBackground = () => (
  <>
    <Image
      src={berlingtonPumpsSet}
      alt="Berlington industrial pump range"
      fill
      priority
      fetchPriority="high"
      quality={75}
      sizes="(max-width: 768px) 100vw, 60vw"
      className="object-cover opacity-30"
    />
    <div className="absolute inset-0 bg-deep-blue/85" />
  </>
);

const GreenBackground = () => (
  <>
    <div className="absolute inset-0 bg-linear-to-l from-primary-green via-primary-green/95 to-transparent" />
    <div className="absolute inset-0 opacity-20">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/20"
          style={{
            width: `${320 + i * 140}px`,
            height: `${320 + i * 140}px`,
            top: "50%",
            left: "65%",
            transform: "translate(-50%, -50%)",
            animation: `pulse ${6 + i}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  </>
);

export default function HeroSection() {
  return (
    <section className="hero-underlap hero-viewport relative w-full overflow-hidden bg-deep-blue">
      
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-deep-blue [clip-path:polygon(0_0,100%_0,100%_64%,0_52%)] lg:[clip-path:polygon(0_0,60%_0,55%_100%,0_100%)]">
          <BlueBackground />
        </div>
        <div className="absolute inset-0 bg-primary-green [clip-path:polygon(0_52%,100%_64%,100%_100%,0_100%)] lg:[clip-path:polygon(55%_0,100%_0,100%_100%,50%_100%)]">
          <GreenBackground />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex h-full w-full flex-col lg:flex-row">
        
        {/* LEFT / TOP: Berlington Pumps Range */}
        <article className="flex h-[52%] w-full flex-col justify-center px-8 sm:h-[55%] sm:px-16 lg:h-full lg:w-[55%] lg:justify-start lg:px-24 xl:px-36 lg:pt-8 xl:pt-12">
          <PrecisionReveal variant="fadeSlideRight" className="mb-4 lg:mb-6 border-l-2 border-light-blue pl-4 -ml-4.5 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-light-blue">
            Authorized Berlington Pump Dealer
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.1}>
            <h1
              className="text-white font-black uppercase mb-4 lg:mb-6 leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
            >
              Berlington <br />
              <span className="text-light-blue">Pumps</span> <br/>
              <span className="text-white">Karnataka</span>
            </h1>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.2}>
            <p className="hidden sm:block text-white/80 max-w-md mb-8 lg:mb-12 text-sm lg:text-lg leading-relaxed font-medium">
              Precision centrifugal and stainless steel pump systems engineered for HVAC, Water Treatment, and high-pressure industrial applications.
            </p>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.3} className="flex flex-row items-center gap-4">
            <Link href="/products" className="group">
              <button className="bg-white text-deep-blue px-6 py-3.5 lg:px-9 lg:py-4.5 rounded-xl text-sm lg:text-base font-bold transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-95 shadow-xl">
                Explore Models →
              </button>
            </Link>

            <Link href="/applications" className="hidden sm:block">
              <button className="border border-white/30 text-white/90 px-6 py-3.5 lg:px-9 lg:py-4.5 rounded-xl backdrop-blur-md hover:border-white hover:text-white transition-all text-sm lg:text-base font-semibold active:scale-95">
                Applications
              </button>
            </Link>
          </PrecisionReveal>

          <PrecisionReveal
            variant="riseUp"
            delay={0.5}
            className="hidden sm:flex mt-12 lg:mt-16 items-center flex-wrap gap-y-3 border-t border-white/10 pt-8 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.25em] text-white/40"
          >
            <span className="text-white/80">16+ Pump Series</span>
            <span className="mx-4 lg:mx-8 text-white/10 font-light">|</span>
            <span className="text-white/80">ISO 9001 Certified</span>
          </PrecisionReveal>
        </article>

        {/* RIGHT / BOTTOM: Flowchar Chemicals */}
        <article className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:flex-1 lg:justify-start lg:px-20 lg:pt-8 xl:pt-12">
          
          <PrecisionReveal variant="fadeSlideLeft" className="mb-4 lg:mb-6 border-l-2 border-deep-blue pl-4 -ml-4.5 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-deep-blue">
            Advanced Water Treatment Chemicals
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.15}>
            <h2
              className="text-deep-blue font-black uppercase mb-4 lg:mb-6 leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
            >
              Industrial
              <br />
              <span className="text-white">Chemistry</span> <br />
              Solutions
            </h2>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.25}>
            <p className="hidden sm:block text-deep-blue/80 max-w-md mb-8 lg:mb-12 text-sm lg:text-lg leading-relaxed font-medium">
              High-grade Flowchar chemicals for WTP, STP, and RO systems. Specialized formulations for scale prevention and bio-fouling control.
            </p>
          </PrecisionReveal>

          <PrecisionReveal variant="riseUp" delay={0.35}>
            <Link href="/water-treatment-chemicals-bangalore" className="group">
              <button className="bg-deep-blue text-white px-6 py-3.5 lg:px-9 lg:py-4.5 rounded-xl text-sm lg:text-base font-bold transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-95 shadow-xl">
                View Solutions →
              </button>
            </Link>
          </PrecisionReveal>

          <div className="hidden sm:block mt-12 lg:mt-16 border-t border-deep-blue/10 pt-8">
            <p className="text-deep-blue/50 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.25em] italic">
              Synchronized System Health Mandate
            </p>
          </div>
        </article>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.05; transform: translate(-50%, -50%) scale(1.04); }
        }
      `}} />
    </section>
  );
}
