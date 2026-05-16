"use client";

import { JSX, useId } from "react";
import type { ApplicationEnvironment, DiagramNode, EquipmentType } from "@/lib/application-data";

// ── Brand palette ────────────────────────────────────────────────────────────
const PRIMARY_BLUE  = "#1e5bb8";
const DEEP_BLUE     = "#0f3d91";
const LIGHT_BLUE    = "#4da3ff";
const PRIMARY_GREEN = "#6cc24a";
const DARK_GREEN    = "#2fa84f";
const AMBER         = "#f59e0b";
const SLATE         = "#64748b";

const BG_WHITE    = "#ffffff";
const BG_SECTION  = "#f8fafc";
const BORDER      = "#e5e7eb";
const TEXT_LIGHT  = "#64748b";
const TEXT_MID    = "#94a3b8";
const PIPE_BASE   = "#dde3ec";
const PIPE_SHADOW = "#c8d3de";

const LEFT_ANCHOR_THRESHOLD  = 30;
const RIGHT_ANCHOR_THRESHOLD = 70;

function svgCoord(value: number): number {
  return Number(value.toFixed(3));
}

// ── Equipment accent colours (one per type) ──────────────────────────────────
const EQUIPMENT_ACCENT: Record<EquipmentType, string> = {
  pump:     PRIMARY_BLUE,
  tank:     LIGHT_BLUE,
  filter:   AMBER,
  membrane: PRIMARY_GREEN,
  blower:   SLATE,
  valve:    DEEP_BLUE,
};

// ── Icons — drawn in a ~−9..+9 local coordinate space ───────────────────────
// Parent <g> sets color={accent} so icons use currentColor.

function PumpIcon() {
  return (
    <g>
      <circle cx={0} cy={0} r={7} fill="currentColor" opacity={0.15} stroke="currentColor" strokeWidth={1.4} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={svgCoord(Math.cos(r) * 2)} y1={svgCoord(Math.sin(r) * 2)}
            x2={svgCoord(Math.cos(r) * 5.5)} y2={svgCoord(Math.sin(r) * 5.5)}
            stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        );
      })}
      <circle cx={0} cy={0} r={2} fill="currentColor" />
      <line x1={-7} y1={0} x2={-9} y2={0} stroke="currentColor" strokeWidth={1.5} />
      <line x1={0} y1={-7} x2={0} y2={-9} stroke="currentColor" strokeWidth={1.5} />
    </g>
  );
}

function TankIcon() {
  return (
    <g>
      <rect x={-5.5} y={-6} width={11} height={12} rx={2.5}
        fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth={1.4} />
      <line x1={-3.5} y1={-1.5} x2={3.5} y2={-1.5} stroke="currentColor" strokeWidth={1} strokeDasharray="3 2" opacity={0.7} />
      <line x1={-3.5} y1={1.5}  x2={3.5} y2={1.5}  stroke="currentColor" strokeWidth={1} strokeDasharray="3 2" opacity={0.7} />
      <line x1={0} y1={6} x2={0} y2={8.5} stroke="currentColor" strokeWidth={1.5} />
    </g>
  );
}

function FilterIcon() {
  return (
    <g>
      <rect x={-5} y={-7} width={10} height={14} rx={2}
        fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth={1.4} />
      <line x1={-3} y1={-2} x2={3} y2={-2} stroke="currentColor" strokeWidth={1}   strokeDasharray="4 2" opacity={0.8} />
      <line x1={-3} y1={1}  x2={3} y2={1}  stroke="currentColor" strokeWidth={1.3} opacity={0.9} />
      <line x1={-3} y1={4}  x2={3} y2={4}  stroke="currentColor" strokeWidth={1}   strokeDasharray="2 1.5" opacity={0.8} />
      <line x1={0} y1={-7} x2={0} y2={-9} stroke="currentColor" strokeWidth={1.5} />
      <line x1={0} y1={7}  x2={0} y2={9}  stroke="currentColor" strokeWidth={1.5} />
    </g>
  );
}

function MembraneIcon() {
  return (
    <g>
      <ellipse cx={0} cy={0} rx={8} ry={4.5}
        fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth={1.4} />
      {[-4, -1.5, 1.5, 4].map((x) => (
        <line key={x} x1={x} y1={-3} x2={x} y2={3}
          stroke="currentColor" strokeWidth={1.1} opacity={0.75} />
      ))}
      <line x1={-8} y1={0} x2={-10} y2={0} stroke="currentColor" strokeWidth={1.5} />
      <line x1={8}  y1={0} x2={10}  y2={0} stroke="currentColor" strokeWidth={1.5} />
    </g>
  );
}

