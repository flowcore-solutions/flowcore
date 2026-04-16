import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQSection from "@/components/ui/FAQSection";
import FeaturedSnippetBlock from "@/components/ui/FeaturedSnippetBlock";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog-data";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: `https://flowcore.in/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://flowcore.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://flowcore.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://flowcore.in/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://flowcore.in/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "FlowCore Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "FlowCore Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://flowcore.in/og-image.png",
      },
    },
    about: [
      "Berlington pumps",
      "industrial pumps in Bangalore",
      "HVAC pumps",
      "water treatment pumps",
      "fire fighting pumps",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="bg-[#F8FAFC] py-16 md:py-20">
        <article className="mx-auto max-w-4xl px-6">
          <div className="rounded-[32px] bg-white px-6 py-10 shadow-[0_30px_90px_-50px_rgba(15,61,145,0.45)] md:px-10">
            <div className="text-sm text-[#64748B]">
              <Link href="/blog" className="font-semibold text-[#1E5BB8] hover:underline">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span>{post.readingTime}</span>
              <span className="mx-2">/</span>
              <span>Updated {post.updatedAt}</span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-[#0F172A] md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#475569]">
              {post.metaDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/berlington-pumps-bangalore"
                className="rounded-full border border-[#1E5BB8]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1E5BB8]"
              >
                Berlington Pumps Bangalore
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-[#1E5BB8]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1E5BB8]"
              >
                Product Catalogue
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#6CC24A]/20 bg-[#6CC24A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#275B17]"
              >
                Request a Quote
              </Link>
            </div>

            <div className="mt-12 space-y-6 text-lg leading-8 text-[#475569]">
              {post.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="mt-12 space-y-4">
              {post.faqs.slice(0, 2).map((faq) => (
                <FeaturedSnippetBlock
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </section>

            <div className="mt-14 space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 text-lg leading-8 text-[#475569]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-6 space-y-3 text-lg leading-8 text-[#475569]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#1E5BB8]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <section className="mt-16 rounded-[28px] bg-[#0F172A] p-8 text-white">
              <h2 className="text-2xl font-bold">{post.ctaTitle}</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/78">
                {post.ctaBody}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#1E5BB8] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-[1.02]"
                >
                  Talk to FlowCore
                </Link>
                <Link
                  href="/products"
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  View pump models
                </Link>
              </div>
            </section>
          </div>
        </article>

        <FAQSection
          faqs={post.faqs}
          title="Article FAQs"
          tag="Search Questions"
        />
      </main>
    </>
  );
}
