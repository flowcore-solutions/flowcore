import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { APPLICATION_ENVIRONMENTS } from "@/lib/application-data";
import ApplicationsHeader from "@/components/sections/applications/ApplicationsHeader";

const ApplicationEnvironmentSection = dynamic(() => import("@/components/sections/applications/ApplicationEnvironmentSection"), {
  ssr: true,
});
const ApplicationsCTA = dynamic(() => import("@/components/sections/applications/ApplicationsCTA"), {
  ssr: true,
});
const FAQSection = dynamic(() => import("@/components/ui/FAQSection"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "Pump Applications for RO, HVAC and STP in Bengaluru",
  description:
    "Pump applications for RO plants, water treatment, HVAC circulation, STP and ETP transfer, fire systems, and industrial utility water in Bengaluru.",
  alternates: {
    canonical: "/applications",
  },
  openGraph: {
    title: "Pump Applications for RO, HVAC and STP in Bengaluru",
    description:
      "Application guide for pumps used in water treatment, HVAC, sewage transfer, fire systems, and industrial utility water.",
    url: "https://flowcoresolutions.in/applications",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions - Pump Applications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pump Applications for RO, HVAC and STP in Bengaluru",
    description:
      "Application guide for pumps used in RO plants, HVAC lines, STP transfer, and industrial utility water.",
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
      name: "Applications",
      item: "https://flowcoresolutions.in/applications",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What pumps are used in water treatment plants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Water treatment plants commonly use vertical multistage pumps for pressure duty, end-suction pumps for transfer duty, and chemical-compatible pumps where dosing or treatment chemicals are involved.",
      },
    },
    {
      "@type": "Question",
      name: "Which pumps are used for HVAC circulation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HVAC systems commonly use inline circulation pumps and end-suction pumps for chilled water, condenser water, and cooling tower duty.",
      },
    },
    {
      "@type": "Question",
      name: "What pump is used for sewage and wastewater?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Submersible sewage pumps are commonly used for wastewater transfer, wet wells, and STP duty because they handle dirty water better than clean-water pump types.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support installation, AMC, and breakdown service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlowCore supports supply, installation planning, AMC discussions, spare parts, and breakdown response for pump systems.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help with chemical dosing and chemical-duty pump applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlowCore supports chemical-duty pump selection and dosing-related applications after checking the liquid, concentration, temperature, and material requirement.",
      },
    },
  ],
};

const APPLICATIONS_FAQS = [
  {
    question: "What pumps are used in water treatment plants?",
    answer:
      "Water treatment plants commonly use vertical multistage pumps for pressure duty, end-suction pumps for transfer duty, and chemical-compatible pumps where dosing or treatment chemicals are involved.",
  },
  {
    question: "Which pumps are used for HVAC circulation?",
    answer:
      "HVAC systems commonly use inline circulation pumps and end-suction pumps for chilled water, condenser water, and cooling tower duty.",
  },
  {
    question: "What pump is used for sewage and wastewater?",
    answer:
      "Submersible sewage pumps are commonly used for wastewater transfer, wet wells, and STP duty because they handle dirty water better than clean-water pump types.",
  },
  {
    question: "Do you support installation, AMC, and breakdown service?",
    answer:
      "Yes. FlowCore supports supply, installation planning, AMC discussions, spare parts, and breakdown response for pump systems.",
  },
  {
    question: "Can you help with chemical dosing and chemical-duty pump applications?",
    answer:
      "Yes. FlowCore supports chemical-duty pump selection and dosing-related applications after checking the liquid, concentration, temperature, and material requirement.",
  },
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
          <ApplicationEnvironmentSection key={env.id} env={env} index={i} />
        ))}

        <FAQSection faqs={APPLICATIONS_FAQS} title="Application Questions" />
      </main>

      <ApplicationsCTA />
    </div>
  );
}
