"use client";

import { useState, useLayoutEffect } from "react";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import DiagramSchematic from "./DiagramSchematic";
import PumpTooltip from "./PumpTooltip";
import EnvironmentInfo from "./EnvironmentInfo";

interface ApplicationDiagramProps {
  env:      ApplicationEnvironment;
  reversed?: boolean;
}

export default function ApplicationDiagram({ env, reversed = false }: ApplicationDiagramProps) {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);
  const [isMobile, setIsMobile]     = useState(false);

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`grid grid-cols-1 items-stretch gap-6 lg:gap-8 ${
          reversed ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
        }`}
      >
        {/* ── Diagram column ─────────────────────────────────────── */}
        <div
          className={`relative order-2 ${reversed ? "lg:order-1" : "lg:order-2"}`}
          style={{ overflow: "visible" }}
        >
          <DiagramSchematic
            env={env}
            activeNodeId={activeNode?.id ?? null}
            onNodeEnter={setActiveNode}
            onNodeLeave={() => setActiveNode(null)}
            isMobile={isMobile}
          />

          {/* Tooltip — React Flow nodes are in an absolute canvas, so
              we position this relative to the container via percentage.
              RF canvas is 100% wide × 360px tall.
              We normalise node.x (0..100) and node.y (0..70) to %.
          */}
          {activeNode && (
            <div
              className="block"
              style={{
                position:      "absolute",
                zIndex:        40,
                pointerEvents: "none",
                left:          isMobile ? "50%" : `${activeNode.x}%`,
                top:           `${(activeNode.y / 70) * 100}%`,
                transform:     isMobile
                  ? "translate(-50%, -50%)"
                  : `translate(${activeNode.x > 52 ? "calc(-100% - 14px)" : "14px"}, -40%)`,
              }}
            >
              <PumpTooltip node={activeNode} />
            </div>
          )}
        </div>

        {/* ── Info column ────────────────────────────────────────── */}
        <div className={`order-1 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <EnvironmentInfo env={env} activeNode={activeNode} />
        </div>
      </div>
    </div>
  );
}