function BlowerIcon() {
  return (
    <g>
      <circle cx={0} cy={0} r={6.5}
        fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth={1.4} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={svgCoord(Math.cos(r) * 1.5)} y1={svgCoord(Math.sin(r) * 1.5)}
            x2={svgCoord(Math.cos(r) * 5.2)} y2={svgCoord(Math.sin(r) * 5.2)}
            stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
        );
      })}
      <circle cx={0} cy={0} r={1.5} fill="currentColor" />
      {[-3, 0, 3].map((dx) => (
        <g key={dx}>
          <line x1={dx} y1={-6.5} x2={dx} y2={-9} stroke="currentColor" strokeWidth={1} />
          <polyline points={`${dx - 1.2},-7.5 ${dx},-9 ${dx + 1.2},-7.5`}
            stroke="currentColor" strokeWidth={1} fill="none" />
        </g>
      ))}
    </g>
  );
}

function ValveIcon() {
  return (
    <g>
      <polygon points="-6.5,-5.5 0,0 -6.5,5.5"
        fill="currentColor" opacity={0.15} stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
      <polygon points="6.5,-5.5 0,0 6.5,5.5"
        fill="currentColor" opacity={0.15} stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
      <line x1={0} y1={-5.5} x2={0} y2={-8.5} stroke="currentColor" strokeWidth={1.5} />
      <rect x={-3} y={-10} width={6} height={2} rx={1} fill="currentColor" />
    </g>
  );
}

const ICON_MAP: Record<EquipmentType, () => JSX.Element> = {
  pump:     () => <PumpIcon />,
  tank:     () => <TankIcon />,
  filter:   () => <FilterIcon />,
  membrane: () => <MembraneIcon />,
  blower:   () => <BlowerIcon />,
  valve:    () => <ValveIcon />,
};

// ── Label anchor ─────────────────────────────────────────────────────────────
function getLabelAnchor(x: number): { anchor: "start" | "middle" | "end"; textX: number } {
  if (x < LEFT_ANCHOR_THRESHOLD)  return { anchor: "start", textX: x - 5.5 };
  if (x > RIGHT_ANCHOR_THRESHOLD) return { anchor: "end",   textX: x + 5.5 };
  return { anchor: "middle", textX: x };
}

function isHoverPointer(pt: string) { return pt === "mouse"; }

