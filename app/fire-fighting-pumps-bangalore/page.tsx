import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Fire Fighting Pumps in Bangalore | FlowCore Solutions",
    description: "Ensure facility safety with high-pressure fire fighting pumps in Bangalore. FlowCore Solutions supplies reliable Berlington fire pump systems across Karnataka.",
    alternates: { canonical: "/fire-fighting-pumps-bangalore" },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flowcore.in" },
    { "@type": "ListItem", "position": 2, "name": "Fire Fighting Pumps Bangalore", "item": "https://flowcore.in/fire-fighting-pumps-bangalore" }
  ]
};

export default function FireFightingPumpsBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="flex-1 bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-8 uppercase tracking-tight">
            Fire Fighting Pumps in Bangalore
          </h1>
          <p className="text-lg text-[#64748B] mb-6 leading-relaxed">
            When it comes to fire suppression, reliability is non-negotiable. FlowCore Solutions provides high-performance fire fighting pumps for commercial buildings, IT parks, and industrial facilities throughout Bangalore and Karnataka.
          </p>
          <div className="bg-[#F8FAFC] p-8 rounded-2xl mb-10 border border-gray-100 border-l-4 border-l-[#1E5BB8]">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Berlington Fire Suppression Systems</h2>
            <p className="text-[#64748B] leading-relaxed">
              We trust <strong>Berlington Pumps</strong> for critical fire safety applications. Their heavy-duty multistage and centrifugal systems are engineered to deliver immediate, high-pressure water flow exactly when emergencies strike. Designed for strict adherence to safety codes, Berlington fire pumps offer the peace of mind your infrastructure requires.
            </p>
          </div>
          <p className="text-lg text-[#64748B] mb-10 leading-relaxed">
            Our expert MEP team in Bangalore assists with proper pump sizing, selection, and specification to integrate seamlessly with your sprinkler and hydrant networks.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/berlington-pumps-bangalore">
              <button className="bg-transparent border-2 border-[#1E5BB8] text-[#1E5BB8] px-6 py-3 rounded-xl font-bold hover:bg-[#1E5BB8] hover:text-white transition-colors">
                Explore Berlington Range
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-[#1E5BB8] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0F3D91] transition-colors">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
