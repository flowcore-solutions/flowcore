/**
 * Products Page (/products) — Server Component shell.
 *
 * The interactive filter/grid logic lives in ProductsClient (a "use client" component).
 * Keeping this file as a Server Component allows Next.js to export `metadata` and
 * serve full HTML to Googlebot without JavaScript.
 */

import type { Metadata } from "next";
import ProductsClient from "@/components/sections/products/ProductsClient";

export const metadata: Metadata = {
  title: "Berlington Industrial Pump Catalogue — Vertical, Horizontal & Submersible",
  description:
    "Browse 16 ISO-certified Berlington pump series including vertical multistage CDL/CDLF, horizontal CHL/CHM, submersible WQ, and pipeline NISO models. Engineered for WTP, HVAC, and heavy industrial use. Distributed by FlowCore Solutions, Bengaluru.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Berlington Pump Catalogue — FlowCore Solutions",
    description:
      "16 ISO-certified pump series for water treatment, HVAC, irrigation, and industrial processing. AISI 304/316 stainless steel construction. Browse specs and request a quote.",
    url: "https://flowcoresolutions.in/products",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Berlington Industrial Pump Catalogue — FlowCore Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berlington Pump Catalogue — FlowCore Solutions",
    description:
      "16 ISO-certified pump series for WTP, HVAC, and industrial applications. Browse technical specs and request a quote.",
    images: ["/og-image.png"],
  },
};

const productCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Berlington Industrial Pump Catalogue",
  description:
    "ISO-certified industrial pump series distributed by FlowCore Solutions including vertical multistage, horizontal multistage, submersible, hydro booster, self-priming, and pipeline pumps.",
  url: "https://flowcoresolutions.in/products",
  numberOfItems: 16,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "CDL / CDLF Series — Vertical Multistage Pump",
      description:
        "Stainless steel vertical multistage pump. Flow rate 0.4–240 m³/h, max head 305 m. Suitable for WTP, HVAC, pressure boosting, and fire fighting.",
      url: "https://flowcoresolutions.in/products",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "CHL / CHLF Series — Horizontal Multistage Pump",
      description:
        "Horizontal multistage pump for clean water applications. Flow rate 0.5–20 m³/h, max head 88 m. Ideal for WTP and pressure boosting.",
      url: "https://flowcoresolutions.in/products",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "WQ Submersible Sewage Pump",
      description:
        "Heavy-duty submersible sewage pump. Flow rate 3–1800 m³/h, max head 66 m. For sewage treatment and industrial wastewater.",
      url: "https://flowcoresolutions.in/products",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "NISO End-Suction Centrifugal Pump",
      description:
        "Large-capacity end-suction centrifugal pump. Flow rate 3–1200 m³/h, max head 160 m. For WTP, HVAC, fire fighting, and industrial use.",
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
      name: "Are Berlington pumps ISO-certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all Berlington industrial pumps supplied by FlowCore Solutions are manufactured to ISO-certified standards. They utilize AISI 304 and 316 stainless steel for extreme durability in harsh industrial environments."
      }
    },
    {
      "@type": "Question",
      name: "What pump types does FlowCore Solutions offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a comprehensive range of Berlington pumps including vertical multistage, horizontal multistage, submersible, and centrifugal pumps designed for water treatment plants, HVAC, and industrial infrastructure."
      }
    },
    {
      "@type": "Question",
      name: "Do you provide pump selection and specification support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlowCore Solutions manages the entire life-cycle of your fluid systems. We provide technical consultancy, MEP specification support, and specialized pump selection to meet your exact flow and head requirements."
      }
    },
    {
      "@type": "Question",
      name: "What is Total System Health?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total System Health is our life-cycle commitment combining on-site technical support for Berlington pumps with Flowchar's chemical synergy audits to proactively prevent equipment failure and ensure 24/7 infrastructure operation."
      }
    }
  ]
};

import FAQSection from "@/components/ui/FAQSection";

const PRODUCT_FAQS = [
  {
    question: "Are Berlington pumps ISO-certified?",
    answer: "Yes, all Berlington industrial pumps supplied by FlowCore Solutions are manufactured to ISO-certified standards. They utilize AISI 304 and 316 stainless steel for extreme durability in harsh industrial environments."
  },
  {
    question: "What pump types does FlowCore Solutions offer?",
    answer: "We offer a comprehensive range of Berlington pumps including vertical multistage, horizontal multistage, submersible, and centrifugal pumps designed for water treatment plants, HVAC, and industrial infrastructure."
  },
  {
    question: "Do you provide pump selection and specification support?",
    answer: "Yes. FlowCore Solutions manages the entire life-cycle of your fluid systems. We provide technical consultancy, MEP specification support, and specialized pump selection to meet your exact flow and head requirements."
  },
  {
    question: "What is Total System Health?",
    answer: "Total System Health is our life-cycle commitment combining on-site technical support for Berlington pumps with Flowchar's chemical synergy audits to proactively prevent equipment failure and ensure 24/7 infrastructure operation."
  }
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
      <FAQSection faqs={PRODUCT_FAQS} title="Frequently Asked Questions" />
    </>
  );
}
