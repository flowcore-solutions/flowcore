export type Application = {
  slug: string;
  name: string;
  title: string;
  description: string;
  engineeringExplanation: string[];
  keyConsiderations: string[];
  recommendedPumps: { id: string; name: string }[];
  industries: string[];
  faqs: { question: string; answer: string }[];
};

export type DiagramNode = {
  id: string;
  label: string;
  role: string;
  pumpModelId: string;
  x: number;
  y: number;
};

export type ApplicationEnvironment = {
  id: string;
  shortName: string;
  name: string;
  description: string;
  diagramNodes: DiagramNode[];
};

const CORE_APPLICATIONS: Application[] = [
  {
    slug: "ro-plants",
    name: "RO Plants",
    title: "High Pressure Pumps for Industrial Reverse Osmosis (RO) Plants",
    description: "Engineering-grade pump solutions for RO membrane feeding, desalination, and brackish water treatment in Karnataka.",
    engineeringExplanation: [
      "Reverse Osmosis (RO) requires precise high-pressure feed to overcome osmotic pressure and force water through semi-permeable membranes. The pump selection is the most critical energy-consuming component of any RO plant.",
      "FlowCore supplies Berlington high-pressure multistage pumps designed to provide stable, pulse-free flow essential for membrane longevity and consistent permeate quality."
    ],
    keyConsiderations: [
      "Flux rate stability for consistent membrane performance.",
      "Material selection to prevent corrosion from high TDS or chemical cleaning.",
      "Energy recovery integration for large scale RO desalination.",
      "Pump efficiency (VFD control) to reduce operating expenditure."
    ],
    recommendedPumps: [
      { id: "cdlf-cdh", name: "CDLF HP Series" },
      { id: "cdl-cdlf", name: "Standard Vertical Multistage" }
    ],
    industries: ["pharmaceutical", "manufacturing", "water-treatment"],
    faqs: [
      {
        question: "Why use vertical multistage pumps for RO feed?",
        answer: "They offer high pressure in a compact footprint, high efficiency, and the ability to handle the continuous duty cycles required by industrial RO plants."
      }
    ]
  },
  {
    slug: "fire-fighting",
    name: "Fire Fighting",
    title: "Compliant Fire Fighting Pump Systems for Karnataka Buildings",
    description: "NBC 2016 and NFPA-aligned fire hydrant and sprinkler pump packages for commercial and industrial sites in Bangalore.",
    engineeringExplanation: [
      "Fire fighting systems are defined by standby readiness. A fire pump may sit idle for years but must deliver 100% rated pressure the instant a hydrant is opened or a sprinkler bulb bursts.",
      "Our fire pump systems are engineered as complete packages, including the main electric pump, a diesel standby pump for power-outage scenarios, and a jockey pump to maintain system pressure."
    ],
    keyConsiderations: [
      "Compliance with NBC (National Building Code) and Local Fire NOC requirements.",
      "Standby diesel engine reliability and auto-start logic.",
      "Jockey pump sizing to prevent unnecessary main pump starts.",
      "Remote monitoring and alarm integration."
    ],
    recommendedPumps: [
      { id: "niso", name: "End-Suction Centrifugal (Main)" },
      { id: "ld", name: "Vertical Inline (Sprinkler)" },
      { id: "mini", name: "Jockey Pump" }
    ],
    industries: ["hospitals", "commercial-buildings", "hotels", "manufacturing"],
    faqs: [
      {
        question: "What is the role of a jockey pump in fire fighting?",
        answer: "A jockey pump maintains static pressure in the fire network, compensating for small leaks so the large main fire pump doesn't have to start unnecessarily."
      }
    ]
  },
  {
    slug: "hvac",
    name: "HVAC & Circulation",
    title: "Energy-Efficient HVAC Circulation Pumps in Bangalore",
    description: "Chilled water circulation, condenser water loops, and cooling tower pumps for Karnataka's large-scale climate control systems.",
    engineeringExplanation: [
      "In modern commercial buildings and hospitals, HVAC systems account for a major portion of energy spend. The circulation pumps (chilled water and condenser water) must operate at peak efficiency across variable loads.",
      "We supply inline and end-suction pumps with precision-balanced impellers to minimize vibration and noise, crucial for hospital and hotel environments."
    ],
    keyConsiderations: [
      "Vibration and noise reduction for building services.",
      "NPSH (Net Positive Suction Head) requirements for cooling tower loops.",
      "System head calculation for high-rise circulation.",
      "Thermal insulation compatibility for chilled water lines."
    ],
    recommendedPumps: [
      { id: "ld", name: "LD Vertical Inline" },
      { id: "niso", name: "NISO End-Suction" },
      { id: "cdlk-cdlkf", name: "Immersion Pumps" }
    ],
    industries: ["hotels", "hospitals", "commercial-buildings", "manufacturing"],
    faqs: [
      {
        question: "Which pump is better for HVAC: Inline or End-Suction?",
        answer: "Vertical Inline pumps (LD series) are often preferred for their space-saving design and ease of piping, while End-Suction (NISO) is used for very high flow requirements."
      }
    ]
  }
];

