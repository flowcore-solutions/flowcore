// Application environment data.
// Defines the three industrial environments shown on the Applications page,
// including the SVG diagram node positions and pump model associations.

import type { PumpModel } from "./pump-data";

/**
 * A positioned node in an SVG application diagram.
 * x/y are expressed as percentages (0–100) of the diagram container's
 * width and height, allowing the SVG to be fully responsive.
 */
export type DiagramNode = {
  /** Unique within its environment */
  id: string;
  /** Human-readable label shown in the diagram */
  label: string;
  /** X position as a percentage of diagram width */
  x: number;
  /** Y position as a percentage of diagram height */
  y: number;
  /** ID of the pump model (matches PumpModel.id) to show on hover */
  pumpModelId: string;
  /** Brief role description shown in the hover tooltip */
  role: string;
};

export type ApplicationEnvironment = {
  /** Unique slug — used as key and anchor ID */
  id: string;
  /** Full display name */
  name: string;
  /** Short acronym shown in section tags */
  shortName: string;
  /** One-sentence description shown under the section heading */
  description: string;
  /** Ordered list of pump IDs recommended for this environment */
  recommendedPumpIds: readonly string[];
  /** SVG diagram nodes for the interactive schematic */
  diagramNodes: readonly DiagramNode[];
};

export const APPLICATION_ENVIRONMENTS: readonly ApplicationEnvironment[] = [
  // ── Water Treatment Plant ────────────────────────────────────────────
  {
    id: "wtp",
    name: "Water Treatment Plant",
    shortName: "WTP",
    description:
      "From raw water intake to pressurised supply — Berlington multistage and submersible pumps form the backbone of municipal and industrial water treatment infrastructure.",
    recommendedPumpIds: ["cdl-cdlf", "cdlf-cdh", "wq", "qy-b", "hydro"],
    diagramNodes: [
      {
        id: "wtp-intake",
        label: "Raw Water Intake",
        x: 10,
        y: 50,
        pumpModelId: "wq",
        role: "Submersible intake pumping from source",
      },
      {
        id: "wtp-pre-filter",
        label: "Pre-Filtration",
        x: 32,
        y: 40,
        pumpModelId: "qy-b",
        role: "Submersible transfer to filtration stage",
      },
      {
        id: "wtp-pressure-boost",
        label: "Pressure Boosting",
        x: 55,
        y: 30,
        pumpModelId: "cdl-cdlf",
        role: "Vertical multistage — high-head pressure supply",
      },
      {
        id: "wtp-distribution",
        label: "Distribution Network",
        x: 78,
        y: 45,
        pumpModelId: "hydro",
        role: "Hydro pressure system for network stability",
      },
    ],
  },

  // ── HVAC Systems ────────────────────────────────────────────────────
  {
    id: "hvac",
    name: "HVAC Systems",
    shortName: "HVAC",
    description:
      "Reliable and efficient circulation is critical to HVAC performance. Berlington CHL and CHM series handle chilled water, condenser water, and pressure-boosting duties across commercial buildings.",
    recommendedPumpIds: ["chl", "chlf", "chm", "bt", "ld", "mini"],
    diagramNodes: [
      {
        id: "hvac-chiller",
        label: "Chiller Plant",
        x: 15,
        y: 55,
        pumpModelId: "chl",
        role: "Chilled water primary loop circulation",
      },
      {
        id: "hvac-ahu",
        label: "Air Handling Units",
        x: 40,
        y: 25,
        pumpModelId: "chm",
        role: "Secondary loop supply to AHUs",
      },
      {
        id: "hvac-condenser",
        label: "Condenser Loop",
        x: 62,
        y: 60,
        pumpModelId: "chlf",
        role: "Condenser water circulation",
      },
      {
        id: "hvac-booster",
        label: "High-Rise Boosting",
        x: 82,
        y: 35,
        pumpModelId: "bt",
        role: "Pressure booster for upper floors",
      },
    ],
  },

  // ── Industrial Processing ────────────────────────────────────────────
  {
    id: "industrial",
    name: "Industrial Processing",
    shortName: "Industrial",
    description:
      "From chemical transfer to high-volume end-suction duties, Berlington self-priming, pipeline, and NISO series pumps are engineered for the rigours of continuous industrial operation.",
    recommendedPumpIds: ["niso", "sz", "zs", "ld", "stp"],
    diagramNodes: [
      {
        id: "ind-feed",
        label: "Process Feed",
        x: 12,
        y: 50,
        pumpModelId: "niso",
        role: "Large-volume end-suction process feed",
      },
      {
        id: "ind-chemical",
        label: "Chemical Transfer",
        x: 35,
        y: 35,
        pumpModelId: "sz",
        role: "Self-priming chemical handling",
      },
      {
        id: "ind-pipeline",
        label: "Pipeline Transfer",
        x: 57,
        y: 55,
        pumpModelId: "ld",
        role: "In-line pipeline booster",
      },
      {
        id: "ind-effluent",
        label: "Effluent Treatment",
        x: 80,
        y: 40,
        pumpModelId: "stp",
        role: "Sewage treatment plant effluent handling",
      },
    ],
  },
];

// ── Derived helpers ───────────────────────────────────────────────────

/**
 * Returns an environment by its slug ID.
 * Returns `undefined` if not found — callers must handle this.
 */
export function getEnvironmentById(
  id: string
): ApplicationEnvironment | undefined {
  return APPLICATION_ENVIRONMENTS.find((env) => env.id === id);
}

/**
 * Returns all diagram nodes across all environments that reference
 * a given pump model ID. Useful for cross-referencing on product pages.
 */
export function getEnvironmentsByPumpId(
  pumpId: string
): readonly ApplicationEnvironment[] {
  return APPLICATION_ENVIRONMENTS.filter((env) =>
    env.recommendedPumpIds.includes(pumpId)
  );
}
