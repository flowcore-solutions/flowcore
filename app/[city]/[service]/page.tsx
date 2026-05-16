import { notFound } from "next/navigation";
import { Metadata } from "next";
import { seoKeywords } from "@/lib/seo-keywords";
import { generateLocalSEO } from "@/lib/seo";
import CityLandingPage from "@/components/sections/local-seo/CityLandingPage";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getCitySpecificContent } from "@/lib/phase3-authority-data";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type LocalPageParams = {
  city: string;
  service: string;
};

type KeywordGroup = {
  slug: string;
  mainKeyword: string;
  primary: string[];
  secondary?: string[];
  faq?: string[];
};

// ─────────────────────────────────────────────
// CITY SEMANTIC PROFILES
// Each city has distinct: eyebrow label, hero emphasis,
// industry focus, engineering challenge, trust signal,
// range card flavour, and CTA commercial hook.
// This is the primary defence against doorway-page risk.
// ─────────────────────────────────────────────

type CityProfile = {
  /** Short descriptor shown in hero eyebrow alongside city name */
  tag: string;
  /** Hero body paragraph — city-specific operating context */
  heroContext: string;
  /** Intro section emphasis — first sentence of intro paragraph */
  introEmphasis: string;
  /** What local buyers actually care about — drives range card copy */
  buyerPriority: string;
  /** Local engineering challenge specific to this city */
  engineeringChallenge: string;
  /** CTA commercial language appropriate to this city's buyer type */
  ctaHook: string;
  /** Trust signal line — local credibility marker */
  trustSignal: string;
  /** Industries with city-specific relevance */
  industryFocus: string[];
  /** Infrastructure references for semantic grounding */
  infraRefs: string[];
};