const extraApplications: Application[] = [
  {
    slug: "boiler-feed",
    name: "Boiler Feed",
    title: "Boiler Feed Pump Selection for Karnataka Steam Systems",
    description: "High-pressure pump guidance for boiler feed water, steam utilities, hot water duty, and manufacturing plant rooms.",
    engineeringExplanation: [
      "Boiler feed applications require a pump that can deliver feed water at a pressure above boiler demand while handling temperature, NPSH, and continuous-duty requirements.",
      "FlowCore reviews pressure margin, feed-water temperature, suction source, minimum-flow bypass, and seal compatibility before recommending a multistage or centrifugal pump family.",
    ],
    keyConsiderations: [
      "Pressure margin above boiler operating pressure.",
      "Hot feed water effect on NPSH and seal life.",
      "Minimum-flow bypass planning for low-demand periods.",
      "Scaling and water quality impact on pump internals.",
    ],
    recommendedPumps: [
      { id: "cdlf-cdh", name: "CDLF / CDH High Pressure Unit" },
      { id: "cdl-cdlf", name: "CDL / CDLF Vertical Multistage" },
    ],
    industries: ["manufacturing", "pharmaceutical", "food-and-beverage", "textile", "hotels"],
    faqs: [
      { question: "Which pump is used for boiler feed?", answer: "Multistage pumps are commonly used where boiler feed duty requires high head and stable pressure." },
    ],
  },
  {
    slug: "water-treatment",
    name: "Water Treatment",
    title: "Pump Systems for Water Treatment Plants in Karnataka",
    description: "Pump selection for WTP, filtration, transfer, RO feed, chemical-compatible duty, and treated water distribution.",
    engineeringExplanation: [
      "Water treatment plants use different pump duties across raw water transfer, filtration feed, RO pressure, chemical dosing support, treated water transfer, and utility distribution.",
      "The correct selection depends on water quality, pressure requirement, corrosion risk, operating hours, and service access.",
    ],
    keyConsiderations: [
      "Material compatibility with raw, treated, and chemically conditioned water.",
      "Stable pressure for filtration and membrane processes.",
      "Energy efficiency for long-running treatment systems.",
      "Maintenance access for contractors and plant operators.",
    ],
    recommendedPumps: [
      { id: "cdl-cdlf", name: "CDL / CDLF Vertical Multistage" },
      { id: "chlf", name: "CHLF Horizontal Multistage" },
      { id: "niso", name: "NISO End-Suction" },
    ],
    industries: ["water-treatment-contractors", "manufacturing", "pharmaceutical"],
    faqs: [
      { question: "Which pumps are used in water treatment plants?", answer: "Common WTP pump duties include transfer pumps, multistage pressure pumps, RO feed pumps, sewage pumps, and chemical-compatible process pumps." },
    ],
  },
  {
    slug: "industrial-filtration",
    name: "Industrial Filtration",
    title: "Pumps for Industrial Filtration and Process Water Systems",
    description: "Pump guidance for filter feed, backwash, RO pre-treatment, and process water circulation.",
    engineeringExplanation: [
      "Industrial filtration depends on predictable pressure and flow through filter media. Pump selection must consider clean-filter and fouled-filter conditions.",
      "FlowCore reviews pressure loss, filtration stages, operating hours, and material compatibility before recommending a pump arrangement.",
    ],
    keyConsiderations: ["Filter pressure drop", "Backwash demand", "Water quality", "Continuous operation efficiency"],
    recommendedPumps: [
      { id: "cdlk-cdlkf", name: "CDLK / CDLKF Multistage" },
      { id: "chm", name: "CHM Horizontal Multistage" },
    ],
    industries: ["manufacturing", "water-treatment-contractors"],
    faqs: [
      { question: "How do filter pressure drops affect pump selection?", answer: "The pump must be selected for the expected pressure range as filters load with solids, not only for the clean-filter condition." },
    ],
  },
  {
    slug: "sewage-treatment",
    name: "Sewage Treatment",
    title: "Sewage Treatment Pump Systems for STP Projects",
    description: "Submersible sewage and wastewater pump guidance for STP wet wells, transfer lines, and treatment contractors.",
    engineeringExplanation: [
      "Sewage treatment pump selection must account for solids, sludge density, wet-well design, access for cleaning, and duty-standby reliability.",
      "A clean-water pump should not be forced into sewage service because clogging and seal stress can quickly create downtime.",
    ],
    keyConsiderations: ["Solids passage", "Wet-well depth", "Float switch reliability", "Duty-standby configuration"],
    recommendedPumps: [
      { id: "wq", name: "WQ Submersible Sewage Pump" },
      { id: "bt", name: "BT Side Channel Blower" },
    ],
    industries: ["hotels", "hospitals", "commercial-buildings", "water-treatment-contractors"],
    faqs: [
      { question: "Which pump is used in STP?", answer: "Submersible sewage pumps are commonly used for STP transfer and wet-well duty because they handle wastewater and solids more reliably." },
    ],
  },
  {
    slug: "wastewater-transfer",
    name: "Wastewater Transfer",
    title: "Wastewater Transfer Pumps for Karnataka Facilities",
    description: "Pump selection for wastewater movement in STP, ETP, drainage, and industrial treatment systems.",
    engineeringExplanation: [
      "Wastewater transfer pumps must handle variable liquid quality, solids, and operating conditions that differ from clean-water duty.",
      "FlowCore checks solids profile, transfer head, tank level, pump access, and material compatibility before recommending a solution.",
    ],
    keyConsiderations: ["Solids profile", "Transfer head", "Corrosion risk", "Cleaning access"],
    recommendedPumps: [{ id: "wq", name: "WQ Submersible Sewage Pump" }],
    industries: ["manufacturing", "commercial-buildings", "water-treatment-contractors"],
    faqs: [{ question: "Can clean-water pumps handle wastewater?", answer: "Clean-water pumps are usually not suitable where solids, sludge, or ragging risk exists." }],
  },
  {
    slug: "industrial-drainage",
    name: "Industrial Drainage",
    title: "Industrial Drainage Pump Support for Karnataka Sites",
    description: "Drainage and dewatering pump guidance for plant rooms, wet areas, construction sites, and utility pits.",
    engineeringExplanation: [
      "Drainage pump selection depends on whether the liquid is clean water, muddy water, wastewater, or solids-bearing liquid.",
      "Temporary dewatering and permanent drainage systems need different service assumptions, controls, and access planning.",
    ],
    keyConsiderations: ["Pit depth", "Solids or sludge presence", "Automatic level control", "Portable versus fixed installation"],
    recommendedPumps: [{ id: "wq", name: "WQ Submersible Pump" }, { id: "qy-b", name: "QY(B) Self-Priming Pump" }],
    industries: ["manufacturing", "warehouses", "commercial-buildings"],
    faqs: [{ question: "Is a drainage pump the same as a sewage pump?", answer: "No. Sewage pumps are selected for wastewater solids, while drainage pumps may only need to move cleaner water." }],
  },
  {
    slug: "aeration",
    name: "Aeration",
    title: "Aeration Equipment Support for STP and Wastewater Systems",
    description: "Side channel blower and aeration support for wastewater treatment and oxygen transfer applications.",
    engineeringExplanation: [
      "Aeration is an air movement duty, not a liquid pumping duty. In STP systems, blowers help support biological treatment by delivering air to the process.",
      "FlowCore separates blower selection from wastewater pump selection so treatment contractors do not confuse air flow with liquid flow.",
    ],
    keyConsiderations: ["Air flow", "Pressure in water column", "Noise", "Duty cycle"],
    recommendedPumps: [{ id: "bt", name: "BT Side Channel Blower" }],
    industries: ["water-treatment-contractors", "commercial-buildings", "manufacturing"],
    faqs: [{ question: "Is an aeration blower a pump?", answer: "A side channel blower moves air, while pumps move liquid. Both may be used in STP systems but for different duties." }],
  },
  {
    slug: "high-rise-water-supply",
    name: "High-Rise Water Supply",
    title: "High-Rise Water Supply Booster Systems",
    description: "Booster pump and pressure zoning guidance for towers, hospitals, hotels, and commercial buildings.",
    engineeringExplanation: [
      "High-rise water supply requires pressure zoning, stable controls, and careful protection against excessive pressure at lower floors.",
      "FlowCore reviews static height, fixture demand, pressure set points, tanks, VFD logic, and service access.",
    ],
    keyConsiderations: ["Static height", "Pressure zoning", "VFD control", "Tank sizing"],
    recommendedPumps: [{ id: "hydro", name: "HYDRO Variable Speed Booster" }, { id: "cdl-cdlf", name: "CDL / CDLF Multistage" }],
    industries: ["hospitals", "hotels", "commercial-buildings", "residential-towers"],
    faqs: [{ question: "Which pump is used for high-rise water supply?", answer: "VFD booster systems and vertical multistage pumps are common where stable pressure is required across multiple floors." }],
  },
  {
    slug: "hotel-water-systems",
    name: "Hotel Water Systems",
    title: "Pump Systems for Hotel Water Infrastructure",
    description: "Pressure booster, HVAC, fire, RO, and STP pump guidance for hotels in Karnataka.",
    engineeringExplanation: [
      "Hotels need pumps for guest water pressure, HVAC comfort, fire readiness, sewage treatment, and water treatment.",
      "The selection should consider demand peaks, noise, maintenance timing, standby requirements, and service response.",
    ],
    keyConsiderations: ["Guest-room pressure", "Low noise", "Standby readiness", "Maintenance scheduling"],
    recommendedPumps: [{ id: "hydro", name: "HYDRO Booster" }, { id: "ld", name: "LD Inline HVAC Pump" }, { id: "wq", name: "WQ Sewage Pump" }],
    industries: ["hotels"],
    faqs: [{ question: "Which pumps are needed in hotels?", answer: "Hotels commonly need booster pumps, HVAC circulation pumps, fire pumps, STP pumps, and water treatment pumps." }],
  },
  {
    slug: "utility-water",
    name: "Utility Water",
    title: "Utility Water Pumps for Industrial and Commercial Sites",
    description: "General utility water transfer and pressure support for Karnataka buildings and plants.",
    engineeringExplanation: [
      "Utility water pumps support plant rooms, service blocks, process utilities, washdown, and distribution duties.",
      "Selection should match flow, head, material, controls, and expected operating hours.",
    ],
    keyConsiderations: ["Flow demand", "Distribution head", "Material", "Operating hours"],
    recommendedPumps: [{ id: "niso", name: "NISO End-Suction" }, { id: "zs", name: "ZS Single-Stage" }],
    industries: ["manufacturing", "commercial-buildings"],
    faqs: [{ question: "What is a utility water pump?", answer: "A utility water pump moves service water for non-specialized industrial or building support duties." }],
  },
  {
    slug: "hydrant-systems",
    name: "Hydrant Systems",
    title: "Fire Hydrant Pump Support for Karnataka Buildings",
    description: "Pump selection guidance for fire hydrant networks, main pumps, jockey pumps, and standby arrangements.",
    engineeringExplanation: [
      "Hydrant systems require dependable pressure and flow under emergency demand, with pumps sized to the network and building requirement.",
      "Jockey pumps maintain pressure, while main and standby pumps provide fire event flow.",
    ],
    keyConsiderations: ["Hydrant flow", "Pressure demand", "Jockey pump", "Standby readiness"],
    recommendedPumps: [{ id: "niso", name: "NISO Main Fire Pump" }, { id: "mini", name: "MINI Jockey Pump" }],
    industries: ["hospitals", "hotels", "commercial-buildings", "warehouses"],
    faqs: [{ question: "What pump is used for hydrant systems?", answer: "End-suction or suitable fire pump configurations are selected based on required hydrant flow and pressure." }],
  },
  {
    slug: "sprinkler-systems",
    name: "Sprinkler Systems",
    title: "Sprinkler Pump Support for Building Safety Systems",
    description: "Pump support for sprinkler networks, pressure maintenance, and fire protection readiness.",
    engineeringExplanation: [
      "Sprinkler systems require reliable pressure and activation readiness. Pump selection must follow the consultant's fire protection design.",
      "FlowCore supports pump family selection and service planning for sprinkler-led projects.",
    ],
    keyConsiderations: ["Sprinkler demand", "Pressure maintenance", "Controller logic", "Testing"],
    recommendedPumps: [{ id: "ld", name: "LD Inline Pump" }, { id: "niso", name: "NISO End-Suction Pump" }],
    industries: ["commercial-buildings", "hospitals", "hotels", "warehouses"],
    faqs: [{ question: "Are hydrant and sprinkler pumps the same?", answer: "They may use similar pump families, but the selection depends on the network demand and fire protection design." }],
  },
  {
    slug: "building-safety-systems",
    name: "Building Safety Systems",
    title: "Pump Support for Building Safety and Fire Readiness",
    description: "Pump selection and maintenance context for fire protection and standby-critical building systems.",
    engineeringExplanation: [
      "Building safety systems need pump packages that are ready during critical events, not only during commissioning.",
      "Testing, standby logic, controller status, and maintenance access are part of the selection.",
    ],
    keyConsiderations: ["Standby logic", "Testing access", "Controller status", "Fire NOC context"],
    recommendedPumps: [{ id: "niso", name: "NISO Fire Pump" }, { id: "mini", name: "MINI Jockey Pump" }],
    industries: ["commercial-buildings", "hospitals", "hotels"],
    faqs: [{ question: "Why is fire pump maintenance important?", answer: "Fire pumps may remain idle but must deliver pressure immediately when required." }],
  },
  {
    slug: "chilled-water-circulation",
    name: "Chilled Water Circulation",
    title: "Chilled Water Circulation Pumps for HVAC Systems",
    description: "Pump selection for chilled water loops in hospitals, hotels, commercial towers, and process cooling systems.",
    engineeringExplanation: [
      "Chilled water pumps circulate low-temperature water through HVAC loops and must match system head and building load variation.",
      "Oversizing can waste energy and create balancing problems in long-hour systems.",
    ],
    keyConsiderations: ["System head", "Variable load", "VFD control", "Noise and vibration"],
    recommendedPumps: [{ id: "ld", name: "LD Vertical Inline" }, { id: "niso", name: "NISO End-Suction" }],
    industries: ["hospitals", "hotels", "commercial-buildings", "data-centers"],
    faqs: [{ question: "How are chilled water pumps sized?", answer: "They are sized by required flow, total dynamic head, loop resistance, load pattern, and control strategy." }],
  },
  {
    slug: "cooling-tower-circulation",
    name: "Cooling Tower Circulation",
    title: "Cooling Tower Circulation Pump Support",
    description: "Pump guidance for condenser water loops, cooling towers, and industrial cooling applications.",
    engineeringExplanation: [
      "Cooling tower circulation pumps move condenser water through heat rejection loops and must handle flow, head, and NPSH-sensitive layouts.",
      "FlowCore reviews tower basin conditions, suction piping, condenser pressure drop, and control strategy.",
    ],
    keyConsiderations: ["Tower basin level", "NPSH", "Condenser pressure drop", "Vibration"],
    recommendedPumps: [{ id: "niso", name: "NISO End-Suction" }, { id: "ld", name: "LD Inline Pump" }],
    industries: ["manufacturing", "commercial-buildings", "data-centers"],
    faqs: [{ question: "What pump is used for cooling towers?", answer: "End-suction and inline centrifugal pumps are commonly used depending on flow, head, and installation layout." }],
  },
  {
    slug: "process-cooling",
    name: "Process Cooling",
    title: "Process Cooling Pumps for Manufacturing Utilities",
    description: "Industrial cooling pump support for process equipment, cooling loops, and factory utility systems.",
    engineeringExplanation: [
      "Process cooling requires reliable circulation because temperature instability can affect production, equipment life, and quality.",
      "Pump selection should account for fluid temperature, flow stability, operating hours, and maintenance access.",
    ],
    keyConsiderations: ["Temperature control", "Continuous duty", "Flow stability", "Service access"],
    recommendedPumps: [{ id: "niso", name: "NISO End-Suction" }, { id: "cdlk-cdlkf", name: "CDLK / CDLKF" }],
    industries: ["manufacturing", "pharmaceutical", "food-and-beverage"],
    faqs: [{ question: "Which pumps are used for process cooling?", answer: "Centrifugal, inline, and multistage pumps may be used depending on flow, head, and cooling loop design." }],
  },
  {
    slug: "chemical-transfer",
    name: "Chemical Transfer",
    title: "Chemical Transfer Pump Selection for Industrial Duty",
    description: "Material-compatible pump guidance for acids, chemicals, treatment dosing support, and process transfer.",
    engineeringExplanation: [
      "Chemical transfer requires careful material compatibility because seal, casing, impeller, and elastomer choices affect safety and pump life.",
      "FlowCore reviews media, concentration, temperature, flow, head, and compatibility before recommending a chemical pump family.",
    ],
    keyConsiderations: ["Chemical compatibility", "Temperature", "Seal material", "Safe maintenance"],
    recommendedPumps: [{ id: "sz", name: "SZ Fluorine Chemical Pump" }],
    industries: ["pharmaceutical", "manufacturing", "textile"],
    faqs: [{ question: "Can stainless steel pumps handle all chemicals?", answer: "No. Chemical compatibility must be checked against the specific media, concentration, and temperature." }],
  },
  {
    slug: "process-water-transfer",
    name: "Process Water Transfer",
    title: "Process Water Transfer Pumps for Karnataka Industries",
    description: "Pump selection for process water movement, treated water transfer, and plant utility distribution.",
    engineeringExplanation: [
      "Process water transfer may look simple, but water quality, operating hours, temperature, and pressure requirement can change the correct pump type.",
      "FlowCore reviews the plant utility requirement before recommending a centrifugal, multistage, or transfer pump family.",
    ],
    keyConsiderations: ["Flow stability", "Water quality", "Operating hours", "Material"],
    recommendedPumps: [{ id: "zs", name: "ZS Single-Stage" }, { id: "niso", name: "NISO End-Suction" }, { id: "chm", name: "CHM Multistage" }],
    industries: ["manufacturing", "pharmaceutical", "food-and-beverage"],
    faqs: [{ question: "What is process water transfer?", answer: "It is movement of utility or treated water between process stages, tanks, equipment, or distribution points." }],
  },
];

