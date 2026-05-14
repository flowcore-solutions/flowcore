import { Metadata } from "next";
import { seoKeywords } from "./seo-keywords";
import { getPumpById } from "./pump-data";

const DOMAIN = "https://flowcoresolutions.in";

export type SEOConfig = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
};

type KeywordGroup = {
  slug: string;
  mainKeyword: string;
  primary: string[];
  secondary?: string[];
  local?: string[];
  relatedCategories?: string[];
};

// ─────────────────────────────────────────────
// CITY INTENT MODIFIERS
// These replace the generic "in [City]" suffix with
// a commercially differentiated phrase per city.
// ─────────────────────────────────────────────
const cityModifier: Record<string, string> = {
  bangalore: "for Bangalore Industrial Projects",
  mysore:    "for Mysore Hospitality and Campus Facilities",
  mangalore: "for Mangalore Coastal and Commercial Infrastructure",
  hubli:     "for Hubli and North Karnataka Industry",
  tumkur:    "for Tumkur Manufacturing and Process Plants",
  udupi:     "for Udupi Hospitality and Coastal Infrastructure",
};

// ─────────────────────────────────────────────
// PRODUCT TITLE PATTERNS
// Generates descriptive, non-spammy product titles
// by combining pump function + primary application context.
// ─────────────────────────────────────────────
const productTitlePatterns: Record<string, (pumpName: string) => string> = {
  "industrial-ro-pumps": (n) =>
    `${n} — High Pressure Feed Pump for RO and Water Treatment`,
  "vertical-multistage-pumps": (n) =>
    `${n} — Compact High Head Pump for Pressure Boosting and RO`,
  "boiler-feed-pumps": (n) =>
    `${n} — High Pressure Pump for Boiler Feed and Steam Utilities`,
  "stp-etp-sewage-pumps": (n) =>
    `${n} — Submersible Pump for STP, ETP and Sewage Transfer`,
  "pressure-booster-pumps": (n) =>
    `${n} — Variable Pressure Booster for Buildings and Campuses`,
  "fire-fighting-pumps": (n) =>
    `${n} — Standby Fire Pump for Hydrant and Sprinkler Systems`,
  "hvac-pumps": (n) =>
    `${n} — Circulation Pump for Chilled Water and HVAC Systems`,
};

// ─────────────────────────────────────────────
// BLOG INTENT PREFIXES
// Maps blog content type to a title prefix that
// signals search intent clearly without stuffing.
// ─────────────────────────────────────────────
const blogIntentPrefix: Record<string, string> = {
  informational:  "",
  engineering:    "Engineering Guide: ",
  troubleshooting: "Troubleshooting: ",
  maintenance:    "Maintenance Guide: ",
  comparison:     "Comparison: ",
  commercial:     "",
  installation:   "Installation Guide: ",
  efficiency:     "Efficiency Guide: ",
};

