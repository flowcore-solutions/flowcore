import { seoKeywords } from "./seo-keywords";
import { PUMP_CATALOG } from "./pump-data";
import { PRODUCT_AUTHORITY_PAGES, TOPICAL_CLUSTERS } from "./phase3-authority-data";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type LinkItem = {
  title: string;
  href: string;
};

export type RelatedContent = {
  products: LinkItem[];
  blogs: LinkItem[];
  industries: LinkItem[];
  applications: LinkItem[];
  services: LinkItem[];
  cities: LinkItem[];
};

type KeywordGroup = {
  slug: string;
  primary: string[];
  relatedCategories?: string[];
  blogs?: string[];
};

// ─────────────────────────────────────────────
// SEMANTIC ANCHOR TEXT HELPERS
// ─────────────────────────────────────────────

/**
 * Returns commercial anchor text for a product link.
 * Avoids raw slug repetition; favours descriptive phrases.
 */
function productAnchor(label: string, context?: string): string {
  if (!context) return label;
  const lower = label.toLowerCase();
  if (lower.includes("multistage")) return `${label} for ${context}`;
  if (lower.includes("booster")) return `Pressure booster selection for ${context}`;
  if (lower.includes("fire")) return `Fire pump supply for ${context}`;
  return label;
}

/**
 * Returns semantically varied anchor text for a city link.
 * Prevents the "pumps in Bangalore" repetition across every link.
 */
function cityAnchor(cityLabel: string, clusterName: string): string {
  const patterns = [
    `${clusterName} supplier in ${cityLabel}`,
    `${clusterName} for ${cityLabel} projects`,
    `${cityLabel} ${clusterName.toLowerCase()} supply`,
    `Industrial pump support in ${cityLabel}`,
  ];
  // Deterministic rotation based on city string length keeps it consistent across builds
  return patterns[cityLabel.length % patterns.length];
}

/**
 * Returns a blog anchor that reflects the post's semantic angle,
 * not just the raw title.
 */
function blogAnchor(title: string, type?: string): string {
  if (!type) return title;
  const prefixes: Record<string, string> = {
    troubleshooting: "Troubleshooting guide: ",
    maintenance:     "Maintenance checklist: ",
    comparison:      "Comparison: ",
    efficiency:      "Efficiency guide: ",
    installation:    "Installation guide: ",
    engineering:     "Engineering deep-dive: ",
  };
  return prefixes[type] ? `${prefixes[type]}${title}` : title;
}

// ─────────────────────────────────────────────
// EMPTY RESULT HELPER
// ─────────────────────────────────────────────

