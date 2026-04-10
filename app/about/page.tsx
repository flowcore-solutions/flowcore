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
  title: "About FlowCore Solutions — Engineering Bridge for Industrial Fluid Systems",
  description:
    "FlowCore Solutions bridges Berlington's ISO-certified industrial pumps (AISI 304/316 stainless steel) with Flowchar's precision water treatment chemicals. Learn about our Total System Health lifecycle commitment, MEP specification support, and pan-India infrastructure expertise.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About FlowCore Solutions — Industrial Fluid Infrastructure Specialists",
    description:
      "The strategic engineering partner connecting Berlington hardware and Flowchar chemistry. ISO-certified pump systems, MEP support, chemical synergy audits, and 24/7 lifecycle maintenance.",
    url: "https://flowcore.in/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions Engineering Authority — Industrial Pump Systems India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FlowCore Solutions — Industrial Fluid Systems Engineering",
    description:
      "Bridging Berlington industrial pumps and Flowchar water treatment chemistry for Total System Health lifecycle management.",
    images: ["/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://flowcore.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://flowcore.in/about",
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://flowcore.in/about#webpage",
  name: "About FlowCore Solutions",
  description:
    "FlowCore Solutions is the engineering bridge between Berlington industrial pump hardware and Flowchar water treatment chemistry. We provide ISO-certified pump selection, MEP specification support, and Total System Health lifecycle servicing.",
  url: "https://flowcore.in/about",
  isPartOf: {
    "@id": "https://flowcore.in/#organization",
  },
  about: {
    "@id": "https://flowcore.in/#organization",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutHero />
      <SynergyBridge />
      <VerticalExpertise />
      <EngineeringStandards />
      <TotalSystemHealth />
    </div>
  );
}
