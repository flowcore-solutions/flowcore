import type { Metadata } from "next";
import ProductsClient from "@/components/sections/products/ProductsClient";
import FAQSection from "@/components/ui/FAQSection";

export const metadata: Metadata = {
  title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
  description:
    "Centrifugal, multistage, submersible, booster, and fire pumps in Bengaluru for RO plants, HVAC circulation, STP and ETP duty, pressure boosting, and plant utility water.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
    description:
      "Pump range for water treatment, HVAC, pressure boosting, fire systems, sewage transfer, and factory utilities. Browse the range and get a quote.",
    url: "https://flowcoresolutions.in/products",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Industrial Pump Range - FlowCore Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
    description:
      "Pump range for RO, HVAC, STP, pressure boosting, and utility water duty in Bengaluru.",
    images: ["/og-image.png"],
  },
};

const productCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industrial Pump Range",
  description:
    "Pump range from FlowCore Solutions including vertical multistage, horizontal multistage, submersible, booster, self-priming, and pipeline pumps.",
  url: "https://flowcoresolutions.in/products",
  numberOfItems: 16,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "CDL / CDLF Series - Vertical Multistage Pump",
      description:
        "Vertical multistage pump for RO feed, pressure boosting, HVAC, and treated water duty.",
      url: "https://flowcoresolutions.in/products",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "CHL / CHLF Series - Horizontal Multistage Pump",
      description:
        "Horizontal multistage pump for clean water transfer, treatment lines, and pressure duty.",
      url: "https://flowcoresolutions.in/products",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "WQ Submersible Sewage Pump",
      description:
        "Submersible sewage pump for STP duty, wastewater transfer, and dirty-water handling.",
      url: "https://flowcoresolutions.in/products",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "NISO End-Suction Centrifugal Pump",
      description:
        "End-suction centrifugal pump for HVAC circulation, utility transfer, fire duty, and general industrial use.",
      url: "https://flowcoresolutions.in/products",
    },
  ],
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
      name: "Products",
      item: "https://flowcoresolutions.in/products",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What pump types does FlowCore supply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlowCore supplies centrifugal, multistage, submersible, booster, fire, and chemical-duty pumps for water treatment plants, HVAC circulation, pressure boosting, sewage transfer, and factory utility duty.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide pump selection and specification support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Share the required flow, head, liquid, operating hours, and site condition. FlowCore will help shortlist the pump family for the job.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support installation and AMC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlowCore supports supply, installation planning, AMC discussions, spare parts, and breakdown response.",
      },
    },
  ],
};

const PRODUCT_FAQS = [
  {
    question: "What pump types does FlowCore supply?",
    answer:
      "FlowCore supplies centrifugal, multistage, submersible, booster, fire, and chemical-duty pumps for water treatment plants, HVAC circulation, pressure boosting, sewage transfer, and factory utility duty.",
  },
  {
    question: "Do you provide pump selection and specification support?",
    answer:
      "Yes. Share the required flow, head, liquid, operating hours, and site condition. FlowCore will help shortlist the pump family for the job.",
  },
  {
    question: "Do you support installation and AMC?",
    answer:
      "Yes. FlowCore supports supply, installation planning, AMC discussions, spare parts, and breakdown response.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCollectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductsClient />
      <FAQSection faqs={PRODUCT_FAQS} title="Common Questions" />
    </>
  );
}
