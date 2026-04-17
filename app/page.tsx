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
import Link from "next/link";
import HeroSection from "@/components/sections/home/HeroSection";
import FeaturedPumpsGrid from "@/components/sections/home/FeaturedPumpsGrid";
import PartnerSynergy from "@/components/sections/home/PartnerSynergy";
import ApplicationShowcase from "@/components/sections/home/ApplicationShowcase";
import TechnicalServices from "@/components/sections/home/TechnicalServices";
import FAQSection from "@/components/ui/FAQSection";
import FeaturedSnippetBlock from "@/components/ui/FeaturedSnippetBlock";

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
      <section className="bg-[#F8FAFC] py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_24px_80px_-44px_rgba(15,61,145,0.42)]">
            <span className="border-l-2 border-[#1E5BB8] pl-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1E5BB8]">
              Local SEO Expansion
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#0F172A] md:text-4xl">
              Industries We Serve in Bangalore
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#475569]">
              FlowCore Solutions supports Bangalore and Karnataka clients who
              need application-matched Berlington pump systems with local
              engineering response, catalogue guidance, and service continuity.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Commercial towers, hospitals, and campuses",
                "Water treatment plants, RO skids, and utility systems",
                "Factories, process plants, and industrial estates",
                "Fire fighting, HVAC, and pressure-boosting projects",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#1E5BB8]/10 bg-[#F8FAFC] p-5 text-base font-medium text-[#334155]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[#0F172A] p-8 text-white">
            <h2 className="text-3xl font-black tracking-tight">
              Berlington Pump Use Cases
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-white/78">
              <p>
                Use vertical multistage pumps for RO, WTP, and pressure
                boosting where compact design and stable pressure matter.
              </p>
              <p>
                Use circulation-oriented systems for HVAC projects where long
                operating hours and energy-aware sizing are critical.
              </p>
              <p>
                Use application-led pump selection for fire fighting projects
                where standby reliability and local support matter more than
                catalogue comparison alone.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/berlington-pumps-bangalore"
                className="rounded-xl bg-[#1E5BB8] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
              >
                Visit Berlington page
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
              >
                Read blog articles
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {homepageFaqs.map((faq) => (
              <FeaturedSnippetBlock
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[28px] border border-[#1E5BB8]/10 bg-[#F8FAFC] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#0F172A] md:text-4xl">
                  Need a Bangalore-based pump partner?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[#475569]">
                  Tell us the application, flow, head, and site location. We
                  will point you to the most relevant Berlington pump category
                  and help your team move faster from enquiry to quote.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#1E5BB8] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-md"
                >
                  Request a quote
                </Link>
                <Link
                  href="/products"
                  className="rounded-xl border border-[#0F172A]/12 bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-[#0F172A]"
                >
                  Browse products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection
        faqs={homepageFaqs}
        title="Homepage FAQs"
        tag="Buyer Questions"
      />
    </>
  );
}