// ── Props ────────────────────────────────────────────────────────────────────
interface DiagramSchematicProps {
  env:          ApplicationEnvironment;
  activeNodeId: string | null;
  onNodeEnter:  (node: DiagramNode) => void;
  onNodeLeave:  () => void;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function DiagramSchematic({ env, activeNodeId, onNodeEnter, onNodeLeave }: DiagramSchematicProps) {
  const uid          = useId();
  const gridId       = `${uid}-grid`;
  const glowId       = `${uid}-glow`;
  const activeGlowId = `${uid}-active-glow`;
  const flowGradId   = `${uid}-flow-grad`;

  const nodes = Array.isArray(env?.diagramNodes) ? [...env.diagramNodes] : [];

  const pipes = nodes.slice(0, -1).map((n, i) => {
    const next = nodes[i + 1];
    const midX = (n.x + next.x) / 2;
    return { key: `${n.id}-${next.id}`, d: `M ${n.x} ${n.y} H ${midX} V ${next.y} H ${next.x}`, midX };
  });

  // Equipment types present in this env for the legend
  const presentTypes = (Object.entries(EQUIPMENT_ACCENT) as [EquipmentType, string][])
    .filter(([type]) => nodes.some((n) => n.equipmentType === type));

  return (
    <div className="w-full rounded-2xl overflow-hidden select-none"
      style={{ background: BG_WHITE, border: `1.5px solid ${BORDER}`, boxShadow: "0 4px 28px 0 rgba(15,61,145,0.07)" }}>

      <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", width: "100%", aspectRatio: "100 / 70" }}
        role="img" aria-label={`${env.name} system schematic`}
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={onNodeLeave}>

        <defs>
          <pattern id={gridId} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="0.42" fill={BORDER} />
          </pattern>

          <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0 0.2 0.9 0 0  0 0.2 0.9 0 0  0 0 1 0 0  0 0 0 0.28 0" result="c" />
            <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id={activeGlowId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0.2 0.8 0.25 0 0  0.2 0.8 0.25 0 0  0 0 0 0 0  0 0 0 0.52 0" result="c" />
            <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <linearGradient id={flowGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={PRIMARY_GREEN} stopOpacity="0.1" />
            <stop offset="50%"  stopColor={PRIMARY_GREEN} stopOpacity="0.9" />
            <stop offset="100%" stopColor={PRIMARY_GREEN} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect width="100" height="70" fill={BG_WHITE} />
        <rect width="100" height="70" fill={`url(#${gridId})`} />

        {/* Pipes */}
        {pipes.map((p) => (
          <path key={`sh-${p.key}`} d={p.d} fill="none"
            stroke={PIPE_SHADOW} strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        ))}
        {pipes.map((p) => (
          <path key={`base-${p.key}`} d={p.d} fill="none"
            stroke={PIPE_BASE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {pipes.map((p) => (
          <path key={`flow-${p.key}`} className="flow-line" d={p.d} fill="none"
            stroke={`url(#${flowGradId})`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        ))}

        {/* Elbow joints */}
        {pipes.map((p, i) => {
          const n = nodes[i]; const next = nodes[i + 1];
          return (
            <g key={`elbow-${p.key}`}>
              <circle cx={p.midX} cy={n.y}    r="1.1" fill={BG_WHITE} stroke={BORDER} strokeWidth="0.5" />
              <circle cx={p.midX} cy={next.y} r="1.1" fill={BG_WHITE} stroke={BORDER} strokeWidth="0.5" />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const isActive  = activeNodeId === node.id;
          const accent    = EQUIPMENT_ACCENT[node.equipmentType];
          const ringColor = isActive ? PRIMARY_GREEN : accent;
          const innerFill = isActive ? "#ecfce7" : BG_SECTION;
          const iconColor = isActive ? PRIMARY_GREEN : accent;
          const badgeFill = isActive ? PRIMARY_GREEN : DEEP_BLUE;
          const labelFill = isActive ? DARK_GREEN : TEXT_LIGHT;
          const IconComp  = ICON_MAP[node.equipmentType];
          const { anchor, textX } = getLabelAnchor(node.x);

          return (
            <g key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{ cursor: "pointer", outline: "none", WebkitTapHighlightColor: "transparent" }}
              onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); if (isHoverPointer(e.pointerType)) return; isActive ? onNodeLeave() : onNodeEnter(node); }}
              onPointerEnter={(e) => { if (isHoverPointer(e.pointerType)) onNodeEnter(node); }}
              onPointerLeave={(e) => { if (isHoverPointer(e.pointerType)) onNodeLeave(); }}
              aria-label={node.label} role="button" tabIndex={0}
              onFocus={() => onNodeEnter(node)} onBlur={onNodeLeave}
              onKeyDown={(e) => { if (e.key !== "Enter" && e.key !== " ") return; e.preventDefault(); isActive ? onNodeLeave() : onNodeEnter(node); }}
              filter={isActive ? `url(#${activeGlowId})` : `url(#${glowId})`}>

              {isActive && (
                <>
                  <circle r="9" fill={`${PRIMARY_GREEN}16`} stroke="none">
                    <animate attributeName="r"       values="6;10;6"      dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle r="6.5" fill="none" stroke={PRIMARY_GREEN} strokeWidth="0.45" opacity="0.5">
                    <animate attributeName="r"       values="5;8;5"        dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.04;0.6" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              <circle r={isActive ? "7" : "6.2"} fill={BG_WHITE}
                stroke={ringColor} strokeWidth={isActive ? "1.6" : "1.3"}
                style={{ transition: "all 0.25s ease" }} />

              <circle r={isActive ? "5.2" : "4.5"} fill={innerFill}
                style={{ transition: "all 0.25s ease" }} />

              {/* Equipment-specific icon */}
              <g color={iconColor} style={{ transition: "color 0.25s ease" }} transform="scale(0.42)">
                <IconComp />
              </g>

              {/* Step badge */}
              <g transform="translate(5, -5)">
                <circle r="2.2" fill={badgeFill} stroke={BG_WHITE} strokeWidth="0.55"
                  style={{ transition: "fill 0.25s ease" }} />
                <text textAnchor="middle" dominantBaseline="central"
                  fontSize="2.1" fontFamily="var(--font-poppins), ui-sans-serif"
                  fontWeight="700" fill={BG_WHITE} style={{ userSelect: "none" }}>
                  {idx + 1}
                </text>
              </g>

              {/* Label */}
              <text x={textX - node.x} y="10.5" textAnchor={anchor}
                fontSize={isActive ? "3.4" : "3"}
                fontFamily="var(--font-poppins), ui-sans-serif"
                fontWeight={isActive ? "700" : "500"}
                fill={labelFill}
                style={{ transition: "all 0.25s ease", userSelect: "none" }}
                letterSpacing="-0.02">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend bar */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5"
        style={{ borderTop: `1px solid ${BORDER}` }}>

        <div className="flex items-center gap-2">
          <svg width="22" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="22" y2="3" stroke={PRIMARY_GREEN} strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: DARK_GREEN }}>
            Active Flow
          </span>
        </div>

        {presentTypes.map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <svg width="10" height="10" aria-hidden="true">
              <circle cx="5" cy="5" r="4" fill="none" stroke={color} strokeWidth="1.4" />
              <circle cx="5" cy="5" r="1.5" fill={color} />
            </svg>
            <span className="text-[10px] font-medium  tracking-widest capitalize"
              style={{ color: TEXT_LIGHT }}>
              {type}
            </span>
          </div>
        ))}

        <span className="ml-auto text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: TEXT_MID }}>
          {env.shortName} — Berlington System
        </span>
      </div>
    </div>
  );
}
