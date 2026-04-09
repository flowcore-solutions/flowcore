import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";

const GREEN = "#6cc24a";
const DEEP_BLUE = "#0f3d91";
const PRIMARY_BLUE = "#1e5bb8";
const BORDER = "#e5e7eb";
const TEXT_LIGHT = "#64748b";

interface EnvironmentInfoProps {
  env: ApplicationEnvironment;
  activeNode: DiagramNode | null;
}

export default function EnvironmentInfo({ env, activeNode }: EnvironmentInfoProps) {
  return (
    <div className="flex flex-col justify-center gap-6">
      <div>
        <span
          className="inline-flex items-center pl-3 border-l-2 border-primary-green text-xs font-semibold uppercase tracking-widest"
          style={{ color: GREEN }}
        >
          {env.shortName}
        </span>
      </div>

      <div>
        <h3
          className="font-bold leading-tight mb-3"
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            color: DEEP_BLUE,
          }}
        >
          {env.name}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: TEXT_LIGHT }}
        >
          {env.description}
        </p>
      </div>

      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-wider mb-2"
          style={{ color: TEXT_LIGHT }}
        >
          Recommended Pumps
        </p>
        <div className="flex flex-wrap gap-2">
          {env.diagramNodes.map((node) => {
            const pump = getPumpById(node.pumpModelId);
            return (
              <span
                key={node.id}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold border transition-colors duration-200"
                style={{
                  backgroundColor:
                    activeNode?.id === node.id ? `${GREEN}15` : "#f8fafc",
                  borderColor:
                    activeNode?.id === node.id ? GREEN : BORDER,
                  color:
                    activeNode?.id === node.id ? "#2fa84f" : DEEP_BLUE,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      activeNode?.id === node.id ? GREEN : `${PRIMARY_BLUE}40`,
                  }}
                />
                {pump?.seriesCode ?? node.pumpModelId}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
