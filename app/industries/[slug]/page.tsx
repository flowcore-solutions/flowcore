import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getIndustryBySlug, INDUSTRIES } from "@/lib/industry-data";
import { generateIndustrySEO } from "@/lib/seo";
import { SEOOverview, SEORelatedLinks } from "@/components/sections/SEOContentSections";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import FAQSection from "@/components/ui/FAQSection";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import Link from "next/link";

type IndustryPageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<IndustryPageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return generateIndustrySEO(slug, industry.name, industry.title, industry.description);
}

export default async function IndustryPage({ params }: { params: Promise<IndustryPageParams> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Industries", item: "/industries" },
    { name: industry.name, item: `/industries/${slug}` },
  ];

  return (
    <main className="bg-section-bg">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema questions={industry.faqs} />

      {/* Hero Section */}
      <header className="relative bg-deep-blue py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <PrecisionReveal variant="fadeSlideLeft">
            <SectionTag accent="green">Industry Focus</SectionTag>
            <h1 className="mt-6 text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              {industry.name} <br />
              <span className="text-primary-green italic">Pump Solutions.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-white/80 leading-relaxed font-medium">
              {industry.description}
            </p>
            <div className="mt-10">
              <Link href="/contact#inquiry-form" className="bg-primary-green text-deep-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                Get Industrial Quote
              </Link>
            </div>
          </PrecisionReveal>
        </div>
      </header>

      {/* Content Clusters */}
      <SEOOverview content={industry.overview} />
      
      <section className="py-16 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black text-deep-blue uppercase tracking-tight mb-8">Industrial Challenges</h2>
              <ul className="space-y-4">
                {industry.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border shadow-sm">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">!</span>
                    <span className="text-text-light font-medium">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-black text-deep-blue uppercase tracking-tight mb-8">Our Engineered Solutions</h2>
              <ul className="space-y-4">
                {industry.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-primary-blue/5 border border-primary-blue/10 shadow-sm">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-primary-blue text-white flex items-center justify-center font-bold">✓</span>
                    <span className="text-deep-blue font-bold">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SEORelatedLinks 
        products={industry.relatedProducts.map(p => ({ title: p, href: `/products` }))} // Simplified for now
        cities={[{ title: "Bangalore", href: "/bangalore/industrial-pumps" }, { title: "Mysore", href: "/mysore/industrial-pumps" }]}
      />

      <FAQSection faqs={industry.faqs} title={`${industry.name} Industry FAQs`} />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-deep-blue mb-8 uppercase tracking-tighter">Ready to optimize your {industry.name} plant?</h2>
          <Link href="/contact#inquiry-form" className="inline-block bg-deep-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-blue transition-all shadow-xl">
            Talk to an Industrial Engineer
          </Link>
        </div>
      </section>
    </main>
  );
}
