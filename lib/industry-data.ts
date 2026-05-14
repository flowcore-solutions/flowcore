export type Industry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  overview: string[];
  challenges: string[];
  solutions: string[];
  relatedProducts: string[]; // slugs from seoKeywords.products
  relatedApplications: string[]; // slugs for applications
  faqs: { question: string; answer: string }[];
};

const CORE_INDUSTRIES: Industry[] = [
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    title: "Pump Solutions for Pharmaceutical Manufacturing in Karnataka",
    description: "Precision-engineered pump systems for pharma process water, utility transfer, and cleanroom applications across Bangalore pharmaceutical hubs.",
    overview: [
      "The pharmaceutical industry in Karnataka, particularly around Bangalore's industrial clusters, demands the highest standards of hygiene and precision in water movement. From Purified Water (PW) loops to utility transfer, every pump must meet stringent material specifications and performance reliability.",
      "FlowCore Solutions provides Berlington pump systems configured for the unique needs of pharmaceutical plants, ensuring corrosion resistance, easy maintenance, and compliance with industrial standards."
    ],
    challenges: [
      "Maintaining high-purity water standards without contamination.",
      "Variable flow demand in complex process loops.",
      "Need for acid-resistant and chemical-compatible materials for process transfer.",
      "Stringent documentation and material traceability requirements."
    ],
    solutions: [
      "Vertical multistage pumps for PW and WFI circulation loops.",
      "Fluorine chemical pumps for aggressive media transfer.",
      "High-pressure booster systems for facility cleaning and sanitation.",
      "Variable speed drives for precise flow control in process lines."
    ],
    relatedProducts: ["verticalPumps", "chemicalPumps", "roPumps"],
    relatedApplications: ["water-treatment", "hvac"],
    faqs: [
      {
        question: "Which pumps are best for pharma water treatment plants?",
        answer: "Vertical multistage pumps (SS316) and high-pressure RO pumps are standard for pharmaceutical WTP systems due to their precision and material compatibility."
      },
      {
        question: "Do you supply chemical resistant pumps for lab applications?",
        answer: "Yes, our SZ Fluorine Chemical Pumps are specifically designed for aggressive media transfer in pharmaceutical and laboratory environments."
      }
    ]
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    title: "Critical Water Infrastructure for Hospitals in Bangalore",
    description: "Reliable pressure boosting, HVAC circulation, and fire protection systems for healthcare facilities across Karnataka.",
    overview: [
      "Hospital infrastructure is mission-critical. In Bangalore, healthcare facilities rely on consistent water pressure for sanitation, sterile supplies, and patient care. HVAC systems must also operate 24/7 to maintain clinical environments.",
      "FlowCore Solutions understands the 'zero-fail' requirement of hospital water systems. We supply integrated booster sets and circulation pumps that ensure redundancy and efficiency."
    ],
    challenges: [
      "24/7 continuous operation with zero downtime.",
      "Maintaining constant pressure across multiple floors in large hospital complexes.",
      "High-efficiency HVAC circulation for climate-controlled wards.",
      "Reliable fire fighting readiness for high-occupancy buildings."
    ],
    solutions: [
      "Variable speed Hydro-Booster systems for constant water pressure.",
      "Vertical inline pumps for HVAC and chilled water circulation.",
      "NBC-compliant fire pump packages for life safety systems.",
      "Submersible sewage pumps for facility wastewater management."
    ],
    relatedProducts: ["boosterPumps", "verticalPumps", "fireFightingPumps", "stpEtpPumps"],
    relatedApplications: ["hvac", "fire-fighting", "pressure-boosting"],
    faqs: [
      {
        question: "How do you ensure constant water pressure in a multi-story hospital?",
        answer: "We use Variable Frequency Drive (VFD) based booster systems that adjust pump speed in real-time based on actual demand, ensuring stable pressure across all floors."
      }
    ]
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    title: "Industrial Pump Systems for Manufacturing Plants in Karnataka",
    description: "Heavy-duty pump solutions for process cooling, boiler feed, and utility water transfer in Karnataka industrial estates.",
    overview: [
      "Manufacturing clusters in Peenya, Bidadi, and Hoskote require robust pumping solutions for diverse industrial processes. Whether it's high-temperature boiler feed or high-volume cooling water, the pumps must withstand industrial-grade duty cycles.",
      "We provide end-suction and multistage pumps that are the backbone of Karnataka's manufacturing utility systems."
    ],
    challenges: [
      "Handling high-temperature fluids in boiler systems.",
      "Large-scale water transfer for process cooling towers.",
      "Operating in dusty or harsh industrial environments.",
      "Optimizing energy consumption for large pump installations."
    ],
    solutions: [
      "Multistage boiler feed pumps for high-pressure steam systems.",
      "End-suction centrifugal pumps for large-scale cooling water loops.",
      "Submersible dewatering pumps for plant room drainage.",
      "Self-priming mixing pumps for industrial aeration and mixing."
    ],
    relatedProducts: ["boilerFeedPumps", "centrifugalPumps", "submersiblePumps"],
    relatedApplications: ["hvac", "water-treatment"],
    faqs: [
      {
        question: "What is the best pump for boiler feed applications?",
        answer: "Vertical multistage pumps (CDLF series) are ideal for boiler feed due to their high pressure capability and thermal range up to 120°C."
      }
    ]
  }
];

