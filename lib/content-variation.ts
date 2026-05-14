/**
 * content-variation.ts
 *
 * Deterministic variation utilities for CTAs, brand references,
 * and blog structure patterns.
 *
 * DETERMINISTIC: variations are seeded by slug/context string so
 * the same page always gets the same variant — no hydration mismatches,
 * no SSG inconsistency, no random re-renders.
 */

// ─────────────────────────────────────────────
// SEED FUNCTION
// Maps any string to a stable integer index.
// Used to pick variants without Math.random().
// ─────────────────────────────────────────────

function seed(value: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

// ─────────────────────────────────────────────
// BRAND REFERENCE VARIANTS
// Rotates "FlowCore Solutions" with natural alternatives.
// Use getBrandRef(slug) wherever the brand name appears
// in generated content.
// ─────────────────────────────────────────────

const BRAND_REFS = [
  "FlowCore Solutions",
  "our engineering team",
  "our Bangalore support team",
  "our pump specialists",
  "our service engineers",
  "the FlowCore team",
  "our technical team",
  "our Karnataka service team",
  "our application engineers",
] as const;

export type BrandRef = (typeof BRAND_REFS)[number];

export function getBrandRef(context: string): BrandRef {
  return BRAND_REFS[seed(context, BRAND_REFS.length)];
}

/**
 * Returns a sentence-level brand phrase for use in body copy.
 * Avoids the hardcoded "FlowCore Solutions provides..." opener.
 */
export function getBrandSentenceOpener(context: string): string {
  const ref = getBrandRef(context);
  const openers = [
    `${ref} supports`,
    `${ref} helps`,
    `${ref} reviews`,
    `${ref} coordinates`,
    `${ref} works with`,
  ];
  return openers[seed(context + "opener", openers.length)];
}

// ─────────────────────────────────────────────
// CTA VARIANTS
// 15 variants covering different commercial angles:
// urgency, technical, project-stage, service, local.
// ─────────────────────────────────────────────

export type CtaVariant = {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
};

const CTA_VARIANTS: CtaVariant[] = [
  // 0 — Technical selection (default)
  {
    title: "Not sure which pump fits your duty?",
    body:  "Share the flow rate, head, and application. Our engineering team will shortlist the right Berlington model and explain why it fits — before you commit to a purchase.",
    primaryLabel:   "Send your duty details",
    secondaryLabel: "View pump models",
  },
  // 1 — Project stage
  {
    title: "In the specification stage?",
    body:  "Early involvement means fewer surprises at commissioning. Talk to our application engineers about duty points, material options, and site-specific considerations before the order is placed.",
    primaryLabel:   "Talk to an engineer",
    secondaryLabel: "Browse the catalogue",
  },
  // 2 — Troubleshooting
  {
    title: "Existing pump underperforming?",
    body:  "Low pressure, frequent trips, or unexplained vibration usually have a system cause, not just a pump cause. Our service engineers can help diagnose before you replace.",
    primaryLabel:   "Describe the problem",
    secondaryLabel: "Troubleshooting guides",
  },
  // 3 — Replacement / upgrade
  {
    title: "Replacing an ageing pump system?",
    body:  "A replacement is a chance to correct the original sizing. Our team reviews the current duty, what went wrong, and whether a direct swap or a better-matched model is the right move.",
    primaryLabel:   "Start the review",
    secondaryLabel: "View pump families",
  },
  // 4 — Local / Karnataka
  {
    title: "Based in Bangalore or Karnataka?",
    body:  "We supply and support Berlington pump systems across Karnataka with local quote response, technical selection, and after-sales coordination. No long escalation chains.",
    primaryLabel:   "Get a local quote",
    secondaryLabel: "Our service locations",
  },
  // 5 — MEP / consultant
  {
    title: "Working on an MEP specification?",
    body:  "Our technical team supports consultants and contractors with duty-point selection, submittal documentation, and coordinated supply for multi-pump packages.",
    primaryLabel:   "Request a submittal",
    secondaryLabel: "Product datasheets",
  },
  // 6 — Maintenance AMC
  {
    title: "Planning annual pump maintenance?",
    body:  "Critical pump systems need scheduled inspection, not just reactive repair. Our service engineers can plan a maintenance scope that matches your operating hours and uptime requirement.",
    primaryLabel:   "Plan a service visit",
    secondaryLabel: "Maintenance guides",
  },
  // 7 — Water treatment
  {
    title: "Building or upgrading an RO or WTP system?",
    body:  "Feed pressure, membrane compatibility, and stainless material selection are decisions that affect years of operating cost. Get the pump selection right at the design stage.",
    primaryLabel:   "Review my RO duty",
    secondaryLabel: "RO pump range",
  },
  // 8 — Fire system
  {
    title: "Specifying a fire fighting pump package?",
    body:  "Jockey pump sizing, main pump pressure, diesel backup, and controller logic all have to work together. Our team supports selection and documentation for Karnataka fire system projects.",
    primaryLabel:   "Fire pump enquiry",
    secondaryLabel: "Fire pump range",
  },
  // 9 — Coastal / Mangalore
  {
    title: "Project in a coastal or high-humidity location?",
    body:  "Salt air, chloride exposure, and condensation affect pump material decisions in ways that standard catalogues do not flag. Talk to our team about the right stainless grade for your site.",
    primaryLabel:   "Coastal project enquiry",
    secondaryLabel: "Material selection guide",
  },
  // 10 — Energy / efficiency
  {
    title: "High pump running costs?",
    body:  "Oversized pumps, throttled valves, and wrong VFD settings waste energy every hour the system runs. An efficiency review often finds savings without a full replacement.",
    primaryLabel:   "Request an efficiency review",
    secondaryLabel: "Efficiency guides",
  },
  // 11 — Fast quote
  {
    title: "Need a competitive quote fast?",
    body:  "We respond to Bangalore and Karnataka pump enquiries with technical selection and pricing — not just a catalogue forward. Share the duty details and we will come back with a clear recommendation.",
    primaryLabel:   "Send an enquiry",
    secondaryLabel: "Call us directly",
  },
  // 12 — New facility
  {
    title: "Setting up a new facility or plant room?",
    body:  "Getting the pump selection right at the design stage is far cheaper than correcting it after commissioning. Our team reviews duty, controls, installation, and service access before the order.",
    primaryLabel:   "New facility enquiry",
    secondaryLabel: "Technical consultation",
  },
  // 13 — Spares / breakdown
  {
    title: "Pump down and need fast support?",
    body:  "Our Bangalore support team handles breakdown enquiries for Berlington pump systems with spares coordination and technical guidance to get the system back online.",
    primaryLabel:   "Breakdown support",
    secondaryLabel: "Service coverage",
  },
  // 14 — Comparison / selection help
  {
    title: "Comparing pump options and not sure which wins?",
    body:  "A proper comparison should use your actual duty point, not just catalogue specs. Our application engineers can explain the trade-offs for your specific operating condition.",
    primaryLabel:   "Compare for my duty",
    secondaryLabel: "Selection guides",
  },
];

/**
 * Returns a deterministic CTA variant for a given slug/context.
 * The same slug always returns the same variant across builds.
 */
export function getCtaVariant(context: string): CtaVariant {
  return CTA_VARIANTS[seed(context, CTA_VARIANTS.length)];
}

// ─────────────────────────────────────────────
// BLOG STRUCTURE VARIANTS
// Replaces the fixed intro→explanation→bullets→CTA
// pattern with 6 structural types. The phase3 blog
// builder should pick one per topic using this function.
// ─────────────────────────────────────────────

export type BlogStructureType =
  | "standard"        // intro → explanation → bullets → CTA (default)
  | "field-note"      // observation → cause → fix → field checklist
  | "comparison"      // context → option-A → option-B → decision guide
  | "checklist"       // problem statement → numbered checklist → common mistakes
  | "case-note"       // scenario → what we found → what we changed → outcome
  | "engineering-ref" // definition → working principle → selection criteria → spec table

export function getBlogStructureType(slug: string): BlogStructureType {
  const types: BlogStructureType[] = [
    "standard",
    "field-note",
    "comparison",
    "checklist",
    "case-note",
    "engineering-ref",
  ];
  return types[seed(slug, types.length)];
}

/**
 * Returns structure-specific section heading variants.
 * Prevents every blog from using "Engineering Context" and
 * "Selection and Site Review" as H2s.
 */
export function getSectionHeadings(
  structureType: BlogStructureType,
  keyword: string
): { intro: string; middle: string; closing: string } {
  const k = keyword;
  switch (structureType) {
    case "field-note":
      return {
        intro:   `What site experience tells us about ${k}`,
        middle:  `Common observations and root causes`,
        closing: `Field checklist before calling it a pump problem`,
      };
    case "comparison":
      return {
        intro:   `The real difference between the options`,
        middle:  `Where each option performs better`,
        closing: `How to make the decision for your site`,
      };
    case "checklist":
      return {
        intro:   `What to check first`,
        middle:  `Step-by-step review`,
        closing: `Mistakes that add cost or delay`,
      };
    case "case-note":
      return {
        intro:   `The scenario`,
        middle:  `What the review found`,
        closing: `What changed and why it worked`,
      };
    case "engineering-ref":
      return {
        intro:   `How ${k} actually works`,
        middle:  `Selection criteria that matter`,
        closing: `Specification checklist`,
      };
    case "standard":
    default:
      return {
        intro:   `Why ${k} matters for Karnataka projects`,
        middle:  `Technical selection factors`,
        closing: `When to ask for a technical review`,
      };
  }
}

// ─────────────────────────────────────────────
// INTRO PARAGRAPH VARIANTS
// Prevents the "FlowCore Solutions treats pump
// selection as an engineering decision..." opener
// appearing on every page.
// ─────────────────────────────────────────────

const INTRO_OPENERS = [
  // Practical / field-first
  (keyword: string) =>
    `Most ${keyword} problems that reach our service team were created at the selection stage, not during operation. The pump was oversized, or the suction layout was wrong, or the material was specified without checking the water chemistry.`,

  // Question-led
  (keyword: string) =>
    `What does a correct ${keyword} selection actually look like? Not the catalogue answer — the one that accounts for actual flow, real static head, site suction conditions, and what happens when demand changes across the day.`,

  // Buyer-context first
  (keyword: string) =>
    `Buyers who come to us for ${keyword} usually have one of three situations: a new project that needs selection from scratch, an existing system that is underperforming, or a replacement where the original pump never quite fit the duty.`,

  // Industry observation
  (keyword: string) =>
    `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} is one of those topics where the gap between what gets specified and what actually gets installed can cost significantly more than the pump itself. Getting that gap small is the engineering job.`,

  // Direct / no preamble
  (keyword: string) =>
    `The short answer for ${keyword}: flow rate and total dynamic head are the two numbers that matter most. Everything else — material, motor, control method, spare strategy — follows from those two values and the operating context.`,

  // Service angle
  (keyword: string) =>
    `We see the same ${keyword} failures repeatedly across Karnataka sites: wrong NPSH margin, no bypass provision, throttled discharge valves left half-closed after commissioning. This guide covers how to avoid the common ones.`,
] as const;

export function getIntroOpener(slug: string, keyword: string): string {
  const fn = INTRO_OPENERS[seed(slug, INTRO_OPENERS.length)];
  return fn(keyword);
}

// ─────────────────────────────────────────────
// CLOSING SECTION VARIANTS
// Replaces the repeated "When to Ask FlowCore for
// a Technical Review" closing section.
// ─────────────────────────────────────────────

export type ClosingSection = {
  heading: string;
  paragraphs: string[];
};

export function getClosingSection(
  slug: string,
  keyword: string,
  city?: string
): ClosingSection {
  const locationRef = city ?? "Karnataka";
  const closings: ClosingSection[] = [
    {
      heading: "What to include in your enquiry",
      paragraphs: [
        `The most useful enquiries arrive with: required flow, total dynamic head, liquid type and temperature, suction source, operating hours per day, and whether VFD or duty-standby control is needed. That is enough to give a meaningful recommendation rather than a catalogue guess.`,
        `If you have a drawing, a pump curve from the existing installation, or photos of the current plant room, those help significantly. Our team covers ${locationRef} projects and can review the information quickly.`,
      ],
    },
    {
      heading: "How our selection process works",
      paragraphs: [
        `We start with the duty condition, not the model number. Once flow, head, and operating context are clear, we map the requirement to the appropriate Berlington pump family and material set. If the duty is borderline between two options, we explain the trade-offs rather than defaulting to the larger size.`,
        `For ${locationRef} projects, we also factor in local service access, spare part availability, and commissioning support as part of the recommendation.`,
      ],
    },
    {
      heading: "Signs the current selection is wrong",
      paragraphs: [
        `If the pump throttles constantly, trips on overload regularly, vibrates at normal operating conditions, or loses pressure within the first year of installation, the selection is likely wrong rather than the pump being defective.`,
        `These symptoms are worth reviewing against the original duty specification before ordering a replacement. A like-for-like swap often repeats the same problem. Our team can review the current situation for ${locationRef} sites.`,
      ],
    },
    {
      heading: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: key points before you proceed`,
      paragraphs: [
        `Confirm actual flow at the operating condition — not the design maximum. Check that total dynamic head includes static head, friction losses, and terminal pressure requirement together. Verify suction conditions before assuming NPSH is adequate. Review material compatibility if the liquid is treated, brackish, or chemically dosed.`,
        `Those four checks resolve the majority of selection errors before they become commissioning problems. For ${locationRef} projects with tighter timelines, our team can run through these quickly with you.`,
      ],
    },
  ];

  return closings[seed(slug, closings.length)];
}