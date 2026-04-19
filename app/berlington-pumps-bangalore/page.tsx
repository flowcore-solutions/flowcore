import type { Metadata } from "next";
import CityLandingPage from "@/components/sections/local-seo/CityLandingPage";
import { berlingtonLandingConfig } from "@/lib/local-landing-pages";

export function generateMetadata(): Metadata {
  return {
    title: "Berlington Pumps Bangalore | Authorised Supplier — FlowCore Solutions",
    description: "FlowCore Solutions supplies genuine Berlington industrial pumps for builders, OEMs, consultants, and maintenance teams across Bangalore. Get a quote today.",
    alternates: {
      canonical: "/berlington-pumps-bangalore",
    },
    openGraph: {
      title: "Berlington Pumps Bangalore | Authorised Supplier — FlowCore Solutions",
      description: "FlowCore Solutions supplies genuine Berlington industrial pumps for builders, OEMs, consultants, and maintenance teams across Bangalore.",
      url: "https://flowcoresolutions.in/berlington-pumps-bangalore",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Berlington Pumps Bangalore" }],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcoresolutions.in/berlington-pumps-bangalore#organization",
  name: "FlowCore Solutions",
  brand: "Berlington Pumps",
  url: "https://flowcoresolutions.in/berlington-pumps-bangalore",
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
    { "@type": "ListItem", position: 2, name: "Berlington Pumps Bangalore", item: "https://flowcoresolutions.in/berlington-pumps-bangalore" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Berlington Industrial Pumps",
  description: "Complete range of Berlington pumps available in Bangalore, Karnataka.",
  brand: {
    "@type": "Brand",
    name: "Berlington"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: berlingtonLandingConfig.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function BerlingtonPumpsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CityLandingPage config={berlingtonLandingConfig} />
    </>
  );
}
