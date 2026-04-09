"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

const PAGE_HEADER = {
  tag: "Applications",
  heading: "Pumps Built\nfor Real Systems",
  sub: "Hover the diagram nodes to discover the exact Berlington pump series engineered for each stage — from raw water intake to high-rise pressure supply.",
} as const;

export default function ApplicationsHeader() {
  return (
    <header className="relative bg-section-bg overflow-hidden">
      {/* Diagonal industrial line pattern — same as sections below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* Breadcrumb — Clean & Professional */}
        <PrecisionReveal variant="fadeSlideLeft">
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
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
                Applications
              </span>
            </div>
          </nav>
        </PrecisionReveal>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
              <h1
                className="font-black text-deep-blue whitespace-pre-line leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Pumps Built for <br />
                <span className="text-primary-green">Real Systems</span>
              </h1>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.21}>
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-text-light font-medium max-w-xl">
                {PAGE_HEADER.sub}
              </p>
            </PrecisionReveal>
          </div>

          {/* How-to hint — Interactive Card Style */}
          <PrecisionReveal variant="fadeSlideRight" delay={0.28}>
            <div className="relative group lg:mb-2 text-selection-green">
              <div className="absolute -inset-2 bg-primary-green/5 rounded-2xl blur-xl group-hover:bg-primary-green/10 transition-all duration-500" />
              <div className="relative flex items-center gap-4 rounded-xl bg-white border border-border/60 p-5 shadow-sm">
                {/* Visual Indicator */}
                <div className="shrink-0 w-12 h-12 rounded-lg bg-section-bg flex items-center justify-center border border-border/40">
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    animate={{ 
                      x: [0, 4, 0],
                      y: [0, 4, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path
                      d="M4 2l8 6-4 1-2 4-2-11z"
                      fill="#6cc24a"
                    />
                  </motion.svg>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-green">
                    Interactive Guide
                  </span>
                  <p className="text-xs font-bold text-deep-blue leading-tight max-w-[180px]">
                    Hover over diagram nodes to reveal pump specifications
                  </p>
                </div>
              </div>
            </div>
          </PrecisionReveal>
        </div>
      </div>
    </header>
  );
}