function emptyResult(): RelatedContent {
  return {
    products: [],
    blogs: [],
    industries: [],
    applications: [],
    services: [],
    cities: [],
  };
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

/**
 * Returns a fully-linked RelatedContent object for any slug.
 *
 * Resolution order:
 *  1. Product authority page (cluster root)
 *  2. Blog post inside a topical cluster
 *  3. Keyword group fallback (legacy seoKeywords)
 */
export function getRelatedContent(currentSlug: string): RelatedContent {

  // ── 1. Product authority page (cluster root) ───────────────────────
  const authorityPage = PRODUCT_AUTHORITY_PAGES.find(
    (page) => page.slug === currentSlug
  );

  if (authorityPage) {
    return {
      products: authorityPage.related.products.map((p) => ({
        title: productAnchor(p.label),
        href: p.href,
      })),
      blogs: authorityPage.related.blogs.map((b) => {
        // Resolve blog type from cluster for richer anchor text
        const cluster = TOPICAL_CLUSTERS.find((c) => c.slug === currentSlug);
        const topic = cluster?.blogTopics.find(
          (t) => `/blog/${t.slug}` === b.href
        );
        return {
          title: blogAnchor(b.label, topic?.type),
          href:  b.href,
        };
      }),
      industries: authorityPage.related.industries.map((i) => ({
        title: i.label,
        href:  i.href,
      })),
      applications: authorityPage.related.applications.map((a) => ({
        title: a.label,
        href:  a.href,
      })),
      services: authorityPage.related.services.map((s) => ({
        title: s.label,
        href:  s.href,
      })),
      cities: authorityPage.related.local.map((l) => ({
        title: l.label,
        href:  l.href,
      })),
    };
  }

  // ── 2. Blog post inside a topical cluster ──────────────────────────
  const matchingCluster = TOPICAL_CLUSTERS.find((cluster) =>
    cluster.blogTopics.some((topic) => topic.slug === currentSlug)
  );

  if (matchingCluster) {
    const currentTopic = matchingCluster.blogTopics.find(
      (t) => t.slug === currentSlug
    );

    // Intent-aware sibling blog selection:
    // Prioritise posts with DIFFERENT intent types to reduce cannibalization
    const siblingBlogs = matchingCluster.blogTopics
      .filter((t) => t.slug !== currentSlug)
      .sort((a, b) => {
        // Deprioritise same-type neighbours
        if (a.type === currentTopic?.type && b.type !== currentTopic?.type) return 1;
        if (b.type === currentTopic?.type && a.type !== currentTopic?.type) return -1;
        return 0;
      })
      .slice(0, 5)
      .map((t) => ({
        title: blogAnchor(t.title, t.type),
        href:  `/blog/${t.slug}`,
      }));

    // Cross-cluster blog links: pull one post from adjacent clusters
    const crossClusterBlogs: LinkItem[] = TOPICAL_CLUSTERS
      .filter((c) => c.slug !== matchingCluster.slug)
      .slice(0, 2)
      .flatMap((c) => {
        const pick = c.blogTopics.find(
          (t) => t.type === "commercial" || t.type === "engineering"
        );
        return pick
          ? [{ title: pick.title, href: `/blog/${pick.slug}` }]
          : [];
      });

    return {
      products: [
        {
          title: `${matchingCluster.name} — full product range`,
          href:  `/products/${matchingCluster.slug}`,
        },
        ...matchingCluster.recommendedProducts.slice(0, 2).map((p) => ({
          title: productAnchor(p.label, currentTopic?.keyword),
          href:  p.href,
        })),
      ],
      blogs: [...siblingBlogs, ...crossClusterBlogs],
      industries: matchingCluster.mainIndustries.map((i) => ({
        title: i.label,
        href:  i.href,
      })),
      applications: matchingCluster.mainApplications.map((a) => ({
        title: a.label,
        href:  a.href,
      })),
      services: [
        { title: "Industrial Pump Consultation",    href: "/services/industrial-pump-consultation" },
        { title: "Pump Maintenance in Bangalore",   href: "/services/pump-maintenance-bangalore" },
        { title: "Pump Installation in Karnataka",  href: "/services/pump-installation-karnataka" },
      ],
      cities: matchingCluster.localCities.slice(0, 4).map((city) => {
        const label = city.charAt(0).toUpperCase() + city.slice(1);
        return {
          title: cityAnchor(label, matchingCluster.name),
          href:  `/${city}/${matchingCluster.slug}`,
        };
      }),
    };
  }

  // ── 3. Legacy seoKeywords fallback ────────────────────────────────
  const productGroup = (
    Object.values(seoKeywords.products) as KeywordGroup[]
  ).find((p) => p.slug === currentSlug);

  if (!productGroup) return emptyResult();

  const relatedProducts: LinkItem[] = (productGroup.relatedCategories ?? [])
    .flatMap((catKey: string) => {
      const relatedGroup = (
        seoKeywords.products as Record<string, KeywordGroup>
      )[catKey];
      if (!relatedGroup) return [];
      const pump = PUMP_CATALOG.find(
        (p) =>
          p.id === relatedGroup.slug ||
          relatedGroup.primary.some((kw: string) =>
            p.fullName.toLowerCase().includes(kw.toLowerCase())
          )
      );
      return pump
        ? [{ title: pump.fullName, href: `/products/${pump.id}` }]
        : [];
    });

  const relatedBlogs: LinkItem[] = (productGroup.blogs ?? []).map(
    (title: string) => ({
      title,
      // Derive href from title: lowercase + hyphens (best-effort for legacy data)
      href: `/blog/${title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-")}`,
    })
  );

  const cities = seoKeywords.metadata.primaryCities.slice(0, 5);
  const relatedCities: LinkItem[] = cities.map((city: string) => {
    const label = city.charAt(0).toUpperCase() + city.slice(1);
    return {
      title: `${label} — ${currentSlug.replace(/-/g, " ")} supplier`,
      href:  `/${city}/${currentSlug}`,
    };
  });

  return {
    products:     relatedProducts,
    blogs:        relatedBlogs,
    industries:   [],
    applications: [],
    services:     [],
    cities:       relatedCities,
  };
}