export const APPLICATIONS: Application[] = [
  ...CORE_APPLICATIONS,
  ...extraApplications.filter((extra) => !CORE_APPLICATIONS.some((core) => core.slug === extra.slug)),
];

const applicationDiagramMap: Record<string, DiagramNode[]> = {
  "ro-plants": [
    { id: "ro-feed", label: "Feed", role: "High pressure membrane feed", pumpModelId: "cdlf-cdh", x: 18, y: 35 },
    { id: "ro-filter", label: "Filter", role: "Pre-treatment filtration pressure", pumpModelId: "cdl-cdlf", x: 42, y: 22 },
    { id: "ro-distribution", label: "Permeate", role: "Treated water distribution", pumpModelId: "chlf", x: 72, y: 36 },
  ],
  "fire-fighting": [
    { id: "jockey", label: "Jockey", role: "Pressure maintenance pump", pumpModelId: "mini", x: 18, y: 34 },
    { id: "main", label: "Main", role: "Main hydrant or sprinkler pump", pumpModelId: "niso", x: 46, y: 24 },
    { id: "standby", label: "Standby", role: "Backup fire pump support", pumpModelId: "ld", x: 76, y: 36 },
  ],
  hvac: [
    { id: "chilled", label: "Chilled", role: "Chilled water circulation", pumpModelId: "ld", x: 18, y: 30 },
    { id: "condenser", label: "Condenser", role: "Condenser water circulation", pumpModelId: "niso", x: 46, y: 42 },
    { id: "process", label: "Process", role: "Process cooling or machine cooling", pumpModelId: "cdlk-cdlkf", x: 76, y: 30 },
  ],
  "sewage-treatment": [
    { id: "wet-well", label: "Wet Well", role: "Submersible wastewater transfer", pumpModelId: "wq", x: 18, y: 36 },
    { id: "aeration", label: "Aeration", role: "Air supply for biological treatment", pumpModelId: "bt", x: 46, y: 22 },
    { id: "transfer", label: "Transfer", role: "Treated wastewater movement", pumpModelId: "qy-b", x: 76, y: 36 },
  ],
  "pressure-boosting": [
    { id: "source", label: "Source", role: "Break tank or suction source", pumpModelId: "cdl-cdlf", x: 18, y: 35 },
    { id: "booster", label: "Booster", role: "Variable speed pressure boosting", pumpModelId: "hydro", x: 46, y: 22 },
    { id: "network", label: "Network", role: "Building distribution pressure", pumpModelId: "mini", x: 76, y: 35 },
  ],
};

export const APPLICATION_ENVIRONMENTS: ApplicationEnvironment[] = APPLICATIONS.slice(0, 12).map((application) => ({
  id: application.slug,
  shortName: application.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 4)
    .toUpperCase(),
  name: application.name,
  description: application.description,
  diagramNodes:
    applicationDiagramMap[application.slug] ||
    application.recommendedPumps.slice(0, 3).map((pump, index) => ({
      id: `${application.slug}-${pump.id}`,
      label: pump.name.split(" ")[0],
      role: `${pump.name} for ${application.name}`,
      pumpModelId: pump.id,
      x: [18, 46, 76][index] ?? 76,
      y: [34, 22, 36][index] ?? 36,
    })),
}));

export function getApplicationBySlug(slug: string): Application | undefined {
  return APPLICATIONS.find((a) => a.slug === slug);
}
