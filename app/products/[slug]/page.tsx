import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PUMP_CATALOG, getPumpById } from "@/lib/pump-data";
import type { Metadata } from "next";

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
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pump = getPumpById(resolvedParams.slug);

  if (!pump) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": pump.fullName,
    "image": `https://flowcore.in${pump.imagePath}`,
    "description": `Berlington ${pump.fullName} industrial pump. Flow rate: ${pump.flowRate}, Max head: ${pump.maxHead}. Supplied in Bangalore by FlowCore Solutions.`,
    "brand": {
      "@type": "Brand",
      "name": "Berlington Pumps"
    },
    "category": pump.category,
    "offers": {
      "@type": "Offer",
      "url": `https://flowcore.in/products/${pump.id}`,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "FlowCore Solutions"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="flex-1 bg-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Breadcrumb Navigation Here */}
          <div className="text-sm text-[#64748B] mb-8 flex items-center gap-2">
             <Link href="/" className="hover:text-[#1E5BB8]">Home</Link>
             <span>/</span>
             <Link href="/products" className="hover:text-[#1E5BB8]">Products</Link>
             <span>/</span>
             <span className="font-semibold text-[#0F172A]">{pump.fullName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Column */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 flex items-center justify-center border border-gray-100 h-[400px] lg:h-[600px] relative">
               <Image
                 src={pump.imagePath}
                 alt={`${pump.fullName} - Berlington Pump`}
                 fill
                 className="object-contain p-8 drop-shadow-xl"
               />
               <div className="absolute top-6 left-6">
                  <span className="bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1E5BB8] rounded-full border border-gray-200">
                    {pump.category}
                  </span>
               </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col justify-center">
              <span className="text-[#6CC24A] font-bold tracking-widest uppercase text-sm mb-3">Berlington Model</span>
              <h1 className="text-4xl text-[#0F172A] font-bold mb-6 tracking-tight leading-tight">{pump.fullName}</h1>
              
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
                As an authorized Berlington Pump supplier in Bangalore, FlowCore Solutions provides the complete <strong>{pump.seriesCode}</strong> series, designed for absolute reliability and high efficiency in industrial facilities across Karnataka. 
              </p>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 mb-8">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Technical Specifications</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <dt className="text-[#64748B] mb-1">Flow Rate</dt>
                    <dd className="font-semibold text-[#0F172A]">{pump.flowRate}</dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] mb-1">Max Head</dt>
                    <dd className="font-semibold text-[#0F172A]">{pump.maxHead}</dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] mb-1">Power Range</dt>
                    <dd className="font-semibold text-[#0F172A]">{pump.powerRange}</dd>
                  </div>
                   <div>
                    <dt className="text-[#64748B] mb-1">Temperature</dt>
                    <dd className="font-semibold text-[#0F172A]">{pump.temperature}</dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] mb-1">Material</dt>
                    <dd className="font-semibold text-[#0F172A]">{pump.material}</dd>
                  </div>
                  <div>
                    <dt className="text-[#64748B] mb-1">Connections</dt>
                    <dd className="font-semibold text-[#0F172A]">{pump.connections}</dd>
                  </div>
                </dl>
              </div>

              <div className="mb-10">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Primary Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {pump.applications.map((app) => (
                    <span key={app} className="bg-white border border-[#1E5BB8]/20 text-[#1E5BB8] px-3 py-1.5 rounded-full text-xs font-semibold">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full bg-[#1E5BB8] hover:bg-[#0F3D91] text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-md">
                    Request Berlington Quote
                  </button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <button className="w-full bg-white border-2 border-gray-200 text-[#0F172A] hover:border-[#1E5BB8] hover:text-[#1E5BB8] px-6 py-4 rounded-xl font-bold transition-all">
                    View All Models
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
