import { notFound } from "next/navigation";
import { PUMP_CATALOG, getPumpById } from "@/lib/pump-data";
import type { Metadata } from "next";
import ProductClientWrapper from "./ProductClientWrapper";
import Link from "next/link";
import FAQSection from "@/components/ui/FAQSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import {
  PRODUCT_AUTHORITY_PAGES,
  getProductAuthorityPage,
  type ProductAuthorityPage,
} from "@/lib/phase3-authority-data";
import { generateProductSEO } from "@/lib/seo";

export async function generateStaticParams() {
  return [
    ...PUMP_CATALOG.map((pump) => ({
      slug: pump.id,
    })),
    ...PRODUCT_AUTHORITY_PAGES.map((page) => ({
      slug: page.slug,
    })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const authorityPage = getProductAuthorityPage(resolvedParams.slug);
  if (authorityPage) {
    return {
      title: authorityPage.seoTitle,
      description: authorityPage.metaDescription,
      alternates: {
        canonical: `/products/${authorityPage.slug}`,
      },
      openGraph: {
        title: authorityPage.seoTitle,
        description: authorityPage.metaDescription,
        url: `https://flowcoresolutions.in/products/${authorityPage.slug}`,
        type: "website",
      },
    };
  }

  return generateProductSEO(resolvedParams.slug);
}

function AuthorityProductPage({ page }: { page: ProductAuthorityPage }) {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Products", item: "/products" },
    { name: page.title, item: `/products/${page.slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: page.title,
    description: page.metaDescription,
    brand: { "@type": "Brand", name: "Berlington" },
    seller: { "@type": "Organization", name: "FlowCore Solutions" },
    category: page.primaryKeyword,
    url: `https://flowcoresolutions.in/products/${page.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: "https://flowcoresolutions.in/contact",
    },
    additionalProperty: page.sections
      .flatMap((section) => section.bullets ?? [])
      .slice(0, 10)
      .map((value) => ({
        "@type": "PropertyValue",
        name: "Engineering consideration",
        value,
      })),
  };

  return (
    <main className="hero-underlap bg-section-bg text-[#0F172A]">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema questions={page.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <header className="relative overflow-hidden bg-deep-blue px-6 py-14 md:py-16 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 36px)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <span className="border-l-2 border-primary-green pl-3 text-xs font-black uppercase tracking-[0.3em] text-primary-green">
            Engineering Product Hub
          </span>
          <h1 className="relative z-10 mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {page.title}
          </h1>
          <p className="relative z-10 mt-6 max-w-3xl text-lg leading-8 text-white/85">
            {page.shortAnswer}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {page.heroLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  index === 0
                    ? "rounded-xl bg-primary-green px-6 py-4 text-xs font-black uppercase tracking-widest text-deep-blue transition hover:bg-white"
                    : "rounded-xl border border-white/25 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/45">
            Last updated {page.updatedAt} by FlowCore Solutions engineering content team
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-6 py-16">
        <section className="rounded-3xl border border-[#1E5BB8]/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-deep-blue">
            Direct Buyer Answer
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#475569]">{page.shortAnswer}</p>
        </section>

        <div className="mt-14 space-y-14">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-black tracking-tight text-deep-blue">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-8 text-[#475569]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-2xl border border-gray-100 bg-white p-4 text-sm font-semibold leading-6 text-[#475569]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black tracking-tight text-deep-blue">
            Related Engineering Resources
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ["Products", page.related.products],
              ["Applications", page.related.applications],
              ["Industries", page.related.industries],
              ["Blogs", page.related.blogs],
              ["Local Support", page.related.local],
              ["Services", page.related.services],
            ].map(([heading, links]) => (
              <div key={heading as string}>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary-blue">
                  {heading as string}
                </h3>
                <ul className="mt-4 space-y-2">
                  {(links as { label: string; href: string }[]).map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-semibold leading-6 text-[#475569] underline decoration-gray-200 underline-offset-4 hover:text-primary-blue">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={page.faqs} title={`${page.primaryKeyword} FAQs`} />
    </main>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const authorityPage = getProductAuthorityPage(resolvedParams.slug);
  if (authorityPage) {
    return <AuthorityProductPage page={authorityPage} />;
  }

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
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: "https://flowcoresolutions.in/contact",
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
