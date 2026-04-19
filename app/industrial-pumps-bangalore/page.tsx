import type { Metadata } from "next";
import CityLandingPage from "@/components/sections/local-seo/CityLandingPage";
import { industrialPumpsLandingConfig } from "@/lib/local-landing-pages";

export function generateMetadata(): Metadata {
  return {
    title: "Industrial Pumps Bangalore | Supplier & Dealer — FlowCore Solutions",
    description: "Source industrial pumps in Bangalore with FlowCore. Application-matched Berlington systems with local engineering response across Karnataka. Get a quote today.",
    alternates: {
      canonical: "/industrial-pumps-bangalore",
    },
    openGraph: {
      title: "Industrial Pumps Bangalore | Supplier & Dealer — FlowCore Solutions",
      description: "Source industrial pumps in Bangalore with FlowCore. Application-matched Berlington systems with local engineering response across Karnataka.",
      url: "https://flowcoresolutions.in/industrial-pumps-bangalore",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Industrial Pumps Bangalore" }],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcoresolutions.in/industrial-pumps-bangalore#organization",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in/industrial-pumps-bangalore",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Cheluva Complex, In front of Kottigepalya Bus Stop, Magadi Main Road, Kottingepalya",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560091",
    addressCountry: "IN",
  },
  areaServed: "Karnataka",
  telephone: "+918618885283",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://flowcoresolutions.in" },
    { "@type": "ListItem", position: 2, name: "Industrial Pumps Bangalore", item: "https://flowcoresolutions.in/industrial-pumps-bangalore" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industrial Pump Categories",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Centrifugal Pumps" },
    { "@type": "ListItem", position: 2, name: "Submersible Pumps" },
    { "@type": "ListItem", position: 3, name: "Monoblock Pumps" },
    { "@type": "ListItem", position: 4, name: "Fire Fighting Pumps" },
    { "@type": "ListItem", position: 5, name: "Chemical Pumps" },
    { "@type": "ListItem", position: 6, name: "Booster Pumps" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: industrialPumpsLandingConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function IndustrialPumpsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CityLandingPage config={industrialPumpsLandingConfig} />
    </>
  );
}
