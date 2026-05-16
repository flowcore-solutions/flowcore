import type { Metadata } from "next";
import ContactClient from "@/components/sections/contact/ContactClient";

export const metadata: Metadata = {
  title: "Pump Quotes, AMC and Breakdown Support in Bengaluru",
  description:
    "Contact FlowCore Solutions in Bengaluru for pump quotes, site visits, AMC, spare parts, installation support, and breakdown response.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Pump Quotes, AMC and Breakdown Support in Bengaluru",
    description:
      "Reach FlowCore in Bengaluru for pump supply, site visits, AMC, spare parts, and breakdown response.",
    url: "https://flowcoresolutions.in/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact FlowCore Solutions - Bengaluru, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pump Quotes, AMC and Breakdown Support in Bengaluru",
    description:
      "Reach FlowCore in Bengaluru for pump supply, site visits, AMC, spare parts, and breakdown response.",
    images: ["/og-image.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcoresolutions.in/#localbusiness",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in",
  telephone: "+918618885283",
  email: "flowcoresolutionsblr@gmail.com",
  description:
    "FlowCore Solutions provides pump supply, water treatment support, installation planning, AMC, and breakdown service from Bengaluru.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Cheluva Complex, In front of Kottigepalya Bus Stop, Magadi Main Road, Kottingepalya",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560091",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  hasMap: "https://www.google.com/maps?q=12.9716,77.5946",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceArea: {
    "@type": "AdministrativeArea",
    name: "India",
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
      name: "Contact",
      item: "https://flowcoresolutions.in/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}
