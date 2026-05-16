import type { ApplicationEnvironment, DiagramNode, EquipmentType } from "@/lib/application-data";

// ─── Design tokens (mirrored from DiagramSchematic for consistency) ───────────
const T = {
  navy:       "#0f2744",
  blue:       "#1a4b8c",
  blueMid:    "#2461b5",
  blueLight:  "#3a7bd5",
  steelGray:  "#4a6080",
  midGray:    "#7a8ea8",
  lightGray:  "#b8c8d8",
  border:     "#dde5ef",
  bgSheet:    "#f4f7fb",
  bgWhite:    "#ffffff",
  green:      "#2d7a4f",
  greenLight: "#3da868",
  teal:       "#147a7a",
  rose:       "#b02840",
  violet:     "#5b35a0",
  orange:     "#b05515",
  cyan:       "#0e6e8c",
  amber:      "#c87c10",
  text:       "#1a2a3a",
  textMid:    "#3a5070",
  textLight:  "#6a7f98",
  textMuted:  "#94a8bc",
} as const;

const ACCENT: Record<EquipmentType, string> = {
  pump:               T.blueMid,
  tank:               T.cyan,
  filter:             T.amber,
  membrane:           T.green,
  blower:             T.steelGray,
  valve:              T.navy,
  chiller:            T.teal,
  "cooling-tower":    T.teal,
  clarifier:          T.cyan,
  screen:             T.steelGray,
  "header-manifold":  T.navy,
  sump:               T.cyan,
  deaerator:          T.orange,
  boiler:             T.rose,
  "flow-meter":       T.violet,
  "booster-system":   T.blueMid,
  "wet-well":         T.teal,
  "sand-filter":      T.amber,
  "media-filter":     T.amber,
  "ro-vessel":        T.green,
  "storage-tank":     T.cyan,
  "process-tank":     T.teal,
};

const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  pump:               "Pump",
  tank:               "Tank",
  filter:             "Filter",
  membrane:           "Membrane",
  blower:             "Blower",
  valve:              "Valve",
  chiller:            "Chiller",
  "cooling-tower":    "Cool Tower",
  clarifier:          "Clarifier",
  screen:             "Screen",
  "header-manifold":  "Header",
  sump:               "Sump",
  deaerator:          "Deaerator",
  boiler:             "Boiler",
  "flow-meter":       "Flow Meter",
  "booster-system":   "Booster",
  "wet-well":         "Wet Well",
  "sand-filter":      "Sand Filter",
  "media-filter":     "Media Filter",
  "ro-vessel":        "RO Vessel",
  "storage-tank":     "Storage",
  "process-tank":     "Process Tank",
};

const PUMP_MODEL_LABELS: Record<string, string> = {
  "cdl-cdlf":  "CDL / CDLF Multistage",
  "cdlf-cdh":  "CDLF / CDH HP",
  "niso":      "NISO End-Suction",
  "wq":        "WQ Sewage",
  "mini":      "MINI Jockey",
  "ld":        "LD Inline",
  "hydro":     "HYDRO Booster",
  "bt":        "BT Blower",
  "chlf":      "CHLF / CHLF-T",
  "chm":       "CHM Multistage",
  "zs":        "ZS Single-Stage",
  "qy-b":      "QY(B) Self-Prime",
};

function badgeLabel(node: DiagramNode): string {
  if (node.pumpModelId) return PUMP_MODEL_LABELS[node.pumpModelId] ?? node.pumpModelId.toUpperCase();
  return EQUIPMENT_LABELS[node.equipmentType];
}

interface EnvironmentInfoProps {
  env:        ApplicationEnvironment;
  activeNode: DiagramNode | null;
}

