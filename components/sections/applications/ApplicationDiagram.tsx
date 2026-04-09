"use client";

/**
 * ApplicationDiagram — Interactive SVG technical schematic.
 *
 * Architecture:
 *  - Pure SVG rendered inside a responsive container (viewBox="0 0 100 100"
 *    with preserveAspectRatio ensures it scales perfectly).
 *  - Node positions from DiagramNode.x/y (percentage-based, maps to SVG coords).
 *  - Pipe paths drawn as SVG polylines between sequential nodes.
 *  - Green "flow-line" CSS animation (stroke-dashoffset) on pipes.
 *  - Hover on a node → PrecisionReveal tooltip card with pump specs.
 *  - No external diagram libraries. Zero extra dependencies.
 */

import Image from "next/image";
import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";

// ── Static image map (only pumps that appear in diagrams) ─────────────────
import cdlCdlf from "@/app/assets/pumps/cdl-cdlf.png";
import wq from "@/app/assets/pumps/wq.png";
import qyB from "@/app/assets/pumps/qy-b.png";
import hydro from "@/app/assets/pumps/hydro.png";
import chl from "@/app/assets/pumps/chl.png";
import chm from "@/app/assets/pumps/chm.png";
import chlf from "@/app/assets/pumps/chlf-chlf-t.png";
import bt from "@/app/assets/pumps/bt.png";
import niso from "@/app/assets/pumps/niso.png";
import sz from "@/app/assets/pumps/sz.png";
import ld from "@/app/assets/pumps/ld.png";
import stp from "@/app/assets/pumps/stp.png";
import type { StaticImageData } from "next/image";

const PUMP_IMAGES: Record<string, StaticImageData> = {
  "cdl-cdlf": cdlCdlf,
  wq,
  "qy-b": qyB,
  hydro,
  chl,
  chm,
  chlf,
  bt,
  niso,
  sz,
  ld,
  stp,
};

// ── Constants ─────────────────────────────────────────────────────────────
const PRECISION_EASE = [0.25, 0, 0, 1] as const;
const GREEN = "#6cc24a";
const DEEP_BLUE = "#0f3d91";
const PRIMARY_BLUE = "#1e5bb8";
const BORDER = "#e5e7eb";
const TEXT_LIGHT = "#64748b";

// ── Tooltip Card ─────────────────────────────────────────────────────────

interface TooltipProps {
  node: DiagramNode;
  // Position in SVG percentage units — converted to CSS % for absolute placement
  anchorX: number;
  anchorY: number;
}

