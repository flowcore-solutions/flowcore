import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-data";
import ApplicationsCTA from "@/components/sections/applications/ApplicationsCTA";

const POSTS_PER_PAGE = 12;

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
      item: "https://flowcoresolutions.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://flowcoresolutions.in/blog",
    },
  ],
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const posts = getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const requestedPage = Number(resolvedSearchParams?.page ?? "1");
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(1, Math.trunc(requestedPage)), totalPages)
    : 1;
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  const pageHref = (page: number) => (page === 1 ? "/blog" : `/blog?page=${page}`);
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => {
    if (page === 1 || page === totalPages) return true;
    return Math.abs(page - currentPage) <= 1;
  });

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


              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-semibold text-[#475569]">
                  Showing <span className="text-[#0F172A]">{pageStart + 1}</span>
                  {" - "}
                  <span className="text-[#0F172A]">{Math.min(pageStart + POSTS_PER_PAGE, posts.length)}</span>
                  {" of "}
                  <span className="text-[#0F172A]">{posts.length}</span> engineering articles
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-[#1E5BB8]">
                  Page {currentPage} of {totalPages}
                </p>
              </div>

              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
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

              {totalPages > 1 ? (
                <nav
                  aria-label="Blog pagination"
                  className="mt-14 flex items-center justify-center gap-1 sm:gap-3 overflow-x-auto px-2 pb-2"
                >
                  <Link
                    href={pageHref(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={`flex items-center gap-1 rounded-xl border px-2.5 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition shrink-0 ${
                      currentPage === 1
                        ? "pointer-events-none border-gray-100 text-gray-300"
                        : "border-[#1E5BB8]/20 bg-white text-[#1E5BB8] hover:border-[#1E5BB8] hover:bg-[#1E5BB8] hover:text-white"
                    }`}
                  >
                    <span aria-hidden="true">&larr;</span>
                    <span className="hidden sm:inline">Previous</span>
                  </Link>

                  <div className="flex items-center gap-1 sm:gap-3">
                    {visiblePages.map((page, index) => {
                      const previousPage = visiblePages[index - 1];
                      const showGap = previousPage && page - previousPage > 1;

                      return (
                        <div key={page} className="flex items-center gap-1 sm:gap-3">
                          {showGap ? (
                            <span className="text-xs font-black text-[#94A3B8]">...</span>
                          ) : null}
                          <Link
                            href={pageHref(page)}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={`grid h-8 w-8 sm:h-11 sm:min-w-11 place-items-center rounded-xl border text-xs sm:text-sm font-black transition shrink-0 ${
                              page === currentPage
                                ? "border-[#1E5BB8] bg-[#1E5BB8] text-white shadow-lg shadow-[#1E5BB8]/20"
                                : "border-gray-100 bg-white text-[#475569] hover:border-[#1E5BB8]/40 hover:text-[#1E5BB8]"
                            }`}
                          >
                            {page}
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href={pageHref(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 rounded-xl border px-2.5 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition shrink-0 ${
                      currentPage === totalPages
                        ? "pointer-events-none border-gray-100 text-gray-300"
                        : "border-[#1E5BB8]/20 bg-white text-[#1E5BB8] hover:border-[#1E5BB8] hover:bg-[#1E5BB8] hover:text-white"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <ApplicationsCTA />
    </>
  );
}
