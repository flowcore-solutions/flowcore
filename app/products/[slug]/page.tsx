import { notFound } from "next/navigation";
import { PUMP_CATALOG, getPumpById } from "@/lib/pump-data";
import type { Metadata } from "next";
import ProductClientWrapper from "./ProductClientWrapper";

export async function generateStaticParams() {
  return PUMP_CATALOG.map((pump) => ({
    slug: pump.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const pump = getPumpById(resolvedParams.slug);
  
  if (!pump) {
    return {};
  }

  return {
    title: `${pump.fullName} | Berlington Pumps Bangalore`,
    description: `FlowCore Solutions is a trusted Berlington Pump supplier in Bangalore. Learn more about the ${pump.fullName} with flow rates of ${pump.flowRate} and max head of ${pump.maxHead}. Servicing across Karnataka.`,
    alternates: {
      canonical: `/products/${pump.id}`,
    },
    openGraph: {
      title: `${pump.fullName} | Berlington Pumps Bangalore`,
      description: `FlowCore Solutions is a trusted Berlington Pump supplier in Bangalore. Learn more about the ${pump.fullName} with flow rates of ${pump.flowRate} and max head of ${pump.maxHead}.`,
      images: [
        {
          url: pump.imagePath,
          width: 800,
          height: 800,
          alt: pump.fullName,
        }
      ],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pump = getPumpById(resolvedParams.slug);

  if (!pump) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pump.fullName,
    sku: pump.id.toUpperCase(),
    url: `https://flowcoresolutions.in/products/${pump.id}`,
    image: [`https://flowcoresolutions.in${pump.imagePath}`],
    description: `${pump.fullName} by Berlington with flow rate ${pump.flowRate}, max head ${pump.maxHead}, and applications across ${pump.summaryApplications.join(", ")}.`,
    brand: {
      "@type": "Brand",
      name: "Berlington",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Berlington",
    },
    category: pump.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.8",
          bestRating: "5",
        },
        author: {
          "@type": "Organization",
          name: "FlowCore Solutions Engineering Team",
        },
        reviewBody: `The ${pump.fullName} delivers consistent performance across ${pump.summaryApplications[0]} and ${pump.summaryApplications[1]} applications. Flow range of ${pump.flowRate} and operating temperature up to ${pump.temperature} make it well-suited for Karnataka industrial environments.`,
      },
    ],
    additionalProperty: [
      { "@type": "PropertyValue", name: "Flow Rate", value: pump.flowRate },
      { "@type": "PropertyValue", name: "Max Head", value: pump.maxHead },
      { "@type": "PropertyValue", name: "Power Range", value: pump.powerRange },
      { "@type": "PropertyValue", name: "Temperature", value: pump.temperature },
      { "@type": "PropertyValue", name: "Voltage", value: pump.voltage },
      { "@type": "PropertyValue", name: "Material", value: pump.material },
    ],
    offers: {
      "@type": "Offer",
      url: `https://flowcoresolutions.in/products/${pump.id}`,
      priceCurrency: "INR",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "0",
        priceCurrency: "INR",
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "FlowCore Solutions",
        url: "https://flowcoresolutions.in",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: "0",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
          addressRegion: ["KA", "TN", "AP", "MH"],
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductClientWrapper pump={pump} />
    </>
  );
}
