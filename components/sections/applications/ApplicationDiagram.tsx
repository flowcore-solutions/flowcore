"use client";

import { useState, useLayoutEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile layout to center the tooltip
  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col gap-4">

      {/* ── MOBILE TOOLTIP ─────────────────────────────────────────────────────
          Renders as a full-width card ABOVE the diagram on mobile.
          This avoids all coordinate/overflow issues entirely.
          The card has a min-height so the layout doesn't jump when it appears.
          On lg+ screens this is hidden — desktop uses the overlay instead.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="hidden">
        {/* Mobile tooltip container removed — behavior now matches desktop overlay */}
      </div>

      {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
      <div
        className={`grid grid-cols-1 items-stretch gap-6 lg:gap-8 ${
          reversed ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
        }`}
      >
        {/* Diagram column */}
        <div
          className={`relative order-2 ${reversed ? "lg:order-1" : "lg:order-2"}`}
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
              className="block"
              style={{
                position:  "absolute",
                zIndex:    40,
                pointerEvents: "none",
                // Mobile: center horizontally to avoid clipping
                // Desktop (lg): pin to node.x
                left:      isMobile ? "50%" : `${activeNode.x}%`,
                top:       `${(activeNode.y / 70) * 100}%`,
                transform: isMobile
                  ? "translate(-50%, -50%)" 
                  : `translate(${activeNode.x > 52 ? "calc(-100% - 12px)" : "12px"}, -40%)`,
              }}
            >
              <PumpTooltip node={activeNode} />
            </div>
          )}
        </div>

        {/* Info column */}
        <div className={`order-1 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <EnvironmentInfo env={env} activeNode={activeNode} />
        </div>
      </div>
    </div>
  );
}