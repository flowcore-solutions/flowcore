/**
 * Home Page — FlowCore Solutions (/)
 *
 * Sections (in order per MASTER_PLAN.md Phase 3):
 *  1. HeroSection — Diagonal Split-Precision hero (full viewport)
 *  2. StatsBar    — Industrial social proof strip
 *  3. FeaturedPumpsGrid — 3D hover product catalogue
 *
 * RSC: This file and StatsBar are server components.
 * HeroSection and FeaturedPumpsGrid are "use client" for animation/interaction.
 */

import type { Metadata } from "next";
import HeroSection from "@/components/sections/home/HeroSection";
import StatsBar from "@/components/sections/home/StatsBar";
import FeaturedPumpsGrid from "@/components/sections/home/FeaturedPumpsGrid";

export const metadata: Metadata = {
  title: "FlowCore Solutions — Industrial Pump Systems & Water Treatment",
  description:
    "FlowCore Solutions distributes Berlington industrial pump systems and Flowchar water treatment chemicals across India. Vertical multistage, sewage, hydro, and pipeline pumps for WTP, HVAC, and industrial processing.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedPumpsGrid />
    </>
  );
}
