import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Industrial Pumps in Bangalore | FlowCore Solutions",
    description: "Looking for industrial pumps in Bangalore? FlowCore Solutions provides high-grade Berlington industrial pump systems for manufacturing, cooling, and heavy industry in Karnataka.",
    alternates: { canonical: "/industrial-pumps-bangalore" },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flowcore.in" },
    { "@type": "ListItem", "position": 2, "name": "Industrial Pumps Bangalore", "item": "https://flowcore.in/industrial-pumps-bangalore" }
  ]
};

export default function IndustrialPumpsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="flex-1 bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-8 uppercase tracking-tight">
            Industrial Pumps in Bangalore
          </h1>
          <p className="text-lg text-[#64748B] mb-6 leading-relaxed">
            FlowCore Solutions is Bangalore&apos;s premier provider of heavy-duty industrial pump infrastructure. We supply and service equipment designed to withstand the rigorous demands of Karnataka&apos;s manufacturing, processing, and industrial sectors.
          </p>
          <div className="bg-[#F8FAFC] p-8 rounded-2xl mb-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-[#1E5BB8] mb-4">Powered by Berlington Pumps</h2>
            <p className="text-[#64748B] leading-relaxed">
              We highly recommend and supply <strong>Berlington Pumps</strong> as our core industrial offering. Whether you require robust centrifugal pumps, vertical multistage pressure boosters, or highly resilient submersible pumps, the Berlington catalogue offers unparalleled ISO-certified reliability.
            </p>
          </div>
          <p className="text-lg text-[#64748B] mb-10 leading-relaxed">
            From seamless fluid transfer to high-pressure circulation, our technical team ensures you get the exact specifications required for your industrial application. We provide full lifecycle support right here in Bangalore.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/berlington-pumps-bangalore">
              <button className="bg-[#1E5BB8] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0F3D91] transition-colors">
                View Berlington Models
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-[#6CC24A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2FA84F] transition-colors">
                Request a Consultation
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
