import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-data";
import ApplicationsCTA from "@/components/sections/applications/ApplicationsCTA";

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
      <main className="hero-underlap relative bg-section-bg pt-8 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
            opacity: 0.025,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mb-16">
            <span className="border-l-2 border-[#1E5BB8] pl-3 text-xs font-bold uppercase tracking-[0.3em] text-[#1E5BB8]">
              Knowledge Hub
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
              Industrial Pump Insights for Bangalore Buyers
            </h1>
            <p className="mt-6 text-xl leading-8 text-[#475569]">
              Application guides, buying advice, and Berlington pump content
              built around high-intent searches in Bangalore and Karnataka.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Main Content Area */}
            <div className="w-full">


              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-lg hover:shadow-[0_20px_50px_-12px_rgba(30,91,184,0.1)] transition-all group overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#1E5BB8] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div>
                      <div className="flex items-center justify-between gap-4 text-[11px] font-black uppercase tracking-widest text-[#64748B] mb-4">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8]" /> {post.readingTime}</span>
                        <span>{post.updatedAt}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold tracking-tight text-[#0F172A] group-hover:text-[#1E5BB8] transition-colors mb-3 leading-snug">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-base text-[#475569] leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1E5BB8] group-hover:text-[#2FA84F] transition-all mt-auto pt-5 border-t border-gray-100"
                    >
                      Read article <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ApplicationsCTA />
    </>
  );
}
