"use client";

import { useState } from "react";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import DiagramSchematic from "./DiagramSchematic";
import PumpTooltip from "./PumpTooltip";
import EnvironmentInfo from "./EnvironmentInfo";

interface ApplicationDiagramProps {
  env: ApplicationEnvironment;
  reversed?: boolean;
}

export default function ApplicationDiagram({ env, reversed = false }: ApplicationDiagramProps) {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);

  return (
    <div className="flex flex-col gap-4">

      {/* ── MOBILE TOOLTIP ─────────────────────────────────────────────────────
          Renders as a full-width card ABOVE the diagram on mobile.
          This avoids all coordinate/overflow issues entirely.
          The card has a min-height so the layout doesn't jump when it appears.
          On lg+ screens this is hidden — desktop uses the overlay instead.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="block lg:hidden" style={{ minHeight: activeNode ? undefined : 0 }}>
        {activeNode && (
          <PumpTooltip node={activeNode} mobile />
        )}
      </div>

      {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
      <div
        className={`grid grid-cols-1 items-stretch gap-6 lg:gap-8 ${
          reversed ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
        }`}
      >
        {/* Diagram column */}
        <div
          className={`relative order-1 ${reversed ? "lg:order-1" : "lg:order-2"}`}
          // overflow:visible so the desktop tooltip can escape this div's bounds
          // without being clipped. The parent section handles page-level overflow.
          style={{ overflow: "visible" }}
        >
          <DiagramSchematic
            env={env}
            activeNodeId={activeNode?.id ?? null}
            onNodeEnter={setActiveNode}
            onNodeLeave={() => setActiveNode(null)}
          />

          {/* ── DESKTOP TOOLTIP ──────────────────────────────────────────────
              Absolutely positioned relative to this div.
              SVG viewBox = 100 × 70.
              The SVG fills 100% width with aspectRatio="100/70", so:
                CSS left% = node.x        (viewBox x maps directly to %)
                CSS top%  = node.y/70*100 (viewBox y scaled to container %)
              We then use transform to open left or right of the node.
          ─────────────────────────────────────────────────────────────────── */}
          {activeNode && (
            <div
              className="hidden lg:block"
              style={{
                position:  "absolute",
                // The SVG's rendered height = containerWidth × (70/100).
                // So top as % of container height is: node.y/70 × (70/100) × 100
                // = node.y × 1 — but the container height equals SVG rendered height
                // which is width × 0.7. CSS % on 'top' is relative to container height.
                // Since SVG height = container width × 0.7, and top% is of container height:
                // topPercent = (node.y / 70) * 100 gives correct result when
                // the container height equals the SVG rendered height.
                top:       `${(activeNode.y / 70) * 100}%`,
                left:      `${activeNode.x}%`,
                transform: `translate(${activeNode.x > 52 ? "calc(-100% - 12px)" : "12px"}, -40%)`,
                zIndex:    40,
                pointerEvents: "none",
              }}
            >
              <PumpTooltip node={activeNode} />
            </div>
          )}
        </div>

        {/* Info column */}
        <div className={`order-2 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <EnvironmentInfo env={env} activeNode={activeNode} />
        </div>
      </div>
    </div>
  );
}