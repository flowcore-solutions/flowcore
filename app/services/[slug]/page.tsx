import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQSection from "@/components/ui/FAQSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { SERVICE_PAGES, getServicePage, type ServicePage } from "@/lib/phase3-authority-data";

type ServiceParams = {
  slug: string;
};

export async function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<ServiceParams> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `https://flowcoresolutions.in/services/${page.slug}`,
      type: "website",
    },
  };
}

function ServiceArticle({ page }: { page: ServicePage }) {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: page.title, item: `/services/${page.slug}` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Karnataka",
    },
    provider: {
      "@type": "Organization",
      name: "FlowCore Solutions",
      url: "https://flowcoresolutions.in",
    },
  };

  return (
    <main className="hero-underlap bg-section-bg">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema questions={page.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <header className="bg-deep-blue px-6 py-14 md:py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="border-l-2 border-primary-green pl-3 text-xs font-black uppercase tracking-[0.3em] text-primary-green">
            Engineering Service
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
            {page.shortAnswer}
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/45">
            Last updated {page.updatedAt}
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-14">
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
          <h2 className="text-2xl font-black tracking-tight text-deep-blue">
            Related Pages
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {page.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-semibold text-[#475569] underline decoration-gray-200 underline-offset-4 hover:text-primary-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-3xl bg-deep-blue p-8 text-white">
          <h2 className="text-3xl font-black tracking-tight text-white">Request a Technical Review</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/75">
            Share your flow, head, application, site location, operating hours, and pump symptoms or project drawings. FlowCore will review the requirement and guide the next step.
          </p>
          <Link href="/contact#inquiry-form" className="mt-8 inline-block rounded-xl bg-primary-green px-6 py-4 text-xs font-black uppercase tracking-widest text-deep-blue transition hover:bg-white">
            Contact FlowCore
          </Link>
        </section>
      </article>

      <FAQSection faqs={page.faqs} title={`${page.title} FAQs`} />
    </main>
  );
}

export default async function ServicePageRoute({ params }: { params: Promise<ServiceParams> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return <ServiceArticle page={page} />;
}