function PumpTooltip({ node, anchorX, anchorY }: TooltipProps) {
  const pump = getPumpById(node.pumpModelId);
  const image = PUMP_IMAGES[node.pumpModelId];

  // Position tooltip above-right of node, clamped to stay visible
  const leftPct = Math.min(anchorX + 4, 58);
  const topPct = Math.max(anchorY - 36, 2);

  return (
    <motion.div
      role="tooltip"
      initial={{ opacity: 0, scale: 0.94, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 4 }}
      transition={{ duration: 0.2, ease: PRECISION_EASE }}
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        zIndex: 20,
        width: "220px",
        boxShadow: "var(--shadow-card-hover)",
      }}
      className="rounded-xl border border-border bg-white overflow-hidden pointer-events-none"
    >
      {/* Header stripe — green accent */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: `${GREEN}15`, borderBottom: `1px solid ${BORDER}` }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#2fa84f" }}
        >
          {node.label}
        </span>
      </div>

      <div className="p-3 flex gap-3">
        {/* Pump image */}
        {image ? (
          <div
            className="shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
            style={{ width: 56, height: 56, backgroundColor: "#f8fafc" }}
          >
            <Image
              src={image}
              alt={pump?.fullName ?? node.pumpModelId}
              width={52}
              height={52}
              className="object-contain p-1"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1 min-w-0">
          {/* Pump name */}
          <p
            className="text-xs font-bold leading-tight truncate"
            style={{ color: DEEP_BLUE }}
          >
            {pump?.fullName ?? node.pumpModelId}
          </p>
          {/* Role description */}
          <p
            className="text-[11px] leading-snug"
            style={{ color: TEXT_LIGHT }}
          >
            {node.role}
          </p>
        </div>
      </div>

      {/* Spec strip */}
      {pump && (
        <div
          className="grid grid-cols-2 divide-x border-t border-border"
        >
          {[
            ["Flow", pump.flowRate],
            ["Head", pump.maxHead],
          ].map(([label, val]) => (
            <div key={label} className="px-3 py-2 flex flex-col gap-0.5">
              <span
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: TEXT_LIGHT }}
              >
                {label}
              </span>
              <span
                className="text-[11px] font-semibold"
                style={{ color: PRIMARY_BLUE, fontVariantNumeric: "tabular-nums" }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── SVG Schematic ─────────────────────────────────────────────────────────

interface SchematicProps {
  env: ApplicationEnvironment;
  activeNodeId: string | null;
  onNodeEnter: (node: DiagramNode) => void;
  onNodeLeave: () => void;
}

function DiagramSchematic({
  env,
  activeNodeId,
  onNodeEnter,
  onNodeLeave,
}: SchematicProps) {
  const clipId = useId();

  // Build pipe path: connect nodes sequentially with orthogonal segments
  // Each segment: horizontal then vertical, giving an "engineering schematic" feel
  const nodes = [...env.diagramNodes];

  const pipeSegments: Array<{ x1: number; y1: number; x2: number; y2: number; midX: number }> =
    nodes.slice(0, -1).map((n, i) => {
      const next = nodes[i + 1];
      return {
        x1: n.x,
        y1: n.y,
        x2: next.x,
        y2: next.y,
        midX: (n.x + next.x) / 2,
      };
    });

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#f0f4ff",
        border: "1.5px dashed #c7d7f5",
        minHeight: 280,
      }}
    >
      {/* Subtle engineering grid */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`${clipId}-grid`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke={`${PRIMARY_BLUE}18`}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${clipId}-grid)`} />
      </svg>

      {/* Main interactive SVG — viewBox 0 0 100 60 for widescreen aspect */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid meet"
        className="relative w-full"
        style={{ height: "280px" }}
        role="img"
        aria-label={`${env.name} pump system schematic`}
      >
        {/* ── Pipe connections ── */}
        {pipeSegments.map((seg, i) => {
          const pathD = `M ${seg.x1} ${seg.y1} L ${seg.midX} ${seg.y1} L ${seg.midX} ${seg.y2} L ${seg.x2} ${seg.y2}`;
          return (
            <g key={i}>
              {/* Base pipe — static */}
              <path
                d={pathD}
                fill="none"
                stroke={`${PRIMARY_BLUE}30`}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Animated flow line */}
              <path
                className="flow-line"
                d={pathD}
                fill="none"
                stroke={GREEN}
                strokeWidth="1.2"
                strokeLinecap="round"
                style={{
                  strokeDasharray: "6 4",
                  strokeDashoffset: 0,
                }}
              />
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {nodes.map((node) => {
          const isActive = activeNodeId === node.id;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onNodeEnter(node)}
              onMouseLeave={onNodeLeave}
              aria-label={node.label}
              role="button"
              tabIndex={0}
              onFocus={() => onNodeEnter(node)}
              onBlur={onNodeLeave}
            >
              {/* Pulse ring — shows on hover */}
              {isActive && (
                <circle
                  r="7"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="0.8"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="5;8;5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.1;0.6"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Outer ring */}
              <circle
                r={isActive ? "5.5" : "4.5"}
                fill="white"
                stroke={isActive ? GREEN : PRIMARY_BLUE}
                strokeWidth={isActive ? "1.5" : "1"}
                style={{ transition: "all 0.2s ease" }}
              />

              {/* Inner fill */}
              <circle
                r={isActive ? "2.8" : "2"}
                fill={isActive ? GREEN : `${PRIMARY_BLUE}60`}
                style={{ transition: "all 0.2s ease" }}
              />

              {/* Label — positioned above node */}
              <text
                y="-7"
                textAnchor="middle"
                fontSize="3.2"
                fontFamily="var(--font-poppins), ui-sans-serif"
                fontWeight={isActive ? "700" : "500"}
                fill={isActive ? DEEP_BLUE : TEXT_LIGHT}
                style={{ transition: "all 0.2s ease", userSelect: "none" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Flow direction legend */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2">
        <svg width="24" height="8" aria-hidden="true">
          <line
            x1="0"
            y1="4"
            x2="24"
            y2="4"
            stroke={GREEN}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        </svg>
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: GREEN }}
        >
          Active Flow
        </span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

interface ApplicationDiagramProps {
  env: ApplicationEnvironment;
  /** Reverse layout: diagram on left, text on right */
  reversed?: boolean;
}

export default function ApplicationDiagram({
  env,
  reversed = false,
}: ApplicationDiagramProps) {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);

  const textContent = (
    <div className="flex flex-col justify-center gap-6">
      {/* Section tag */}
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

      {/* Recommended pump chips */}
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

  const diagramContent = (
    <div className="relative">
      <DiagramSchematic
        env={env}
        activeNodeId={activeNode?.id ?? null}
        onNodeEnter={setActiveNode}
        onNodeLeave={() => setActiveNode(null)}
      />

      {/* Hover tooltip */}
      <AnimatePresence>
        {activeNode && (
          <PumpTooltip
            key={activeNode.id}
            node={activeNode}
            anchorX={activeNode.x}
            anchorY={activeNode.y}
          />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start ${
        reversed ? "lg:[grid-template-columns:3fr_2fr]" : ""
      }`}
    >
      {reversed ? (
        <>
          {diagramContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {diagramContent}
        </>
      )}
    </div>
  );
}
