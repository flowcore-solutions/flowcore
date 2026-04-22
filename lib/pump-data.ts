// Pump model catalog — typed, immutable source of truth.
// Image paths are served from /public/assets/ and consumed via next/image.
// All spec values are display strings; parse them if numeric logic is ever required.
//
// Spec source: Berlington Technical Data & Applications Registry (official catalog).
// Connection sizes: field-standard estimates (not in official catalog).
// Power range: field-standard estimates retained where catalog omits them.

export type PumpCategory =
  | "Vertical Multistage"
  | "Horizontal Multistage"
  | "Sewage & Submersible"
  | "Hydro & Booster"
  | "Self-Priming"
  | "Pipeline & Industrial";

export type ApplicationTag =
  | "WTP"
  | "HVAC"
  | "Irrigation"
  | "Industrial"
  | "Sewage Treatment"
  | "Fire Fighting"
  | "Pressure Boosting"
  | "Chemical Transfer"
  | "Aquaculture";

export type PumpModel = {
  /** Unique slug used as React key and URL param */
  id: string;
  /** Short series identifier, e.g. "CDL / CDLF" */
  seriesCode: string;
  /** Full display name */
  fullName: string;
  category: PumpCategory;
  /** Path for next/image — static import preferred at page level */
  imagePath: string;
  /** Flow rate range — official catalog value */
  flowRate: string;
  /** Head range — official catalog value */
  maxHead: string;
  /** Motor power range — field estimate where catalog omits */
  powerRange: string;
  /** Operating temperature range — official catalog value */
  temperature: string;
  /** Supply voltage options — official catalog value */
  voltage: string;
  /** Casing/impeller material — official catalog value */
  material: string;
  /** Inlet/outlet connection size range — field estimate in mm */
  connections: string;
  /** Application environments this pump is suited for */
  applications: ApplicationTag[];
  /** 2-3 primary applications for UI display */
  summaryApplications: string[];
};

