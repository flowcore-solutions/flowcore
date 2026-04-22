"use client";

import { useId } from "react";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";

// ── Brand palette (globals.css) ─────────────────────────────────────────────
const PRIMARY_BLUE  = "#1e5bb8";
const DEEP_BLUE     = "#0f3d91";
const LIGHT_BLUE    = "#4da3ff";
const PRIMARY_GREEN = "#6cc24a";
const DARK_GREEN    = "#2fa84f";

// ── Neutral system ──────────────────────────────────────────────────────────
const BG_WHITE   = "#ffffff";
const BG_SECTION = "#f8fafc";
const BORDER     = "#e5e7eb";
const TEXT_LIGHT = "#64748b";
const TEXT_MID   = "#94a3b8"; // watermark — visible but subtle

// ── Pipe ────────────────────────────────────────────────────────────────────
const PIPE_BASE   = "#dde3ec";
const PIPE_SHADOW = "#c8d3de";

// ── Label anchoring thresholds ───────────────────────────────────────────────
// Nodes near the left/right edge get start/end anchors to prevent clip.
const LEFT_ANCHOR_THRESHOLD  = 30; // x < 30 → start
const RIGHT_ANCHOR_THRESHOLD = 70; // x > 70 → end

interface DiagramSchematicProps {
  env: ApplicationEnvironment;
  activeNodeId: string | null;
  onNodeEnter: (node: DiagramNode) => void;
  onNodeLeave: () => void;
}

function isHoverPointer(pointerType: string) {
  return pointerType === "mouse";
}

function getLabelAnchor(x: number): {
  anchor: "start" | "middle" | "end";
  textX: number;
} {
  if (x < LEFT_ANCHOR_THRESHOLD)  return { anchor: "start",  textX: x - 5.5 };
  if (x > RIGHT_ANCHOR_THRESHOLD) return { anchor: "end",    textX: x + 5.5 };
  return                                  { anchor: "middle", textX: x };
}

function getNodeIcon(
  role: string
): "pump" | "filter" | "tank" | "distribution" | "intake" {
  const r = role.toLowerCase();
  if (r.includes("intake") || r.includes("extraction") || r.includes("submersible"))
    return "intake";
  if (r.includes("filter") || r.includes("treatment")) return "filter";
  if (r.includes("distribution") || r.includes("network") || r.includes("supply"))
    return "distribution";
  if (r.includes("storage") || r.includes("tank")) return "tank";
  return "pump";
}

function NodeIcon({
  type,
  size = 6,
}: {
  type: ReturnType<typeof getNodeIcon>;
  size?: number;
}) {
  const s = size;
  switch (type) {
    case "intake":
      return (
        <g>
          <polygon
            points={`0,${-s * 0.1} ${s * 0.45},${-s * 0.7} ${-s * 0.45},${-s * 0.7}`}
            fill="currentColor"
          />
          <rect
            x={-s * 0.15} y={-s * 0.1}
            width={s * 0.3} height={s * 0.8}
            rx={s * 0.08}
            fill="currentColor"
          />
        </g>
      );
    case "filter":
      return (
        <polygon
          points={`${-s * 0.55},${-s * 0.6} ${s * 0.55},${-s * 0.6} ${s * 0.2},${s * 0.1} ${s * 0.2},${s * 0.7} ${-s * 0.2},${s * 0.7} ${-s * 0.2},${s * 0.1}`}
          fill="currentColor"
        />
      );
    case "distribution":
      return (
        <g strokeWidth={s * 0.15} stroke="currentColor" fill="none" strokeLinecap="round">
          <circle cx={0} cy={0} r={s * 0.3} fill="currentColor" stroke="none" />
          <line x1={0} y1={-s * 0.45} x2={0} y2={-s * 0.7} />
          <line x1={s * 0.39} y1={-s * 0.22} x2={s * 0.6} y2={-s * 0.35} />
          <line x1={s * 0.45} y1={0} x2={s * 0.7} y2={0} />
          <line x1={s * 0.39} y1={s * 0.22} x2={s * 0.6} y2={s * 0.35} />
          <line x1={0} y1={s * 0.45} x2={0} y2={s * 0.7} />
          <line x1={-s * 0.39} y1={s * 0.22} x2={-s * 0.6} y2={s * 0.35} />
          <line x1={-s * 0.45} y1={0} x2={-s * 0.7} y2={0} />
          <line x1={-s * 0.39} y1={-s * 0.22} x2={-s * 0.6} y2={-s * 0.35} />
        </g>
      );
    case "tank":
      return (
        <g fill="currentColor">
          <ellipse cx={0} cy={-s * 0.25} rx={s * 0.5} ry={s * 0.22} />
          <rect x={-s * 0.5} y={-s * 0.25} width={s} height={s * 0.55} />
          <ellipse cx={0} cy={s * 0.3} rx={s * 0.5} ry={s * 0.22} fill={BG_SECTION} />
        </g>
      );
    default: // pump — centrifugal symbol
      return (
        <g>
          <circle cx={0} cy={0} r={s * 0.5} fill="currentColor" />
          <circle cx={0} cy={0} r={s * 0.22} fill={BG_WHITE} />
          <line x1={0} y1={-s * 0.72} x2={0} y2={-s * 0.52}
            stroke={BG_WHITE} strokeWidth={s * 0.18} strokeLinecap="round" />
          <line x1={s * 0.72} y1={0} x2={s * 0.52} y2={0}
            stroke={BG_WHITE} strokeWidth={s * 0.18} strokeLinecap="round" />
        </g>
      );
  }
}