const CITY_PROFILES: Record<string, CityProfile> = {
  bangalore: {
    tag: "MEP · HVAC · HIGH-RISE",
    heroContext:
      "Bangalore procurement teams work to compressed schedules across Peenya, Whitefield, Bommasandra, Bidadi, and Hoskote industrial clusters. Projects routinely combine RO systems, high-rise pressure zones, HVAC circulation, and fire fighting — all within a single MEP package that needs coordinated supply response.",
    introEmphasis:
      "Bangalore industrial and commercial projects demand pump selection that handles MEP coordination, high-rise pressure zoning, hospital-grade reliability, and IT park commissioning timelines together.",
    buyerPriority:
      "Fast quote turnaround, MEP-stage technical support, and stainless steel configuration options for treated water systems",
    engineeringChallenge:
      "High-rise pressure zoning across 15–40 floor commercial towers, simultaneous RO and HVAC duty in the same plant room, and fire system compliance documentation for Bangalore building approvals",
    ctaHook:
      "Need technical selection and quote support for your Bangalore MEP or industrial project?",
    trustSignal:
      "Supplying Berlington pump systems to Bangalore's Peenya industrial belt, Whitefield tech parks, and hospital infrastructure since establishment",
    industryFocus: [
      "IT parks and tech campuses",
      "Hospitals and healthcare infrastructure",
      "Commercial high-rise towers",
      "Peenya and Bommasandra manufacturing",
      "WTP and RO contractors",
    ],
    infraRefs: ["Peenya", "Whitefield", "Bommasandra", "Bidadi", "Hoskote"],
  },

  mysore: {
    tag: "HOSPITALITY · CAMPUS · INSTITUTIONS",
    heroContext:
      "Mysore pump requirements are shaped by a distinct combination: heritage and modern hotels, university campuses, manufacturing utilities, and STP packages that need clean-water reliability without the compressed MEP urgency of Bangalore. The city's service expectations favour careful application review over fast-cycle catalogue supply.",
    introEmphasis:
      "Mysore projects typically combine hospitality-grade pressure reliability, campus water system scale, institutional STP requirements, and manufacturing utility pump duties — each with different operating priorities.",
    buyerPriority:
      "Application-matched selection for hotel and campus water systems, reliable STP pump supply, and service coverage outside the Bangalore core",
    engineeringChallenge:
      "Consistent pressure for multi-wing hotel layouts, STP pump reliability in warm-climate wet wells, and spare availability for facilities beyond Bangalore's dense service network",
    ctaHook:
      "Planning a pump selection for a Mysore hotel, campus, or manufacturing facility?",
    trustSignal:
      "Supporting Mysore hospitality, institutional, and industrial buyers with Karnataka-wide Berlington pump supply and technical guidance",
    industryFocus: [
      "Hotels and heritage resorts",
      "University and institutional campuses",
      "Food processing and manufacturing",
      "STP and wastewater contractors",
      "Commercial and retail infrastructure",
    ],
    infraRefs: ["Mysore industrial area", "Hebbal industrial zone", "KIADB Mysore"],
  },

  mangalore: {
    tag: "COASTAL · CORROSION-AWARE · MARINE",
    heroContext:
      "Mangalore's coastal environment changes the pump selection equation. Salt-laden air accelerates corrosion in wetted pump components; port-linked industries demand corrosion-aware materials; STP and ETP systems serve commercial buildings where sea air exposure makes standard carbon steel a liability. Stainless steel wetted parts and coated housings are not a premium option here — they are the practical baseline.",
    introEmphasis:
      "Mangalore pump selection must account for coastal corrosion risk, salt air exposure, marine industry requirements, and the material compatibility demands of seawater-proximate infrastructure.",
    buyerPriority:
      "SS316 or coated material configurations for coastal corrosion resistance, reliable STP and ETP pump supply for commercial buildings, and port-adjacent industry pump solutions",
    engineeringChallenge:
      "Chloride-accelerated corrosion in pump casings and impellers, seal compatibility in humid coastal environments, and selecting correct stainless grades for brackish versus treated water duty",
    ctaHook:
      "Specifying pumps for a Mangalore coastal or commercial infrastructure project?",
    trustSignal:
      "Advising Mangalore buyers on corrosion-aware Berlington pump configurations for coastal commercial and industrial applications",
    industryFocus: [
      "Port and marine industry utilities",
      "Coastal commercial buildings",
      "Hospitality along the Mangalore coast",
      "STP and ETP contractors",
      "Fish processing and cold-chain facilities",
    ],
    infraRefs: [
      "Mangalore Port",
      "Baikampady industrial area",
      "New Mangalore Port Trust",
    ],
  },

  hubli: {
    tag: "NORTH KARNATAKA · INDUSTRIAL UTILITY",
    heroContext:
      "Hubli serves as the industrial and commercial hub for North Karnataka. Pump requirements here combine manufacturing utility water, fire protection for warehousing and processing facilities, booster packages for commercial buildings, and a buyer base that values spares availability and service response time more than metro-style MEP coordination.",
    introEmphasis:
      "Hubli and North Karnataka industrial buyers typically prioritise utility water reliability, fire system readiness, practical spare parts access, and pump service support that does not depend on Bangalore escalation.",
    buyerPriority:
      "Reliable utility pump supply, fire fighting package support, accessible spares, and service response for facilities outside the Bangalore–Mysore corridor",
    engineeringChallenge:
      "Supply chain reliability for critical spare parts, booster system stability in areas with variable municipal pressure, and fire pump service support for facilities without on-site MEP teams",
    ctaHook:
      "Looking for industrial pump supply and support in Hubli or North Karnataka?",
    trustSignal:
      "Supporting Hubli and North Karnataka buyers with Berlington pump supply, application guidance, and Karnataka-wide service coordination",
    industryFocus: [
      "Manufacturing and processing plants",
      "Commercial and retail warehousing",
      "Agricultural infrastructure",
      "Textile and garment facilities",
      "Municipal and utility contractors",
    ],
    infraRefs: [
      "Hubli industrial estate",
      "Gokul Road industrial area",
      "Dharwad KIADB zone",
    ],
  },

  tumkur: {
    tag: "MANUFACTURING · PROCESS WATER · RO",
    heroContext:
      "Tumkur's growing manufacturing base — spanning electronics, food processing, and light engineering — creates a specific pump demand profile: process water transfer, boiler feed reliability, RO feed systems for purified water, and preventive maintenance planning that fits production schedules rather than reacting to breakdowns.",
    introEmphasis:
      "Tumkur manufacturing plants and process facilities need pump selection built around production uptime requirements — boiler feed pressure, process water transfer, RO system reliability, and scheduled preventive maintenance.",
    buyerPriority:
      "Boiler feed pump reliability, process water transfer capacity, RO plant pump performance, and planned maintenance schedules that protect production continuity",
    engineeringChallenge:
      "Boiler feed pressure margin for varying steam loads, hot water NPSH management, and RO pump stainless material selection for treated water quality in food and electronics manufacturing",
    ctaHook:
      "Specifying pump systems for a Tumkur manufacturing facility or process plant?",
    trustSignal:
      "Supporting Tumkur industrial buyers with Berlington pump selection for boiler feed, RO, and process utility applications",
    industryFocus: [
      "Electronics and light manufacturing",
      "Food and beverage processing",
      "KIADB Tumkur industrial plots",
      "Boiler and steam utility plants",
      "Water treatment contractors",
    ],
    infraRefs: [
      "KIADB Tumkur industrial area",
      "Tumkur electronics cluster",
      "NH-48 industrial corridor",
    ],
  },

  udupi: {
    tag: "HOSPITALITY · COASTAL · INSTITUTIONS",
    heroContext:
      "Udupi's pump market is shaped by its hospitality infrastructure, temple institutions, educational campuses, and a coastal operating environment that shares Mangalore's corrosion awareness at smaller project scale. Pressure stability for multi-storey hotels, booster reliability for coastal resorts, and STP pump systems for hospitality clusters are the dominant demand drivers.",
    introEmphasis:
      "Udupi pump projects typically combine hotel-grade pressure booster requirements, coastal corrosion awareness, institutional campus water systems, and STP reliability for hospitality clusters along the Karnataka coast.",
    buyerPriority:
      "Pressure booster reliability for coastal hotels and resorts, corrosion-aware material selection, and STP pump supply for institutional and hospitality-scale wastewater systems",
    engineeringChallenge:
      "Consistent pressure delivery across multi-wing resort layouts in coastal humidity, SS selection for salt-proximate applications, and booster system cycling control for variable hospitality demand",
    ctaHook:
      "Planning pump selection for a Udupi hotel, campus, or coastal infrastructure project?",
    trustSignal:
      "Advising Udupi hospitality and institutional buyers on coastal-appropriate Berlington pump selection and Karnataka service planning",
    industryFocus: [
      "Coastal hotels and resorts",
      "Temple and religious institutions",
      "Educational campuses",
      "STP and wastewater contractors",
      "Commercial and retail infrastructure",
    ],
    infraRefs: [
      "Udupi town commercial area",
      "Manipal university campus",
      "Coastal NH-66 corridor",
    ],
  },
};