export const PUMP_CATALOG: readonly PumpModel[] = [

  // ── Vertical Multistage ───────────────────────────────────────────────────

  {
    id: "cdl-cdlf",
    seriesCode: "CDL / CDLF",
    fullName: "CDL / CDLF Series",
    category: "Vertical Multistage",
    imagePath: "/assets/pumps/berlington-cdl-cdlf-vertical-multistage-pump.webp",
    flowRate: "0.4 – 240 m³/h",
    maxHead: "4 – 305 m",
    powerRange: "0.37 – 45 kW",
    temperature: "-15°C ~ +120°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "25 – 50 mm",
    applications: ["WTP", "HVAC", "Pressure Boosting", "Fire Fighting"],
    summaryApplications: ["Water treatment systems", "Pressure boosting", "Fire-fighting systems"],
  },
  {
    id: "cdlf-cdh",
    seriesCode: "HP (CDLF / CDH)",
    fullName: "HP Series — High Pressure Unit",
    category: "Vertical Multistage",
    imagePath: "/assets/pumps/berlington-cdlf-cdh-high-pressure-multistage-pump.webp",
    flowRate: "0.4 – 65 m³/h",
    maxHead: "110 – 718 m",
    powerRange: "0.75 – 55 kW",
    temperature: "-15°C ~ +120°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "25 – 65 mm",
    applications: ["WTP", "Industrial", "Pressure Boosting"],
    summaryApplications: ["MF / UF / RO systems", "High pressure washing", "Industrial boosting"],
  },
  {
    id: "cdlk-cdlkf",
    seriesCode: "CDLK / CDLKF",
    fullName: "CDLK / CDLKF Series",
    category: "Vertical Multistage",
    imagePath: "/assets/pumps/berlington-cdlk-cdlkf-vertical-multistage-pump.webp",
    flowRate: "0.4 – 65 m³/h",
    maxHead: "6 – 305 m",
    powerRange: "1.1 – 75 kW",
    temperature: "-15°C ~ +105°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "40 – 80 mm",
    applications: ["HVAC", "Industrial", "Pressure Boosting"],
    summaryApplications: ["Machine tools cooling", "Chiller units", "Industrial filtration"],
  },

  // ── Horizontal Multistage ─────────────────────────────────────────────────

  {
    id: "chl",
    seriesCode: "CHL",
    fullName: "CHL Series",
    category: "Horizontal Multistage",
    imagePath: "/assets/pumps/berlington-chl-horizontal-multistage-pump.webp",
    flowRate: "0.5 – 8 m³/h",
    maxHead: "6 – 88 m",
    powerRange: "0.25 – 5.5 kW",
    temperature: "-15°C ~ +105°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "25 – 40 mm",
    applications: ["WTP", "HVAC", "Pressure Boosting"],
    summaryApplications: ["Water treatment systems", "Industrial washing", "Pressure boosting"],
  },
  {
    id: "chlf",
    seriesCode: "CHLF / CHLF-T",
    fullName: "CHLF / CHLF-T Series",
    category: "Horizontal Multistage",
    imagePath: "/assets/pumps/berlington-chlf-chlf-t-horizontal-multistage-pump.webp",
    flowRate: "0.5 – 20 m³/h",
    maxHead: "6 – 88 m",
    powerRange: "0.37 – 7.5 kW",
    temperature: "-15°C ~ +105°C",
    voltage: "220V / 380V",
    material: "Stainless steel",
    connections: "25 – 50 mm",
    applications: ["WTP", "HVAC", "Pressure Boosting"],
    summaryApplications: ["Water treatment", "Industrial washing", "Water supply systems"],
  },
  {
    id: "chm",
    seriesCode: "CHM",
    fullName: "CHM Series",
    category: "Horizontal Multistage",
    imagePath: "/assets/pumps/berlington-chm-horizontal-multistage-pump.webp",
    flowRate: "1 – 32 m³/h",
    maxHead: "6 – 88 m",
    powerRange: "0.75 – 18.5 kW",
    temperature: "-15°C ~ +105°C",
    voltage: "220V / 380V",
    material: "Stainless steel",
    connections: "40 – 65 mm",
    applications: ["WTP", "HVAC", "Industrial"],
    summaryApplications: ["Industrial washing", "HVAC systems", "Water supply systems"],
  },

  // ── Sewage & Submersible ──────────────────────────────────────────────────
  // Note: STP and QY-B have been reclassified per official catalog types.

  {
    id: "wq",
    seriesCode: "WQ",
    fullName: "WQ Submersible Sewage Pump",
    category: "Sewage & Submersible",
    imagePath: "/assets/pumps/berlington-wq-submersible-sewage-pump.webp",
    flowRate: "3 – 1800 m³/h",
    maxHead: "2 – 66 m",
    powerRange: "0.75 – 200 kW",
    temperature: "0°C ~ +40°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "50 – 250 mm",
    applications: ["Sewage Treatment", "Industrial"],
    summaryApplications: ["Municipal water plants", "Sewage & wastewater", "Industrial drainage"],
  },

  // ── Hydro & Booster ───────────────────────────────────────────────────────

  {
    id: "hydro",
    seriesCode: "HYDRO",
    fullName: "HYDRO Variable Speed System",
    category: "Hydro & Booster",
    imagePath: "/assets/pumps/berlington-hydro-variable-speed-booster-pump.webp",
    flowRate: "2 – 500 m³/h",
    maxHead: "4 – 200 m",
    powerRange: "0.75 – 22 kW",
    temperature: "-15°C ~ +120°C",
    voltage: "380V",
    material: "Stainless steel / Cast iron",
    connections: "25 – 100 mm",
    applications: ["Pressure Boosting", "HVAC", "WTP"],
    summaryApplications: ["High-rise water supply", "Industrial boosting", "Pressure washing"],
  },
  {
    id: "mini",
    // Reclassified: was "Pipeline & Industrial" — catalog lists as Single Booster Pump
    seriesCode: "MINI",
    fullName: "MINI Single Booster Pump",
    category: "Hydro & Booster",
    imagePath: "/assets/pumps/berlington-mini-single-booster-pump.webp",
    flowRate: "2 – 28 m³/h",
    maxHead: "4 – 54 m",
    powerRange: "0.37 – 3 kW",
    temperature: "+15°C ~ +120°C",
    voltage: "220V",
    material: "Stainless steel / Cast iron",
    connections: "25 – 50 mm",
    applications: ["Pressure Boosting", "HVAC"],
    summaryApplications: ["Domestic water supply", "Pressure boosting", "Small building systems"],
  },
  {
    id: "bt",
    // BT is a Side Channel Blower (aeration device), not a liquid pump.
    // Flow rate refers to air flow. Retained in Hydro & Booster for product-line grouping.
    seriesCode: "BT",
    fullName: "BT Side Channel Blower",
    category: "Hydro & Booster",
    imagePath: "/assets/pumps/berlington-bt-side-channel-blower.webp",
    flowRate: "10 – 3000 m³/h (air)",
    maxHead: "1 – 7 m WC",
    powerRange: "0.37 – 11 kW",
    temperature: "Up to +50°C",
    voltage: "220V / 380V",
    material: "Aluminium",
    connections: "DN50 – DN200",
    applications: ["Sewage Treatment", "Industrial"],
    summaryApplications: ["Wastewater treatment", "Pneumatic conveying", "Aeration processes"],
  },

  // ── Self-Priming ──────────────────────────────────────────────────────────

  {
    id: "qy-b",
    // Reclassified: was "Sewage & Submersible" — catalog type is Self-Priming Mixing Pump
    seriesCode: "QY(B)",
    fullName: "QY(B) Self-Priming Mixing Pump",
    category: "Self-Priming",
    imagePath: "/assets/pumps/berlington-qy-b-self-priming-mixing-pump.webp",
    flowRate: "0.4 – 18 m³/h",
    maxHead: "10 – 70 m",
    powerRange: "0.55 – 7.5 kW",
    temperature: "-10°C ~ +105°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "25 – 50 mm",
    applications: ["Industrial", "Aquaculture"],
    summaryApplications: ["Water treatment systems", "Aeration processes", "Industrial mixing"],
  },
  {
    id: "sz",
    seriesCode: "SZ",
    fullName: "SZ Fluorine Chemical Pump",
    category: "Self-Priming",
    imagePath: "/assets/pumps/berlington-sz-fluorine-chemical-pump.webp",
    flowRate: "2.2 – 60 m³/h",
    maxHead: "15 – 54 m",
    powerRange: "1.5 – 37 kW",
    temperature: "-20°C ~ +120°C",
    voltage: "220V / 380V",
    material: "FEP / PVDF / Cast iron",
    connections: "40 – 100 mm",
    applications: ["Chemical Transfer", "Industrial"],
    summaryApplications: ["Chemical systems", "Metal smelting", "Textile dyeing"],
  },

  // ── Pipeline & Industrial ─────────────────────────────────────────────────

  {
    id: "zs",
    // Reclassified: was "Self-Priming" — catalog type is Horizontal Single-Stage Centrifugal
    seriesCode: "ZS",
    fullName: "ZS Single-Stage Centrifugal Pump",
    category: "Pipeline & Industrial",
    imagePath: "/assets/pumps/berlington-zs-single-stage-centrifugal-pump.webp",
    flowRate: "3 – 200 m³/h",
    maxHead: "8.8 – 73.7 m",
    powerRange: "1.1 – 22 kW",
    temperature: "-10°C ~ +100°C",
    voltage: "220V / 380V",
    material: "Stainless steel",
    connections: "40 – 100 mm",
    applications: ["WTP", "Pressure Boosting", "Industrial"],
    summaryApplications: ["Water treatment systems", "Pressure boosting", "Water circulation"],
  },
  {
    id: "stp",
    // Reclassified: was "Sewage & Submersible" — catalog type is Horizontal Single-Stage domestic pump
    seriesCode: "STP",
    fullName: "STP Single-Stage Pump",
    category: "Pipeline & Industrial",
    imagePath: "/assets/pumps/berlington-stp-single-stage-pump.webp",
    flowRate: "0.4 – 4 m³/h",
    maxHead: "4 – 50 m",
    powerRange: "0.37 – 1.1 kW",
    temperature: "Up to +45°C",
    voltage: "220V / 380V",
    material: "Stainless steel",
    connections: "25 – 32 mm",
    applications: ["WTP", "Irrigation"],
    summaryApplications: ["Domestic water supply", "Water circulation", "Gardening"],
  },
  {
    id: "niso",
    seriesCode: "NISO",
    fullName: "NISO End-Suction Centrifugal Pump",
    category: "Pipeline & Industrial",
    imagePath: "/assets/pumps/berlington-niso-end-suction-centrifugal-pump.webp",
    flowRate: "3 – 1200 m³/h",
    maxHead: "4 – 160 m",
    powerRange: "3 – 250 kW",
    temperature: "-15°C ~ +110°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "80 – 400 mm",
    applications: ["WTP", "HVAC", "Fire Fighting", "Industrial"],
    summaryApplications: ["HVAC & Cooling", "Firefighting systems", "Industrial supply"],
  },
  {
    id: "ld",
    seriesCode: "LD",
    fullName: "LD Vertical Inline Circulation Pump",
    category: "Pipeline & Industrial",
    imagePath: "/assets/pumps/berlington-ld-vertical-inline-circulation-pump.webp",
    flowRate: "2 – 1200 m³/h",
    maxHead: "6.3 – 107.6 m",
    powerRange: "1.5 – 55 kW",
    temperature: "-15°C ~ +110°C",
    voltage: "220V / 380V",
    material: "Stainless steel / Cast iron",
    connections: "50 – 200 mm",
    applications: ["HVAC", "Industrial", "Fire Fighting"],
    summaryApplications: ["HVAC circulation", "District heating systems", "Industrial liquid transfer"],
  },

] as const;

// ── Derived helpers ───────────────────────────────────────────────────────

/** All unique categories present in the catalog */
export const PUMP_CATEGORIES: readonly PumpCategory[] = [
  "Vertical Multistage",
  "Horizontal Multistage",
  "Sewage & Submersible",
  "Hydro & Booster",
  "Self-Priming",
  "Pipeline & Industrial",
];

/**
 * Returns pumps filtered by category.
 * Passing `null` returns the full catalog.
 */
export function getPumpsByCategory(
  category: PumpCategory | null
): readonly PumpModel[] {
  if (category === null) return PUMP_CATALOG;
  return PUMP_CATALOG.filter((p) => p.category === category);
}

/**
 * Returns a single pump by its unique `id`.
 * Returns `undefined` if not found — callers must handle this.
 */
export function getPumpById(id: string): PumpModel | undefined {
  return PUMP_CATALOG.find((p) => p.id === id);
}