// ─────────────────────────────────────────────
// BASE SEO GENERATOR
// ─────────────────────────────────────────────
export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage = "/assets/og-image.webp",
    ogType = "website",
  } = config;

  const fullTitle = title
    ? `${title} | ${seoKeywords.metadata.business}`
    : seoKeywords.metadata.business;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: canonical ? `${DOMAIN}${canonical}` : DOMAIN,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical ? `${DOMAIN}${canonical}` : DOMAIN,
      siteName: seoKeywords.metadata.business,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${DOMAIN}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title || seoKeywords.metadata.business,
        },
      ],
      locale: "en_IN",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${DOMAIN}${ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ─────────────────────────────────────────────
// PRODUCT PAGE SEO
// Generates function + application titles, not
// "[ModelName] - [Keyword] in [City]" patterns.
// ─────────────────────────────────────────────
export function generateProductSEO(slug: string): Metadata {
  const pump = getPumpById(slug);
  if (!pump) return generateSEO({});

  const keywordGroup = (
    Object.values(seoKeywords.products) as KeywordGroup[]
  ).find(
    (product) =>
      product.slug === slug ||
      Boolean(product.relatedCategories?.includes(pump.category))
  );

  const pumpName = pump.fullName;

  // Use pattern if cluster matched, otherwise build from pump data
  const titleFn =
    (keywordGroup && productTitlePatterns[keywordGroup.slug]) ||
    ((n: string) =>
      `${n} — ${pump.category} for Industrial and Commercial Systems`);

  const title = titleFn(pumpName);

  // Description: application-specific, no city repetition
  const appContext = pump.summaryApplications.slice(0, 3).join(", ");
  const description = `${pump.fullName} (${pump.seriesCode}): ${pump.category} supplying up to ${pump.flowRate}. Selected for ${appContext}. Technical guidance and supply support for Karnataka projects.`;

  return generateSEO({
    title,
    description,
    keywords: [
      pump.fullName,
      pump.seriesCode,
      pump.category,
      ...(keywordGroup?.primary || []).slice(0, 4),
    ],
    canonical:  `/products/${slug}`,
    ogImage:    pump.imagePath,
    ogType:     "website",
  });
}

// ─────────────────────────────────────────────
// LOCAL CITY + SERVICE PAGE SEO
// Each city gets a semantically distinct title via
// cityModifier instead of "in [City]" repetition.
// ─────────────────────────────────────────────
export function generateLocalSEO(city: string, serviceSlug: string): Metadata {
  const keywordGroup = (
    Object.values(seoKeywords.products) as KeywordGroup[]
  ).find((product) => product.slug === serviceSlug);

  if (!keywordGroup) return generateSEO({});

  const mainKeyword = keywordGroup.mainKeyword;
  const modifier    = cityModifier[city] ?? `for ${city.charAt(0).toUpperCase() + city.slice(1)} Projects`;

  // Title: "[Keyword] [city-specific modifier]"
  // Example: "Industrial RO Pumps for Mangalore Coastal and Commercial Infrastructure"
  const title = `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} ${modifier}`;

  // Description: differentiates by city context, not just city name
  const cityDescriptions: Record<string, string> = {
    bangalore: `Selection, supply, and service support for ${mainKeyword} across Bangalore industrial clusters — Peenya, Whitefield, Bommasandra, Bidadi, and commercial projects.`,
    mysore:    `Technical supply and application guidance for ${mainKeyword} in Mysore hotels, institutions, campus infrastructure, and STP projects.`,
    mangalore: `Coastal-aware ${mainKeyword} selection for Mangalore commercial and port-linked infrastructure, with stainless steel and corrosion-resistant configuration options.`,
    hubli:     `Industrial ${mainKeyword} supply and support for Hubli and North Karnataka manufacturing facilities, utilities, and process plants.`,
    tumkur:    `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} for Tumkur manufacturing clusters, process water systems, RO plants, and boiler utilities with local Karnataka support.`,
    udupi:     `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} supply for Udupi hospitality, institutions, coastal booster systems, and water treatment projects.`,
  };

  const description =
    cityDescriptions[city] ||
    `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} supply, selection, and service coordination for projects in ${city.charAt(0).toUpperCase() + city.slice(1)}, Karnataka.`;

  return generateSEO({
    title,
    description,
    keywords: [
      ...keywordGroup.primary.slice(0, 3),
      ...(keywordGroup.secondary || []).slice(0, 2),
    ],
    canonical: `/${city}/${serviceSlug}`,
    ogType:    "website",
  });
}

// ─────────────────────────────────────────────
// INDUSTRY PAGE SEO
// ─────────────────────────────────────────────
export function generateIndustrySEO(
  slug: string,
  _name: string,
  title: string,
  description: string
): Metadata {
  return generateSEO({
    title,
    description,
    canonical: `/industries/${slug}`,
    ogType:    "website",
  });
}

// ─────────────────────────────────────────────
// APPLICATION PAGE SEO
// ─────────────────────────────────────────────
export function generateApplicationSEO(
  slug: string,
  _name: string,
  title: string,
  description: string
): Metadata {
  return generateSEO({
    title,
    description,
    canonical: `/applications/${slug}`,
    ogType:    "website",
  });
}

// ─────────────────────────────────────────────
// BLOG POST SEO
// Uses intent prefix to signal content type in SERP
// and keeps titles under 60 characters where possible.
// ─────────────────────────────────────────────
export function generateBlogSEO(
  slug: string,
  title: string,
  excerpt: string,
  intentType?: keyof typeof blogIntentPrefix
): Metadata {
  const prefix = intentType ? (blogIntentPrefix[intentType] ?? "") : "";
  const seoTitle = `${prefix}${title}`;

  // Description: excerpt cleaned to 155 chars max, ends on a complete word
  const trimmedExcerpt =
    excerpt.length > 155
      ? excerpt.slice(0, 152).replace(/\s+\S*$/, "") + "…"
      : excerpt;

  return generateSEO({
    title:       seoTitle,
    description: trimmedExcerpt,
    canonical:   `/blog/${slug}`,
    ogType:      "article",
  });
}