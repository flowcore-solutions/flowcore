import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQSection from "@/components/ui/FAQSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { PROJECT_PAGES, getProjectPage, type ProjectPage } from "@/lib/phase3-authority-data";

type ProjectParams = {
  slug: string;
};

export async function generateStaticParams() {
  return PROJECT_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<ProjectParams> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/projects/${page.slug}`,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `https://flowcoresolutions.in/projects/${page.slug}`,
      type: "article",
    },
  };
}

function ProjectArticle({ page }: { page: ProjectPage }) {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projects", item: "/projects" },
    { name: page.title, item: `/projects/${page.slug}` },
  ];

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    dateModified: page.updatedAt,
    author: {
      "@type": "Organization",
      name: "FlowCore Solutions",
    },
    about: [page.projectType, page.location, "industrial pump engineering"],
  };

  return (
    <main className="hero-underlap bg-section-bg">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema questions={page.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <header className="bg-deep-blue px-6 py-14 md:py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="border-l-2 border-primary-green pl-3 text-xs font-black uppercase tracking-[0.3em] text-primary-green">
            Project Evidence
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
            {page.shortAnswer}
          </p>
          <dl className="mt-10 grid max-w-2xl gap-4 text-sm md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-xs font-black uppercase tracking-widest text-primary-green">Location</dt>
              <dd className="mt-2 font-bold">{page.location}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-xs font-black uppercase tracking-widest text-primary-green">Project Type</dt>
              <dd className="mt-2 font-bold">{page.projectType}</dd>
            </div>
          </dl>
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
            Related Product and Service Pages
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
      </article>

      <FAQSection faqs={page.faqs} title={`${page.projectType} FAQs`} />
    </main>
  );
}

export default async function ProjectPageRoute({ params }: { params: Promise<ProjectParams> }) {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) notFound();

  return <ProjectArticle page={page} />;
}