// ─────────────────────────────────────────────
// RANGE CARD DESCRIPTION GENERATOR
// Uses city profile to write application-specific card
// descriptions instead of the generic template.
// ─────────────────────────────────────────────
function rangeCardDescription(
  keyword: string,
  cityProfile: CityProfile,
  appLabels: string[]
): string {
  const appSlice = appLabels.slice(0, 2).join(" and ");
  return `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} for ${appSlice} — selected around ${cityProfile.buyerPriority.split(",")[0].toLowerCase()}.`;
}

// ─────────────────────────────────────────────
// FAQ VARIATION BUILDER
// Generates city-specific FAQ phrasing so identical
// Q&A blocks do not appear across all city pages.
// ─────────────────────────────────────────────
function buildCityFaqs(
  mainKeyword: string,
  cityLabel: string,
  cityProfile: CityProfile,
  defaultFaqs: { question: string; answer: string }[]
): { question: string; answer: string }[] {
  // Replace up to 2 generic FAQs with city-specific ones
  const citySpecificFaqs: { question: string; answer: string }[] = [
    {
      question: `What makes ${mainKeyword} selection different in ${cityLabel}?`,
      answer: `${cityProfile.engineeringChallenge} These local conditions change which pump configurations, materials, and control arrangements FlowCore recommends for ${cityLabel} projects.`,
    },
    {
      question: `Which industries in ${cityLabel} commonly use ${mainKeyword}?`,
      answer: `${cityProfile.industryFocus.join(", ")} are the primary industries with active ${mainKeyword} requirements in ${cityLabel}. Each has different duty points, operating environments, and service expectations.`,
    },
  ];

  // Combine: city-specific first, then remaining defaults (avoiding duplicates)
  return [...citySpecificFaqs, ...defaultFaqs.slice(2)];
}

// ─────────────────────────────────────────────
// STATIC PARAMS
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  const paths: LocalPageParams[] = [];
  seoKeywords.localSEO.cities.forEach((city) => {
    seoKeywords.localSEO.targetPages.forEach((service) => {
      paths.push({ city, service });
    });
  });
  return paths;
}

import { getCtaVariant } from "@/lib/content-variation";

// ─────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalPageParams>;
}): Promise<Metadata> {
  const { city, service } = await params;
  return generateLocalSEO(city, service);
}

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────

