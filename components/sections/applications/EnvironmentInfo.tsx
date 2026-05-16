import type { ApplicationEnvironment, DiagramNode, EquipmentType } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";

const GREEN      = "#6cc24a";
const DEEP_BLUE  = "#0f3d91";
const LIGHT_BLUE = "#4da3ff";
const AMBER      = "#f59e0b";
const SLATE      = "#64748b";
const TEAL       = "#0d9488";
const ROSE       = "#e11d48";
const VIOLET     = "#7c3aed";
const CYAN       = "#0891b2";
const ORANGE     = "#ea580c";

// ── Equipment display labels ─────────────────────────────────────────────────
const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  pump: "Pump",
  tank: "Tank",
  filter: "Filter",
  membrane: "Membrane",
  blower: "Blower",
  valve: "Valve",
  "chiller": "Chiller",
  "cooling-tower": "Cool Tower",
  "clarifier": "Clarifier",
  "screen": "Screen",
  "header-manifold": "Header",
  "sump": "Sump",
  "deaerator": "Deaerator",
  "boiler": "Boiler",
  "flow-meter": "Flow Meter",
  "booster-system": "Booster",
  "wet-well": "Wet Well",
  "sand-filter": "Sand Filter",
  "media-filter": "Media Filter",
  "ro-vessel": "RO Vessel",
  "storage-tank": "Storage Tank",
  "process-tank": "Process Tank",
};

const EQUIPMENT_ACCENT: Record<EquipmentType, string> = {
  pump: "#1e5bb8",
  tank: LIGHT_BLUE,
  filter: AMBER,
  membrane: GREEN,
  blower: SLATE,
  valve: DEEP_BLUE,
  "chiller": CYAN,
  "cooling-tower": TEAL,
  "clarifier": LIGHT_BLUE,
  "screen": SLATE,
  "header-manifold": DEEP_BLUE,
  "sump": LIGHT_BLUE,
  "deaerator": ORANGE,
  "boiler": ROSE,
  "flow-meter": VIOLET,
  "booster-system": "#1e5bb8",
  "wet-well": TEAL,
  "sand-filter": AMBER,
  "media-filter": AMBER,
  "ro-vessel": GREEN,
  "storage-tank": LIGHT_BLUE,
  "process-tank": CYAN,
};

interface EnvironmentInfoProps {
  env:        ApplicationEnvironment;
  activeNode: DiagramNode | null;
}

// ── Badge label helper ───────────────────────────────────────────────────────
function nodeBadgeLabel(node: DiagramNode): string {
  if (node.pumpModelId) {
    const pump = getPumpById(node.pumpModelId);
    return pump?.seriesCode ?? node.pumpModelId.toUpperCase();
  }
  return EQUIPMENT_LABELS[node.equipmentType];
}

export default function EnvironmentInfo({ env, activeNode }: EnvironmentInfoProps) {
  const theme = {
    bg:              DEEP_BLUE,
    accentPrimary:   GREEN,
    accentSecondary: LIGHT_BLUE,
    divider:         "rgba(255,255,255,0.1)",
    watermark:       "rgba(255,255,255,0.04)",
    gridBorder:      "#fff",
    gridOpacity:     0.06,

    badgeIdleBg:     "rgba(255,255,255,0.07)",
    badgeIdleBorder: "rgba(255,255,255,0.12)",
    badgeIdleText:   "#ffffff",
    badgeIdleDot:    "rgba(255,255,255,0.4)",

    statSub: "text-[#4da3ff]",
    statNum: "text-white",
    statISO: GREEN,
  };

  // Count distinct pump nodes (pumpModelId !== null)
  const pumpCount = env.diagramNodes.filter((n) => n.pumpModelId !== null).length;
  const equipmentCount = env.diagramNodes.filter((n) => n.pumpModelId === null).length;

  return (
    <div
      className="relative flex flex-col justify-between rounded-2xl overflow-hidden h-full"
      style={{
        backgroundColor: theme.bg,
        boxShadow:       "0 8px 40px -8px rgba(15,61,145,0.35)",
        minHeight:       "340px",
      }}
    >
      {/* Tech grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity:         theme.gridOpacity,
          backgroundImage: `linear-gradient(${theme.gridBorder} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridBorder} 1px, transparent 1px)`,
          backgroundSize:  "32px 32px",
        }}
      />

      {/* Large watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 font-black select-none leading-none"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: theme.watermark, letterSpacing: "-0.04em" }}
      >
        {env.shortName}
      </div>

      {/* Top section */}
      <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-8">
        <span
          className="inline-flex items-center gap-2 pl-3 border-l-2 text-[11px] font-black uppercase tracking-[0.18em]"
          style={{ borderColor: theme.accentPrimary, color: theme.accentPrimary }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accentPrimary }} />
          {env.shortName}
        </span>

        <h3
          className="mt-4 font-black leading-[1.1] tracking-tight text-white"
          style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
        >
          {env.name}
        </h3>

        <p className="mt-4 text-sm leading-relaxed font-medium text-[#4da3ff] opacity-90">
          {env.description}
        </p>
      </div>

      <div className="relative z-10 mx-6 sm:mx-8 mt-6" style={{ borderTop: `1px solid ${theme.divider}` }} />

      {/* Node badges */}
      <div className="relative z-10 px-6 pt-5 pb-6 sm:px-8 sm:pb-8 flex flex-col gap-4">
        <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${theme.statSub}`}>
          System Components
        </p>

        <div className="flex flex-wrap gap-2">
          {env.diagramNodes.map((node) => {
            const isActive      = activeNode?.id === node.id;
            const isPump        = node.pumpModelId !== null;
            // Active pump → green. Active equipment → equipment accent. Idle → white-tinted.
            const activeBorder  = isPump ? GREEN : EQUIPMENT_ACCENT[node.equipmentType];
            const activeText    = isPump ? GREEN : EQUIPMENT_ACCENT[node.equipmentType];
            const activeBg      = isPump ? `${GREEN}22` : `${EQUIPMENT_ACCENT[node.equipmentType]}22`;
            const activeDot     = isPump ? GREEN : EQUIPMENT_ACCENT[node.equipmentType];

            return (
              <span
                key={node.id}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-200"
                style={{
                  backgroundColor: isActive ? activeBg          : theme.badgeIdleBg,
                  border:          `1px solid ${isActive ? activeBorder : theme.badgeIdleBorder}`,
                  color:           isActive ? activeText        : theme.badgeIdleText,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                  style={{ backgroundColor: isActive ? activeDot : theme.badgeIdleDot }}
                />
                {nodeBadgeLabel(node)}
              </span>
            );
          })}
        </div>

        {/* Stat row */}
        <div
          className="grid grid-cols-3 gap-4 mt-2 pt-5"
          style={{ borderTop: `1px solid ${theme.divider}` }}
        >
          <div>
            <div className={`text-2xl font-black ${theme.statNum}`} style={{ letterSpacing: "-0.03em" }}>
              {env.diagramNodes.length}
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${theme.statSub}`}>
              Stages
            </div>
          </div>
          <div>
            <div className="text-2xl font-black" style={{ color: theme.statISO, letterSpacing: "-0.03em" }}>
              {pumpCount}
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${theme.statSub}`}>
              Pumps
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white" style={{ letterSpacing: "-0.03em", opacity: 0.75 }}>
              {equipmentCount}
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${theme.statSub}`}>
              Equipment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
