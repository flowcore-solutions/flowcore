import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/home/HeroSection";

const FeaturedPumpsGrid = dynamic(() => import("@/components/sections/home/FeaturedPumpsGrid"), {
  ssr: true,
});
const PartnerSynergy = dynamic(() => import("@/components/sections/home/PartnerSynergy"), {
  ssr: true,
});
const ApplicationShowcase = dynamic(() => import("@/components/sections/home/ApplicationShowcase"), {
  ssr: true,
});
const TechnicalServices = dynamic(() => import("@/components/sections/home/TechnicalServices"), {
  ssr: true,
});
const FAQSection = dynamic(() => import("@/components/ui/FAQSection"), {
  ssr: true,
});

export function generateMetadata(): Metadata {
  return {
    title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
    description:
      "Centrifugal, multistage, submersible, booster, and fire pumps in Bengaluru for RO plants, STP/ETP systems, HVAC circulation, pressure boosting, and breakdown support.",
    keywords: [
      "industrial pumps Bengaluru",
      "centrifugal pumps Bengaluru",
      "booster pumps Bengaluru",
      "RO plant pumps Bengaluru",
      "STP pumps Bengaluru",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: "https://flowcoresolutions.in",
      title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
      description:
        "Centrifugal, multistage, submersible, booster, and fire pumps in Bengaluru for water treatment and building services.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Industrial Pumps and Water Treatment in Bengaluru",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
      description:
        "Centrifugal, multistage, submersible, booster, and fire pumps in Bengaluru for water treatment and building services.",
      images: ["/og-image.png"],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://flowcoresolutions.in/#organization",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in",
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
  description: "FlowCore Solutions supplies industrial pumps and water treatment systems in Bengaluru.",
};

const homepageFaqs = [
  {
    question: "What pump applications does FlowCore support in Bengaluru?",
    answer:
      "We support RO feed, STP and ETP transfer, HVAC circulation, pressure boosting, fire pump duty, chemical dosing, and general utility water applications in Bengaluru.",
  },
  {
    question: "What pump types do you supply?",
    answer:
      "We supply centrifugal, vertical multistage, horizontal multistage, submersible, booster, fire, and chemical-duty pumps based on the required flow, head, and liquid condition.",
  },
  {
    question: "Do you provide installation and AMC support?",
    answer:
      "Yes. We support supply, installation, AMC planning, spare parts, and breakdown response for pump systems in Bengaluru and nearby project locations.",
  },
];

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">Industrial pumps and water treatment systems in Bengaluru</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <HeroSection />
      <FeaturedPumpsGrid />
      <PartnerSynergy />
      <ApplicationShowcase />
      <TechnicalServices />
      <FAQSection faqs={homepageFaqs} title="Common Questions" tag="Pump and Service" />
    </>
  );
}
