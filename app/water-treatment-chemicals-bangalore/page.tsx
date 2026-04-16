import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Water Treatment Chemicals in Bangalore | FlowCore Solutions",
    description: "Flowchar water treatment chemicals in Bangalore. We offer specialized chemical solutions as secondary support for total system health.",
    alternates: { canonical: "/water-treatment-chemicals-bangalore" },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flowcore.in" },
    { "@type": "ListItem", "position": 2, "name": "Water Treatment Chemicals Bangalore", "item": "https://flowcore.in/water-treatment-chemicals-bangalore" }
  ]
};

export default function WaterTreatmentChemicalsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="flex-1 bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 uppercase tracking-tight">
            Water Treatment Chemicals in Bangalore
          </h1>
          <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
            While our primary expertise lies in authorized Berlington pump distribution, FlowCore Solutions also provides Flowchar water treatment chemicals as part of our total system health initiative for clients in Bangalore and Karnataka.
          </p>
          <div className="bg-[#F8FAFC] p-6 rounded-2xl mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-[#1E5BB8] mb-3">System Protection</h2>
            <p className="text-[#64748B]">
              Our chemical dosing solutions help prevent scaling and corrosion, indirectly extending the life and operational efficiency of your primary pump systems. 
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/berlington-pumps-bangalore" className="text-[#1E5BB8] font-bold hover:underline">
              &larr; Return to Core Pump Systems
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-[#6CC24A] font-bold hover:underline">
              Contact for Support
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
