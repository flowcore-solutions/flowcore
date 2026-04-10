"use client";

/**
 * AboutHero — Engineering-authority page header.
 *
 * Uses bg-section-bg + the repeating diagonal grid pattern
 * from ApplicationsHeader for cohesive blueprint atmosphere.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

export default function AboutHero() {
  return (
    <header
      id="about-hero"
      className="relative bg-section-bg overflow-hidden"
      aria-label="About FlowCore Solutions"
    >
      {/* Engineering grid — exact pattern from Applications page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      {/* Subtle horizontal rule accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue/30 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">

        {/* Breadcrumb */}
        <PrecisionReveal variant="fadeSlideLeft">
          <nav
            className="flex items-center gap-2 mb-10"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light hover:text-primary-blue transition-colors"
            >
              Home
            </Link>
            <span className="text-[10px] text-border">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue">
                About
              </span>
            </div>
          </nav>
        </PrecisionReveal>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

          {/* Left — Primary headline */}
          <div className="max-w-2xl">
            <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
              <span className="inline-flex items-center pl-3 border-l-2 border-primary-green text-[10px] font-black uppercase tracking-[0.2em] text-primary-green mb-6 block">
                Engineering Infrastructure Partnership
              </span>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
              <h1
                className="font-black text-deep-blue leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                The Bridge Between
                <br />
                <span className="text-primary-blue">Hardware</span>
                {" & "}
                <span className="text-primary-green">Chemistry</span>
              </h1>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.21}>
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-text-light font-medium max-w-xl">
                FlowCore Solutions acts as the strategic engineering bridge
                between high-performance pump manufacturing and specialized
                water chemistry — delivering complete fluid infrastructure
                solutions across municipal, commercial, and heavy industrial
                sectors.
              </p>
            </PrecisionReveal>
          </div>

          {/* Right — Authority metric strip */}
          <PrecisionReveal variant="fadeSlideRight" delay={0.28}>
            <div className="grid grid-cols-2 gap-3 lg:gap-4 min-w-[280px]">
              {[
                { value: "65%", label: "Pump-Focused", accent: "blue" },
                { value: "ISO", label: "Certified Mfg.", accent: "blue" },
                { value: "5+", label: "Key Verticals", accent: "green" },
                { value: "Total", label: "System Health", accent: "green" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl border border-border bg-white p-4"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: PRECISION_EASE }}
                >
                  <div
                    className="text-2xl font-black leading-none mb-1"
                    style={{
                      color: stat.accent === "blue" ? "#0f3d91" : "#6cc24a",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-light">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </PrecisionReveal>
        </div>

        {/* Bottom accent — engineering annotation line */}
        <PrecisionReveal variant="riseUp" delay={0.35}>
          <div className="mt-14 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-light">
                Berlington
              </span>
              <span className="text-text-light opacity-60">&middot;</span>
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                <span className="text-primary-blue">Flow</span>
                <span className="text-primary-green">Core</span>
              </span>
              <span className="text-text-light opacity-60">&middot;</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-light">
                Flowchar
              </span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>
        </PrecisionReveal>
      </div>
    </header>
  );
}
