"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";

const EASE = [0.25, 0, 0, 1] as const;

export default function HeroSection() {
  return (
    <section className="hero-underlap relative w-full h-screen overflow-hidden">
      
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0">

        {/* LEFT SIDE (BLUE + IMAGE) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 60% 0, 55% 100%, 0 100%)",
          }}
        >
          {/* Pump Image */}
          <Image
            src={berlingtonPumpsSet}
            alt="Industrial Pumps"
            fill
            priority
            className="object-cover scale-105 opacity-25"
          />

          {/* DARK OVERLAY (reduced) */}
          <div className="absolute inset-0 bg-deep-blue/70" />

          {/* GRADIENT BLEND */}
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/80 via-deep-blue/60 to-transparent" />
        </div>

        {/* RIGHT SIDE (GREEN) */}
        <div
          className="absolute inset-0 bg-primary-green"
          style={{
            clipPath: "polygon(55% 0, 100% 0, 100% 100%, 50% 100%)",
          }}
        >
          {/* Gradient for softness */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary-green via-primary-green/95 to-transparent" />

          {/* Animated rings */}
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
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex h-full">
        
        {/* LEFT */}
        <div className="w-[55%] flex flex-col justify-center px-12 lg:px-24">
          
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-5 border-l-2 border-light-blue pl-4 text-sm font-bold uppercase tracking-[0.2em] text-light-blue"
          >
            Industrial Pump Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white font-bold uppercase mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Engineering <br />
            <span className="text-light-blue">Water</span> <br />
            Infrastructure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 max-w-md mb-10 text-lg leading-relaxed"
          >
            High-performance centrifugal and stainless steel pumps designed for consistent fluid movement in harsh industrial environments.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Link href="/products">
              <button className="bg-white text-deep-blue px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl">
                Explore Products →
              </button>
            </Link>

            <Link href="/applications">
              <button className="border border-white/40 text-white px-8 py-4 rounded-xl backdrop-blur-sm hover:border-white transition-all">
                Applications
              </button>
            </Link>
          </motion.div>

          {/* STATS */}
          <div className="mt-14 flex gap-10 border-t border-white/20 pt-8">
            {[
              ["16+", "Pump Series"],
              ["Precision", "Engineering"],
              ["ISO", "Certified"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-white text-2xl font-bold">{n}</div>
                <div className="text-white/60 text-xs uppercase tracking-wide">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col justify-center px-12 lg:px-20">
          
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-5 border-l-2 border-deep-blue pl-4 text-sm font-bold uppercase tracking-[0.2em] text-deep-blue"
          >
            WTP Chemical Solutions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-bold uppercase mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Chemical <br />
            <span className="text-white">Efficiency</span> <br />
            Optimized
          </motion.h2>

          <p className="text-white max-w-md mb-10 text-lg leading-relaxed">
            Specialized water treatment solutions engineered for system longevity, ensuring consistent flow and high-level operational efficiency.
          </p>

          <Link href="/contact">
            <button className="bg-deep-blue text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl">
              Learn More →
            </button>
          </Link>

          <div className="mt-14 border-t border-deep-blue/20 pt-8">
            <p className="text-deep-blue/70 text-sm uppercase tracking-wide italic">
              ISO-certified solutions for water system health
            </p>
          </div>
        </div>
      </div>

      {/* animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.08; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}