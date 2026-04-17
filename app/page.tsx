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
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/home/HeroSection";

const FeaturedPumpsGrid = dynamic(() => import("@/components/sections/home/FeaturedPumpsGrid"), {
  ssr: true,
});
const PartnerSynergy = dynamic(() => import("@/components/sections/home/PartnerSynergy"), {
  ssr: true,
});
const ApplicationShowcase = dynamic(() => import("@/components/sections/home/ApplicationShowcase"), {
  ssr: true,
});
const TechnicalServices = dynamic(() => import("@/components/sections/home/TechnicalServices"), {
  ssr: true,
});
const FAQSection = dynamic(() => import("@/components/ui/FAQSection"), {
  ssr: true,
});

export function generateMetadata(): Metadata {
  return {
    title: "Berlington Pumps Bangalore | FlowCore",
    description: "FlowCore Solutions is the authorized Berlington Pumps dealer and service provider in Bangalore. Specializing in industrial pump systems, WTP, and HVAC applications across Karnataka.",
    keywords: [
      "Berlington pumps Bangalore",
      "Berlington pump dealer Karnataka",
      "Berlington pump service Bangalore",
      "industrial pumps Bangalore",
      "Berlington pump supplier"
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: "https://flowcore.in",
      title: "FlowCore Solutions | Authorized Berlington Pumps Dealer in Bangalore",
      description: "FlowCore Solutions is the authorized Berlington Pumps dealer and service provider in Bangalore. Specializing in industrial pump systems, WTP, and HVAC applications across Karnataka.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "FlowCore Solutions | Authorized Berlington Pumps Dealer in Bangalore",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FlowCore Solutions | Authorized Berlington Pumps Dealer in Bangalore",
      description: "FlowCore Solutions is the authorized Berlington Pumps dealer and service provider in Bangalore. Specializing in industrial pump systems across Karnataka.",
      images: ["/og-image.png"],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcore.in/#organization",
  "name": "FlowCore Solutions",
  "brand": "Berlington Pumps",
  "url": "https://flowcore.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1st Floor, Cheluva Complex, In front of Kottigepalya Bus Stop, Magadi Main Road, Kottingepalya",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560091",
    "addressCountry": "IN"
  },
  "areaServed": "Karnataka",
  "telephone": "+918618885283",
  "description": "FlowCore Solutions is the authorized Berlington Pumps dealer in Bangalore.",
};

const homepageFaqs = [
  {
    question: "Where can I buy Berlington pumps in Bangalore?",
    answer:
      "You can buy Berlington pumps in Bangalore from FlowCore Solutions. We supply industrial pump systems, help match the correct model to the application, and support projects across Karnataka.",
  },
  {
    question: "What are Berlington pumps used for?",
    answer:
      "Berlington pumps are used for HVAC circulation, water treatment systems, fire fighting, pressure boosting, and industrial utility water applications where dependable flow and service support matter.",
  },
  {
    question: "Do you provide pump service support in Karnataka?",
    answer:
      "Yes. FlowCore Solutions supports Bangalore and Karnataka clients with pump selection guidance, supply coordination, and lifecycle service for Berlington pump installations.",
  },
];

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <HeroSection />
      {/* <StatsBar /> */}
      <FeaturedPumpsGrid />
      <PartnerSynergy />
      <ApplicationShowcase/>
      <TechnicalServices />
      <FAQSection
        faqs={homepageFaqs}
        title="Customer FAQs"
        tag="Buyer Questions"
      />
    </>
  );
}