export default function EnvironmentInfo({ env, activeNode }: EnvironmentInfoProps) {
  const pumpCount     = env.diagramNodes.filter((n) => n.pumpModelId !== null).length;
  const equipCount    = env.diagramNodes.filter((n) => n.pumpModelId === null && !n.isBranchNode).length;
  const stageCount    = env.diagramNodes.filter((n) => !n.isBranchNode).length;
  const primaryNodes  = env.diagramNodes.filter((n) => !n.isBranchNode);

  return (
    <div
      style={{
        background:    T.bgWhite,
        border:        `1.5px solid ${T.border}`,
        borderRadius:  16,
        overflow:      "hidden",
        height:        "100%",
        display:       "flex",
        flexDirection: "column",
        boxShadow:     "0 2px 20px rgba(15,39,68,0.07)",
        minHeight:     360,
      }}
    >
      {/* ── Header bar ──────────────────────────────────────────── */}
      <div
        style={{
          background:   T.navy,
          padding:      "16px 20px 14px",
          position:     "relative",
          overflow:     "hidden",
        }}
      >
        {/* Subtle engineering grid */}
        <div
          aria-hidden="true"
          style={{
            position:        "absolute",
            inset:           0,
            backgroundImage: `linear-gradient(${T.blue}40 1px, transparent 1px), linear-gradient(90deg, ${T.blue}40 1px, transparent 1px)`,
            backgroundSize:  "28px 28px",
            opacity:         0.25,
            pointerEvents:   "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Tag line */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <span
              style={{
                display:       "inline-block",
                width:         6,
                height:        6,
                borderRadius:  "50%",
                background:    T.greenLight,
                flexShrink:    0,
              }}
            />
            <span
              style={{
                fontSize:      10,
                fontWeight:    800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         T.greenLight,
              }}
            >
              {env.shortName}
            </span>
          </div>

          <h3
            style={{
              margin:        0,
              fontSize:      "clamp(1.05rem, 1.8vw, 1.35rem)",
              fontWeight:    800,
              color:         "#ffffff",
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {env.name}
          </h3>
        </div>
      </div>

      {/* ── Description ──────────────────────────────────────────── */}
      <div style={{ padding: "14px 20px 0" }}>
        <p
          style={{
            margin:     0,
            fontSize:   12.5,
            lineHeight: 1.65,
            color:      T.textMid,
            fontWeight: 450,
          }}
        >
          {env.description}
        </p>
      </div>

      {/* ── Divider ───────────────────────────────────────────────── */}
      <div style={{ height: 1, background: T.border, margin: "14px 20px 0" }} />

      {/* ── Component badges ─────────────────────────────────────── */}
      <div style={{ padding: "12px 20px 0" }}>
        <span
          style={{
            display:       "block",
            fontSize:      9.5,
            fontWeight:    800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color:         T.blueLight,
            marginBottom:  8,
          }}
        >
          System Components
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {Array.from(
            new Map(primaryNodes.map((n) => [badgeLabel(n), n])).values()
          ).map((node) => {
            const label     = badgeLabel(node);
            const isAnyActive = activeNode && badgeLabel(activeNode) === label;
            const isPump    = node.pumpModelId !== null;
            const accent    = isPump ? T.blueMid : ACCENT[node.equipmentType];
            return (
              <span
                key={node.id}
                style={{
                  display:         "inline-flex",
                  alignItems:      "center",
                  gap:             5,
                  padding:         "4px 10px",
                  borderRadius:    6,
                  fontSize:        10.5,
                  fontWeight:      isAnyActive ? 700 : 600,
                  letterSpacing:   "-0.01em",
                  background:      isAnyActive ? `${accent}15` : `${T.bgSheet}`,
                  border:          `1px solid ${isAnyActive ? accent : T.border}`,
                  color:           isAnyActive ? accent : T.textMid,
                  transition:      "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    width:         5,
                    height:        5,
                    borderRadius:  "50%",
                    background:    isAnyActive ? accent : T.lightGray,
                    flexShrink:    0,
                    transition:    "background 0.2s ease",
                  }}
                />
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Spacer pushes stats to bottom */}
      <div style={{ flex: 1 }} />

      {/* ── Divider ───────────────────────────────────────────────── */}
      <div style={{ height: 1, background: T.border, margin: "0 20px" }} />

      {/* ── Stats row ────────────────────────────────────────────── */}
      <div
        style={{
          display:    "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding:    "14px 20px 16px",
          gap:        8,
        }}
      >
        {[
          { value: stageCount,  label: "Stages",    color: T.text },
          { value: pumpCount,   label: "Pumps",     color: T.blueMid },
          { value: equipCount,  label: "Equipment", color: T.steelGray },
        ].map(({ value, label, color }) => (
          <div key={label}>
            <div
              style={{
                fontSize:      26,
                fontWeight:    800,
                color,
                letterSpacing: "-0.04em",
                lineHeight:    1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize:      9.5,
                fontWeight:    700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color:         T.textMuted,
                marginTop:     3,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}