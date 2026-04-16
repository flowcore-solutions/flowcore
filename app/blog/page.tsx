import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "FlowCore Blog | Industrial Pump Insights for Bangalore",
  description:
    "SEO-focused buying guides and application notes from FlowCore Solutions covering Berlington pumps, industrial pump selection, HVAC, fire fighting, and WTP systems in Bangalore and Karnataka.",
  alternates: {
    canonical: "/blog",
  },
};

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
  ],
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="bg-[#F8FAFC] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="border-l-2 border-[#1E5BB8] pl-3 text-xs font-bold uppercase tracking-[0.3em] text-[#1E5BB8]">
              Knowledge Hub
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-[#0F172A] md:text-5xl">
              Industrial Pump Insights for Bangalore Buyers
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#475569]">
              Application guides, buying advice, and Berlington pump content
              built around high-intent searches in Bangalore and Karnataka.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-[#1E5BB8]/10 bg-white p-8 shadow-[0_22px_60px_-36px_rgba(15,61,145,0.35)]"
              >
                <div className="flex items-center justify-between gap-4 text-sm text-[#64748B]">
                  <span>{post.readingTime}</span>
                  <span>{post.updatedAt}</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold text-[#0F172A]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#1E5BB8]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-7 text-[#475569]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/berlington-pumps-bangalore"
                    className="rounded-full border border-[#1E5BB8]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1E5BB8]"
                  >
                    Berlington Landing Page
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-[#6CC24A]/20 bg-[#6CC24A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#275B17]"
                  >
                    Contact Engineering Team
                  </Link>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#1E5BB8] hover:underline"
                >
                  Read article
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
