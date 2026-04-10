import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";

const GREEN        = "#6cc24a";
const DEEP_BLUE    = "#0f3d91";
const LIGHT_BLUE   = "#4da3ff";

interface EnvironmentInfoProps {
  env: ApplicationEnvironment;
  activeNode: DiagramNode | null;
}

export default function EnvironmentInfo({ env, activeNode }: EnvironmentInfoProps) {
  // Use professional Deep Blue theme for all panels as per user request
  const isBlue = true;

  // Theme variables based on panel color
  const theme = {
    bg: isBlue ? DEEP_BLUE : GREEN,
    title: isBlue ? "text-white" : "text-[#0f3d91]",
    desc: isBlue ? "text-[#4da3ff] opacity-90" : "text-[#0f3d91] opacity-80",
    accentPrimary: isBlue ? GREEN : DEEP_BLUE,
    accentSecondary: isBlue ? LIGHT_BLUE : DEEP_BLUE,
    divider: isBlue ? "rgba(255,255,255,0.1)" : "rgba(15,61,145,0.15)",
    watermark: isBlue ? "rgba(255,255,255,0.04)" : "rgba(15,61,145,0.08)",
    gridBorder: isBlue ? "#fff" : "#0f3d91",
    gridOpacity: isBlue ? 0.06 : 0.08,
    
    // Badges
    badgeIdleBg: isBlue ? "rgba(255,255,255,0.07)" : "rgba(15,61,145,0.05)",
    badgeIdleBorder: isBlue ? "rgba(255,255,255,0.12)" : "rgba(15,61,145,0.15)",
    badgeIdleText: isBlue ? "#ffffff" : DEEP_BLUE,
    
    badgeActiveBg: isBlue ? `${GREEN}22` : "rgba(15,61,145,0.15)",
    badgeActiveBorder: isBlue ? GREEN : DEEP_BLUE,
    badgeActiveText: isBlue ? GREEN : DEEP_BLUE,
    badgeActiveDot: isBlue ? GREEN : DEEP_BLUE,
    badgeIdleDot: isBlue ? "rgba(255,255,255,0.4)" : "rgba(15,61,145,0.4)",

    // Stats
    statNum: isBlue ? "text-white" : "text-[#0f3d91]",
    statSub: isBlue ? "text-[#4da3ff]" : "text-[#0f3d91]",
    statISO: isBlue ? GREEN : DEEP_BLUE,
  };

  return (
    <div
      className="relative flex flex-col justify-between rounded-2xl overflow-hidden h-full"
      style={{
        backgroundColor: theme.bg,
        boxShadow: "0 8px 40px -8px rgba(15,61,145,0.35)",
        minHeight: "340px",
      }}
    >
      {/* Tech grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: theme.gridOpacity,
          backgroundImage: `linear-gradient(${theme.gridBorder} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridBorder} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Watermark series code */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 font-black select-none leading-none transition-colors duration-500"
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          color: theme.watermark,
          letterSpacing: "-0.04em",
        }}
      >
        {env.shortName}
      </div>

      {/* Top label */}
      <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-8">
        <span
          className="inline-flex items-center gap-2 pl-3 border-l-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors duration-500"
          style={{ borderColor: theme.accentPrimary, color: theme.accentPrimary }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500"
            style={{ backgroundColor: theme.accentPrimary }}
          />
          {env.shortName}
        </span>

        <h3
          className={`mt-4 font-black leading-[1.1] tracking-tight transition-colors duration-500 ${theme.title}`}
          style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
        >
          {env.name}
        </h3>

        <p
          className={`mt-4 text-sm leading-relaxed font-medium transition-colors duration-500 ${theme.desc}`}
        >
          {env.description}
        </p>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 mx-6 sm:mx-8 mt-6 transition-colors duration-500"
        style={{ borderTop: `1px solid ${theme.divider}` }}
      />

      {/* Pump models grid */}
      <div className="relative z-10 px-6 pt-5 pb-6 sm:px-8 sm:pb-8 flex flex-col gap-4">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.18em] transition-colors duration-500 ${theme.statSub}`}
        >
          Recommended Pumps
        </p>

        <div className="flex flex-wrap gap-2">
          {env.diagramNodes.map((node) => {
            const pump      = getPumpById(node.pumpModelId);
            const isActive  = activeNode?.id === node.id;

            return (
              <span
                key={node.id}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-200"
                style={{
                  backgroundColor: isActive ? theme.badgeActiveBg : theme.badgeIdleBg,
                  border:          `1px solid ${isActive ? theme.badgeActiveBorder : theme.badgeIdleBorder}`,
                  color:           isActive ? theme.badgeActiveText : theme.badgeIdleText,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                  style={{ backgroundColor: isActive ? theme.badgeActiveDot : theme.badgeIdleDot }}
                />
                {pump?.seriesCode ?? node.pumpModelId}
              </span>
            );
          })}
        </div>

        {/* Stat row — number of stages */}
        <div
          className="grid grid-cols-2 gap-4 mt-2 pt-5 transition-colors duration-500"
          style={{ borderTop: `1px solid ${theme.divider}` }}
        >
          <div>
            <div
              className={`text-2xl font-black transition-colors duration-500 ${theme.statNum}`}
              style={{ letterSpacing: "-0.03em" }}
            >
              {env.diagramNodes.length}
            </div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-500 ${theme.statSub}`}
            >
              Process Stages
            </div>
          </div>
          <div>
            <div
              className="text-2xl font-black transition-colors duration-500"
              style={{ color: theme.statISO, letterSpacing: "-0.03em" }}
            >
              ISO
            </div>
            <div
              className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-500 ${theme.statSub}`}
            >
              Grade Pumps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
