"use client";

/**
 * HeroSection — Targeted Contrast Update.
 * Maintains standard industrial color logic while highlighting key efficiency text in white.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

// ── Animated wrappers ──
function FadeLeft({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: PRECISION_EASE, delay }}>
      {children}
    </motion.div>
  );
}

function FadeRight({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: PRECISION_EASE, delay }}>
      {children}
    </motion.div>
  );
}

function RiseUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: PRECISION_EASE, delay }}>
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const headingStyle = {
    fontSize: "clamp(2.2rem, 5.8vw, 4rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em"
  };

  return (
    <section 
      id="hero" 
      className="hero-underlap relative w-full overflow-hidden h-screen"
      style={{ height: "100svh" }}
    >
      
      {/* ── Background layer ── */}
      <div className="absolute inset-0 bg-deep-blue" style={{ clipPath: "polygon(0 0, 62% 0, 58% 100%, 0 100%)" }}>
        <Image src={berlingtonPumpsSet} alt="" fill priority className="object-cover opacity-15 mix-blend-luminosity" />
      </div>

      <div className="absolute inset-0 bg-primary-green" style={{ clipPath: "polygon(58% 0, 100% 0, 100% 100%, 54% 100%)" }}>
        <div className="absolute inset-0 opacity-20 overflow-hidden">
           {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border-2 border-white/20"
              style={{
                width: `${300 + i * 140}px`, height: `${300 + i * 140}px`,
                top: "50%", left: "65%", transform: "translate(-50%, -50%)",
                animation: `pulse ${5 + i}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex h-full items-stretch">
        
        {/* LEFT Section */}
        <div className="flex w-[58%] flex-col justify-center px-12 lg:px-24">
          <FadeLeft delay={0.1}>
            <span className="mb-5 inline-flex items-center gap-2 border-l-2 border-light-blue pl-4 text-sm font-bold uppercase tracking-[0.2em] text-light-blue">
              Industrial Pump Solutions
            </span>
          </FadeLeft>

          <FadeLeft delay={0.2}>
            <h1 className="mb-7 font-bold text-white uppercase" style={headingStyle}>
              Engineering <br /> <span className="text-light-blue">Water</span> <br /> Infrastructure
            </h1>
          </FadeLeft>

          <FadeLeft delay={0.3}>
            <p className="mb-10 max-w-md text-base lg:text-lg leading-relaxed text-white/90">
              High-performance centrifugal and stainless steel pumps designed for consistent fluid movement in harsh industrial environments.
            </p>
          </FadeLeft>

          <RiseUp delay={0.45}>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="bg-white text-deep-blue px-9 py-4 rounded-lg font-bold text-base hover:bg-light-blue hover:text-white transition-all shadow-lg">
                Explore Products →
              </Link>
              <Link href="/applications" className="border-2 border-white/40 text-white px-9 py-4 rounded-lg font-bold text-base backdrop-blur-sm hover:border-white transition-all">
                Applications
              </Link>
            </div>
          </RiseUp>

          {/* Micro-stats strip */}
          <FadeLeft delay={0.6}>
            <div className="mt-12 flex gap-12 border-t border-white/20 pt-8">
              {[["16+", "Pump Series"], ["Precision", "Engineering"], ["ISO-Grade", "Certified"]].map(([n, l]) => (
                <div key={l} className="flex flex-col">
                  <span className="text-3xl font-bold text-white leading-none mb-1">{n}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{l}</span>
                </div>
              ))}
            </div>
          </FadeLeft>
        </div>

        {/* RIGHT Section */}
        <div className="flex flex-1 flex-col justify-center px-12 lg:px-20">
          <FadeRight delay={0.25}>
            <span className="mb-5 inline-flex items-center gap-2 border-l-2 border-deep-blue pl-4 text-sm font-bold uppercase tracking-[0.2em] text-deep-blue">
              WTP Chemical Solutions
            </span>
          </FadeRight>

          <FadeRight delay={0.35}>
            <h2 className="mb-7 font-bold text-deep-blue uppercase" style={headingStyle}>
              Chemical <br /> <span className="text-white">Efficiency</span> <br /> Optimized
            </h2>
          </FadeRight>

          <FadeRight delay={0.45}>
            <p className="mb-10 max-w-md text-base lg:text-lg leading-relaxed text-white ">
              Specialized water treatment solutions engineered for system longevity, ensuring consistent flow and high-level operational efficiency.
            </p>
          </FadeRight>

          <RiseUp delay={0.55}>
            <Link href="/contact" className="bg-deep-blue text-white px-9 py-4 rounded-lg font-bold text-base hover:bg-[#0a2d6b] transition-all shadow-xl">
              Learn More →
            </Link>
          </RiseUp>

          <FadeRight delay={0.7}>
            <div className="mt-12 border-t border-deep-blue/20 pt-8">
               <p className="text-sm font-bold text-deep-blue/70 tracking-wide uppercase italic">
                ISO-certified solutions for water system health
              </p>
            </div>
          </FadeRight>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}