export default function DiagramSchematic({
  env,
  activeNodeId,
  onNodeEnter,
  onNodeLeave,
}: DiagramSchematicProps) {
  const uid          = useId();
  const gridId       = `${uid}-grid`;
  const glowId       = `${uid}-glow`;
  const activeGlowId = `${uid}-active-glow`;
  const flowGradId   = `${uid}-flow-grad`;

  const nodes = [...env.diagramNodes];

  // Orthogonal elbow routing
  const pipes = nodes.slice(0, -1).map((n, i) => {
    const next = nodes[i + 1];
    const midX = (n.x + next.x) / 2;
    return {
      key:  `${n.id}-${next.id}`,
      d:    `M ${n.x} ${n.y} H ${midX} V ${next.y} H ${next.x}`,
      midX,
      fromY: n.y,
    };
  });

  return (
    <div
      className="w-full rounded-2xl overflow-hidden select-none"
      style={{
        background:  BG_WHITE,
        border:      `1.5px solid ${BORDER}`,
        boxShadow:   "0 4px 28px 0 rgba(15, 61, 145, 0.07)",
      }}
    >
      {/*
        Single SVG — viewBox 0 0 100 70.
        width="100%" + aspectRatio lets it scale naturally to fill the card
        without a fixed pixel height, preventing both the squished and
        overflowing diagram problems.
      */}
      <svg
        viewBox="0 0 100 70"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", width: "100%", aspectRatio: "100 / 70" }}
        role="img"
        aria-label={`${env.name} pump system schematic`}
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={onNodeLeave}
      >
        <defs>
          {/* Fine dot grid — engineering drawing aesthetic */}
          <pattern id={gridId} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="0.42" fill={BORDER} />
          </pattern>

          {/* Idle node: subtle blue halo */}
          <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur" type="matrix"
              values="0 0.2 0.9 0 0  0 0.2 0.9 0 0  0 0 1 0 0  0 0 0 0.28 0"
              result="c"
            />
            <feMerge>
              <feMergeNode in="c" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Active node: green glow */}
          <filter id={activeGlowId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur" type="matrix"
              values="0.2 0.8 0.25 0 0  0.2 0.8 0.25 0 0  0 0 0 0 0  0 0 0 0.52 0"
              result="c"
            />
            <feMerge>
              <feMergeNode in="c" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Flow dashes: green fade */}
          <linearGradient id={flowGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={PRIMARY_GREEN} stopOpacity="0.1" />
            <stop offset="50%"  stopColor={PRIMARY_GREEN} stopOpacity="0.9" />
            <stop offset="100%" stopColor={PRIMARY_GREEN} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background fill + dot grid */}
        <rect width="100" height="70" fill={BG_WHITE} />
        <rect width="100" height="70" fill={`url(#${gridId})`} />

        {/* ── Pipe shadow ── */}
        {pipes.map((p) => (
          <path
            key={`sh-${p.key}`}
            d={p.d} fill="none"
            stroke={PIPE_SHADOW} strokeWidth="3.8"
            strokeLinecap="round" strokeLinejoin="round"
            opacity="0.4"
          />
        ))}

        {/* ── Pipe base ── */}
        {pipes.map((p) => (
          <path
            key={`base-${p.key}`}
            d={p.d} fill="none"
            stroke={PIPE_BASE} strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round"
          />
        ))}

        {/* ── Animated flow dashes ── */}
        {pipes.map((p) => (
          <path
            key={`flow-${p.key}`}
            className="flow-line"
            d={p.d} fill="none"
            stroke={`url(#${flowGradId})`} strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round"
            opacity="0.85"
          />
        ))}

        {/* ── Elbow joints ── */}
        {pipes.map((p, i) => {
          const n    = nodes[i];
          const next = nodes[i + 1];
          return (
            <g key={`elbow-${p.key}`}>
              <circle cx={p.midX} cy={n.y}    r="1.1"
                fill={BG_WHITE} stroke={BORDER} strokeWidth="0.5" />
              <circle cx={p.midX} cy={next.y} r="1.1"
                fill={BG_WHITE} stroke={BORDER} strokeWidth="0.5" />
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {nodes.map((node, idx) => {
          const isActive = activeNodeId === node.id;
          const iconType = getNodeIcon(node.role);
          const isFirst  = idx === 0;
          const isLast   = idx === nodes.length - 1;

          const ringColor = isActive
            ? PRIMARY_GREEN
            : isFirst  ? PRIMARY_BLUE
            : isLast   ? DARK_GREEN
            : DEEP_BLUE;

          const innerFill = isActive ? "#ecfce7" : BG_SECTION;
          const iconColor = isActive ? PRIMARY_GREEN : PRIMARY_BLUE;
          const badgeFill = isActive ? PRIMARY_GREEN : DEEP_BLUE;
          const labelFill = isActive ? DARK_GREEN : TEXT_LIGHT;

          const { anchor, textX } = getLabelAnchor(node.x);

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{
                cursor: "pointer",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
              }}
              onPointerDown={(event) => {
                event.stopPropagation();
                // preventDefault() here kills the browser's 300ms tap-to-click delay 
                // and prevents the simulated "hover" state on hold.
                event.preventDefault(); 
                
                if (isHoverPointer(event.pointerType)) {
                  return; // Mouse users handled by enter/leave
                }
                
                if (isActive) {
                  onNodeLeave();
                } else {
                  onNodeEnter(node);
                }
              }}
              onPointerEnter={(event) => {
                if (!isHoverPointer(event.pointerType)) return;
                onNodeEnter(node);
              }}
              onPointerLeave={(event) => {
                if (!isHoverPointer(event.pointerType)) return;
                onNodeLeave();
              }}
              aria-label={node.label}
              role="button"
              tabIndex={0}
              onFocus={() => onNodeEnter(node)}
              onBlur={onNodeLeave}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                  return;
                }
                event.preventDefault();
                if (isActive) {
                  onNodeLeave();
                  return;
                }
                onNodeEnter(node);
              }}
              filter={isActive ? `url(#${activeGlowId})` : `url(#${glowId})`}
            >
              {/* Active pulse ring */}
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

              {/* Outer ring */}
              <circle
                r={isActive ? "7" : "6.2"}
                fill={BG_WHITE}
                stroke={ringColor}
                strokeWidth={isActive ? "1.6" : "1.3"}
                style={{ transition: "all 0.25s ease" }}
              />

              {/* Inner fill */}
              <circle
                r={isActive ? "5.2" : "4.5"}
                fill={innerFill}
                style={{ transition: "all 0.25s ease" }}
              />

              {/* Icon — 38% scale in node-local space */}
              <g
                color={iconColor}
                style={{ transition: "color 0.25s ease" }}
                transform="scale(0.38)"
              >
                <NodeIcon type={iconType} size={6} />
              </g>

              {/* Step badge — offset top-right */}
              <g transform="translate(5, -5)">
                <circle
                  r="2.2"
                  fill={badgeFill}
                  stroke={BG_WHITE}
                  strokeWidth="0.55"
                  style={{ transition: "fill 0.25s ease" }}
                />
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fontSize="2.1"
                  fontFamily="var(--font-poppins), ui-sans-serif"
                  fontWeight="700"
                  fill={BG_WHITE}
                  style={{ userSelect: "none" }}
                >
                  {idx + 1}
                </text>
              </g>

              {/*
                Node label — positioned below node, with smart anchor:
                  x < 30  → textAnchor="start"  (grows rightward, won't clip left)
                  x > 70  → textAnchor="end"    (grows leftward, won't clip right)
                  else    → textAnchor="middle"
                textX is adjusted so the label aligns near the node edge, not the centre,
                for start/end cases.
              */}
              <text
                x={textX - node.x}
                y="10.5"
                textAnchor={anchor}
                fontSize={isActive ? "3.4" : "3"}
                fontFamily="var(--font-poppins), ui-sans-serif"
                fontWeight={isActive ? "700" : "500"}
                fill={labelFill}
                style={{ transition: "all 0.25s ease", userSelect: "none" }}
                letterSpacing="-0.02"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/*
        Legend bar — HTML, not SVG.
        Sits cleanly below the diagram with a top border.
        This eliminates all SVG-coordinate overlap between legend and diagram content.
      */}
      <div
        className="flex items-center gap-5 px-4 py-2.5"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        {/* Active Flow */}
        <div className="flex items-center gap-2">
          <svg width="22" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="22" y2="3"
              stroke={PRIMARY_GREEN} strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: DARK_GREEN }}
          >
            Active Flow
          </span>
        </div>

        {/* Pump Node */}
        <div className="flex items-center gap-2">
          <svg width="12" height="12" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" fill="none" stroke={PRIMARY_BLUE} strokeWidth="1.2" />
            <circle cx="6" cy="6" r="1.6" fill={LIGHT_BLUE} />
          </svg>
          <span
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: TEXT_LIGHT }}
          >
            Pump Node
          </span>
        </div>

        {/* Watermark — right-aligned */}
        <span
          className="ml-auto text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: TEXT_MID }}
        >
          {env.shortName.toUpperCase()} — Berlington Pump System
        </span>
      </div>
    </div>
  );
}
