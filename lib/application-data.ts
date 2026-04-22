// Application environment data.
// Defines the three industrial environments shown on the Applications page,
// including the SVG diagram node positions and pump model associations.



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
        x: 15,
        y: 50,
        pumpModelId: "wq",
        role: "Submersible intake pumping from source",
      },
      {
        id: "wtp-pre-filter",
        label: "Pre-Filtration",
        x: 38,
        y: 35,
        pumpModelId: "zs",
        role: "Centrifugal transfer to filtration stage",
      },
      {
        id: "wtp-pressure-boost",
        label: "Pressure Boosting",
        x: 60,
        y: 20,
        pumpModelId: "cdl-cdlf",
        role: "Vertical multistage — high-head pressure supply",
      },
      {
        id: "wtp-distribution",
        label: "Distribution Network",
        x: 82,
        y: 40,
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
        y: 50,
        pumpModelId: "chl",
        role: "Chilled water primary loop circulation",
      },
      {
        id: "hvac-ahu",
        label: "Air Handling Units",
        x: 38,
        y: 22,
        pumpModelId: "chm",
        role: "Secondary loop supply to AHUs",
      },
      {
        id: "hvac-condenser",
        label: "Condenser Loop",
        x: 62,
        y: 50,
        pumpModelId: "chlf",
        role: "Condenser water circulation",
      },
      {
        id: "hvac-booster",
        label: "High-Rise Boosting",
        x: 82,
        y: 28,
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
        x: 15,
        y: 48,
        pumpModelId: "niso",
        role: "Large-volume end-suction process feed",
      },
      {
        id: "ind-chemical",
        label: "Chemical Transfer",
        x: 38,
        y: 28,
        pumpModelId: "sz",
        role: "Self-priming chemical handling",
      },
      {
        id: "ind-pipeline",
        label: "Pipeline Transfer",
        x: 60,
        y: 48,
        pumpModelId: "ld",
        role: "In-line pipeline booster",
      },
      {
        id: "ind-effluent",
        label: "Effluent Treatment",
        x: 82,
        y: 32,
        pumpModelId: "wq",
        role: "Submersible sewage pump for industrial effluent",
      },
    ],
  },

  // ── Agricultural & Irrigation Systems ──────────────────────────────────
  {
    id: "agriculture",
    name: "Agricultural & Irrigation Systems",
    shortName: "AGR",
    description:
      "From groundwater extraction to high-efficiency field distribution. Berlington solutions manage primary intake, automated filtration cycles, and high-pressure sprinkler networks for large-scale agricultural operations.",
    recommendedPumpIds: ["wq", "stp", "niso", "cdl-cdlf"],
    diagramNodes: [
      {
        id: "agr-intake",
        label: "Groundwater Extraction",
        x: 15,
        y: 52,
        pumpModelId: "wq",
        role: "Submersible intake for reservoir or open-well extraction",
      },
      {
        id: "agr-filter",
        label: "Filtration & Transfer",
        x: 38,
        y: 36,
        pumpModelId: "zs",
        role: "Stainless centrifugal transfer for filtration cycles",
      },
      {
        id: "agr-pressure",
        label: "Primary Distribution",
        x: 62,
        y: 22,
        pumpModelId: "niso",
        role: "High-volume centrifugal for mainline distribution",
      },
      {
        id: "agr-sprinkler",
        label: "Sprinkler Pressure",
        x: 82,
        y: 44,
        pumpModelId: "cdl-cdlf",
        role: "Vertical multistage for high-pressure sprinkler networks",
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
