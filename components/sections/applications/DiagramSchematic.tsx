"use client";

import { useId } from "react";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";

const GREEN = "#6cc24a";
const DEEP_BLUE = "#0f3d91";
const PRIMARY_BLUE = "#1e5bb8";
const TEXT_LIGHT = "#64748b";

interface DiagramSchematicProps {
  env: ApplicationEnvironment;
  activeNodeId: string | null;
  onNodeEnter: (node: DiagramNode) => void;
  onNodeLeave: () => void;
}

export default function DiagramSchematic({
  env,
  activeNodeId,
  onNodeEnter,
  onNodeLeave,
}: DiagramSchematicProps) {
  const clipId = useId();

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

      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid meet"
        className="relative w-full"
        style={{ height: "280px" }}
        role="img"
        aria-label={`${env.name} pump system schematic`}
      >
        {pipeSegments.map((seg, i) => {
          const pathD = `M ${seg.x1} ${seg.y1} L ${seg.midX} ${seg.y1} L ${seg.midX} ${seg.y2} L ${seg.x2} ${seg.y2}`;
          return (
            <g key={i}>
              <path
                d={pathD}
                fill="none"
                stroke={`${PRIMARY_BLUE}30`}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
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

              <circle
                r={isActive ? "5.5" : "4.5"}
                fill="white"
                stroke={isActive ? GREEN : PRIMARY_BLUE}
                strokeWidth={isActive ? "1.5" : "1"}
                style={{ transition: "all 0.2s ease" }}
              />

              <circle
                r={isActive ? "2.8" : "2"}
                fill={isActive ? GREEN : `${PRIMARY_BLUE}60`}
                style={{ transition: "all 0.2s ease" }}
              />

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
