import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getApplicationBySlug, APPLICATIONS } from "@/lib/application-data";
import { generateApplicationSEO } from "@/lib/seo";
import { SEOOverview, SEORelatedLinks } from "@/components/sections/SEOContentSections";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import FAQSection from "@/components/ui/FAQSection";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import Link from "next/link";

type ApplicationPageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return APPLICATIONS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<ApplicationPageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) return {};
  return generateApplicationSEO(slug, application.name, application.title, application.description);
}

export default async function ApplicationPage({ params }: { params: Promise<ApplicationPageParams> }) {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);

  if (!application) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Applications", item: "/applications" },
    { name: application.name, item: `/applications/${slug}` },
  ];

  return (
    <main className="bg-section-bg">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema questions={application.faqs} />

      {/* Hero Section */}
      <header className="relative bg-deep-blue py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <PrecisionReveal variant="fadeSlideLeft">
            <SectionTag accent="green">Engineering Application</SectionTag>
            <h1 className="mt-6 text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              {application.name} <br />
              <span className="text-primary-green italic">Pump Engineering.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-white/80 leading-relaxed font-medium">
              {application.description}
            </p>
          </PrecisionReveal>
        </div>
      </header>

      {/* Engineering Explanation */}
      <SEOOverview content={application.engineeringExplanation} />
      
      <section className="py-16 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-deep-blue uppercase tracking-tight mb-8">Technical Considerations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {application.keyConsiderations.map((consideration, i) => (
              <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-border shadow-sm">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-black">
                  {i + 1}
                </div>
                <p className="text-text-light font-bold text-base">{consideration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-deep-blue uppercase tracking-tight mb-8">Recommended Pump Systems</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {application.recommendedPumps.map((pump) => (
              <Link key={pump.id} href={`/products/${pump.id}`} className="group p-8 rounded-[32px] bg-white border border-border hover:border-primary-blue transition-all shadow-sm hover:shadow-xl">
                <span className="text-[10px] font-black text-primary-blue uppercase tracking-widest block mb-4">Industrial Model</span>
                <h3 className="text-xl font-black text-deep-blue group-hover:text-primary-blue transition-colors">{pump.name}</h3>
                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-light group-hover:text-deep-blue">
                  View Technical Specs <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SEORelatedLinks 
        cities={[{ title: "Bangalore", href: "/bangalore/industrial-pumps" }, { title: "Mysore", href: "/mysore/industrial-pumps" }]}
        blogs={[{ title: "How to select high-pressure pumps", href: "/blog/how-to-select-high-pressure-pumps" }, { title: "RO plant maintenance guide", href: "/blog/ro-plant-maintenance-guide" }]}
      />

      <FAQSection faqs={application.faqs} title={`${application.name} Technical FAQs`} />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-deep-blue rounded-[3rem] p-12 md:p-20 text-white">
          <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter">Expert Consultation for {application.name}</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">Our engineering team helps you size and select the right Berlington pump system for your specific duty point.</p>
          <Link href="/contact#inquiry-form" className="inline-block bg-primary-green text-deep-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-primary-green/20">
            Start Technical Review
          </Link>
        </div>
      </section>
    </main>
  );
}
