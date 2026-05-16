import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import SynergyBridge from "@/components/sections/about/SynergyBridge";
import VerticalExpertise from "@/components/sections/about/VerticalExpertise";
import EngineeringStandards from "@/components/sections/about/EngineeringStandards";
import TotalSystemHealth from "@/components/sections/about/TotalSystemHealth";

export const metadata: Metadata = {
  title: "About FlowCore Solutions | Pumps and Water Treatment in Bengaluru",
  description:
    "FlowCore Solutions supplies pumps and supports water treatment jobs in Bengaluru with installation planning, AMC, spare parts, and breakdown service.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About FlowCore Solutions | Pumps and Water Treatment in Bengaluru",
    description:
      "Pump supply and water treatment support for RO plants, HVAC lines, STP and ETP systems, and building utility water.",
    url: "https://flowcoresolutions.in/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FlowCore Solutions | Pumps and Water Treatment in Bengaluru",
    description:
      "Pump supply and water treatment support for RO plants, HVAC lines, STP and ETP systems, and building utility water.",
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
      item: "https://flowcoresolutions.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://flowcoresolutions.in/about",
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://flowcoresolutions.in/about#webpage",
  name: "About FlowCore Solutions",
  description:
    "FlowCore Solutions supplies pumps and supports water treatment work for industrial, commercial, and institutional sites.",
  url: "https://flowcoresolutions.in/about",
  isPartOf: {
    "@id": "https://flowcoresolutions.in/#organization",
  },
  about: {
    "@id": "https://flowcoresolutions.in/#organization",
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
