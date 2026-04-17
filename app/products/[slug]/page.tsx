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

  return <ProductClientWrapper pump={pump} />;
}