export default async function LocalServicePage({
  params,
}: {
  params: Promise<LocalPageParams>;
}) {
  const { city, service } = await params;

  // Validate city and service
  const isValidCity = seoKeywords.localSEO.cities.includes(city);
  const keywordGroup = (
    Object.values(seoKeywords.products) as KeywordGroup[]
  ).find((product) => product.slug === service);

  if (!isValidCity || !keywordGroup) notFound();

  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  const mainKeyword   = keywordGroup.mainKeyword;
  const citySpecific  = getCitySpecificContent(city, service);
  const cityProfile   = CITY_PROFILES[city];
  const ctaVariant    = getCtaVariant(`${city}-${service}`);

  // Application labels for range cards
  const appLabels =
    citySpecific?.applications.map((a) => a.label) ?? keywordGroup.primary;

  // ── Hero body ────────────────────────────────
  // City profile gives the first sentence; citySpecific context follows.
  const heroBody = cityProfile
    ? `${cityProfile.heroContext} FlowCore provides application-matched ${mainKeyword} with technical selection, supply guidance, and service support.`
    : citySpecific
    ? `${citySpecific.context} FlowCore provides application-matched ${mainKeyword} with technical selection and local supply response.`
    : `FlowCore Solutions provides application-matched ${mainKeyword} for industrial and commercial projects in ${formattedCity}, Karnataka.`;

  // ── Intro paragraphs ─────────────────────────
  const introBody: string[] = cityProfile
    ? [
        `${cityProfile.introEmphasis} FlowCore supports ${formattedCity} buyers with Berlington ${mainKeyword} selection, technical review, and Karnataka-wide service coordination.`,
        `Key engineering considerations for ${formattedCity} include: ${cityProfile.engineeringChallenge}. We review these factors before recommending a pump family — not after.`,
        `${cityProfile.trustSignal}.`,
      ]
    : citySpecific?.intro ?? [
        `FlowCore Solutions provides ${mainKeyword} for industrial and commercial projects in ${formattedCity}. Whether managing a water treatment plant, HVAC system, or industrial process line, correct pump selection is critical for system reliability.`,
        `We work with consultants, contractors, and facility managers across ${formattedCity} to deliver ${mainKeyword} that meet exact duty points while ensuring energy efficiency and long-term maintainability.`,
      ];

  // ── Range cards ───────────────────────────────
  const rangeCards = keywordGroup.primary.map((kw: string) => ({
    title: kw.charAt(0).toUpperCase() + kw.slice(1),
    description: cityProfile
      ? rangeCardDescription(kw, cityProfile, appLabels)
      : `${kw.charAt(0).toUpperCase() + kw.slice(1)} for demanding applications in ${formattedCity}.`,
  }));

  // ── FAQs ─────────────────────────────────────
  const baseFaqs =
    citySpecific?.faqs ??
    keywordGroup.faq?.map((q: string) => ({
      question: q,
      answer: `FlowCore Solutions provides expert guidance on ${q.toLowerCase()} for clients in ${formattedCity} and across Karnataka. Contact us for detailed technical support.`,
    })) ??
    [];

  const faqs = cityProfile
    ? buildCityFaqs(mainKeyword, formattedCity, cityProfile, baseFaqs)
    : baseFaqs;

  // ── Config assembly ───────────────────────────
  const config = {
    breadcrumbLabel: `${mainKeyword} in ${formattedCity}`,
    hero: {
      eyebrow: cityProfile
        ? `${mainKeyword.toUpperCase()} · ${formattedCity.toUpperCase()} · ${cityProfile.tag}`
        : `${mainKeyword.toUpperCase()} · ${formattedCity.toUpperCase()}`,
      title: `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} Supplier`,
      subtitle: formattedCity,
      body: heroBody,
      theme: "slate" as const,
      primaryCta:   { label: "Get a Quote",     href: "/contact#inquiry-form" },
      secondaryCta: { label: "View Products",   href: "/products" },
    },
    intro: {
      title: cityProfile
        ? `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)}: ${formattedCity} Buyer Context`
        : `Industrial ${mainKeyword} in ${formattedCity}`,
      subtitle: cityProfile
        ? cityProfile.industryFocus.slice(0, 3).join(" · ")
        : `Expert pump supply and technical support for ${formattedCity} industrial clusters.`,
      body: introBody,
    },
    range: {
      eyebrow: "SOLUTIONS",
      title: `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} Available for ${formattedCity} Projects`,
      cards:   rangeCards,
    },
    faqsTitle: `${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)}: ${formattedCity} Project Questions`,
    faqs,
    cta: {
      title:        cityProfile ? cityProfile.ctaHook : ctaVariant.title,
      body:         cityProfile
                      ? `${cityProfile.trustSignal}. ${ctaVariant.body}`
                      : ctaVariant.body,
      primaryCta:   { label: ctaVariant.primaryLabel,   href: "/contact#inquiry-form" },
      secondaryCta: { label: ctaVariant.secondaryLabel, href: "/products" },
    },
  };


  const breadcrumbs = [
    { name: "Home",          item: "/" },
    { name: formattedCity,   item: `/${city}` },
    { name: mainKeyword,     item: `/${city}/${service}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema questions={config.faqs} />
      <CityLandingPage config={config} />
    </>
  );
}
