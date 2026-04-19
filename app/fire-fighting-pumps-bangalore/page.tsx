import type { Metadata } from "next";
import CityLandingPage from "@/components/sections/local-seo/CityLandingPage";
import { fireFightingLandingConfig } from "@/lib/local-landing-pages";

export function generateMetadata(): Metadata {
  return {
    title: "Fire Fighting Pumps Bangalore | Systems & Supply — FlowCore Solutions",
    description: "FlowCore supplies Berlington fire fighting pump systems in Bangalore. Compliant with NBC and NFPA standards. Get compliant fire protection pumps today.",
    alternates: {
      canonical: "/fire-fighting-pumps-bangalore",
    },
    openGraph: {
      title: "Fire Fighting Pumps Bangalore | Systems & Supply — FlowCore Solutions",
      description: "Berlington fire fighting pump systems for Bangalore projects. NBC and NFPA compliant fire pump systems by FlowCore Solutions.",
      url: "https://flowcoresolutions.in/fire-fighting-pumps-bangalore",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Fire Fighting Pumps Bangalore" }],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcoresolutions.in/fire-fighting-pumps-bangalore#organization",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in/fire-fighting-pumps-bangalore",
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
    { "@type": "ListItem", position: 2, name: "Fire Fighting Pumps Bangalore", item: "https://flowcoresolutions.in/fire-fighting-pumps-bangalore" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Fire Fighting Pump Systems",
  description: "Complete NBC and NFPA compliant fire fighting pump solutions for Bangalore projects.",
  brand: {
    "@type": "Brand",
    name: "Berlington"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fireFightingLandingConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FireFightingPumpsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CityLandingPage config={fireFightingLandingConfig} />
    </>
  );
}
