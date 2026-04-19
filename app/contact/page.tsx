/**
 * Contact Page (/contact) — Server Component shell.
 *
 * All interactive form logic lives in ContactClient (a "use client" component).
 * Keeping this file as a Server Component allows Next.js to export `metadata`
 * and serve full HTML to Googlebot without JavaScript execution.
 */

import type { Metadata } from "next";
import ContactClient from "@/components/sections/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact FlowCore Solutions — Industrial Pump Inquiry, Bengaluru",
  description:
    "Contact FlowCore Solutions at our Bengaluru headquarters for industrial pump selection, MEP specification support, water treatment chemical inquiries, and lifecycle service. Call or email for a rapid engineering response.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact FlowCore Solutions — Industrial Pump & Water Treatment Inquiry",
    description:
      "Reach our Bengaluru engineering team for Berlington pump selection, Flowchar chemical treatment, MEP support, and 24/7 infrastructure servicing. Submit your technical inquiry today.",
    url: "https://flowcoresolutions.in/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact FlowCore Solutions — Bengaluru, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FlowCore Solutions — Industrial Pump Inquiry",
    description:
      "Reach our Bengaluru engineering team for pump selection, MEP support, and water treatment chemical inquiries.",
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
    "FlowCore Solutions provides industrial pump systems, water treatment chemicals, MEP specification support, and lifecycle pump servicing from our Bengaluru headquarters.",
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
