/**
 * Applications Page (/applications)
 *
 * Refactored to use modular components for better maintainability.
 */

import type { Metadata } from "next";
import { APPLICATION_ENVIRONMENTS } from "@/lib/application-data";
import ApplicationsHeader from "@/components/sections/applications/ApplicationsHeader";
import ApplicationEnvironmentSection from "@/components/sections/applications/ApplicationEnvironmentSection";
import ApplicationsCTA from "@/components/sections/applications/ApplicationsCTA";

export const metadata: Metadata = {
  title: "Industrial Pump Applications — WTP, HVAC & Sewage Treatment | FlowCore",
  description:
    "Explore Berlington pump applications for water treatment plants (WTP), HVAC circulation, sewage & wastewater processing, fire fighting systems, and industrial fluid transfer. FlowCore Solutions provides technical integration diagrams and engineering specification support across all environments.",
  alternates: {
    canonical: "/applications",
  },
  openGraph: {
    title: "Industrial Pump Applications — WTP, HVAC & Sewage Systems | FlowCore",
    description:
      "Technical integration diagrams for Berlington pumps in water treatment, HVAC, sewage, fire fighting, and industrial applications. ISO-certified systems with Flowchar chemical treatment synergy.",
    url: "https://flowcore.in/applications",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions — Industrial Pump Application Environments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Pump Applications — WTP, HVAC & Sewage | FlowCore",
    description:
      "Technical diagrams and specifications for Berlington pump systems across WTP, HVAC, sewage treatment, and industrial applications.",
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
      name: "Applications",
      item: "https://flowcore.in/applications",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of pumps are suitable for Water Treatment Plants (WTP)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For water treatment plants, Berlington vertical multistage pumps (CDL/CDLF series) and end-suction centrifugal pumps (NISO series) are most suitable. They handle flow rates from 0.4 to 1200 m³/h with ISO-certified stainless steel construction to prevent contamination. Flowchar scale inhibitors are used alongside these pumps to prevent mineral buildup and extend operational life.",
      },
    },
    {
      "@type": "Question",
      name: "Which Berlington pumps are used for HVAC circulation systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HVAC systems use Berlington CHL/CHLF horizontal multistage pumps and LD vertical inline circulation pumps. These operate at -15°C to +120°C, making them suitable for both chilled water and hot water HVAC circuits. The HYDRO variable speed system is also used for pressure-regulated HVAC applications.",
      },
    },
    {
      "@type": "Question",
      name: "What pump is best for sewage and wastewater applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Berlington WQ submersible sewage pump is purpose-built for sewage and wastewater. With flow rates up to 1800 m³/h and cast iron/stainless steel construction, it handles solids-laden effluent in municipal and industrial sewage treatment plants. The BT side channel blower is used for aeration in wastewater treatment.",
      },
    },
    {
      "@type": "Question",
      name: "How does FlowCore Solutions support pump lifecycle and maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCore Solutions provides Total System Health services: on-site technical support, rapid repair response, preventive maintenance scheduling, and Flowchar chemical synergy audits. Our relationship with clients continues 24/7 after delivery to ensure infrastructure remains operational and prevent equipment failure through proactive chemical treatment.",
      },
    },
    {
      "@type": "Question",
      name: "Can Berlington pumps handle chemical transfer applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SZ Fluorine Chemical Pump (FEP/PVDF lined) handles aggressive chemicals at -20°C to +120°C with flow rates up to 60 m³/h. For standard chemical transfer, the ZS single-stage centrifugal pump with stainless steel construction is appropriate. Flowchar chemical compatibility audits are recommended before specifying pump materials.",
      },
    },
  ],
};

import FAQSection from "@/components/ui/FAQSection";

const APPLICATIONS_FAQS = [
  {
    question: "What types of pumps are suitable for Water Treatment Plants (WTP)?",
    answer: "For water treatment plants, Berlington vertical multistage pumps (CDL/CDLF series) and end-suction centrifugal pumps (NISO series) are most suitable. They handle flow rates from 0.4 to 1200 m³/h with ISO-certified stainless steel construction to prevent contamination. Flowchar scale inhibitors are used alongside these pumps to prevent mineral buildup and extend operational life."
  },
  {
    question: "Which Berlington pumps are used for HVAC circulation systems?",
    answer: "HVAC systems use Berlington CHL/CHLF horizontal multistage pumps and LD vertical inline circulation pumps. These operate at -15°C to +120°C, making them suitable for both chilled water and hot water HVAC circuits. The HYDRO variable speed system is also used for pressure-regulated HVAC applications."
  },
  {
    question: "What pump is best for sewage and wastewater applications?",
    answer: "The Berlington WQ submersible sewage pump is purpose-built for sewage and wastewater. With flow rates up to 1800 m³/h and cast iron/stainless steel construction, it handles solids-laden effluent in municipal and industrial sewage treatment plants. The BT side channel blower is used for aeration in wastewater treatment."
  },
  {
    question: "How does FlowCore Solutions support pump lifecycle and maintenance?",
    answer: "FlowCore Solutions provides Total System Health services: on-site technical support, rapid repair response, preventive maintenance scheduling, and Flowchar chemical synergy audits. Our relationship with clients continues 24/7 after delivery to ensure infrastructure remains operational and prevent equipment failure through proactive chemical treatment."
  },
  {
    question: "Can Berlington pumps handle chemical transfer applications?",
    answer: "Yes. The SZ Fluorine Chemical Pump (FEP/PVDF lined) handles aggressive chemicals at -20°C to +120°C with flow rates up to 60 m³/h. For standard chemical transfer, the ZS single-stage centrifugal pump with stainless steel construction is appropriate. Flowchar chemical compatibility audits are recommended before specifying pump materials."
  }
];

export default function ApplicationsPage() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ApplicationsHeader />

      <main id="main-environments">
        {APPLICATION_ENVIRONMENTS.map((env, i) => (
          <ApplicationEnvironmentSection
            key={env.id}
            env={env}
            index={i}
          />
        ))}
        
        <FAQSection faqs={APPLICATIONS_FAQS} title="Application FAQs" />
      </main>

      <ApplicationsCTA />
    </div>
  );
}