const extraIndustries: Industry[] = [
  {
    slug: "hotels",
    name: "Hotels",
    title: "Pump Systems for Hotels in Karnataka",
    description: "Pressure booster, HVAC, fire fighting, STP, RO, and utility pump support for hotels in Bangalore, Mysore, Mangalore, and Karnataka.",
    overview: [
      "Hotel pump systems must support guest comfort, hygiene, fire readiness, HVAC performance, and wastewater handling without disrupting daily operations.",
      "FlowCore helps hotel engineering teams review pressure boosting, HVAC circulation, STP pumps, fire pump packages, and RO/WTP pump requirements as one connected infrastructure system.",
    ],
    challenges: [
      "Peak guest water demand during morning and evening use.",
      "Noise-sensitive pump rooms near occupied spaces.",
      "STP reliability and odor-risk prevention.",
      "Fire pump readiness for high-occupancy buildings.",
    ],
    solutions: [
      "VFD booster systems for stable guest-room pressure.",
      "Inline and end-suction pumps for HVAC circulation.",
      "Submersible sewage pumps for STP wet-well duty.",
      "Main and jockey pump packages for fire protection.",
    ],
    relatedProducts: ["pressure-booster-pumps", "hvac-pumps", "fire-fighting-pumps", "stp-etp-sewage-pumps"],
    relatedApplications: ["hotel-water-systems", "pressure-boosting", "hvac", "fire-fighting", "sewage-treatment"],
    faqs: [
      { question: "Which pumps are required in hotels?", answer: "Hotels commonly need booster pumps, HVAC circulation pumps, fire fighting pumps, STP pumps, and water treatment or RO pumps." },
      { question: "Can FlowCore support hotel pump systems in Bangalore?", answer: "Yes. FlowCore supports hotel pump selection, supply guidance, and service planning across Bangalore and Karnataka." },
    ],
  },
  {
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    title: "Pump Solutions for Commercial Buildings in Karnataka",
    description: "Booster, HVAC, fire fighting, drainage, STP, and utility pump systems for offices, malls, campuses, and commercial towers.",
    overview: [
      "Commercial buildings depend on pumps for water pressure, HVAC circulation, fire protection, drainage, and wastewater handling.",
      "The strongest selections are made by reviewing the building as a system: occupancy, floor height, demand peaks, cooling load, and maintenance access.",
    ],
    challenges: [
      "Variable water demand across occupancy cycles.",
      "Long-hour HVAC pump operation and energy cost.",
      "Fire pump readiness and periodic testing.",
      "Plant room space constraints and service access.",
    ],
    solutions: [
      "Pressure booster systems with VFD control.",
      "Inline and end-suction HVAC circulation pumps.",
      "Fire pump packages with jockey pressure maintenance.",
      "Drainage and sewage pumps for basement and STP duty.",
    ],
    relatedProducts: ["pressure-booster-pumps", "hvac-pumps", "fire-fighting-pumps", "stp-etp-sewage-pumps"],
    relatedApplications: ["high-rise-water-supply", "chilled-water-circulation", "hydrant-systems", "sewage-treatment"],
    faqs: [
      { question: "Which pumps are used in commercial buildings?", answer: "Common pump systems include booster pumps, HVAC circulation pumps, fire pumps, STP pumps, and drainage pumps." },
    ],
  },
  {
    slug: "water-treatment-contractors",
    name: "Water Treatment Contractors",
    title: "Pump Support for Water Treatment Contractors in Karnataka",
    description: "RO, WTP, STP, ETP, filtration, transfer, and aeration pump support for treatment contractors.",
    overview: [
      "Water treatment contractors need pump selections that fit the treatment train, not just the rated flow. RO feed, filter feed, transfer, STP, ETP, and aeration equipment each have different duty logic.",
      "FlowCore supports contractors with Berlington pump selection, local supply coordination, and technical guidance for Karnataka projects.",
    ],
    challenges: [
      "Changing water quality between raw, treated, and wastewater stages.",
      "High-pressure RO feed requirements.",
      "STP clogging and wet-well maintenance issues.",
      "Commissioning delays due to incorrect pump sizing.",
    ],
    solutions: [
      "Vertical multistage pumps for RO feed and pressure systems.",
      "Submersible sewage pumps for STP and wastewater.",
      "Side channel blowers for aeration duty.",
      "Material-compatible pump selection for treatment chemistry.",
    ],
    relatedProducts: ["industrial-ro-pumps", "vertical-multistage-pumps", "stp-etp-sewage-pumps", "chemical-dosing-pumps"],
    relatedApplications: ["ro-plants", "water-treatment", "sewage-treatment", "aeration", "chemical-transfer"],
    faqs: [
      { question: "Which pumps are used by WTP and STP contractors?", answer: "Treatment contractors commonly use multistage RO pumps, transfer pumps, submersible sewage pumps, chemical pumps, and aeration blowers." },
    ],
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    title: "Pump Systems for Warehouses and Logistics Facilities",
    description: "Fire fighting, drainage, utility water, booster, and STP pump support for warehouse infrastructure in Karnataka.",
    overview: [
      "Warehouses require dependable fire protection, drainage, and utility water systems even when daily water demand is lower than hotels or hospitals.",
      "FlowCore supports warehouse projects with fire pump selection, drainage pump guidance, and practical service planning.",
    ],
    challenges: [
      "Large-area fire hydrant and sprinkler coverage.",
      "Stormwater, basement, or utility pit drainage.",
      "Long standby periods for fire pump systems.",
      "Service access across distributed industrial sites.",
    ],
    solutions: [
      "Fire pump packages for hydrant and sprinkler systems.",
      "Submersible drainage or sewage pumps for pits.",
      "Utility water transfer pumps for facility support.",
    ],
    relatedProducts: ["fire-fighting-pumps", "submersible-pumps", "centrifugal-pumps"],
    relatedApplications: ["hydrant-systems", "sprinkler-systems", "industrial-drainage", "utility-water"],
    faqs: [
      { question: "Which pumps are important for warehouses?", answer: "Fire fighting pumps and drainage pumps are often the most important pump systems in warehouses." },
    ],
  },
  {
    slug: "food-and-beverage",
    name: "Food and Beverage",
    title: "Pump Solutions for Food and Beverage Utilities",
    description: "Utility water, boiler feed, RO, HVAC, and process water pump support for food and beverage facilities.",
    overview: [
      "Food and beverage plants rely on pumps for utility water, boiler feed, RO/WTP support, process cooling, washdown, and wastewater handling.",
      "Material compatibility, hygiene-sensitive water systems, and uptime are central to selecting the right pump family.",
    ],
    challenges: [
      "Continuous production utility demand.",
      "Boiler and hot water feed reliability.",
      "Treated water quality for process support.",
      "Wastewater and washdown handling.",
    ],
    solutions: [
      "Multistage pumps for boiler feed and RO pressure.",
      "Centrifugal pumps for utility transfer.",
      "Submersible sewage pumps for wastewater.",
      "HVAC and process cooling circulation pumps.",
    ],
    relatedProducts: ["boiler-feed-pumps", "industrial-ro-pumps", "hvac-pumps", "stp-etp-sewage-pumps"],
    relatedApplications: ["boiler-feed", "ro-plants", "process-cooling", "wastewater-transfer"],
    faqs: [
      { question: "Which pump duties matter in food and beverage plants?", answer: "Common duties include boiler feed, RO/WTP, utility transfer, process cooling, washdown support, and wastewater transfer." },
    ],
  },
  {
    slug: "textile",
    name: "Textile",
    title: "Pump Solutions for Textile Utilities and Process Support",
    description: "Boiler feed, chemical transfer, process water, wastewater, and utility pump support for textile facilities.",
    overview: [
      "Textile facilities often combine hot water, boiler feed, chemical transfer, process water, and wastewater requirements.",
      "Pump selection should review fluid temperature, chemical compatibility, operating hours, and effluent conditions.",
    ],
    challenges: [
      "Hot water and boiler support duties.",
      "Chemical exposure from process stages.",
      "Wastewater transfer and treatment demand.",
      "Energy cost from long operating hours.",
    ],
    solutions: [
      "Boiler feed pumps for steam utility systems.",
      "Chemical transfer pumps for compatible media.",
      "Submersible sewage or wastewater pumps for treatment areas.",
      "Centrifugal pumps for utility water transfer.",
    ],
    relatedProducts: ["boiler-feed-pumps", "chemical-dosing-pumps", "stp-etp-sewage-pumps", "centrifugal-pumps"],
    relatedApplications: ["boiler-feed", "chemical-transfer", "wastewater-transfer", "process-water-transfer"],
    faqs: [
      { question: "Do textile plants need chemical-compatible pumps?", answer: "Yes, where process media or effluent chemistry can attack standard materials, chemical compatibility must be reviewed." },
    ],
  },
  {
    slug: "data-centers",
    name: "Data Centers",
    title: "Pump Systems for Data Center Cooling and Water Infrastructure",
    description: "HVAC, chilled water, condenser water, fire, and booster pump support for uptime-sensitive data center facilities.",
    overview: [
      "Data centers depend on cooling reliability and building services uptime. Pumps supporting chilled water, condenser water, fire protection, and water pressure must be selected for predictable operation.",
      "FlowCore supports data center pump discussions around redundancy, vibration, efficiency, and maintenance access.",
    ],
    challenges: [
      "Uptime-sensitive cooling systems.",
      "Energy cost from continuous circulation.",
      "Redundancy and standby planning.",
      "Vibration and service access requirements.",
    ],
    solutions: [
      "End-suction and inline pumps for HVAC circulation.",
      "VFD control for variable cooling load.",
      "Fire pump systems for building safety.",
      "Booster systems for facility water pressure.",
    ],
    relatedProducts: ["hvac-pumps", "fire-fighting-pumps", "pressure-booster-pumps"],
    relatedApplications: ["chilled-water-circulation", "cooling-tower-circulation", "fire-fighting", "pressure-boosting"],
    faqs: [
      { question: "Which pump systems matter most for data centers?", answer: "HVAC circulation pumps, cooling tower pumps, fire pumps, and booster systems are common data center infrastructure duties." },
    ],
  },
  {
    slug: "residential-towers",
    name: "Residential Towers",
    title: "Pressure Booster and Fire Pump Systems for Residential Towers",
    description: "High-rise booster, fire fighting, STP, and utility pump support for residential tower projects.",
    overview: [
      "Residential towers need reliable water pressure, fire readiness, STP transfer, drainage, and utility pump support.",
      "FlowCore reviews pressure zoning, pump cycling, service access, and standby requirements for high-rise buildings.",
    ],
    challenges: [
      "Pressure stability across floors.",
      "Frequent booster cycling.",
      "Fire pump readiness.",
      "STP and basement drainage reliability.",
    ],
    solutions: [
      "VFD booster systems for high-rise pressure control.",
      "Fire pump packages with jockey pressure maintenance.",
      "Submersible pumps for STP and drainage.",
    ],
    relatedProducts: ["pressure-booster-pumps", "fire-fighting-pumps", "stp-etp-sewage-pumps"],
    relatedApplications: ["high-rise-water-supply", "fire-fighting", "sewage-treatment"],
    faqs: [
      { question: "Which pump is best for residential tower pressure boosting?", answer: "VFD booster systems are often preferred for variable demand, but sizing must be based on floors, pressure zones, and fixture demand." },
    ],
  },
];

export const INDUSTRIES: Industry[] = [
  ...CORE_INDUSTRIES,
  ...extraIndustries.filter((extra) => !CORE_INDUSTRIES.some((core) => core.slug === extra.slug)),
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
