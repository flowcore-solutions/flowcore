import React from "react";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import Link from "next/link";
import type { LinkItem } from "@/lib/internal-linking";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SEOSection = ({ title, subtitle, children }: SectionProps) => (
  <section className="py-12 lg:py-16 border-b border-border/50 last:border-0">
    <div className="max-w-6xl mx-auto px-6">
      <PrecisionReveal variant="fadeSlideLeft">
        <h2 className="text-3xl font-black text-deep-blue uppercase tracking-tight mb-4">{title}</h2>
        {subtitle && <p className="text-text-light font-medium mb-8 max-w-3xl">{subtitle}</p>}
      </PrecisionReveal>
      <PrecisionReveal variant="riseUp" delay={0.1}>
        {children}
      </PrecisionReveal>
    </div>
  </section>
);

export const SEOOverview = ({ content }: { content: string[] }) => (
  <SEOSection title="Overview">
    <div className="space-y-6 text-base leading-8 text-text-light max-w-4xl">
      {content.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  </SEOSection>
);

export const SEOApplications = ({ items }: { items: { title: string; description: string }[] }) => (
  <SEOSection title="Applications" subtitle="Where this solution delivers maximum performance.">
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="p-6 rounded-xl bg-section-bg border border-border">
          <h3 className="text-lg font-bold text-deep-blue mb-2">{item.title}</h3>
          <p className="text-sm leading-relaxed text-text-light">{item.description}</p>
        </div>
      ))}
    </div>
  </SEOSection>
);

export const SEOFeatures = ({ features }: { features: string[] }) => (
  <SEOSection title="Key Features">
    <ul className="grid gap-4 md:grid-cols-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-green" />
          <span className="text-base text-text-light">{feature}</span>
        </li>
      ))}
    </ul>
  </SEOSection>
);

// ─────────────────────────────────────────────
// LINK LIST
// Each column renders as its own contained card
// with a heading accent and crawlable link list.
// ─────────────────────────────────────────────

const LinkList = ({
  heading,
  items,
}: {
  heading: string;
  items: LinkItem[];
}) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 flex flex-col gap-3">
    <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB]">
      <span className="h-2 w-2 rounded-full bg-[#1E5BB8] shrink-0" />
      <h3 className="text-[11px] font-black uppercase tracking-widest text-[#1E5BB8]">
        {heading}
      </h3>
    </div>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-start gap-2 text-sm text-[#475569] hover:text-[#1E5BB8] transition-colors leading-snug"
          >
            <span className="mt-1.5 h-1 w-1 rounded-full bg-[#CBD5E1] group-hover:bg-[#1E5BB8] shrink-0 transition-colors" />
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ─────────────────────────────────────────────
// SEORelatedLinks
// All props use LinkItem[] — { title, href }.
// blogs is now LinkItem[] (was string[]).
// Added industries, applications, services columns.
// ─────────────────────────────────────────────

export const SEORelatedLinks = ({
  products,
  blogs,
  cities,
  industries,
  applications,
  services,
}: {
  products?:     LinkItem[];
  blogs?:        LinkItem[];
  cities?:       LinkItem[];
  industries?:   LinkItem[];
  applications?: LinkItem[];
  services?:     LinkItem[];
}) => {
  const columns: { heading: string; items: LinkItem[] }[] = [
    products?.length     ? { heading: "Related Products",    items: products }     : null,
    blogs?.length        ? { heading: "Industrial Insights", items: blogs }        : null,
    cities?.length       ? { heading: "Service Locations",   items: cities }       : null,
    industries?.length   ? { heading: "Industries Served",   items: industries }   : null,
    applications?.length ? { heading: "Applications",        items: applications } : null,
    services?.length     ? { heading: "Our Services",        items: services }     : null,
  ].filter(Boolean) as { heading: string; items: LinkItem[] }[];

  if (columns.length === 0) return null;

  const gridCols =
    columns.length === 1 ? "sm:grid-cols-1" :
    columns.length === 2 ? "sm:grid-cols-2" :
    columns.length <= 4  ? "sm:grid-cols-2 lg:grid-cols-3" :
                           "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-14 bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-6">
        {/* ── Section header ── */}
        <div className="mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E5BB8] mb-1">
              Explore More
            </p>
            <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
              Related Resources
            </h2>
          </div>
        </div>

        {/* ── Column cards ── */}
        <div className={`grid gap-4 ${gridCols}`}>
          {columns.map((col) => (
            <LinkList key={col.heading} heading={col.heading} items={col.items} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const SEOTechnicalDetails = ({
  title,
  details,
}: {
  title: string;
  details: { label: string; value: string }[];
}) => (
  <SEOSection title={title}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {details.map((detail, i) => (
        <div key={i} className="p-6 rounded-2xl border border-border bg-white shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-blue mb-2 block">
            {detail.label}
          </span>
          <span className="text-deep-blue font-bold text-base">{detail.value}</span>
        </div>
      ))}
    </div>
  </SEOSection>
);