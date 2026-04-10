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
// import StatsBar from "@/components/sections/home/StatsBar";
import FeaturedPumpsGrid from "@/components/sections/home/FeaturedPumpsGrid";
import PartnerSynergy from "@/components/sections/home/PartnerSynergy";
import ApplicationShowcase from "@/components/sections/home/ApplicationShowcase";
import TechnicalServices from "@/components/sections/home/TechnicalServices";

export const metadata: Metadata = {
  title: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
  description:
    "FlowCore Solutions is the engineering bridge between Berlington industrial pumps and Flowchar water treatment chemicals. ISO-certified vertical multistage, submersible, and centrifugal pumps for WTP, HVAC, and industrial infrastructure across India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
    description:
      "The critical engineering bridge between Berlington fluid hardware and Flowchar system chemistry. ISO-certified pump selection, MEP support, and Total System Health lifecycle servicing.",
    url: "https://flowcore.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions — Industrial Fluid Infrastructure & Water Treatment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
    description:
      "ISO-certified Berlington pumps and Flowchar water treatment chemistry. MEP support, pump selection, and 24/7 lifecycle servicing across India.",
    images: ["/og-image.png"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://flowcore.in/#webpage",
  name: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
  description:
    "FlowCore Solutions is the engineering bridge between Berlington industrial pumps and Flowchar water treatment chemicals.",
  url: "https://flowcore.in",
  isPartOf: {
    "@id": "https://flowcore.in/#organization",
  },
  about: {
    "@id": "https://flowcore.in/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://flowcore.in",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <HeroSection />
      {/* <StatsBar /> */}
      <FeaturedPumpsGrid />
      <PartnerSynergy />
      <ApplicationShowcase/>
      <TechnicalServices />
    </>
  );
}
