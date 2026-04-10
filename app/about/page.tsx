/**
 * About Us Page (/about) — Complete Redesign
 *
 * Engineering-authority narrative in five acts:
 *  1. AboutHero          — Blueprint header with breadcrumb + authority metrics
 *  2. SynergyBridge      — Berlington ↔ FlowCore ↔ Flowchar architecture panel
 *  3. VerticalExpertise  — 5 industry verticals as spec-sheet cards
 *  4. EngineeringStandards — ISO certs, material specs, MEP support grid
 *  5. TotalSystemHealth  — Life-cycle support mandate (pump-first visual bias)
 *
 * All "use client" work is isolated in section components.
 * This file remains a Server Component for fast initial render.
 */

import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import SynergyBridge from "@/components/sections/about/SynergyBridge";
import VerticalExpertise from "@/components/sections/about/VerticalExpertise";
import EngineeringStandards from "@/components/sections/about/EngineeringStandards";
import TotalSystemHealth from "@/components/sections/about/TotalSystemHealth";

export const metadata: Metadata = {
  title: "About FlowCore Solutions — Engineering Partners for Fluid Infrastructure",
  description:
    "FlowCore Solutions is the strategic engineering bridge between Berlington industrial pump systems and Flowchar water treatment chemicals. Discover our specialised expertise across municipal WTP, HVAC, industrial processing, and our commitment to Total System Health.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <AboutHero />
      <SynergyBridge />
      <VerticalExpertise />
      <EngineeringStandards />
      <TotalSystemHealth />
    </div>
  );
}
