"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";

const EASE = [0.25, 0, 0, 1] as const;

const BlueBackground = () => (
  <>
    <Image
      src={berlingtonPumpsSet}
      alt="Berlington industrial pump range — vertical multistage, submersible, and centrifugal pumps for water treatment and HVAC"
      fill
      priority
      sizes="100vw"
      className="object-cover scale-105 opacity-25"
    />
    <div className="absolute inset-0 bg-deep-blue/70" />
    <div className="absolute inset-0 bg-linear-to-r from-deep-blue/80 via-deep-blue/60 to-transparent" />
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
    <section className="hero-underlap relative w-full h-screen overflow-hidden">
      
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0">
        <div className="hero-bg-blue absolute inset-0 bg-deep-blue">
          <BlueBackground />
        </div>
        <div className="hero-bg-green absolute inset-0 bg-primary-green">
          <GreenBackground />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full">
        
        {/* LEFT / TOP */}
        <div className="w-full h-[55%] lg:h-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32">
          
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-3 lg:mb-5 border-l-2 border-light-blue pl-3 lg:pl-4 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-light-blue"
          >
            Industrial Pump Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white font-bold uppercase mb-4 lg:mb-6 leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Industrial <br />
            <span className="text-light-blue">Pump</span> <br />
            Systems
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden sm:block text-white/90 max-w-md mb-6 lg:mb-10 text-sm lg:text-lg leading-relaxed"
          >
            High-performance centrifugal and stainless steel pump systems engineered for reliable pressure, circulation, and fluid transfer in demanding industrial environments.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row gap-3 lg:gap-4 mt-2 sm:mt-0"
          >
            <Link href="/products" className="w-auto">
              <button className="bg-white text-deep-blue px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-sm lg:text-base font-bold transition-all hover:scale-105 hover:shadow-xl text-center">
                Explore Products →
              </button>
            </Link>

            <Link href="/applications" className="w-auto hidden sm:block">
              <button className="border border-white/40 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl backdrop-blur-sm hover:border-white transition-all text-center text-sm lg:text-base">
                Applications
              </button>
            </Link>
          </motion.div>

          {/* STATS */}
          <div className="hidden sm:flex mt-8 lg:mt-14 flex-wrap gap-6 sm:gap-10 border-t border-white/20 pt-6 lg:pt-8">
            {[
              ["16+", "Pump Series"],
              ["Precision", "Engineering"],
              ["ISO", "Certified"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-white text-xl lg:text-2xl font-bold">{n}</div>
                <div className="text-white/60 text-[10px] lg:text-xs uppercase tracking-wide">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT / BOTTOM */}
        <div className="flex-1 lg:flex-none lg:flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 pb-10 lg:pb-0">
          
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-3 lg:mb-5 border-l-2 border-deep-blue pl-3 lg:pl-4 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-deep-blue"
          >
            WTP Chemical Solutions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-bold uppercase mb-4 lg:mb-6 leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Chemical <br />
            <span className="text-white">Efficiency</span> <br />
            Optimized
          </motion.h2>

          <p className="hidden sm:block text-white max-w-md mb-6 lg:mb-10 text-sm lg:text-lg leading-relaxed">
            Specialized water treatment solutions engineered for system longevity, ensuring consistent flow and high-level operational efficiency.
          </p>

          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="mt-2 sm:mt-0"
          >
            <Link href="/contact" className="w-auto">
              <button className="bg-deep-blue text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-sm lg:text-base font-bold transition-all hover:scale-105 hover:shadow-xl text-center">
                Learn More →
              </button>
            </Link>
          </motion.div>

          <div className="hidden sm:block mt-8 lg:mt-14 border-t border-deep-blue/20 pt-6 lg:pt-8">
            <p className="text-deep-blue/70 text-xs lg:text-sm uppercase tracking-wide italic">
              ISO-certified solutions for water system health
            </p>
          </div>
        </div>
      </div>

      {/* animation */}
      <style jsx global>{`
        .hero-bg-blue {
          clip-path: polygon(0 0, 100% 0, 100% 64%, 0 52%);
        }
        .hero-bg-green {
          clip-path: polygon(0 52%, 100% 64%, 100% 100%, 0 100%);
        }
        @media (min-width: 1024px) {
          .hero-bg-blue {
            clip-path: polygon(0 0, 60% 0, 55% 100%, 0 100%);
          }
          .hero-bg-green {
            clip-path: polygon(55% 0, 100% 0, 100% 100%, 50% 100%);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.08; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
