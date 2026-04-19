import type { Metadata } from "next";
import CityLandingPage from "@/components/sections/local-seo/CityLandingPage";
import { waterChemicalsLandingConfig } from "@/lib/local-landing-pages";

export function generateMetadata(): Metadata {
  return {
    title: "Water Treatment Chemicals Bangalore | Industrial Supplier — FlowCore",
    description: "FlowCore supplies water treatment chemicals for WTP, ETP, STP, cooling towers, and RO systems in Bangalore, Karnataka. Contact us for bulk supply and quotes.",
    alternates: {
      canonical: "/water-treatment-chemicals-bangalore",
    },
    openGraph: {
      title: "Water Treatment Chemicals Bangalore | Industrial Supplier — FlowCore",
      description: "FlowCore supplies water treatment chemicals for WTP, ETP, STP, cooling towers, and RO systems in Bangalore, Karnataka.",
      url: "https://flowcoresolutions.in/water-treatment-chemicals-bangalore",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Water Treatment Chemicals Bangalore" }],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcoresolutions.in/water-treatment-chemicals-bangalore#organization",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in/water-treatment-chemicals-bangalore",
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
    { "@type": "ListItem", position: 2, name: "Water Treatment Chemicals Bangalore", item: "https://flowcoresolutions.in/water-treatment-chemicals-bangalore" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Water Treatment Chemical Range",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Coagulants" },
    { "@type": "ListItem", position: 2, name: "Flocculants" },
    { "@type": "ListItem", position: 3, name: "Disinfectants" },
    { "@type": "ListItem", position: 4, name: "Scale Inhibitors" },
    { "@type": "ListItem", position: 5, name: "pH Adjusters" },
    { "@type": "ListItem", position: 6, name: "Biocides" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: waterChemicalsLandingConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function WaterTreatmentChemicalsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CityLandingPage config={waterChemicalsLandingConfig} />
    </>
  );
}
