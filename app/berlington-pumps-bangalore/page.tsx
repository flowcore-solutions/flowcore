import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/ui/FAQSection";
import FeaturedSnippetBlock from "@/components/ui/FeaturedSnippetBlock";

export function generateMetadata(): Metadata {
  return {
    title: "Berlington Pumps Dealer in Bangalore | FlowCore Solutions",
    description: "FlowCore Solutions is the authorized Berlington Pumps dealer in Bangalore, offering industrial pump systems for WTP, HVAC, and Fire Fighting across Karnataka.",
    keywords: [
      "Berlington Pumps Bangalore",
      "Berlington Pump Dealer Karnataka",
      "industrial pumps Bangalore",
      "water treatment pumps",
      "HVAC pumps Bangalore"
    ],
    alternates: {
      canonical: "/berlington-pumps-bangalore",
    },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://flowcore.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Berlington Pumps Bangalore",
      "item": "https://flowcore.in/berlington-pumps-bangalore"
    }
  ]
};

const landingFaqs = [
  {
    question: "What are Berlington pumps used for?",
    answer:
      "Berlington pumps are used in Bangalore for fire fighting, HVAC circulation, WTP and RO systems, pressure boosting, and industrial utility water duties where reliable performance and local service access are important.",
  },
  {
    question: "Where can I buy Berlington pumps in Bangalore?",
    answer:
      "FlowCore Solutions supplies Berlington pumps in Bangalore and supports Karnataka projects with model selection, commercial response, and lifecycle service support.",
  },
  {
    question: "Do you support industrial pump selection for Karnataka projects?",
    answer:
      "Yes. FlowCore Solutions helps contractors, consultants, and facility teams match the correct Berlington pump family to the application, duty condition, and service requirement.",
  },
];

const landingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingFaqs.map((faq) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingFaqSchema) }}
      />
      <main className="flex-1 bg-[#F8FAFC]">
        {/* Header Section */}
        <section className="bg-[#0F3D91] relative py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
              Berlington Pumps
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              FlowCore Solutions is your authorized partner for industrial Berlington Pump systems across Bangalore and Karnataka.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 space-y-16">
            
            {/* Authorized Supplier */}
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#1E5BB8] pl-4">
                Authorized Berlington Pump Supplier
              </h2>
              <p className="text-[#64748B] leading-relaxed text-lg mb-4">
                As a leading authorized Berlington Pumps dealer in Bangalore, FlowCore Solutions provides critical fluid handling infrastructure for the industrial sector. Our partnership ensures you receive genuine, ISO-certified vertical multistage, horizontal, and submersible pumps designed to endure the most demanding environments in Karnataka.
              </p>
              <p className="text-[#64748B] leading-relaxed text-lg">
                We bridge the gap between world-class engineering and local industrial requirements, offering direct access to the full Berlington catalogue right here in Bangalore.
              </p>
              <div className="mt-6">
                <Link href="/products" className="text-[#1E5BB8] font-bold hover:underline inline-flex items-center gap-2">
                  Explore Berlington Models &rarr;
                </Link>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Industrial Applications in Bangalore</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1E5BB8] mb-3">Fire Fighting Systems</h3>
                  <p className="text-[#64748B]">High-pressure Berlington pumps designed for NFPA compliance, ensuring robust fire suppression for commercial and industrial facilities in Bangalore.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E5BB8] mb-3">HVAC Circulation</h3>
                  <p className="text-[#64748B]">Energy-efficient centrifugal pumps seamlessly integrating with cooling towers and chillers for massive IT parks and factories across Karnataka.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E5BB8] mb-3">Water Treatment (WTP)</h3>
                  <p className="text-[#64748B]">Stainless steel vertical multistage pumps essential for RO plants, filtration systems, and municipal water supply operations.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E5BB8] mb-3">Heavy Industrial</h3>
                  <p className="text-[#64748B]">Chemical transfer and high-volume sewage submersible pumps tailored for manufacturing zones and heavy industrial waste management.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <FeaturedSnippetBlock
                question="What are Berlington pumps used for?"
                answer="Berlington pumps are used for fire fighting, HVAC circulation, WTP and RO systems, pressure boosting, and industrial utility water duties across Bangalore projects."
              />
              <FeaturedSnippetBlock
                question="Where can I buy Berlington pumps in Bangalore?"
                answer="FlowCore Solutions supplies Berlington pumps in Bangalore and supports Karnataka buyers with product matching, local response, and service support."
              />
            </div>

            <div className="bg-[#0F172A] text-white p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6">Industries We Serve in Bangalore</h2>
              <div className="grid gap-4 md:grid-cols-2 text-white/80">
                {[
                  "Commercial campuses and high-rise utilities",
                  "Hospitals, institutions, and public infrastructure",
                  "Factories, process plants, and utility rooms",
                  "Water treatment, RO, STP, and fire protection packages",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Berlington Pump Use Cases</h2>
              <div className="space-y-5 text-lg leading-8 text-[#64748B]">
                <p>
                  Use stainless steel multistage pumps for WTP, RO, and utility
                  water systems where pressure stability and corrosion
                  resistance matter.
                </p>
                <p>
                  Use circulation-focused pump systems for HVAC projects where
                  long operating hours, stable flow, and efficient sizing are
                  critical.
                </p>
                <p>
                  Use locally supported pump selection for fire fighting systems
                  where duty accuracy, standby readiness, and breakdown response
                  have direct operational consequences.
                </p>
              </div>
            </div>

            {/* Service & Maintenance */}
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#6CC24A] pl-4">
                Expert Service & Maintenance
              </h2>
              <p className="text-[#64748B] leading-relaxed text-lg mb-4">
                Supplying the best hardware is only the beginning. FlowCore Solutions operates a comprehensive service and maintenance division dedicated to Berlington pumps in Bangalore. Our Total System Health approach includes MEP specification support, preventative maintenance contracts, and rapid-response breakdown servicing.
              </p>
              <p className="text-[#64748B] leading-relaxed text-lg">
                Downtime is not an option for your plant. Our Karnataka-based technicians ensure your fluid infrastructure operates at peak efficiency year-round.
              </p>
            </div>

            {/* Why FlowCore & Service Area */}
            <div className="bg-[#0F172A] text-white p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6">Why FlowCore Solutions?</h2>
              <ul className="space-y-4 mb-8 text-white/80">
                <li className="flex items-start gap-3">
                  <span className="text-[#6CC24A] mt-1">✓</span>
                  <span><strong>Specialized Focus:</strong> Berlington pumps represent 90% of our core business operations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6CC24A] mt-1">✓</span>
                  <span><strong>Local Expertise:</strong> Deep understanding of Bangalore&apos;s industrial and commercial infrastructure needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6CC24A] mt-1">✓</span>
                  <span><strong>Complete Lifecycle:</strong> From selection and installation guidance to genuine spare parts and repairs.</span>
                </li>
              </ul>
              
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-xl font-semibold mb-3">Our Service Area</h3>
                <p className="text-white/70">
                  Headquartered in Bangalore, we actively serve industrial corridors, municipal projects, and commercial developments throughout Bengaluru and the greater Karnataka region.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ready to upgrade your pump systems?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="bg-[#1E5BB8] text-white px-8 py-4 rounded-xl text-lg font-bold transition-transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Contact Us for a Quote
                </Link>
                <Link
                  href="/blog"
                  className="bg-white border border-[#1E5BB8]/20 text-[#1E5BB8] px-8 py-4 rounded-xl text-lg font-bold"
                >
                  Read Bangalore buying guides
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
      <FAQSection
        faqs={landingFaqs}
        title="Berlington FAQs"
        tag="Search Questions"
      />
    </>
  );
}
