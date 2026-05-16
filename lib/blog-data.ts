import { PHASE3_BLOG_POSTS } from "./phase3-authority-data";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type BlogIntentType =
  | "informational"
  | "engineering"
  | "troubleshooting"
  | "maintenance"
  | "comparison"
  | "commercial"
  | "installation"
  | "efficiency";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /**
   * Internal links injected at the end of this section.
   * Each entry renders as an anchor tag in the blog template.
   * href = /blog/[slug], label = link text.
   */
  relatedLinks?: { slug: string; label: string }[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  intro: string[];
  sections: BlogSection[];
  ctaTitle: string;
  ctaBody: string;
  primaryKeyword: string;
  faqs: BlogFaq[];
  intentType?: BlogIntentType;
  clusterSlug?: string;
};

// ─────────────────────────────────────────────
// LEGACY BLOG POSTS
// ─────────────────────────────────────────────

export const BLOG_POSTS: readonly BlogPost[] = [
  // ─────────────────────────────────────────────
  // POST 1 — COMMERCIAL / BUYING GUIDE
  // ─────────────────────────────────────────────
  {
    slug: "industrial-pumps-in-bangalore-buying-guide",
    title: "Industrial Pumps in Bangalore: Complete Buying Guide",
    seoTitle:
      "Industrial Pumps in Bangalore: Buying Guide for WTP, HVAC & Fire Systems",
    metaDescription:
      "How to select industrial pumps in Bangalore for HVAC, WTP, fire fighting, and process duty. FlowCore Solutions helps Karnataka buyers match duty point, material, and service support before the order goes out.",
    excerpt:
      "A field-oriented buying guide for Bangalore facilities — duty point verification, material selection, suction conditions, and service access before specifying an industrial pump.",
    publishedAt: "2026-04-16",
    updatedAt: "2026-04-16",
    readingTime: "8 min read",
    primaryKeyword: "industrial pumps in Bangalore",
    intentType: "commercial",
    clusterSlug: undefined,

    intro: [
      "Most pump problems on Bangalore sites start at the shortlisting stage, not at installation. Flow and head get confirmed late. Suction conditions are estimated. Motor rating gets used as a proxy for duty, which it isn't.",
      "This guide covers what to verify before ordering — duty point, fluid conditions, suction head, material, and service access. Getting these wrong costs more than the pump.",
    ],

    sections: [
      {
        heading: "Verify the operating duty before shortlisting",
        paragraphs: [
          "Confirm flow rate, total dynamic head, fluid temperature, suction conditions, and expected run hours before touching a catalogue. When these are vague at quoting stage, the selected pump will be wrong — oversized, undersized, or wrong construction for the fluid.",
          "Many Karnataka sites also run on inconsistent incoming voltage. Check the motor nameplate against site supply before first start. Voltage mismatch on first energisation voids warranty and is one of the more avoidable early failures we see.",
          "Also confirm the application: WTP, RO feed, HVAC circulation, pressure boosting, fire fighting standby, sewage transfer, or process fluid. A pump correct for one duty is often wrong for another even at the same flow and head.",
        ],
        bullets: [
          "Flow rate, TDH, fluid temperature, operating schedule — confirmed, not estimated.",
          "Suction conditions: static suction lift, pipe losses, NPSH available vs required.",
          "Fluid type: clean water, treated water, brackish, chemical, or wastewater with solids.",
          "Site voltage and phase against motor nameplate before commissioning.",
        ],
        relatedLinks: [
          {
            slug: "berlington-pumps-applications-fire-fighting-hvac-wtp",
            label: "See how Berlington pumps are applied across fire fighting, HVAC, and WTP systems",
          },
        ],
      },
      {
        heading: "Which pump type for which application",
        paragraphs: [
          "Vertical multistage pumps are the standard selection for RO feed and pressure boosting where floor space is tight. Most Peenya and Bommasandra plant rooms cannot fit horizontal configurations at the same pressure range — the vertical footprint is the practical reason they get specified.",
          "Horizontal multistage configurations are better where access matters post-installation. Bearings and mechanical seals are easier to reach on horizontal units in a cramped utility block. For sewage duty in lift stations or wet wells, submersible units eliminate the suction pipe complexity and handle solids directly.",
          "For HVAC and fire fighting on Karnataka projects, end-suction pumps are the common selection. MEP consultants here are familiar with the duty criteria, and spares availability in Bangalore is reliable for standard frame sizes.",
        ],
        relatedLinks: [
          {
            slug: "vertical-multistage-pumps-for-ro-plants",
            label: "Why vertical multistage pumps are specified for RO and high-pressure WTP",
          },
          {
            slug: "optimizing-hvac-pump-efficiency",
            label: "HVAC pump sizing and VFD control — energy savings guide",
          },
        ],
      },
      {
        heading: "Industries and applications across Bangalore",
        paragraphs: [
          "Duty requirements differ sharply by application. On older BWSSB-fed buildings, supply pressure has often degraded from the original design condition — a booster that was correctly sized ten years ago now operates outside its design range, which is where noise and vibration problems start.",
        ],
        bullets: [
          "Commercial towers and campuses: HVAC circulation, pressure boosting, fire fighting standby.",
          "Hospitals and institutions: dependable water transfer, standby fire duty.",
          "Process plants and factories: utility water, cooling tower circuits, chemical dosing lines.",
          "WTP, STP, and RO contractors: packaged treatment skids requiring pressure and transfer pumps.",
          "Data centres, warehouses, infrastructure: serviceable fire fighting and booster systems with fast local support.",
        ],
      },
      {
        heading: "Material selection for Berlington pump series",
        paragraphs: [
          "For WTP and RO applications, stainless steel construction — SS304 as standard, SS316 where chloride exposure is present — protects water quality and reduces early corrosion failures. This isn't a premium selection; it's the basic material requirement for treated-water duty.",
          "In HVAC circulation, operating at or near BEP matters more than motor kW rating. Oversized pumps are one of the more common energy waste sources we see on Karnataka sites. In fire fighting, the questions are duty-standby changeover logic and whether local service response is fast enough when the system trips.",
        ],
        relatedLinks: [
          {
            slug: "optimizing-hvac-pump-efficiency",
            label: "How to correct oversized HVAC pumps and reduce operating cost",
          },
        ],
      },
      {
        heading: "Local service support matters as much as product selection",
        paragraphs: [
          "A pump that looks correct on a duty sheet becomes expensive when service response is slow. Commissioning support, genuine spares availability, and post-installation troubleshooting are things to confirm before the order, not after the pump trips at 2am.",
          "Catalogue suppliers without local presence create a specific pattern: the unit cost looks good, then the facility waits three days for someone to check a control wiring fault. The savings disappear fast.",
        ],
      },
      {
        heading: "Common selection mistakes on Karnataka projects",
        paragraphs: [
          "Selecting on horsepower alone is the most common mistake. Motor rating without duty matching tells you nothing about whether the pump will deliver the right flow at actual system head.",
          "On older buildings, this is worse — the original sizing was done for a load that has since changed, and replacement decisions get made on motor frame size rather than system curve. Material compatibility is the other consistent miss. Treated water, chemical exposure, and solids handling each require different construction. Impeller wear is the first thing to inspect when output drops on an in-service pump.",
        ],
        bullets: [
          "Selecting on price without verifying the duty point.",
          "Ignoring suction conditions and available NPSH.",
          "Using standard cast iron construction where water chemistry demands stainless.",
          "Treating spares and service as afterthoughts at procurement.",
        ],
      },
      {
        heading: "What a qualified pump supplier should be able to do",
        paragraphs: [
          "A supplier should review your duty conditions, recommend the correct pump family, and stay involved through commissioning — especially on fast-moving Bangalore MEP projects where delays cost real money.",
          "If the supplier cannot discuss system curves, material suitability, or suction conditions at quoting stage, the selection is incomplete. That conversation is what separates a reliable installation from a difficult one.",
        ],
      },
    ],

    ctaTitle: "Need duty-matched pump selection for a Bangalore or Karnataka project?",
    ctaBody:
      "Share your flow, head, and application details with FlowCore Solutions. We review duty conditions and recommend the correct Berlington pump family for the installation.",

    faqs: [
      {
        question: "Where can I source industrial pumps in Bangalore?",
        answer:
          "FlowCore Solutions supplies and supports Berlington pump systems for WTP, HVAC, fire fighting, and utility water applications across Karnataka. We support selection, supply, and service.",
      },
      {
        question: "Which pump type is correct for water treatment in Bangalore?",
        answer:
          "Vertical multistage pumps in SS304 or SS316 construction are the standard selection for WTP and RO duty — compact footprint, reliable pressure, and corrosion resistance for treated water.",
      },
      {
        question: "Do you provide pump service and commissioning support in Karnataka?",
        answer:
          "Yes. FlowCore Solutions supports Bangalore and Karnataka projects from selection through commissioning and ongoing service for Berlington pump installations.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // POST 2 — INFORMATIONAL / APPLICATIONS
  // ─────────────────────────────────────────────
  {
    slug: "berlington-pumps-applications-fire-fighting-hvac-wtp",
    title: "Berlington Pumps: Fire Fighting, HVAC and WTP Applications",
    seoTitle:
      "Berlington Pumps: Fire Fighting, HVAC and Water Treatment Applications in Karnataka",
    metaDescription:
      "How Berlington pumps are applied across fire fighting, HVAC circulation, and WTP projects in Bangalore and Karnataka — duty-specific selection guidance from FlowCore Solutions.",
    excerpt:
      "Application-specific selection context for Berlington pump systems across fire fighting, HVAC, and water treatment projects in Bangalore and Karnataka.",
    publishedAt: "2026-04-16",
    updatedAt: "2026-04-16",
    readingTime: "8 min read",
    primaryKeyword: "Berlington pumps applications",
    intentType: "informational",
    clusterSlug: undefined,

    intro: [
      "Fire fighting, HVAC circulation, and water treatment are three different engineering problems. They share very little in terms of duty requirements, material demands, or control logic. Using the same selection approach across all three creates avoidable site problems.",
      "For MEP consultants and contractors in Karnataka, the work happens at duty matching — which Berlington series fits which application, and why.",
    ],

    sections: [
      {
        heading: "Why the same pump cannot be selected across all three applications",
        paragraphs: [
          "A fire fighting pump is designed around standby readiness and instantaneous pressure delivery when called. It may sit idle for months and must start reliably under load. An HVAC pump runs continuously, and selection is dominated by long-hours efficiency and thermal behaviour at part load. A WTP pump handles pressure, transfer, or boosting with material requirements set by fluid chemistry.",
          "We have seen this fail specifically when a WTP pump gets reassigned to fire fighting standby — different start logic, different pressure curve, different seal requirements. Early failure is predictable when duty conditions are ignored at selection.",
        ],
        relatedLinks: [
          {
            slug: "industrial-pumps-in-bangalore-buying-guide",
            label: "Industrial pump buying guide for Bangalore — duty verification and selection checklist",
          },
        ],
      },
      {
        heading: "Berlington pumps in fire fighting systems",
        paragraphs: [
          "In Karnataka commercial buildings and industrial plants, a fire pump is judged by one criterion: does it deliver rated pressure and flow when called? Standby readiness and duty-standby changeover logic are what MEP consultants focus on at specification.",
          "Shaft alignment is a common first-start oversight on newly installed fire pumps — it shows up as vibration and early mechanical seal failure. Check alignment before energisation, not after. Berlington fire fighting configurations are selected against hydrant network pressure requirements, standby logic, and local service response time.",
        ],
        bullets: [
          "Rated pressure delivery at hydrant and sprinkler design points.",
          "Duty-standby changeover — manual or automatic per IS 15105 / NBC requirements.",
          "Commissioning: shaft alignment, coupling check, rotation direction before first start.",
          "Service access for annual inspection and breakdown response in Bangalore.",
        ],
        relatedLinks: [
          {
            slug: "industrial-pumps-in-bangalore-buying-guide",
            label: "Fire pump selection checklist for Karnataka projects",
          },
        ],
      },
      {
        heading: "Berlington pumps in HVAC circulation systems",
        paragraphs: [
          "HVAC circulation duty means long operating hours — often 6,000–8,000 hours per year on a commercial building in Bangalore. Energy consumption compounds quickly on a pump running 20–30% oversized against actual system demand, which is the most common condition we find on site audits.",
          "Correct sizing against the actual system curve — not the theoretical peak — is where most energy savings come from. VFD integration makes sense where load varies significantly across the operating day. It does not help much on constant-head systems; the load profile determines whether VFD investment is justified.",
        ],
        relatedLinks: [
          {
            slug: "optimizing-hvac-pump-efficiency",
            label: "How to size HVAC pumps correctly and integrate VFD control — energy savings guide",
          },
        ],
      },
      {
        heading: "Berlington pumps in WTP and RO systems",
        paragraphs: [
          "Water treatment applications need pumps matched to pressure requirement, flow stability, and material compatibility. For RO feed duty, stainless steel multistage configurations are the standard — SS304 for most treated-water applications, SS316 for coastal Karnataka sites or where chloride levels are elevated.",
          "Pressure stability on the RO feed side directly affects membrane life. Pressure spikes shorten element service life faster than most operators realise. VFD control on RO feed pumps addresses both energy use and membrane protection where feed water quality and recovery rate vary across the day.",
        ],
        relatedLinks: [
          {
            slug: "vertical-multistage-pumps-for-ro-plants",
            label: "Why vertical multistage pumps are the standard for RO and high-pressure WTP",
          },
        ],
      },
      {
        heading: "Typical application scenarios on Karnataka projects",
        paragraphs: [
          "The most common conversations we have are about specific use cases: campus utility pressure boosting, HVAC chilled water circulation, treated water transfer for a commercial plant room, or standby fire system integration on a new building.",
        ],
        bullets: [
          "Fire pump packages for commercial towers and industrial buildings.",
          "HVAC circulation on chiller circuits, cooling towers, and closed loops.",
          "Vertical multistage pumps on RO skids and packaged WTP units.",
          "Pressure boosting for campus utilities and process water systems.",
        ],
      },
    ],

    ctaTitle: "Planning a fire fighting, HVAC, or WTP pump package in Karnataka?",
    ctaBody:
      "Talk to FlowCore Solutions for Berlington pump selection support in Bangalore. We help consultants, contractors, and facility teams match the correct pump family to duty and service requirements.",

    faqs: [
      {
        question: "What applications are Berlington pumps used for?",
        answer:
          "Fire fighting standby, HVAC circulation, water treatment, pressure boosting, and industrial utility water. Correct series selection depends on duty point, fluid, and operating hours.",
      },
      {
        question: "Where can I source Berlington pumps in Bangalore?",
        answer:
          "FlowCore Solutions supplies Berlington pumps across Karnataka with selection support, supply coordination, and service support for commissioned installations.",
      },
      {
        question: "Are Berlington pumps suitable for both HVAC and WTP?",
        answer:
          "Yes, when selected correctly. HVAC and WTP have different duty requirements, material demands, and control logic — the pump series must be matched to the specific application.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // POST 3 — EFFICIENCY / HVAC
  // ─────────────────────────────────────────────
  {
    slug: "optimizing-hvac-pump-efficiency",
    title: "HVAC Pump Efficiency: Sizing, VFD Control and Energy Savings",
    seoTitle:
      "HVAC Pump Efficiency: Sizing, VFD Control and Energy Savings for Commercial Buildings",
    metaDescription:
      "How to reduce HVAC pump energy use in commercial buildings through correct duty sizing, VFD integration, and BEP operation. FlowCore engineering guidance for Bangalore facilities.",
    excerpt:
      "HVAC circulation pumps running oversized are the most common energy waste on commercial buildings in Bangalore. Correct sizing and VFD integration are where the savings are.",
    publishedAt: "2026-04-18",
    updatedAt: "2026-04-18",
    readingTime: "6 min read",
    primaryKeyword: "HVAC pump efficiency",
    intentType: "efficiency",
    clusterSlug: "hvac-pumps",

    intro: [
      "On commercial buildings across Bangalore, HVAC pumps are among the highest continuous energy consumers. Most of them are oversized. They were specified against peak theoretical load, never revisited, and now run at 40–60% of that load for most of the year.",
      "That gap — between specified duty and actual operating condition — is where the energy waste is. Fixing it requires two things: correct sizing against the real system curve, and VFD control where load variation justifies it.",
    ],

    sections: [
      {
        heading: "What operating outside BEP actually costs",
        paragraphs: [
          "Best Efficiency Point (BEP) is the flow and head condition at which a pump operates with minimum energy input and maximum hydraulic efficiency. Every percentage point away from BEP is additional electrical draw for the same output.",
          "On Bangalore commercial sites — Whitefield office campuses, Electronic City facilities — we commonly find HVAC pumps operating 25–40% above actual system demand. At that condition, increased radial loads on the impeller cause accelerated seal and bearing wear. This is also the operating condition where low-frequency vibration complaints from occupied floors are most common.",
          "Oversizing at specification is the cause. MEP design typically stacks a safety margin on top of calculated peak load. The system then runs at a fraction of that for most of its operating life.",
        ],
        relatedLinks: [
          {
            slug: "berlington-pumps-applications-fire-fighting-hvac-wtp",
            label: "How HVAC pump selection fits into fire fighting and WTP application context",
          },
        ],
      },
      {
        heading: "When VFD integration is justified — and when it isn't",
        paragraphs: [
          "A VFD lets the motor adapt speed to actual chilled water or condenser water demand. The affinity laws mean that a 20% speed reduction yields close to 50% energy savings — the relationship is cubic, not linear.",
          "That saving is only real when the system curve varies. A constant-head application — a pressure boosting line maintaining fixed minimum pressure — gains very little from a VFD. Adding one as a blanket efficiency measure without checking the load profile is a common mistake on Karnataka projects.",
          "Check the building's hourly load profile for at least one full operating week before specifying VFD control. If the pump runs at near-constant load, pump replacement at the correct duty point delivers better ROI than a VFD on an oversized unit.",
        ],
        relatedLinks: [
          {
            slug: "industrial-pumps-in-bangalore-buying-guide",
            label: "Full buying guide for industrial pumps in Bangalore — duty verification and selection",
          },
        ],
      },
    ],

    ctaTitle: "Want an HVAC pump efficiency audit for your Bangalore facility?",
    ctaBody:
      "FlowCore Solutions engineers can review your HVAC pump duty conditions, identify oversizing, and recommend correct Berlington pump selection or VFD integration where justified.",

    faqs: [
      {
        question: "How much energy can a VFD save on an HVAC pump?",
        answer:
          "30–50% of pump energy depending on load profile. The saving is real only where system demand varies. Constant-head systems gain little from VFD — correct pump sizing is the better fix there.",
      },
      {
        question: "How do I know if my HVAC pump is oversized?",
        answer:
          "Check whether the control valve is throttled more than 30% at normal operating conditions. Excessive throttling, high noise, or vibration at rated speed all indicate the pump is operating well outside BEP.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // POST 4 — ENGINEERING / VERTICAL MULTISTAGE
  // ─────────────────────────────────────────────
  {
    slug: "vertical-multistage-pumps-for-ro-plants",
    title: "Why Vertical Multistage Pumps Are Specified for RO Plants",
    seoTitle:
      "Vertical Multistage Pumps for RO Plants: Pressure, Footprint and Material Selection",
    metaDescription:
      "Why vertical multistage pumps are the standard RO feed pump selection — pressure stability, compact footprint, and stainless material requirements explained with Karnataka site context.",
    excerpt:
      "RO feed requires consistent high pressure in a compact footprint. Vertical multistage pumps are the standard selection — here is the engineering reasoning and material guidance.",
    publishedAt: "2026-04-19",
    updatedAt: "2026-04-19",
    readingTime: "5 min read",
    primaryKeyword: "vertical multistage pumps for RO",
    intentType: "engineering",
    clusterSlug: "industrial-ro-pumps",

    intro: [
      "RO membranes require stable, consistent feed pressure. Pressure spikes shorten element life faster than most operators track. Getting that pressure reliably in a plant room with a constrained footprint is the practical engineering problem on most Bangalore and Karnataka installations.",
      "Vertical multistage pumps are the standard solution — stacked impellers generate high head incrementally, and the vertical frame fits into plant rooms where a horizontal unit at the same pressure rating would not.",
    ],

    sections: [
      {
        heading: "Why vertical over horizontal for RO feed duty",
        paragraphs: [
          "The vertical frame is the immediate reason on most Bangalore sites. Industrial parks in Peenya and Bommasandra have plant rooms built to minimum dimensions. At 6–12 bar feed pressure, a horizontal multistage unit requires significantly more floor space than its vertical equivalent.",
          "Beyond footprint, vertical multistage pumps connect directly into RO pressure vessel inlet piping in a standard skid layout. The alignment between pump discharge and membrane vessel inlet is cleaner, and suction pipework is shorter — both reduce installation complexity and potential leak points.",
        ],
        relatedLinks: [
          {
            slug: "industrial-pumps-in-bangalore-buying-guide",
            label: "Industrial pump buying guide — selection checklist for WTP and RO applications",
          },
          {
            slug: "berlington-pumps-applications-fire-fighting-hvac-wtp",
            label: "How Berlington pumps are applied across WTP and RO skid projects in Karnataka",
          },
        ],
      },
      {
        heading: "Material selection: SS304 vs SS316 for RO duty",
        paragraphs: [
          "SS304 is the standard construction for most treated-water RO feed duty in inland Karnataka. It provides adequate corrosion resistance for low-TDS and moderate-chloride feed water at typical operating pressures.",
          "For Mangalore and coastal Karnataka installations, SS316 is the correct selection regardless of nominal feed water TDS. Ambient humidity and salt air accelerate galvanic corrosion on external wetted components faster than inland sites. On older coastal installations, impeller wear and casing pitting are the first things to inspect when output pressure drops.",
          "Pump material selection and membrane pressure rating should be reviewed together at the specification stage — they are linked decisions.",
        ],
      },
      {
        heading: "Pressure stability and membrane protection",
        paragraphs: [
          "The stacked impeller design builds pressure incrementally, which produces a flatter, more stable head curve than single-stage alternatives at the same pressure rating. Pressure stability directly protects membrane elements — spikes cause localised stress at the membrane surface and shorten service life.",
          "VFD control on RO feed pumps is increasingly specified where feed water quality and recovery rate vary across the operating day. Running at constant maximum duty when demand is lower stresses membranes unnecessarily. Check shaft alignment before first start on any new RO feed pump installation — misalignment on a high-head multistage unit is one of the more common first-start problems.",
        ],
        relatedLinks: [
          {
            slug: "optimizing-hvac-pump-efficiency",
            label: "VFD control — when it's justified and how to verify savings",
          },
        ],
      },
    ],

    ctaTitle: "Sourcing feed pumps for an RO or WTP project in Karnataka?",
    ctaBody:
      "FlowCore Solutions supplies Berlington vertical multistage pumps for RO and water treatment applications across Bangalore and Karnataka. Contact our team for technical selection support.",

    faqs: [
      {
        question: "Why are vertical multistage pumps preferred for RO feed duty?",
        answer:
          "Compact footprint at high pressure, stable head curve, and direct skid integration. The vertical frame fits plant rooms where horizontal units at the same pressure rating do not.",
      },
      {
        question: "Should I use SS304 or SS316 for an RO pump in Karnataka?",
        answer:
          "SS304 is correct for most inland Karnataka applications. SS316 is required for coastal installations — Mangalore and similar environments — where chloride exposure accelerates corrosion on wetted components.",
      },
      {
        question: "What causes pressure instability on RO feed lines?",
        answer:
          "Oversized pumps running far from BEP, incorrect impeller selection, or mechanical seal wear. Check shaft alignment and impeller clearance first on any RO feed pressure complaint.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// COMBINED BLOG POST REGISTRY
// ─────────────────────────────────────────────

export function getAllBlogPosts(): BlogPost[] {
  const posts = [...BLOG_POSTS, ...PHASE3_BLOG_POSTS];
  const seenSlugs = new Set<string>();

  const deduped = posts.filter((post) => {
    if (seenSlugs.has(post.slug)) return false;
    seenSlugs.add(post.slug);
    return true;
  });

  if (process.env.NODE_ENV === "development") {
    const intentMap = new Map<string, string>();
    deduped.forEach((post) => {
      const key = `${post.primaryKeyword}::${post.intentType ?? "unknown"}`;
      if (intentMap.has(key)) {
        console.warn(
          `[SEO] Potential blog cannibalization: "${post.slug}" and "${intentMap.get(key)}" share keyword "${post.primaryKeyword}" with intent "${post.intentType}"`
        );
      } else {
        intentMap.set(key, post.slug);
      }
    });
  }

  return deduped;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPostsByCluster(clusterSlug: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.clusterSlug === clusterSlug);
}

export function getBlogPostsByIntent(intentType: BlogIntentType): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.intentType === intentType);
}
